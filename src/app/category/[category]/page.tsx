"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { loadCSVProducts } from "../../../lib/csvImporter";

function slugToTitle(slug: string) {
  return slug.replace(/-/g, " ");
}

export default function CategoryPage() {
  const params = useParams();
  const category = String(params.category || "");
  const categoryName = slugToTitle(category);

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadCSVProducts().then(setProducts);
  }, []);

  const filtered = products.filter(
    (p) => p.category?.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <Link href="/" className="text-2xl font-black text-blue-700">
            DealRadar Canada
          </Link>
          <Link href="/" className="font-bold">Back Home</Link>
        </div>
      </header>

      <section className="bg-gradient-to-br from-slate-950 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-5xl font-black capitalize">
            Best {categoryName} Deals Canada
          </h1>
          <p className="mt-4 text-slate-200 max-w-3xl">
            Discover ranked {categoryName} deals from Amazon Canada with deal scores and smart discounts.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <p className="mb-6 font-bold">{filtered.length} deals found</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((deal) => (
            <div key={deal.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition">
              <div className="h-52 overflow-hidden bg-slate-100">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700 font-bold">{deal.category}</span>
                  <span>{deal.store}</span>
                </div>

                <h2 className="text-2xl font-black mt-3">{deal.name}</h2>

                <div className="mt-4 flex gap-2 items-end">
                  <span className="text-3xl font-black">{deal.price}</span>
                  <span className="line-through text-slate-400">{deal.oldPrice}</span>
                </div>

                <p className="mt-3 text-red-600 font-bold">
                  -{deal.discountPercent}%
                </p>

                <a
                  href={deal.link}
                  target="_blank"
                  className="block mt-5 bg-blue-600 text-white text-center py-3 rounded-2xl font-bold"
                >
                  View Deal
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}