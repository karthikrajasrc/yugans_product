import { useEffect, useState } from "react";
import multigrain from "../Images/multigrain.webp"
import masala from "../Images/masalaimg.webp"
import grains from "../Images/grainimg.webp"
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

const Stars = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[1,2,3,4,5].map(i => (
      <span key={i} className={`text-sm ${i <= Math.floor(rating) ? "text-amber-400" : "text-gray-300"}`}>★</span>
    ))}
    <span className="text-xs text-gray-400 font-semibold ml-1">{rating}</span>
  </div>
);


const Home = () => {

      const [page, setPage] = useState("home");
      const [category, setCategory] = useState("all");
      const [user, setUser] = useState(null);
      const [heroSlide, setHeroSlide] = useState(0);
   

           const heroSlides = [
    { title: "Nature's Finest", sub: "Multigrain Mix", desc: "A nutritious blend of multiple grains packed with fiber, protein, and essential nutrients for a healthy and energetic lifestyle.", badge: "🌾 100% Natural", img: multigrain },
    { title: "Aromatic", sub: "Masala Blends", desc: "Hand-crafted spice blends from traditional family recipes passed down generations", badge: "🌶️ 18 Exotic Spices", img: masala },
    { title: "Porridge", sub: "Barley & Poha", desc: "we bring you nutrition, tradition, and taste in every spoon.", badge: "💚 Certified Organic", img: grains },
  ];
    const slide = heroSlides[heroSlide];

     useEffect(() => {
        const t = setInterval(() => setHeroSlide(s => (s + 1) % 3), 3000);
        return () => clearInterval(t);
      }, []);
    
 
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
              </div>
              <div className="flex gap-8 sm:gap-10 mt-8 pt-6 sm:pt-8 border-t border-white/15">
                {[["50+","Products"],["2K+","Customers"],["100%","Natural"]].map(([v,l]) => (
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
            {[...Array(3)].flatMap(() => ["🌾 100% Natural","🏆 Premium Quality","🌶️ Authentic Spices","🌿 No Additives","🚚 Pan India Delivery","💚 No Preservatives"]).map((t,i)=>(
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
              {[["🌾","Farm Fresh","Certified organic farms"],["🏆","Premium Quality","Stone-ground for max nutrition"],["🚚","Fast Delivery","2-3 days Pan India"],["🌿","No Additives","Made with pure, natural ingredients and absolutely no artificial additives"],["🌱","No Preservatives","100% natural ingredients"],["♻️","Eco Packaging","Sustainable biodegradable packs"]].map(([icon,title,desc]) => (
                <div key={title} className="bg-[#F5F9E8] rounded-2xl p-4 sm:p-6 border border-[#E8F2D0] hover:border-[#8DC21F] hover:shadow-lg hover:shadow-[#8DC21F]/10 transition-all duration-300 group">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">{icon}</div>
                  <h3 className="font-extrabold text-[#2D6A2D] text-sm sm:text-base mb-1">{title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-14 sm:py-10 sm:mb-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-[#8DC21F] font-extrabold text-xs uppercase tracking-widest">Browse By</span>
              <h2 className="font-black text-[#2D6A2D] text-3xl sm:text-4xl mt-1">Shop <span className="text-[#8DC21F]">Categories</span></h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
              {[
                {name:"Multigrains",emoji:"🌾",img: multigrain ,grad:"from-amber-500/80 to-amber-700/80"},
                {name:"Masalas",emoji:"🌶️",img: masala,grad:"from-red-200/50 to-red-200/50"},
                {name:"Porridge's",emoji:"🌱",img: grains ,grad:"from-emerald-500/80 to-emerald-700/80"}
              ].map(c => (<Link to={"/products"}>
                <button key={c.name} 
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
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Banner */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-[#8DC21F] to-[#7AB01A] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2" />
          <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
            <h2 className="font-black text-white text-2xl sm:text-4xl mb-3">🌿 Free Delivery on Orders Over ₹999!</h2>
                    <p className="text-white/85 text-sm sm:text-base mb-6">Use code <strong className="bg-white/20 px-3 py-1 rounded-lg">YUGAN20</strong> for 20% off your first order</p>
                    <Link to={"/products"}>
            <button className="bg-white text-[#2D6A2D] font-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base shadow-2xl hover:-translate-y-1 hover:shadow-3xl transition-all">Start Shopping →</button></Link>
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
                {name:"Varsha",loc:"Coimbatore",text:"Hi! My baby wasn't eating food properlt, so I bought 500Grms of MULTIGRAIN MIX from YUGAN'S PRODUCT. Now, My baby loves taking it and it's so nutritious!",stars:5},
                {name:"Janani Alaguvel",loc:"Karur",text:"I had been feeding my baby with the Multigrain Mix and it was so nice to eat!",stars:5},
                {name:"Meenachi",loc:"Chennai",text:"The multigrain mix is fantastic! My family loves it and it's so healthy and I have bought a Masala which is in aromatic style!",stars:5},
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
                  <div><div className="text-[#8DC21F] font-black text-base">Yugan's Product</div><div className="text-[#6abf6a] text-[10px] italic">Meal time in a Minute</div></div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">Premium quality multigrains, masalas and spices sourced from the finest farms across India.</p>
              </div>
              <div>
                <h4 className="text-[#8DC21F] font-extrabold text-sm mb-4">Quick Links</h4>
                <div className="text-gray-400 text-sm mb-2">
                  <Link to="/"><p className="mb-2">Home</p></Link>
                  <Link to="/products"><p className="mb-2">Products</p></Link>
                  <Link to="/"> <p className="mb-2">Contact</p></Link>
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
      </div>
    );
  };

  export default Home;