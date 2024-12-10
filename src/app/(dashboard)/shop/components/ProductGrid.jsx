"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { fetchFromAPI } from "@/lib/api";


export default function ProductsGrid() {
    const [products, setProducts] = useState([]);
    
    async function getProducts() {
        const res = await fetchFromAPI("product/");
        if (res.success) {
            setProducts(res.data);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 mb-10">
            <div className="mb-10">
                <h2 className="text-3xl font-bold mb-2">Our Best Sellers</h2>
                <p className="text-lg text-gray-600">Discover our most popular and sought-after stamps</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
