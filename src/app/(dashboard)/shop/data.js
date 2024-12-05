export const products = [
    {
        id: 1,
        name: "India 1953 Telegraph Centenary MNH Miniature Sheet",
        price: 2200,
        originalPrice: 2500,
        image: "/images/stamps/1.jpg",
        category: "miniature-sheets",
        description: "A beautiful and rare miniature sheet from 1953 commemorating the Telegraph Centenary...",
        rating: 4.5,
        ratingCount: "15 Ratings",
        artisan: {
            name: "Maharashtra Postal Circle",
            profileImage: "/postaloffice.png",
            about: "Maharashtra Postal Circle is one of the largest postal circles in India...",
            otherArtisans: ["/postaloffice.png", "/postaloffice.png", "/postaloffice.png"],
        },
        details: [
            { label: "Year", value: "1953" },
            { label: "Condition", value: "MNH (Mint Never Hinged)" },
            { label: "Type", value: "Miniature Sheet" },
            { label: "Theme", value: "Telegraph Centenary" },
            { label: "Rarity", value: "Rare" },
            { label: "Care", value: "Store in protective sleeve" },
        ],
    },
    {
        id: 2,
        name: "India 1973 Indipex Mini Miniature Sheet",
        price: "₹2,200.00",
        image: "/images/stamps/2.jpg",
        slug: "india-1973-indipex-mini-miniature-sheet-2",
        category: "miniature-sheets",
        description: "A rare piece from the Indian postal history"
    },
    {
        id: 3,
        name: "India 1973 Indipex Mini Miniature Sheet",
        price: "₹2,200.00",
        image: "/images/stamps/3.jpg",
        slug: "india-1973-indipex-mini-miniature-sheet-3",
        category: "miniature-sheets",
        description: "Special commemorative edition"
    },
    {
        id: 4,
        name: "India 1973 Indipex Mini Miniature Sheet",
        price: "₹2,200.00",
        image: "/images/stamps/4.jpg",
        slug: "india-1973-indipex-mini-miniature-sheet-4",
        category: "miniature-sheets",
        description: "Limited edition collectible"
    },
    {
        id: 5,
        name: "India 1973 Indipex Mini Miniature Sheet",
        price: "₹2,200.00",
        image: "/images/stamps/5.jpg",
        slug: "india-1973-indipex-mini-miniature-sheet-5",
        category: "miniature-sheets",
        description: "Pristine condition, perfect for collectors"
    }
];

export const categories = [
    {
        id: 1,
        title: "Miniature Sheets",
        slug: "miniature-sheets",
        description: "A special page of stamps on a collectible theme",
        image: "/collage.png",
        products: [],
    },
    {
        id: 2,
        title: "Setenants",
        slug: "setenants",
        description: "Two or more attached stamps of different designs",
        image: "/collage.png",
        products: [],
    },
    {
        id: 3,
        title: "First Day Cover",
        slug: "first-day-cover",
        description: "Special envelope for stamp's first day of issue",
        image: "/collage.png",
        products: [],
    },
    {
        id: 4,
        title: "Miniature Sheets",
        slug: "miniature-sheets-2",
        description: "A special page of stamps on a collectible theme",
        image: "/collage.png",
        products: [],
    },
    {
        id: 5,
        title: "Miniature Sheets",
        slug: "miniature-sheets-3",
        description: "A special page of stamps on a collectible theme",
        image: "/collage.png",
        products: [],
    }
];

export const getCategoryBySlug = (slug) => {
    return categories.find(category => category.slug === slug);
}; 