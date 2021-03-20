import {Dispatch} from 'redux'
import {todolistsAPI, TodoslistType} from "./Api";
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import * as uuid from "uuid";
// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    addedDate?: string
    order?: number
}
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType>
const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        // case 'REMOVE-TODOLIST':
        //     return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            // return [{...action.todolist.data, filter: 'all', entityStatus: 'idle'}, ...state]
        // case 'CHANGE-TODOLIST-TITLE':
        //     return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        // case 'CHANGE-TODOLIST-FILTER':
        //     return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        // case 'CHANGE-TODOLIST-ENTITY-STATUS':
        //     return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS': {
            // debugger
            // console.log(action.todolists);
            //@ts-ignore
            return  action.todolists.map(tl => ({...tl.data,  filter: 'all', entityStatus: 'idle'}))
            // ({...tl.data, filter: 'all', entityStatus: 'idle'})
        }
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodoslistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status } as const)
export const setTodolistsAC = (todolists: Array<TodoslistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
// export const setTodolistsAC = (todolists: Array<TodoslistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        debugger
        todolistsAPI.getTodolists()
            .then((res) => {
                //@ts-ignore
                console.log('getTodolists: '+res);
                dispatch(setTodolistsAC(res))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
    // 0:
    // data: {title: " test title", order: 1}
    // id: "Wf5jrMHWmpWnOveyeqAY"
    // __proto__: Object
    // 1:
    // data:
    //     ttt:
    //         " addedDate": "uuuuuuuuuuuuu"
    // " id: ": "ggggggggg"
    // order: 2
    // title:: "yyyyyyyyyyy"
}
// export const removeTodolistTC = (todolistId: string) => {
//     return (dispatch: ThunkDispatch) => {
//         //изменим глобальный статус приложения, чтобы вверху полоса побежала
//         dispatch(setAppStatusAC('loading'))
//         //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
//         dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
//         todolistsAPI.deleteTodolist(todolistId)
//             .then((res) => {
//                 dispatch(removeTodolistAC(todolistId))
//                 //скажем глобально приложению, что асинхронная операция завершена
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }
export const addTodolistTC = (title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        let id = uuid.v1()
        let addedDate= new Date().toDateString()
        let order= 0
        debugger
        todolistsAPI.createTodolist(id,title,addedDate,order)
            .then((res) => {
                console.log(res.data);
                // dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
// export const changeTodolistTitleTC = (id: string, title: string) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         todolistsAPI.updateTodolist(id, title)
//             .then((res) => {
//                 dispatch(changeTodolistTitleAC(id, title))
//             })
//     }
// }

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
export type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>;
export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC> ;
type ActionsType =  RemoveTodolistActionType | AddTodolistActionType
    | changeTodolistTitleACType | changeTodolistEntityStatusACType
    | changeTodolistFilterACType | SetTodolistsActionType

