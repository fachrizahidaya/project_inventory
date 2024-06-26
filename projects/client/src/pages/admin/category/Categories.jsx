import { useEffect, useState } from "react";
import Axios from "axios";

import { TableCell, TablePagination, TableRow } from "@mui/material";

import Main from "../../../components/admin/main/Main";
import TableView from "../../../styles/table/TableView";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const tableHead = ["Name"];

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
      <TableView title="Categories" tableHead={tableHead}>
        {categories.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item?.name}</TableCell>
          </TableRow>
        ))}
      </TableView>
    </Main>
  );
};

export default Categories;
