import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const distDir = 'dist';

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir);


const ArquivosPraCopiar = [
    'manifest.json',
    'src',
    'images',
    'css'
];


for (const file of ArquivosPraCopiar) {
    const destPath = path.join(distDir, path.basename(file));
    if (fs.lstatSync(file).isDirectory()) {
        fs.cpSync(file, destPath, { recursive: true });
    } else {
        fs.copyFileSync(file, destPath);
    }
}

// Gera o arquivo ZIP
const output = fs.createWriteStream(path.join(distDir, 'lembrete-agua.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

archive.pipe(output);
archive.directory(distDir, false, (entry) => {

    return entry.name !== 'lembrete-agua.zip' ? entry : false;
});

await archive.finalize();

console.log('dist/ A build foi gerada com sucesso!');