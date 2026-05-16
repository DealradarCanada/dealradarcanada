"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "../data/products";
import { importedDeals } from "../lib/mockImporter";
import {
  sortByDealScore,
  getTrendingDeals,
  getBiggestDrops,
  getExpiringSoon,
} from "../lib/dealEngine";

function createSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStore, setSelectedStore] = useState("All");
  const [selectedNetwork, setSelectedNetwork] = useState("All");

  const allProducts = [...products, ...importedDeals];

  const categories = ["All", "Tech", "Audio", "Gaming", "Home", "Auto", "Beauty", "Student", "Fashion", "Shoes", "Baby", "Sports", "Office", "Appliances", "Phones", "TV", "Furniture"];
  const stores = ["All", "Amazon", "Best Buy", "Walmart", "Costco", "Apple", "Staples", "Canadian Tire", "Home Depot", "Newegg", "The Bay", "Sport Chek", "Nike", "Adidas", "Sephora", "Lululemon", "Simons", "Old Navy"];
  const networks = ["All", "Amazon Associates", "CJ Affiliate", "Awin", "Rakuten", "Impact", "Direct"];

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
  const trendingToday = getTrendingDeals(filteredDeals);
  const biggestDrops = getBiggestDrops(filteredDeals);
  const expiringSoon = getExpiringSoon(filteredDeals);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-black text-blue-700">DealRadar Canada</div>
          <nav className="hidden md:flex gap-6 font-semibold text-slate-600">
            <span>Top Deals</span>
            <span>Stores</span>
            <span>Networks</span>
            <span>Guides</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-slate-950 via-blue-950 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="text-blue-300 font-bold mb-4">Canada’s intelligent deal filter</p>

          <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-5xl">
            We scan Canadian stores and surface only the deals worth your attention.
          </h1>

          <p className="mt-6 text-xl text-slate-200 max-w-3xl">
            DealRadar ranks products by discount, value, popularity, store availability, affiliate network and deal quality.
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search products, stores, networks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-6 py-4 rounded-2xl bg-white text-black placeholder:text-slate-500 outline-none"
            />
            <button className="bg-blue-500 hover:bg-blue-600 transition px-8 py-4 rounded-2xl font-bold">
              Search
            </button>
          </div>

          <div className="mt-10 grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
              <p className="text-4xl font-black">{allProducts.length}</p>
              <p className="text-slate-300">Products scanned</p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
              <p className="text-4xl font-black">{stores.length - 1}</p>
              <p className="text-slate-300">Stores ready</p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
              <p className="text-4xl font-black">{networks.length - 1}</p>
              <p className="text-slate-300">Affiliate networks</p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
              <p className="text-4xl font-black">AI</p>
              <p className="text-slate-300">Deal filtering engine</p>
            </div>
          </div>

          <div className="mt-10 bg-white/10 border border-white/10 rounded-3xl p-6 text-center">
            <p className="text-sm text-blue-200 font-bold">ADVERTISEMENT</p>
            <p className="text-2xl font-black mt-2">Premium ad banner space</p>
            <p className="text-slate-300 mt-1">Google AdSense / Ezoic / Sponsor placement later</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-black mb-6">Shop by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-semibold transition cursor-pointer ${
                selectedCategory === category
                  ? "bg-blue-600 text-white scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-200 hover:scale-105"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <h2 className="text-4xl font-black mt-12 mb-6">Filter by Store</h2>
        <div className="flex flex-wrap gap-3">
          {stores.map((store) => (
            <button
              key={store}
              onClick={() => setSelectedStore(store)}
              className={`px-5 py-2 rounded-full font-semibold transition cursor-pointer ${
                selectedStore === store
                  ? "bg-black text-white scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-200 hover:scale-105"
              }`}
            >
              {store}
            </button>
          ))}
        </div>

        <h2 className="text-4xl font-black mt-12 mb-6">Filter by Affiliate Network</h2>
        <div className="flex flex-wrap gap-3">
          {networks.map((network) => (
            <button
              key={network}
              onClick={() => setSelectedNetwork(network)}
              className={`px-5 py-2 rounded-full font-semibold transition cursor-pointer ${
                selectedNetwork === network
                  ? "bg-green-600 text-white scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-200 hover:scale-105"
              }`}
            >
              {network}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-6">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-4xl font-black mb-6"> Trending Today</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {trendingToday.map((deal) => (
              <Link
                key={deal.id}
                href={`/product/${createSlug(deal.name)}`}
                className="border rounded-3xl overflow-hidden bg-slate-50 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition duration-300 block"
              >
                <img src={deal.image} alt={deal.name} className="w-full h-52 object-cover" />
                <div className="p-5">
                  <p className="text-sm text-blue-700 font-bold">{deal.category}</p>
                  <h3 className="text-2xl font-black mt-3">{deal.name}</h3>
                  <p className="mt-3 text-green-700 font-black">Deal Score: {deal.dealScore}/100</p>
                  <p className="text-red-600 font-bold">-{deal.discountPercent}%</p>
                  <p className="text-sm text-slate-500 mt-2">{deal.storeLogo} {deal.store}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-4xl font-black mb-6">📉 Biggest Price Drops</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {biggestDrops.map((deal) => (
              <Link
                key={deal.id}
                href={`/product/${createSlug(deal.name)}`}
                className="bg-white/10 rounded-2xl p-5 hover:bg-white/20 transition block"
              >
                <p className="font-black text-xl">{deal.name}</p>
                <p className="text-blue-200 mt-2">{deal.storeLogo} {deal.store}</p>
                <p className="text-3xl font-black mt-4">-{deal.discountPercent}%</p>
                <p className="text-slate-300">{deal.oldPrice} → {deal.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-4xl font-black mb-6">⏳ Expiring Soon</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {expiringSoon.map((deal) => (
              <Link
                key={deal.id}
                href={`/product/${createSlug(deal.name)}`}
                className="bg-slate-100 rounded-2xl p-5 hover:bg-slate-200 transition block"
              >
                <p className="font-black text-xl">{deal.name}</p>
                <p className="text-slate-500 mt-2">{deal.storeLogo} {deal.store}</p>
                <p className="text-blue-700 font-black mt-4">Score: {deal.dealScore}/100</p>
                <p className="text-red-600 font-bold">Ends: {deal.expiresAt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white border-2 border-dashed border-slate-300 rounded-3xl p-10 text-center">
          <p className="text-sm text-slate-500 font-bold">ADVERTISEMENT</p>
          <h2 className="text-3xl font-black mt-2">Mid-page advertising space</h2>
          <p className="text-slate-500 mt-2">This area can later display Google AdSense, Ezoic, Mediavine or direct sponsor ads.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-black">Best Deals Ranked by DealRadar</h2>
            <p className="text-slate-500 font-semibold mt-2">{rankedDeals.length} smart deals found</p>
          </div>

          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
              setSelectedStore("All");
              setSelectedNetwork("All");
            }}
            className="hidden md:block bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Reset filters
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {rankedDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] transition duration-300"
            >
              <img src={deal.image} alt={deal.name} className="w-full h-56 object-cover" />

              <div className="p-5">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700 font-bold">{deal.category}</span>
                  <span className="text-sm text-slate-500">{deal.storeLogo} {deal.store}</span>
                </div>

                <h3 className="text-3xl font-black mt-3 leading-tight">{deal.name}</h3>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-4xl font-black">{deal.price}</span>
                  <span className="line-through text-slate-400">{deal.oldPrice}</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-2xl p-3">
                    <p className="text-xs text-slate-500 font-bold">DEAL SCORE</p>
                    <p className="text-2xl font-black text-blue-700">{deal.dealScore}</p>
                  </div>

                  <div className="bg-red-50 rounded-2xl p-3">
                    <p className="text-xs text-slate-500 font-bold">DISCOUNT</p>
                    <p className="text-2xl font-black text-red-600">-{deal.discountPercent}%</p>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-500">Network: {deal.affiliateNetwork}</p>

                <Link
                  href={`/product/${createSlug(deal.name)}`}
                  className="mt-6 block w-full bg-blue-600 hover:bg-blue-700 transition text-white text-center py-4 rounded-2xl font-bold text-lg"
                >
                  View Deal Analysis
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-300 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-3xl font-black text-white">DealRadar Canada</h3>
            <p className="mt-4 leading-relaxed text-slate-400">
              Smart AI-powered Canadian deal discovery platform helping users find only the strongest deals across top retailers.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-4">Revenue Model</h4>
            <ul className="space-y-3">
              <li>Affiliate commissions</li>
              <li>Display advertising</li>
              <li>Sponsored placements</li>
              <li>Newsletter deals</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-4">Affiliate Networks</h4>
            <ul className="space-y-3">
              <li>Amazon Associates</li>
              <li>CJ Affiliate</li>
              <li>Awin</li>
              <li>Rakuten</li>
              <li>Impact</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 text-center py-6 text-slate-500">
          © 2026 DealRadar Canada — Intelligent Canadian Deal Filter
        </div>
      </footer>
    </main>
  );
}