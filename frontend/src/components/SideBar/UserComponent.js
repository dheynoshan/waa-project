// import Grid from '@mui/material/Unstable_Grid2';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { format } from 'date-fns';
// import { useNavigate } from 'react-router';

// const UserComponent = ({ user }) => {
//     const navigate = useNavigate();

//     const handleClick = (id) => {
//         navigate(`/jobs/${id}`);
//     }

//     return (
//         <Grid container spacing={2}>
//             {
//                 jobs.map(job =>
//                     <Grid xs={4} key={job.id}>
//                         <Box >
//                             <Card variant='elevation'>
//                                 <CardContent >
//                                     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                                         {job.title}
//                                     </Typography>
//                                     <Typography variant="h5" component="div">
//                                         {job.orgName}
//                                     </Typography>
//                                     <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                                         {format(new Date(job.datePosted), 'yyyy-MM-dd')}
//                                     </Typography>
//                                     <Typography variant="body2">
//                                         Status: {job.status ? "open" : "closed"}
//                                         {` in ${job.city}`}
//                                     </Typography>
//                                 </CardContent>
//                                 <CardActions>
//                                     <Button size="small" onClick={()=>handleClick(job.id)}>Details</Button>
//                                 </CardActions>
//                             </Card>
//                         </Box>
//                     </Grid>
//                 )
//             }
//         </Grid>
//     )
// }

// export default JobsComponent;
