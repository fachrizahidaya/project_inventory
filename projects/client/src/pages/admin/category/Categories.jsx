import { Fragment, useEffect, useState } from "react";
import Axios from "axios";

import Main from "../../../components/admin/main/Main";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/product`);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Main title="Categories">
      <Fragment>
        <Typography>Orders</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Fragment>
    </Main>
  );
};

export default Categories;
