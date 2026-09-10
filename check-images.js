import products from './src/data/products.js'

async function checkAllImages() {
  console.log(`Checking ${products.length} products...`)
  const broken = []

  for (const p of products) {
    const urls = Array.from(new Set([p.thumbnail, ...(p.images || [])].filter(Boolean)))
    for (const url of urls) {
      try {
        const res = await fetch(url, { method: 'HEAD' })
        if (res.status >= 400) {
          console.log(`BROKEN [${res.status}]: Product #${p.id} (${p.name}) -> ${url}`)
          broken.push({ id: p.id, name: p.name, url, status: res.status })
        }
      } catch (err) {
        console.log(`FETCH ERROR: Product #${p.id} (${p.name}) -> ${url} (${err.message})`)
        broken.push({ id: p.id, name: p.name, url, status: 'ERROR: ' + err.message })
      }
    }
  }

  console.log(`\nFound ${broken.length} broken image URLs out of all images tested.`)
  if (broken.length > 0) {
    console.log(JSON.stringify(broken, null, 2))
  }
}

checkAllImages()
