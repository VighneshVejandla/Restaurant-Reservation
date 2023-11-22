import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {restaurantInputs, tableInputs, userInputs, adminInputs} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { restaurantColumns, tableColumns,userColumns , adminColumns} from "./datatablesource";
import NewRestaurant from "./pages/newRestaurant/NewRestaurant";
import NewTable from "./pages/newTable/NewTable";
import Profile from "./pages/profile/profile";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectRoute = ({ children }) => {
    const { user } = useContext(AuthContext)

    if (!user) {
      return <Navigate to="/login" />
    }

    return children;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<ProtectRoute>
              <Home />
            </ProtectRoute>
            } />
            <Route path="users">
              <Route index element={<ProtectRoute>
                <List columns={userColumns} />
              </ProtectRoute>} />
              <Route path=":userId" element={<ProtectRoute>
                <Single />
              </ProtectRoute>} />
              <Route
                path="new"
                element={<ProtectRoute><New inputs={userInputs} title="Add New " /></ProtectRoute>}
              />
            </Route>
            <Route path="restaurants">
              <Route index element={<List columns={restaurantColumns} />} />
              <Route path=":restaurantId" element={<ProtectRoute>
                <Single />
              </ProtectRoute>} />
              <Route
                path="new"
                element={<ProtectRoute><NewRestaurant/></ProtectRoute>}
              />
            </Route>
            <Route path="tables">
              <Route index element={<List columns={tableColumns} />} />
              <Route path=":tableId" element={<ProtectRoute>
                <Single />
              </ProtectRoute>} />
              <Route
                path="new"
                element={<ProtectRoute><NewTable/></ProtectRoute>}
              />
            </Route>
            {/* <Route path="profile">
              <Route index element={<List columns={adminColumns} />}/>
              <Route path=":userId" element={<ProtectRoute>
                <Single />
              </ProtectRoute>} />
            </Route> */}
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
