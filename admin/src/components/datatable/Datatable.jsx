import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { columns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch"
import axios from "axios";

const Datatable = ({columns}) => {
  console.log('Columns:', columns);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() =>{
    setList(data)
  },[data]
  )

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) {
    return;
  }
  
    try{
      await axios.delete(`/${path}/${id}`)
      setList(list.filter((item) => item._id !== id));
    }catch(err){
      console.error("Error deleting item:", err);
      if (err.response) {
        console.error("Server responded with:", err.response.data);
      }
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
       {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
