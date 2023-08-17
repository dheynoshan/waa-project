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


const JobEdit = () => {
    const params = useParams();

    const [job, setJob] = useState({});
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const job_id = params.id;
    const bearer_token = `Bearer ${user.auth.token}`;
    const config = {
        headers: {
            Authorization: bearer_token
        }
    };

    const [datePosted, setDatePosted] = useState(dayjs());
    const [title, setTitle] = useState('');
    const [orgName, setOrgName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [details, setDetails] = useState('');

    const handleChange = (newDate) => {
        setDatePosted(newDate);
    };

    const handleUpdate = () => {
        const new_job = {
            title,
            orgName,
            city,
            state,
            details,
            datePosted
        }

        axios.put(`http://localhost:8080/api/v1/jobs/${job_id}`, new_job, config)
            .then(res => {
                navigate('/jobs')
            })
    }

    console.log(title)

    async function getJobById() {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/jobs/${job_id}`, config);
            setJob(res.data)
            if (res.data) {
                setTitle(res.data.title);
                setOrgName(res.data.orgName);
                setCity(res.data.city);
                setState(res.data.state);
                setDetails(res.data.details);
                setDatePosted(dayjs(res.data.datePosted));
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getJobById()
    }, [])

    return (
        <div className="details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5">
                Edit Job Posting
            </Typography>
            <Card sx={{ padding: "25px", margin: "auto", width: '80%' }}>
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
                                    Job Title
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="outlined-search"
                                    type="search"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    sx={{
                                        "& input": {
                                            padding: "5px",
                                            width: "100%"
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
                                    Company Name
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="outlined-search"
                                    type="search"
                                    value={orgName}
                                    onChange={(e) => setOrgName(e.target.value)}
                                    sx={{
                                        "& input": {
                                            padding: "5px",
                                            width: "100%"
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
                                    Date Posted
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        label="Date desktop"
                                        inputFormat="MM/DD/YYYY"
                                        value={datePosted}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
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
                                            width: "100%"
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
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
                                            width: "100%"
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
                                    Job Description
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="outlined-search"
                                    type="search"
                                    value={details}
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
                                <Button color="secondary" onClick={handleUpdate}>Update</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}

export default JobEdit;