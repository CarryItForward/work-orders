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
        marginTop: theme.spacing(2)
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
                <Grid className={classes.workOrdersContainer} item xs={12} sm={12} md={8}>
                    <Typography variant='h3'><b>Work Orders</b></Typography>
                </Grid>
            </Grid>
        </div>
    )
}
