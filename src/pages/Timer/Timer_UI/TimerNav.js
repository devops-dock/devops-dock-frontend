import React, { useContext } from 'react'
import { MyContext } from '../Timer';
import Nav from 'react-bootstrap/Nav';
import { MyTimerContext } from './TimerUI';


const TimerNav = () => {
    const { setBg } = useContext(MyContext)
    const { setTimer, setIsActive, setTimerName } = useContext(MyTimerContext);

    const handleSelect = (eventKey) => {
        switch(eventKey) {
            case '1': 
                displayFunction(25 * 60, '#b62525', false, 'timer')   
                break;
            case '2': 
                displayFunction(1 * 60, '#643A6B', false, 'short') 
                break;
            case '3':
                displayFunction(15 * 60, '#005B41', false, 'long') 
                break;
            default: 
                displayFunction(25 * 60, '#b62525', false, 'timer') 
                break;
        }
    }

    function displayFunction(t, color, a, tname) {
        setTimer(t)
        setBg(color)
        setIsActive(a)
        setTimerName(tname)
    }

    return (
        <Nav variant='pills' className='pill justify-content-around align-items-center' id='timer-nav' defaultActiveKey={1} onSelect={handleSelect}>
            <Nav.Item>
                <Nav.Link eventKey='1' className='text-white rounded-pill py-1 px-5'>
                    Timer
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey='2' className='text-white rounded-pill py-1 px-5'>
                    Short Break
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey='3' className='text-white rounded-pill py-1 px-5'>
                    Long Break
                </Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default TimerNav