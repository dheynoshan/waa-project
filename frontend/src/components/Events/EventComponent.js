import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';

const EventComponent = ({ events }) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/events/${id}`);
    }

    return (
        <Grid container spacing={2}>
            {
                events.map(event =>
                    <Grid xs={4} key={event.id}>
                        <Box >
                            <Card variant='elevation'>
                                <CardContent >
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {event.name}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {event.type}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {format(new Date(event.eventDate), 'yyyy-MM-dd')}
                                    </Typography>
                                    <Typography variant="body2">
                                        Location: {event.location}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={()=>handleClick(event.id)}>Details</Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                )
            }
        </Grid>
    )
}

export default EventComponent;