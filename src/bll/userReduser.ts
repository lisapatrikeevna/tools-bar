import {Dispatch} from "redux";
import {FireBaseResponse, GroupsApi, GroupType, Users, UserType} from "./Api";
import firebase from "firebase";
import {app} from "../index";
import {getGroupsTC, groupUsersType, setGroupsACType} from "./groupReduser";

type setUsersACType = ReturnType<typeof setUsersAC>
type authACType = ReturnType<typeof authAC>
type setUserAdditionalInformationACType = ReturnType<typeof setUserAdditionalInformationAC>
type setUserRecordACType = ReturnType<typeof setUserRecordAC>
type loginUserACType = ReturnType<typeof loginUserAC>
type actionType = setUsersACType | setUserAdditionalInformationACType
    | setUserRecordACType | authACType | loginUserACType | setGroupsACType

// type providerDataType = {
//     0: { uid: string, email: string, providerId: string }
//     length: number
//     tokensValidAfterTime: string
// }
export type userType = {
    disabled: boolean
    displayName: string
    email: string
    emailVerified: boolean
    metadata: { lastSignInTime: string, creationTime: string }
    passwordHash: string
    passwordSalt: string
    providerData: any
    tokensValidAfterTime: string
    uid: string
    photoURL?: string
    phoneNumber?: string
    group: string | null
    listTasks?: {}
}

type initStateType = {
    groups: GroupType[]
    users: Array<userType>
    status: boolean
    userRecord: string
    adminUid: string
    message: string
    email: string
    userid: string
}

let initState: initStateType = {
    groups: [],
    users: [],
    status: false,
    userRecord: '',
    adminUid: 'WuVt9TwRQ0grRFpgAKQlB1nJGAm1',
    message: '',
    email: '',
    userid: '',
}

export const userReducer = (state = initState, action: actionType) => {
    switch (action.type) {
        case "USERS/LOGIN_USER":
            return {...state, email: action.email, userid: action.userid}
        case "USERS/AUTH":
            return {...state, status: action.payload}
        case "USERS/SET-USER-RECORD":
            return {...state, userRecord: action.payload, status: true}
        case 'GROUP/SET-GROUPS':
            return {...state, groups: action.payload}
        case 'USERS/SET-USERS':
            return {...state, users: action.payload}
        case "USERS/SET-USER-INFORMATION": {
            return {
                ...state,
                users: state.users.map(u => {
                    const currentUser = action.payload.find((currentUser) => u.uid === currentUser.id)
                    if (currentUser) {
                        const group = state.groups.find(group => group.id === currentUser.data.user.id)
                        return {
                            ...u, group: group?.data.group, listTasks: currentUser.data.user.listTasks
                        }
                    } else {
                        return u
                    }
                })
            }
        }
        default:
            return {...state}
    }
}
export const authAC = (payload: boolean) => ({type: 'USERS/AUTH', payload} as const)
export const setUsersAC = (payload: any) => ({type: 'USERS/SET-USERS', payload} as const)
export const setUserRecordAC = (payload: string) => ({type: 'USERS/SET-USER-RECORD', payload} as const)
export const setUserAdditionalInformationAC = (payload: Array<FireBaseResponse<UserType>>) => ({
    type: 'USERS/SET-USER-INFORMATION', payload} as const)
export const loginUserAC = (email: string, userid: string) => ({type: 'USERS/LOGIN_USER', email, userid} as const)

//TC
export const authTC = () => (dispatch: Dispatch) => {
    app.auth().onAuthStateChanged(function (user: any) {
        // console.log('onAuthStateChanged :', user);
        if (user) {
            dispatch(authAC(true))
            dispatch(loginUserAC(user.email, user.uid))
        } else {
            dispatch(authAC(false))
        }
    })
}
export const removeUserTC = (uid: string) => (dispatch: any) => {
    Users.userRemove(uid).then(res => {
        dispatch(setUsersTC())
        console.log(res);
    })
}
export const updateUserTC = (uid: string, payload: any) => (dispatch: any) => {
    Users.updateUser(uid, payload).then(res => {
        dispatch(setUsersTC())
        console.log(res);
    })
}
export const createUserTC = (email: string, password: string, username: string) => (dispatch: any) => {
    Users.createUser(email, password, username).then(res => {
        dispatch(setUserRecordAC(res.data))
        if (res.data.message) {
            alert(res.data.message)
        }
    })
}
export const setUsersTC = () => async (dispatch: Dispatch) => {
    try {
        const users = await Users.getAllUsers()
        const infoUser = await Users.getAllUsersFirestore()
        dispatch(setUsersAC(users.data))
        dispatch(setUserAdditionalInformationAC(infoUser))
    } catch (e) {
        console.log(e)
    }
}
export const getAllUsersFirestoreTC = () => (dispatch: Dispatch) => {
    Users.getAllUsersFirestore().then(res => {
        // console.log('Users.getAllUsersFirestore' + res);
        dispatch(setUserAdditionalInformationAC(res))
    })
}
export const setUserOnGroupTC = (id: string, uid: string, userName: string, user: groupUsersType) =>
    (dispatch: any) => {
    debugger
        // Users.addUserOnGroup(id, uid, userName).then(res => {
        GroupsApi.addUserOnGroup(id, user).then(res => {
            dispatch(getGroupsTC())
        })
        Users.addUserData(uid, id, userName).then(res => {
            // console.log("setUserOnGroupTC: ", res);
            debugger
            dispatch(getAllUsersFirestoreTC())
        })
    }
export const loginUserTC = (email: string, password: string) => (dispatch: any) => {
    app.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            dispatch(authAC(true))
            dispatch(setUsersTC())
            // console.log(res);
        })
        .catch(er => {
            console.log(er);
        })
}
export const signOutTC = () => (dispatch: Dispatch) => {
    firebase.auth().signOut().then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    });
}


// export const addItemTC = ( group: string) => (dispatch: Dispatch) => {
// // export const addGroupsTC = (id: string, group: string) => (dispatch: Dispatch) => {
//     debugger
//     // dispatch(setGroupsAC({id,group}))
//
//     Users.addGroup(group)
//         .then(res => {
//             debugger
//
//            dispatch(setGroupsAC(res.data))
//            // dispatch(setGroupsAC({id,name}))
//         })
// }