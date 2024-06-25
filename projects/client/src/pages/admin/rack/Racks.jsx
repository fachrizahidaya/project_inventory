import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { TableCell, TableRow } from "@mui/material";

import Main from "../../../components/admin/main/Main";
import TableView from "../../../styles/table/TableView";

const Racks = () => {
  const [racks, setRacks] = useState([]);

  const navigate = useNavigate();

  const tableHead = ["Name"];

  const openSelectedRackHandler = (id) => {
    navigate(`/rack/${id}`, { state: { id: id } });
  };

  const fetchRacks = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/inventory/`);
      setRacks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRacks();
  }, []);

  return (
    <Main title="Racks">
      <TableView title="Racks" tableHead={tableHead}>
        {racks.map((item) => (
          <TableRow key={item.id}>
            <TableCell sx={{ cursor: "pointer" }} onClick={() => openSelectedRackHandler(item?.id)}>
              {item?.name}
            </TableCell>
          </TableRow>
        ))}
      </TableView>
    </Main>
  );
};

export default Racks;
