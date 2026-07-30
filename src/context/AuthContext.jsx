import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // Restore user session
  useEffect(() => {

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (token) {
      setUser({
        token,
        email,
        role,
      });
    }

    setLoading(false);

  }, []);


  const login = (token, email, role) => {

    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);

    setUser({
      token,
      email,
      role,
    });

  };


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    setUser(null);

  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}


export function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;

}