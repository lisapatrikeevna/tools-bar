import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {PATH} from "../../route";
import {groupUsersType, removeGroupsTC} from "../../../bll/groupReduser";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';


type propsType = {
    id: string
    name: string
    users?: groupUsersType[]
}
const Group = React.memo((props: propsType) => {
    const dispatch = useDispatch()
    const deleteGroup = useCallback(() => {
        dispatch(removeGroupsTC(props.id))
    }, [props.id])
    let user = props.users?.map(u => <div key={u.uid}>
        {/*<p>{u.uid}</p>*/}
        <span>{u.name}</span></div>)
    return (<>
            <TableRow key={props.id}>
                <TableCell component="th" scope="row">{user}</TableCell>
                <TableCell align="right">
                    {props.name}
                </TableCell>
                <TableCell align="right">
                    <NavLink to={PATH.PAGEGROUP.getUrl(props.id)}><BorderColorIcon/></NavLink>
                    <DeleteIcon onClick={deleteGroup} color='primary'/>
                </TableCell>
            </TableRow>
        </>
    )
})

export default Group;