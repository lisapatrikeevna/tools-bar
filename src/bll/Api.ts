import axios from 'axios'
import {groupUsersType} from "./groupReduser";

const firestore = axios.create({
    // baseURL: 'https://dragan.lisa15.ru/',
    baseURL: 'http://localhost:7563/',
})
const mongodb = axios.create({
    // baseURL: 'https://dragan.lisa15.ru/',
    baseURL: 'http://localhost:5000/',
})

export const GroupsApi = {
    getGroups() {
        return firestore.get<Array<GroupType>>('api/getGroups').then(r => r.data)
    },
    addGroup(id: string, name: string) {
        return firestore.post<ResponseType>('api/createGroup', {id, name})
    },
    groupRemove(id: string) {
        return firestore.delete<ResponseType>(`groupRemove/${id}`)
    },
    getGroupById(id: string) {
        return firestore.get(`api/getGroupById/${id}`).then(r => r.data)
    },
    addUserOnGroup(id: string, user: groupUsersType) {
        return firestore.post<ResponseType>(`api/addUserOnGroup/${id}`, {user})
    },
    addTodoOnGroup(id: string, todoId: string) {
        return firestore.post<ResponseType>(`api/addTodolistsOnGroup/${id}`, {todoId})
    },
    removeUserFromGroup(id: string,{uid, name}: groupUsersType){
        return firestore.put<ResponseType>(`api/deleteUserFromGroup/${id}`, {uid,name})
    },
    removeTodoFromGroup(id: string,todoId:string){
        return firestore.put<ResponseType>(`api/deleteTodoListFromGroup/${id}`, {todoId})
    },
}
export const Users = {
    getAllUsers() {
        //for taskReducer
        return firestore.get('users/1')
    },
    getAllUsersFirestore() {
        return firestore.get<Array<FireBaseResponse<UserType>>>('api/getUsers').then(u => u.data)
    },
    auth() {
        return firestore.get('auth')
    },
    updateUser(uid: string, payload: firestorUpdateUserType) {
        return firestore.put(`userUpdate/${uid}`, {payload})
    },
    userRemove(uid: string) {
        return firestore.delete(`userRemove/${uid}`)
    },
    createUser(email: string, password: string, username: string) {
        return firestore.post(`createUser`, {email, password, displayName: username})
    },
    addUserData(uid: string, id: string, name: string) {
        return firestore.post(`api/addUserData`, {uid, id, name})
    },
    deleteGroupFromUserData(uid: string) {
        return firestore.put(`api/deleteGroupFromUserData/${uid}`)
    },
}

export const todolistsAPI = {
    getTodolists() {
        return  firestore.get<TodoslistType[]>('api/getTodolists').then(r => r.data);
    },
    createTodolist(id:string,title:string,addedDate:string,order:number) {
        return  firestore.post<ResponseType<{ item: TodoslistType }>>('api/todoLists/create', {id,title,addedDate,order});
    },
    deleteTodolist(id: string) {
        return firestore.delete<ResponseType>(`api/deleteTodolist/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return  firestore.put<ResponseType>(`api/getTodolists/${id}`, {title: title});
    },


    getTasks(todolistId: string) {
        return mongodb.get<GetTasksResponse>(`Todolists/${todolistId}/getTasks`);
    },
    // deleteTask(todolistId: string, taskId: string ,task: TaskType) {
    deleteTask( todolistId: string ) {
        debugger
        // return firestore.put<ResponseType>(`Todolists/${todolistId}/removeTasks/${taskId}`,task);
        return mongodb.delete<ResponseType>(`Todolists/${todolistId}/removeTasks`);
    },
    // createTask(todolistId: string) {
    //     // debugger
    //     return firestore.post<ResponseType>(`api/todoLists/create/${todolistId}/tasks`);
    // },
    addTask(todolistId: string, { description,title, status, priority, startDate, deadline, order, addedDate,completed,_id}:TaskType) {
        return mongodb.post<ResponseType>(`Todolists/${todolistId}/addTask`,
            {description,title,  status, priority, startDate, deadline, todolistId, order, addedDate,completed,_id});
    },
    updateTask(todolistId: string, taskId: string, model: TaskType) {
        return mongodb.put<ResponseType>(`Todolists/${todolistId}/udateTasks/${taskId}`, model);
    },

}
export const Tasks = {
    getAllTasks() {
        return firestore.get('users')
    },
    getGroups() {
        // const promise = firestore.get('users');
        // return promise;
        // debugger
        return firestore.get('api/get')
    },
    addTodo(id: string, name: string) {
        debugger
        return firestore.post('api/todoLists/create', {id, name})
    },
    taskRemove(id:string){
        return mongodb.delete(`taskRemove/${id}`)
    }
}

// types

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    _id: string
    todoListId: string
    order: number
    addedDate: string
    completed: boolean
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
    tasks: TaskType[]
}
export type firestorUpdateUserType = {
    email?: string
    phoneNumber?: string
    disabled?:false
    nickName?: string
}
export type TodoslistType = {
    id: string
    data:{
        title: string
        addedDate: string
        order: number
    }
}
export type GroupDataType = {
    group: string
    users: groupUsersType[]
    todoLists: Array<string>
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
export type FerebaseErrorType = {
    code: string
    message: string
}
export type FireBaseResponse<T> = {
    id: string
    data: T
}
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
    status: number
    messages: string
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
type firebasePostResponseType = {
    data:string
    status:number
    statusText:string
}

