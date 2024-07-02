import {
  Box,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Add } from "@mui/icons-material";

import ModalButton from "../form/ModalButton";
import Input from "../form/Input";

const TableView = ({
  children,
  tableHead,
  addModalButton,
  toggleModal,
  pagination,
  page,
  handleChange,
  searchField,
  name,
  textLabel,
  search,
  handleSearch,
}) => {
  return (
    <TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: searchField && addModalButton ? "space-between" : "flex-end",
        }}
      >
        {searchField && <Input name={name} textLabel={textLabel} reference={search} handleSearch={handleSearch} />}
        {addModalButton && <ModalButton name="Add" endIcon={<Add />} toggle={toggleModal} />}
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            {tableHead?.map((item) => (
              <TableCell component="th" scope="row">
                {item?.name}
                {item?.icon && <IconButton onClick={item?.onClick}>{item?.icon}</IconButton>}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", mt: 2 }}>
        <Pagination page={page + 1} count={pagination} variant="outlined" shape="rounded" onChange={handleChange} />
      </Box>
    </TableContainer>
  );
};

export default TableView;
