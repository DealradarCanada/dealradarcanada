"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadCSVProducts } from "../lib/csvImporter";

function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStore, setSelectedStore] = useState("All");
  const [selectedNetwork, setSelectedNetwork] = useState("All");
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    loadCSVProducts().then((data) => {
      setAllProducts(data);
    });
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(allProducts.map((p) => p.category))),
  ];

  const stores = [
    "All",
    ...Array.from(new Set(allProducts.map((p) => p.store))),
  ];

  const networks = [
    "All",
    ...Array.from(new Set(allProducts.map((p) => p.affiliateNetwork))),
  ];

  const filteredDeals = allProducts.filter((deal) => {
    const text =
      `${deal.name} ${deal.category} ${deal.store}`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      deal.category === selectedCategory;

    const matchesStore =
      selectedStore === "All" ||
      deal.store === selectedStore;

    const matchesNetwork =
      selectedNetwork === "All" ||
      deal.affiliateNetwork === selectedNetwork;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStore &&
      matchesNetwork
    );
  });

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-black text-blue-700">
            DealRadar Canada
          </h1>

          <nav className="flex gap-6 text-sm font-semibold text-slate-700">
            <a href="#">Top Deals</a>
            <a href="#">Stores</a>
            <a href="#">Networks</a>
            <a href="#">Guides</a>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-7xl font-black max-w-4xl leading-none">
            Find the best Canadian deals automatically.
          </h2>

          <p className="mt-8 text-xl text-slate-300 max-w-3xl">
            DealRadar ranks products by discount, popularity,
            value and affiliate performance to surface only
            the deals worth your attention.
          </p>

          <div className="mt-10 flex gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-6 py-4 rounded-2xl text-black w-full max-w-xl text-lg"
            />

            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-bold">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-2xl font-black mb-6">
            Browse Categories
          </h3>

          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <h3 className="text-2xl font-black mb-6">
            Stores
          </h3>

          <div className="flex flex-wrap gap-3 mb-6">
            {stores.map((store) => (
              <button
                key={store}
                onClick={() => setSelectedStore(store)}
                className={`px-5 py-2 rounded-full font-semibold ${
                  selectedStore === store
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {store}
              </button>
            ))}
          </div>

          <h3 className="text-2xl font-black mb-6">
            Affiliate Networks
          </h3>

          <div className="flex flex-wrap gap-3">
            {networks.map((network) => (
              <button
                key={network}
                onClick={() => setSelectedNetwork(network)}
                className={`px-5 py-2 rounded-full font-semibold ${
                  selectedNetwork === network
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {network}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <img
                src={deal.image}
                alt={deal.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>{deal.category}</span>
                  <span>{deal.store}</span>
                </div>

                <h3 className="mt-3 text-3xl font-black leading-tight">
                  {deal.name}
                </h3>

                <div className="mt-5 flex items-end gap-3">
                  <span className="text-4xl font-black">
                    {deal.price}
                  </span>

                  <span className="line-through text-slate-400">
                    {deal.oldPrice}
                  </span>
                </div>

                <div className="mt-5 flex gap-3">
                  <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-2xl">
                    <div className="text-xs font-bold">
                      DEAL SCORE
                    </div>

                    <div className="text-2xl font-black">
                      {deal.dealScore}
                    </div>
                  </div>

                  <div className="bg-red-100 text-red-600 px-4 py-2 rounded-2xl">
                    <div className="text-xs font-bold">
                      DISCOUNT
                    </div>

                    <div className="text-2xl font-black">
                      -{deal.discountPercent}%
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-slate-500">
                  Network: {deal.affiliateNetwork}
                </div>

                <a
                  href={deal.link}
                  target="_blank"
                  className="block mt-6 bg-blue-600 hover:bg-blue-700 text-center text-white py-4 rounded-2xl font-bold"
                >
                  View Deal
                </a>

                <Link
                  href={`/product/${createSlug(deal.name)}`}
                  className="block mt-3 border border-slate-300 text-center py-4 rounded-2xl font-bold hover:bg-slate-100"
                >
                  Deal Analysis
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-300 text-center py-10 text-slate-600 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h4 className="font-black text-2xl mb-4">
            Smart Canadian Deal Discovery
          </h4>

          <p className="text-slate-500 leading-7">
            DealRadar Canada helps Canadians discover trending
            products, major discounts and high-value offers
            from trusted retailers and affiliate networks.
          </p>

          <div className="mt-6 text-sm text-slate-400">
            © 2026 DealRadar Canada — Intelligent Canadian Deal Filter
          </div>
        </div>
      </footer>
    </main>
  );
}