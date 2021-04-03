import axios from 'axios'
import {groupUsersType} from "./groupReduser";
import {UpdatedTaskType} from "./tasksReduser";

const instance = axios.create({
    // baseURL: 'https://dragan.lisa15.ru/',
    baseURL: 'http://localhost:7563/',
})


export type GroupDataType = {
    group: string
    users: groupUsersType[]
    todoLists: Array<any>
}
export type GroupType = {
    data: GroupDataType
    id: string
}
export type userFirestoreType = {
    id?: string
    name: string
    uid: string
    listTasks?: any
}
export type UserType = {
    user: userFirestoreType
}
export type FireBaseResponse<T> = {
    id: string
    data: T
}
export const GroupsApi = {
    getGroups() {
        return instance.get<Array<GroupType>>('api/getGroups').then(r => r.data)
    },
    addGroup(id: string, name: string) {
        return instance.post('api/createGroup', {id, name})
    },
    groupRemove(id: string) {
        return instance.delete(`groupRemove/${id}`)
    },
    getGroupById(id: string) {
        return instance.get(`api/getGroupById/${id}`).then(r => r.data)
    },
    addUserOnGroup(id: string, user: groupUsersType) {
        return instance.post(`api/addUserOnGroup/${id}`, {user})
    },
    addTodoOnGroup(id: string, todoId: string) {
        return instance.post(`api/addTodolistsOnGroup/${id}`, {todoId})
    },
    removeUserFromGroup(id: string,{uid, name}: groupUsersType){
        return instance.put(`api/deleteUserFromGroup/${id}`, {uid,name})
    },
    removeTodoFromGroup(id: string,todoId:string){
        return instance.put(`api/deleteTodoListFromGroup/${id}`, {todoId})
    },
}
export const Users = {
    getAllUsers() {
        return instance.get('users/1')
    },
    getAllUsersFirestore() {
        return instance.get<Array<FireBaseResponse<UserType>>>('api/getUsers').then(u => u.data)
    },
    auth() {
        return instance.get('auth')
    },
    updateUser(uid: string, payload: { email?: string, phoneNumber?: string,disabled?:false, nickName?: string }) {
        return instance.put(`userUpdate/${uid}`, {payload})
    },
    userRemove(uid: string) {
        return instance.delete(`userRemove/${uid}`)
    },
    createUser(email: string, password: string, username: string) {
        return instance.post(`createUser`, {email, password, displayName: username})
    },
    addUserData(uid: string, id: string, name: string) {
        return instance.post(`api/addUserData`, {uid, id, name})
    },
    deleteGroupFromUserData(uid: string) {
        return instance.put(`api/deleteGroupFromUserData/${uid}`)
    },
}
export type TodoslistType = {
    id: string
    data:{
        title: string
        addedDate: string
        order: number
    }
}
export type taskFirebaseType={
   [ id:string]: TaskType
}
export const todolistsAPI = {
    getTodolists() {
        return  instance.get<TodoslistType[]>('api/getTodolists').then(r => r.data);
    },
    createTodolist(id:string,title:string,addedDate:string,order:number) {
        return  instance.post<ResponseType<{ item: TodoslistType }>>('api/todoLists/create', {id,title,addedDate,order});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`api/deleteTodolist/${id}`);
    },

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`api/getTodolists/${todolistId}/tasks`);
    },
    // deleteTask(taskId: string,todolistId: string) {
    deleteTask(todolistId: string,task: TaskType) {
        //!!!!!!!
        debugger
        return instance.put<ResponseType>(`api/Todolists/${todolistId}/removeTasks`,task);
    },
    createTask(todolistId: string) {
        // debugger
        return instance.post<ResponseType>(`api/todoLists/create/${todolistId}/tasks`);
    },
    addTask(todolistId: string, { description,title, status, priority, startDate, deadline, id, todoListId, order, addedDate}:TaskType) {
       // debugger
        return instance.post<firebasePostResponseType>(`api/todoLists/add/${todolistId}/tasks`, {description,title,  status, priority, startDate, deadline, id, todolistId, order, addedDate});
    },
    // addTask(todolistId: string, data:taskFirebaseType) {
    //     debugger
    //     return instance.post<firebasePostResponseType>(`api/todoLists/add/${todolistId}/tasks`, data);
    // },
//dont used
    updateTask(todolistId: string, taskId: string, model: TaskType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/udateTasks/${taskId}`, model);
    },
    updateTodolist(id: string, title: string) {
        const promise = instance.put<ResponseType>(`api/getTodolists/${id}`, {title: title});
        return promise;
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
        return instance.get('api/get')
    },
    addTodo(id: string, name: string) {
        debugger
        return instance.post('api/todoLists/create', {id, name})
    },
    taskRemove(id:string){
        return instance.delete(`taskRemove/${id}`)
    }
}

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

export type ResponseType<D = {}> = {
    // resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data?: D
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
    // error: string | null
    // totalCount: number
    // task: TaskType[]
}
type firebasePostResponseType = {
    data:string
    status:number
    statusText:string
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
//           console.log('users', userRecord.toJSON());
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
