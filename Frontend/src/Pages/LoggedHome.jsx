import { useEffect, useState } from "react";
import multigrain from "../Images/Multigrain.webp"
import masala from "../Images/masalaimg.webp"
import grains from "../Images/grainimg.webp"
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Authprovider.jsx";
import Spinner from "../Components/Spinner.jsx";
import ScrollReveal from "../Components/Scroll.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";


const LoggedHome = () => {

      const [page, setPage] = useState("home");
      const [category, setCategory] = useState("all");
    const [heroSlide, setHeroSlide] = useState(0);
    const { user, loading } = useContext(AuthContext);


         useEffect(() => {
        const t = setInterval(() => setHeroSlide(s => (s + 1) % 3), 3000);
        return () => clearInterval(t);
         }, []);
    
    
    if (loading) {
        console.log(loading);
        return <Spinner />
    }
   

           const heroSlides = [
    { title: "Nature's Finest", sub: "Multigrain Mix", desc: "A nutritious blend of multiple grains packed with fiber, protein, and essential nutrients for a healthy and energetic lifestyle.", badge: "🌾 100% Natural", img: multigrain },
    { title: "Aromatic", sub: "Masala Blends", desc: "Hand-crafted spice blends from traditional family recipes passed down generations", badge: "🌶️ 18 Exotic Spices", img: masala },
    { title: "Porridge", sub: "Barley & Poha", desc: "we bring you nutrition, tradition, and taste in every spoon.", badge: "💚 Certified Organic", img: grains },
  ];
    const slide = heroSlides[heroSlide];


    
    
    
    
 
    return (
      <div className="overflow-x-hidden">
        {/* Hero */}
        <section className="relative min-h-[80vh] sm:min-h-[85vh] bg-linear-to-br from-[#0A2010] via-[#1E4A1E] to-[#2D6A2D] overflow-hidden flex items-center">
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
                <Link to={"/product"}><button onClick={() => setPage("products")} className="bg-linear-to-r from-[#8DC21F] to-[#7AB01A] text-white font-black px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base hover:from-[#A8D832] hover:to-[#8DC21F] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8DC21F]/40 transition-all active:scale-95">Shop Now →</button></Link>
              </div>
              <div className="flex gap-8 sm:gap-10 mt-8 pt-6 sm:pt-8 border-t border-white/15">
                {[["30+","Products"],["2K+","Customers"],["100%","Natural"]].map(([v,l]) => (
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
        <ScrollReveal>
        <div className="bg-[#8DC21F] py-2.5 overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap animate-[marquee_20s_linear_infinite]">
            {[...Array(3)].flatMap(() => ["🌾 100% Natural","🏆 Premium Quality","🌶️ Authentic Spices","🌿 No Additives","🚚 Pan India Delivery","💚 No Preservatives"]).map((t,i)=>(
              <span key={i} className="text-white font-extrabold text-xs sm:text-sm">{t}</span>
            ))}
          </div>
        </div>
            </ScrollReveal>
        {/* Features */}
        <ScrollReveal>
        <section className="py-14 sm:py-20 bg-[#F5F9E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
              <span className="text-[#8DC21F] font-extrabold text-xs uppercase tracking-widest">Why Choose Us</span>
              <h2 className="font-black text-[#2D6A2D] text-3xl sm:text-4xl lg:text-5xl mt-2">The Yugan's <span className="text-[#8DC21F]">Difference</span></h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {[["🌾","Farm Fresh","Certified organic farms"],["🏆","Premium Quality","Stone-ground for max nutrition"],["🚚","Fast Delivery","5-7 days Pan India"],["🌿","No Additives","Made with pure, natural ingredients and absolutely no artificial additives"],["🌱","No Preservatives","100% natural ingredients"],["♻️","Eco Packaging","Sustainable biodegradable packs"]].map(([icon,title,desc]) => (
                <div key={title} className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E8F2D0] hover:border-[#8DC21F] hover:shadow-lg shadow-xl hover:shadow-[#8DC21F]/10 transition-all duration-300 group">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">{icon}</div>
                  <h3 className="font-extrabold text-[#2D6A2D] text-sm sm:text-base mb-1">{title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
              </ScrollReveal>
        {/* Categories */}
        <ScrollReveal>
        <section className="py-14 sm:py-10 sm:mb-10 bg-[#F5F9E8]">
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
              ].map(c => (<Link to={"/product"} key={c.name}>
                <button  
                  className="relative h-32 sm:h-44 rounded-2xl overflow-hidden group cursor-pointer text-left">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e=>e.target.src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80"} />
                  <div className={`absolute inset-0 bg-linear-to-t ${c.grad}`} />
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
              </ScrollReveal>
        {/* Banner */}
        <ScrollReveal>
        <section className="py-12 sm:py-16 bg-linear-to-r from-[#8DC21F] to-[#7AB01A] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2" />
          <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
            <h2 className="font-black text-white text-2xl sm:text-4xl mb-3">🌿 Free Delivery on Orders Over ₹999!</h2>
                    <p className="text-white/85 text-sm sm:text-base mb-6">Use code <strong className="bg-white/20 px-3 py-1 rounded-lg">YUGAN20</strong> for 20% off your first order</p>
                    <Link to={"/product"}>
            <button className="bg-white text-[#2D6A2D] font-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base shadow-2xl hover:-translate-y-1 hover:shadow-3xl transition-all">Start Shopping →</button></Link>
          </div>
        </section>
</ScrollReveal>
        {/* Testimonials */}
        <ScrollReveal>
        <section className="py-14 sm:py-20 bg-[#F5F9E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#8DC21F] font-extrabold text-xs uppercase tracking-widest">What People Say</span>
              <h2 className="font-black text-[#2D6A2D] text-3xl sm:text-4xl mt-1">Customer <span className="text-[#8DC21F]">Love</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {name:"Varsha",loc:"Coimbatore",text:"Hi! My baby wasn't eating food properly, so I bought 500Grms of MULTIGRAIN MIX from YUGAN'S PRODUCT. Now, My baby loves taking it and it's so nutritious!",stars:5},
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
</ScrollReveal>
        {/* Footer */}
    <footer className="bg-[#1E4A1E] text-white">
          <div className="md:max-w-7xl max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
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
                <div>
  <h4 className="text-[#8DC21F] font-extrabold text-sm mb-4">Contact</h4>

  <div className="text-gray-400 text-xs sm:text-sm mb-2">📍 Karur, Tamil Nadu</div>
  <div className="text-gray-400 text-xs sm:text-sm mb-2">📞 +91 63812 10833</div>
  <div className="text-gray-400 text-xs sm:text-sm mb-2">📧 yugansproduct@gmail.com</div>
  <div className="text-gray-400 text-xs sm:text-sm mb-2">⏰ Monday-Sunday: 9am–6pm</div>

  {/* Instagram icon */}
  <div className="flex gap-4 text-xl mt-2">
    <FontAwesomeIcon 
      icon={faInstagram} style={{ color: "#E1306C" }}
      className="cursor-pointer hover:text-pink-500 transition"
    /> <span className="text-gray-400 text-xs sm:text-sm mb-2">Yugansproduct</span>
  </div>
</div>
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

  export default LoggedHome;