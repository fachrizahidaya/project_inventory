import { Fragment, useEffect, useState } from "react";
import Axios from "axios";

import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import Main from "../../../components/admin/main/Main";

const Items = () => {
  const [items, setItems] = useState([]);

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
      <Fragment>
        <Typography>Orders</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.Type?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Fragment>
    </Main>
  );
};

export default Items;
