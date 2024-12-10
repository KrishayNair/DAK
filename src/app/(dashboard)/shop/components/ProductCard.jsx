import Link from "next/link";
import { buildImageUrl } from "@/lib/utils";

export default function ProductCard({ product }) {
    return (
        <Link href={`/shop/product/${product.slug}`}>
            <div
                className="cursor-pointer rounded-lg relative overflow-hidden"
            >
                <img
                    src={buildImageUrl(product.images[0])}
                    alt={product.title}
                    className="w-full h-[400px] object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4">
                    <h3 className="text-lg font-medium">{product.title}</h3>
                    <p className="text-2xl font-medium text-gray-900 mt-2">Rs. {product.price}</p>
                </div>
            </div>
        </Link>
    )
}