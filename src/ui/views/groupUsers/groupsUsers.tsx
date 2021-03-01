import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeUserTC, setUserOnGroupTC, setUsersTC, userType} from "../../../bll/userReduser";
import {AppRootStateType} from "../../../bll/store";
import User from "../user/user";
import Group from "../groups/group";
import cl from './groupUsers.module.css';
import Groups from "../groups/groups";

const GroupsUsers = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        // debugger
        dispatch(setUsersTC())
        // const db = admin.database();
        // const ref = db.ref("restricted_access/secret_document");
        // ref.once("value", function(snapshot) {
        //     console.log(snapshot.val());
        // });
    }, [dispatch])
    const removeUser = useCallback(function (uid: string) {
        const action = removeUserTC(uid);
        dispatch(action);
    }, []);
    const addUserToGroup=(uid:string)=>{
        // dispatch(setUserOnGroupTC(uid," idgoup"))
    }
    const allUsers = useSelector<AppRootStateType, Array<userType>>(state => state.users.users)
    const user = allUsers.map(u => <User key={u.uid} group={u.group} name={u.name} date={u.tokensValidAfterTime}
                                         email={u.email} listTasks={u.listTasks} uid={u.uid} removeUser={removeUser}
                                         addUserToGroup={addUserToGroup}/>)

    return (
        <div>
            <h5>all users: </h5>
            <p>пс. чтоб обновить поля( email и name ) даблклик и апдейт</p>
            <div className={cl.wrap}>{user}</div>
            <Groups/>
        </div>
    );
};

export default GroupsUsers;
