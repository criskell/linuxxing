import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const destination = join(projectRoot, 'public', 'lab');

const V86_COMMIT = '847e34d';

const downloads = [
  {
    name: 'seabios.bin',
    url: `https://raw.githubusercontent.com/copy/v86/${V86_COMMIT}/bios/seabios.bin`,
    sha256: '73e3f359102e3a9982c35fce98eb7cd08f18303ac7f1ba6ebfbe6cdc1c244d98',
  },
  {
    name: 'vgabios.bin',
    url: `https://raw.githubusercontent.com/copy/v86/${V86_COMMIT}/bios/vgabios.bin`,
    sha256: 'a4bc0d80cc3ca028c73dafa8fee396b8d054ce87ebd8abfbd31b06b437607880',
  },
  {
    name: 'buildroot-bzimage.bin',
    url: 'https://i.copy.sh/buildroot-bzimage.bin',
    sha256: '7befbaea31e249d9a518c4b95fa42b2a193d0e3de46250d617cbdeb866ee28b0',
  },
];

const copies = [{ name: 'v86.wasm', from: join(projectRoot, 'node_modules', 'v86', 'build', 'v86.wasm') }];

const digest = (buffer) => createHash('sha256').update(buffer).digest('hex');

const alreadyValid = async (path, expected) => {
  try {
    return digest(await readFile(path)) === expected;
  } catch {
    return false;
  }
};

const download = async ({ name, url, sha256 }) => {
  const path = join(destination, name);
  if (await alreadyValid(path, sha256)) {
    console.log(`lab assets: ${name} is already in place`);
    return;
  }

  console.log(`lab assets: downloading ${name} from ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}, the server answered ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const actual = digest(buffer);
  if (actual !== sha256) {
    throw new Error(`Checksum mismatch for ${name}, expected ${sha256} and got ${actual}`);
  }

  await writeFile(path, buffer);
};

await mkdir(destination, { recursive: true });
await Promise.all(downloads.map(download));
await Promise.all(copies.map(({ name, from }) => copyFile(from, join(destination, name))));
console.log('lab assets: ready');
