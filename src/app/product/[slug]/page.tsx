import Link from "next/link";
import { products } from "../../../data/products";
import { importedDeals } from "../../../lib/mockImporter";

function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const allProducts = [...products, ...importedDeals];

  const product = allProducts.find(
    (p) => createSlug(p.name) === slug.toLowerCase()
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-100 p-10">
        <Link href="/" className="text-blue-700 font-bold">
          ← Back to DealRadar
        </Link>
        <h1 className="text-3xl font-black mt-6">Product not found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-blue-700 font-bold">
          ← Back to DealRadar
        </Link>

        <div className="my-8 bg-white border-2 border-dashed border-slate-300 rounded-3xl p-8 text-center">
          <p className="text-sm text-slate-500 font-bold">ADVERTISEMENT</p>
          <h2 className="text-2xl font-black mt-2">Product page ad space</h2>
          <p className="text-slate-500 mt-2">
            Future Google AdSense, Ezoic, Mediavine or direct sponsor placement.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-10 p-8 md:p-10">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-3xl w-full h-[420px] object-cover"
            />

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-blue-700 font-black uppercase">
                  {product.category}
                </span>

                <span className="text-slate-500 font-bold">
                  {product.storeLogo} {product.store}
                </span>
              </div>

              <h1 className="text-5xl font-black mt-4">{product.name}</h1>

              <div className="flex items-center gap-4 mt-6">
                <span className="text-5xl font-black">{product.price}</span>
                <span className="text-2xl line-through text-slate-400">
                  {product.oldPrice}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-2xl p-5">
                  <p className="text-xs text-slate-500 font-bold">
                    DEALRADAR SCORE
                  </p>
                  <p className="text-4xl font-black text-blue-700">
                    {product.dealScore}/100
                  </p>
                </div>

                <div className="bg-red-50 rounded-2xl p-5">
                  <p className="text-xs text-slate-500 font-bold">DISCOUNT</p>
                  <p className="text-4xl font-black text-red-600">
                    -{product.discountPercent}%
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 items-center">
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                  {product.badge || product.score}
                </span>

                <span className="text-yellow-500 font-bold">
                   {product.rating}
                </span>

                {product.isTrending && (
                  <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold">
                    Trending
                  </span>
                )}
              </div>

              <div className="mt-8 bg-slate-100 rounded-2xl p-5">
                <h2 className="text-2xl font-black">
                  Why DealRadar picked this
                </h2>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  DealRadar highlights this product because it shows a strong
                  mix of discount, store availability, category relevance,
                  affiliate network potential and overall value for Canadian
                  shoppers.
                </p>

                <p className="mt-3 text-sm text-slate-500">
                  Source: {product.source}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Affiliate network: {product.affiliateNetwork}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Deal expires: {product.expiresAt}
                </p>
              </div>

              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 bg-blue-600 hover:bg-blue-700 transition text-white text-center py-4 rounded-2xl font-bold text-lg"
              >
                View Store Deal
              </a>

              <p className="mt-4 text-xs text-slate-400">
                DealRadar Canada may earn a commission when you buy through
                links on this page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}