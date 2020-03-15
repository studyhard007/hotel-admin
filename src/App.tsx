import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {HashRouterProps} from 'react-router-dom'
import "./App.less";
import Layout from './Pages/Layout/index'
import Login from './Pages/Login/index'
class CRouter extends React.Component<HashRouterProps> {
    render() {
        return (
            <div style= {{height: '100%'}}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route path='/app' component={Layout}/>
                        <Route path='/login' component={Login}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default CRouter