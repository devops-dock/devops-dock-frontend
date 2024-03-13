import React, { useEffect, useState, useContext } from 'react'
import { MyContext } from '../Timer';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import TList from './TList';

const TNavbar = () => {
    // modal state
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [list, setList] = useState(null);
    // context
    const { count } = useContext(MyContext);

    const user = sessionStorage.getItem('userInfo') ?
        JSON.parse(sessionStorage.getItem('userInfo'))
        : (sessionStorage.getItem('guser')) ?
            JSON.parse(sessionStorage.getItem('guser'))
            : null

    useEffect(() => {
        const getTasks = async () => {
            try {
                await axios.post("http://localhost:5002/tasks", user)
                    .then(result => {
                        setList(result.data)
                    })
            } catch (err) {
                console.log(err.message)
            }
        }
        getTasks()
    }, [count])

    return (
        <div className='mb-4'>
            <Nav className='container-fluid justify-content-md-center flex-nowrap position-absolute top-0 start-0' id='timerNavigation'>
                <Nav.Item>
                    <Nav.Link className='text-white rounded-pill py-1 px-5' onClick={handleShow}>
                        Completed List
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='text-white rounded-pill py-1 px-5'>
                        Report
                    </Nav.Link>
                </Nav.Item>
            </Nav> 

            {/* modal */}
            <TList show={show} setShow={setShow} list={list}/>
        </div>
    )
}

export default TNavbar