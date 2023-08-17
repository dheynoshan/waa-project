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


const NewsEdit = () => {
    const params = useParams();

    const [mynew, setMynew] = useState({});
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const news_id = params.id;
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

    const handleUpdate = () => {
        const new_news = {
            postedDate,
            title,
            details
        }

        axios.put(`http://localhost:8080/api/v1/news/${news_id}`, new_news, config)
            .then(res => {
                navigate('/news')
            })
    }

    async function getNewsById() {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/news/${news_id}`, config);
            setMynew(res.data)
            if (res.data) {
                setPostedDate(res.data.eventDate);
                setTitle(res.data.title);
                setDetails(res.data.details);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getNewsById()
    }, [])

    return (
        <div className="details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5">
                Edit News
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
                            {/* <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
                                    Event Type
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="outlined-search"
                                    type="search"
                                    value={eventType}
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
                                        label="Date desktop"
                                        inputFormat="MM/DD/YYYY"
                                        value={dayjs(postedDate)}
                                        onChange={handleChange}
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
                            {/* <Grid item xs={3}>
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
                            </Grid> */}
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

export default NewsEdit;