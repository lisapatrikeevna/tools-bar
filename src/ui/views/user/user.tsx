import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import {setUserOnGroupAC, setUserOnGroupTC, updateUserTC, userType} from "../../../bll/userReduser";
import cl from './user.module.css'
import {Button} from "@material-ui/core";
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
    addUserToGroup: (uid: string) => void
}
const User = (props: propsType) => {
    const dispatch = useDispatch()
    const admin = useSelector<AppRootStateType, string>(state => state.users.adminUid)
    const curentUser = useSelector<AppRootStateType, string>(state => state.users.userid)
    console.log(admin,' ',curentUser);
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
    const update = () => {
        let nickName = name
        let payload = {email, nickName}
        dispatch(updateUserTC(props.uid, payload))
    }
    const addToo = useCallback(() => {
       props.addUserToGroup(props.uid)
        setGroupName('')
    },[])
    const onChaneNameGroup = (e: ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.currentTarget.value)
    }


    return (
        <div key={props.uid} className={cl.userBox} >
            {/*<p>uid:{props.uid}</p>*/}

            {admin !== curentUser && <div>
                <p>name:{name ? name : 'no name'}</p>
                <p>email:{props.email}</p>
            </div>}

            {admin === curentUser &&
            <div>
                <p>email:<EditableSpan onChange={changeEmail} value={email}/></p>
                <p>name:<EditableSpan onChange={changeName} value={phone}/></p>
                <p>phoneNumber :<EditableSpan onChange={changePhone} value={name}/></p>
                <Button variant="contained" onClick={update}>update</Button>
                <Button variant="contained" onClick={removeUser}>delete</Button>
                {/*<hr/>*/}
                {/*<input type="text" value={groupName} placeholder={'add groupName'} onChange={onChaneNameGroup}/>*/}
                {/*<button onClick={addToo}>add to group</button>*/}
                {/*<hr/>*/}
            </div>
            }
            <p>date :{props.date}</p>
            <p>group:{props.group ? props.group : 'no group'}</p>
            <p>listTasks:{props.listTasks ? props.listTasks : 'no tasks'}</p>
        </div>
    );
};

export default User;

