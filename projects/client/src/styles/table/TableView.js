import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { Add } from "@mui/icons-material";

import ModalButton from "../form/ModalButton";

const TableView = ({ children, tableHead, addModalButton, toggleModal }) => {
  return (
    <TableContainer>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
        {addModalButton && <ModalButton name="Add" endIcon={<Add />} toggle={toggleModal} />}
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {tableHead?.map((item) => (
              <TableCell component="th" scope="row">
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", mt: 2 }}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Box>
    </TableContainer>
  );
};

export default TableView;
