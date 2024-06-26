import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

import { Grid, Typography } from "@mui/material";

import Main from "../../../components/admin/main/Main";

const Item = () => {
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  let { id } = useParams();

  const fetchItem = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/product/item/${id}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <Main title={data?.name}>
      <Grid justifyContent="space-between" container>
        <Grid item>
          <Typography>{data?.name}</Typography>
          <Typography>{data?.Type?.name}</Typography>
          <Typography>{data?.Row?.name}</Typography>
        </Grid>
      </Grid>
    </Main>
  );
};

export default Item;
