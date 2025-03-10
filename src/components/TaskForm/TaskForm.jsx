import React, { useState } from 'react'
import styles from './TaskForm.module.scss'
import { GiTireIronCross } from 'react-icons/gi'
import axios from '../../config/axios'
import { addNewTask, updateCurrentTask, updateTask } from '../../redux/taskRedux'
import { useDispatch } from 'react-redux'

const TaskForm = ({ setShowForm, type, inputDetails }) => {
    const dispatch = useDispatch()
    const [topic, setTopic] = useState(type === 'update' ? inputDetails?.topic : '');
    const [desc, setDesc] = useState(type === 'update' ? inputDetails?.desc : '');
    // const [status, setStatus] = useState('');

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('')


    const createUpdateTask = async (e) => {
        e.preventDefault();

        if (!topic && !desc) {
            setResponseMessage('Please fill all fields');
            return;
        }
        setLoading(true)
        try {
            const data = {
                topic,
                desc
            }
            const token = localStorage.getItem('token')
            const res = type === 'new'
                ? await axios.post('/task/create', data,
                    {
                        headers: {
                            token: `Bearer ${token}`
                        }
                    })
                : await axios.put(`/task/update/${inputDetails?._id}`, data,
                    {
                        headers: {
                            token: `Bearer ${token}`
                        }
                    })

            if (res.data.status === 'err') {
                setResponseMessage(res.data.message)
            }
            if (type === 'new' && res.data.status === 'success') {
                dispatch(addNewTask(res.data.data))
                setLoading(false);
                setResponseMessage(res.data.message)
                setTimeout(() => {
                    setShowForm(false)
                }, 400);
            }
            if (type === 'update' && res.data.status === 'success') {
                dispatch(updateTask({ topic: topic, desc: desc, _id: inputDetails?._id }))
                dispatch(updateCurrentTask({ topic: topic, desc: desc, _id: inputDetails?._id }))
                setLoading(false);
                setResponseMessage(res.data.message)
                setTimeout(() => {
                    setShowForm(false)
                }, 400);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false)
            setResponseMessage('something went wrong')
        }
    }



    return (
        <div className={styles.task_form}>
            <div className={styles.container}>
                <div className={styles.close} onClick={() => setShowForm(false)}>
                    <GiTireIronCross className={styles.icon} />
                </div>
                <h1>{type === 'new' ? 'Create' : 'Update'} Task</h1>


                <div className={styles.input_field}>
                    <label htmlFor="">Topic :</label>
                    <input
                        type="text"
                        placeholder='Topic'
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>

                <div className={styles.input_field}>
                    <label htmlFor="">Description :</label>
                    <textarea
                        type="text"
                        placeholder='Descriptions'
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}

                    ></textarea>
                </div>

                <div className={styles}>
                    <p style={{ color: 'hotpink', fontSize: "1.8rem" }}>{responseMessage}</p>
                </div>

                <div className={styles.input_field} style={{ flexDirection: 'row', gap: '1rem' }}>
                    <button onClick={createUpdateTask}>{loading ? 'loading...' : type === 'new' ? 'Create' : 'Update'}</button>
                </div>

            </div>
        </div >
    )
}

export default TaskForm