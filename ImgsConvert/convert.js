const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// ─── Configuración ──────────────────────────────────────────────
const INPUT_DIR = path.join(__dirname, "input");
const OUTPUT_DIR = path.join(__dirname, "output");
const MAX_HEIGHT = 1080;
const WEBP_QUALITY = 80; // 0-100 — buen balance calidad/peso

// Extensiones de imagen soportadas por Sharp
const SUPPORTED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".tiff",
  ".tif",
  ".bmp",
  ".webp",
  ".avif",
  ".svg",
  ".heif",
  ".heic",
]);

// ─── Utilidades ─────────────────────────────────────────────────
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Carpeta creada: ${dir}`);
  }
}

function getImageFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_EXTENSIONS.has(ext);
    });
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// ─── Conversión ─────────────────────────────────────────────────
async function convertImage(inputPath, outputPath) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  const originalWidth = metadata.width;
  const originalHeight = metadata.height;
  const hasAlpha = metadata.hasAlpha;

  // Solo redimensionar si la altura excede MAX_HEIGHT
  let resizeOptions = null;
  if (originalHeight > MAX_HEIGHT) {
    resizeOptions = {
      height: MAX_HEIGHT,
      withoutEnlargement: true, // nunca agrandar
      fit: "inside", // conservar proporción
    };
  }

  let pipeline = image;

  if (resizeOptions) {
    pipeline = pipeline.resize(resizeOptions);
  }

  // Convertir a WebP con o sin alpha
  pipeline = pipeline.webp({
    quality: WEBP_QUALITY,
    alphaQuality: hasAlpha ? 80 : 100,
    effort: 4, // 0-6 — velocidad vs compresión
    lossless: false,
  });

  await pipeline.toFile(outputPath);

  // Info de resultado
  const inputStats = fs.statSync(inputPath);
  const outputStats = fs.statSync(outputPath);

  return {
    originalWidth,
    originalHeight,
    hasAlpha,
    resized: originalHeight > MAX_HEIGHT,
    inputSize: inputStats.size,
    outputSize: outputStats.size,
  };
}

// ─── Main ───────────────────────────────────────────────────────
async function main() {
  console.log("");
  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║        🖼️  Convertidor de Imágenes a WebP           ║");
  console.log("║        Máx. altura: 1080px · Calidad: 80%           ║");
  console.log("╚══════════════════════════════════════════════════════╝");
  console.log("");

  // Asegurarse de que existan las carpetas
  ensureDir(INPUT_DIR);
  ensureDir(OUTPUT_DIR);

  // Obtener archivos de imagen
  const files = getImageFiles(INPUT_DIR);

  if (files.length === 0) {
    console.log("⚠️  No se encontraron imágenes en la carpeta 'input/'.");
    console.log("   Formatos soportados:", [...SUPPORTED_EXTENSIONS].join(", "));
    console.log("");
    return;
  }

  console.log(`📷 Se encontraron ${files.length} imagen(es) para convertir.\n`);

  let totalInputSize = 0;
  let totalOutputSize = 0;
  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputFileName =
      path.basename(file, path.extname(file)) + ".webp";
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    try {
      const result = await convertImage(inputPath, outputPath);

      totalInputSize += result.inputSize;
      totalOutputSize += result.outputSize;
      successCount++;

      const savings = (
        ((result.inputSize - result.outputSize) / result.inputSize) *
        100
      ).toFixed(1);

      console.log(`  ✅ ${file}`);
      console.log(
        `     ${result.originalWidth}×${result.originalHeight}${
          result.resized ? ` → redimensionada a ≤1080px alto` : " → sin cambio de tamaño"
        }`
      );
      console.log(
        `     ${formatBytes(result.inputSize)} → ${formatBytes(
          result.outputSize
        )} (${savings}% reducción)${result.hasAlpha ? " · con alpha" : ""}`
      );
      console.log("");
    } catch (err) {
      errorCount++;
      console.log(`  ❌ ${file} — Error: ${err.message}\n`);
    }
  }

  // Resumen final
  const totalSavings =
    totalInputSize > 0
      ? (
          ((totalInputSize - totalOutputSize) / totalInputSize) *
          100
        ).toFixed(1)
      : 0;

  console.log("──────────────────────────────────────────────────────");
  console.log(`  📊 Resumen:`);
  console.log(`     Convertidas: ${successCount} | Errores: ${errorCount}`);
  console.log(
    `     Peso total: ${formatBytes(totalInputSize)} → ${formatBytes(
      totalOutputSize
    )} (${totalSavings}% reducción)`
  );
  console.log("──────────────────────────────────────────────────────");
  console.log("");
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
