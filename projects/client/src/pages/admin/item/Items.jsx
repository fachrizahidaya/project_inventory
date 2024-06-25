import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { TableCell, TableRow } from "@mui/material";

import Main from "../../../components/admin/main/Main";
import TableView from "../../../styles/table/TableView";

const Items = () => {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const tableHead = ["Name", "Category"];

  const openSelectedItemHandler = (id) => {
    navigate(`/item/${id}`, { state: { id: id } });
  };

  const fetchItems = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/product/item`);
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Main title="Items">
      <TableView title="Items" tableHead={tableHead}>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell sx={{ cursor: "pointer" }} onClick={() => openSelectedItemHandler(item?.id)}>
              {item?.name}
            </TableCell>
            <TableCell>{item?.Type?.name}</TableCell>
          </TableRow>
        ))}
      </TableView>
    </Main>
  );
};

export default Items;
