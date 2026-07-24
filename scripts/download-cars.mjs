// =============================================================================
// One-time helper that downloads the demonstration car photos into
// /public/cars from Unsplash (licence-free). Documents the exact source of each
// sample image so they are reproducible. Run: `pnpm cars`.
//
// Replace these with your own showroom photography before going live; keep the
// same filenames so `inventory.config.ts` continues to resolve.
// =============================================================================
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = join(here, '..', 'public', 'cars')

// name → Unsplash photo id
const cars = {
  '01-mercedes-amg-gt': 'photo-1552519507-da3b142c6e3d',
  '02-porsche-911': 'photo-1503376780353-7e6692767b70',
  '03-chevrolet-camaro': 'photo-1494976388531-d1058494cdd8',
  '04-lamborghini-huracan': 'photo-1583121274602-3e2820c69888',
  '05-bmw-m4': 'photo-1544636331-e26879cd4d9b',
  '06-mercedes-s-class': 'photo-1605559424843-9e4c228bf1c2',
  '07-porsche-718': 'photo-1502877338535-766e1452684a',
  '08-mercedes-g-class': 'photo-1580273916550-e323be2ae537',
  '09-tesla-model-s': 'photo-1618843479313-40f8afb4b4d8',
  '10-bmw-m5': 'photo-1555215695-3004980ad54e',
  '11-audi-rs7': 'photo-1542282088-fe8426682b8f',
  '12-range-rover': 'photo-1568605117036-5fe5e7bab0b7',
}

const extras = {
  'hero-ferrari': 'photo-1533473359331-0135ef1b58bf',
  'about-showroom': 'photo-1614162692292-7ac56d7f7f1e',
}

async function fetchImage(id, width) {
  const url = `https://images.unsplash.com/${id}?w=${width}&q=75&fm=jpg&fit=crop&crop=entropy`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${id} → HTTP ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function run() {
  await mkdir(outDir, { recursive: true })
  for (const [name, id] of Object.entries(cars)) {
    const buf = await fetchImage(id, 1400)
    await writeFile(join(outDir, `${name}.jpg`), buf)
    console.log(`✓ ${name}.jpg`)
  }
  for (const [name, id] of Object.entries(extras)) {
    const buf = await fetchImage(id, name === 'hero-ferrari' ? 1920 : 1400)
    await writeFile(join(outDir, `${name}.jpg`), buf)
    console.log(`✓ ${name}.jpg`)
  }
  console.log('done.')
}

run().catch((err) => {
  console.error('car image download failed:', err)
  process.exit(1)
})
