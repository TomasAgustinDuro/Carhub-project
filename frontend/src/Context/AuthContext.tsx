import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isOnline: false,
  login: () => {},
  logout: () => {},
});

interface AuthContextProps {
  children: React.ReactNode; // o el tipo que necesites
}

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(() => {
    const storedIsOnline = sessionStorage.getItem("isOnline");
    return storedIsOnline === "true"; 
  });

  const login = () => {
    setIsOnline(true);
    sessionStorage.setItem("isOnline", "true");
  };

  const logout = () => {
    setIsOnline(false);
    sessionStorage.setItem("isOnline", "false");
  };

  useEffect(() => {
    const storedIsOnline = sessionStorage.getItem("isOnline");
    if (storedIsOnline === "true") {
      setIsOnline(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isOnline, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
