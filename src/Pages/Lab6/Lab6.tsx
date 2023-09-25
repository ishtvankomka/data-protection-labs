import React from 'react';
import { Task1 } from './Tasks/Task1';
import { Task2 } from './Tasks/Task2';
import { Task3 } from './Tasks/Task3';


export const Lab6: React.FC = () => {
    return (
        <div className='lab'>
            <h1>Lab 6</h1>
            <Task1 />
            <Task2 />
            <Task3 />
        </div>
    )
}