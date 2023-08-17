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


const EventEdit = () => {
    const params = useParams();

    const [event, setEvent] = useState({});
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const event_id = params.id;
    const bearer_token = `Bearer ${user.auth.token}`;
    const config = {
        headers: {
            Authorization: bearer_token
        }
    };

    const [eventDate, setEventDate] = useState(dayjs());
    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventLocation, setEventLocation] = useState('');

    const handleChange = (newDate) => {
        setEventDate(newDate);
    };

    const handleUpdate = () => {
        const new_job = {
            name: eventName,
            type: eventType,
            eventDate,
            location: eventLocation
        }

        axios.put(`http://localhost:8080/api/v1/events/${event_id}`, new_job, config)
            .then(res => {
                navigate('/events')
            })
    }

    async function getJobById() {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/events/${event_id}`, config);
            setEvent(res.data)
            if (res.data) {
                setEventName(res.data.name);
                setEventType(res.data.type);
                setEventDate(res.data.eventDate);
                setEventLocation(res.data.location)
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
                Edit Events
            </Typography>
            <Card sx={{ padding: "25px", margin: "auto", width: '80%' }}>
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
                                    Event Name
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="outlined-search"
                                    type="search"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
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
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
                                    Event Date
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        label="Date desktop"
                                        inputFormat="MM/DD/YYYY"
                                        value={dayjs(eventDate)}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle" sx={{ width: '100%' }}>
                                    Location
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="outlined-search"
                                    type="search"
                                    value={eventLocation}
                                    onChange={(e) => setEventLocation(e.target.value)}
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

export default EventEdit;