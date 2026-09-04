'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Layout, Navbar, Footer } from 'nextra-theme-docs';
import { DocsVersionSelector } from './docs-version-selector';
import { DOC_VERSIONS } from '@/lib/docs-versions';

interface DocsLayoutProps {
  children: React.ReactNode;
  pageMap: any[];
}

function getVersionPageMap(pageMap: any[], pathname: string): any[] {
  if (!Array.isArray(pageMap)) return pageMap;

  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/');
  const firstSegment = segments[0] || '';

  // Check if current route is a versioned subpath (e.g. "1.0")
  const matchedVersion = DOC_VERSIONS.find((v) => !v.latest && v.id === firstSegment);

  if (matchedVersion) {
    const versionNode = pageMap.find(
      (item) => item && (item.name === matchedVersion.id || item.route === `/${matchedVersion.id}`)
    );

    if (versionNode && Array.isArray(versionNode.children)) {
      return versionNode.children;
    }
  }

  // Otherwise (for latest docs), filter out version folders from the root pageMap
  const versionIds = new Set(DOC_VERSIONS.map((v) => v.id));
  return pageMap.filter((item) => {
    if (!item) return false;
    if (item.name && versionIds.has(item.name)) return false;
    return true;
  });
}

export function DocsLayout({ children, pageMap }: DocsLayoutProps) {
  const pathname = usePathname() || '';
  const filteredPageMap = getVersionPageMap(pageMap, pathname);

  const navbar = (
    <Navbar
      logo={<img src="/images/general/logo.svg" alt="WorktreeWise Logo" width={180} height={40} className="h-7 w-auto" />}
    >
      <div className="worktreewise-navbar-version">
        <DocsVersionSelector />
      </div>
    </Navbar>
  );

  const footer = <Footer>{new Date().getFullYear()} © WorktreeWise.</Footer>;

  return (
    <Layout
      navbar={navbar}
      pageMap={filteredPageMap}
      docsRepositoryBase="https://github.com/phucbm/nextra-docs-starter/tree/main"
      footer={footer}
      editLink={null}
      feedback={{ content: null }}
    >
      {children}
    </Layout>
  );
}

