import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./register.css"

const Register = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({})

  const navigate = useNavigate()
  const { user, loading, error, dispatch } = useContext(AuthContext)

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/vighnesh-vejandla/image/upload",
        data
      );
      console.log(uploadRes.data)

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);
      alert("User has been created successfully!");
      navigate("/login")
    } catch (err) {
      console.log(err)
    }
  }
  // console.log(info)
  return (


    <div class="register">
      <form class="form">
        <center>
          <h3 class="title">Register</h3>
        </center>
        <div class="myform">
          <table>
            <tr>
              <td class="label">User Name</td>
              <td><input type="text" class="input" id="username" placeholder="Enter User Name" onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td class="label">Email address</td>
              <td><input type="email" class="input" id="email" placeholder="Enter Email" onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td class="label">Phone Number</td>
              <td><input type="phone number" class="input" id="phone" placeholder="Enter No" onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td class="label">City</td>
              <td><input type="text" class="input" id="city" placeholder="Enter City" onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td class="label">Country</td>
              <td><input type="text" class="input" id="country" placeholder="Enter Country" onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td class="label">Password</td>
              <td><input type="password" class="input" id="password" placeholder="Enter Password" onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td class="label">Select Image</td>
              <td><input class="input" type="file" id="file" onChange={(e) => setFile(e.target.files[0])} /></td>
            </tr>
            <tr> <td></td>
            <td>
              <img class="img-preview" src={file ? URL.createObjectURL(file) : ''} alt="Preview" /></td>
              </tr>
          </table>
          <div class="sss">
            <span>
              <button onClick={handleClick} disabled={loading} class="button" type="button">Register</button>
            </span>
            <span>
              <Link to="/login">Already have an account</Link>
            </span>
          </div>
        </div>
      </form>
    </div>

  );
};

export default Register;
