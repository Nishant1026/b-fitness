import { db } from './db.js'

// Helper to format a product row with images, sizes, and colors
function formatProduct(row, includeVariants = false) {
  if (!row) return null

  // Get images
  const images = db.prepare(`
    SELECT image_url, alt_text, is_primary FROM product_images
    WHERE product_id = ? ORDER BY sort_order ASC
  `).all(row.id)

  const imageUrls = images.map(img => img.image_url)
  const thumbnail = imageUrls[0] || 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80'

  // Get variants for sizes and colors
  const variants = db.prepare(`
    SELECT id, size, color, sku, price, stock_quantity, status
    FROM product_variants WHERE product_id = ?
  `).all(row.id)

  const sizes = [...new Set(variants.map(v => v.size).filter(Boolean))]
  const colors = [...new Set(variants.map(v => v.color).filter(Boolean))]

  const formatted = {
    id: row.id,
    name: row.name,
    slug: row.slug,
    sku: row.sku,
    category: row.category_name,
    categorySlug: row.category_slug,
    parentCategory: row.parent_category_name || null,
    parentCategorySlug: row.parent_category_slug || null,
    subCategory: row.parent_category_name ? row.category_name : '',
    gender: row.gender,
    brand: row.brand,
    description: row.description,
    shortDescription: row.short_description,
    price: row.price,
    salePrice: row.sale_price,
    discount: row.discount_percentage,
    stock: row.stock_quantity,
    rating: row.rating,
    reviewCount: row.review_count,
    featured: Boolean(row.featured),
    bestseller: Boolean(row.bestseller),
    badge: row.badge,
    material: row.material,
    thumbnail,
    images: imageUrls.length > 0 ? imageUrls : [thumbnail],
    sizes,
    colors,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }

  if (includeVariants) {
    formatted.variants = variants
  }

  return formatted
}

export function handleApiRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  const pathname = url.pathname
  const method = req.method

  // Helper response functions
  const sendJson = (data, status = 200) => {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  }

  const sendError = (message, status = 400) => {
    sendJson({ error: message, success: false }, status)
  }

  try {
    // ----------------------------------------------------
    // GET /api/categories
    // ----------------------------------------------------
    if (method === 'GET' && pathname === '/api/categories') {
      const parents = db.prepare(`
        SELECT * FROM categories WHERE parent_id IS NULL AND status = 'active'
        ORDER BY sort_order ASC, name ASC
      `).all()

      const result = parents.map(parent => {
        const subCats = db.prepare(`
          SELECT c.*, 
            (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id AND p.status = 'active') as product_count
          FROM categories c 
          WHERE c.parent_id = ? AND c.status = 'active'
          ORDER BY c.sort_order ASC, c.name ASC
        `).all(parent.id)

        const totalProducts = db.prepare(`
          SELECT COUNT(*) as count FROM products p
          JOIN categories c ON p.category_id = c.id
          WHERE (c.id = ? OR c.parent_id = ?) AND p.status = 'active'
        `).get(parent.id, parent.id)

        return {
          id: parent.id,
          name: parent.name,
          slug: parent.slug,
          image: parent.image,
          description: parent.description,
          subCategories: subCats.map(sc => ({
            id: sc.id,
            name: sc.name,
            slug: sc.slug,
            productCount: sc.product_count,
            description: sc.description,
          })),
          productCount: totalProducts?.count || 0
        }
      })

      return sendJson({ success: true, data: result })
    }

    // ----------------------------------------------------
    // GET /api/categories/:slug
    // ----------------------------------------------------
    const catSlugMatch = pathname.match(/^\/api\/categories\/([^/]+)$/)
    if (method === 'GET' && catSlugMatch) {
      const slug = catSlugMatch[1]
      const cat = db.prepare(`
        SELECT c.*, p.name as parent_name, p.slug as parent_slug
        FROM categories c
        LEFT JOIN categories p ON c.parent_id = p.id
        WHERE c.slug = ?
      `).get(slug)

      if (!cat) return sendError('Category not found', 404)

      const subCategories = db.prepare(`
        SELECT c.*, 
          (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id AND p.status = 'active') as product_count
        FROM categories c
        WHERE c.parent_id = ? AND c.status = 'active'
        ORDER BY c.sort_order ASC
      `).all(cat.id)

      return sendJson({
        success: true,
        data: {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          parentId: cat.parent_id,
          parentName: cat.parent_name,
          parentSlug: cat.parent_slug,
          image: cat.image,
          description: cat.description,
          subCategories: subCategories.map(s => ({
            id: s.id,
            name: s.name,
            slug: s.slug,
            productCount: s.product_count
          }))
        }
      })
    }

    // ----------------------------------------------------
    // GET /api/products
    // ----------------------------------------------------
    if (method === 'GET' && pathname === '/api/products') {
      const category = url.searchParams.get('category') || ''
      const subCategory = url.searchParams.get('subCategory') || ''
      const gender = url.searchParams.get('gender') || ''
      const minPrice = Number(url.searchParams.get('minPrice')) || 0
      const maxPrice = Number(url.searchParams.get('maxPrice')) || 99999
      const minRating = Number(url.searchParams.get('minRating')) || 0
      const search = url.searchParams.get('search') || url.searchParams.get('q') || ''
      const sortBy = url.searchParams.get('sortBy') || 'featured'
      const limit = Number(url.searchParams.get('limit')) || 100
      const offset = Number(url.searchParams.get('offset')) || 0

      let whereConditions = [`p.status = 'active'`]
      let params = []

      // Category filter (can be parent or child slug)
      if (category) {
        whereConditions.push(`(
          c.slug = ? OR parent_c.slug = ? OR
          LOWER(p.gender) = LOWER(?)
        )`)
        params.push(category, category, category)
      }

      if (subCategory) {
        whereConditions.push(`(c.slug = ? OR LOWER(c.name) = LOWER(?))`)
        params.push(subCategory, subCategory)
      }

      if (gender) {
        whereConditions.push(`(p.gender = ? OR p.gender = 'unisex')`)
        params.push(gender)
      }

      if (minPrice > 0 || maxPrice < 99999) {
        whereConditions.push(`COALESCE(p.sale_price, p.price) >= ? AND COALESCE(p.sale_price, p.price) <= ?`)
        params.push(minPrice, maxPrice)
      }

      if (minRating > 0) {
        whereConditions.push(`p.rating >= ?`)
        params.push(minRating)
      }

      if (search) {
        const qPattern = `%${search.trim()}%`
        whereConditions.push(`(
          p.name LIKE ? OR 
          p.sku LIKE ? OR 
          p.description LIKE ? OR 
          p.brand LIKE ? OR 
          c.name LIKE ? OR 
          COALESCE(parent_c.name, '') LIKE ?
        )`)
        params.push(qPattern, qPattern, qPattern, qPattern, qPattern, qPattern)
      }

      // Sort Order
      let orderClause = 'ORDER BY p.featured DESC, p.bestseller DESC, p.id DESC'
      switch (sortBy) {
        case 'price-low':
          orderClause = 'ORDER BY COALESCE(p.sale_price, p.price) ASC'
          break
        case 'price-high':
          orderClause = 'ORDER BY COALESCE(p.sale_price, p.price) DESC'
          break
        case 'rating':
          orderClause = 'ORDER BY p.rating DESC, p.review_count DESC'
          break
        case 'newest':
          orderClause = 'ORDER BY p.created_at DESC, p.id DESC'
          break
        case 'sale':
          orderClause = 'ORDER BY p.discount_percentage DESC'
          break
        case 'featured':
        default:
          orderClause = 'ORDER BY p.featured DESC, p.bestseller DESC, p.id ASC'
          break
      }

      const queryStr = `
        SELECT 
          p.*,
          c.name as category_name,
          c.slug as category_slug,
          parent_c.name as parent_category_name,
          parent_c.slug as parent_category_slug
        FROM products p
        JOIN categories c ON p.category_id = c.id
        LEFT JOIN categories parent_c ON c.parent_id = parent_c.id
        WHERE ${whereConditions.join(' AND ')}
        ${orderClause}
        LIMIT ? OFFSET ?
      `
      const products = db.prepare(queryStr).all(...params, limit, offset)

      const formattedProducts = products.map(p => formatProduct(p))
      return sendJson({
        success: true,
        count: formattedProducts.length,
        data: formattedProducts
      })
    }

    // ----------------------------------------------------
    // GET /api/search/products
    // ----------------------------------------------------
    if (method === 'GET' && pathname === '/api/search/products') {
      const q = url.searchParams.get('q') || ''
      if (!q.trim()) return sendJson({ success: true, data: [] })

      const qPattern = `%${q.trim()}%`
      const rows = db.prepare(`
        SELECT 
          p.*,
          c.name as category_name,
          c.slug as category_slug,
          parent_c.name as parent_category_name,
          parent_c.slug as parent_category_slug
        FROM products p
        JOIN categories c ON p.category_id = c.id
        LEFT JOIN categories parent_c ON c.parent_id = parent_c.id
        WHERE p.status = 'active' AND (
          p.name LIKE ? OR 
          p.sku LIKE ? OR 
          p.description LIKE ? OR 
          c.name LIKE ? OR 
          COALESCE(parent_c.name, '') LIKE ?
        )
        ORDER BY p.bestseller DESC, p.rating DESC
        LIMIT 10
      `).all(qPattern, qPattern, qPattern, qPattern, qPattern)

      return sendJson({
        success: true,
        data: rows.map(r => formatProduct(r))
      })
    }

    // ----------------------------------------------------
    // GET /api/products/:slug
    // ----------------------------------------------------
    const prodSlugMatch = pathname.match(/^\/api\/products\/([^/]+)$/)
    if (method === 'GET' && prodSlugMatch) {
      const slug = prodSlugMatch[1]
      const row = db.prepare(`
        SELECT 
          p.*,
          c.name as category_name,
          c.slug as category_slug,
          parent_c.name as parent_category_name,
          parent_c.slug as parent_category_slug
        FROM products p
        JOIN categories c ON p.category_id = c.id
        LEFT JOIN categories parent_c ON c.parent_id = parent_c.id
        WHERE p.slug = ? AND p.status = 'active'
      `).get(slug)

      if (!row) return sendError('Product not found', 404)

      const product = formatProduct(row, true)

      // Get up to 4 related products
      const related = db.prepare(`
        SELECT 
          p.*,
          c.name as category_name,
          c.slug as category_slug,
          parent_c.name as parent_category_name,
          parent_c.slug as parent_category_slug
        FROM products p
        JOIN categories c ON p.category_id = c.id
        LEFT JOIN categories parent_c ON c.parent_id = parent_c.id
        WHERE (p.category_id = ? OR c.parent_id = ?) AND p.id != ? AND p.status = 'active'
        ORDER BY p.bestseller DESC, p.rating DESC
        LIMIT 4
      `).all(row.category_id, row.parent_category_name ? row.parent_category_name : row.category_id, row.id)

      product.related = related.map(r => formatProduct(r))

      return sendJson({ success: true, data: product })
    }

    // ----------------------------------------------------
    // POST /api/orders
    // ----------------------------------------------------
    if (method === 'POST' && pathname === '/api/orders') {
      let body = ''
      req.on('data', chunk => { body += chunk })
      req.on('end', () => {
        try {
          const data = JSON.parse(body || '{}')
          const {
            customerName, email, phone, shippingAddress, city, state, pincode, country = 'India',
            paymentMethod = 'cod', items = []
          } = data

          if (!customerName || !email || !phone || !shippingAddress || !city || !state || !pincode) {
            return sendError('Please fill in all required shipping details.')
          }

          if (!items || items.length === 0) {
            return sendError('Your shopping cart is empty.')
          }

          // Validate items against DB and calculate authoritative prices
          let calculatedSubtotal = 0
          const verifiedItems = []

          for (const item of items) {
            const product = db.prepare(`
              SELECT id, name, sku, price, sale_price, stock_quantity, status
              FROM products WHERE (id = ? OR slug = ?) AND status = 'active'
            `).get(item.id || 0, item.slug || '')

            if (!product) {
              return sendError(`Product "${item.name || item.id}" is no longer available.`)
            }

            const qty = Math.max(1, Number(item.quantity) || 1)
            if (product.stock_quantity < qty) {
              return sendError(`Insufficient stock for "${product.name}". Available: ${product.stock_quantity}`)
            }

            const itemUnitPrice = product.sale_price ? Number(product.sale_price) : Number(product.price)
            const itemTotal = itemUnitPrice * qty
            calculatedSubtotal += itemTotal

            verifiedItems.push({
              productId: product.id,
              name: product.name,
              sku: item.sku || product.sku,
              size: item.size || null,
              quantity: qty,
              price: itemUnitPrice,
              total: itemTotal,
            })
          }

          // Shipping: Free on orders >= 999, else 99
          const shippingCharge = calculatedSubtotal >= 999 ? 0 : 99
          const discount = 0
          const finalTotal = calculatedSubtotal - discount + shippingCharge

          // Generate Unique Order Number: BFIT-2026-XXXXXX
          const randomSuffix = Math.floor(100000 + Math.random() * 900000)
          const orderNumber = `BFIT-2026-${randomSuffix}`

          // Database Transaction
          db.exec('BEGIN TRANSACTION')

          try {
            const orderRes = db.prepare(`
              INSERT INTO orders (
                order_number, customer_name, email, phone,
                shipping_address, city, state, pincode, country,
                subtotal, discount, shipping_charge, total_amount,
                payment_method, payment_status, order_status
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).run(
              orderNumber, customerName, email, phone,
              shippingAddress, city, state, pincode, country,
              calculatedSubtotal, discount, shippingCharge, finalTotal,
              paymentMethod, paymentMethod === 'cod' ? 'pending' : 'paid', 'confirmed'
            )

            const orderId = Number(orderRes.lastInsertRowid)

            const insertItemStmt = db.prepare(`
              INSERT INTO order_items (
                order_id, product_id, product_name, sku, quantity, size, price, total
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `)

            const updateStockStmt = db.prepare(`
              UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?
            `)

            for (const item of verifiedItems) {
              insertItemStmt.run(
                orderId,
                item.productId,
                item.name,
                item.sku,
                item.quantity,
                item.size,
                item.price,
                item.total
              )
              updateStockStmt.run(item.quantity, item.productId)
            }

            db.exec('COMMIT')

            return sendJson({
              success: true,
              message: 'Order created successfully!',
              order: {
                id: orderId,
                orderNumber,
                customerName,
                email,
                phone,
                shippingAddress: `${shippingAddress}, ${city}, ${state} ${pincode}, ${country}`,
                subtotal: calculatedSubtotal,
                shippingCharge,
                totalAmount: finalTotal,
                paymentMethod,
                orderStatus: 'confirmed',
                itemCount: verifiedItems.reduce((s, i) => s + i.quantity, 0),
                items: verifiedItems,
                estimatedDelivery: '3 to 5 Business Days'
              }
            }, 201)

          } catch (txErr) {
            db.exec('ROLLBACK')
            console.error('Order transaction error:', txErr)
            return sendError('Failed to create order. Please try again.')
          }

        } catch (parseErr) {
          return sendError('Invalid JSON payload')
        }
      })
      return
    }

    // ----------------------------------------------------
    // GET /api/orders/:orderNumber
    // ----------------------------------------------------
    const orderMatch = pathname.match(/^\/api\/orders\/([^/]+)$/)
    if (method === 'GET' && orderMatch) {
      const orderNumber = orderMatch[1]
      const order = db.prepare(`SELECT * FROM orders WHERE order_number = ?`).get(orderNumber)
      if (!order) return sendError('Order not found', 404)

      const items = db.prepare(`
        SELECT oi.*, p.slug as product_slug,
          (SELECT image_url FROM product_images WHERE product_id = oi.product_id LIMIT 1) as thumbnail
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `).all(order.id)

      return sendJson({
        success: true,
        data: {
          ...order,
          items: items.map(i => ({
            id: i.id,
            productId: i.product_id,
            name: i.product_name,
            sku: i.sku,
            quantity: i.quantity,
            size: i.size,
            price: i.price,
            total: i.total,
            slug: i.product_slug,
            thumbnail: i.thumbnail || 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80'
          }))
        }
      })
    }

    // Unmatched API route
    return sendError(`API endpoint ${method} ${pathname} not found`, 404)

  } catch (err) {
    console.error('API Error:', err)
    return sendError('Internal Server Error: ' + err.message, 500)
  }
}
