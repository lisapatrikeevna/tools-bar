import React from 'react';
import {useDispatch} from "react-redux";
import {removeGroupsTC} from "../../../bll/userReduser";
import cl from "../groupUsers/groupUsers.module.css";

type userType={
    uid: string
    name:string
}
type propsType = {
    id: string
    name: string
    users: userType[]
    // users: [{ uid: string, name:string }]
}
const Group = (props: propsType) => {
    const dispatch = useDispatch()
    const update = () => {    }
    const deleteGroup = () => {
        debugger
        dispatch(removeGroupsTC(props.id))
    }
    let user = props.users?.map(u => <div key={u.uid}>
        {/*<p>{u.uid}</p>*/}
        <span >{u?.name}</span></div>)
    return (
        <div className={cl.box}>
            <div><p>names group: {props.name}</p>
                {/*<button onClick={update}>update</button>*/}
                {/*<button onClick={deleteGroup}>delete</button>*/}
            </div>
            {user && <p>list users:{user}</p>}
            <p>content for group: ...</p>
        </div>
    );
};

export default Group;