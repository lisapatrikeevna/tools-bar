import React, {useEffect} from 'react'
import './App.css'
import Dashboard from "./ui/components/dashboard/Dashboard";
import {Redirect, Route, Switch} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {authTC} from "./bll/userReduser";
// import Login from "./ui/views/pages/login/Login";


// Pages
const Login = React.lazy(() => import('./ui/views/pages/login/Login'));
const Register = React.lazy(() => import('./ui/views/pages/register/Register'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
function App() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(authTC())
    }, [dispatch])
    const status = useSelector(state => state.users.status)
    if (!status) {return <Redirect to={'/login'}/>}
    // else {return <Redirect to={'/groupsUsers'}/>}

    return (
        <div className="App">
            <React.Suspense fallback={'...loading'}>
                <Switch>
                    <Route exact path="/login" render={() => <Login/>}/>
                    <Route exact path="/register" render={() => <Register/>}/>
                    <Route exact path="/dashboard" render={() => <Dashboard/>}/>
                    {/*<Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />*/}
                    {/*<Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />*/}
                    {/*<Route path="/" name="Home" render={props => <TheLayout {...props}/>} />*/}
                    <Dashboard/>
                </Switch>
            </React.Suspense>
        </div>
    )
}

export default App;
