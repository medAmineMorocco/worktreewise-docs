'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  DOC_VERSIONS,
  getVersionInfo,
  type DocsVersion,
} from '@/lib/docs-versions';

function isEvergreenRoute(pathname: string): boolean {
  return (
    pathname.startsWith('/git-worktree/') ||
    pathname === '/git-worktree' ||
    pathname.startsWith('/tutorials/') ||
    pathname === '/tutorials' ||
    pathname.startsWith('/comparisons/') ||
    pathname === '/comparisons'
  );
}

function getRelativeDocsPath(pathname: string): string {
  if (pathname === '/latest' || pathname.startsWith('/latest/')) {
    return pathname.slice('/latest'.length);
  }

  for (const version of DOC_VERSIONS) {
    const prefix = `/${version.id}`;
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return pathname.slice(prefix.length);
    }
  }

  return pathname;
}

function getTargetUrl(version: DocsVersion, currentPath: string): string {
  const relativePath = getRelativeDocsPath(currentPath);
  const normalizedRelative = relativePath.replace(/^\/+/, '');

  if (version.latest) {
    return normalizedRelative ? `/${normalizedRelative}` : '/';
  }

  return normalizedRelative ? `/${version.id}/${normalizedRelative}` : `/${version.id}`;
}

export function DocsVersionSelector() {
  const pathname = usePathname() || '';

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  // If on evergreen page, don't show the version selector
  if (isEvergreenRoute(pathname)) {
    return null;
  }

  const { version: currentVersion, isLatestRoute } = getVersionInfo(pathname);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="docs-version-selector"
    >
      <button
        ref={triggerRef}
        type="button"
        className="docs-version-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Switch documentation version"
      >
        <VersionIcon />

        <span className="docs-version-label">
          {currentVersion.label}
        </span>

        {isLatestRoute && (
          <span className="docs-version-latest">
            Latest
          </span>
        )}

        {currentVersion.tag && !isLatestRoute && (
          <span className="docs-version-tag">
            {currentVersion.tag}
          </span>
        )}

        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          className="docs-version-dropdown"
          role="listbox"
          aria-label="Documentation versions"
        >
          <div className="docs-version-dropdown-title">
            Documentation version
          </div>

          {DOC_VERSIONS.map((version) => {
            const selected =
              version.id === currentVersion.id;
            const isDisabled = Boolean(version.tag);
            const targetUrl = getTargetUrl(version, pathname);

            return (
              <Link
                key={version.id}
                href={targetUrl}
                role="option"
                aria-disabled={isDisabled}
                aria-selected={selected}
                className={`docs-version-option ${
                  isDisabled ? 'docs-version-option-disabled' : ''
                }`}
                onClick={(e) => {
                  if (isDisabled) {
                    e.preventDefault();
                    return;
                  }
                  setOpen(false);
                }}
              >
                <div className="docs-version-check">
                  {selected ? '✓' : ''}
                </div>

                <div className="docs-version-option-content">
                  <div className="docs-version-option-header">
                    <span>{version.label}</span>

                    {version.latest && (
                      <span className="docs-version-option-latest">
                        Latest
                      </span>
                    )}

                    {version.tag && !version.latest && (
                      <span className="docs-version-option-tag">
                        {version.tag}
                      </span>
                    )}
                  </div>

                  <span className="docs-version-releases">
                    Compatible: {version.releases.join(', ')}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function VersionIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="5" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />

      <path d="M8 5h4a6 6 0 0 1 6 6v5" />
      <path d="M6 7v10" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={open ? 'docs-version-chevron-open' : undefined}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
