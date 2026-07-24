// =============================================================================
// Renders the social share image (og-image.png, 1200×630) from a source SVG
// using sharp. Run: `pnpm og`. Referenced by usePageSeo as the default OG image.
// =============================================================================
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const source = join(root, 'assets', 'og-source.svg')
const out = join(root, 'public', 'og-image.png')

async function run() {
  const svg = await readFile(source)
  const png = await sharp(svg, { density: 150 })
    .resize(1200, 630, { fit: 'cover' })
    .png({ quality: 90 })
    .toBuffer()
  await writeFile(out, png)
  console.log(`✓ og-image.png (${(png.length / 1024).toFixed(0)} KB)`)
}

run().catch((err) => {
  console.error('og generation failed:', err)
  process.exit(1)
})
