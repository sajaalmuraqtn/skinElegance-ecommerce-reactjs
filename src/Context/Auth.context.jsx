import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
   
  async function getProfile() {
    const token = localStorage.getItem("userToken");
  try{
    const { data } = await axios.get(`/user/profile`, { headers: { authorization: `Saja__${token}` } });
    setUser(data.user);
  } catch (error) {
  }
  }

    return (
        <AuthContext.Provider value={{ user,setUser, getProfile }}>
            {children}
        </AuthContext.Provider>
    );
}
