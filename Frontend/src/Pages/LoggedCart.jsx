import { Link } from "react-router";
import instance from "../protectedInstances/axios";


const LoggedCart = () => {


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
    
  return (
    <>
      <div className="flex justify-center text-center h-80 items-center">
        <h1>Your cart is empty!!</h1>
        <button onClick={hanldecheckout} className="border py-1 px-1.5 ml-15">Checkout</button>
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

export default LoggedCart
