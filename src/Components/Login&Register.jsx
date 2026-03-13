import { useState } from "react";

const LoginRegister = ({ authModal, setAuthModal }) => {

    const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });  

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-15 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" onClick={() => setAuthModal(null)}>
        <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-[slideUp_0.3s_ease-out]" onClick={e=>e.stopPropagation()}>
          <div className="bg-[#1E4A1E] p-7 text-center relative">
            <button onClick={() => setAuthModal(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/15 hover:bg-white/25 text-white rounded-full flex items-center justify-center text-lg font-bold transition-colors">×</button>
            <div className="w-16 h-16 bg-[#8DC21F] rounded-full flex items-center justify-center mx-auto mb-3 font-black text-white text-2xl shadow-lg">Y</div>
            <h2 className="font-black text-[#8DC21F] text-2xl">Yugan's Product</h2>
            <p className="text-[#6abf6a] text-xs italic mt-1">Meal time in a Minute</p>
          </div>
          <div className="flex border-b border-[#E8F2D0]">
            {["login","register"].map(t => (
              <button key={t} onClick={() => setAuthModal(t)} className={`flex-1 py-3.5 text-sm font-extrabold capitalize transition-all ${authModal===t?"text-[#2D6A2D] border-b-2 border-[#8DC21F] bg-[#F5F9E8]":"text-gray-400 hover:text-[#2D6A2D]"}`}>
                {t==="login"?"🔑 Login":"✨ Sign Up"}
              </button>
            ))}
          </div>
          <div className="p-6 space-y-4">
            
            <div>
              <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">Email Address</label>
              <input value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})} placeholder="your@email.com" type="email"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E8F2D0] bg-[#F5F9E8] text-sm focus:outline-none focus:border-[#8DC21F] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-[#2D6A2D] mb-1.5">Password</label>
              <input value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})} placeholder="••••••••" type="password"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E8F2D0] bg-[#F5F9E8] text-sm focus:outline-none focus:border-[#8DC21F] transition-colors" />
            </div>
            <button 
              className="w-full bg-gradient-to-r from-[#8DC21F] to-[#7AB01A] text-white font-black py-4 rounded-2xl text-sm hover:from-[#A8D832] hover:to-[#8DC21F] transition-all shadow-xl hover:shadow-[#8DC21F]/40 hover:-translate-y-0.5">
              {authModal==="login"?"🌿 Login to Account":"✨ Create Account"}
            </button>
            <p className="text-center text-xs text-gray-400">
              {authModal==="login"?"Don't have an account? ":"Already have an account? "}
              <button  className="text-[#2D6A2D] font-extrabold hover:text-[#8DC21F] transition-colors">
                {authModal==="login"?"Sign Up":"Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginRegister
