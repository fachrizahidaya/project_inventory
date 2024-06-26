import { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { TableCell, TableRow } from "@mui/material";

import { Add } from "@mui/icons-material";

import Main from "../../../components/admin/main/Main";
import TableView from "../../../styles/table/TableView";
import ModalButton from "../../../styles/form/ModalButton";
import ModalView from "../../../styles/container/ModalView";
import Form from "../../../styles/form/Form";
import Input from "../../../styles/form/Input";
import SelectInput from "../../../styles/form/SelectInput";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { useLoading } from "../../../hooks/useLoading";

const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const name = useRef();
  const navigate = useNavigate();

  const { isOpen: addModalIsOpen, toggle: toggleAddModal } = useDisclosure(false);

  const { isLoading: addItemIsLoading, toggle: toggleAddItem } = useLoading(false);

  const tableHead = ["Name", "Category"];

  const openSelectedItemHandler = (id) => {
    navigate(`/item/${id}`, { state: { id: id } });
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
      toggleAddItem();
      await Axios.post(`http://localhost:8000/api/admin/product/item`, req);
      fetchItems();
      toggleAddItem();
      toggleAddModal();
    } catch (err) {
      console.log(err);
      toggleAddItem();
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
    <>
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
        <ModalButton name="Add" endIcon={<Add />} toggle={toggleAddModal} />
        <ModalView isOpen={addModalIsOpen} toggle={toggleAddModal}>
          <Form textButton="Submit" isLoading={addItemIsLoading} onSubmit={addItem}>
            <Input textLabel="Name" isRequired={true} reference={name} />
            <SelectInput
              label="Category"
              options={categories}
              value={selectedCategory}
              onChange={handleCategoryChange}
              isRequired={true}
            />
            <SelectInput label="Row" options={rows} value={selectedRow} onChange={handleRowChange} isRequired={true} />
          </Form>
        </ModalView>
      </Main>
    </>
  );
};

export default Items;
