import React from 'react';
import './App.css';

import Chart from './chart/chart'
import Table from './table/table'
import Map from './map/map'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                <ul>
                    <li>
                    <Link to="/">Chart</Link>
                    </li>
                    <li>
                    <Link to="/table">Table</Link>
                    </li>
                    <li>
                    <Link to="/map">Map</Link>
                    </li>
                </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                <Route path="/table">
                    <Table />
                </Route>
                <Route path="/map">
                    <Map />
                </Route>
                <Route path="/">
                    <Chart/>
                </Route>
                </Switch>
            </div>
        </Router>

    );
}

export default App;
