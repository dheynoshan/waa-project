import React, { useState, useEffect } from "react";
import { AuthContext } from "../App";
import axios from "axios";

import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const user = React.useContext(AuthContext);
  const tokenString = "Bearer " + user.auth.token;

  const getData = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/users", {
      headers: {
        Authorization: tokenString,
      },
    });

    setUsers(result.data);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleClick = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className="jobs">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h4">Job Portal</Typography>
          </Grid>
          <Grid container spacing={2}>
            {users.map((user) => (
              <Grid xs={4} key={user.id}>
                <Box>
                  <Card variant="elevation">
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 18 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {user.firstName + " " + user.lastName}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {user.email}
                      </Typography>
                      <Typography variant="body2">
                        User Id: {user.id}
                      </Typography>
                      <Typography variant="body2">
                        Status: {user.isDeleted ? "Inactive" : "Active"}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleClick(user.id)}>
                        Details
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
