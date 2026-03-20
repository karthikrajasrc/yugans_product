import { useState } from "react";
import { Link } from "react-router";


const Admin = () => {

    const [ordercount, setOrderCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(500);
    const [showAddProductForm, setShowAddProductForm] = useState(false);

  return (
      <>
          <div className="bg-[#1E4A1E] py-12 sm:py-16 relative overflow-hidden flex justify-evenly">
                <div className="z-10">
                    <span className="text-[#8DC21F] font-extrabold text-xs uppercase tracking-widest">Welcome Back!</span>
                    <h1 className="font-black text-white text-4xl sm:text-5xl mt-2">Hello <span className="text-[#8DC21F]">Admin</span></h1>
                    <p className="text-gray-300 text-sm mt-2 ">Mealtime in a Minute!</p>
              </div>
              <div>
                    <h2 className="font-black text-3xl text-center mt-10 mb-6  text-white">Admin Dashboard</h2>
              </div>
          </div>
          <div>
              
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                  <div>
                      <button onClick={() => setShowAddProductForm(true)} className="bg-[#ffffff] text-black px-10 py-15 rounded-lg shadow-md hover:bg-[#daf3af] transition-colors text-xl font-bold">Add Product +</button>
                  </div>
                  <div>
                      <button className="bg-[#ffffff] text-black font-extrabold px-10 py-10 rounded-lg shadow-md hover:bg-[#daf3af] transition-colors">Total Orders <p className="font-black text-[#2D6A2D] pt-2 text-2xl sm:text-3xl">{ ordercount}</p></button>
                  </div>
                  <div>
                      <button className="bg-[#ffffff] text-black font-extrabold px-10 py-10 rounded-lg shadow-md hover:bg-[#daf3af] transition-colors">Total Revenue <p className="font-black text-[#2D6A2D] pt-2 text-2xl sm:text-3xl">₹ { totalRevenue}</p></button> 
                  </div>
                  <div>
                      <button className="bg-[#ffffff] text-black font-extrabold px-10 py-10 rounded-lg shadow-md hover:bg-[#daf3af] transition-colors">Category <p className="font-black text-[#2D6A2D] pt-2 text-2xl sm:text-3xl">5</p></button>
                  </div>
                </div>
          </div>
          {showAddProductForm && (<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center">
              <form type="submit" className="max-w-2xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-md z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-2xl">
              <h2 className="text-2xl font-bold mb-6 text-[#1E4A1E]">Add New Product</h2>
              <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="productName">Product Name</label>
                  <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" type="text" id="productName" placeholder="Enter product name" />
              </div>
              <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="price">Price</label>
                  <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" type="number" id="price" placeholder="Enter price in ₹" /> 
                  </div>
              <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="category">Category</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" id="category">
                      <option value="1">Category 1</option>
                      <option value="2">Category 2</option>
                      <option value="3">Category 3</option>
                  </select>
                  </div>
                  <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="category">Image</label>
                      <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" type="file" id="image" />
                  </div>
              <button type="button" onClick={() => setShowAddProductForm(false)} className="bg-[#1E4A1E] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#2D6A2D] transition-colors">Add Product</button>
              <button type="button" onClick={() => setShowAddProductForm(false)} className="bg-[#1E4A1E] text-white font-bold py-2 px-4 ml-1 rounded-lg hover:bg-[#2D6A2D] transition-colors">Cancel</button> 
              </form>
          </div>)}
          <div className="ml-15 mt-10">
              <h2 className="text-3xl mt-10 mb-6 font-black text-[#2D6A2D]">Products</h2>
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

export default Admin
