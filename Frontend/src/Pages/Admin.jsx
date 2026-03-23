import { useState } from "react";
import { Link } from "react-router";
import instance from "../protectedInstances/axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const Admin = () => {

    const [ordercount, setOrderCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(500);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
  
  const [productName, setProductName] = useState("");
const [price, setPrice] = useState("");
const [grams, setGrams] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [updatebtn, setUpdateBtn] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  

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

  const handleSubmit = async () => {
    try {
     setLoading(true);
    const formData = new FormData();

    formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
    formData.append("grams", grams);
    formData.append("image", imageFile);

   const res = await instance.post("/product/add", formData);
    const data = res.data;
      console.log(data);
      


    toast.success("Product added 🔥");

    setProductName("");
    setPrice("");
    setGrams("");
      setImageFile(null);
      setDescription("");
      
      setShowAddProductForm(false)
      setProducts([...products, data.newProduct]);
  } catch (err) {
    console.error(err);
    toast.error("Failed to add product 😓");
  } finally {
    setLoading(false); 
  }
  };
  

  
  
  const handleDeleteProduct = async (id) => {
    try {
      await instance.post(`/product/delete/${id}`);
      setProducts(products.filter(p => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product");
    }
  };

  const handlecancel = () => {
    setProductName("");
    setPrice("");
    setGrams("");
    setImageFile(null);
    setDescription("");
    setUpdateBtn(false);
  };


  const handleUpdateProduct = async (id) => {
   setUpdateBtn(true);
  setShowAddProductForm(true);
  setSelectedId(id);

  const updateProduct = products.find(f => f._id === id);

  setProductName(updateProduct.productName);
  setPrice(updateProduct.price);
  setGrams(updateProduct.grams);
  setDescription(updateProduct.description);

  setPreviewImage(updateProduct.image); 
  setImageFile(null);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("grams", grams);

 
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await instance.put(`/product/update/${selectedId}`, formData);

      toast.success("Product updated 🔥");

      handlecancel();
      setShowAddProductForm(false);
      setProducts(products.map(p => 
  p._id === selectedId ? res.data.updateProduct  : p
));
    }
    catch (err) {
      console.error("Error updating product:", err);
      toast.error("Failed to update product");
    }
    
   }


  return (
      <>
          <div className="bg-[#1E4A1E] py-12 sm:py-16 relative overflow-hidden flex justify-evenly">
                <div className="z-10">
                    <span className="text-[#8DC21F] font-extrabold text-xs uppercase tracking-widest">Welcome Back!</span>
                    <h1 className="font-black text-white md:text-4xl text-2xl sm:text-5xl mt-2">Hello <span className="text-[#8DC21F]">Admin</span></h1>
                    <p className="text-gray-300 text-sm mt-2 ">Mealtime in a Minute!</p>
              </div>
              <div>
                    <h2 className="font-black md:text-3xl text-md text-center mt-10 mb-6  text-white">Admin Dashboard</h2>
              </div>
          </div>
          <div>
              
              <div className="flex flex-wrap justify-center md:gap-6 gap-2 md:mt-10 mt-5">
                  <div>
                      <button onClick={() => setShowAddProductForm(true)} className="bg-[#ffffff] text-black md:px-10 md:py-15 px-6 py-8 rounded-lg shadow-md hover:bg-[#daf3af] transition-colors md:text-xl text-md font-bold">Add Product +</button>
                  </div>
                  <div>
                      <button className="bg-[#ffffff] text-black font-extrabold md:px-10 px-6 py-4 md:py-10 rounded-lg shadow-md hover:bg-[#daf3af] transition-colors">Total Orders <p className="font-black text-[#2D6A2D] pt-2 md:text-2xl text-md sm:text-3xl">{ ordercount}</p></button>
                  </div>
                  <div>
                      <button className="bg-[#ffffff] text-black font-extrabold md:px-10 px-6 py-4 md:py-10 rounded-lg shadow-md hover:bg-[#daf3af] transition-colors">Total Revenue <p className="font-black text-[#2D6A2D] pt-2 md:text-2xl text-md sm:text-3xl">₹ { totalRevenue}</p></button> 
                  </div>
                  <div>
            <button className="bg-[#ffffff] text-black font-extrabold md:px-10 px-6 py-4 md:py-10 rounded-lg shadow-md hover:bg-[#daf3af] transition-colors">Products<p className="font-black text-[#2D6A2D] pt-2 md:text-2xl text-md sm:text-3xl">{ products.length }</p></button>
                  </div>
                </div>
          </div>
          {showAddProductForm && (<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center">
              <form type="submit" className="md:w-2xl w-80 mx-auto mt-10 p-6 bg-white rounded-lg shadow-md z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-2xl">
              <h2 className="md:text-2xl text-xl font-bold md:mb-6 mb-2 text-[#1E4A1E]">Add New Product</h2>
              <div className="md:mb-4 mb-1">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="productName">Product Name</label>
                  <input
          type="text"
          value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full md:px-3 px-1 md:py-2 py-1 text-[14px] border rounded-lg"
          placeholder="Enter product name"
          />
              </div>
              <div className="md:mb-4 mb-1">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="price">Price</label>
                  <input
  type="number"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  className="w-full md:px-3 px-1 md:py-2 py-1 text-[14px] border rounded-lg"
/>
          </div>
          <div className="md:mb-4 mb-1">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="description">Description</label>
              <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full md:px-3 px-1 md:py-2 py-1 text-[14px] border rounded-lg" />
          </div>
          <div className="md:mb-4 mb-1">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="grams">Grams</label>
            <input type="number" value={grams} onChange={(e) => setGrams(e.target.value)} className="w-full md:px-3 px-1 md:py-2 py-1 text-[14px] border rounded-lg" />
                 </div>
                  <div className="md:mb-4 mb-1">
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="category">Image</label>
            <div className="flex flex-cols">
              <input
  type="file"
  onChange={(e) => {
    setImageFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }}
  className="w-50 md:px-3 px-1 text-[13px] md:py-2 py-1 border rounded-lg"
/>
            {previewImage && (
  <img
    src={previewImage}
    alt="preview"
    className="w-15 h-18 object-cover mb-2 rounded"
  />
)}
                      </div>
                  </div>
          {!updatebtn && (<button
  type="button"
  disabled={loading}
  onClick={handleSubmit}
  className="bg-[#1E4A1E] text-white md:px-4 md:py-2 mt-2 px-2 py-1 rounded-lg"
>
  {loading ? "Uploading..." : "Add Product"}
          </button>)}

          {
            updatebtn && (<button
  type="button"
              disabled={loading}
              onClick={handleUpdate}
  className="bg-[#1E4A1E] text-white md:px-4 md:py-2 px-2 py-1 rounded-lg"
>
  {loading ? "Updating..." : "Update Product"}
          </button>)
          }
          
          <button type="button" onClick={() => { setShowAddProductForm(false); handlecancel(); }} className="bg-[#1E4A1E] text-white font-bold md:px-4 md:py-2 px-2 py-1 ml-1 rounded-lg hover:bg-[#2D6A2D] transition-colors">Cancel</button> 
              </form>
          </div>)}
          <div className="md:ml-15 ml-8 md:mt-10 mt-6">
              <h2 className="md:text-3xl text-2xl mt-10 mb-6 font-black text-[#2D6A2D]">Products</h2>
      </div>
      
      <div className="md:max-w-7xl mx-auto md:px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <table className="bg-white md:w-300 text-center w-full rounded-3xl">
          <thead className="bg-[#1E4A1E] text-white text-[12px] md:text-xl rounded-3xl">
            <tr>
              <th className="w-10 h-10 py-2 px-2">Product</th>
              <th className="py-2 px-2">Product Name</th>
              <th className="py-2 px-2">Price</th>
              <th className="py-2 px-2">Grams</th>
              <th className="py-2 px-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-t border-gray-300 text-[14px] md:text-[18px]">
                <td className="py-2 md:px-2"><img src={p.image} alt={p.productName} className="w-full h-full" /></td>
                <td className="py-2 md:px-2 md:text-[18px] font-bold">{p.productName}</td>
                <td className="py-2 md:px-2 md:text-[18px] font-bold">₹{p.price}</td>
                <td className="py-2 md:px-2 md:text-[18px] font-bold">{p.grams}g</td>
                  <td className="py-2 px-1 text-center"><button onClick={() => handleUpdateProduct(p._id)} className="md:text-[24px] text-[18px] md:mr-3 mr-2"><FontAwesomeIcon icon={faEdit} /></button><button onClick={() => handleDeleteProduct(p._id)} className="bg-red-500 text-white md:text-[18px] text-[11px] px-2 py-1 rounded-lg md:ml-2 hover:bg-red-600 transition-colors"><FontAwesomeIcon icon={faTrash} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
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
