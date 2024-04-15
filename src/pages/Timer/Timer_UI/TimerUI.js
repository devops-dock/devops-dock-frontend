import React, { useEffect, useState, createContext, useContext } from 'react'
import useSound from 'use-sound';
import axios from 'axios';
import { MyContext } from '../Timer';
import clickSound from '../../../assets/audio/Mouse_Click.mp3';
import clockAlarm from '../../../assets/audio/clock-alarm.mp3';
import '../Timer.css';
import TimerNav from './TimerNav';
import TimerButtons from './TimerButtons';

export const MyTimerContext = createContext();

const TimerUI = ({ finish, setFinish }) => {
    const { todo, setTodo } = useContext(MyContext);
    const { setCount } = useContext(MyContext);
    const [timer, setTimer] = useState(25 * 60);
    const [timerName, setTimerName] = useState('timer');
    const [isActive, setIsActive] = useState(false);
    const [playSound1] = useSound(clickSound);
    const [playSound2] = useSound(clockAlarm);

    const [unTask, setUnTask] = useState({});

    useEffect(() => {
        const unCompleteTask = todo.find(t => !t.checked);
        setUnTask({ ...unCompleteTask })
        const newtodo = todo.filter(f => f.checked === true)
        console.log('ne: ', newtodo)
        if(newtodo.length !== 0) {
            setCount(prev => prev + 1)
            setFinish(newtodo)
            if(todo.length === newtodo.length) {
                alert("Yay you completed all tasks !!");
            }
        }
    }, [todo])

    useEffect(() => {
        let intervalId;
        // if active start timer
        if (isActive) {
            // set timer itnerval of 1sec
            intervalId = setInterval(() => {
                setTimer(prev => prev > 0 ? prev - 1 : 0)
            }, 1000);
            // 
            if (timer === 0 && timerName === 'timer') {
                playSound2();
                let newtodo;
                // increase 'act' count if repeated
                newtodo = { ...unTask, act: Number(Number(unTask.act) + 1) }
                setUnTask({ ...newtodo })
                // replace original todos with new "added act" using 'map' function
                const tos = todo.map(item => {
                    if (item.id === newtodo.id) {
                        return newtodo
                    }
                    return item
                });
                setTodo(tos)
                handleStop();
            }
        }
        return () => {
            clearInterval(intervalId)
        }

    }, [isActive, timer])

    useEffect(() => {
        // set date and finished tasks
        sessionStorage.setItem('date', JSON.stringify(new Date().toLocaleString().split(", ")[0]))

        // user info
        const guser = JSON.parse(sessionStorage.getItem('guser'))
        const user = (guser ? guser : JSON.parse(sessionStorage.getItem('userInfo')))
        // task info
        // const uniqueTaskList = removeDuplicateTasks(finish);
        // console.log('unique: ', uniqueTaskList)
        if (finish.length !== 0) {
            axios.post("http://localhost:5002/user-tasks", {
                date: JSON.parse(sessionStorage.getItem('date')),
                isFinished: true,
                userData: user,
                userTasks: finish
            }).then(result => console.log(result.data))
        }
    }, [finish])

    // function removeDuplicateTasks(fin) {
    //     const uniqueTask = fin.filter((obj, index) => index === fin.findIndex(o => o.id === obj.id))     
    //     return uniqueTask
    // }

    const handleStart = () => {
        const stop = document.getElementById('stop');
        stop.style.display = 'inline-block';
        playSound1();
        setIsActive(prev => !prev);
    }

    const handleStop = () => {
        playSound1();
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
            <div className='my-2 w-100 text-center'>
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

export default TimerUI;