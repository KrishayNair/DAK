"use client";

import { useState, useEffect } from "react";
import { fetchFromAPI } from "@/lib/api";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { buildImageUrl } from "@/lib/utils";
import Link from "next/link";
export default function CollectionGrid() {
    const [collections, setCollections] = useState([]);

    async function getCollections() {
        const res = await fetchFromAPI("collection/");
        if (res.success) {
            setCollections(res.data);
        }
    }

    useEffect(() => {
        getCollections();
    }, []);

    return (
        <section className="w-full bg-white py-8 px-4 sm:px-6 rounded-none sm:rounded-[12rem] sm:rounded-b-none">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-10">
                    <CardTitle className="text-3xl mb-2">Explore Collections</CardTitle>
                    <CardDescription className="text-lg">
                        Discover our curated stamp collections
                    </CardDescription>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[240px] gap-4">
                    {collections.map((collection, index) => (
                        <Link href={`/shop/collection/${collection.slug}`} key={collection.id}>
                            <div 
                                className={`relative rounded-lg overflow-hidden cursor-pointer ${
                                    index === 0 || index === 5 ? 'col-span-2' : 'col-span-1'
                                } ${
                                    index === 3 || index === 4 ? 'row-span-2' : ''
                                }`}
                            >
                                <img 
                                    src={buildImageUrl(collection.image)} 
                                    alt={collection.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 transition-opacity duration-300 flex flex-col justify-center items-center p-6">
                                    <h3 className="text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">{collection.name}</h3>
                                    <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center mt-2">{collection.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}