import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={ () => <Home /> } exact />
            <Route path="/login" component={ () => <Login /> } exact />
        </Switch>
    </BrowserRouter>
)

export default Routes