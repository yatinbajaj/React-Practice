import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import AuthContext from "./context/auth-context";
import MainHeader from "./components/MainHeader/MainHeader";
function App() {
  const ctx = useContext(AuthContext);
  return (
    <React.Fragment>
      
       <MainHeader onLogout={ctx.onLogout}/>
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
