import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useFormik } from "formik";

import { Grid, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

import Main from "../../../components/admin/main/Main";
import Input from "../../../styles/form/Input";
import ModalButton from "../../../styles/form/ModalButton";
import ModalView from "../../../styles/container/ModalView";
import Form from "../../../styles/form/Form";
import SelectInput from "../../../styles/form/SelectInput";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { useLoading } from "../../../hooks/useLoading";

const Item = () => {
  const [data, setData] = useState(null);
  const [category, setCategory] = useState([]);
  const [row, setRow] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const navigate = useNavigate();
  let { id } = useParams();

  const { isOpen: addModalIsOpen, toggle: toggleAddModal } = useDisclosure(false);

  const { isLoading: addItemIsLoading, toggle: toggleAddItem } = useLoading(false);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleRowChange = (event) => {
    setSelectedRow(event.target.value);
  };

  const fetchItem = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/product/item/${id}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategory = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/product`);
      setCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRow = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/inventory/row`);
      setRow(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addItem = async (data) => {
    try {
      toggleAddItem();
      await Axios.post(`http://localhost:8000/api/admin/product/item`, data);
      toggleAddItem();
      toggleAddModal();
    } catch (err) {
      console.log(err);
      toggleAddItem();
    }
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {},
  });

  useEffect(() => {
    fetchItem();
    fetchCategory();
    fetchRow();
  }, []);

  return (
    <Main title={data?.name}>
      <Grid justifyContent="space-between" container>
        <Grid item>
          <Typography>{data?.name}</Typography>
          <Typography>{data?.Type?.name}</Typography>
          <Typography>{data?.Row?.name}</Typography>
        </Grid>
        <Grid item>
          <ModalButton name="Add" endIcon={<Add />} toggle={toggleAddModal} />
        </Grid>
      </Grid>
      <ModalView isOpen={addModalIsOpen} toggle={toggleAddModal}>
        <Form textButton="Submit" isLoading={addItemIsLoading}>
          <Input textLabel="Name" isRequired={true} />
          <SelectInput
            label="Category"
            options={category}
            value={selectedCategory}
            onChange={handleCategoryChange}
            isRequired={true}
          />
          <SelectInput label="Row" options={row} value={selectedRow} onChange={handleRowChange} isRequired={true} />
        </Form>
      </ModalView>
    </Main>
  );
};

export default Item;
