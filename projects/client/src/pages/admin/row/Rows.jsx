import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { TableCell, TableRow } from "@mui/material";

import Main from "../../../components/admin/main/Main";
import TableView from "../../../styles/table/TableView";

const Rows = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const tableHead = ["Name", "Rack"];

  const openSelectedRowHandler = (id) => {
    navigate(`/row/${id}`, { state: { id: id } });
  };

  const fetchRows = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/inventory/row`);
      setRows(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  return (
    <Main title="Rows">
      <TableView title="Rows" tableHead={tableHead}>
        {rows.map((item) => (
          <TableRow key={item.id}>
            <TableCell sx={{ cursor: "pointer" }} onClick={() => openSelectedRowHandler(item?.id)}>
              {item?.name}
            </TableCell>
            <TableCell>{item?.Rack?.name}</TableCell>
          </TableRow>
        ))}
      </TableView>
    </Main>
  );
};

export default Rows;
