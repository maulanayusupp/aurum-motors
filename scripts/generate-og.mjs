// =============================================================================
// Generates social share images. Run: `pnpm og`.
//  1. og-image.png (1200×630) — the default share card, from a source SVG.
//  2. public/cars/social/<name>.jpg (1200×630) — a UNIFORM landscape crop of
//     each car's primary photo, used as that car's og:image. This keeps
//     WhatsApp/Instagram/Facebook previews consistently cropped regardless of
//     the source photo's aspect ratio. `usePageSeo` links to these.
// =============================================================================
import sharp from 'sharp'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const source = join(root, 'assets', 'og-source.svg')
const out = join(root, 'public', 'og-image.png')
const carsDir = join(root, 'public', 'cars')
const socialDir = join(carsDir, 'social')

const OG_W = 1200
const OG_H = 630

async function run() {
  // 1. Default share card from the SVG.
  const svg = await readFile(source)
  const png = await sharp(svg, { density: 150 })
    .resize(OG_W, OG_H, { fit: 'cover' })
    .png({ quality: 90 })
    .toBuffer()
  await writeFile(out, png)
  console.log(`✓ og-image.png (${(png.length / 1024).toFixed(0)} KB)`)

  // 2. Per-car uniform social crops (numbered car photos only).
  await mkdir(socialDir, { recursive: true })
  const files = (await readdir(carsDir)).filter((f) => /^\d{2}-.*\.jpg$/.test(f))
  for (const file of files) {
    const buf = await sharp(join(carsDir, file))
      .resize(OG_W, OG_H, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer()
    await writeFile(join(socialDir, file), buf)
  }
  console.log(`✓ car social crops: ${files.length} × ${OG_W}×${OG_H} → public/cars/social/`)
}

run().catch((err) => {
  console.error('og generation failed:', err)
  process.exit(1)
})
