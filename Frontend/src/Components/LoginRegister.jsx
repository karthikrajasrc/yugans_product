import { useState } from "react";
import { googleLogin } from "../Auth/googleAuth";
import instance from "../protectedInstances/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Authprovider.jsx";

const LoginRegister = ({ authModal, setAuthModal }) => {
  const navigate = useNavigate();
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" }); 
  

  const { setUser } = useContext(AuthContext);

  const handleRegister = async () => {
  try {
    const res = await instance.post("/auth/register", {
      Name: authForm.name,
      Email: authForm.email,
      Password: authForm.password
    });

    toast.success(res.data.Message);

    console.log(res.data.Message);

    setAuthForm({ name: "", email: "", password: "" }); 
    setAuthModal("login");

  } catch (err) {
    const msg = err.response?.data?.Message || "Something went wrong";
    toast.error(msg);
  }
};


  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();

      const user = res.user;
  
    
    const response = await instance.post("/auth/googlelogin", {
      Name: user.displayName,
      Email:  user.email,
    });
      
   window.gtag("event", "login", {
  method: "google", 
  page: window.location.pathname
});

         setUser(response.data.user);
      
      toast.success("Login Successful ✅");

      setAuthModal(null);

        navigate("/home");

      console.log(response.data);
      

    } catch (err) {
    const msg = err.response?.data?.Message || "Login Failed";
    toast.error(msg);
  }
  }

  const handleLogin = async () => {
  try {
    const res = await instance.post("/auth/login", {
      Email: authForm.email,
      Password: authForm.password
    });

    window.gtag("event", "login", {
    method: "email",
  });

    setUser(res.data.user);
    console.log(res.data.user);

    toast.success("Login Successful ✅");

    navigate("/home");

    setAuthModal(null)

  } catch (err) {
    const msg = err.response?.data?.Message || "Login Failed";
    toast.error(msg);
  }
};

     

  return (
    <div>

      {authModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:mt-15 md:pt-9 mt-15 pt-5 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" onClick={() => setAuthModal(null)}>
        <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-[slideUp_0.3s_ease-out]" onClick={e=>e.stopPropagation()}>
          <div className="bg-[#1E4A1E] p-5 text-center relative">
            <button onClick={() => setAuthModal(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/15 hover:bg-white/25 text-white rounded-full flex items-center justify-center text-lg font-bold transition-colors">×</button>
            <div className="md:w-14 md:h-14 w-8 h-8 bg-[#8DC21F] rounded-full flex items-center justify-center mx-auto mb-3 font-black text-white text-2xl shadow-lg">Y</div>
            <h2 className="font-black text-[#8DC21F] md:text-xl text-[15px]">Yugan's Product</h2>
            <p className="text-[#6abf6a] md:text-xs text-[12px] italic mt-1">Meal time in a Minute</p>
          </div>
          <div className="flex border-b border-[#E8F2D0]">
            {["login","register"].map(t => (
              <button key={t} onClick={() => setAuthModal(t)} className={`flex-1 md:py-3.5 py-2 md:text-sm text-[15px] font-extrabold capitalize transition-all ${authModal===t?"text-[#2D6A2D] border-b-2 border-[#8DC21F] bg-[#F5F9E8]":"text-gray-400 hover:text-[#2D6A2D]"}`}>
                {t==="login"?"🔑 Login":"✨ Sign Up"}
              </button>
            ))}
          </div>
          <div className="md:p-6 p-4 space-y-4">
              { authModal === "login" && (<div>
              
              <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-xl md:py-2.5 py-1.5 hover:bg-gray-50 transition font-semibold"> <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.22 9.24 3.6l6.9-6.9C35.8 2.4 30.3 0 24 0 14.6 0 6.4 5.4 2.4 13.2l8.1 6.3C12.6 13 17.8 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.8-.4-4H24v7.6h12.5c-.3 2-1.5 5-4.1 7l6.4 5c3.7-3.4 7.3-8.5 7.3-15.6z"/>
            <path fill="#FBBC05" d="M10.5 28.7c-1-2.9-1-6 0-8.9l-8.1-6.3C.8 17.3 0 20.5 0 24s.8 6.7 2.4 9.5l8.1-4.8z"/>
            <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-6.4-5c-2 1.4-4.6 2.4-9.6 2.4-6.2 0-11.4-3.5-13.3-8.5l-8.1 6.3C6.4 42.6 14.6 48 24 48z"/>
          </svg>
                Sign in with Google
              </button>
              
                <p className="text-center mt-1">OR</p>
              </div>)}
              {authModal === "register" && (
  <div>
    <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">
      Name
    </label>
    <input
      value={authForm.name}
      onChange={e => setAuthForm({ ...authForm, name: e.target.value })}
      placeholder="Enter your name"
      type="text"
      className="w-full px-4 md:py-2 py-1.5 rounded-xl border-2 border-[#E8F2D0] bg-[#F5F9E8] text-sm focus:outline-none focus:border-[#8DC21F] transition-colors" 
    />
  </div>
)}
            
            <div>
              <label className="block text-xs font-extrabold text-[#2D6A2D] md:mb-1.5 mb-0.5">Email Address</label>
              <input value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} placeholder="your@email.com" type="email"
                className="w-full px-4 md:py-2 py-1.5 rounded-xl border-2 border-[#E8F2D0] bg-[#F5F9E8] text-sm focus:outline-none focus:border-[#8DC21F] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">Password</label>
              <input value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} placeholder="••••••••" type="password"
                className="w-full px-4 md:py-2 py-1.5 rounded-xl border-2 border-[#E8F2D0] bg-[#F5F9E8] text-sm focus:outline-none focus:border-[#8DC21F] transition-colors" />
            </div>
            <button 
              className="w-full bg-linear-to-r from-[#8DC21F] to-[#7AB01A] text-white font-black md:py-4 py-2 rounded-2xl text-sm hover:from-[#A8D832] hover:to-[#8DC21F] transition-all shadow-xl hover:shadow-[#8DC21F]/40 hover:-translate-y-0.5" onClick={authModal === "login" ? handleLogin : handleRegister}>
              {authModal==="login"?"🌿 Login to Account":"✨ Create Account"}
            </button>
            <p className="text-center text-xs text-gray-400">
              {authModal==="login"?"Don't have an account? ":"Already have an account? "}
              <button  className="text-[#2D6A2D] font-extrabold hover:text-[#8DC21F] transition-colors" onClick={() => setAuthModal(authModal==="login"?"register":"login")}>
                {authModal==="login"?"Sign Up":"Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
        )}
    </div>
  )
}

export default LoginRegister
