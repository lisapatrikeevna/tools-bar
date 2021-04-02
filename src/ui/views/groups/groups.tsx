import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import Group from "./group";
import {GroupType} from "../../../bll/Api";
import cl from "../groupUsers/groupUsers.module.css";
import {addGroupsTC, getGroupsTC} from "../../../bll/groupReduser";
import DenseTable from "./tableGroup";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    table: {
        minWidth: 650,
    },
}));
const Groups = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getGroupsTC())
    }, [dispatch])
    const allGroups = useSelector<AppRootStateType, Array<GroupType>>(state => state.groups.groups)
    let [nGroup, setNumGroup] = useState<string>('')
    const setNewGroup = (e: ChangeEvent<HTMLInputElement>) => {
        setNumGroup(e.currentTarget.value)
    }
    const createGroup = () => {
        dispatch(addGroupsTC(nGroup.trim()))
        setNumGroup('')
    }
    const group = allGroups.map(g => <Group key={g.id} id={g.id} name={g.data.group}
                                                  users={g.data.users}/>)
    const classes = useStyles();
    return (
        <>
            <p>GroupsUsers:
                <input type="text" value={nGroup} onChange={setNewGroup}/>
                <button onClick={createGroup}>create group</button>
            </p>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Users (lists)</TableCell>
                            <TableCell align="right">Names group</TableCell>
                            {/*<TableCell align="right">Fat&nbsp;(g)</TableCell>*/}
                            <TableCell align="right">buttons group&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {group}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};


export default Groups;

