import { useContext } from "react";
import { Link } from "react-router"
import { AuthContext } from "../../Authprovider";
import { useState } from "react";
import { useEffect } from "react";
import instance from "../protectedInstances/axios";
import Spinner from "../Components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesPacking, faBoxOpen, faCircleCheck, faHandHolding, faInbox, faReorder, faTicket, faTruck } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";


const LoggedOrders = () => {

  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminOrders, setAdminOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allAdminOrders, setAllAdminOrders] = useState([]);
  const [filter, setFilter] = useState("all");

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await instance.get(`/api/payment/my-orders/${user._id}`);
      console.log(res.data);
      setOrders(res.data);
      setAllOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (user?._id) {
    fetchOrders();
  }
}, [user]);
  
  
useEffect(() => {
  const fetchAdminOrders  = async () => {
    try {
      const res = await instance.get("/api/payment/my-orders");
      console.log(res.data);
      setAdminOrders(res.data);
      setAllAdminOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (user?._id) {
    fetchAdminOrders();
  }
}, [user]);
  
  const handleOptionChange = (value) => {
   setFilter(value);
  }

  useEffect(() => {
  if (filter === "all") {
    setOrders(allOrders);
    setAdminOrders(allAdminOrders);
  } else {
    setOrders(allOrders.filter((order) => order.status === filter));
    setAdminOrders(allAdminOrders.filter((order) => order.status === filter));
  }
}, [allOrders, allAdminOrders, filter]);

  if (loading) return <Spinner />

  const displayOrders = user?.Role === "Admin" ? adminOrders : orders;

  

  const getStep = (status) => {
  if (status === "Placed") return 1;
  if (status === "Shipped") return 2;
    if (status === "Delivered") return 3;
    return 1;
  };
  
  const hanldePacking = async (id) => {
    await instance.put("/api/payment/update-order/" + id, { status: "Placed" });

  setAdminOrders((prev) =>
    prev.map((order) =>
      order._id === id ? { ...order, status: "Placed" } : order
    )
    );
    setAllAdminOrders((prev) =>
  prev.map((order) =>
    order._id === id ? { ...order, status: "Placed" } : order
  )
);
  }

const hanldeDispatch = async (id) => {
  await instance.put("/api/payment/update-order/" + id, { status: "Shipped" });

  setAdminOrders((prev) =>
    prev.map((order) =>
      order._id === id ? { ...order, status: "Shipped" } : order
    )
  );
  
setAllAdminOrders((prev) =>
  prev.map((order) =>
    order._id === id ? { ...order, status: "Shipped" } : order
  )
);
};
  
const hanldeDelivery = async (id) => {
  await instance.put("/api/payment/update-order/" + id, { status: "Delivered" });

  setAdminOrders((prev) =>
    prev.map((order) =>
      order._id === id ? { ...order, status: "Delivered" } : order
    )
  );
setAllAdminOrders((prev) =>
  prev.map((order) =>
    order._id === id ? { ...order, status: "Delivered" } : order
  )
);
  };
  
   const formatDate = (date) => {
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

  return (
    <>
       <div className="flex justify-between items-center max-w-5xl mx-auto px-4">
              <div><h1 className="md:text-3xl text-2xl font-bold text-center my-6">Your Orders</h1></div>
              <div>
                <select onChange={(e) => handleOptionChange(e.target.value)} className="border bg-white border-gray-300 rounded-md md:px-4 md:py-2 ">
                <option value="all">All</option>
                <option value="Placed">Placed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              </div>
  </div>
       {displayOrders.length === 0 ? (
      <div className="flex justify-center text-center h-80 items-center">
        <h1 className="md:text-4xl text-xl font-bold text-[#1E4A1E]">
          No Order found!
        </h1>
      </div>
    ) : (
      <div className="max-w-5xl mx-auto px-4">
           

            {displayOrders.map((order) => {
              const step = getStep(order.status);
              return (
              <div
                key={order._id}
                className="bg-white shadow-xl rounded-xl p-5 mb-6 border border-gray-200"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-b-gray-300 pb-3 mb-3">
                  <div>
                    <p className="text-sm text-gray-700 font-medium">
                      Order ID: <span className="font-bold">{order.orderId}</span>
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Order Placed Date: {formatDate(order.createdAt)}
                    </p>
                  </div>
                  {user?.Role === "Admin" && (
                      <div className="mt-2 md:mt-0">
                        <button onClick={() => hanldePacking(order._id)} className="border border-gray-300 mr-3 px-1 py-1 rounded-lg font-semibold bg-red-300 cursor-pointer">Packing</button>
                        <button onClick={() => hanldeDispatch(order._id)} className="border border-gray-300 mr-3 px-1 py-1 rounded-lg font-semibold bg-amber-300 cursor-pointer">Dispatch</button>
                        <button onClick={() => hanldeDelivery(order._id)} className="border border-gray-300 mr-1 px-1 py-1 rounded-lg font-semibold bg-green-300 cursor-pointer">Delivered</button>
                    </div>
                  )}
                  <div key={order._id} className="flex items-center w-full max-w-50 mt-3">

                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white 
      ${step >= 1 ? "bg-green-500" : "bg-gray-300"}`}>
                        <FontAwesomeIcon icon={faBoxOpen} />
                      </div>
                      <p className="text-[10px] mt-1">Placed</p>
                    </div>

                    <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-green-500" : "bg-gray-300"}`}></div>

                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white 
      ${step >= 2 ? "bg-green-500" : "bg-gray-300"}`}>
                        <FontAwesomeIcon icon={faTruck} />
                      </div>
                      <p className="text-[10px] mt-1">Shipped</p>
                    </div>

                    <div className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-green-500" : "bg-gray-300"}`}></div>

                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white 
      ${step >= 3 ? "bg-green-500" : "bg-gray-300"}`}>
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </div>
                      <p className="text-[10px] mt-1">Delivered</p>
                    </div>

                  </div>
                </div>
                <div className="flex justify-center flex-col md:flex-row gap-6">
                  <div className="border border-gray-300 px-5 py-3 rounded-xl flex-1 bg-[#F5F9E8]">
                    <h2 className="md:text-xl text-[18px] font-semibold">Delivery Address</h2>
                    <h2 className="font-semibold mt-3 text-[15px] md:text-[17px]">Name: <span className="font-normal">{order.address.firstName + " " + order.address.lastName}</span></h2>
                    <p className="font-semibold mt-2 text-[15px] md:text-[17px]">Address: <span className="font-normal">{order.address.fullAddress + ", " + order.address.pincode}</span></p>
                    <p className="font-semibold mt-2 text-[15px] md:text-[17px]">Phone: <span className="font-normal">{order.address.phone}</span></p>
                    {user.Role === "Admin" && (<p className="font-semibold mt-2">Alternate Number: <span className="font-normal">{order.address.altPhone}</span></p>)}
                  </div>
                  <div className="border border-gray-300 px-5 py-3 rounded-xl space-y-2 flex-1 bg-[#F5F9E8]">
        
                    {order.products.map((item) => (

          
                      <div
                        key={item._id}
                        className="flex justify-between items-center border border-gray-300 pb-2 rounded-xl px-5 bg-white"
                      >
            
                        <div>
                          <h2 className="font-semibold text-gray-800">
                            {item.name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            Quantity: <span className="font-bold">{item.quantity}</span>
                          </p>
                        </div>

                        <p>Weight: {item.weight} Grms</p>

                        <p className="font-medium text-gray-700">
                          <span className="font-bold text-[18px]">₹{item.price * item.quantity}</span>
                        </p>
                      </div>
          
                    ))}
                    <div className="flex justify-center items-center mt-4">
                      <p className="text-lg font-semibold">Total Amount: </p>
                      <p className="text-lg font-bold text-[#1E4A1E] ml-4">
                        ₹{order.amount}
                      </p>
                    </div>
                  </div>
        
                </div>
                </div>
              )
})}
</div>
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

export default LoggedOrders
