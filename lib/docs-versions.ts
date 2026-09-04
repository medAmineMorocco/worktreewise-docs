export interface DocsVersion {
  id: string;
  label: string;
  releases: string[];
  latest: boolean;
  tag?: string;
}

export const DOC_VERSIONS: DocsVersion[] = [
  {
    id: '1.1',
    label: '1.1.x',
    releases: ['1.1.0'],
    latest: true,
  },
  {
    id: '1.0',
    label: '1.0.x',
    releases: ['1.0.0', '1.0.1'],
    latest: false,
  },
];

export const LATEST_DOC_VERSION =
  DOC_VERSIONS.find((version) => version.latest)!;

export function getVersionById(id: string): DocsVersion | undefined {
  return DOC_VERSIONS.find((v) => v.id === id);
}

export function getVersionInfo(pathname: string): {
  version: DocsVersion;
  isLatestRoute: boolean;
  activeVersionId: string;
} {
  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/');
  const firstSegment = segments[0] || '';

  const matchedVersion = DOC_VERSIONS.find((v) => !v.latest && v.id === firstSegment);
  if (matchedVersion) {
    return {
      version: matchedVersion,
      isLatestRoute: false,
      activeVersionId: matchedVersion.id,
    };
  }

  return {
    version: LATEST_DOC_VERSION,
    isLatestRoute: true,
    activeVersionId: LATEST_DOC_VERSION.id,
  };
}
