import { db } from './db.js'

export function runSeed() {
  console.log('Seeding B-FIT database...')

  // Clear existing data cleanly
  db.exec(`
    DELETE FROM order_items;
    DELETE FROM orders;
    DELETE FROM product_variants;
    DELETE FROM product_images;
    DELETE FROM products;
    DELETE FROM categories;
  `)

  // 1. Insert Parent Categories
  const insertCatStmt = db.prepare(`
    INSERT INTO categories (name, slug, parent_id, image, description, status, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  // Parents
  const menCat = insertCatStmt.run('Men', 'men', null, 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80', 'Engineered men’s athletic apparel for elite gym performance.', 'active', 1)
  const menId = Number(menCat.lastInsertRowid)

  const womenCat = insertCatStmt.run('Women', 'women', null, 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80', 'High-compression, sculpted athletic activewear for women.', 'active', 2)
  const womenId = Number(womenCat.lastInsertRowid)

  const accCat = insertCatStmt.run('Accessories', 'accessories', null, 'https://images.unsplash.com/photo-1558769132-6549eca5b122?w=800&q=80', 'Professional lifting gear, duffle bags, and gym essentials.', 'active', 3)
  const accId = Number(accCat.lastInsertRowid)

  const supCat = insertCatStmt.run('Supplements', 'supplements', null, 'https://images.unsplash.com/photo-1593095948490-3b26fe1e5a1b?w=800&q=80', 'Pure, tested, science-backed nutrition and fuel for champions.', 'active', 4)
  const supId = Number(supCat.lastInsertRowid)

  const saleCat = insertCatStmt.run('Sale', 'sale', null, 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80', 'Exclusive discounts on top-tier B-FIT performance apparel.', 'active', 5)
  const saleId = Number(saleCat.lastInsertRowid)

  // 2. Insert Subcategories
  const subCategoryMap = {}

  function addSub(name, slug, parentId, sortOrder) {
    const res = insertCatStmt.run(name, slug, parentId, null, `${name} collection by B-FIT`, 'active', sortOrder)
    const key = `${parentId}_${slug}`
    subCategoryMap[key] = Number(res.lastInsertRowid)
    return Number(res.lastInsertRowid)
  }

  // Men Subcategories
  const mTshirts = addSub('T-Shirts', 't-shirts', menId, 1)
  const mVests = addSub('Vests & Stringers', 'vests-stringers', menId, 2)
  const mTrackSuits = addSub('Track Suits', 'track-suits', menId, 3)
  const mTrackPants = addSub('Track Pants & Shorts', 'track-pants-shorts', menId, 4)
  const mHoodies = addSub('Hoodies', 'hoodies', menId, 5)
  const mSweatshirts = addSub('Sweatshirts', 'sweatshirts', menId, 6)
  const mJackets = addSub('Jackets', 'jackets', menId, 7)
  const mGymWear = addSub('Gym Wear', 'gym-wear', menId, 8)

  // Women Subcategories
  const wTshirts = addSub('T-Shirts', 't-shirts', womenId, 1)
  const wBras = addSub('Sports Bras', 'sports-bras', womenId, 2)
  const wLeggings = addSub('Leggings', 'leggings', womenId, 3)
  const wTrackPants = addSub('Track Pants', 'track-pants', womenId, 4)
  const wShorts = addSub('Shorts', 'shorts', womenId, 5)
  const wHoodies = addSub('Hoodies', 'hoodies', womenId, 6)
  const wJackets = addSub('Jackets', 'jackets', womenId, 7)
  const wGymWear = addSub('Gym Wear', 'gym-wear', womenId, 8)

  // Accessories Subcategories
  const aBags = addSub('Gym Bags', 'gym-bags', accId, 1)
  const aCaps = addSub('Caps', 'caps', accId, 2)
  const aSocks = addSub('Socks', 'socks', accId, 3)
  const aGloves = addSub('Gloves', 'gloves', accId, 4)
  const aBelts = addSub('Belts', 'belts', accId, 5)
  const aBottles = addSub('Bottles', 'bottles', accId, 6)
  const aTowels = addSub('Towels', 'towels', accId, 7)
  const aTraining = addSub('Training Accessories', 'training-accessories', accId, 8)

  // Supplements Subcategories
  const sProtein = addSub('Protein', 'protein', supId, 1)
  const sPreWorkout = addSub('Pre Workout', 'pre-workout', supId, 2)
  const sRecovery = addSub('Recovery', 'recovery', supId, 3)
  const sVitamins = addSub('Vitamins', 'vitamins', supId, 4)
  const sPerformance = addSub('Performance', 'performance', supId, 5)

  // Sale Subcategories
  const saleProductsCat = addSub('Sale Products', 'sale-products', saleId, 1)

  // 3. Products Data
  const insertProductStmt = db.prepare(`
    INSERT INTO products (
      category_id, name, slug, sku, description, short_description,
      price, sale_price, discount_percentage, brand, gender, stock_quantity,
      rating, review_count, featured, bestseller, badge, material, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const insertImageStmt = db.prepare(`
    INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
    VALUES (?, ?, ?, ?, ?)
  `)

  const insertVariantStmt = db.prepare(`
    INSERT INTO product_variants (product_id, size, color, sku, price, stock_quantity, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  const rawProducts = [
    // ================= MEN T-SHIRTS =================
    {
      categoryId: mTshirts,
      name: 'B-FIT Pro Performance T-Shirt',
      slug: 'bfit-pro-performance-tshirt',
      sku: 'BF-M-TS-001',
      description: 'Built for peak workout intensity. Engineered with moisture-wicking Pro-Dry fibers that pull sweat away from skin for rapid evaporation. Features flatlock anti-chafing seams, 4-way stretch flex, and a streamlined athletic tapered cut.',
      shortDescription: 'Elite moisture-wicking gym training t-shirt.',
      price: 1499,
      salePrice: 1199,
      discount: 20,
      gender: 'men',
      stock: 85,
      rating: 4.8,
      reviews: 142,
      featured: 1,
      bestseller: 1,
      badge: 'bestseller',
      material: '88% Polyester, 12% Spandex',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Charcoal', 'Gym Red'],
      images: [
        'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80'
      ]
    },
    {
      categoryId: mTshirts,
      name: 'B-FIT Oversized Training T-Shirt',
      slug: 'bfit-oversized-training-tshirt',
      sku: 'BF-M-TS-002',
      description: 'Heavyweight premium drop-shoulder oversized tee for powerlifting and bodybuilding workouts. Crafted from 240 GSM organic combed cotton with breathable mesh ventilation on high-heat zones.',
      shortDescription: '240 GSM heavyweight drop-shoulder oversized pump cover.',
      price: 1699,
      salePrice: 1299,
      discount: 24,
      gender: 'men',
      stock: 65,
      rating: 4.9,
      reviews: 98,
      featured: 1,
      bestseller: 1,
      badge: 'featured',
      material: '100% Combed Cotton 240 GSM',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Washed Black', 'Military Green', 'Off-White'],
      images: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80'
      ]
    },
    {
      categoryId: mTshirts,
      name: 'B-FIT Dry Fit Gym T-Shirt',
      slug: 'bfit-dry-fit-gym-tshirt',
      sku: 'BF-M-TS-003',
      description: 'Ultra-lightweight high-breathability training tee designed for functional workouts and high-cardio training. Odor-resistant silver yarn technology ensures freshness session after session.',
      shortDescription: 'Ultralight antimicrobial dry-fit workout tee.',
      price: 1299,
      salePrice: 999,
      discount: 23,
      gender: 'men',
      stock: 90,
      rating: 4.7,
      reviews: 64,
      featured: 0,
      bestseller: 0,
      badge: 'sale',
      material: '92% Micro-Polyester, 8% Elastane',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Obsidian Navy', 'Stealth Black'],
      images: [
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
        'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80'
      ]
    },

    // ================= MEN VESTS & STRINGERS =================
    {
      categoryId: mVests,
      name: 'B-FIT Performance Gym Vest',
      slug: 'bfit-performance-gym-vest',
      sku: 'BF-M-VS-001',
      description: 'Engineered sleeveless cut allowing uninhibited shoulder movement for lateral raises, shoulder presses, and pull-ups. Deep armholes with durable double-needle ribbing.',
      shortDescription: 'Deep-cut muscle tank for maximum shoulder mobility.',
      price: 999,
      salePrice: 799,
      discount: 20,
      gender: 'men',
      stock: 60,
      rating: 4.6,
      reviews: 51,
      featured: 0,
      bestseller: 1,
      badge: 'bestseller',
      material: '95% Cotton, 5% Lycra',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Jet Black', 'Heather Gray', 'White'],
      images: [
        'https://images.unsplash.com/photo-1534438327-3d159c1dcdd3?w=800&q=80',
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80'
      ]
    },
    {
      categoryId: mVests,
      name: 'B-FIT Bodybuilding Y-Back Stringer',
      slug: 'bfit-bodybuilding-y-back-stringer',
      sku: 'BF-M-VS-002',
      description: 'Classic bodybuilding racerback stringer displaying back lat spread and rear deltoid definition during pulling sessions. Ultra-soft touch cotton blend.',
      shortDescription: 'Classic racerback y-back lifting stringer.',
      price: 899,
      salePrice: 699,
      discount: 22,
      gender: 'men',
      stock: 45,
      rating: 4.8,
      reviews: 39,
      featured: 0,
      bestseller: 0,
      badge: 'new',
      material: '100% Ring-Spun Cotton',
      sizes: ['M', 'L', 'XL'],
      colors: ['Crimson Red', 'Black'],
      images: [
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
        'https://images.unsplash.com/photo-1534438327-3d159c1dcdd3?w=800&q=80'
      ]
    },

    // ================= MEN TRACK SUITS & PANTS =================
    {
      categoryId: mTrackSuits,
      name: 'B-FIT Velocity Pro Track Suit',
      slug: 'bfit-velocity-pro-track-suit',
      sku: 'BF-M-TSU-001',
      description: 'Complete 2-piece athletic warm-up tracksuit with full-zip jacket and slim-fitting jogger pants. Features weather-resistant micro-twill outer and breathable brushed mesh lining.',
      shortDescription: 'Complete 2-piece high-performance training tracksuit.',
      price: 3999,
      salePrice: 3199,
      discount: 20,
      gender: 'men',
      stock: 40,
      rating: 4.9,
      reviews: 73,
      featured: 1,
      bestseller: 1,
      badge: 'featured',
      material: '100% Performance Poly-Twill with Mesh Lining',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black & Red Accent', 'All-Black Stealth'],
      images: [
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80',
        'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80'
      ]
    },
    {
      categoryId: mTrackPants,
      name: 'B-FIT Training Track Pants',
      slug: 'bfit-training-track-pants',
      sku: 'BF-M-TP-001',
      description: 'Athletic-tapered warm-up pants with zippered ankle cuffs for swift over-shoe changes. Secure zippered deep front pockets keep smartphones safe during sprinting or lifting.',
      shortDescription: 'Tapered athletic joggers with zippered pockets and ankles.',
      price: 1999,
      salePrice: 1599,
      discount: 20,
      gender: 'men',
      stock: 70,
      rating: 4.8,
      reviews: 114,
      featured: 1,
      bestseller: 1,
      badge: 'bestseller',
      material: '80% Cotton, 20% Polyester Heavyweight Fleece',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Charcoal Black', 'Heather Grey'],
      images: [
        'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80'
      ]
    },
    {
      categoryId: mTrackPants,
      name: 'B-FIT 2-in-1 Compression Gym Shorts',
      slug: 'bfit-2-in-1-compression-gym-shorts',
      sku: 'BF-M-SH-001',
      description: 'Outer 5-inch stretch shell paired with internal compression liner that stops inner-thigh friction. Includes designated liner phone pocket and towel loop on the back waistband.',
      shortDescription: '5-inch gym shorts with integrated compression liner and phone pocket.',
      price: 1499,
      salePrice: 1199,
      discount: 20,
      gender: 'men',
      stock: 65,
      rating: 4.7,
      reviews: 82,
      featured: 0,
      bestseller: 1,
      badge: 'sale',
      material: '90% Nylon, 10% Spandex 4-Way Stretch',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Matte Black', 'Army Green'],
      images: [
        'https://images.unsplash.com/photo-1562183241-b937e70a0f5c?w=800&q=80',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80'
      ]
    },

    // ================= MEN HOODIES & JACKETS =================
    {
      categoryId: mHoodies,
      name: 'B-FIT Heavyweight Training Hoodie',
      slug: 'bfit-heavyweight-training-hoodie',
      sku: 'BF-M-HD-001',
      description: '380 GSM thermal brushed fleece crafted for cold-weather training and pre-workout warmups. Double-layered hood stays upright, featuring heavy-duty kangaroo pouch and ribbed cuffs.',
      shortDescription: '380 GSM premium heavyweight fleece athletic pullover hoodie.',
      price: 2999,
      salePrice: 2399,
      discount: 20,
      gender: 'men',
      stock: 50,
      rating: 4.9,
      reviews: 93,
      featured: 1,
      bestseller: 1,
      badge: 'featured',
      material: '85% Organic Cotton, 15% Recycled Poly Fleece 380 GSM',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Onyx Black', 'Gunmetal Grey'],
      images: [
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80'
      ]
    },
    {
      categoryId: mJackets,
      name: 'B-FIT WindShield Performance Jacket',
      slug: 'bfit-windshield-performance-jacket',
      sku: 'BF-M-JK-001',
      description: 'Water-repellent, windproof lightweight zip jacket engineered for outdoor runs and gym commutes. Laser-cut underarm ventilation holes maintain body temperature equilibrium.',
      shortDescription: 'Lightweight water-repellent windbreaker with laser vents.',
      price: 3499,
      salePrice: 2799,
      discount: 20,
      gender: 'men',
      stock: 35,
      rating: 4.8,
      reviews: 44,
      featured: 0,
      bestseller: 0,
      badge: 'new',
      material: '100% Ripstop Wind-Barrier Nylon',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black Stealth'],
      images: [
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80'
      ]
    },

    // ================= WOMEN T-SHIRTS & BRAS =================
    {
      categoryId: wTshirts,
      name: "B-FIT Women's Training T-Shirt",
      slug: 'bfit-womens-training-tshirt',
      sku: 'BF-W-TS-001',
      description: 'Contoured feminine silhouette featuring breathable anti-odor mesh fabric. Slightly elongated curved hemline provides superior coverage during deep barbell squats and hip thrusts.',
      shortDescription: 'Contoured sweat-wicking training tee with curved hemline.',
      price: 1399,
      salePrice: 1099,
      discount: 21,
      gender: 'women',
      stock: 75,
      rating: 4.8,
      reviews: 86,
      featured: 1,
      bestseller: 1,
      badge: 'bestseller',
      material: '90% Nylon, 10% Spandex Pro-Feel',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Pure White', 'Rose Dust', 'Black'],
      images: [
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80'
      ]
    },
    {
      categoryId: wBras,
      name: 'B-FIT High-Impact Sports Bra',
      slug: 'bfit-high-impact-sports-bra',
      sku: 'BF-W-SB-001',
      description: 'Maximum stability and zero bounce for intense HIIT, running, and jumping rope. Features molded removable cups, wide cushioned criss-cross back straps, and non-slip underband.',
      shortDescription: 'High-support, zero-bounce sports bra for intense workouts.',
      price: 1599,
      salePrice: 1249,
      discount: 22,
      gender: 'women',
      stock: 65,
      rating: 4.9,
      reviews: 132,
      featured: 1,
      bestseller: 1,
      badge: 'featured',
      material: '75% Nylon, 25% Lycra High-Compression',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Jet Black', 'Berry Crimson'],
      images: [
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80'
      ]
    },

    // ================= WOMEN LEGGINGS & BOTTOMS =================
    {
      categoryId: wLeggings,
      name: 'B-FIT High Waist Seamless Leggings',
      slug: 'bfit-high-waist-seamless-leggings',
      sku: 'BF-W-LG-001',
      description: '100% squat-proof seamless knit leggings with a supportive ribbed high-waist band that stays locked in place. Glute-contouring shading accentuates your natural curves without sheer spots.',
      shortDescription: 'Squat-proof high-waisted seamless sculpting gym leggings.',
      price: 2199,
      salePrice: 1699,
      discount: 23,
      gender: 'women',
      stock: 80,
      rating: 4.9,
      reviews: 178,
      featured: 1,
      bestseller: 1,
      badge: 'bestseller',
      material: 'Seamless Microfiber & Elastane blend',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Midnight Black', 'Slate Grey', 'Wine Berry'],
      images: [
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80'
      ]
    },
    {
      categoryId: wShorts,
      name: 'B-FIT Biker Training Shorts',
      slug: 'bfit-biker-training-shorts',
      sku: 'BF-W-SH-001',
      description: '6-inch mid-thigh length athletic shorts with dual side drop-in pockets designed to fit large smartphones. Seamless inner leg eliminates chafing during cycling and squats.',
      shortDescription: '6-inch high-waisted gym biker shorts with phone pockets.',
      price: 1399,
      salePrice: 1099,
      discount: 21,
      gender: 'women',
      stock: 60,
      rating: 4.7,
      reviews: 67,
      featured: 0,
      bestseller: 0,
      badge: 'sale',
      material: '80% Polyamide, 20% Elastane',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Black', 'Navy Blue'],
      images: [
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80'
      ]
    },
    {
      categoryId: wHoodies,
      name: 'B-FIT Women Cropped Gym Hoodie',
      slug: 'bfit-women-cropped-gym-hoodie',
      sku: 'BF-W-HD-001',
      description: 'Cozy brushed french terry crop pullover hoodie. Raw cut bottom hemline pairs flawlessly with high-waist gym leggings for street-to-gym athletic fashion.',
      shortDescription: 'Ultra-soft cropped pullover hoodie for gym and lifestyle.',
      price: 2499,
      salePrice: 1999,
      discount: 20,
      gender: 'women',
      stock: 40,
      rating: 4.8,
      reviews: 58,
      featured: 0,
      bestseller: 1,
      badge: 'new',
      material: '100% French Terry Cotton',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Charcoal Black', 'Alabaster White'],
      images: [
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80'
      ]
    },

    // ================= ACCESSORIES =================
    {
      categoryId: aBags,
      name: 'B-FIT Pro Training Duffle Bag',
      slug: 'bfit-pro-training-duffle-bag',
      sku: 'BF-ACC-BAG-001',
      description: '45-liter waterproof tactical gym duffle bag featuring isolated ventilated shoe compartment, insulated water bottle sleeve, and waterproof wet-gear compartment.',
      shortDescription: '45L waterproof gym duffle with ventilated shoe compartment.',
      price: 2799,
      salePrice: 2199,
      discount: 21,
      gender: 'unisex',
      stock: 75,
      rating: 4.9,
      reviews: 145,
      featured: 1,
      bestseller: 1,
      badge: 'bestseller',
      material: '900D Ballistic Cordura Water-Resistant Nylon',
      sizes: ['One Size (45L)'],
      colors: ['Matte Black', 'Stealth Grey'],
      images: [
        'https://images.unsplash.com/photo-1558769132-6549eca5b122?w=800&q=80',
        'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80'
      ]
    },
    {
      categoryId: aBottles,
      name: 'B-FIT Insulated Stainless Steel Bottle',
      slug: 'bfit-insulated-stainless-steel-bottle',
      sku: 'BF-ACC-BOT-001',
      description: 'Double-walled vacuum insulated food-grade 18/8 stainless steel bottle. Keeps pre-workout ice cold for 24 hours or coffee steaming hot for 12 hours. Sweat-proof matte powder coat.',
      shortDescription: '1000ml double-wall vacuum insulated stainless steel shaker.',
      price: 1299,
      salePrice: 999,
      discount: 23,
      gender: 'unisex',
      stock: 120,
      rating: 4.8,
      reviews: 210,
      featured: 1,
      bestseller: 1,
      badge: 'bestseller',
      material: '18/8 Pro-Grade Stainless Steel & BPA-Free Lid',
      sizes: ['1000 ml'],
      colors: ['Matte Black', 'Steel Silver', 'Crimson Red'],
      images: [
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
        'https://images.unsplash.com/photo-1558769132-6549eca5b122?w=800&q=80'
      ]
    },
    {
      categoryId: aBelts,
      name: 'B-FIT 10mm Leather Powerlifting Belt',
      slug: 'bfit-10mm-leather-powerlifting-belt',
      sku: 'BF-ACC-BLT-001',
      description: 'Competition-grade 10mm thickness genuine cowhide leather weightlifting belt with rapid heavy-duty zinc alloy lever buckle. Provides rigid intra-abdominal pressure for heavy squats and deadlifts.',
      shortDescription: '10mm genuine leather lever-lock powerlifting belt.',
      price: 3499,
      salePrice: 2899,
      discount: 17,
      gender: 'unisex',
      stock: 45,
      rating: 5.0,
      reviews: 89,
      featured: 1,
      bestseller: 1,
      badge: 'featured',
      material: 'Top-Grain Cowhide Leather & Steel Lever Buckle',
      sizes: ['S (28-32")', 'M (32-36")', 'L (36-40")', 'XL (40-44")'],
      colors: ['All Black Leather', 'Red Suede Stitch'],
      images: [
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
        'https://images.unsplash.com/photo-1558769132-6549eca5b122?w=800&q=80'
      ]
    },
    {
      categoryId: aGloves,
      name: 'B-FIT Heavy Duty Gym Gloves',
      slug: 'bfit-heavy-duty-gym-gloves',
      sku: 'BF-ACC-GLV-001',
      description: 'Padded silicone palm grip weightlifting gloves with built-in 18-inch elastic wrist wraps. Prevents calluses while offering wrist joint stabilization on heavy bench press.',
      shortDescription: 'Weightlifting gloves with integrated 18-inch wrist wraps.',
      price: 899,
      salePrice: 699,
      discount: 22,
      gender: 'unisex',
      stock: 80,
      rating: 4.7,
      reviews: 76,
      featured: 0,
      bestseller: 0,
      badge: 'sale',
      material: 'Silicone Grip, Neoprene & Microfiber',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black & Red'],
      images: [
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
        'https://images.unsplash.com/photo-1558769132-6549eca5b122?w=800&q=80'
      ]
    },
    {
      categoryId: aCaps,
      name: 'B-FIT Aerodynamic Gym Cap',
      slug: 'bfit-aerodynamic-gym-cap',
      sku: 'BF-ACC-CAP-001',
      description: 'Structured curved-brim training cap featuring laser-perforated side panels for optimal heat release. Moisture-wicking sweatband keeps perspiration out of eyes.',
      shortDescription: 'Laser-perforated breathable performance dad cap.',
      price: 799,
      salePrice: 599,
      discount: 25,
      gender: 'unisex',
      stock: 90,
      rating: 4.6,
      reviews: 62,
      featured: 0,
      bestseller: 0,
      badge: 'new',
      material: '100% Quick-Dry Polyester',
      sizes: ['One Size (Adjustable)'],
      colors: ['Stealth Black', 'Pure White'],
      images: [
        'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
        'https://images.unsplash.com/photo-1558769132-6549eca5b122?w=800&q=80'
      ]
    },

    // ================= SUPPLEMENTS =================
    {
      categoryId: sProtein,
      name: 'B-FIT 100% Pure Whey Isolate Protein (2kg)',
      slug: 'bfit-100-pure-whey-isolate-protein',
      sku: 'BF-SUP-PRO-001',
      description: 'Ultra-pure micro-filtered whey protein isolate delivering 27g of protein, 5.8g BCAAs, and 0g sugar per scoop. Informed-Choice certified for zero banned substances. Enhances lean muscle recovery rapidly.',
      shortDescription: '27g Protein, 5.8g BCAA, 0g Sugar Ultra-pure Whey Isolate (2kg).',
      price: 4999,
      salePrice: 4199,
      discount: 16,
      gender: 'unisex',
      stock: 60,
      rating: 4.9,
      reviews: 240,
      featured: 1,
      bestseller: 1,
      badge: 'bestseller',
      material: 'Cross-Flow Microfiltered Whey Protein Isolate',
      sizes: ['2 kg (66 Servings)'],
      colors: ['Double Rich Chocolate', 'Café Latte', 'Vanilla Bean'],
      images: [
        'https://images.unsplash.com/photo-1593095948490-3b26fe1e5a1b?w=800&q=80',
        'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&q=80'
      ]
    },
    {
      categoryId: sPreWorkout,
      name: 'B-FIT Igniter Extreme Pre-Workout (300g)',
      slug: 'bfit-igniter-extreme-pre-workout',
      sku: 'BF-SUP-PRE-001',
      description: 'Clinically dosed nitric oxide pump and neuro-focus formula. Packed with 6000mg L-Citrulline Malate, 3200mg Beta-Alanine for endurance, and 300mg Caffeine Anhydrous with zero crash.',
      shortDescription: 'High-stimulant extreme energy & skin-splitting pump pre-workout.',
      price: 2499,
      salePrice: 1999,
      discount: 20,
      gender: 'unisex',
      stock: 80,
      rating: 4.8,
      reviews: 165,
      featured: 1,
      bestseller: 1,
      badge: 'featured',
      material: 'Clinically Dosed Amino Acid Powder',
      sizes: ['300g (30 Servings)'],
      colors: ['Sour Green Apple', 'Blue Razz Freeze', 'Watermelon Blitz'],
      images: [
        'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&q=80',
        'https://images.unsplash.com/photo-1593095948490-3b26fe1e5a1b?w=800&q=80'
      ]
    },
    {
      categoryId: sRecovery,
      name: 'B-FIT Micronized Creatine Monohydrate (250g)',
      slug: 'bfit-micronized-creatine-monohydrate',
      sku: 'BF-SUP-CRE-001',
      description: '100% pharmaceutical-grade 200 mesh micronized creatine monohydrate. Dissolves instantly in water to saturate muscle phosphocreatine stores, elevating ATP output and peak power.',
      shortDescription: '200 Mesh pure micronized creatine for raw explosive strength.',
      price: 1299,
      salePrice: 999,
      discount: 23,
      gender: 'unisex',
      stock: 100,
      rating: 4.9,
      reviews: 190,
      featured: 0,
      bestseller: 1,
      badge: 'bestseller',
      material: '100% Pure Micronized Creatine Monohydrate',
      sizes: ['250g (83 Servings)'],
      colors: ['Unflavored'],
      images: [
        'https://images.unsplash.com/photo-1593095948490-3b26fe1e5a1b?w=800&q=80',
        'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&q=80'
      ]
    },
    {
      categoryId: sVitamins,
      name: 'B-FIT Athlete Multi-Mineral & Vitamins (60 Caps)',
      slug: 'bfit-athlete-multivitamin-caps',
      sku: 'BF-SUP-VIT-001',
      description: 'Tailored specifically for athletes facing high oxidative metabolic stress. Includes high-absorption Chelated Zinc, Magnesium Bisglycinate, Vitamin D3/K2, and potent antioxidant botanical extracts.',
      shortDescription: '60 capsules high-potency daily athletic micronutrient formula.',
      price: 1199,
      salePrice: 899,
      discount: 25,
      gender: 'unisex',
      stock: 70,
      rating: 4.7,
      reviews: 84,
      featured: 0,
      bestseller: 0,
      badge: 'sale',
      material: 'Chelated Minerals & Vitamin Extracts in Veggie Caps',
      sizes: ['60 Capsules'],
      colors: ['Capsules'],
      images: [
        'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&q=80',
        'https://images.unsplash.com/photo-1593095948490-3b26fe1e5a1b?w=800&q=80'
      ]
    },

    // ================= SALE PRODUCTS =================
    {
      categoryId: saleProductsCat,
      name: 'B-FIT Flash Strike Gym Tee [Clearance]',
      slug: 'bfit-flash-strike-gym-tee-clearance',
      sku: 'BF-SALE-TS-001',
      description: 'End of season exclusive clearance. Athletic lightweight training tee with iconic chest rubberized B-FIT logo. Limited units remaining in stock.',
      shortDescription: 'End-of-season flash sale training tee.',
      price: 1299,
      salePrice: 699,
      discount: 46,
      gender: 'men',
      stock: 25,
      rating: 4.6,
      reviews: 42,
      featured: 0,
      bestseller: 0,
      badge: 'sale',
      material: '100% Combed Cotton',
      sizes: ['S', 'M', 'L'],
      colors: ['Flame Red'],
      images: [
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
        'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80'
      ]
    },
    {
      categoryId: saleProductsCat,
      name: 'B-FIT Apex Sprint Shorts [Clearance]',
      slug: 'bfit-apex-sprint-shorts-clearance',
      sku: 'BF-SALE-SH-001',
      description: 'Ultra-light running and lifting shorts with side ventilation split seams and elastic drawstring waist. Deep discounted final clearance.',
      shortDescription: 'Final clearance lightweight athletic shorts.',
      price: 1499,
      salePrice: 749,
      discount: 50,
      gender: 'men',
      stock: 20,
      rating: 4.5,
      reviews: 33,
      featured: 0,
      bestseller: 0,
      badge: 'sale',
      material: '92% Polyester, 8% Elastane',
      sizes: ['M', 'L'],
      colors: ['Charcoal Black'],
      images: [
        'https://images.unsplash.com/photo-1562183241-b937e70a0f5c?w=800&q=80',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80'
      ]
    }
  ]

  // Insert all products, images, and variants
  for (const p of rawProducts) {
    const res = insertProductStmt.run(
      p.categoryId,
      p.name,
      p.slug,
      p.sku,
      p.description,
      p.shortDescription,
      p.price,
      p.salePrice,
      p.discount,
      'B-FIT',
      p.gender,
      p.stock,
      p.rating,
      p.reviews,
      p.featured,
      p.bestseller,
      p.badge,
      p.material,
      'active'
    )
    const productId = Number(res.lastInsertRowid)

    // Images
    for (let i = 0; i < p.images.length; i++) {
      insertImageStmt.run(
        productId,
        p.images[i],
        p.name,
        i,
        i === 0 ? 1 : 0
      )
    }

    // Variants
    for (const size of p.sizes) {
      for (const color of p.colors) {
        insertVariantStmt.run(
          productId,
          size,
          color,
          `${p.sku}-${size}-${color.substring(0, 3).toUpperCase()}`,
          p.salePrice || p.price,
          Math.max(5, Math.floor(p.stock / (p.sizes.length * p.colors.length))),
          'active'
        )
      }
    }
  }

  console.log(`Successfully seeded categories and ${rawProducts.length} realistic products!`)
}

// If executed directly, run seed
if (process.argv[1]?.endsWith('seed.js')) {
  runSeed()
}
