import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

import Main from "../../../components/admin/main/Main";
import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Input from "../../../styles/form/Input";

const Rack = () => {
  const [data, setData] = useState();

  const navigate = useNavigate();
  let { id } = useParams();

  const fetchRack = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/inventory/${id}`);
      setData(res.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRack();
  }, []);

  return (
    <Main title={data?.name}>
      <Grid container>
        <Grid item>
          <Typography>{data?.name}</Typography>
        </Grid>
        <Grid item>
          {data?.Rows.map((item) => (
            <Typography>{item?.name}</Typography>
          ))}
        </Grid>
      </Grid>
    </Main>
  );
};

export default Rack;
