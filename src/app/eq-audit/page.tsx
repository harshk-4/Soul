import React from 'react';
import type { Metadata } from 'next';
import AuditContainer from '@/components/audit/AuditContainer';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Soulful Intelligence EQ Audit | SoulfulI',
  description:
    'Take the Soulful Intelligence EQ Audit by SoulfulI — a quiet 48-question reflective self-discovery mirror across six dimensions of emotional awareness, regulation, empathy, and intentional communication.',
  path: '/eq-audit',
});

export default function EqAuditPage() {
  return (
    <div className="w-full min-h-screen bg-surface px-4 sm:px-6 lg:px-16 pt-6 sm:pt-8 pb-16 sm:pb-24">
      <div className="max-w-[1240px] mx-auto">
        <AuditContainer />
      </div>
    </div>
  );
}
