import "./assets/css/App.css";
import Sidebar from "./components/SideBar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { createContext, useState } from "react";
import LogIn from "./pages/LogIn";

export const AuthContext = createContext();

function App() {
  const [auth, setAuth] = useState(0);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        {
          (auth < 1) ? <LogIn /> :
            <div>
              <Sidebar />
              <Routes>
                <Route path='/my-profile' element={<Profile />} />
                <Route path='/login' element={<LogIn />} />
              </Routes>
            </div>
        }

      </Router>
    </AuthContext.Provider>
  );
}

export default App;
