import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../public/assets');
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];
const WEBP_QUALITY = 85;

const RESPONSIVE_SIZES = [
    { suffix: '-400', width: 400 },
    { suffix: '-800', width: 800 },
    { suffix: '-1200', width: 1200 },
];

async function getAllImages(dir) {
    const files = [];
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            const subFiles = await getAllImages(fullPath);
            files.push(...subFiles);
        } else {
            const ext = path.extname(item.name).toLowerCase();
            if (SUPPORTED_FORMATS.includes(ext)) {
                files.push(fullPath);
            }
        }
    }

    return files;
}

async function convertToWebP(imagePath) {
    const ext = path.extname(imagePath);
    const baseName = path.basename(imagePath, ext);
    const dir = path.dirname(imagePath);

    try {
        const webpPath = path.join(dir, `${baseName}.webp`);
        await sharp(imagePath)
            .webp({ quality: WEBP_QUALITY })
            .toFile(webpPath);

        const originalSize = (await fs.stat(imagePath)).size;
        const webpSize = (await fs.stat(webpPath)).size;
        const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

        console.log(`✅ ${path.relative(ASSETS_DIR, imagePath)}`);
        console.log(`   → ${path.basename(webpPath)} (${savings}% plus léger)`);

        for (const size of RESPONSIVE_SIZES) {
            const responsiveWebpPath = path.join(dir, `${baseName}${size.suffix}.webp`);
            await sharp(imagePath)
                .resize(size.width, null, { withoutEnlargement: true })
                .webp({ quality: WEBP_QUALITY })
                .toFile(responsiveWebpPath);

            console.log(`   → ${path.basename(responsiveWebpPath)} (${size.width}px)`);
        }

        return { success: true, savings };
    } catch (error) {
        console.error(`❌ Erreur: ${path.relative(ASSETS_DIR, imagePath)}`);
        console.error(`   ${error.message}`);
        return { success: false, savings: 0 };
    }
}

async function main() {
    console.log('🚀 Conversion des images en WebP...\n');
    console.log(`📁 Dossier: ${ASSETS_DIR}\n`);

    try {
        const images = await getAllImages(ASSETS_DIR);
        console.log(`📸 ${images.length} images trouvées\n`);

        let totalSavings = 0;
        let successCount = 0;

        for (const imagePath of images) {
            const result = await convertToWebP(imagePath);
            if (result.success) {
                successCount++;
                totalSavings += parseFloat(result.savings);
            }
            console.log('');
        }

        const avgSavings = (totalSavings / successCount).toFixed(1);

        console.log('✨ Conversion terminée!');
        console.log(`📊 ${successCount}/${images.length} images converties`);
        console.log(`💾 Économie moyenne: ${avgSavings}%`);

    } catch (error) {
        console.error('❌ Erreur fatale:', error.message);
        process.exit(1);
    }
}

main();
