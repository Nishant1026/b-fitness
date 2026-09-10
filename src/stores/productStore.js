import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
    products,
    getProductBySlug as helperGetProductBySlug,
    getProductsByCategory as helperGetProductsByCategory,
    getProductsBySubcategory as helperGetProductsBySubcategory,
    getSaleProducts as helperGetSaleProducts,
    getRelatedProducts as helperGetRelatedProducts,
} from '../data/products.js'

export const useProductStore = defineStore('products', () => {
    const allProducts = ref(products)
    const searchQuery = ref('')
    const activeCategory = ref('')
    const activeSubCategory = ref('')
    const activeGender = ref('')
    const activeSizes = ref([])
    const activeColors = ref([])
    const priceRange = ref([0, 10000])
    const minRating = ref(0)
    const sortBy = ref('featured')
    const loading = ref(false)

    // Normalize slug helper for comparisons
    function normalizeSlug(str) {
        if (!str) return ''
        return str.toLowerCase().replace(/[\s&/]+/g, '-').trim()
    }

    const filteredProducts = computed(() => {
        let result = allProducts.value

        // Category filter
        if (activeCategory.value) {
            const cat = normalizeSlug(activeCategory.value)
            if (cat === 'sale') {
                result = result.filter(p => p.sale === true || (p.discount && p.discount > 0))
            } else if (cat === 'sports-clothing') {
                result = result.filter(p => p.category === 'men' || p.category === 'women')
            } else if (cat === 'performance-bottomwear') {
                result = result.filter(p => p.subcategory.includes('track-pants') || p.subcategory.includes('shorts') || p.subcategory.includes('leggings'))
            } else if (cat === 'gym-accessories') {
                result = result.filter(p => p.category === 'accessories')
            } else if (cat === 'sports-supplements') {
                result = result.filter(p => p.category === 'supplements')
            } else {
                result = result.filter(p =>
                    normalizeSlug(p.category) === cat ||
                    (p.gender && normalizeSlug(p.gender) === cat)
                )
            }
        }

        // Subcategory filter
        if (activeSubCategory.value) {
            const sub = normalizeSlug(activeSubCategory.value)
            result = result.filter(p =>
                normalizeSlug(p.subcategory) === sub ||
                (p.categoryName && normalizeSlug(p.categoryName) === sub)
            )
        }

        // Gender filter
        if (activeGender.value) {
            const gen = activeGender.value.toLowerCase()
            result = result.filter(p =>
                p.gender && (p.gender.toLowerCase() === gen || p.gender.toLowerCase() === 'unisex')
            )
        }

        // Size filter
        if (activeSizes.value.length > 0) {
            result = result.filter(p =>
                p.sizes && p.sizes.some(s => activeSizes.value.includes(s))
            )
        }

        // Color filter
        if (activeColors.value.length > 0) {
            result = result.filter(p =>
                p.colors && p.colors.some(c => activeColors.value.includes(c))
            )
        }

        // Price range filter
        result = result.filter(p => {
            const price = p.price || p.salePrice
            return price >= priceRange.value[0] && price <= priceRange.value[1]
        })

        // Rating filter
        if (minRating.value > 0) {
            result = result.filter(p => p.rating >= minRating.value)
        }

        // Search query filter
        if (searchQuery.value.trim()) {
            const q = searchQuery.value.toLowerCase().trim()
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.subcategory.toLowerCase().includes(q) ||
                (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
                (p.sku && p.sku.toLowerCase().includes(q)) ||
                (p.description && p.description.toLowerCase().includes(q)) ||
                (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
            )
        }

        // Sorting
        switch (sortBy.value) {
            case 'price-low':
                return [...result].sort((a, b) => (a.price || a.salePrice) - (b.price || b.salePrice))
            case 'price-high':
                return [...result].sort((a, b) => (b.price || b.salePrice) - (a.price || a.salePrice))
            case 'rating':
                return [...result].sort((a, b) => b.rating - a.rating)
            case 'newest':
                return [...result].sort((a, b) => b.id - a.id)
            case 'sale':
            case 'popularity':
                return [...result].sort((a, b) => (b.discount || 0) - (a.discount || 0) || (b.reviews || 0) - (a.reviews || 0))
            default:
                return result
        }
    })

    const featuredProducts = computed(() =>
        allProducts.value.filter(p => p.featured || p.badge === 'featured' || p.badge === 'bestseller').slice(0, 8)
    )

    const bestsellers = computed(() =>
        allProducts.value.filter(p => p.bestseller).slice(0, 8)
    )

    const offerProducts = computed(() =>
        allProducts.value.filter(p => p.sale === true || (p.discount && p.discount > 0))
    )

    function getProductBySlug(slug) {
        return helperGetProductBySlug(slug)
    }

    function getProductsByCategory(category) {
        return helperGetProductsByCategory(category)
    }

    function getProductsBySubcategory(category, subcategory) {
        return helperGetProductsBySubcategory(category, subcategory)
    }

    function getRelatedProducts(product, limit = 4) {
        return helperGetRelatedProducts(product, limit)
    }

    function resetFilters() {
        activeCategory.value = ''
        activeSubCategory.value = ''
        activeGender.value = ''
        activeSizes.value = []
        activeColors.value = []
        priceRange.value = [0, 10000]
        minRating.value = 0
        sortBy.value = 'featured'
        searchQuery.value = ''
    }

    return {
        allProducts, filteredProducts, featuredProducts, bestsellers, offerProducts,
        searchQuery, activeCategory, activeSubCategory, activeGender,
        activeSizes, activeColors, priceRange, minRating, sortBy, loading,
        getProductBySlug, getProductsByCategory, getProductsBySubcategory,
        getRelatedProducts, resetFilters
    }
})
