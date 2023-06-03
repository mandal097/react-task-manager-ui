import React, { useState } from 'react'
import styles from './TaskElement.module.scss'
import { BsCheckLg, BsCheckAll } from 'react-icons/bs'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import TaskForm from '../TaskForm/TaskForm'
import axios from '../../config/axios'
import { useDispatch } from 'react-redux'
import { removeTask, updateStatus } from '../../redux/taskRedux'

const TaskElement = ({ details }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false);



  const update = async (params) => {
    // e.preventDefault();
    // console.log(params);
    const token = localStorage.getItem('token')
    const res = await axios.put(`/task/update/${details?._id}`, { status: params },
      {
        headers: {
          token: `Bearer ${token}`
        }
      })
    if (res.data.status === 'success') {
      console.log(res.data.data);
      dispatch(updateStatus({ _id: details?._id, obj: res.data.data }))
    }
  }


  const deleteTask = async (e) => {
    e.preventDefault();;
    const token = localStorage.getItem('token')
    const res = await axios.delete(`/task/delete/${details?._id}`,
      {
        headers: {
          token: `Bearer ${token}`
        }
      })
    if (res.data.status === 'success') {
      dispatch(removeTask(details?._id))
    }
  }



  return (
    <>
      <div className={styles.task_element}>
        {!details?.status
          ? <div className={`${styles.status}`} onClick={() => {
            // setStatus(true)
            update(true)
          }}>
            <BsCheckLg className={styles.icon} />
          </div>
          : <div className={`${styles.status} ${styles.active}`} onClick={() => {
            // setStatus(false)
            update(false)
          }}>
            <BsCheckAll className={styles.icon} />
          </div>}
        <b>{details?.topic}</b>
        <p>{details?.desc}</p>

        <div className={styles.actions}>
          <div className={styles.ctc} onClick={() => navigate(`/tasks/${details?._id}`)}>
            <span>view</span>
          </div>
          <div className={styles.ctc} onClick={() => setShowForm(true)}>
            <AiFillEdit className={styles.icon} />
          </div>
          <div className={styles.ctc} onClick={deleteTask}>
            <AiFillDelete className={styles.icon} />
          </div>
        </div>

      </div>
      {showForm && <TaskForm setShowForm={setShowForm} type='update' inputDetails={details} />}
    </>
  )
}

export default TaskElement