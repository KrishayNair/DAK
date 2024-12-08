import { buildImageUrl } from "@/lib/utils";

export default function ProductCard({ product }) {
    return (
        <div
            className="cursor-pointer h-[400px] bg-[#FFE4E1] rounded-lg relative overflow-hidden"
        >
            <img
                src={buildImageUrl(product.images[0])}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute bottom-8 left-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-sm text-gray-200">{product.description}</p>
            </div>
        </div>
    )
}