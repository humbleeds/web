import React from 'react';
import "../App";
import Clients from './client';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Memberships from './memberships';
import Discounts from './discounts';
import Statistics from './stats';
import Trainers from './trainers';
import Workouts from './workouts';

function Header () {

    return (
        <Router>
        <div className="Header">
            <div className='links'>
            <Link to="/clients">Clients</Link>
            <Link to="/memberships">Memberships</Link>
            <Link to="/trainers">Trainers</Link>
            <Link to="/discounts">Discounts</Link>
            <Link to="/workouts">Workouts</Link>
            <Link to="/statistics">Statistics</Link>
            </div>

            <Switch>
                <Route path="/clients">
                    <Clients />
                </Route>
                <Route path="/memberships">
                    <Memberships />
                </Route>
                <Route path="/trainers">
                    <Trainers />
                </Route>
                <Route path="/discounts">
                    <Discounts />
                </Route>
                <Route path="/workouts">
                    <Workouts />
                </Route>
                <Route path="/statistics">
                    <Statistics />
                </Route>
            </Switch>
        </div>
        </Router>
    )

}

export default Header; 