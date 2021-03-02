import {Dispatch} from "redux";
import {Users} from "./Api";
import * as uuid from 'uuid';
import firebase from "firebase";
import {app} from "../index";
// import {listAllUsers} from "./Api";

type setUsersACType = ReturnType<typeof setUsersAC>
type authACType = ReturnType<typeof authAC>
type setGroupsACType = ReturnType<typeof setGroupsAC>
type addGroupsACType = ReturnType<typeof addGroupsAC>
type deleteGroupsACType = ReturnType<typeof deleteGroupsAC>
type setUserOnGroupACType = ReturnType<typeof setUserOnGroupAC>
type setUserRecordACType = ReturnType<typeof setUserRecordAC>
type loginUserACType = ReturnType<typeof loginUserAC>
type actionType = setUsersACType | setGroupsACType | addGroupsACType | deleteGroupsACType | setUserOnGroupACType |
    setUserRecordACType | authACType | loginUserACType
export type  groupUsersType={
    uid:string
}
type providerDataType = {
    0: { uid: string, email: string, providerId: string }
    length: number
    tokensValidAfterTime: string
}
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
    photoURL?:string
    phoneNumber?:string
    group?:string
    listTasks?: {}
}
export type groupType = {
    id:string
    group:string
    users:groupUsersType[]
}
type initStateType = {
    groups: groupType[]
    users: Array<userType>
    status: boolean
    userRecord:string
    adminUid:string
    message:string
    email:string
    userid:string
}
let initState: initStateType = {
    groups: [],
    users: [],
    status: false,
    userRecord: '',
    adminUid: 'WuVt9TwRQ0grRFpgAKQlB1nJGAm1',
    message: '',
    email:'',
    userid:'',
}

export const userReducer = (state = initState, action: actionType) => {
    switch (action.type) {
        case "USERS/LOGIN_USER":return {...state,email: action.email, userid:action.userid}
        case "USERS/AUTH":
            // console.log(state.status);
            return {...state, status: action.payload}
        case "USERS/SET-USER-RECORD":
            return {...state, userRecord:action.payload, status: true}
        case 'USERS/SET-GROUPS':
            return {...state, groups: action.payload}
        case "USERS/SET-USER-ON-GROUP": {
            // debugger
            console.log('groups: ',state.groups);
            return {
                ...state,
                // groups: [state.groups.map(g => g.group === action.payload.groupName ? g.users[.uid] : g)]
            }
        }
        case 'USERS/SET-USERS':
            // console.log(action.payload)
            return {...state, users: action.payload}
        case 'USERS/ADD-GROUP':
            return {...state, groups: [...state.groups, action.payload]}
        case 'USERS/DELETE-GROUP':
            return {...state, groups:  [state.groups.filter(g=> g.id!==action.payload)] }
        default:
            return {...state}
    }
}
export const authAC = (payload:boolean) =>({type: 'USERS/AUTH',payload}as const)
export const setUsersAC = (payload: any) => ({type: 'USERS/SET-USERS', payload} as const)
export const setUserRecordAC = (payload: string) => ({type: 'USERS/SET-USER-RECORD', payload} as const)
export const setUserOnGroupAC = (payload: {id:string,groupName:string}) => ({type: 'USERS/SET-USER-ON-GROUP', payload} as const)
export const setGroupsAC = (payload: any) => ({type: 'USERS/SET-GROUPS', payload} as const)
export const addGroupsAC = (payload: any) => ({type: 'USERS/ADD-GROUP', payload} as const)
export const deleteGroupsAC = (payload: any) => ({type: 'USERS/DELETE-GROUP', payload} as const)
export const loginUserAC = (email:string,userid:string) => ({type: 'USERS/LOGIN_USER', email,userid} as const)

export const authTC = () => (dispatch: Dispatch) =>{
    // Users.auth()
    //     .then(res=>{
    //     dispatch(authAC(res))
    // })
    app.auth().onAuthStateChanged(function (user:any) {
        console.log('onAuthStateChanged :',user);
        if (user) {
            dispatch(authAC(true))
            dispatch(loginUserAC(user.email, user.uid))
        } else {
            dispatch(authAC(false))
        }
    })
}
export const removeUserTC = (uid:string) => (dispatch: any) =>{
    Users.userRemove(uid).then(res=>{
        dispatch(setUsersTC())
        console.log(res);
    })
}
export const removeGroupsTC = (id:string) => (dispatch: any) =>{
    debugger
    Users.groupRemove(id).then(res=>{
        dispatch(getGroupsTC())
        console.log(res);
    })
}
export const loginUserTC = (email:string,password:string) => (dispatch: any) =>{
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
export const updateUserTC = (uid:string,payload:any) => (dispatch: any) =>{
    Users.updateUser(uid,payload).then(res=>{
        dispatch(setUsersTC())
        console.log(res);
    })
}
export const createUserTC = (email:string,password:string,username:string) => (dispatch: any) =>{
    Users.createUser(email,password,username).then(res=>{
        dispatch(setUserRecordAC(res.data))
        if(res.data.message){alert(res.data.message)}
    })
}
export const setUsersTC = () => (dispatch: Dispatch) => {
    Users.getAllUsers()
        .then(res => {
                dispatch(setUsersAC(res.data))
            }
        ).catch(er=>
        alert(er)
    )
}
export const getGroupsTC = () => (dispatch: Dispatch) => {
    // Users.getGroupsAll()
    Users.getGroups()
        .then(res => {
            console.log(res);
            dispatch(setGroupsAC(res))
            }
        )
}
export const addGroupsTC = ( group: string) => (dispatch: any) => {
    // debugger
    let id= uuid.v1()
    let idGrUser= uuid.v1()
    Users.addGroup( id,group)
    // Users.addGroup( id,group,idGrUser,users)
        .then(res => {
            dispatch(getGroupsTC())
            console.log(res);
        })
}
export const setUserOnGroupTC = ( idGgroup: string,uid:string) => (dispatch: any) => {

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