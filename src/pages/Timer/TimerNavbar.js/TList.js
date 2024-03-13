import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const TList = ({show, setShow, list}) => {
    const handleClose = () => setShow(false);
    console.log(list)

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Your tasks list</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Focus time</th>
                            <th>Project</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list && list.userTasks.map(t => {
                            return (
                                <tr>
                                    <td>{t.date}</td>
                                    <td>
                                        <ul style={{listStyle: 'none', padding: 0}}>
                                            {t.tasks.map(task => {
                                                return (
                                                    <li key={task.id}>{task.title ? task.title : '-'}</li>
                                                )
                                            })}
                                        </ul>
                                    </td><td>
                                        <ul style={{listStyle: 'none', padding: 0}}>
                                            {t.tasks.map(task => {
                                                return (
                                                    <li key={task.id}>{task.act ? task.act*25 : 0}<span> min</span></li>
                                                )
                                            })}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul style={{listStyle: 'none'}}>
                                            {t.tasks.map(task => {
                                                return (
                                                    <li key={task.id}>{task.project_title ? task.project_title : '-'}</li>
                                                )
                                            })}
                                        </ul>
                                    </td>
                                </tr>
                            )

                        })}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    )
}

export default TList