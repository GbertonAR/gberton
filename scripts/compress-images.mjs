import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const DIRS = [
    'public/img',
    'public/img/Staff',
];

const QUALITY = 85;

for (const dir of DIRS) {
    const files = await readdir(dir);
    for (const file of files) {
        const ext = extname(file).toLowerCase();
        if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

        const src = join(dir, file);
        const info = await stat(src);
        const sizeMB = (info.size / 1024 / 1024).toFixed(1);

        const out = join(dir, basename(file, ext) + '.webp');

        await sharp(src)
            .webp({ quality: QUALITY, lossless: false, alphaQuality: 90 })
            .toFile(out);

        const outInfo = await stat(out);
        const outMB = (outInfo.size / 1024 / 1024).toFixed(1);
        console.log(`${file}: ${sizeMB}MB → ${outMB}MB (${Math.round((1 - outInfo.size/info.size)*100)}% reducción)`);
    }
}
