import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";

import { IconButton, Snackbar, TableCell, TableRow } from "@mui/material";

import { DeleteOutlineOutlined, KeyboardArrowDownOutlined } from "@mui/icons-material";

import Main from "../../../components/admin/main/Main";
import TableView from "../../../styles/table/TableView";
import AddModal from "../../../styles/modal/AddModal";
import Input from "../../../styles/form/Input";
import ConfirmationModal from "../../../styles/modal/ConfirmationModal";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { useLoading } from "../../../hooks/useLoading";
import SelectInput from "../../../styles/form/SelectInput";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const { isSuper } = useSelector((state) => state.admin.value);

  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const search = useRef();
  const navigate = useNavigate();

  const { isOpen: addModalIsOpen, toggle: toggleAddModal } = useDisclosure(false);
  const { isOpen: deleteModalIsOpen, toggle: toggleDeleteModal } = useDisclosure(false);
  const { isOpen: snackbarIsOpen, toggle: toggleSnackbar } = useDisclosure(false);

  const { isLoading: processIsLoading, toggle: toggleProcess } = useLoading(false);

  const tableHead = [
    {
      name: "Email",
      icon: <KeyboardArrowDownOutlined />,
      onClick: null,
    },
    {
      name: "Super Admin",
      icon: null,
      onClick: null,
    },
    { name: "Actions", icon: null, onClick: null },
  ];

  const adminOptions = [
    { id: 1, name: "Yes" },
    { id: 0, name: "No" },
  ];

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const mouseDownPasswordHandler = (event) => {
    event.preventDefault();
  };

  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const mouseDownConfirmPasswordHandler = (event) => {
    event.preventDefault();
  };

  const openAddModalHandler = () => {
    toggleAddModal();
  };

  const closeAddModalHandler = () => {
    toggleAddModal();
    setSelectedOption(null);
  };

  const openDeleteModalHandler = (id) => {
    setSelectedAdmin(id);
    toggleDeleteModal();
  };

  const closeDeleteModalHandler = () => {
    setSelectedAdmin(null);
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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const fetchAdmins = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/auth/`);
      setAdmins(res.data);
    } catch (err) {
      console.log(err);
      openSnackbar(err.response?.data?.err);
    }
  };

  const addAdmin = async () => {
    try {
      const req = {
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
        isSuper: selectedOption,
      };

      toggleProcess();
      const res = await Axios.post(`http://localhost:8000/api/admin/auth/`, req);
      fetchAdmins();
      closeAddModalHandler();
      openSnackbar(res.data?.message);
      toggleProcess();
    } catch (err) {
      console.log(err);
      openSnackbar(err.response?.data?.err);
      toggleProcess();
    }
  };

  const deleteAdmin = async () => {
    try {
      toggleProcess();
      const res = await Axios.delete(`http://localhost:8000/api/admin/auth/${selectedAdmin?.id}`);
      fetchAdmins();
      closeDeleteModalHandler();
      openSnackbar(res.data?.message);
    } catch (err) {
      console.log(err);
      openSnackbar(err?.response?.data?.err);
      toggleProcess();
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <Main title="Admins">
      <TableView
        tableHead={tableHead}
        addModalButton={true}
        searchField={true}
        name="search"
        textLabel="Search"
        toggleModal={openAddModalHandler}
        page={null}
        pagination={null}
        handleChange={null}
        handleSearch={null}
        search={null}
      >
        {admins?.data?.map((item, index) => (
          <TableRow key={index}>
            <TableCell sx={{ cursor: "pointer" }} onClick={null}>
              {item?.email}
            </TableCell>
            <TableCell onClick={null}>{item?.isSuper ? "Yes" : "No"}</TableCell>
            <TableCell sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <IconButton onClick={() => openDeleteModalHandler(item)}>
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
        onSubmit={addAdmin}
        disabled={!email ? true : false}
      >
        <Input textLabel="Email" isRequired={true} reference={email} />
        <SelectInput
          label="Super Admin?"
          options={adminOptions}
          value={selectedOption}
          onChange={handleOptionChange}
          isRequired={true}
        />
        <Input
          textLabel="Password"
          isRequired={true}
          reference={password}
          inputType="password"
          handleShowPassword={showPasswordHandler}
          handleMouseDownPassword={mouseDownPasswordHandler}
          showPassword={showPassword}
        />
        <Input
          textLabel="Confirm Password"
          isRequired={true}
          reference={confirmPassword}
          inputType="password"
          handleShowPassword={showConfirmPasswordHandler}
          handleMouseDownPassword={mouseDownConfirmPasswordHandler}
          showPassword={showConfirmPassword}
        />
      </AddModal>
      <ConfirmationModal
        isOpen={deleteModalIsOpen}
        toggle={closeDeleteModalHandler}
        objective="delete"
        handleClose={closeDeleteModalHandler}
        onSubmit={deleteAdmin}
      />
      <Snackbar open={snackbarIsOpen} autoHideDuration={1500} onClose={closeSnackbar} message={snackbarMessage} />
    </Main>
  );
};

export default Admins;
