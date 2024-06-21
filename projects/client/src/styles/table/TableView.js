import { Fragment } from "react";

import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const TableView = ({ children, title, tableHead }) => {
  return (
    <Fragment>
      <Typography>{title}</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            {tableHead?.map((item) => (
              <TableCell>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </Fragment>
  );
};

export default TableView;
