import { useContext, useEffect, useState } from "react";
import logo from "../Images/Logo.png"
import { Link, Navigate, Outlet, useNavigate } from "react-router";
import LoginRegister from "./LoginRegister";
import instance from "../protectedInstances/axios";
import { AuthContext } from "../../Authprovider";
import toast from "react-hot-toast";
import Spinner from "./Spinner";


const Navbar = () => {
    const [page, setPage] = useState("home");
      const [cart, setCart] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { user, setUser, loading, authModal, setAuthModal} = useContext(AuthContext);
    const navigate = useNavigate();

    const hanldeLogout = async () => {
        try {
            const response = await instance.post("/auth/logout");
            setUser(null);
            localStorage.removeItem("cart");
            toast.success("Logout Successful ✅");
            navigate("/");
            
        }
        catch (error) {
            const msg = error.response?.data?.Message || "Logout Failed";
                toast.error(msg);
        }
    }
    
     if (loading) {
        console.log(loading);
        return <Spinner />
    }

    return (
        <>
            {authModal && (
      <LoginRegister 
        authModal={authModal}
        setAuthModal={setAuthModal}
                />
            )}
            <nav className="sticky top-0 z-50 bg-[#1E4A1E] shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-18 sm:h-18">
                      { !user && (<div>
                        <button className="flex items-center gap-2.5 group">
                            <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center font-black text-white text-base sm:text-lg shadow-lg group-hover:scale-110 transition-transform">
                                <img src={logo} alt="Logo"/>
                            </div>
                            <div className="text-left">
                                <div className="text-[#8DC21F] font-black text-base sm:text-lg leading-none">Yugan's Product</div>
                                <div className="text-[#6abf6a] text-[12px] italic leading-none mt-1.5 hidden sm:block">Meal time in a Minute</div>
                            </div>
                            </button>
                        </div>)}
                        { user && (
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold text-2xl">Welcome, {user.Name}!</span>
                            </div>
                        )}

                        {/* Desktop nav */}
                        {!user && (<div className="hidden md:flex items-center gap-1">
                                <Link to="/"><button 
                                className="px-4 py-2 rounded-full text-sm font-bold transition-all bg-[#8DC21F] text-white shadow-md   text-white-300 hover:text-[#8DC21F] hover:bg-white/10">Home</button></Link>
                            <Link to="/products"><button 
                                className="px-4 py-2 rounded-full text-sm font-bold transition-all bg-[#8DC21F] text-white shadow-md text-white-300 hover:text-[#8DC21F] hover:bg-white/10">Product</button></Link>
                            </div>)}
                            
                        
                            {user && (
                                <div className="hidden md:flex items-center gap-1">
                                <Link to="/home"><button 
                                className="px-4 py-2 rounded-full text-sm font-bold transition-all bg-[#8DC21F] text-white shadow-md   text-white-300 hover:text-[#8DC21F] hover:bg-white/10">Home</button></Link>
                            <Link to="/product"><button 
                                className="px-4 py-2 rounded-full text-sm font-bold transition-all bg-[#8DC21F] text-white shadow-md text-white-300 hover:text-[#8DC21F] hover:bg-white/10">Product</button></Link>
                                
                               <Link to="/cart"><button 
                                    className="px-4 py-2 rounded-full text-sm font-bold transition-all bg-[#8DC21F] text-white shadow-md text-white-300 hover:text-[#8DC21F] hover:bg-white/10">Cart</button></Link>
                                <Link to="/orders"><button 
                                    className="px-4 py-2 rounded-full text-sm font-bold transition-all bg-[#8DC21F] text-white shadow-md text-white-300 hover:text-[#8DC21F] hover:bg-white/10">Orders</button></Link>
                                {user?.Role === "Admin" && (
                        <div>
                            <Link to="/admin"><button className="px-4 py-2 rounded-full text-sm font-bold transition-all bg-[#8DC21F] text-white shadow-md text-white-300 hover:text-[#8DC21F] hover:bg-white/10">Admin</button></Link>
                        </div>
                    )}
                                </div>
                            )}  
                        

                        { !user && (<div className="hidden md:flex items-center gap-2">
                                <button  onClick={() => setAuthModal("login")} className="bg-[#8DC21F] hover:bg-[#A8D832] text-white text-sm font-black px-5 py-2 rounded-full transition-all shadow-lg hover:shadow-[#8DC21F]/40 hover:-translate-y-0.5">Login / Sign Up</button>
                        </div>)}
                        { user && (<div className="hidden md:flex items-center gap-2">
                                <button onClick={hanldeLogout} className="bg-[#8DC21F] hover:bg-[#A8D832] text-white text-sm font-black px-5 py-2 rounded-full transition-all shadow-lg hover:shadow-[#8DC21F]/40 hover:-translate-y-0.5">Logout</button>
                        </div>) }

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
              
                    <div className={`md:hidden bg-[#2D6A2D] border-t border-white/10 px-4 overflow-hidden transition-all duration-300 ease-in-out
  ${mobileMenu ? "max-h-96 opacity-100 translate-y-0 py-3" : "max-h-0 opacity-0 -translate-y-5 py-0"}
  `}>

                        {!user && (
                            <div><Link to="/"><button onClick={() => setMobileMenu(false)} className="w-full my-1 text-left px-4 py-3 rounded-xl text-sm font-bold transition-all bg-[#8DC21F] text-white hover:bg-white/10">🏠 Home</button></Link>
                        <Link to="/products"><button onClick={() => setMobileMenu(false)} className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all bg-[#8DC21F] text-white hover:bg-white/10">🛒 Product</button></Link></div>
                        )}

                        {user && (
                            <div>
                                <Link to="/home"><button onClick={() => setMobileMenu(false)} className="w-full my-1 text-left px-4 py-3 rounded-xl text-sm font-bold transition-all bg-[#8DC21F] text-white hover:bg-white/10">🏠 Home</button></Link>
                                <Link to="/product"><button onClick={() => setMobileMenu(false)} className="w-full my-1 text-left px-4 py-3 rounded-xl text-sm font-bold transition-all bg-[#8DC21F] text-white hover:bg-white/10">🛒 Product</button></Link>
                                <Link to="/cart"><button onClick={() => setMobileMenu(false)} className="w-full my-1 text-left px-4 py-3 rounded-xl text-sm font-bold transition-all bg-[#8DC21F] text-white hover:bg-white/10">🛍️ Cart</button></Link>
                            <Link to="/orders"><button onClick={() => setMobileMenu(false)} className="w-full my-1 text-left px-4 py-3 rounded-xl text-sm font-bold transition-all bg-[#8DC21F] text-white hover:bg-white/10">📦 Orders</button></Link>
                            {user?.Role === "Admin" && (
                        <div>
                            <Link to="/admin"><button onClick={() => setMobileMenu(false)} className="w-full my-1 text-left px-4 py-3 rounded-xl text-sm font-bold transition-all bg-[#8DC21F] text-white hover:bg-white/10">⚙️ Admin Panel</button></Link>
                        </div>
                    )}
                        </div> 
                    )}
                    
                        
                        <div className="pt-2 border-t border-white/20">
                                {!user && (<div className="flex gap-2 px-2">
                                <button onClick={() => { setAuthModal("login"); setMobileMenu(false) }} className="flex-1 bg-white/10 text-white py-2.5 rounded-xl text-sm font-bold">Login</button>
                                <button onClick={() => { setAuthModal("register"); setMobileMenu(false) }} className="flex-1 bg-white/10 text-white py-2.5 rounded-xl text-sm font-black">Sign Up</button>
                            </div>)}
                            {user && (<button onClick={() => { hanldeLogout(); setMobileMenu(false) }} className="w-full bg-white/10 text-white py-2.5 rounded-xl text-sm font-bold">Logout</button>)}
                        </div>
                    </div>
            </nav>
            <Outlet />
        </>
    )
}
  
export default Navbar;