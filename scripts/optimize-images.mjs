import sharp from 'sharp';
import { readdir, writeFile } from 'node:fs/promises';

const metadata = {};
for (const file of (await readdir('public/images')).filter((file) =>
  file.endsWith('.png'),
)) {
  const name = file.slice(0, -4);
  const output = await sharp(`public/images/${file}`)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 86, effort: 5 })
    .toFile(`public/images/${name}.webp`);
  metadata[name] = {
    src: `/images/${name}.webp`,
    width: output.width,
    height: output.height,
  };
}
await writeFile(
  'src/content/images.json',
  JSON.stringify(metadata, null, 2) + '\n',
);
console.log(
  `Preparadas ${Object.keys(metadata).length} imagens WebP com dimensões reais.`,
);
