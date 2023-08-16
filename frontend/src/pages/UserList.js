import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function DenseTable() {
  const [rows, setRows] = React.useState([]);
  const navigate = useNavigate("/");

  console.log(rows);

  const getData = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/users", {
      //   headers: {
      //     Authorization:
      //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LnRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTIxMTM5NzYsImV4cCI6MTY5MjExNzU3Nn0.HlXWNF37tK3y9ENV-ZwJffsRzzXNO84_0aCR5TO483w",
      //   },
    });

    setRows(result.data);
    // console.log(rows);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const showDetails = (e) => {};

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">User ID</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Email</TableCell>
            {/*<TableCell align="center">Role</TableCell>*/}
            <TableCell align="center">Active</TableCell>
            <TableCell align="center">Ops</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              {/*<TableCell align="center">{row.role}</TableCell>*/}
              <TableCell align="center">{row.isDeleted}</TableCell>
              <TableCell align="center">
                <input
                  type="button"
                  value="Details"
                  onClick={showDetails}
                ></input>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
