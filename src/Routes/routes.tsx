import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from '../Pages/Home';
import { Lab1 } from '../Pages/Lab1';
import { Lab2 } from '../Pages/Lab2';

const RoutesComponent: React.FC = () => {
    return (
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/lab1" Component={Lab1} />
            <Route path="/lab2" Component={Lab2} />
        </Routes>
    )
};

export default RoutesComponent;