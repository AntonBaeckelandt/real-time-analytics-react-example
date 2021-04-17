import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import DashboardScreen from "./dashboard/components/DashboardSceen";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={DashboardScreen}/>
            </div>
        </BrowserRouter>);
}

export default App;
