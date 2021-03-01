import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addGroupsTC, getGroupsTC, groupType, setUsersTC} from "../../../bll/userReduser";
import {AppRootStateType} from "../../../bll/store";
import Group from "./group";
import {GroupType} from "../../../bll/Api";
import cl from "../groupUsers/groupUsers.module.css";

const Groups = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getGroupsTC())
    }, [dispatch])
    const allGroups = useSelector<AppRootStateType, Array<GroupType>>(state => state.users.groups)
    const group = allGroups.map(g => <Group key={g.id} id={g.id} name={g.data.group}
                                            users={g.data?.users}
    />)
    let [nGroup, setNumGroup] = useState<string>('')
    const setNewGroup = (e: ChangeEvent<HTMLInputElement>) => {
        setNumGroup(e.currentTarget.value)
    }
    const createGroup = () => {
        dispatch(addGroupsTC(nGroup.trim()))
        setNumGroup('')
    }
    return (
        <>
            <p>GroupsUsers:
                <input type="text" value={nGroup} onChange={setNewGroup}/>
                <button onClick={createGroup}>create group</button>
            </p>
            <div className={cl.wrap}>{group}</div>
        </>
    );
};

export default Groups;