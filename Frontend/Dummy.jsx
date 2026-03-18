import { useState, useEffect, useRef } from "react";

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

const Stars = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[1,2,3,4,5].map(i => (
      <span key={i} className={`text-sm ${i <= Math.floor(rating) ? "text-amber-400" : "text-gray-300"}`}>★</span>
    ))}
    <span className="text-xs text-gray-400 font-semibold ml-1">{rating}</span>
  </div>
);

export default function YugansWebsite() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [adminTab, setAdminTab] = useState("products");
  const [adminProducts, setAdminProducts] = useState(PRODUCTS);
  const [heroSlide, setHeroSlide] = useState(0);
  const [toast, setToast] = useState(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [addForm, setAddForm] = useState({ name: "", price: "", originalPrice: "", category: "multigrain", weight: "500g", badge: "", desc: "", benefits: "", featured: false });

  const heroSlides = [
    { title: "Nature's Finest", sub: "Multigrains", desc: "Stone-ground, nutrient-rich flours for a healthier family every day", badge: "🌾 100% Whole Grain", img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&q=80" },
    { title: "Aromatic", sub: "Masala Blends", desc: "Hand-crafted spice blends from traditional family recipes passed down generations", badge: "🌶️ 21 Exotic Spices", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=700&q=80" },
    { title: "Superfood", sub: "Seeds & Blends", desc: "Omega-rich seeds and superfood blends for vibrant modern living", badge: "💚 Certified Organic", img: "https://images.unsplash.com/photo-1510682693398-edd5ff714916?w=700&q=80" },
  ];

  useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % 3), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { setMobileMenu(false); }, [page]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product) => {
    if (!user) { setAuthModal("login"); return; }
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart! 🛒`);
  };

  const updateQty = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handleLogin = () => {
    if (authForm.email === "admin@yugans.com" && authForm.password === "admin123") {
      setUser({ name: "Yugan Admin", email: authForm.email, role: "admin" });
      showToast("Welcome, Admin! 👑");
    } else if (authForm.email && authForm.password) {
      setUser({ name: authForm.name || authForm.email.split("@")[0], email: authForm.email, role: "user" });
      showToast(`Welcome${authModal === "register" ? ", " + (authForm.name || "friend") : " back"}! 🌿`);
    }
    setAuthModal(null);
    setAuthForm({ name: "", email: "", password: "" });
  };

  const filteredProducts = adminProducts
    .filter(p => category === "all" || p.category === category)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const disc = (p, o) => o ? Math.round(((o - p) / o) * 100) : 0;

  // ─── PRODUCT CARD ───
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-green-50 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col group">
      <div className="relative h-44 sm:h-48 overflow-hidden bg-green-50 flex-shrink-0">
        <img src={product.img} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={e => e.target.src = "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80"} />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && <span className="bg-[#8DC21F] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow">{product.badge}</span>}
          {disc(product.price, product.originalPrice) > 0 && <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">-{disc(product.price, product.originalPrice)}%</span>}
        </div>
        <div className="absolute top-2 right-2 bg-white/90 text-[#2D6A2D] text-[10px] font-bold px-2 py-0.5 rounded-full">{product.weight}</div>
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize inline-block w-fit ${CAT_COLORS[product.category] || "bg-gray-100 text-gray-600"}`}>{product.category}</span>
        <h3 className="font-extrabold text-[#2D6A2D] text-sm sm:text-base mt-1.5 leading-tight line-clamp-2">{product.name}</h3>
        <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed flex-1">{product.desc}</p>
        <Stars rating={product.rating} />
        <div className="flex flex-wrap gap-1 mt-2">
          {product.benefits.slice(0, 2).map(b => (
            <span key={b} className="text-[9px] bg-[#F5F9E8] text-[#2D6A2D] px-1.5 py-0.5 rounded-full font-semibold border border-[#8DC21F]/20">✓ {b}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-green-50">
          <div>
            <span className="font-extrabold text-[#2D6A2D] text-lg sm:text-xl">₹{product.price}</span>
            {product.originalPrice && <span className="text-gray-300 line-through text-xs ml-1">₹{product.originalPrice}</span>}
          </div>
          <button onClick={() => addToCart(product)}
            className="bg-gradient-to-br from-[#8DC21F] to-[#7AB01A] text-white text-xs font-extrabold px-3 py-2 rounded-xl hover:from-[#A8D832] hover:to-[#8DC21F] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#8DC21F]/40 flex items-center gap-1 active:scale-95">
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  );

  // ─── NAVBAR ───
  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-[#1E4A1E] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <button onClick={() => setPage("home")} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#8DC21F] flex items-center justify-center font-black text-white text-base sm:text-lg shadow-lg group-hover:scale-110 transition-transform">Y</div>
            <div className="text-left">
              <div className="text-[#8DC21F] font-black text-base sm:text-lg leading-none">Yugan's Products</div>
              <div className="text-[#6abf6a] text-[9px] italic leading-none mt-0.5 hidden sm:block">Meal time in a Minute</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {[["home","Home"],["products","Products"],["contact","Contact"]].map(([p,l]) => (
              <button key={p} onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${page === p ? "bg-[#8DC21F] text-white shadow-md" : "text-gray-300 hover:text-[#8DC21F] hover:bg-white/10"}`}>{l}</button>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => setPage("cart")} className="relative flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold transition-all">
              🛒 Cart
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-[#8DC21F] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">{cartCount}</span>}
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white/10 rounded-full pl-2 pr-4 py-1.5">
                  <div className="w-7 h-7 rounded-full bg-[#8DC21F] flex items-center justify-center text-white font-black text-sm">{user.name[0]}</div>
                  <span className="text-white text-sm font-semibold">{user.name.split(" ")[0]}</span>
                  {user.role === "admin" && <span className="bg-amber-400 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">ADMIN</span>}
                </div>
                {user.role === "admin" && <button onClick={() => setPage("admin")} className="bg-amber-400 text-white text-xs font-black px-3 py-1.5 rounded-full hover:bg-amber-500 transition-all">⚙️ Dashboard</button>}
                <button onClick={() => { setUser(null); setCart([]); showToast("Logged out!"); }} className="text-gray-400 hover:text-red-400 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-white/10 transition-all">Logout</button>
              </div>
            ) : (
              <button onClick={() => setAuthModal("login")} className="bg-[#8DC21F] hover:bg-[#A8D832] text-white text-sm font-black px-5 py-2 rounded-full transition-all shadow-lg hover:shadow-[#8DC21F]/40 hover:-translate-y-0.5">Login / Sign Up</button>
            )}
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => setPage("cart")} className="relative text-white p-2">
              <span className="text-xl">🛒</span>
              {cartCount > 0 && <span className="absolute top-0 right-0 bg-[#8DC21F] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="text-white p-2">
              <div className="w-5 space-y-1">
                <div className={`h-0.5 bg-current transition-all ${mobileMenu ? "rotate-45 translate-y-1.5" : ""}`}/>
                <div className={`h-0.5 bg-current transition-all ${mobileMenu ? "opacity-0" : ""}`}/>
                <div className={`h-0.5 bg-current transition-all ${mobileMenu ? "-rotate-45 -translate-y-1.5" : ""}`}/>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="md:hidden bg-[#2D6A2D] border-t border-white/10 px-4 py-3 space-y-1 animate-[fadeIn_0.2s_ease-out]">
          {[["home","🏠 Home"],["products","📦 Products"],["contact","📞 Contact"]].map(([p,l]) => (
            <button key={p} onClick={() => setPage(p)} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${page === p ? "bg-[#8DC21F] text-white" : "text-white hover:bg-white/10"}`}>{l}</button>
          ))}
          <div className="pt-2 border-t border-white/20">
            {user ? (
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-[#8DC21F] flex items-center justify-center text-white font-black">{user.name[0]}</div>
                  <div>
                    <div className="text-white font-bold text-sm">{user.name}</div>
                    {user.role === "admin" && <div className="text-amber-400 text-xs font-bold">Administrator</div>}
                  </div>
                </div>
                {user.role === "admin" && <button onClick={() => setPage("admin")} className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-amber-400 hover:bg-white/10 transition-all">⚙️ Admin Dashboard</button>}
                <button onClick={() => { setUser(null); setCart([]); showToast("Logged out!"); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-white/10 transition-all">🚪 Logout</button>
              </div>
            ) : (
              <div className="flex gap-2 px-2">
                <button onClick={() => setAuthModal("login")} className="flex-1 bg-white/10 text-white py-2.5 rounded-xl text-sm font-bold">Login</button>
                <button onClick={() => setAuthModal("register")} className="flex-1 bg-[#8DC21F] text-white py-2.5 rounded-xl text-sm font-black">Sign Up</button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );

  // ─── HOME ───
  const HomePage = () => {
    const slide = heroSlides[heroSlide];
    return (
      <div className="overflow-x-hidden">
        {/* Hero */}
        <section className="relative min-h-[80vh] sm:min-h-[85vh] bg-gradient-to-br from-[#0A2010] via-[#1E4A1E] to-[#2D6A2D] overflow-hidden flex items-center">
          <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-[#8DC21F]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-[#8DC21F]/8 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 w-full">
            <div className="animate-[fadeIn_0.6s_ease-out] order-2 lg:order-1">
              <span className="inline-block bg-[#8DC21F]/20 border border-[#8DC21F]/40 text-[#8DC21F] text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-4 sm:mb-6">{slide.badge}</span>
              <h1 className="font-black leading-tight mb-4 sm:mb-6">
                <span className="text-[#8DC21F] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl block">{slide.title}</span>
                <span className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl block">{slide.sub}</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-lg leading-relaxed">{slide.desc}</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setPage("products")} className="bg-gradient-to-r from-[#8DC21F] to-[#7AB01A] text-white font-black px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base hover:from-[#A8D832] hover:to-[#8DC21F] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8DC21F]/40 transition-all active:scale-95">Shop Now →</button>
                {!user && <button onClick={() => setAuthModal("register")} className="bg-[#2D6A2D]/60 border border-white/20 text-white font-bold px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base hover:bg-[#2D6A2D] transition-all">Join Free</button>}
              </div>
              <div className="flex gap-8 sm:gap-10 mt-8 pt-6 sm:pt-8 border-t border-white/15">
                {[["50+","Products"],["10K+","Customers"],["100%","Natural"]].map(([v,l]) => (
                  <div key={l}><div className="text-[#8DC21F] font-black text-2xl sm:text-3xl">{v}</div><div className="text-gray-400 text-xs sm:text-sm">{l}</div></div>
                ))}
              </div>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#8DC21F]/15 rounded-full blur-3xl animate-pulse" />
                <img src={slide.img} alt="hero"
                  className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover rounded-3xl border-4 border-[#8DC21F]/30 shadow-2xl animate-[float_3s_ease-in-out_infinite]"
                  onError={e => e.target.src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80"} />
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-[#8DC21F] text-white text-xs font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-xl rotate-12 animate-bounce">🌿 Pure</div>
                <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-white text-[#2D6A2D] text-xs font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-xl -rotate-6">⭐ 4.9/5</div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
            {[0,1,2].map(i => <button key={i} onClick={() => setHeroSlide(i)} className={`rounded-full transition-all duration-300 ${i===heroSlide?"w-7 h-3 bg-[#8DC21F]":"w-3 h-3 bg-white/30 hover:bg-white/60"}`}/>)}
          </div>
        </section>

        {/* Marquee */}
        <div className="bg-[#8DC21F] py-2.5 overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap animate-[marquee_20s_linear_infinite]">
            {[...Array(3)].flatMap(() => ["🌾 100% Natural","🏆 Premium Quality","🌶️ Authentic Spices","🔬 Lab Tested","🚚 Pan India Delivery","💚 No Preservatives"]).map((t,i)=>(
              <span key={i} className="text-white font-extrabold text-xs sm:text-sm">{t}</span>
            ))}
          </div>
        </div>

        {/* Features */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-[#8DC21F] font-extrabold text-xs uppercase tracking-widest">Why Choose Us</span>
              <h2 className="font-black text-[#2D6A2D] text-3xl sm:text-4xl lg:text-5xl mt-2">The Yugan's <span className="text-[#8DC21F]">Difference</span></h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {[["🌾","Farm Fresh","Certified organic farms"],["🏆","Premium Quality","Stone-ground for max nutrition"],["🚚","Fast Delivery","2-3 days Pan India"],["🔬","Lab Tested","Every batch quality tested"],["🌿","No Preservatives","100% natural ingredients"],["♻️","Eco Packaging","Sustainable biodegradable packs"]].map(([icon,title,desc]) => (
                <div key={title} className="bg-[#F5F9E8] rounded-2xl p-4 sm:p-6 border border-[#E8F2D0] hover:border-[#8DC21F] hover:shadow-lg hover:shadow-[#8DC21F]/10 transition-all duration-300 group">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">{icon}</div>
                  <h3 className="font-extrabold text-[#2D6A2D] text-sm sm:text-base mb-1">{title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-14 sm:py-20 bg-[#1E4A1E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
              <div>
                <span className="text-[#8DC21F] font-extrabold text-xs uppercase tracking-widest">Handpicked For You</span>
                <h2 className="font-black text-white text-3xl sm:text-4xl mt-1">Featured <span className="text-[#8DC21F]">Products</span></h2>
              </div>
              <button onClick={() => setPage("products")} className="bg-gradient-to-r from-[#8DC21F] to-[#7AB01A] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:from-[#A8D832] hover:to-[#8DC21F] transition-all self-start sm:self-auto">View All →</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {adminProducts.filter(p => p.featured).slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-[#8DC21F] font-extrabold text-xs uppercase tracking-widest">Browse By</span>
              <h2 className="font-black text-[#2D6A2D] text-3xl sm:text-4xl mt-1">Shop <span className="text-[#8DC21F]">Categories</span></h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
              {[
                {name:"Multigrains",emoji:"🌾",img:"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",cat:"multigrain",grad:"from-amber-500/80 to-amber-700/80"},
                {name:"Masalas",emoji:"🌶️",img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",cat:"masala",grad:"from-red-500/80 to-red-700/80"},
                {name:"Super Seeds",emoji:"🌱",img:"https://images.unsplash.com/photo-1510682693398-edd5ff714916?w=400&q=80",cat:"seeds",grad:"from-emerald-500/80 to-emerald-700/80"},
                {name:"Spices",emoji:"🫙",img:"https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&q=80",cat:"spices",grad:"from-orange-500/80 to-orange-700/80"},
                {name:"Flours",emoji:"🥣",img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80",cat:"multigrain",grad:"from-yellow-500/80 to-yellow-700/80"},
                {name:"Blends",emoji:"✨",img:"https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80",cat:"masala",grad:"from-[#8DC21F]/80 to-[#2D6A2D]/80"},
              ].map(c => (
                <button key={c.name} onClick={() => { setCategory(c.cat); setPage("products"); }}
                  className="relative h-32 sm:h-44 rounded-2xl overflow-hidden group cursor-pointer text-left">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e=>e.target.src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80"} />
                  <div className={`absolute inset-0 bg-gradient-to-t ${c.grad}`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <span className="text-2xl sm:text-3xl mb-1">{c.emoji}</span>
                    <span className="font-extrabold text-sm sm:text-base">{c.name}</span>
                    <span className="text-xs opacity-75 mt-0.5 hidden sm:block">Shop Now →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Banner */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-[#8DC21F] to-[#7AB01A] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2" />
          <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
            <h2 className="font-black text-white text-2xl sm:text-4xl mb-3">🌿 Free Delivery on Orders Over ₹499!</h2>
            <p className="text-white/85 text-sm sm:text-base mb-6">Use code <strong className="bg-white/20 px-3 py-1 rounded-lg">YUGAN20</strong> for 20% off your first order</p>
            <button onClick={() => setPage("products")} className="bg-white text-[#2D6A2D] font-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base shadow-2xl hover:-translate-y-1 hover:shadow-3xl transition-all">Start Shopping →</button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-14 sm:py-20 bg-[#F5F9E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#8DC21F] font-extrabold text-xs uppercase tracking-widest">What People Say</span>
              <h2 className="font-black text-[#2D6A2D] text-3xl sm:text-4xl mt-1">Customer <span className="text-[#8DC21F]">Love</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {name:"Priya Sharma",loc:"Chennai",text:"The 7-grain flour is absolutely amazing! My family's health has improved noticeably. Will never go back to regular flour.",stars:5},
                {name:"Rajesh Kumar",loc:"Bangalore",text:"The Kitchen King Masala is the real deal! Restaurant-quality curries at home now. My guests always ask for the recipe!",stars:5},
                {name:"Anitha Rajan",loc:"Mumbai",text:"Super seeds mix in my morning smoothie is a game changer. Packaging is beautiful and delivery was super fast.",stars:5},
              ].map(t => (
                <div key={t.name} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#E8F2D0]">
                  <div className="text-amber-400 text-base mb-3">{"★".repeat(t.stars)}</div>
                  <p className="text-gray-500 text-sm leading-relaxed italic mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#8DC21F] flex items-center justify-center text-white font-black">{t.name[0]}</div>
                    <div><p className="font-extrabold text-[#2D6A2D] text-sm">{t.name}</p><p className="text-gray-400 text-xs">{t.loc}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1E4A1E] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              <div className="col-span-2 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#8DC21F] flex items-center justify-center font-black text-white text-lg shadow-lg">Y</div>
                  <div><div className="text-[#8DC21F] font-black text-base">Yugan's Products</div><div className="text-[#6abf6a] text-[10px] italic">Meal time in a Minute</div></div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">Premium quality multigrains, masalas and spices sourced from the finest farms across India.</p>
              </div>
              <div>
                <h4 className="text-[#8DC21F] font-extrabold text-sm mb-4">Quick Links</h4>
                {[["home","Home"],["products","Products"],["cart","Cart"],["contact","Contact"]].map(([p,l]) => (
                  <button key={p} onClick={() => setPage(p)} className="block text-gray-400 hover:text-[#8DC21F] text-sm mb-2 transition-colors">{l}</button>
                ))}
              </div>
              <div>
                <h4 className="text-[#8DC21F] font-extrabold text-sm mb-4">Categories</h4>
                {["Multigrains","Masalas","Seeds","Spices","Flours","Blends"].map(c => (
                  <div key={c} className="text-gray-400 text-sm mb-2">{c}</div>
                ))}
              </div>
              <div>
                <h4 className="text-[#8DC21F] font-extrabold text-sm mb-4">Contact</h4>
                {["📍 Chennai, Tamil Nadu","📞 +91 98765 43210","✉️ hello@yugans.com","⏰ Mon-Sat: 9am–6pm"].map(c => (
                  <div key={c} className="text-gray-400 text-xs sm:text-sm mb-2">{c}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 py-4 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-gray-500 text-xs">© 2024 Yugan's Products. All rights reserved.</p>
              <div className="flex gap-4 text-xs text-gray-500"><span>🌿 Natural</span><span>🏆 Quality</span><span>🚚 Fast</span></div>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  // ─── PRODUCTS PAGE ───
  const ProductsPage = () => (
    <div className="min-h-screen bg-[#F5F9E8]">
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
              className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold capitalize transition-all ${category===c?"bg-[#8DC21F] text-white shadow-lg shadow-[#8DC21F]/30":"bg-white text-[#2D6A2D] border-2 border-[#E8F2D0] hover:border-[#8DC21F]"}`}>
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
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );

  // ─── CART PAGE ───
  const CartPage = () => {
    if (!user) return (
      <div className="min-h-screen bg-[#F5F9E8] flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#E8F2D0] max-w-sm w-full">
          <div className="text-7xl sm:text-8xl mb-5">🛒</div>
          <h2 className="font-black text-[#2D6A2D] text-2xl sm:text-3xl mb-2">Your Cart Awaits</h2>
          <p className="text-gray-400 text-sm mb-7">Login to view cart and shop</p>
          <button onClick={() => setAuthModal("login")} className="w-full bg-gradient-to-r from-[#8DC21F] to-[#7AB01A] text-white font-black py-4 rounded-2xl text-base hover:from-[#A8D832] hover:to-[#8DC21F] transition-all shadow-xl">Login to Continue →</button>
        </div>
      </div>
    );
    if (orderPlaced) return (
      <div className="min-h-screen bg-[#F5F9E8] flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#8DC21F]/20 max-w-sm w-full">
          <div className="w-20 h-20 bg-[#8DC21F] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl shadow-lg">✓</div>
          <h2 className="font-black text-[#2D6A2D] text-2xl sm:text-3xl mb-2">Order Confirmed! 🎉</h2>
          <p className="text-gray-400 text-sm mb-7">Delivered in 2-3 business days</p>
          <button onClick={() => { setOrderPlaced(false); setPage("products"); }} className="w-full bg-gradient-to-r from-[#8DC21F] to-[#7AB01A] text-white font-black py-4 rounded-2xl text-base transition-all">Continue Shopping →</button>
        </div>
      </div>
    );
    const shipping = cartTotal >= 499 ? 0 : 49;
    const tax = Math.round(cartTotal * 0.05);
    const grand = cartTotal + shipping + tax;
    return (
      <div className="min-h-screen bg-[#F5F9E8]">
        <div className="bg-[#1E4A1E] py-12 sm:py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#8DC21F]/15 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <span className="text-[#8DC21F] font-extrabold text-xs uppercase tracking-widest">Review & Checkout</span>
            <h1 className="font-black text-white text-4xl sm:text-5xl mt-2">My <span className="text-[#8DC21F]">Cart</span></h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              {cart.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-[#E8F2D0]">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="font-extrabold text-[#2D6A2D] text-xl mb-2">Cart is empty</h3>
                  <button onClick={() => setPage("products")} className="mt-4 bg-[#8DC21F] text-white px-7 py-2.5 rounded-xl font-bold text-sm">Browse Products →</button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-extrabold text-[#2D6A2D] text-lg">{cart.length} Item{cart.length > 1?"s":""}</h2>
                    <button onClick={() => setCart([])} className="text-red-400 hover:text-red-600 text-sm font-bold transition-colors">🗑️ Clear All</button>
                  </div>
                  {cart.map(item => (
                    <div key={item.id} className="bg-white rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 border border-[#E8F2D0] shadow-sm">
                      <img src={item.img} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0"
                        onError={e=>e.target.src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&q=80"} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <h3 className="font-extrabold text-[#2D6A2D] text-sm sm:text-base line-clamp-2">{item.name}</h3>
                          <button onClick={() => setCart(c => c.filter(i => i.id !== item.id))} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 text-lg leading-none">×</button>
                        </div>
                        <p className="text-gray-400 text-xs mt-0.5 capitalize">{item.category} · {item.weight}</p>
                        <div className="flex items-center justify-between mt-2 sm:mt-3">
                          <div className="flex items-center gap-2 sm:gap-3 bg-[#F5F9E8] rounded-xl px-2 sm:px-3 py-1.5">
                            <button onClick={() => updateQty(item.id, -1)} className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow text-[#2D6A2D] font-black flex items-center justify-center hover:bg-[#8DC21F] hover:text-white transition-all text-sm">−</button>
                            <span className="font-black text-[#2D6A2D] text-sm w-5 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow text-[#2D6A2D] font-black flex items-center justify-center hover:bg-[#8DC21F] hover:text-white transition-all text-sm">+</button>
                          </div>
                          <span className="font-black text-[#2D6A2D] text-lg sm:text-xl">₹{(item.price*item.qty).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E8F2D0] shadow-md sticky top-20">
                <h3 className="font-black text-[#2D6A2D] text-xl mb-5">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-500"><span>Subtotal ({cart.reduce((s,i)=>s+i.qty,0)} items)</span><span className="font-bold">₹{cartTotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-gray-500"><span>Shipping</span><span className={`font-bold ${shipping===0?"text-[#8DC21F]":""}`}>{shipping===0?"🎉 FREE":`₹${shipping}`}</span></div>
                  {shipping > 0 && (
                    <div className="bg-[#F5F9E8] rounded-xl p-3 border border-[#8DC21F]/20">
                      <p className="text-[#2D6A2D] text-xs font-bold">Add ₹{499-cartTotal} more for FREE shipping!</p>
                      <div className="mt-2 bg-white rounded-full h-1.5 overflow-hidden"><div className="h-full bg-[#8DC21F] transition-all" style={{width:`${Math.min((cartTotal/499)*100,100)}%`}}/></div>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500"><span>Tax (5%)</span><span className="font-bold">₹{tax}</span></div>
                  <div className="border-t border-[#E8F2D0] pt-3 flex justify-between">
                    <span className="font-black text-[#2D6A2D] text-base">Total</span>
                    <span className="font-black text-[#2D6A2D] text-2xl">₹{grand.toLocaleString()}</span>
                  </div>
                </div>
                {cart.length > 0 && <button onClick={() => { setOrderPlaced(true); setCart([]); showToast("Order placed! 🎉"); }}
                  className="w-full mt-5 bg-gradient-to-r from-[#8DC21F] to-[#7AB01A] text-white font-black py-4 rounded-2xl text-base hover:from-[#A8D832] hover:to-[#8DC21F] transition-all shadow-xl hover:shadow-[#8DC21F]/40 hover:-translate-y-0.5">
                  🛒 Checkout — ₹{grand.toLocaleString()}
                </button>}
                <button onClick={() => setPage("products")} className="w-full mt-3 text-[#2D6A2D] font-bold text-sm py-2 hover:text-[#8DC21F] transition-colors">← Continue Shopping</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── CONTACT PAGE ───
  const ContactPage = () => (
    <div className="min-h-screen bg-[#F5F9E8]">
      <div className="bg-[#1E4A1E] py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#8DC21F]/15 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <span className="text-[#8DC21F] font-extrabold text-xs uppercase tracking-widest">Get In Touch</span>
          <h1 className="font-black text-white text-4xl sm:text-5xl mt-2">Contact <span className="text-[#8DC21F]">Us</span></h1>
          <p className="text-gray-300 text-sm mt-2">We'd love to hear from you!</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[["📍","Visit Us","Chennai, Tamil Nadu 600001","bg-[#8DC21F]"],["📞","Call Us","+91 98765 43210","bg-[#2D6A2D]"],["✉️","Email Us","hello@yugans.com","bg-[#7AB01A]"],["⏰","Hours","Mon–Sat: 9am–6pm","bg-[#1E4A1E]"]].map(([icon,title,info,color]) => (
            <div key={title} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#E8F2D0]">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-lg mb-3 shadow`}>{icon}</div>
              <h3 className="font-extrabold text-[#2D6A2D] text-sm mb-1">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{info}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <div>
            <h2 className="font-black text-[#2D6A2D] text-2xl sm:text-3xl mb-2">Send Us a Message</h2>
            <p className="text-gray-400 text-sm mb-7">We typically respond within 24 hours on business days.</p>
            {contactSent ? (
              <div className="bg-[#F0FDF4] border-2 border-[#8DC21F] rounded-2xl p-8 text-center">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="font-extrabold text-[#2D6A2D] text-xl mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm mb-5">We'll get back to you within 24 hours.</p>
                <button onClick={() => setContactSent(false)} className="bg-[#8DC21F] text-white px-7 py-2.5 rounded-xl font-bold text-sm">Send Another</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">Your Name *</label>
                    <input value={contactForm.name} onChange={e=>setContactForm({...contactForm,name:e.target.value})} placeholder="Full name"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#E8F2D0] bg-white text-sm focus:outline-none focus:border-[#8DC21F] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">Email *</label>
                    <input value={contactForm.email} onChange={e=>setContactForm({...contactForm,email:e.target.value})} placeholder="your@email.com" type="email"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#E8F2D0] bg-white text-sm focus:outline-none focus:border-[#8DC21F] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">Subject *</label>
                  <select value={contactForm.subject} onChange={e=>setContactForm({...contactForm,subject:e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#E8F2D0] bg-white text-sm focus:outline-none focus:border-[#8DC21F] transition-colors text-[#2D6A2D]">
                    <option value="">Select a subject...</option>
                    {["Order Inquiry","Product Information","Bulk Order","Delivery Issue","Quality Feedback","Partnership"].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">Message *</label>
                  <textarea value={contactForm.message} onChange={e=>setContactForm({...contactForm,message:e.target.value})} rows={5} placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#E8F2D0] bg-white text-sm focus:outline-none focus:border-[#8DC21F] transition-colors resize-none" />
                </div>
                <button onClick={() => {
                  if(contactForm.name&&contactForm.email&&contactForm.subject&&contactForm.message){setContactSent(true);setContactForm({name:"",email:"",subject:"",message:""});showToast("Message sent! 🌿");}
                  else showToast("Please fill all required fields","error");
                }} className="w-full bg-gradient-to-r from-[#8DC21F] to-[#7AB01A] text-white font-black py-4 rounded-2xl text-sm hover:from-[#A8D832] hover:to-[#8DC21F] transition-all shadow-xl hover:shadow-[#8DC21F]/40 hover:-translate-y-0.5">
                  🌿 Send Message
                </button>
              </div>
            )}
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-black text-[#2D6A2D] text-xl sm:text-2xl mb-5">Frequently Asked Questions</h3>
              {[["What makes Yugan's multigrains different?","Our grains are stone-ground using traditional methods, preserving all natural nutrients. No bleaching, no preservatives — just pure wholesome goodness."],
                ["How long do products stay fresh?","All products have 6-12 months shelf life when stored cool and dry. Best consumed within 3 months of opening."],
                ["Do you offer bulk orders?","Yes! Special pricing for bulk orders above 10kg. Contact our sales team for a customized quote."],
                ["Is delivery available pan-India?","Yes, we deliver to all major cities across India with express delivery in 2-3 business days."],
              ].map(([q,a],i) => (
                <div key={i} className={`bg-white rounded-2xl border-2 mb-3 overflow-hidden transition-colors ${faqOpen===i?"border-[#8DC21F]":"border-[#E8F2D0]"}`}>
                  <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full flex justify-between items-center px-5 py-4 font-extrabold text-[#2D6A2D] text-sm text-left">
                    <span>{q}</span>
                    <span className={`text-[#8DC21F] text-xl transition-transform duration-200 flex-shrink-0 ml-2 ${faqOpen===i?"rotate-45":""}`}>+</span>
                  </button>
                  {faqOpen===i && <div className="px-5 pb-4 text-gray-500 text-sm leading-relaxed border-t border-[#E8F2D0] pt-3">{a}</div>}
                </div>
              ))}
            </div>
            <div className="bg-[#2D6A2D] rounded-2xl p-6 text-center">
              <h4 className="text-[#8DC21F] font-extrabold text-base mb-2">Follow Our Journey 🌿</h4>
              <p className="text-gray-300 text-xs mb-4">Join 50K+ followers for recipes & offers</p>
              <div className="flex justify-center gap-3">
                {[["📘","FB"],["📸","IG"],["🐦","TW"],["▶️","YT"]].map(([icon,label]) => (
                  <div key={label} className="bg-white/10 hover:bg-[#8DC21F] rounded-xl px-3 py-2.5 cursor-pointer transition-colors text-center">
                    <div className="text-xl">{icon}</div>
                    <div className="text-white text-[9px] font-bold mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── ADMIN PAGE ───
  const AdminPage = () => {
    if (!user || user.role !== "admin") return (
      <div className="min-h-screen bg-[#F5F9E8] flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl p-8 sm:p-12 shadow-xl max-w-sm w-full">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="font-black text-[#2D6A2D] text-xl mb-2">Admin Access Required</h2>
          <p className="text-gray-400 text-sm mb-2">Login with admin credentials.</p>
          <p className="text-xs text-gray-300 bg-[#F5F9E8] rounded-xl p-3">admin@yugans.com / admin123</p>
          <button onClick={() => setAuthModal("login")} className="mt-5 w-full bg-[#8DC21F] text-white font-black py-3 rounded-xl">Login as Admin</button>
        </div>
      </div>
    );
    return (
      <div className="min-h-screen bg-[#F5F9E8]">
        <div className="bg-[#1E4A1E] py-10 sm:py-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#8DC21F]/15 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-[#8DC21F] font-extrabold text-xs uppercase tracking-widest">Admin Panel</span>
              <h1 className="font-black text-white text-3xl sm:text-4xl mt-1">Dashboard ⚙️</h1>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-white font-bold text-sm">{user.name}</p>
              <p className="text-[#8DC21F] text-xs">Administrator</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
            {[["📦","Products",adminProducts.length,"bg-[#8DC21F]"],["⭐","Featured",adminProducts.filter(p=>p.featured).length,"bg-amber-400"],["🏷️","Categories",[...new Set(adminProducts.map(p=>p.category))].length,"bg-[#2D6A2D]"],["💰","Avg Price",`₹${Math.round(adminProducts.reduce((s,p)=>s+p.price,0)/adminProducts.length)}`,"bg-[#1E4A1E]"]].map(([icon,label,val,color]) => (
              <div key={label} className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8F2D0] shadow-sm">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 ${color} rounded-xl flex items-center justify-center text-base sm:text-lg mb-3 shadow`}>{icon}</div>
                <div className="font-black text-[#2D6A2D] text-2xl sm:text-3xl">{val}</div>
                <div className="text-gray-400 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {["products","add"].map(t => (
              <button key={t} onClick={() => setAdminTab(t)} className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold capitalize transition-all ${adminTab===t?"bg-[#8DC21F] text-white shadow-lg":"bg-white text-[#2D6A2D] border-2 border-[#E8F2D0] hover:border-[#8DC21F]"}`}>
                {t==="products"?"📦 All Products":"➕ Add Product"}
              </button>
            ))}
          </div>

          {adminTab === "products" && (
            <div className="bg-white rounded-3xl border border-[#E8F2D0] overflow-hidden shadow-sm">
              <div className="px-5 sm:px-6 py-4 border-b border-[#E8F2D0] font-extrabold text-[#2D6A2D] text-base sm:text-lg">All Products ({adminProducts.length})</div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-[#F5F9E8]">
                    <tr>{["Product","Category","Price","Featured","Actions"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-extrabold text-[#2D6A2D] uppercase tracking-wider">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5F9E8]">
                    {adminProducts.map(p => (
                      <tr key={p.id} className="hover:bg-[#F5F9E8]/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={p.img} alt={p.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover flex-shrink-0" onError={e=>e.target.src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=80&q=80"} />
                            <div><div className="font-extrabold text-[#2D6A2D] text-xs sm:text-sm">{p.name}</div><div className="text-gray-400 text-xs">{p.weight}</div></div>
                          </div>
                        </td>
                        <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${CAT_COLORS[p.category]||"bg-gray-100 text-gray-600"}`}>{p.category}</span></td>
                        <td className="px-4 py-3"><div className="font-extrabold text-[#2D6A2D] text-sm">₹{p.price}</div>{p.originalPrice&&<div className="text-gray-300 text-xs line-through">₹{p.originalPrice}</div>}</td>
                        <td className="px-4 py-3">{p.featured?<span className="text-amber-400 font-bold text-sm">⭐ Yes</span>:<span className="text-gray-300 text-sm">—</span>}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => setAdminProducts(prev=>prev.map(x=>x.id===p.id?{...x,featured:!x.featured}:x))} className="bg-amber-50 hover:bg-amber-100 text-amber-600 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap">{p.featured?"★ Unfeature":"☆ Feature"}</button>
                            <button onClick={() => { setAdminProducts(prev=>prev.filter(x=>x.id!==p.id)); showToast(`${p.name} deleted`); }} className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {adminTab === "add" && (
            <div className="bg-white rounded-3xl border border-[#E8F2D0] p-6 sm:p-8 shadow-sm">
              <h2 className="font-black text-[#2D6A2D] text-xl sm:text-2xl mb-6">➕ Add New Product</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {[["name","Product Name *","e.g. 7-Grain Flour"],["price","Price (₹) *","e.g. 199"],["originalPrice","Original Price (₹)","e.g. 249"],["weight","Weight","e.g. 500g"],["badge","Badge","e.g. Best Seller"]].map(([key,label,ph]) => (
                  <div key={key}>
                    <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">{label}</label>
                    <input value={addForm[key]} onChange={e=>setAddForm({...addForm,[key]:e.target.value})} placeholder={ph}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#E8F2D0] text-sm focus:outline-none focus:border-[#8DC21F] transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">Category *</label>
                  <select value={addForm.category} onChange={e=>setAddForm({...addForm,category:e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#E8F2D0] text-sm focus:outline-none focus:border-[#8DC21F] transition-colors text-[#2D6A2D]">
                    {["multigrain","masala","seeds","spices","flours","blends"].map(c=><option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">Description *</label>
                  <textarea value={addForm.desc} onChange={e=>setAddForm({...addForm,desc:e.target.value})} rows={3} placeholder="Product description..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#E8F2D0] text-sm focus:outline-none focus:border-[#8DC21F] transition-colors resize-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">Benefits (comma-separated)</label>
                  <input value={addForm.benefits} onChange={e=>setAddForm({...addForm,benefits:e.target.value})} placeholder="High Fiber, Protein Rich, No Preservatives"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#E8F2D0] text-sm focus:outline-none focus:border-[#8DC21F] transition-colors" />
                </div>
                <div className="sm:col-span-2 flex items-center gap-3">
                  <input type="checkbox" id="feat" checked={addForm.featured} onChange={e=>setAddForm({...addForm,featured:e.target.checked})} className="w-5 h-5 accent-[#8DC21F]" />
                  <label htmlFor="feat" className="text-sm font-bold text-[#2D6A2D]">Mark as Featured Product</label>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <button onClick={() => {
                  if(!addForm.name||!addForm.price||!addForm.desc){showToast("Fill all required fields","error");return;}
                  const np={id:Date.now(),name:addForm.name,price:Number(addForm.price),originalPrice:addForm.originalPrice?Number(addForm.originalPrice):null,category:addForm.category,weight:addForm.weight||"500g",badge:addForm.badge,desc:addForm.desc,rating:4.5,reviews:0,featured:addForm.featured,benefits:addForm.benefits?addForm.benefits.split(",").map(s=>s.trim()).filter(Boolean):[],img:"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80"};
                  setAdminProducts(prev=>[np,...prev]);
                  setAddForm({name:"",price:"",originalPrice:"",category:"multigrain",weight:"500g",badge:"",desc:"",benefits:"",featured:false});
                  showToast(`${np.name} added! 🎉`);setAdminTab("products");
                }} className="bg-gradient-to-r from-[#8DC21F] to-[#7AB01A] text-white font-black px-8 py-3.5 rounded-2xl text-sm hover:from-[#A8D832] hover:to-[#8DC21F] transition-all shadow-lg">✅ Add Product</button>
                <button onClick={() => setAddForm({name:"",price:"",originalPrice:"",category:"multigrain",weight:"500g",badge:"",desc:"",benefits:"",featured:false})} className="bg-[#F5F9E8] text-[#2D6A2D] font-bold px-7 py-3.5 rounded-2xl text-sm border-2 border-[#E8F2D0] hover:border-[#8DC21F] transition-all">Clear</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ─── AUTH MODAL ───
  const AuthModal = () => {
    if (!authModal) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" onClick={() => setAuthModal(null)}>
        <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-[slideUp_0.3s_ease-out]" onClick={e=>e.stopPropagation()}>
          <div className="bg-[#1E4A1E] p-7 text-center relative">
            <button onClick={() => setAuthModal(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/15 hover:bg-white/25 text-white rounded-full flex items-center justify-center text-lg font-bold transition-colors">×</button>
            <div className="w-16 h-16 bg-[#8DC21F] rounded-full flex items-center justify-center mx-auto mb-3 font-black text-white text-2xl shadow-lg">Y</div>
            <h2 className="font-black text-[#8DC21F] text-2xl">Yugan's Products</h2>
            <p className="text-[#6abf6a] text-xs italic mt-1">Meal time in a Minute</p>
          </div>
          <div className="flex border-b border-[#E8F2D0]">
            {["login","register"].map(t => (
              <button key={t} onClick={() => setAuthModal(t)} className={`flex-1 py-3.5 text-sm font-extrabold capitalize transition-all ${authModal===t?"text-[#2D6A2D] border-b-2 border-[#8DC21F] bg-[#F5F9E8]":"text-gray-400 hover:text-[#2D6A2D]"}`}>
                {t==="login"?"🔑 Login":"✨ Sign Up"}
              </button>
            ))}
          </div>
          <div className="p-6 space-y-4">
            {authModal==="register" && (
              <div>
                <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">Full Name</label>
                <input value={authForm.name} onChange={e=>setAuthForm({...authForm,name:e.target.value})} placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#E8F2D0] bg-[#F5F9E8] text-sm focus:outline-none focus:border-[#8DC21F] transition-colors" />
              </div>
            )}
            <div>
              <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">Email Address</label>
              <input value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})} placeholder="your@email.com" type="email"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E8F2D0] bg-[#F5F9E8] text-sm focus:outline-none focus:border-[#8DC21F] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">Password</label>
              <input value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})} placeholder="••••••••" type="password"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E8F2D0] bg-[#F5F9E8] text-sm focus:outline-none focus:border-[#8DC21F] transition-colors" />
            </div>
            {authModal==="login" && (
              <div className="bg-[#F5F9E8] rounded-xl p-3 border border-[#8DC21F]/20 text-xs text-gray-500">
                <strong className="text-[#2D6A2D]">Demo Admin:</strong> admin@yugans.com / admin123
              </div>
            )}
            <button onClick={handleLogin}
              className="w-full bg-gradient-to-r from-[#8DC21F] to-[#7AB01A] text-white font-black py-4 rounded-2xl text-sm hover:from-[#A8D832] hover:to-[#8DC21F] transition-all shadow-xl hover:shadow-[#8DC21F]/40 hover:-translate-y-0.5">
              {authModal==="login"?"🌿 Login to Account":"✨ Create Account"}
            </button>
            <p className="text-center text-xs text-gray-400">
              {authModal==="login"?"Don't have an account? ":"Already have an account? "}
              <button onClick={() => setAuthModal(authModal==="login"?"register":"login")} className="text-[#2D6A2D] font-extrabold hover:text-[#8DC21F] transition-colors">
                {authModal==="login"?"Sign Up":"Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans bg-[#F5F9E8] min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { font-family: 'Nunito', system-ui, sans-serif; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-33.33%)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
        ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:#F5F9E8} ::-webkit-scrollbar-thumb{background:#8DC21F;border-radius:3px}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
      `}</style>

      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3.5 rounded-2xl font-extrabold text-sm text-white shadow-2xl animate-[slideIn_0.3s_ease-out] max-w-xs ${toast.type==="error"?"bg-red-500":"bg-[#2D6A2D]"}`}>
          {toast.msg}
        </div>
      )}

      <AuthModal />
      <Navbar />

      <div className="animate-[fadeIn_0.3s_ease-out]" key={page}>
        {page==="home" && <HomePage />}
        {page==="products" && <ProductsPage />}
        {page==="cart" && <CartPage />}
        {page==="contact" && <ContactPage />}
        {page==="admin" && <AdminPage />}
      </div>
    </div>
  );
}