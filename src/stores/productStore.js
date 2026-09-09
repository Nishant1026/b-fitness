import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { products } from '../data/products.js'

export const useProductStore = defineStore('products', () => {
    const allProducts = ref(products)
    const searchQuery = ref('')
    const activeCategory = ref('')
    const activeSubCategory = ref('')
    const activeGender = ref('')
    const activeSizes = ref([])
    const activeColors = ref([])
    const priceRange = ref([0, 5000])
    const minRating = ref(0)
    const sortBy = ref('featured')
    const loading = ref(false)

    const filteredProducts = computed(() => {
        let result = allProducts.value

        if (activeCategory.value) {
            result = result.filter(p =>
                p.category.toLowerCase().replace(/\s+/g, '-') === activeCategory.value.toLowerCase()
            )
        }

        if (activeSubCategory.value) {
            result = result.filter(p =>
                p.subCategory.toLowerCase() === activeSubCategory.value.toLowerCase()
            )
        }

        if (activeGender.value) {
            result = result.filter(p =>
                p.gender === activeGender.value || p.gender === 'unisex'
            )
        }

        if (activeSizes.value.length > 0) {
            result = result.filter(p =>
                p.sizes.some(s => activeSizes.value.includes(s))
            )
        }

        if (activeColors.value.length > 0) {
            result = result.filter(p =>
                p.colors.some(c => activeColors.value.includes(c))
            )
        }

        result = result.filter(p => {
            const price = p.salePrice || p.price
            return price >= priceRange.value[0] && price <= priceRange.value[1]
        })

        if (minRating.value > 0) {
            result = result.filter(p => p.rating >= minRating.value)
        }

        if (searchQuery.value.trim()) {
            const q = searchQuery.value.toLowerCase()
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.subCategory.toLowerCase().includes(q) ||
                p.sku.toLowerCase().includes(q)
            )
        }

        // Sort
        switch (sortBy.value) {
            case 'price-low': return [...result].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
            case 'price-high': return [...result].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
            case 'rating': return [...result].sort((a, b) => b.rating - a.rating)
            case 'newest': return [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            case 'sale': return [...result].sort((a, b) => (b.discount || 0) - (a.discount || 0))
            default: return result
        }
    })

    const featuredProducts = computed(() =>
        allProducts.value.filter(p => p.badge === 'featured' || p.badge === 'new').slice(0, 8)
    )

    const bestsellers = computed(() =>
        allProducts.value.filter(p => p.bestseller).slice(0, 8)
    )

    const offerProducts = computed(() =>
        allProducts.value.filter(p => p.salePrice && p.discount > 0)
    )

    function getProductBySlug(slug) {
        return allProducts.value.find(p => p.slug === slug) || null
    }

    function getProductsByCategory(category) {
        return allProducts.value.filter(p =>
            p.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
        )
    }

    function getRelatedProducts(product, limit = 4) {
        return allProducts.value
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, limit)
    }

    function resetFilters() {
        activeCategory.value = ''
        activeSubCategory.value = ''
        activeGender.value = ''
        activeSizes.value = []
        activeColors.value = []
        priceRange.value = [0, 5000]
        minRating.value = 0
        sortBy.value = 'featured'
        searchQuery.value = ''
    }

    return {
        allProducts, filteredProducts, featuredProducts, bestsellers, offerProducts,
        searchQuery, activeCategory, activeSubCategory, activeGender,
        activeSizes, activeColors, priceRange, minRating, sortBy, loading,
        getProductBySlug, getProductsByCategory, getRelatedProducts, resetFilters
    }
})
