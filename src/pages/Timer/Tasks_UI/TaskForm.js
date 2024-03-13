import React, { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import TaskList from './TaskList';
import { MyContext } from '../Timer';
import '../Timer.css';

const TaskForm = () => {
    const { todo } = useContext(MyContext);
    const { setTodo } = useContext(MyContext);

    const [noteOpen, setNoteOpen] = useState(false);
    const [projectOpen, setProjectOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const [form, setForm] = useState({
        id: todo.length,
        title: '',
        description: '',
        project_title: '',
        act: 0,
        checked: false
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodo([...todo, form]);
        console.log(form)
        setForm({
            id: todo.length + 1,
            title: '',
            description: '',
            project_title: '',
            act: 0,
            checked: false
        });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(form)
        const newTodo = todo.map(i => {
            if(i.id === form.id) {
                const updateForm = form;
                return updateForm
            }
            return i
        })
        setTodo(newTodo)
        setIsUpdate(false)
        setForm({
            id: todo.length + 1,
            title: '',
            description: '',
            project_title: '',
            checked: false
        })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        let taskform = document.getElementById('taskform');
        let addBtn = document.getElementById('addBtn');
        addBtn.style.display = 'block';
        taskform.style.display = 'none';
    }

    const handleChecked = (id) => {
        const updatedCheck = todo.map(t => t.id === id ? { ...t, checked: !t.checked } : t)
        setTodo(updatedCheck)
    }

    const handleDelete = (id) => {
        const updateTodo = todo.filter(t => t.id !== id)
        setTodo(updateTodo)
    }

    const handleEdit = (id) => {
        setIsUpdate(true);
        let taskform = document.getElementById('taskform');
        taskform.style.display = 'block';
        const editData = todo.filter(t => t.id === id)
        if (editData) {
            setForm({
                ...form,
                id: editData[0].id,
                title: editData[0].title ? editData[0].title : '',
                project_title: editData[0].project_title ? editData[0].project_title : '',
                description: editData[0].description ? editData[0].description : '',
            })
        }
    }

    const handleEditInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            {/* Add task to UI */}
            <TaskList
                todo={todo}
                handleChecked={(id) => handleChecked(id)}
                handleDelete={(id) => handleDelete(id)}
                handleEdit={(id) => handleEdit(id)}
            />

            <div className='bg-light text-dark p-3 mb-3 rounded-2' id='taskform'>
                <form id='formElement'>
                    <input
                        className='form-control bg-secondary-subtle mb-3'
                        value={form.title}
                        name='title'
                        onChange={isUpdate ? handleEditInputChange : handleChange}
                        placeholder='What are you working for?'
                    />
                    {/* add acts */}
                    <div className='d-flex align-items-center'>
                        <input type='number' className='form-control w-25 me-2' name='act' value={Number(form.act) ? Number(form.act) : 0} placeholder='0' onChange={isUpdate ? handleEditInputChange : handleChange} />
                        <span className='fs-3 me-2'> / </span>
                        <input type='number' className='form-control w-25 me-2' name='act-1' value={1} disabled/>
                        <span className='me-2'>Act</span>
                    </div>

                    {/* add note/project */}
                    <div className='d-flex'>
                        <Button variant='light text-decoration-underline me-3' onClick={() => setNoteOpen(!noteOpen)} aria-expanded={noteOpen} aria-controls='note'>
                            + Add Note
                        </Button>
                        <Button variant='light text-decoration-underline' onClick={() => setProjectOpen(!projectOpen)} aria-expanded={projectOpen} aria-controls='project'>
                            + Add Project
                        </Button>
                    </div>

                    {/* add note */}
                    <Collapse in={noteOpen}>
                        <div id='note'>
                            <textarea className='form-control m-2' rows='6' value={form.description} name='description' placeholder='Description' onChange={isUpdate ? handleEditInputChange : handleChange}></textarea>
                        </div>
                    </Collapse>

                    {/* add project */}
                    <Collapse in={projectOpen}>
                        <div id='project'>
                            <input className='form-control' type='text' value={form.project_title} name='project_title' onChange={isUpdate ? handleEditInputChange : handleChange} placeholder='Project Title' />
                        </div>
                    </Collapse>

                    < div className='text-md-end mx-5 mt-3' id='task-btn'>
                        <button className='btn btn-light me-3' onClick={handleCancel}>Cancel</button>
                        <button className='btn btn-dark' type='submit' onClick={isUpdate ? handleUpdate : handleSubmit}>{isUpdate ? 'Update' : 'Save'}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default TaskForm