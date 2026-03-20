import { useState } from "react";
import { Link } from "react-router";


const PRODUCTS = [
  { id: 1, name: "7-Grain Multigrain Flour", price: 199, originalPrice: 249, category: "multigrain", rating: 4.8, reviews: 234, badge: "Best Seller", weight: "1kg", featured: true, benefits: ["High Fiber", "Protein Rich", "No Preservatives"], img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80", desc: "Premium blend of 7 wholesome grains – wheat, oats, barley, ragi, jowar, bajra & corn. Rich in fiber and essential nutrients." },
  { id: 2, name: "Kitchen King Masala", price: 149, originalPrice: 185, category: "masala", rating: 4.9, reviews: 456, badge: "Top Rated", weight: "200g", featured: true, benefits: ["21 Spices", "Authentic Recipe", "No Artificial Color"], img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80", desc: "Authentic blend of 21 aromatic spices – the king of all masalas for rich, flavorful curries." },
  { id: 3, name: "Ragi Millet Flour", price: 129, originalPrice: 160, category: "multigrain", rating: 4.7, reviews: 189, badge: "Organic", weight: "500g", featured: true, benefits: ["Calcium Rich", "Gluten Free", "Diabetic Friendly"], img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80", desc: "Stone-ground finger millet flour packed with calcium and iron. Perfect for rotis and dosas." },
  { id: 4, name: "Garam Masala Premium", price: 129, originalPrice: 165, category: "masala", rating: 4.8, reviews: 312, badge: "Premium", weight: "100g", featured: false, benefits: ["Slow Roasted", "Whole Spices", "Preservative Free"], img: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&q=80", desc: "Whole-spice blend slow roasted to perfection. The secret ingredient every Indian kitchen needs." },
  { id: 5, name: "Jowar Sorghum Flour", price: 89, originalPrice: 120, category: "multigrain", rating: 4.5, reviews: 98, badge: "", weight: "500g", featured: false, benefits: ["Gluten Free", "High Protein", "Heart Healthy"], img: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&q=80", desc: "Gluten-free jowar flour for nutritious bhakri, rotis and porridges. A staple grain of Maharashtra." },
  { id: 6, name: "Chaat Masala Blend", price: 99, originalPrice: 125, category: "masala", rating: 4.6, reviews: 221, badge: "Fan Favorite", weight: "100g", featured: false, benefits: ["Tangy Flavor", "Natural Ingredients", "Versatile Use"], img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80", desc: "Tangy, spicy, and absolutely addictive! Our signature chaat masala elevates everything." },
  { id: 7, name: "Flax & Chia Seed Mix", price: 249, originalPrice: 299, category: "seeds", rating: 4.9, reviews: 167, badge: "Superfood", weight: "250g", featured: true, benefits: ["Omega-3 Rich", "Antioxidants", "Boosts Immunity"], img: "https://images.unsplash.com/photo-1510682693398-edd5ff714916?w=400&q=80", desc: "Superfood seed blend of flaxseeds and chia seeds. Add to smoothies for an omega-3 boost." },
  { id: 8, name: "Sambar Masala", price: 119, originalPrice: 149, category: "masala", rating: 4.7, reviews: 278, badge: "South Indian", weight: "200g", featured: false, benefits: ["Authentic Recipe", "No MSG", "Rich Aroma"], img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80", desc: "South Indian style sambar powder with the perfect balance of lentils, tamarind spices and aromatic herbs." },
  { id: 9, name: "Bajra Pearl Millet", price: 79, originalPrice: 99, category: "multigrain", rating: 4.4, reviews: 76, badge: "", weight: "500g", featured: false, benefits: ["Iron Rich", "Energy Boost", "Cooling Effect"], img: "https://images.unsplash.com/photo-1569596082827-c5e2655e95f1?w=400&q=80", desc: "Traditional bajra flour rich in iron and magnesium. Perfect for winter rotis and porridges." },
  { id: 10, name: "Coriander Cumin Powder", price: 89, originalPrice: 110, category: "spices", rating: 4.6, reviews: 143, badge: "Daily Essential", weight: "200g", featured: false, benefits: ["Digestive Aid", "Fresh Ground", "Pure Blend"], img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80", desc: "Classic dhania-jeera powder, freshly ground from premium whole seeds. A kitchen staple." },
  { id: 11, name: "Sunflower Pumpkin Seeds", price: 199, originalPrice: 249, category: "seeds", rating: 4.7, reviews: 112, badge: "New", weight: "200g", featured: false, benefits: ["Zinc Rich", "Heart Healthy", "Crunchy Snack"], img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80", desc: "Roasted blend of sunflower and pumpkin seeds. A nutritious snack or salad topper." },
  { id: 12, name: "Rajwadi Garam Masala", price: 159, originalPrice: 199, category: "masala", rating: 4.8, reviews: 201, badge: "Royal Blend", weight: "100g", featured: false, benefits: ["Rajasthani Recipe", "Aromatic", "Bold Flavor"], img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80", desc: "Traditional Rajasthani garam masala with bold, regal flavors. Elevate your curries instantly." },
];

const CATEGORIES = ["all", "multigrain", "masala", "seeds", "spices"];
const CAT_LABELS = { all: "🌿 All", multigrain: "🌾 Multigrain", masala: "🌶️ Masala", seeds: "🌱 Seeds", spices: "🫙 Spices" };
const CAT_COLORS = { multigrain: "bg-amber-100 text-amber-700", masala: "bg-red-100 text-red-700", seeds: "bg-emerald-100 text-emerald-700", spices: "bg-orange-100 text-orange-700", flours: "bg-yellow-100 text-yellow-700" };


const LoggedProducts = () => {

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [adminProducts, setAdminProducts] = useState(PRODUCTS);


     const filteredProducts = adminProducts
    .filter(p => category === "all" || p.category === category)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  
  
  return (
      <>
            <div className="bg-[#1E4A1E] py-12 sm:py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#8DC21F]/15 rounded-full blur-3xl" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <span className="text-[#8DC21F] font-extrabold text-xs uppercase tracking-widest">Explore Our Range</span>
                    <h1 className="font-black text-white text-4xl sm:text-5xl mt-2">Our <span className="text-[#8DC21F]">Products</span></h1>
                    <p className="text-gray-300 text-sm mt-2">Premium multigrains, masalas and superfoods</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                <div className="flex flex-col sm:flex-row gap-3 mb-5 sm:mb-7">
                    <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">🔍</span>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-[#E8F2D0] bg-white text-sm font-medium focus:outline-none focus:border-[#8DC21F] transition-colors" />
                    </div>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                        className="px-4 py-3 rounded-2xl border-2 border-[#E8F2D0] bg-white text-sm font-semibold text-[#2D6A2D] focus:outline-none focus:border-[#8DC21F] sm:min-w-44">
                        <option value="default">Sort: Default</option>
                        <option value="price-asc">Price: Low → High</option>
                        <option value="price-desc">Price: High → Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                    {CATEGORIES.map(c => (
                        <button key={c} onClick={() => setCategory(c)}
                            className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold capitalize transition-all ${category === c ? "bg-[#8DC21F] text-white shadow-lg shadow-[#8DC21F]/30" : "bg-white text-[#2D6A2D] border-2 border-[#E8F2D0] hover:border-[#8DC21F]"}`}>
                            {CAT_LABELS[c] || c}
                        </button>
                    ))}
                </div>
                <p className="text-gray-400 text-xs sm:text-sm font-semibold mb-5">{filteredProducts.length} products found</p>
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-[#E8F2D0]">
                        <div className="text-6xl mb-4">🌾</div>
                        <h3 className="font-extrabold text-[#2D6A2D] text-xl mb-2">No products found</h3>
                        <button onClick={() => { setSearch(""); setCategory("all"); }} className="mt-4 bg-[#8DC21F] text-white px-7 py-2.5 rounded-xl font-bold text-sm">Clear Filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                        
                    </div>
                )}
        </div>
                <footer className="bg-[#1E4A1E] text-white">
                          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                              <div className="col-span-2 sm:col-span-2 lg:col-span-1">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 rounded-full bg-[#8DC21F] flex items-center justify-center font-black text-white text-lg shadow-lg">Y</div>
                                  <div><div className="text-[#8DC21F] font-black text-base">Yugan's Product</div><div className="text-[#6abf6a] text-[10px] italic">Meal time in a Minute</div></div>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">Premium quality multigrains, masalas and spices sourced from the finest farms across India.</p>
                              </div>
                              <div>
                                <h4 className="text-[#8DC21F] font-extrabold text-sm mb-4">Quick Links</h4>
                                <div className="text-gray-400 text-sm mb-2">
                                  <Link to="/home"><p className="mb-2">Home</p></Link>
                                  <Link to="/product"><p className="mb-2">Products</p></Link>
                                   <Link to="/cart"> <p className="mb-2">Cart</p></Link>
                                   <Link to="/orders"> <p className="mb-2">Orders</p></Link>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-[#8DC21F] font-extrabold text-sm mb-4">Categories</h4>
                                {["Multigrains","Masalas","Porridge"].map(c => (
                                  <div key={c} className="text-gray-400 text-sm mb-2">{c}</div>
                                ))}
                              </div>
                              <div>
                                <h4 className="text-[#8DC21F] font-extrabold text-sm mb-4">Contact</h4>
                                {["📍 Karur, Tamil Nadu","📞 +91 63812 10833","📧 yugansproduct@gmail.com","⏰ Monday-Sunday: 9am–6pm"].map(c => (
                                  <div key={c} className="text-gray-400 text-xs sm:text-sm mb-2">{c}</div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="border-t border-white/10 py-4 px-4 sm:px-6">
                            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                              <p className="text-gray-500 text-xs">© 2026 Yugan's Products. All rights reserved.</p>
                              <div className="flex gap-4 text-xs text-gray-500"><span>🌿 Natural</span><span>🏆 Quality</span><span>🚚 Fast</span></div>
                            </div>
                          </div>
                        </footer>


      </>
  )
}

export default LoggedProducts
