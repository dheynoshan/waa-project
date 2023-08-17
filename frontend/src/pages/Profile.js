import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import Button from "@mui/material/Button";
import { AuthContext } from "../App";

export const Profile = () => {
  const user = useContext(AuthContext);

  const navigate = useNavigate();

  const userId = user.auth.id;

  const bearer_token = `Bearer ${user.auth.token}`;

  const config = {
    headers: {
      Authorization: bearer_token,
    },
  };

  const [userDetail, setUserDetail] = useState({});
  const [address, setAddress] = useState({});

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [industry, setIndustry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [course, setCourse] = useState("");

  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleUpdate = () => {
    const edit_user = {
      firstName,
      lastName,
      email,
      password,
      industry,
    };
    axios
      .put(`http://localhost:8080/api/v1/users/${userId}`, edit_user, config)
      .then((res) => {
        alert("User Updated");
        navigate("/my-profile");
      })
      .then(() => {
        const addr = {
          number,
          street,
          city,
          state,
          zip,
          user: {
            id: user.auth.id,
            role: user.auth.role,
          },
        };
        try {
          console.log(address);
          if (address.id != null) {
            axios
              .put(
                `http://localhost:8080/api/v1/addresses/${address.id}`,
                addr,
                config
              )
              .then((res) => {
                alert("Address Updated");
                navigate("/my-profile");
              })
              .catch((err) => {
                console.log(err);
                navigate("/my-profile");
              });
          } else {
            axios
              .post(`http://localhost:8080/api/v1/addresses`, addr, config)
              .then((res) => {
                alert("Address Created");
                navigate("/my-profile");
              })
              .catch((err) => {
                console.log(err);
                navigate("/my-profile");
              });
          }
        } catch (err) {
          console.log(err);
        }
      });
    navigate("/my-profile");
  };

  async function getUserById() {
    console.log(userId);
    const bearer_token = `Bearer ${user.auth.token}`;

    try {
      const config = {
        headers: {
          Authorization: bearer_token,
        },
      };

      const res = await axios.get(
        `http://localhost:8080/api/v1/users/${userId}`,
        config
      );

      setUserDetail(res.data);

      if (res.data) {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setIndustry(res.data.industry);
        setPhoneNumber(res.data.phoneNumber);
        setCourse(res.data.course);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getAddressByUserId() {
    const bearer_token = `Bearer ${user.auth.token}`;

    try {
      const config = {
        headers: {
          Authorization: bearer_token,
        },
      };

      const res = await axios.get(
        `http://localhost:8080/api/v1/addresses/getByUserId?userId=${userId}`,
        config
      );

      setAddress(res.data);

      if (res.data) {
        setNumber(res.data.number);
        setStreet(res.data.street);
        setCity(res.data.city);
        setState(res.data.state);
        setZip(res.data.zip);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getAddressByUserId();
    getUserById();
  }, []);

  return (
    <div
      className="details"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h5">User Details</Typography>

      <Card sx={{ padding: "25px", margin: "auto", width: "80%" }}>
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="subtitle" sx={{ width: "100%" }}>
                  First Name
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="outlined-search"
                  type="search"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{
                    "& input": {
                      padding: "5px",

                      width: "100%",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle" sx={{ width: "100%" }}>
                  Last Name
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="outlined-search"
                  type="search"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{
                    "& input": {
                      padding: "5px",

                      width: "100%",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle" sx={{ width: "100%" }}>
                  Email
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="outlined-search"
                  type="search"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& input": {
                      padding: "5px",

                      width: "100%",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle" sx={{ width: "100%" }}>
                  Password
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="outlined-search"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    "& input": {
                      padding: "5px",

                      width: "100%",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle" sx={{ width: "100%" }}>
                  Industry
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="outlined-search"
                  type="search"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  sx={{
                    "& input": {
                      padding: "5px",

                      width: "100%",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle" sx={{ width: "100%" }}>
                  Phone Number
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="outlined-search"
                  type="search"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  sx={{
                    "& input": {
                      padding: "5px",

                      width: "100%",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle" sx={{ width: "100%" }}>
                  Course
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="outlined-search"
                  type="search"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  sx={{
                    "& input": {
                      padding: "5px",

                      width: "100%",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle" sx={{ width: "100%" }}>
                  Number
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="outlined-search"
                  type="search"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  sx={{
                    "& input": {
                      padding: "5px",

                      width: "100%",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle" sx={{ width: "100%" }}>
                  Street
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="outlined-search"
                  type="search"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  sx={{
                    "& input": {
                      padding: "5px",

                      width: "100%",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle" sx={{ width: "100%" }}>
                  City
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="outlined-search"
                  type="search"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  sx={{
                    "& input": {
                      padding: "5px",

                      width: "100%",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle" sx={{ width: "100%" }}>
                  State
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="outlined-search"
                  type="search"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  sx={{
                    "& input": {
                      padding: "5px",

                      width: "100%",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography variant="subtitle" sx={{ width: "100%" }}>
                  Zip
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <TextField
                  id="outlined-search"
                  type="search"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  sx={{
                    "& input": {
                      padding: "5px",

                      width: "100%",
                    },
                  }}
                />
              </Grid>
              {/**/}
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button color="secondary" onClick={handleUpdate}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
