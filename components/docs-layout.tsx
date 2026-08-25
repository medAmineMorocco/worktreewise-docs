'use client';

import React from 'react';
import { Layout, Navbar, Footer } from 'nextra-theme-docs';
import { DocsVersionSelector } from './docs-version-selector';

interface DocsLayoutProps {
  children: React.ReactNode;
  pageMap: any[];
}

export function DocsLayout({ children, pageMap }: DocsLayoutProps) {
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
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/phucbm/nextra-docs-starter/tree/main"
      footer={footer}
      editLink={null}
      feedback={{ content: null }}
    >
      {children}
    </Layout>
  );
}
