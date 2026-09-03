import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext(null);

export const DEMO_ACCOUNTS = {
  admin: { email: "admin@drivewise.com", password: "123456", role: "admin", name: "Alexander Morgan" },
  user: { email: "student@drivewise.com", password: "123456", role: "user", name: "Olivia Bennett" },
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("drivewise_token"));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("drivewise_user") || "null"); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    token ? localStorage.setItem("drivewise_token", token) : localStorage.removeItem("drivewise_token");
  }, [token]);

  useEffect(() => {
    user ? localStorage.setItem("drivewise_user", JSON.stringify(user)) : localStorage.removeItem("drivewise_user");
  }, [user]);

  const login = async ({ email, password }) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const normalized = email.trim().toLowerCase();
    const matched = Object.values(DEMO_ACCOUNTS).find(a => a.email === normalized && a.password === password);

    if (!matched) {
      setLoading(false);
      throw new Error("Invalid email or password. Use one of the demo accounts shown below.");
    }

    const demoUser = {
      id: matched.role === "admin" ? 1 : 101,
      name: matched.name,
      email: matched.email,
      role: matched.role,
      avatar: matched.role === "admin"
        ? "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
        : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    };
    setToken(`drivewise-demo-${matched.role}-token`);
    setUser(demoUser);
    setLoading(false);
    return { success: true, user: demoUser };
  };

  const register = async ({ name, email, password }) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const newUser = {
      id: Date.now(),
      name,
      email: email.trim().toLowerCase(),
      role: "user",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    };
    setToken(`drivewise-registration-${Date.now()}`);
    setUser(newUser);
    setLoading(false);
    return { success: true, user: newUser };
  };

  const logout = () => { setToken(null); setUser(null); };

  const updateUser = (updates) => {
    setUser((current) => ({ ...(current || {}), ...updates }));
  };

  const value = useMemo(() => ({
    token, user, loading, isAuthenticated: Boolean(token), login, register, logout, axios: axiosInstance
  }), [token, user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
