import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  const login = (authData) => {
 
    localStorage.setItem("user", JSON.stringify(authData));
    setUser(authData);
    setIsAuth(true);
    
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      setIsAuth(true);
    } else {
      setUser({});
      setIsAuth(false);
      localStorage.removeItem("user");
    }
  }, []);

  //the logout part of your code that delete all the info from your localstorage
  const logout = () => {
    localStorage.removeItem("user");
    setUser(undefined);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ logout, login, isAuth, user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;