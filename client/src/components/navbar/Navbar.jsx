import {
  faSignOut
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.removeItem('user')
    navigate('/');
    window.location.reload();
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Table Tales</span>
        </Link>
        {user ? (
        <div className="userlogout">  
          <div className="username">{user.username} </div>
        {/* <button onClick={logoutHandler}>Logout</button> */}
          <div><FontAwesomeIcon icon={faSignOut} onClick={logoutHandler} className="LogoutIcon" title="Logout"/></div>
         </div> 
         ) :  (
          <div className="navItems"> 
            <Link to="/login"><button className="navButton">Login/Register</button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;