import { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { IconButton, TableCell, TableRow } from "@mui/material";

import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";

import Main from "../../../components/admin/main/Main";
import TableView from "../../../styles/table/TableView";
import Input from "../../../styles/form/Input";
import SelectInput from "../../../styles/form/SelectInput";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { useLoading } from "../../../hooks/useLoading";
import ConfirmationModal from "../../../styles/modal/ConfirmationModal";
import AddModal from "../../../styles/modal/AddModal";

const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const name = useRef();
  const navigate = useNavigate();

  const { isOpen: addModalIsOpen, toggle: toggleAddModal } = useDisclosure(false);
  const { isOpen: deleteModalIsOpen, toggle: toggleDeleteModal } = useDisclosure(false);

  const { isLoading: processIsLoading, toggle: toggleProcess } = useLoading(false);

  const tableHead = ["Name", "Category", "Actions"];

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

  const openDeleteModalHandler = (id) => {
    setSelectedItem(id);
    toggleDeleteModal();
  };

  const closeDeleteModalHandler = () => {
    setSelectedItem(null);
    toggleDeleteModal();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleRowChange = (event) => {
    setSelectedRow(event.target.value);
  };

  const fetchItems = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/product/item`);
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategory = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/product`);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRow = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/inventory/row`);
      setRows(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addItem = async () => {
    try {
      const req = {
        name: name.current.value,
        typeId: selectedCategory,
      };

      toggleProcess();
      await Axios.post(`http://localhost:8000/api/admin/product/item`, req);
      fetchItems();
      closeAddModalHandler();
      toggleProcess();
    } catch (err) {
      console.log(err);
      toggleProcess();
    }
  };

  const deleteItem = async () => {
    try {
      toggleProcess();
      await Axios.delete(`http://localhost:8000/api/admin/product/item/${selectedItem}`);
      fetchItems();
      closeDeleteModalHandler();
      toggleProcess();
    } catch (err) {
      console.log(err);
      toggleProcess();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      typeId: 0,
    },
    onSubmit: (values) => {
      addItem(values);
    },
  });

  useEffect(() => {
    fetchItems();
    fetchCategory();
    fetchRow();
  }, []);

  return (
    <Main title="Items">
      <TableView title="Items" tableHead={tableHead} addModalButton={true} toggleModal={openAddModalHandler}>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell sx={{ cursor: "pointer" }} onClick={() => openSelectedItemHandler(item?.id)}>
              {item?.name}
            </TableCell>
            <TableCell>{item?.Type?.name}</TableCell>
            <TableCell sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <IconButton onClick={null}>
                <EditOutlined />
              </IconButton>
              <IconButton onClick={() => openDeleteModalHandler(item?.id)}>
                <DeleteOutlineOutlined />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableView>
      <AddModal
        isOpen={addModalIsOpen}
        toggle={closeAddModalHandler}
        isLoading={processIsLoading}
        textButton="Submit"
        onSubmit={addItem}
      >
        <Input textLabel="Name" isRequired={true} reference={name} />
        <SelectInput
          label="Category"
          options={categories}
          value={selectedCategory}
          onChange={handleCategoryChange}
          isRequired={true}
        />
        <SelectInput label="Row" options={rows} value={selectedRow} onChange={handleRowChange} isRequired={true} />
      </AddModal>
      <ConfirmationModal
        isOpen={deleteModalIsOpen}
        toggle={toggleDeleteModal}
        objective="delete"
        handleClose={closeDeleteModalHandler}
        onSubmit={deleteItem}
      />
    </Main>
  );
};

export default Items;
