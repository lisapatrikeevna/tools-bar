import {applyMiddleware, combineReducers, createStore} from 'redux'
import {userReducer} from "./userReduser";
import thunkMiddleware from "redux-thunk";
import {changeStateReducer} from "./appReduserOld";
import {tasksReducer} from "./tasksReduser";
import {todolistsReducer} from "./todolists-reducer";
import {appReducer} from "./app-reducer";
import {authReducer} from "./authReducer";

const rootReducer = combineReducers({
    users: userReducer,
    nav: changeStateReducer,
    //login: loginReducer
    tasks: tasksReducer,
    todoList: todolistsReducer,
    app: appReducer,
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>;

export default store
