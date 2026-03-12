import { useState } from "react";
import logo from "../Images/logo.png"
import { Link, Outlet } from "react-router";

const Navbar = () => {
    const [page, setPage] = useState("home");
      const [cart, setCart] = useState([]);
      const [user, setUser] = useState(null);
      const [authModal, setAuthModal] = useState(null);
      const [mobileMenu, setMobileMenu] = useState(false);
    

    return (
        <>
            <nav className="sticky top-0 z-50 bg-[#1E4A1E] shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-18 sm:h-18">
                        <button onClick={() => setPage("home")} className="flex items-center gap-2.5 group">
                            <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center font-black text-white text-base sm:text-lg shadow-lg group-hover:scale-110 transition-transform">
                                <img src={logo} alt="Logo"/>
                            </div>
                            <div className="text-left">
                                <div className="text-[#8DC21F] font-black text-base sm:text-lg leading-none">Yugan's Products</div>
                                <div className="text-[#6abf6a] text-[12px] italic leading-none mt-1.5 hidden sm:block">Meal time in a Minute</div>
                            </div>
                        </button>

                        {/* Desktop nav */}
                        <div className="hidden md:flex items-center gap-1">
                                <Link to="/"><button 
                                className="px-4 py-2 rounded-full text-sm font-bold transition-all bg-[#8DC21F] text-white shadow-md text-gray-300 hover:text-[#8DC21F] hover:bg-white/10">Home</button></Link>
                            <Link to="/products"><button 
                                    className="px-4 py-2 rounded-full text-sm font-bold transition-all bg-[#8DC21F] text-white shadow-md text-gray-300 hover:text-[#8DC21F] hover:bg-white/10">Product</button></Link>
                        </div>

                        {/* Desktop right */}
                        <div className="hidden md:flex items-center gap-2">
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
                           
                            <button onClick={() => setMobileMenu(!mobileMenu)} className="text-white p-2">
                                <div className="w-5 space-y-1">
                                    <div className={`h-0.5 bg-current transition-all ${mobileMenu ? "rotate-45 translate-y-1.5" : ""}`} />
                                    <div className={`h-0.5 bg-current transition-all ${mobileMenu ? "opacity-0" : ""}`} />
                                    <div className={`h-0.5 bg-current transition-all ${mobileMenu ? "-rotate-45 -translate-y-1.5" : ""}`} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenu && (
                    <div className="md:hidden bg-[#2D6A2D] border-t border-white/10 px-4 py-3 space-y-1 animate-[fadeIn_0.2s_ease-out]">
                        {[["home", "🏠 Home"], ["products", "📦 Products"], ["contact", "📞 Contact"]].map(([p, l]) => (
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
            <Outlet />
        </>
    )
}
  
export default Navbar;