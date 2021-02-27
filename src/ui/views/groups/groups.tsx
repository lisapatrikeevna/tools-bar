import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {addGroupsTC, getGroupsTC, setUsersTC} from "../../../bll/userReduser";

const Groups = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getGroupsTC())
    }, [dispatch])
    //const allGroups = useSelector<AppRootStateType, Array<groupType>>(state => state.users.groups)
    // const group = allGroups.map(g => <Group key={g.id} id={g.id} name={g.group} users={g.users}/>)
    let [nGroup, setNumGroup] = useState<string>('')
    const setNewGroup = (e: ChangeEvent<HTMLInputElement>) => {
        setNumGroup(e.currentTarget.value)
    }
    const createGroup = () => {
        dispatch(addGroupsTC(nGroup))
        setNumGroup('')
    }
    return (
        <>
            <p>GroupsUsers:
                <input type="text" value={nGroup} onChange={setNewGroup}/>
                <button onClick={createGroup}>create group</button>
            </p>
            {/*<p className={cl.wrap}>{group}</p>*/}
        </>
    );
};

export default Groups;