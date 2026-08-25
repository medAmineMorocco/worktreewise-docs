#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const rawVersion = args[0];

if (!rawVersion) {
    console.error('Error: Version argument is required.');
    console.error('Usage: npm run docs:new-version -- <version>');
    console.error('Example: npm run docs:new-version -- 1.1');
    process.exit(1);
}

// Validate version format: e.g. "1.1" or "1.1.0"
const versionRegex = /^(\d+)\.(\d+)(?:\.(\d+))?$/;
const match = rawVersion.trim().match(versionRegex);

if (!match) {
    console.error(`Error: Invalid version format "${rawVersion}". Expected format like "1.1" or "1.1.0".`);
    process.exit(1);
}

const major = match[1];
const minor = match[2];
const patch = match[3] || '0';

const versionId = `${major}.${minor}`;
const versionLabel = `${major}.${minor}.x`;
const initialRelease = `${major}.${minor}.${patch}`;

const contentDir = path.join(rootDir, 'content');
const targetVersionDir = path.join(contentDir, versionId);

if (fs.existsSync(targetVersionDir)) {
    console.error(`Error: Documentation version "${versionId}" already exists at ${targetVersionDir}.`);
    console.error('Refusing to overwrite existing documentation.');
    process.exit(1);
}

// Read current versions from lib/docs-versions.ts
const versionsFilePath = path.join(rootDir, 'lib', 'docs-versions.ts');
if (!fs.existsSync(versionsFilePath)) {
    console.error(`Error: Could not find versions file at ${versionsFilePath}.`);
    process.exit(1);
}

const versionsFileContent = fs.readFileSync(versionsFilePath, 'utf-8');

// Find current latest version
const latestMatch = versionsFileContent.match(/id:\s*['"]([^'"]+)['"],[\s\S]*?latest:\s*true/);
const currentLatestId = latestMatch ? latestMatch[1] : '1.0';
const sourceVersionDir = path.join(contentDir, currentLatestId);

if (!fs.existsSync(sourceVersionDir)) {
    console.error(`Error: Source latest version directory does not exist at ${sourceVersionDir}.`);
    process.exit(1);
}

console.log(`Creating new documentation version "${versionId}" (${versionLabel}) from "${currentLatestId}"...`);

// 1. Copy versioned documentation tree
fs.cpSync(sourceVersionDir, targetVersionDir, { recursive: true });
console.log(`✓ Copied ${sourceVersionDir} -> ${targetVersionDir}`);

// 2. Update lib/docs-versions.ts
let updatedVersionsContent = versionsFileContent;

// Set previous latest: true to latest: false
updatedVersionsContent = updatedVersionsContent.replace(/latest:\s*true/g, 'latest: false');

// Insert new version at the beginning of DOC_VERSIONS array
const newVersionEntry = `  {
    id: '${versionId}',
    label: '${versionLabel}',
    releases: ['${initialRelease}'],
    latest: true,
  },
`;

updatedVersionsContent = updatedVersionsContent.replace(
    /export const DOC_VERSIONS: DocsVersion\[] = \[\r?\n/,
    `export const DOC_VERSIONS: DocsVersion[] = [\n${newVersionEntry}`
);

fs.writeFileSync(versionsFilePath, updatedVersionsContent, 'utf-8');
console.log(`✓ Updated ${versionsFilePath} with new version ${versionLabel} as latest`);

// 3. Update content/_meta.ts
const rootMetaPath = path.join(contentDir, '_meta.ts');
if (fs.existsSync(rootMetaPath)) {
    let rootMetaContent = fs.readFileSync(rootMetaPath, 'utf-8');
    if (!rootMetaContent.includes(`'${versionId}'`) && !rootMetaContent.includes(`"${versionId}"`)) {
        const metaEntry = `    '${versionId}': {\n        type: 'page',\n        title: '${versionId}',\n    },\n`;
        rootMetaContent = rootMetaContent.replace(
            /};\s*$/,
            `${metaEntry}};\n`
        );
        fs.writeFileSync(rootMetaPath, rootMetaContent, 'utf-8');
        console.log(`✓ Updated ${rootMetaPath} with meta entry for ${versionId}`);
    }
}

console.log('\n======================================================');
console.log(` Documentation version ${versionId} (${versionLabel}) created successfully! `);
console.log('======================================================');
console.log(`- Editable current documentation: content/${versionId}/`);
console.log(`- Frozen previous documentation: content/${currentLatestId}/`);
console.log(`- /latest route now points to: ${versionId}`);
console.log(`- Compatible releases: ${initialRelease}`);
console.log('======================================================\n');
