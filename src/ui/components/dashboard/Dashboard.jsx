import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {mainListItems, secondaryListItems} from './listItems';
import {Switch, Route, NavLink} from "react-router-dom"
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import { signOutTC} from "../../../bll/userReduser";
import HomeIcon from '@material-ui/icons/Home';
import Groups from "../../views/groups/groups";
import {PATH} from "../../route";
import Users from "../../views/users/users";
import Page404 from "../../views/pages/page404/Page404";
import GroupPage from "../../views/groups/groupPage";
import LinearProgress from "@material-ui/core/LinearProgress";
import {SmallAlert} from "../common/SmalAlert";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        // height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

// Pages
const Starting = React.lazy(() => import('../../views/starting'));
const GroupsUsers = React.lazy(() => import('../../views/groupUsers/groupsUsers'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

export default function Dashboard() {
    const dispatch = useDispatch()

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const submitSignOut = () => {
        dispatch(signOutTC())
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}
                                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <Button onClick={submitSignOut}>sign out</Button>
                    <NavLink to={'https://lisapatrikeevna.github.io/dragan-2/'} title={'to site'}> <HomeIcon/></NavLink>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}
                    classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}}>
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{mainListItems}</List>
                <Divider/>
                <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                {/*<LinearProgress/>*/}
                <Container maxWidth="lg" className={classes.container}>
                    <React.Suspense fallback={'...loading'}>
                        <Switch>
                            {/*<Route path="/"  render={props => <Starting {...props}/>} />*/}
                            <Route exact path={PATH.GROUPS} render={() => <Groups/>}/>
                            <Route exact path={PATH.USERS} render={() => <Users/>}/>
                            <Route path="/starting" render={props => <Starting {...props}/>}/>
                            {/*<Route path="/groupsUsers" render={props => <GroupsUsers {...props}/>}/>*/}
                            <Route exact path={PATH.PAGEGROUP.path} render={() => <GroupPage />}/>
                            <Route exact path={PATH.ERROR404} render={() => <Page404/>}/>
                            {/*    /!*<Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />*!/*/}
                            {/*    /!*<Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />*!/*/}
                        </Switch>
                        <SmallAlert/>
                    </React.Suspense>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
        </div>
    );
}
