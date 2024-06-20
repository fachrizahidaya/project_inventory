import { Fragment } from "react";

import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const TableView = ({ data, title }) => {
  return (
    <Fragment>
      <Typography>{title}</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.Type?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};

export default TableView;
