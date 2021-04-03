import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType, Users} from "./Api";
import { RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import * as uuid from "uuid";
import {AppRootStateType} from "./store";


export type UpdatedTaskType ={
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    id?: string
    todoListId?: string
    order?: number
    addedDate?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            debugger
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'UPDATE-TASK':
            debugger
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? { ...t,...action.updatedTask} : t)
            }
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, updatedTask: UpdatedTaskType, todolistId: string) =>
    ({type: 'UPDATE-TASK', updatedTask, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
debugger
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            //@ts-ignore
            const tasks = res.data.task
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string,task: TaskType) => (dispatch: Dispatch<ActionsType>) => {
    debugger
    todolistsAPI.deleteTask(todolistId,task)
    // todolistsAPI.deleteTask(taskId,todolistId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    let description= '';
    let  completed = false;
    let status = 0;
    let priority = 0;
    let startDate = new Date().toDateString()
    let deadline = new Date().toDateString() //required(datetime)
    let id = uuid.v1()
    let order = 0;// required(integer)
    let addedDate = new Date().toDateString()
    debugger
    // const item = {description,title,  status, priority, startDate, deadline, id, todoListId, order, addedDate}
    // todolistsAPI.addTask(todoListId, {[id]:item})
    todolistsAPI.addTask(todoListId, {description,title,  status, priority, startDate, deadline, id, todoListId, order, addedDate})
        .then(res => {
            if (res.status=== 200) {
            debugger
            //@ts-ignore
            //     const task = res.data.item
            // console.log(task);
            // const action = addTaskAC(task)
                // dispatch(action)
               dispatch(setAppStatusAC('succeeded'))
            } else {
                // handleServerAppError(res.statusText, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    todolistsAPI.getTasks(todoListId).then(res=>{
        debugger
        //@ts-ignore
        dispatch(setTasksAC(res.data.task,todoListId))
    })
}
export const updateTaskTC = (taskId: string, updatedTask: UpdatedTaskType, todolistId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }
debugger
        const updatedTaskModel: TaskType = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            id: task.id,
            todoListId: task.todoListId,
            order: task.order,
            addedDate: task.addedDate,
            ...updatedTask
        }

        todolistsAPI.updateTask(todolistId, taskId, updatedTaskModel)
            .then(res => {
                if (res.status=== 200) {
                    const action = updateTaskAC(taskId, updatedTask, todolistId)
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }


export const setUsersAC = (payload: any) => ({type: 'SET-USERS', payload} as const)
export const setGroupsAC = (payload: any) => ({type: 'SET-GROUPS', payload} as const)
export const addGroupsAC = (payload: any) => ({type: 'ADD-GROUPS', payload} as const)
//export const setUsersTC = (payload:any) =>({type: 'SET-USERS',payload}as const)
// export const setTasksTC = () => (dispatch:Dispatch) =>{
//   const tasks =firebase.database().ref('tasks')
//   tasks.on('value',(el)=>{
//     dispatch(setUsers(el.val()))
//     // let aaa = el.val()
//     // console.log(aaa);
//   })
// }
export const setUsersTC = () => (dispatch: Dispatch) => {
    Users.getAllUsers()
        .then(res => {
                dispatch(setUsersAC(res.data.users))
            }
        )
}
export const setTasksTC = () => (dispatch: Dispatch) => {
    Users.getAllUsers()
        .then(res => {
                dispatch(setUsersAC(res.data.users))
            }
        )
}
// export const addGroups = (id: string, name: string) => (dispatch: Dispatch) => {
//     debugger
//     Users.addGroup(id, name)
//         .then(res => {
//             debugger
//             dispatch(setGroupsAC(res.data))
//         })
// }