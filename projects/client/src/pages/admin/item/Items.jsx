import { useCallback, useEffect, useRef, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { useSelector } from "react-redux";

import { IconButton, Snackbar, TableCell, TableRow } from "@mui/material";

import {
  DeleteOutlineOutlined,
  EditOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";

import Main from "../../../components/admin/main/Main";
import TableView from "../../../styles/table/TableView";
import Input from "../../../styles/form/Input";
import SelectInput from "../../../styles/form/SelectInput";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { useLoading } from "../../../hooks/useLoading";
import ConfirmationModal from "../../../styles/modal/ConfirmationModal";
import AddModal from "../../../styles/modal/AddModal";
import EditModal from "../../../styles/modal/EditModal";

const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("asc");
  const [searchInput, setSearchInput] = useState("");

  const { isSuper } = useSelector((state) => state.admin.value);

  const name = useRef();
  const search = useRef();
  const navigate = useNavigate();

  const { isOpen: addModalIsOpen, toggle: toggleAddModal } = useDisclosure(false);
  const { isOpen: editModalIsOpen, toggle: toggleEditModal } = useDisclosure(false);
  const { isOpen: deleteModalIsOpen, toggle: toggleDeleteModal } = useDisclosure(false);
  const { isOpen: snackbarIsOpen, toggle: toggleSnackbar } = useDisclosure(false);

  const { isLoading: processIsLoading, toggle: toggleProcess } = useLoading(false);

  const tableHead = isSuper
    ? [
        {
          name: "Name",
          icon: sort === "asc" ? <KeyboardArrowDownOutlined /> : <KeyboardArrowUpOutlined />,
          onClick: () => sortItemHandler(),
        },
        { name: "Category", icon: null, onClick: null },
      ]
    : [
        {
          name: "Name",
          icon: sort === "asc" ? <KeyboardArrowDownOutlined /> : <KeyboardArrowUpOutlined />,
          onClick: () => sortItemHandler(),
        },
        { name: "Category", icon: null, onClick: null },
        { name: "Actions", icon: null, onClick: null },
      ];

  const openSelectedItemHandler = (id) => {
    navigate(`/item/${id}`, { state: { id: id } });
  };

  const openAddModalHandler = () => {
    toggleAddModal();
  };

  const closeAddModalHandler = () => {
    toggleAddModal();
    setSelectedCategory(null);
    setSelectedRow(null);
  };

  const openEditModalHandler = (id) => {
    setSelectedItem(id);
    toggleEditModal();
  };

  const closeEditModalHandler = () => {
    setSelectedItem(null);
    toggleEditModal();
  };

  const openDeleteModalHandler = (id) => {
    setSelectedItem(id);
    toggleDeleteModal();
  };

  const closeDeleteModalHandler = () => {
    setSelectedItem(null);
    toggleDeleteModal();
  };

  const openSnackbar = (value) => {
    toggleSnackbar();
    setSnackbarMessage(value);
  };

  const closeSnackbar = () => {
    toggleSnackbar();
    setSnackbarMessage(null);
  };

  const changePageHandler = (event, value) => {
    setSearchInput("");
    setPage(value - 1);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleRowChange = (event) => {
    setSelectedRow(event.target.value);
  };

  const sortItemHandler = () => {
    if (sort === "asc") {
      setSort("desc");
    } else {
      setSort("asc");
    }
  };

  const searchItemHandler = useCallback(
    _.debounce((e) => {
      setSearchInput(e.target.value);
      setPage(0);
    }, 300),
    []
  );

  const fetchItems = async () => {
    try {
      const res = await Axios.get(
        `http://localhost:8000/api/admin/product/item?limit=${limit}&page=${page}&sort=${sort}&search=${searchInput}`
      );
      setItems(res.data);
    } catch (err) {
      console.log(err);
      openSnackbar(err.response?.data?.err);
    }
  };

  const fetchCategory = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/product`);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
      openSnackbar(err.response?.data?.err);
    }
  };

  const fetchRow = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/inventory/row`);
      setRows(res.data);
    } catch (err) {
      console.log(err);
      openSnackbar(err.response?.data?.err);
    }
  };

  const addItem = async () => {
    try {
      const req = {
        name: name.current.value,
        typeId: selectedCategory,
      };

      toggleProcess();
      const res = await Axios.post(`http://localhost:8000/api/admin/product/item`, req);
      fetchItems();
      closeAddModalHandler();
      openSnackbar(res.data?.message);
      toggleProcess();
    } catch (err) {
      console.log(err);
      openSnackbar(err.response?.data?.err);
      toggleProcess();
    }
  };

  const deleteItem = async () => {
    try {
      toggleProcess();
      const res = await Axios.delete(`http://localhost:8000/api/admin/product/item/${selectedItem?.id}`);
      fetchItems();
      closeDeleteModalHandler();
      openSnackbar(res.data?.message);
      toggleProcess();
    } catch (err) {
      console.log(err);
      openSnackbar(err.response?.data?.err);
      toggleProcess();
    }
  };

  const updateItem = async () => {
    try {
      const req = {
        name: name.current.value,
        typeId: selectedCategory,
      };

      toggleProcess();
      const res = await Axios.patch(`http://localhost:8000/api/admin/product/item/${selectedItem?.id}`, req);
      fetchItems();
      closeEditModalHandler();
      openSnackbar(res.data?.message);
      toggleProcess();
    } catch (err) {
      console.log(err);
      openSnackbar(err.response?.data?.err);
      toggleProcess();
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page, sort, searchInput]);

  useEffect(() => {
    fetchItems();
    fetchCategory();
    fetchRow();
  }, []);

  return (
    <Main title="Items">
      <TableView
        tableHead={tableHead}
        addModalButton={true}
        searchField={true}
        toggleModal={openAddModalHandler}
        pagination={items?.total_page}
        page={page}
        handleChange={changePageHandler}
        name="search"
        textLabel="Search"
        handleSearch={searchItemHandler}
        search={search}
      >
        {items?.data?.map((item, index) => (
          <TableRow key={index}>
            <TableCell sx={{ cursor: "pointer" }} onClick={() => openSelectedItemHandler(item?.id)}>
              {item?.name}
            </TableCell>
            <TableCell>{item?.Type?.name}</TableCell>
            {!isSuper && (
              <TableCell sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <IconButton onClick={() => openEditModalHandler(item)}>
                  <EditOutlined />
                </IconButton>
                <IconButton onClick={() => openDeleteModalHandler(item)}>
                  <DeleteOutlineOutlined />
                </IconButton>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableView>

      <AddModal
        isOpen={addModalIsOpen}
        toggle={closeAddModalHandler}
        isLoading={processIsLoading}
        textButton="Submit"
        onSubmit={addItem}
        disabled={!name && !selectedCategory ? true : false}
      >
        <Input textLabel="Name" isRequired={true} reference={name} />
        <SelectInput
          label="Category"
          options={categories}
          value={selectedCategory}
          onChange={handleCategoryChange}
          isRequired={true}
        />
        {/* <SelectInput label="Row" options={rows} value={selectedRow} onChange={handleRowChange} isRequired={true} /> */}
      </AddModal>

      <EditModal
        toggle={closeEditModalHandler}
        isOpen={editModalIsOpen}
        isLoading={processIsLoading}
        textButton="Save"
        onSubmit={updateItem}
      >
        <Input textLabel="Name" isRequired={true} reference={name} value={selectedItem?.name} />
        <SelectInput
          label="Category"
          options={categories}
          value={selectedItem?.Type?.id}
          onChange={handleCategoryChange}
          isRequired={true}
        />
        {/* <SelectInput label="Row" options={rows} value={selectedRow} onChange={handleRowChange} isRequired={true} /> */}
      </EditModal>

      <ConfirmationModal
        isOpen={deleteModalIsOpen}
        toggle={closeDeleteModalHandler}
        objective="delete"
        handleClose={closeDeleteModalHandler}
        onSubmit={deleteItem}
      />

      <Snackbar open={snackbarIsOpen} autoHideDuration={1500} onClose={closeSnackbar} message={snackbarMessage} />
    </Main>
  );
};

export default Items;
