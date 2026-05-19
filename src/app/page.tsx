"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadCSVProducts } from "../lib/csvImporter";

type Product = {
  id: string;
  name: string;
  category: string;
  store: string;
  price: string;
  oldPrice: string;
  discountPercent: number;
  dealScore: number;
  expiresAt: string;
  affiliateNetwork: string;
  image: string;
  link: string;
};

function createSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadCSVProducts().then((data) => setAllProducts(data as Product[]));
  }, []);

  const categories = [
    "All", "Gaming", "Audio", "Tech", "TV", "Home", "Shoes", "Laptop",
    "Phones", "Tablets", "Headphones", "Smart Home", "Kitchen", "Beauty",
    "Fashion", "Fitness", "Office", "Appliances", "Toys", "Outdoor", "Automotive",
  ];

  const filteredDeals = allProducts.filter((deal) => {
    const text = `${deal.name} ${deal.category} ${deal.store} ${deal.affiliateNetwork}`.toLowerCase();
    return text.includes(search.toLowerCase()) &&
      (selectedCategory === "All" || deal.category === selectedCategory);
  });

  const rankedDeals = [...filteredDeals].sort((a, b) => b.dealScore - a.dealScore);
  const trendingDeals = rankedDeals.filter((p) => p.dealScore >= 90).slice(0, 8);
  const biggestDrops = [...filteredDeals].sort((a, b) => b.discountPercent - a.discountPercent).slice(0, 8);
  const expiringSoon = [...filteredDeals].slice(0, 8);

  const ProductCard = ({ deal }: { deal: Product }) => (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition duration-300">
      <div className="overflow-hidden h-52 bg-slate-100">
        <img
          src={deal.image}
          alt={deal.name}
          className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-5">
        <div className="flex justify-between text-sm">
          <span className="text-blue-700 font-bold">{deal.category}</span>
          <span className="text-slate-500">{deal.store}</span>
        </div>

        <h3 className="text-2xl font-black mt-3 leading-tight">{deal.name}</h3>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-3xl font-black">{deal.price}</span>
          <span className="line-through text-slate-400">{deal.oldPrice}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-blue-100 rounded-2xl p-3">
            <small className="font-bold text-slate-500">DEAL SCORE</small>
            <strong className="block text-2xl text-blue-700">{deal.dealScore}</strong>
          </div>

          <div className="bg-red-100 rounded-2xl p-3">
            <small className="font-bold text-slate-500">DISCOUNT</small>
            <strong className="block text-2xl text-red-700">-{deal.discountPercent}%</strong>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-500">Network: {deal.affiliateNetwork}</p>

        <a
          href={deal.link}
          target="_blank"
          className="block mt-5 w-full rounded-2xl bg-blue-600 text-white py-3 text-center font-bold hover:bg-blue-700 transition"
        >
          View Deal
        </a>

        <Link
          href={`/product/${createSlug(deal.name)}`}
          className="block mt-3 w-full rounded-2xl border border-slate-300 py-3 text-center font-bold hover:bg-slate-100 transition"
        >
          Deal Analysis
        </Link>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-blue-700">DealRadar Canada</Link>
          <nav className="flex gap-6 text-sm font-semibold">
            <Link href="/category/tech">Tech</Link>
            <Link href="/category/gaming">Gaming</Link>
            <Link href="/category/home">Home</Link>
            <Link href="/category/audio">Audio</Link>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="text-blue-300 font-bold mb-4">Canada’s intelligent deal filter</p>
          <h1 className="text-5xl md:text-7xl font-black max-w-5xl leading-tight">
            We scan Canadian stores and surface only the deals worth your attention.
          </h1>
          <p className="mt-6 max-w-3xl text-slate-200 text-lg">
            DealRadar ranks products by discount, value, popularity, store availability,
            affiliate network and deal quality.
          </p>

          <div className="mt-10 bg-white rounded-3xl p-3 max-w-4xl flex flex-col md:flex-row gap-3 shadow-2xl">
            <input
              className="flex-1 rounded-2xl px-5 py-4 text-slate-900 outline-none border border-slate-200"
              type="text"
              placeholder="Type what you are looking for: PlayStation, MacBook, Dyson..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="rounded-2xl bg-blue-600 text-white px-8 py-4 font-bold hover:bg-blue-700 transition">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="text-lg font-black mb-4">Browse Categories</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold ${
                  selectedCategory === category ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="text-lg font-black mb-4">Stores</h3>
          <button className="px-5 py-2 rounded-full font-semibold bg-blue-700 text-white">Amazon</button>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="text-lg font-black mb-4">Affiliate Network</h3>
          <button className="px-5 py-2 rounded-full font-semibold bg-blue-700 text-white">Amazon Associates</button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-black mb-8">Trending Today</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingDeals.map((deal) => <ProductCard key={deal.id} deal={deal} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-black">Best Deals Ranked by DealRadar</h2>
        <p className="mb-8 text-slate-600">{rankedDeals.length} smart deals found</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {rankedDeals.map((deal) => <ProductCard key={deal.id} deal={deal} />)}
        </div>
      </section>

      <section className="bg-slate-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-8">Biggest Price Drops</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {biggestDrops.map((deal) => <ProductCard key={deal.id} deal={deal} />)}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-4xl font-black mb-8">Expiring Soon</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {expiringSoon.map((deal) => <ProductCard key={deal.id} deal={deal} />)}
        </div>
      </section>

      <footer className="bg-slate-950 text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-black mb-4 text-blue-400">DealRadar Canada</h3>
            <p className="text-slate-300 leading-7">
              Intelligent Canadian deal discovery platform built to help shoppers
              find strong discounts through ranked product signals and affiliate links.
            </p>
          </div>

          <div>
            <h4 className="font-black mb-4">Popular Categories</h4>
            <ul className="space-y-2 text-slate-300">
              <li>Gaming Deals</li>
              <li>Tech Deals</li>
              <li>Audio Deals</li>
              <li>TV Deals</li>
              <li>Home Deals</li>
              <li>Fashion Deals</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-4">Affiliate Strategy</h4>
            <p className="text-slate-300 leading-7">
              For now, DealRadar Canada focuses on Amazon Associates products.
              More approved stores and networks can be added later.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 text-center py-6 text-slate-400">
          © 2026 DealRadar Canada — Intelligent Canadian Deal Filter
        </div>
      </footer>
    </main>
  );
}