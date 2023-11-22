import "./newTable.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { tableInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewTable = () => {
  const [info, setInfo] = useState({})
  const [restaurantId, setRestaurantId] = useState(undefined)
  const [tables, setTables] = useState([])
  const navigate = useNavigate()

  const { data, loading, error } = useFetch("/restaurants")

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault()
    const tableNumbers = tables.split(",").map((table) => ({ number: table }))
    console.log(tableNumbers)
    try {
      await axios.post(`/tables/${restaurantId}`, { ...info, tableNumbers })
      navigate("/tables")
      alert("new table was added")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Table</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {tableInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput" >
                <label>Tables</label>
                <textarea onChange={e => setTables(e.target.value)} placeholder="Give comma table numbers"></textarea>
              </div>
              <div className="formInput">
                <label>Choose a restaurant</label>
                <select id="restaurantId" onChange={e => setRestaurantId(e.target.value)}>
                  {loading ? "loading" : data && data.map(restaurant => (
                    <option key={restaurant._id}
                      value={restaurant._id}>
                      {restaurant.name}
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

export default NewTable;
