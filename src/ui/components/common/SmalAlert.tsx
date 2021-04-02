import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {setAppErrorAC} from "../../../bll/app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export function SmallAlert() {
    const message = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()
    const classes = useStyles()
    const open = message !== null
    // const [open, setOpen] = React.useState(false);
    //
    // const handleClick = () => {
    //     setOpen(true);
    // };
    const handleClose = (event?: React.SyntheticEvent, reasons?: string) => {
        if (reasons === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }
    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            {/*<Alert severity="error">This is an error message!</Alert>*/}
            {/*<Alert severity="warning">This is a warning message!</Alert>*/}
            {/*<Alert severity="info">This is an information message!</Alert>*/}
            {/*<Alert severity="success">This is a success message!</Alert>*/}
        </div>
    );
}