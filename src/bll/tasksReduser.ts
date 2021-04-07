import {Dispatch} from "redux";
import {TaskPriorities, Tasks, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType, Users} from "./Api";
import {RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import * as uuid from "uuid";
import {AppRootStateType} from "./store";
import { v1 } from "uuid";


export type UpdatedTaskType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    _id?: string
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
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t._id !== action.taskId)}
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t._id === action.taskId ? {...t, ...action.updatedTask} : t)
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
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | any>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.tasks
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        }).catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}
// export const removeTaskTC = (taskId: string, todolistId: string, task: TaskType) => (dispatch: Dispatch<ActionsType| SetAppErrorActionType | SetAppStatusActionType >) => {
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType| SetAppErrorActionType | SetAppStatusActionType >) => {
    dispatch(setAppStatusAC('loading'))
    // todolistsAPI.deleteTask(todolistId, taskId, task)
    Tasks.taskRemove(taskId)
        .then(res => {
            if (res.status === 200) {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                // handleServerAppError(, dispatch);
            }
        }).catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}
export const addTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType | any> ) => {
    dispatch(setAppStatusAC('loading'))
    let _id = v1();
    let description = '';
    let completed = false;
    let status = 0;
    let priority = 0;
    let startDate = new Date().toDateString()
    let deadline = new Date().toDateString() //required(datetime)
    let order = 0;// required(integer)
    let addedDate = new Date().toDateString()
    const task = {
        description, title, status, priority, startDate, deadline,
        todoListId, order, addedDate, completed, _id
    }
    todolistsAPI.addTask(todoListId, {
        description, title, status, priority, startDate, deadline,
        todoListId, order, addedDate,completed,_id
    })
        .then(res => {
            if (res.status === 200) {
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                // handleServerAppError(, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (taskId: string, updatedTask: UpdatedTaskType, todolistId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t._id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }
        const updatedTaskModel: TaskType = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            _id: task._id,
            todoListId: task.todoListId,
            order: task.order,
            addedDate: task.addedDate,
            completed: task.completed,
            ...updatedTask
        }

        todolistsAPI.updateTask(todolistId, taskId, updatedTaskModel)
            .then(res => {
                if (res.status === 200) {
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