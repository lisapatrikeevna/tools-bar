import {applyMiddleware, combineReducers, createStore} from 'redux'
import {userReducer} from "./userReduser";
import thunkMiddleware from "redux-thunk";
import {changeStateReducer} from "./appReduserOld";
import {tasksReducer} from "./tasksReduser";
import {todolistsReducer} from "./todolists-reducer";
import {appReducer} from "./app-reducer";
import {authReducer} from "./authReducer";
import { groupReducer } from './groupReduser';

const rootReducer = combineReducers({
    groups: groupReducer,
    users: userReducer,
    nav: changeStateReducer,
    tasks: tasksReducer,
    todoList: todolistsReducer,
    app: appReducer,
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>;
//@ts-ignore
window.store=store
export default store
