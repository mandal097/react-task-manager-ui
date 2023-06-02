import React, { useEffect, useState } from 'react'
import styles from './TasksDetails.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../config/axios'
import TaskForm from '../../components/TaskForm/TaskForm'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentTask } from '../../redux/taskRedux'

const TasksDetails = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch()

    const [showForm, setShowForm] = useState(false);
    const {currentTask} = useSelector(state => state.tasks)
    // const [task, setTask] = useState({});
    const taskId = location?.pathname.split('/')[2]

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`/task/get-task/${taskId}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.data.status === 'err') {
                    console.log('error');
                }
                if (res.data.status === 'success') {
                    dispatch(setCurrentTask(res.data.data))
                }
            } catch (error) {
                console.log('error');
            }
        }
        fetchTasks()
    }, [taskId,dispatch]);

    return (
        <>
            <div className={styles.task_details}>
                <div className={styles.task_wrapper}>
                    <h1>{currentTask?.topic}</h1>
                    <p>{currentTask?.desc}</p>
                    {/* <h1>{task?.topic}</h1>
                    <p>{task?.desc}</p> */}
                    <div className={styles.btns}>
                        <button onClick={() => navigate(-1)}>Close</button>
                        <button onClick={() => setShowForm(true)}>Edit</button>
                    </div>
                </div>
            </div>
            {showForm && <TaskForm setShowForm={setShowForm} type='update' inputDetails={currentTask} />}
        </>
    )
}

export default TasksDetails