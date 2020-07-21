import React, {useState} from 'react'

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import {CssBaseline} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    paper: {
        margin: theme.spacing(8, 4),
        position: 'absolute',
        // top: '50%',
        // left: '50%'  ,
        // transform: 'translate(-50%, -50%)',
        // zIndex: 2,
        // padding: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: '50%',
        height: '50%',
        marginBottom: theme.spacing(1)
    },
    form: {
        width: '100%',
        textAlign: 'center',
        padding: theme.spacing(5),
    },
    personInfoContainer: {
        height: '100%'
    },
    workOrdersContainer: {
        display: 'block',
        textAlign: 'center',
        margin: 'auto',
        marginTop: theme.spacing(2),
    },
    workOrder: {
        width: '75%',
        height: '10vh',
        margin: '0 auto',
        cursor: 'pointer'
    },
    workOrderGrid: {
        height: '100%',
        padding: 10
    },
    orderName: {
        textAlign: 'left'
    },
    statusText: {
        //  font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])));
        fontSize: 'calc(10px + (16 - 10) * ((100vw - 300px) / (1600 - 300)))',
        lineHeight: 'calc(1.3em + (1.5 - 1.2) * ((100vw - 300px)/(1600 - 300)))'
    }
}));


export default function Person(props) {
    const classes = useStyles()

    var [allowEdit, setEdit] = useState(false)

    const toggleEdit = (e) => {
        setEdit(!allowEdit)
    }

    return (
        <div>
            <Grid className={classes.root} container>
                <Grid item xs={12} sm={12} md={4}>
                    <Paper className={classes.personInfoContainer}>
                        <form className={classes.form}>
                            <img className={classes.image}
                                 src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'></img>
                            <TextField fullWidth label='Name' defaultValue='Hello there' variant='outlined'
                                       margin='normal'
                                       inputProps={{readOnly: !allowEdit}}/>
                            <TextField fullWidth label='Phone' defaultValue='123-456-7891' variant='outlined'
                                       margin='normal'
                                       inputProps={{readOnly: !allowEdit}}/>
                            {(allowEdit) ? <Button variant='contained' onClick={toggleEdit} size='large'>Save</Button>
                                : <Button variant='contained' onClick={toggleEdit} size='large'>Edit</Button>
                            }
                        </form>
                    </Paper>
                </Grid>
                <Grid container className={classes.workOrdersContainer} xs={12} sm={12} md={8} alignItems='column'
                      spacing={2}>
                    <Grid xs={12} item>
                        <Typography variant='h3'><b>Work Orders</b></Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <WorkOrderCard name='Sleeping Bag' itemStatus='Delivered' orderStatus='Completed'/>
                    </Grid>
                    <Grid item xs={12}>
                        <WorkOrderCard name='Socks' itemStatus='Ordered' orderStatus='In Progress'/>
                    </Grid>
                    <Grid item xs={12}>
                        <WorkOrderCard name='Heated Blanket' itemStatus='Delivered' orderStatus='In Progress'/>
                    </Grid>
                    <Grid item xs={12}>
                        <WorkOrderCard name='Socks' itemStatus='Need Purchase' orderStatus='In Progress'/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

function WorkOrderCard(props) {
    const classes = useStyles()

    return (
        <Paper className={classes.workOrder} onClick={() => alert('hello')}>
            <Grid container className={classes.workOrderGrid} alignItems='row' alignItems='center'
                  zeroMinWidth>
                <Grid item xs={6}>
                    <Typography className={classes.orderName} noWrap>{props.name}</Typography>
                </Grid>
                <Grid style={applyStatusColor(props.itemStatus)} item xs={2}>
                    <Typography className={classes.statusText}>{props.itemStatus}</Typography>
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid style={applyStatusColor(props.orderStatus)} item xs={3}>
                    <Typography className={classes.statusText}>{props.orderStatus}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

// Palette: https://coolors.co/f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590
function applyStatusColor(statusText) {
    var hexCode = 'black'
    switch (statusText) {
        case 'Pending':
            hexCode = '#f94144'
            break
        case 'Need Purchase':
            hexCode = '#f3722c'
            break
        case 'In Progress':
            hexCode = '#f3722c'
            break
        case 'Ordered':
            hexCode = '#f8961e'
            break
        case 'Acquired':
            hexCode = '#f9c74f'
        case 'Delivered':
            hexCode = '#90be6d'
            break
        case 'Completed':
            hexCode = '#90be6d'
            break
    }
    return {
        height: '75%',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: hexCode
    }
}