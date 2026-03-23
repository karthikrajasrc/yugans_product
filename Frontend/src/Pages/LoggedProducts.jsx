import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router";
import instance from "../protectedInstances/axios";
import toast from "react-hot-toast";


const LoggedProducts = () => {

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
 
  


  const filteredProducts = products
    .filter(p => !search || p.productName.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0; 
    });
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await instance.get("/product/all"); 
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  setCartItems(cart);
}, []);
  

const handleCart = (id) => {
  if (!cartItems.includes(id)) {
    const updatedCart = [...cartItems, id];

    setCartItems(updatedCart); 
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success("Added to Cart ✅");
  } else {
    const updatedCart = cartItems.filter(item => item !== id);

    setCartItems(updatedCart); 
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.error("Removed from Cart ❌");
  }
};

  

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
                    </select>
                </div>
      </div>
      <div>
          <div className="max-w-7xl mx-auto md:px-4 px-1 sm:px-6 lg:px-8 py-6 sm:py-10">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-2">
                  {filteredProducts.map(p => (
                      <div key={p._id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                      <img src={p.image} alt={p.productName} className="w-full h-50 md:h-85 object-cover" />
                      <div className="absolute top-3 right-3 bg-[#ffffff] text-[#2D6A2D] text-xs font-extrabold px-2 py-1 rounded-md shadow-md">
          {p.grams}g
      </div>
                          <div className="md:p-4 p-1 text-center">
                              <h3 className="md:text-lg text-sm font-bold text-[#1E4A1E]">{p.productName}</h3>
                              <p className="md:text-sm text-[13px] text-gray-600 mt-1">{p.description}</p>
                        <div className="mt-3 flex flex-col items-center justify-end">
                          <div>
                            <span className="text-xl font-extrabold text-[#2D6A2D]">₹{p.price}</span><span className="md:text-[15px] text-[13px] text-red-300 font-bold ml-2 line-through">₹{Math.round(Number(p.price) + Number(p.price) * 25 / 100)}</span>
                          </div>
                          <div>
                          <button
  onClick={() => handleCart(p._id)}
  className={`md:px-4 md:py-2 px-1 py-0.5 mt-1 mb-2 md:rounded-lg rounded-sm md:text-sm text-[13px] transition-colors
    ${cartItems.includes(p._id)
      ? "bg-red-500 hover:bg-red-600 text-white font-bold"
      : "bg-[#8DC21F] hover:bg-[#6abf6a] text-white font-bold"
    }`}
>
  {cartItems.includes(p._id) ? "Remove" : "Add to Cart"}
                            </button>
                            </div>
                        </div>
                      </div> 
                  
                      </div>
                      ))}
          </div>
        </div>
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
