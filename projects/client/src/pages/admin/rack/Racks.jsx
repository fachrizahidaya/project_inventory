import { useEffect, useState } from "react";
import Axios from "axios";

import { TableCell, TableRow } from "@mui/material";

import Main from "../../../components/admin/main/Main";
import TableView from "../../../styles/table/TableView";

const Racks = () => {
  const [racks, setRacks] = useState([]);

  const tableHead = ["Name"];

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
            <TableCell>{item?.name}</TableCell>
          </TableRow>
        ))}
      </TableView>
    </Main>
  );
};

export default Racks;
