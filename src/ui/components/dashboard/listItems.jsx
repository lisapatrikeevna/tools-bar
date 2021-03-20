import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {NavLink} from "react-router-dom";
import {CollectionsBookmark} from "@material-ui/icons";
import {PATH} from "../../route";


// <div className={`${s.item} ${s.active}`}>
//     <NavLink to={PATH.LOGIN} activeClassName={s.active}>Login</NavLink>
//     <NavLink to={PATH.LOGOUT} activeClassName={s.active}>Logout</NavLink>
//     <NavLink to={PATH.REGISTRATION} activeClassName={s.active}>Registration</NavLink>
//     <NavLink to={PATH.PROFILE} activeClassName={s.active}>Profile</NavLink>
//     <NavLink to={PATH.PASS_RECOVERY} activeClassName={s.active}>Password recovery</NavLink>
//     <NavLink to={PATH.PASS_NEW} activeClassName={s.active}>Entering new password</NavLink>
//     <NavLink to={PATH.TEST} activeClassName={s.active}>Test</NavLink>
//     <NavLink to={PATH.PACKS} activeClassName={s.active}>Packs</NavLink>
//     <NavLink to={'/cards/:id'} activeClassName={s.active}>Cards</NavLink>
//     <NavLink to={'/learn/:id'} activeClassName={s.active}>Learn</NavLink>
// </div>
export const mainListItems = (
    <div>
        <ListItem button>
            <NavLink to='/starting' style={{display: 'flex'}}>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </NavLink>
        </ListItem>
        <ListItem button>
            <NavLink to={PATH.GROUPS} style={{display: 'flex'}}>
                <ListItemIcon>
                    <CollectionsBookmark/>
                </ListItemIcon>
                <ListItemText primary="Groups"/>
            </NavLink>
        </ListItem>
        <ListItem button>
            <NavLink to={PATH.USERS} style={{display: 'flex'}}>
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Users"/>
            </NavLink>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary="Orders"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary="Reports"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary="Integrations"/>
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Current month"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Last quarter"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Year-end sale"/>
        </ListItem>
    </div>
);
