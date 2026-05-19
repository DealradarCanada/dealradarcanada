"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "../data/products";
import {
  sortByDealScore,
  getTrendingDeals,
  getBiggestDrops,
  getExpiringSoon,
} from "./lib/dealEngine";

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

  const allProducts = products;

  const categories = ["All", ...Array.from(new Set(allProducts.map((p) => p.category)))];
  const stores = ["All", ...Array.from(new Set(allProducts.map((p) => p.store)))];
  const networks = ["All", ...Array.from(new Set(allProducts.map((p) => p.affiliateNetwork)))];

  const filteredDeals = allProducts.filter((deal) => {
    const text = `${deal.name} ${deal.category} ${deal.store} ${deal.affiliateNetwork}`.toLowerCase();

    return (
      text.includes(search.toLowerCase()) &&
      (selectedCategory === "All" || deal.category === selectedCategory) &&
      (selectedStore === "All" || deal.store === selectedStore) &&
      (selectedNetwork === "All" || deal.affiliateNetwork === selectedNetwork)
    );
  });

  const rankedDeals = sortByDealScore(filteredDeals);
  const trendingDeals = getTrendingDeals(filteredDeals);
  const biggestDrops = getBiggestDrops(filteredDeals);
  const expiringSoon = getExpiringSoon(filteredDeals);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-blue-700">
            DealRadar Canada
          </Link>

          <nav className="flex gap-6 text-sm font-semibold">
            <a href="#top-deals">Top Deals</a>
            <a href="#stores">Stores</a>
            <a href="#networks">Networks</a>
            <a href="#guides">Guides</a>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="text-blue-300 font-bold mb-4">
            Canada’s intelligent deal filter
          </p>

          <h1 className="text-5xl md:text-7xl font-black max-w-5xl leading-tight">
            We scan Canadian stores and surface only the deals worth your attention.
          </h1>

          <p className="mt-6 max-w-3xl text-slate-200 text-lg">
            DealRadar ranks products by discount, value, popularity, store availability,
            affiliate network and deal quality.
          </p>

          <div className="mt-10 flex gap-3 max-w-4xl">
            <input
              className="flex-1 rounded-2xl px-5 py-4 text-slate-900 outline-none"
              type="text"
              placeholder="Search products, stores, networks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="rounded-2xl bg-blue-500 px-8 py-4 font-bold">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8 space-y-4">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-semibold ${
                selectedCategory === category
                  ? "bg-blue-700 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3" id="stores">
          {stores.map((store) => (
            <button
              key={store}
              onClick={() => setSelectedStore(store)}
              className={`px-5 py-2 rounded-full font-semibold ${
                selectedStore === store
                  ? "bg-blue-700 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              {store}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3" id="networks">
          {networks.map((network) => (
            <button
              key={network}
              onClick={() => setSelectedNetwork(network)}
              className={`px-5 py-2 rounded-full font-semibold ${
                selectedNetwork === network
                  ? "bg-blue-700 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              {network}
            </button>
          ))}
        </div>
      </section>

      <section id="top-deals" className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-black mb-8">Trending Today</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingDeals.map((deal) => (
            <Link
              href={`/product/${createSlug(deal.name)}`}
              key={deal.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition"
            >
              <img
                src={deal.image}
                alt={deal.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <p className="text-blue-700 font-bold text-sm">{deal.category}</p>
                <h3 className="text-2xl font-black mt-2">{deal.name}</h3>
                <p className="mt-3 font-bold">Deal Score: {deal.dealScore}/100</p>
                <p className="text-red-600 font-bold">-{deal.discountPercent}%</p>
                <small>{deal.store}</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-black">Best Deals Ranked by DealRadar</h2>
        <p className="mb-8 text-slate-600">{rankedDeals.length} smart deals found</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rankedDeals.map((deal) => (
            <Link
              href={`/product/${createSlug(deal.name)}`}
              key={deal.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition"
            >
              <img
                src={deal.image}
                alt={deal.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700 font-bold">{deal.category}</span>
                  <span>{deal.store}</span>
                </div>

                <h3 className="text-2xl font-black mt-3">{deal.name}</h3>

                <h2 className="text-3xl font-black mt-4">
                  {deal.price}{" "}
                  <small className="text-sm line-through text-slate-400">
                    {deal.oldPrice}
                  </small>
                </h2>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-blue-100 rounded-2xl p-3">
                    <small>Deal Score</small>
                    <strong className="block text-2xl text-blue-700">
                      {deal.dealScore}
                    </strong>
                  </div>

                  <div className="bg-red-100 rounded-2xl p-3">
                    <small>Discount</small>
                    <strong className="block text-2xl text-red-700">
                      -{deal.discountPercent}%
                    </strong>
                  </div>
                </div>

                <p className="mt-4 text-sm">Network: {deal.affiliateNetwork}</p>

                <button className="mt-5 w-full rounded-2xl bg-blue-600 text-white py-3 font-bold">
                  View Deal Analysis
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-8">Biggest Price Drops</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {biggestDrops.map((deal) => (
              <Link
                href={`/product/${createSlug(deal.name)}`}
                key={deal.id}
                className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800"
              >
                <img src={deal.image} alt={deal.name} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-2xl font-black">{deal.name}</h3>
                  <p className="text-red-400 font-bold">-{deal.discountPercent}%</p>
                  <small>{deal.store}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-4xl font-black mb-8">Expiring Soon</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expiringSoon.map((deal) => (
            <Link
              href={`/product/${createSlug(deal.name)}`}
              key={deal.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200"
            >
              <img src={deal.image} alt={deal.name} className="h-48 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-2xl font-black">{deal.name}</h3>
                <p>Expires: {deal.expiresAt}</p>
                <small>{deal.store}</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-300 text-center py-6 text-slate-600">
        © 2026 DealRadar Canada — Intelligent Canadian Deal Filter
      </footer>
    </main>
  );
}