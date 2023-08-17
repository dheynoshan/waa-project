import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { format } from 'date-fns';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Popper from '@mui/material/Popper';
import { AuthContext } from "../../App";

const EventDetails = () => {
    const param = useParams();
    const event_id = param.id;
    const navigate = useNavigate();
    const user = useContext(AuthContext);

    const [attend, setAttend] = useState('Attend')
    const [event, setEvent] = useState({});
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;

    const bearer_token = `Bearer ${user.auth.token}`;
    const config = {
        headers: {
            Authorization: bearer_token
        }
    };

    async function getEventById() {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/events/${event_id}`, config);
            setEvent(res.data)
        } catch (err) {
            console.error(err.message);
        }
    }

    async function deleteEventById() {
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/events/${event_id}`, config);
            navigate('/events')
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleAttend = () => {
        setAttend('Enrolled')
    }

    const handleDeleteClick = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    }

    const handleDelete = () => {
        deleteEventById()
    }

    const handleNo = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    }

    useEffect(() => {
        getEventById()
    }, [])

    return (
        <div className="details" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5">
                Event Detail Page
            </Typography>
            <Card sx={{ padding: "25px", margin: "auto" }}>
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h4">
                                    {event.name}
                                </Typography>
                            </Grid>
                            {
                                (user.auth.id === event.user) &&
                                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Button variant="outlined" onClick={() => navigate(`/events/edit/${event_id}`)}>Edit</Button>
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
                                            <Popper id={id} open={open} anchorEl={anchorEl} >
                                                {/* <Box sx={{ padding: "1px"}}> */}
                                                <Card sx={{ padding: "1px" }}>
                                                    <CardContent>
                                                        <Typography variant="subtitle2">
                                                            Are you sure you want to delete?
                                                        </Typography>
                                                        <div style={{ display: "flex", justifyContent: 'end' }}>
                                                            <Button color="error" sx={{ paddingBottom: "0" }} onClick={handleDelete}>Yes</Button>
                                                            <Button color="primary" sx={{ paddingBottom: "0" }} onClick={handleNo}>No</Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                {/* </Box> */}
                                            </Popper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    Company Name: {event.type}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    Date Posted: {event.eventDate ? format(new Date(event.eventDate), 'yyyy-MM-dd') : 'N/A'}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    Location: {event.location}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: "end" }}>
                                <Button color="secondary" onClick={handleAttend} disabled={attend == 'Enrolled' ? true : false}>{attend}</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}

export default EventDetails;