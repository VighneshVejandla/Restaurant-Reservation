import "./newRestaurant.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { restaurantInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRestaurant = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({})
  const [tables, setTables] = useState({})
  const navigate = useNavigate()

  const {data, loading, error} = useFetch("/tables")

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    console.log(e.target.selectedOptions)
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setTables(value);
  };

    console.log(tables)
    console.log(files)

    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const list = await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/vighnesh-vejandla/image/upload",
              data
            );
  
            const { url } = uploadRes.data;
            return url;
          })
        );
  
        const newrestaurant = {
          ...info,
          tables,
          photos: list,
        };
        await axios.post("/restaurants", newrestaurant);
        navigate("/restaurants")
        alert("restaurant added")
    } catch (err) 
    {console.log(err)}
      };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Restaurant</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {restaurantInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                    id={input.id}
                    onChange={handleChange} 
                    type={input.type}
                    placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput">
                  <label>Featured</label>
                  <select id="featured" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>                    
                  </select>
                </div>
                <div className="selectTables">
                  <label>Tables</label>
                  <select id="tables" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((table) => (
                        <option key={table._id} value={table._id}>
                          {table.title}
                        </option>
                      ))}                    
                  </select>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRestaurant;
