import "./assets/css/App.css";
import Sidebar from "./components/SideBar/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Profile } from "./pages/Profile";
import { createContext, useState } from "react";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import UserList from "./pages/UserList";
import UserDetails from "./components/Users/UserDetails";
import JobCreate from "./components/Jobs/JobCreate";
import JobEdit from "./components/Jobs/JobEdit";
import Jobs from "./pages/Jobs";
import JobDetails from "./components/Jobs/JobDetails";
import UserEdit from "./components/Users/UserEdit";

export const AuthContext = createContext();

function App() {
  const [auth, setAuth] = useState({});

  return (
    <div>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Router>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/*"
              element={
                auth && Object.keys(auth).length === 0 ? (
                  <Navigate to="/login" />
                ) : (
                  <div>
                    <Sidebar />
                    <Routes>
                      <Route path="/my-profile" element={<Profile />} />
                      <Route path="/users" element={<UserList />} />
                      <Route path="/users/:id" element={<UserDetails />} />
                      <Route
                        path="/jobs/users/edit/:id"
                        element={<UserEdit />}
                      />
                      <Route path="/jobs" element={<Jobs />} />
                      <Route path="/jobs/:id" element={<JobDetails />} />
                      <Route path="/jobs/create" element={<JobCreate />} />
                      <Route path="/jobs/edit/:id" element={<JobEdit />} />
                    </Routes>
                  </div>
                )
              }
            />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
