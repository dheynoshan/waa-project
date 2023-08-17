import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../App";

// // TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn() {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();
  const user = React.useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const rgExp = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2-6}$/;
    // if (!rgExp.test(data.email)) {
    //   alert("Invalid email");
    // } else {
    axios
      .post("http://localhost:8080/api/v1/auth/authenticate", {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((res) => {
        user.setAuth({
          id: res.data.userId,
          token: res.data.token,
          role: res.data.role
        });
        navigate("/my-profile");
      })
      .catch((error) => console.log(error));
    // }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import * as React from "react";
// import TextField from "@mui/material/TextField";

// export const LogIn = () => {
//   return (
//     <div className="form">
//       <Typography variant="h5">Log In</Typography>
//       <form>
//         <TextField
//           style={{ width: "80%", margin: "5px" }}
//           type="text"
//           label="Email"
//           variant="outlined"
//         />
//         <br />
//         <TextField
//           style={{ width: "80%", margin: "5px" }}
//           type="text"
//           label="Passoword"
//           variant="outlined"
//         />
//         <br />
//         <Button variant="contained" color="primary">
//           Log In
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default LogIn;
