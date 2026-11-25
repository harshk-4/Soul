import fs from 'fs';
import path from 'path';

export interface StoredRegistration {
  id: string;
  type: 'retreat' | 'contact' | 'organisation' | 'school';
  name: string;
  email: string;
  phone?: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  localSaved: boolean;
  googleForms: {
    synced: boolean;
    status: 'pending' | 'synced' | 'failed' | 'not_applicable';
    lastAttemptAt?: string;
    error?: string;
    responseSnippet?: string;
  };
  channels: string[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'registrations.json');

// In-memory memory map for fast lookups and environments where disk write is ephemeral
const memoryStore = new Map<string, StoredRegistration>();
let isLoaded = false;

function makeKey(type: string, email: string): string {
  return `${type.toLowerCase()}:${email.toLowerCase().trim()}`;
}

async function ensureLoaded(): Promise<void> {
  if (isLoaded) return;
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = await fs.promises.readFile(DATA_FILE, 'utf-8');
      const items = JSON.parse(raw) as StoredRegistration[];
      for (const item of items) {
        memoryStore.set(makeKey(item.type, item.email), item);
      }
    }
  } catch (err) {
    console.warn('[RegistrationStore] Note: Could not load initial registrations file:', err);
  } finally {
    isLoaded = true;
  }
}

async function persistToDisk(): Promise<void> {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      await fs.promises.mkdir(DATA_DIR, { recursive: true });
    }
    const all = Array.from(memoryStore.values());
    await fs.promises.writeFile(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  } catch (err) {
    // Non-fatal if filesystem is read-only (e.g. AWS Lambda / edge runtime)
    console.warn('[RegistrationStore] Warning: Could not persist to disk, stored in memory:', err);
  }
}

/**
 * Saves a new registration or retrieves the existing one.
 * If the registration already exists locally, returns isDuplicate: true.
 */
export async function saveOrFindRegistration({
  type,
  email,
  phone,
  data,
}: {
  type: 'retreat' | 'contact' | 'organisation' | 'school';
  email: string;
  phone?: string;
  data: Record<string, unknown>;
}): Promise<{ record: StoredRegistration; isDuplicate: boolean }> {
  await ensureLoaded();

  const key = makeKey(type, email);
  const existing = memoryStore.get(key);

  const now = new Date().toISOString();

  if (existing) {
    // Update data with latest submitted fields and timestamp
    existing.updatedAt = now;
    existing.data = { ...existing.data, ...data };
    if (phone) existing.phone = phone;

    await persistToDisk();
    return { record: existing, isDuplicate: true };
  }

  const newRecord: StoredRegistration = {
    id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    type,
    name: String(data.name || 'Anonymous'),
    email: email.toLowerCase().trim(),
    phone,
    data,
    createdAt: now,
    updatedAt: now,
    localSaved: true,
    googleForms: {
      synced: false,
      status: type === 'retreat' ? 'pending' : 'not_applicable',
    },
    channels: ['local_database'],
  };

  memoryStore.set(key, newRecord);
  await persistToDisk();

  return { record: newRecord, isDuplicate: false };
}

/**
 * Updates the Google Forms synchronization state for a record.
 */
export async function updateGoogleFormsSyncStatus(
  id: string,
  result: {
    synced: boolean;
    error?: string;
    responseSnippet?: string;
  }
): Promise<StoredRegistration | null> {
  await ensureLoaded();

  for (const record of memoryStore.values()) {
    if (record.id === id) {
      record.googleForms.synced = result.synced;
      record.googleForms.status = result.synced ? 'synced' : 'failed';
      record.googleForms.lastAttemptAt = new Date().toISOString();
      record.googleForms.error = result.error;
      record.googleForms.responseSnippet = result.responseSnippet;
      record.updatedAt = new Date().toISOString();

      if (result.synced && !record.channels.includes('google_forms')) {
        record.channels.push('google_forms');
      }

      await persistToDisk();
      return record;
    }
  }

  return null;
}

/**
 * Appends successfully delivered channels to a registration.
 */
export async function updateDeliveryChannels(
  id: string,
  channels: string[]
): Promise<void> {
  await ensureLoaded();

  for (const record of memoryStore.values()) {
    if (record.id === id) {
      for (const ch of channels) {
        if (!record.channels.includes(ch)) {
          record.channels.push(ch);
        }
      }
      record.updatedAt = new Date().toISOString();
      await persistToDisk();
      break;
    }
  }
}

/**
 * Look up a registration by type and email
 */
export async function getRegistration(
  type: string,
  email: string
): Promise<StoredRegistration | null> {
  await ensureLoaded();
  return memoryStore.get(makeKey(type, email)) || null;
}

/**
 * Return all stored registrations for audit/inspection
 */
export async function getAllStoredRegistrations(): Promise<StoredRegistration[]> {
  await ensureLoaded();
  return Array.from(memoryStore.values());
}

/**
 * Clear store (for unit tests)
 */
export async function clearStoredRegistrations(): Promise<void> {
  memoryStore.clear();
  isLoaded = true;
  try {
    if (fs.existsSync(DATA_FILE)) {
      await fs.promises.unlink(DATA_FILE);
    }
  } catch {
    // ignore
  }
}
