import React, { useEffect} from 'react';
import {useDispatch} from "react-redux";
import Groups from "../groups/groups";
import Users from "../users/users";

const GroupsUsers = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        // debugger
        // const db = admin.database();
        // const ref = db.ref("restricted_access/secret_document");
        // ref.once("value", function(snapshot) {
        //     console.log(snapshot.val());
        // });
    }, [dispatch])

    return (
        <div>
            <Users/>
            <Groups/>
        </div>
    );
};

export default GroupsUsers;
