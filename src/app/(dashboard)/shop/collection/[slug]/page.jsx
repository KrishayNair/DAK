import { fetchFromAPI } from "@/lib/api";
import ProductCard from "../../components/ProductCard";

async function getCollection(slug) {
  const res = await fetchFromAPI(`collection/${slug}/`);
  console.log(res);

  if (!res.success) {
    return { collection: null, products: null };
  }

  return {collection: res.data?.collection, products: res.data?.products};
}

export default async function CollectionPage({ params }) {
  const { collection, products } = await getCollection(params.slug);

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2">{collection?.title}</h2>
          <p className="text-gray-600">
            {collection?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products && products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
