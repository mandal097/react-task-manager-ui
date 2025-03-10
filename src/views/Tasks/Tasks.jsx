import React, { useEffect, useState } from 'react'
import styles from './Tasks.module.scss'
import TaskElement from '../../components/TaskElement/TaskElement'
import axios from '../../config/axios'
import ZeroTask from '../../components/ZeroTask/ZeroTask'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setTasks } from '../../redux/taskRedux'
import { BsPlusCircleFill } from 'react-icons/bs'
import TaskForm from '../../components/TaskForm/TaskForm'

const Tasks = () => {
  const dispatch = useDispatch()
  const { tasks } = useSelector(state => state.tasks)
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/task/get-all-tasks', {
          headers: {
            token: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (res.data.status === 'err') {
          console.log('error');
        }
        if (res.data.status === 'success') {
          // console.log(res.data.data);
          dispatch(setTasks(res.data.data))
        }
      } catch (error) {
        console.log('error');
      }
    }
    fetchTasks()
  }, [dispatch]);

  return (
    <>
      <div className={styles.tasks}>
        <div className={styles.create_btn} onClick={()=>setShowForm(true)}>
          create new task   <BsPlusCircleFill className={styles.icon} />
        </div>
        <div className={styles.tasks_container}>
          {/* {
          } */}
          {
            tasks &&
            tasks?.map(ele => (
              <TaskElement key={ele?._id} details={ele} />
            ))
          }

          {tasks?.length === 0 && < ZeroTask />}
        </div>
      </div>
      {showForm && <TaskForm setShowForm={setShowForm} type='new' />}
    </>
  )
}

export default Tasks