import {AnyAction, Dispatch} from 'redux'
import {GroupsApi, Tasks, todolistsAPI, TodoslistType} from "./Api";
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import * as uuid from "uuid";
import {
    getGroupByIdTC,
    removeTodolistFromGroupTC,
    setTodolistsForGroupAC,
    setTodolistsForGroupACType
} from "./groupReduser";
import {fetchTasksTC, removeTaskAC} from "./tasksReduser";
import {handleServerNetworkError} from "../utils/error-utils";
// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | setTodolistsForGroupACType>
const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS': {
            //@ts-ignore
            return action.todolists.map(tl => ({...tl.data, filter: 'all', entityStatus: 'idle'}))
        }
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER', id, filter
} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
} as const)
export const setTodolistsAC = (todolists: Array<TodoslistType>) => ({type: 'SET-TODOLISTS', todolists} as const)


// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                debugger
                dispatch(setTodolistsAC(res))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const todolistDeleteTaskTC = (todolistId: string) => (dispatch: Dispatch<any>) => {
    todolistsAPI.deleteTask(todolistId)
        .then(res => {
                dispatch(removeTaskAC(todolistId, todolistId))
                console.log(res);
            }
        ).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const todolistDeleteTC = (todolistId: string) => (dispatch: Dispatch<any>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
            //скажем глобально приложению, что асинхронная операция завершена
            dispatch(setAppStatusAC('succeeded'))
        }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const removeTodolistTC = (id: string, todolistId: string) => (dispatch: Dispatch<any>) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(setAppStatusAC('loading'))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    debugger
    const promise = [
        dispatch(todolistDeleteTaskTC(todolistId)),
        dispatch(todolistDeleteTC(todolistId)),
        dispatch(removeTodolistFromGroupTC(id, todolistId))]
    Promise.all([promise]).then(() => {
        dispatch(fetchTodolistsTC())
        // dispatch(removeTodolistAC(todolistId));
    })
}
const createTodolistTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    let addedDate = new Date().toDateString()
    let order = 0
    todolistsAPI.createTodolist(todoId, title, addedDate, order).then()
}
const addTodoOnGroupTC = (id: string, todoId: string) => (dispatch: Dispatch) => {
    GroupsApi.addTodoOnGroup(id, todoId).then(res => {

    })
}
export const addTodolistTC = (title: string, id: string) => (dispatch: any) => {
    dispatch(setAppStatusAC('loading'))
    let todoId = uuid.v1()
    const promise = [
        dispatch(createTodolistTC(todoId, title)),
        dispatch(addTodoOnGroupTC(id, todoId)),
    ]
    Promise.all([promise]).then(() => {
        dispatch(fetchTodolistsTC())
    }).then(() => {
        dispatch(getGroupByIdTC(id))
        dispatch(setAppStatusAC('succeeded'))
    })
    // todolistsAPI.createTask(todoId).then(res => {
    //     dispatch(fetchTasksTC(todoId))
    //     // console.log(res);
    // })

}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType | any>) => {
    todolistsAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })

}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
export type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>;
export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC> ;

type ActionsType = RemoveTodolistActionType
    | changeTodolistTitleACType | changeTodolistEntityStatusACType
    | changeTodolistFilterACType | SetTodolistsActionType

