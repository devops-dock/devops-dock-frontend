import React, { useEffect, useState, createContext, useContext } from 'react'
import useSound from 'use-sound';
import axios from 'axios';
import { MyContext } from '../Timer';
import clickSound from '../../../assets/audio/Mouse_Click.mp3';
import '../Timer.css';
import TimerNav from './TimerNav';
import TimerButtons from './TimerButtons';

export const MyTimerContext = createContext();

const TimerUI = ({ setIsAllChecked, finish, setFinish }) => {
    const { todo, setTodo } = useContext(MyContext);
    const { setCount } = useContext(MyContext);
    const [timer, setTimer] = useState(25 * 60);
    // const [storeTime, setStoreTime] = useState(timer)
    const [timerName, setTimerName] = useState('timer');
    const [isActive, setIsActive] = useState(false);
    const [playSound] = useSound(clickSound);

    useEffect(() => {
        // storeTimerFunction(timer)
        let intervalId;
        let result;

        // check all 'checked' tasks
        if (todo.length !== 0) {
            const checkTodo = todo.filter(t => t.checked === true)
            if (checkTodo.length === todo.length) {
                setIsAllChecked(true)
            }
        }

        if (isActive) {
            intervalId = setInterval(() => {
                setTimer(prev => prev > 0 ? prev - 1 : 0)
            }, 1000);
            if (timer === 0) {
                // increment 'act'
                const newTodo = todo.map(t => {
                    if (t.checked !== true) {
                        return { ...t, act: Number(Number(t.act) + 1) }
                    }
                    return t
                })
                // save in todo
                setTodo(newTodo)
                // search for 'checked' task and push to db 
                const checkedResult = newTodo.filter(t => {
                    if (t.checked === true) {
                        setCount(prev => prev + 1)
                        return t
                    }
                })
                console.log("chck: ", checkedResult)
                if (checkedResult.length !== 0) {
                    result = checkedResult
                    setFinish([...finish, ...result])
                }
                handleStop();
            }
        }
        return () => {
            clearInterval(intervalId)
        }
    }, [isActive, timer])

    useEffect(() => {
        // set date and finished tasks
        sessionStorage.setItem('userTask', JSON.stringify(finish))
        sessionStorage.setItem('date', JSON.stringify(new Date().toLocaleString().split(", ")[0]))

        // user info
        const guser = JSON.parse(sessionStorage.getItem('guser'))
        const user = (guser ? guser : JSON.parse(sessionStorage.getItem('userInfo')))
        // task info
        const task = JSON.parse(sessionStorage.getItem('userTask'))
        const uniqueTaskList = removeDuplicateTasks(task);
        console.log('uni: ', uniqueTaskList)
        if (uniqueTaskList.length !== 0) {
            axios.post("http://localhost:5002/user-tasks", {
                date: JSON.parse(sessionStorage.getItem('date')),
                isFinished: true,
                userData: user,
                userTasks: uniqueTaskList
            }).then(result => console.log(result.data))
        }
    }, [finish])

    function removeDuplicateTasks(task) {
        const uniqueTask = task.filter((obj, index) => index === task.findIndex(o => o.id === obj.id))
        return uniqueTask
    }

    // function storeTimerFunction(t) {
    //     const timeFormat = formatTime(t)
    //     sessionStorage.setItem('timer', timeFormat)
    // }

    const handleStart = () => {
        const stop = document.getElementById('stop');
        stop.style.display = 'inline-block';
        playSound();
        setIsActive(prev => !prev);
    }

    const handleStop = () => {
        playSound();
        if (timer >= 15 * 60) {
            setTimer(25 * 60)
            setIsActive(false)
        } else if (timer >= 1 * 60 && timer <= 15 * 60) {
            setTimer(15 * 60)
            setIsActive(false)
        } else if (timer <= 1 * 60) {
            setTimer(1 * 60)
            setIsActive(false)
        }
        const stop = document.getElementById('stop');
        stop.style.display = 'none';
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60
        const timeFormat = `${String(minutes)}:${String(seconds).padStart(2, '0')}`
        return timeFormat
    }

    return (
        <MyTimerContext.Provider value={{ isActive, setIsActive, setTimer, setTimerName }}>
            <div className='my-2 w-100'>
                {/* timer navigation buttons */}
                <TimerNav />

                {/* Display timer */}
                <h1 className='m-4 text-white fw-semibold display-1'>{formatTime(timer)}</h1>

                {/* Start, Pause, Stop Buttons */}
                <TimerButtons handleStart={handleStart} handleStop={handleStop} />
            </div>
        </MyTimerContext.Provider>
    )
}

export default TimerUI