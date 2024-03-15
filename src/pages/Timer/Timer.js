import React, { useState, createContext } from 'react';
import TaskUI from './Tasks_UI/TaskUI';
import TNavbar from './TimerNavbar.js/TNavbar';
import TimerUI from './Timer_UI/TimerUI';
import Dropdown from 'react-bootstrap/Dropdown';
import './Timer.css';

export const MyContext = createContext();

const Timer = () => {
    const [todo, setTodo] = useState([]);
    const [count, setCount] = useState(0);
    // const [isAllChecked, setIsAllChecked] = useState(false);
    const [finish, setFinish] = useState([]);
    const [bg, setBg] = useState('#D24545');

    const handleAddTask = () => {
        let taskform = document.getElementById('taskform');
        let addBtn = document.getElementById('addBtn');
        let formElement = document.getElementById('formElement');
        taskform.style.display = 'block';
        formElement.style.display = 'block';
        addBtn.style.display = 'none';
    }

    const handleClearTask = () => {
        const newTodo = todo.filter(t => t.checked !== true)
        setTodo(newTodo)
    }

    const handleClearAll = () => {
        setTodo([])
    }
    
    // const handleCheckAllSubmit = () => {
    //     setIsAllChecked(false)
    //     const result = todo
    //     console.log(todo)
    //     setFinish([...finish, ...result])
    // }

    return (
        <MyContext.Provider value={{ todo, setTodo, count, setCount, setBg }}>
            <main className='container-fluid py-5 m-0 timer-container position-relative' style={{ backgroundColor: bg }}>
                <TNavbar />
                
                <div className='container mx-auto timerApp' style={{ backgroundColor: bg }}>
                    <TimerUI 
                        // isAllChecked={isAllChecked} 
                        // setIsAllChecked={setIsAllChecked}
                        finish={finish}
                        setFinish={setFinish}   
                    />

                    <div className='d-flex align-items-center flex-row justify-content-between mt-4 mx-auto w-75'>
                        <h4 className='text-white'>Tasks</h4>
                        <Dropdown>
                            <Dropdown.Toggle variant="none" className='text-white fw-bold'>. . .</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleClearTask}>Clear Finished Task</Dropdown.Item>
                                <Dropdown.Item onClick={handleClearAll}>Clear All tasks</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <hr className='w-75 mx-auto text-white' />
                    
                    <TaskUI />

                    {/* if checked all */}
                    {/* {isAllChecked ? 
                        <div className='text-md-end mx-5 mt-3' id='task-btn'>
                            <button className='btn btn-dark' type='submit' onClick={handleCheckAllSubmit}>Save All</button>
                        </div>
                    : null 
                    } */}

                    {/* Add task Button */}
                    <button className='btn px-5 py-2 my-3 mx-auto text-white fw-bold' id='addBtn' onClick={handleAddTask}>
                        Add Tasks
                    </button>

                    {/* Finish Button */}
                    <div className='text-start' id='finish'>
                        <p className='text-white p-3 fw-bold border border-1' onClick={handleAddTask}>
                            Finished: {count === 0 ? 0 : count} task completed
                        </p>
                    </div>
                </div>
            </main>
        </MyContext.Provider>
    )
}

export default Timer