import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Popper from "@mui/material/Popper";

import axios from "axios";
import React, { useState, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../App";

export default function UserDetails() {
  const param = useParams();
  const userId = param.id;
  const navigate = useNavigate();

  const [userDetail, setUserDetail] = useState({});
  const [address, setAddress] = useState({});

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const canBeOpen = open && Boolean(anchorEl);

  const id = canBeOpen ? "spring-popper" : undefined;

  const user = React.useContext(AuthContext);

  const tokenString = "Bearer " + user.auth.token;

  const getUserDetails = async () => {
    console.log(tokenString);
    try {
      const result = await axios.get(
        "http://localhost:8080/api/v1/users/" + userId,
        {
          headers: {
            Authorization: tokenString,
          },
        }
      );
      setUserDetail(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserAddress = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8080/api/v1/addresses/getByUserId?userId=" + userId,
        {
          headers: {
            Authorization: tokenString,
          },
        }
      );
      setAddress(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserDetails();
    getUserAddress();
  }, []);

  const handleDeleteClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const deleteAddress = async () => {
    if (address.id != null) {
      try {
        await axios
          .delete("http://localhost:8080/api/v1/addresses/" + address.id, {
            headers: {
              Authorization: tokenString,
            },
          })
          .then((res) => {
            deleteUser();
            alert("User successfully deleted");
            navigate("/users");
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      deleteUser();
      alert("User successfully deleted");
      navigate("/users");
    }
  };
  const deleteUser = async () => {
    try {
      await axios.delete("http://localhost:8080/api/v1/users/" + userId, {
        headers: {
          Authorization: tokenString,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    deleteAddress();
  };

  const handleNo = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  console.log(user.auth.id === userId, user.auth.id, userId);

  return (
    <div
      className="details"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h5">User Details</Typography>
      <Card sx={{ padding: "25px", margin: "auto" }}>
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h4">{user.firstName}</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {(user.auth.role === "ADMIN" || user.auth.id == userId) && (
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        onClick={() => navigate(`/jobs/users/edit/${userId}`)}
                      >
                        Edit
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        color="error"
                        aria-describedby={id}
                        onClick={handleDeleteClick}
                      >
                        Delete
                      </Button>
                      <Popper id={id} open={open} anchorEl={anchorEl}>
                        {/* <Box sx={{ padding: "1px"}}> */}
                        <Card sx={{ padding: "1px" }}>
                          <CardContent>
                            <Typography variant="subtitle2">
                              Are you sure you want to delete?
                            </Typography>
                            <div
                              style={{ display: "flex", justifyContent: "end" }}
                            >
                              <Button
                                color="error"
                                sx={{ paddingBottom: "0" }}
                                onClick={handleDelete}
                              >
                                Yes
                              </Button>
                              <Button
                                color="primary"
                                sx={{ paddingBottom: "0" }}
                                onClick={handleNo}
                              >
                                No
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        {/* </Box> */}
                      </Popper>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Name: {userDetail.firstName + " " + userDetail.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  User ID: {userDetail.id}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Email: {userDetail.email}
                </Typography>
              </Grid>

              <Grid item xs={12} sx={{ display: "flex" }}>
                <Typography variant="subtitle1">
                  Address:{" "}
                  {address.number +
                    " " +
                    address.street +
                    ", " +
                    address.city +
                    ", " +
                    address.state +
                    ", " +
                    address.zip}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
