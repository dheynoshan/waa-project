import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import { AuthContext } from "../../App";
import Button from '@mui/material/Button';

const NewsCreate = () => {
    const params = useParams();
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const bearer_token = `Bearer ${user.auth.token}`;
    const config = {
        headers: {
            Authorization: bearer_token
        }
    };

    const [postedDate, setPostedDate] = useState(dayjs());
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');

    const handleChange = (newDate) => {
        setPostedDate(newDate);
    };

    const handleCreateEvent = () => {
        const new_job = {
            postedDate,
            title,
            details,
            user: {
                id: user.auth.id,
                role: user.auth.role
            }
        }

        axios.post(`http://localhost:8080/api/v1/news`, new_job, config)
            .then(res => {
                navigate('/news')
            })
    }

    return (
        <div className="job-create" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5">
                Create News
            </Typography>
            <Card sx={{ padding: "25px", margin: "auto", width: '80%' }}>
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
                                    News Title
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="outlined-search"
                                    type="search"
                                    onChange={(e) => setTitle(e.target.value)}
                                    sx={{
                                        "& input": {
                                            padding: "5px",
                                            width: "100%"
                                        },
                                    }}
                                />
                            </Grid>
                            {/* <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
                                    Event Type
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="outlined-search"
                                    type="search"
                                    onChange={(e) => setEventType(e.target.value)}
                                    sx={{
                                        "& input": {
                                            padding: "5px",
                                            width: "100%"
                                        },
                                    }}
                                />
                            </Grid> */}
                            <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
                                    News Posted Date
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        label="Pick Event Date"
                                        inputFormat="MM/DD/YYYY"
                                        value={postedDate}
                                        onChange={handleChange}
                                        disabled
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
                                    Details
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="outlined-search"
                                    type="search"
                                    // value={city}
                                    onChange={(e) => setDetails(e.target.value)}
                                    sx={{
                                        "& input": {
                                            padding: "5px",
                                            width: "100%"
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: "end" }}>
                                <Button color="secondary" onClick={handleCreateEvent}>Create Event</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}

export default NewsCreate;