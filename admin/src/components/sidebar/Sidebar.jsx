import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom"
import "./sidebar.scss";

const Sidebar = () => {

  // const logoutHandler = () => {
  //   localStorage.removeItem('user')
  //   window.location.reload();
  // }
  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.removeItem('user');
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    navigate("/login");
  
    window.location.reload();
  };
  
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">lamadmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/restaurants" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Restaurants</span>
            </li>
          </Link>
          <Link to="/tables" style={{textDecoration:"none"}}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Tables</span>
          </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={logoutHandler}>Logout</span>
          </li>
          <p className="title">MODE</p>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

console.log("After rendering Link");

export default Sidebar;
