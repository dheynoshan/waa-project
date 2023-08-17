import Button from '@mui/material/Button';
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import EventComponent from '../components/Events/EventComponent';
import CustomPagination from '../components/CustomPagination';

const Events = () => {
    const navigate = useNavigate();
    const user = useContext(AuthContext)

    const [currentPage, setCurrentPage] = useState(1);
    const [events, setEvents] = useState([]);

    const itemsPerPage = 6;
    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const bearer_token = `Bearer ${user.auth.token}`;
    const config = {
        headers: {
            Authorization: bearer_token
        }
    };

    console.log("events", events)

    async function getEvents() {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/events', config);
            setEvents(res.data)
        } catch (err) {
            console.error(err.message);
        }
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        getEvents();
    }, [])

    return (
        <div className="events">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography variant="h4">
                            Events
                        </Typography>
                    </Grid>
                    <Grid item xs={4} >
                        <Button variant="outlined" onClick={() => navigate('/events/create')}>Create +</Button>
                    </Grid>
                </Grid>
                <EventComponent events={currentEvents} />
                <div className="pagination-container">
                    <CustomPagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={events.length}
                        onPageChange={handlePageChange}
                    />
                </div>
            </Box>
        </div>
    )
}

export default Events;