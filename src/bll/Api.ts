import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://dragan.lisa15.ru/',
    // baseURL: 'http://localhost:7563/',
    // baseURL: 'https:/',
})
export type GroupDataType = {
    first?: string
    group: string
    last?: string
    users?:[]
}
export type GroupType = {
    data: GroupDataType
    id: string
}
export const Users = {
    getAllUsers() {
        return instance.get('users')
    },
    getGroups() {
        return instance.get<Array<GroupType>>('api/getGroups').then(r => r.data)
    },
    auth() {
        return instance.get('auth')
    },
    // addGroup(id: string, name: string,idGrUser:string,users:string) {
    addGroup(id: string, name: string) {
        // debugger
        return instance.post('api/createGroup', {id, name})
    },
    updateUser(uid: string, payload: { email?: string,phoneNumber?: string, nickName?: string }) {
        return instance.put(`userUpdate/${uid}`, {payload})
    },
    userRemove(uid: string) {
        // @ts-ignore
        return instance.delete(`userRemove/${uid}`)
    },
    createUser(email: string, password: string, username: string) {
        return instance.post(`createUser`, {email, password, displayName: username})
    },
    groupRemove(id: string) {
        return instance.delete(`groupRemove/${id}`)
    },
    addUserOnGroup(id: string,uid:string,name:string) {
        return instance.put(`api/addUserOnGroup/${id},{uid,name}`)
    },
    addUserData(id: string,uid:string,name:string) {
        return instance.post(`api/addUserData,{}`)
    },
}
export const Tasks = {
    getAllTasks() {
        // const promise = instance.get('users');
        // return promise;
        // debugger
        return instance.get('users')
    },
    getGroups() {
        // const promise = instance.get('users');
        // return promise;
        // debugger
        return instance.get('/api/get')
    },
    addTodo(id: string, name: string) {
        debugger
        return instance.post('api/create', {id, name})
    }
}

//import * as admin from 'firebase-admin';
//const serviceAccount = require("../fir-silky-firebase-adminsdk-6l12p-2bc5e41df4.json");


//const app = admin.initializeApp();
// admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//   //credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://fir-silky-default-rtdb.europe-west1.firebasedatabase.app"
// });
// const adminId = 'lisa-fox'
// admin.auth().createCustomToken(adminId)
//     .then((customToken)=>{
//       console.log(customToken);
//     })
//     .catch((error)=>{
//       console.log(error);
//     })

//https://firebase.google.com/docs/cloud-messaging/auth-server
//!!!!! https://firebase.google.com/docs/auth/admin/manage-users
//https://firebase.google.com/docs/database/admin/start/?hl=ru-ru#node.js
// export const listAllUsers = (nextPageToken) => {
//   // List batch of users, 1000 at a time.
//   admin
//       .auth()
//       .listUsers(1000, nextPageToken)
//       .then((listUsersResult) => {
//           debugger
//         listUsersResult.users.forEach((userRecord) => {
//           console.log('user', userRecord.toJSON());
//         });
//         if (listUsersResult.pageToken) {
//           // List next batch of users.
//           listAllUsers(listUsersResult.pageToken);
//         }
//       })
//       .catch((error) => {
//         console.log('Error listing users:', error);
//       });
//};
// Start listing users from the beginning, 1000 at a time.
//listAllUsers();
//delet "firebase": "^8.2.6",

//const serviceAccount = require("path/to/serviceAccountKey.json");
// export const firebaseConfig={
//   apiKey: "AIzaSyDGqV4nDHMokspRbNj9OufL531PwdNB2sc",
//   authDomain: "fir-silky.firebaseapp.com",
//   databaseURL: "https://fir-silky-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "fir-silky",
//   storageBucket: "fir-silky.appspot.com",
//   messagingSenderId: "459950163847",
//   appId: "1:459950163847:web:2f94e0b34b0c77d10cb522"
// }

// types
export type LoginParamsType = {
    password: string
    email: string
    rememberMy?: boolean
}
export type myResponseType = {
    id: number
    email: string
    login: string
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
