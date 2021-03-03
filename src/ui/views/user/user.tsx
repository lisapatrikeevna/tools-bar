import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {setUserOnGroupAC, setUserOnGroupTC, updateUserTC, userType} from "../../../bll/userReduser";
import cl from './user.module.css'
import {Button, Input, TextField} from "@material-ui/core";
import {EditableSpan} from "../../common/EditableSpan";

type propsType = {
    uid: string
    name?: string | undefined
    phoneNumber?:string
    date: string
    email: string
    group?: string | undefined
    listTasks?: {} | undefined
    removeUser: (uid: string) => void
    addUserToGroup: (uid: string,groupName:string,name:string) => void
}
const User = (props: propsType) => {
    const dispatch = useDispatch()
    const admin = useSelector<AppRootStateType, string>(state => state.users.adminUid)
    const curentUser = useSelector<AppRootStateType, string>(state => state.users.userid)
    console.log("isAdmin: ",admin===curentUser);
    let [groupName, setGroupName] = useState<string>('')
    let [name, setName] = useState<string>(props.name ? props.name : 'not a name')
    let [email, setEmail] = useState<string>(props.email)
    let [phone, setPhone] = useState<string>(props.phoneNumber ? props.phoneNumber : 'not a phoneNumber')
    const changeEmail = (email: string) => {setEmail(email)}
    const changeName = (name: string) => {setName(name)}
    const changePhone = (phone: string) => {setPhone(phone)}
    const removeUser = () => {props.removeUser(props.uid)}
    // const changePropUser = useCallback((title: string) => {
    //     props.somefunction(props.id, title)
    // }, [props.id, props.somefunction])
    const update =  useCallback(() => {
        let payload = {email, name}
        dispatch(updateUserTC(props.uid, payload))
    },[email, name])
    const addToo = useCallback(() => {
       props.addUserToGroup(props.uid,groupName,name)
        setGroupName('')
    },[groupName])
    const onChaneNameGroup = (e: ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.currentTarget.value)
    }
const styles={
        // display:!admin  ?  'block' : 'none'
}

    return (
        <div key={props.uid} className={cl.userBox} >
            {/*<p>uid:{props.uid}</p>*/}

            {admin !== curentUser && <>
               <> <span>name:</span><h5>{name ? name : 'no name'}</h5></>
               <> <span>email:</span><h5>{props.email}</h5></>
            </>}

            {admin === curentUser &&
            <div style={styles}>
                <div className={cl.spanWrap}><span>email:</span><EditableSpan onChange={changeEmail} value={email}/></div>
                <div className={cl.spanWrap}><span>name:</span><EditableSpan onChange={changeName} value={name}/></div>
                <div className={cl.spanWrap}><span>phoneNumber :</span><EditableSpan onChange={changePhone} value={phone}/></div>
                <div className={cl.spaceBetween}>
                <Button variant="contained" onClick={update}>update</Button>
                <Button variant="contained" onClick={removeUser}>delete</Button>
                </div>
                <hr/>
                <div className={cl.spaceBetween}>
                <TextField  variant='filled' size='small' type="text" value={groupName} placeholder={'add groupName'} onChange={onChaneNameGroup}/>
                <Button onClick={addToo}>add to group</Button>
                </div>
                <hr/>
            </div>
            }
            <p>date :{props.date}</p>
            <p>group:{props.group ? props.group : 'no group'}</p>
            <p>listTasks:{props.listTasks ? props.listTasks : 'no tasks'}</p>
        </div>
    );
};

export default User;

