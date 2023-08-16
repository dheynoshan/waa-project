import axios from "axios";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const userId = 1004;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const getUserDetails = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/users/" + userId
    );
    setFirstName(result.data.firstName);
    setLastName(result.data.lastName);
    setEmail(result.data.email);
  };

  const getUserAddress = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/addresses/getByUserId?userId=" + userId
    );
    console.log(result.data);
    setNumber(result.data.number);
    setStreet(result.data.street);
    setCity(result.data.setCity);
    setState(result.data.setState);
    setZip(result.data.setZip);
  };

  useEffect(() => {
    getUserDetails();
    getUserAddress();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            value={firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="lastName"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            value={lastName}
          />
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Grid>
    </Container>
  );
}
