import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Restaurant from "./pages/hotel/Restaurant";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from './pages/login/Register.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/restaurants" element={<List/>}/>
        <Route path="/restaurants/:id" element={<Restaurant/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
