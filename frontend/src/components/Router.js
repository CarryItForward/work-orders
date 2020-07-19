import React from "react";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import * as firebase from 'firebase/app';

import Authentication from '../pages/Authentication'
import Home from '../pages/Home'
import Person from "../pages/Person";

export default function Router() {
    return (
        <Switch>
            <AuthenticationRoute exact path="/login">
                <Authentication/>
            </AuthenticationRoute>
            <Route exact path="/person">
                <Person/>
            </Route>
            <PrivateRoute exact path="/">
                <Home/>
            </PrivateRoute>
        </Switch>
    )
}

function PrivateRoute({children, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                firebase.auth().currentUser ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

function AuthenticationRoute({children, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                !firebase.auth().currentUser ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}
