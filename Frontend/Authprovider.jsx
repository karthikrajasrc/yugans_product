import { createContext, useState, useEffect } from "react";
import instance from "../Frontend/src/protectedInstances/axios"; 

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await instance.post("/auth/me");
        setUser(res.data.user || res.data);
      } catch (err) {
        setUser(null);
      }
      finally {
      setLoading(false); 
    }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, authModal,
  setAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;