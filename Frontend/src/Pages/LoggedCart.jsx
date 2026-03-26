import { Link, Navigate } from "react-router";
import instance from "../protectedInstances/axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import ScrollReveal from "../Components/Scroll";
import { useContext } from "react";
import { AuthContext } from "../../Authprovider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";



const LoggedCart = () => {

  const [products, setProducts] = useState([]);
 const [quantity, setQuantity] = useState(
  JSON.parse(localStorage.getItem("quantity")) || {}
);
  const { user } = useContext(AuthContext);
 
  useEffect(() => {
  localStorage.setItem("quantity", JSON.stringify(quantity));
}, [quantity]);
  

  const [cartItems, setCartItems] = useState(
  JSON.parse(localStorage.getItem("cart")) || []
  );
  
  const [address, setAddress] = useState({
  firstName: "",
  lastName: "",
  fullAddress: "",
  pincode: "",
  phone: "",
  altPhone: ""
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
      localStorage.setItem("quantity", JSON.stringify(newQty));
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


  const handleChange = (e) => {
  setAddress({
    ...address,
    [e.target.name]: e.target.value
  });
};
const isFormValid = () => {
  return (
    address.firstName &&
    address.lastName &&
    address.fullAddress &&
    address.pincode &&
    address.phone &&
    address.altPhone
  );
};

  const hanldecheckout = async () => {

  if (!isFormValid()) {
    console.log("Form not filled ❌");
    toast.error("Fill all address fields ❌");
    return;
    }
    
       const amount = fillerProducts.reduce(
  (total, p) => total + p.price * (quantity[p._id] || 1),
  0
) + 70;
        const res = await instance.post("/api/payment/create-order", {amount});

const order = res.data; 

  openRazorpay(order);
    }

    const openRazorpay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
    amount: order.amount,
    currency: "INR",
    name: "Yugans Product",
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
      const res = await instance.post("/api/payment/verify-payment", {
        ...response, cartItems: fillerProducts.map(p => ({
  productId: p._id,
  name: p.productName,
  price: p.price,
  quantity: quantity[p._id] || 1,
  weight: p.grams
})),
        amount: total,
        userId: user._id,
        address: {
          ...address
        }
      });

      const data = res.data;
      
      localStorage.removeItem("cart");
      localStorage.removeItem("quantity");
      setCartItems([]);
      setQuantity({});

      Navigate("/orders");

  if (data.success) {
    alert("Payment Success 🎉");
  } else {
    alert("Payment Failed ❌");
  }
  };
    
  return (
    <>
      {cartItems.length === 0 ? (<div className="flex justify-center text-center h-80 items-center">
        <ScrollReveal>
          <h1 className="md:text-4xl text-xl font-bold text-[#1E4A1E]">Your cart is Empty!!</h1>
          </ScrollReveal>
      </div>) : (
          <ScrollReveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <h1 className="md:text-3xl text-2xl font-bold text-[#1E4A1E] mb-6">Your Cart</h1>
              <form>
            <div className="bg-white shadow-md rounded-lg md:p-6 p-2">
              <div>
                <h2 className="md:text-2xl text-xl font-bold text-[#1E4A1E] mb-6 border-b-gray-300 border-b pb-2">Delivery Address</h2>
                <div className="flex gap-1 flex-wrap justify-center">
                <div className="md:mx-4">
                  <label className="block text-sm text-gray-700 mb-1 font-bold">First Name</label>
                  <input type="text" className="md:w-50 w-25 border text-[12px] md:text-sm border-gray-300 rounded-md md:p-2 p-1 md:mb-4 mb-1" name="firstName" onChange={handleChange} required/>
                    </div>
                    <div className="md:mx-4">
                  <label className="block text-sm text-gray-700 mb-1 font-bold">Last Name</label>
                  <input type="text" className="md:w-50 w-25 border text-[12px] md:text-sm border-gray-300 rounded-md md:p-2 p-1 md:mb-4 mb-1" name="lastName" onChange={handleChange} required/>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1 font-bold">Full Address</label>
                      <textarea type="text" className="md:w-120 h-20 w-70 border text-[12px] md:text-sm border-gray-300 rounded-md md:p-2 p-1 md:mb-4 mb-1" name="fullAddress" onChange={handleChange} required/>
                      </div>
                      <div className="flex flex-row flex-wrap justify-center text-center gap-2">
                     <div className="md:mx-4">
                  <label className="block text-sm text-gray-700 mb-1 font-bold">Pincode</label>
                  <input type="text" className="md:w-50 w-20 border text-[12px] md:text-sm border-gray-300 rounded-md md:p-2 p-1 md:mb-4 mb-1" name="pincode" onChange={handleChange} required/>
                  </div>
                  <div className="md:mx-4">
                  <label className="block text-sm text-gray-700 mb-1 font-bold">Phone Number</label>
                  <input type="number" className="md:w-50 w-30 border text-[12px] md:text-sm border-gray-300 rounded-md md:p-2 p-1 md:mb-4 mb-1" name="phone" onChange={handleChange} required/>
                      </div>
                  <div className="md:mx-4">
                  <label className="block text-sm text-gray-700 mb-1 font-bold">Alternate Phone Number</label>
                  <input type="number" className="md:w-50 w-30 border text-[12px] md:text-sm border-gray-300 rounded-md md:p-2 p-1 md:mb-4 mb-1" name="altPhone" onChange={handleChange} required/>
                        </div>
                      </div>
</div>
              </div>
                </div>
                </form>
            <div className="bg-white shadow-md rounded-lg md:p-6 p-2 mt-10">
              <div>
                <h2 className="md:text-2xl text-xl font-bold text-[#1E4A1E] mb-6 border-b-gray-300 border-b pb-2">Cart</h2>
              </div>
                {fillerProducts.map((f) => (
                  <div key={f._id} className="flex items-center justify-between mb-4 border border-gray-300 p-2 rounded-lg">
                    <div className="flex items-center gap-4">
                      <img src={f.image} alt={f.name} className="w-16 h-16 object-cover" />
                      <div>
                        <h2 className="md:text-lg text-md font-semibold text-[#2D6A2D]">{f.productName}</h2>
                        <p className="text-gray-500 md:text-sm text-[12px]">Quantity: {quantity[f._id] || 1}</p>
                        <p className="text-gray-500 md:text-sm text-[13px] font-bold">Weight: { f.grams} Grams </p>
                      </div>
                    </div>
                    <div className="flex md:gap-15 md:flex-row flex-col-reverse gap-1 items-center">
                      <div className="flex items-center md:gap-4 gap-1">
                        <button onClick={() => handledecrease(f._id)} className="border border-gray-300 md:px-2 px-1 rounded-sm md:text-[20px] text-[17px] bg-[#d09f3c] text-white">-</button>
                        <span className="mx-2 font-extrabold md:text-[18px] text-[16px]">{quantity[f._id] || 1}</span>
                        <button onClick={() => handleincrease(f._id)} className="border border-gray-300 md:px-2 px-1 rounded-sm md:text-[20px] text-[17px] bg-[#d09f3c] text-white">+</button>
                      </div>
                      
                      <div>
                        <span className="md:text-xl text-md font-bold text-[#2D6A2D] mr-2">₹{f.price * (quantity[f._id] || 1)}</span>
                        <span className="md:text-[12px] md:text-md text-[12px] font-bold text-red-400 mr-2 line-through">₹{(f.price * (25 / 100)) * (quantity[f._id] || 1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="flex justify-center md:justify-evenly items-center flex-col mr-2 gap-4 md:mt-10">
                <div className="flex justify-center flex-row items-center gap-2">
                  <label className="block text-[15px] text-gray-700 mb-1 font-bold">Coupon:</label>
                  <input type="text" placeholder="Enter coupon code" className="md:w-50 md:text-[14px] w-35 border border-gray-300 text-[12px] rounded-md px-2 py-1" />
                  <button className="border-gray-200 border rounded-lg font-bold bg-[#8DC21F] text-white md:py-1 py-0.5 px-1.5">Apply</button>
                </div>
                <div className="flex flex-col border border-gray-300 md:px-10 px-10 rounded-2xl">
                  <div className="flex justify-between gap-2 mt-2">
                  <h2 className="md:text-[18px] text-md font-bold text-black">Actual Price: </h2> <h2 className="md:text-[20px] text-[20px] text-[#2D6A2D] font-semibold">₹ {total + (total * 25 / 100)}</h2>
                    </div>
                    <div className="flex justify-between items-center gap-2 border-b border-b-gray-400 md:pb-2 pb-1">
                  <h2 className="md:text-[18px] text-md font-bold text-black">Discount:</h2> <h2 className="md:text-[20px] text-[20px] md:ml-83 ml-27 text-[#2D6A2D] font-bold">- ₹ {total * 25 / 100}</h2>
                    </div>
                    <div className="flex justify-between gap-2 md:mt-2 mt-1">
                  <h2 className="md:text-[18px] text-md font-bold text-black">Total Price:</h2> <h2 className="md:text-[20px] text-[20px] md:ml-66 ml-12 text-[#2D6A2D] font-semibold">₹ {total}</h2>
                </div> 
                <div className="flex justify-between gap-2 md:mt-2 mt-1 border-b border-b-gray-400 md:pb-2 pb-1">
                  <h2 className="md:text-[18px] text-md font-bold text-black">Delivery Charges:</h2> <h2 className="md:text-[20px] text-[20px] md:ml-66 ml-12 text-[#2D6A2D] font-semibold">₹ 70</h2>
                </div> 
                <div className="flex justify-between items-center gap-2 mt-2 md:mt-0 pb-4">
                  <h2 className="md:text-xl text-md font-bold text-black">Total Amount:</h2> <h2 className="md:text-[29px] text-[22px] md:ml-65 ml-15 text-[#2D6A2D] font-extrabold">₹ {total + 70}</h2>
                </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={hanldecheckout} className="border-gray-200 border rounded-lg font-bold bg-[#8DC21F] text-white py-1 px-1.5">Checkout</button>
              </div>
            </div>
            </div>
            </ScrollReveal>
      )}    
              
               
      
      


      



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
      </>
  )
}

export default LoggedCart
