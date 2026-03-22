import { Link } from "react-router";
import instance from "../protectedInstances/axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";


const LoggedCart = () => {

  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState({});

  const [cartItems, setCartItems] = useState(
  JSON.parse(localStorage.getItem("cart")) || []
);


    const hanldecheckout = async () => { 
        const res = await instance.post("/api/payment/create-order", {
    amount: 500,
  });

const order = res.data; 

  openRazorpay(order);
    }

    const openRazorpay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
    amount: order.amount,
    currency: "INR",
    name: "Your Store",
    description: "Order Payment",
    order_id: order.id,

    handler: function (response) {
      console.log(response);
      verifyPayment(response);
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
    };
    

    const verifyPayment = async (response) => {
  const res = await instance.post("/api/payment/verify-payment", response);

  const data = await res.data;

  if (data.success) {
    alert("Payment Success 🎉");
  } else {
    alert("Payment Failed ❌");
  }
  };
  
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

  const fillerProducts = products.filter(p => cartItems.includes(p._id));

  const handleincrease = (id) => {
  const currentQty = quantity[id] || 1;

  setQuantity(prev => ({
    ...prev,
    [id]: currentQty + 1
  }));
};

 const handledecrease = (id) => {
  const currentQty = quantity[id] || 1;

  if (currentQty <= 1) {
    const updatedCart = cartItems.filter(item => item !== id);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);

    setQuantity(prev => {
      const newQty = { ...prev };
      delete newQty[id]; 
      return newQty;
    });

    toast.error("Removed from Cart ❌");
    return;
  }

  setQuantity(prev => ({
    ...prev,
    [id]: currentQty - 1
  }));
};

  const total = fillerProducts.reduce((sum, p) => sum + p.price * (quantity[p._id] || 1), 0);
    
  return (
    <>
      {cartItems.length === 0 ? (<div className="flex justify-center text-center h-80 items-center">
        <h1 className="text-4xl font-bold text-[#1E4A1E]">Your cart is Empty!!</h1>
        </div>) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-[#1E4A1E] mb-6">Your Cart</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1E4A1E] mb-6 border-b-gray-300 border-b pb-2">Delivery Address</h2>
                <div className="flex gap-1 flex-wrap justify-center">
                <div className="mx-4">
                  <label className="block text-sm text-gray-700 mb-1 font-bold">Name</label>
                  <input type="text" placeholder="Enter your Name" className="w-50 border border-gray-300 rounded-md p-2 mb-4" />
                </div>
                <div className="mx-4">
                  <label className="block text-sm text-gray-700 mb-1 font-bold">Door Number</label>
                  <input type="text" placeholder="Enter your Door Number" className="w-50 border border-gray-300 rounded-md p-2 mb-4" />
                  </div>
                  <div className="mx-4">
                  <label className="block text-sm text-gray-700 mb-1 font-bold">Street 1</label>
                  <input type="text" placeholder="Enter your street" className="w-50 border border-gray-300 rounded-md p-2 mb-4" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1 font-bold">Street 2</label>
                  <input type="text" placeholder="Enter your street" className="w-50 border border-gray-300 rounded-md p-2 mb-4" />
                  </div>
                  <div className="mx-4">
                  <label className="block text-sm text-gray-700 mb-1 font-bold">City</label>
                  <input type="text" placeholder="Enter your city" className="w-50 border border-gray-300 rounded-md p-2 mb-4" />
                  </div>
                  <div className="mx-4">
                  <label className="block text-sm text-gray-700 mb-1 font-bold">District</label>
                  <input type="text" placeholder="Enter your district" className="w-50 border border-gray-300 rounded-md p-2 mb-4" />
                  </div>
                   <div className="mx-4">
                  <label className="block text-sm text-gray-700 mb-1 font-bold">State</label>
                  <input type="text" placeholder="Enter your state" className="w-50 border border-gray-300 rounded-md p-2 mb-4" />
                  </div>
                  <div className="mx-4">
                  <label className="block text-sm text-gray-700 mb-1 font-bold">Phone Number</label>
                  <input type="text" placeholder="Enter your phone number" className="w-50 border border-gray-300 rounded-md p-2 mb-4" />
                  </div>
                  
</div>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 mt-10">
              <div>
                <h2 className="text-2xl font-bold text-[#1E4A1E] mb-6 border-b-gray-300 border-b pb-2">Your Cart</h2>
              </div>
                {fillerProducts.map((f) => (
                  <div key={f._id} className="flex items-center justify-between mb-4 border border-gray-300 p-2 rounded-lg">
                    <div className="flex items-center gap-4">
                      <img src={f.image} alt={f.name} className="w-16 h-16 object-cover" />
                      <div>
                        <h2 className="text-lg font-semibold text-[#2D6A2D]">{f.productName}</h2>
                        <p className="text-gray-500 text-sm">Quantity: {quantity[f._id] || 1}</p>
                        <p className="text-gray-500 text-sm font-bold">Weight: { f.grams} Grams </p>
                      </div>
                    </div>
                    <div className="flex gap-15  items-center">
                      <div className="flex items-center gap-4">
                        <button onClick={() => handledecrease(f._id)} className="border border-gray-300 px-2 rounded-sm text-[20px] bg-[#d09f3c] text-white">-</button>
                        <span className="mx-2 font-extrabold text-[18px]">{quantity[f._id] || 1}</span>
                        <button onClick={() => handleincrease(f._id)} className="border border-gray-300 px-2 rounded-sm text-[20px] bg-[#d09f3c] text-white">+</button>
                      </div>
                      
                      <span className="text-xl font-bold text-[#2D6A2D] mr-2">₹{f.price * (quantity[f._id] || 1)}</span>
                    </div>
                  </div>
                ))}
              <div className="flex justify-evenly mr-2 mt-10">
                <div className="flex justify-center items-center gap-2">
                  <label className="block text-[15px] text-gray-700 mb-1 font-bold">Coupon:</label>
                <input type="text" placeholder="Enter coupon code" className="w-50 border border-gray-300 rounded-md px-2 py-1" />
                </div>
                <h2 className="text-xl font-bold text-black">Total Amount: <span className="text-[29px] ml-3 text-[#2D6A2D] font-extrabold">₹{total}</span></h2>
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={hanldecheckout} className="border-gray-200 border rounded-lg font-bold bg-[#8DC21F] text-white py-1 px-1.5 ml-15">Checkout</button>
              </div>
            </div>
            </div>
      )}    
              
               
      
      


      



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

export default LoggedCart
