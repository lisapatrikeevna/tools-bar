import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {setUserOnGroupAC, updateUserTC, userType} from "../../../bll/userReduser";
import cl from './user.module.css'
import {Button} from "@material-ui/core";
import {EditableSpan} from "../../common/EditableSpan";

type propsType = {
    uid: string
    name?: string | undefined
    date: string
    email: string
    group?: string | undefined
    listTasks?: {} | undefined
    removeUser: (uid: string) => void
}
const User = (props: propsType) => {
    const dispatch = useDispatch()
    let [groupName, setGroupName] = useState<string>('')
    let [name, setName] = useState<string >(props.name? props.name : 'not a name')
    let [email, setEmail] = useState<string >(props.email)
    const changeEmail = (email:string) => {
        setEmail(email)
    }
    const changeName = (name:string) => {
        setName(name)
    }
    const removeUser = () => {
        props.removeUser(props.uid)
    }
    // const changePropUser = useCallback((title: string) => {
    //     props.somefunction(props.id, title)
    // }, [props.id, props.somefunction])
    const update = () => {
        let nickName= name
        let payload = {email,nickName}
        debugger
        dispatch(updateUserTC(props.uid, payload))
    }
    const addToo = () => {
        debugger
        let id = props.uid
        let payload = {id, groupName}
        dispatch(setUserOnGroupAC(payload))
        setGroupName('')
    }
    const onChaneNameGroup = (e: ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.currentTarget.value)
    }


    return (
        <div key={props.uid} className={cl.userBox}>
            <p>uid:{props.uid}</p>
            {/*<p>name:{name ? name : 'no name'}<input type="text"/></p>*/}
            <p>name:<EditableSpan onChange={changeName} value={name}/></p>
            <p>date :{props.date}</p>
            <p>email:<EditableSpan onChange={changeEmail} value={email}/></p>
            <p>group:{props.group ? props.group : 'no group'}</p>
            <p>listTasks:{props.listTasks ? props.listTasks : 'no tasks'}</p>
            <hr/>
            {/*<input type="text" value={groupName} placeholder={'add groupName'} onChange={onChaneNameGroup}/>*/}
            {/*<button onClick={addToo}>add to group</button>*/}
            <hr/>
            <Button variant="contained"  onClick={update}>update</Button>
            <Button variant="contained"  onClick={removeUser}>delete</Button>
        </div>
    );
};

export default User;

