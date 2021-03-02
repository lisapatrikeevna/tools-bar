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
    users?: userType[]
    // users?: []
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
            <div><><h5>names group:</h5><p> {props.name}</p></>
                {/*<button onClick={update}>update</button>*/}
                {/*<button onClick={deleteGroup}>delete</button>*/}
            </div>
            {user && <><h5>list users:</h5><p>{user}</p></>}
            <h5>content for group: ...</h5>
        </div>
    );
};

export default Group;