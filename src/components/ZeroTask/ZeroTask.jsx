import React, { useState } from 'react'
import styles from './ZeroTask.module.scss'
import { AiOutlinePlus } from 'react-icons/ai'
import TaskForm from '../TaskForm/TaskForm';

const ZeroTask = () => {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            <div className={styles.zero_task}>
                <div className={styles.circle} onClick={()=>setShowForm(true)}>
                    <AiOutlinePlus className={styles.icon} />
                    <span>Create</span>
                </div>
                <p>No tasks yet!</p>
            </div>
            {showForm && <TaskForm setShowForm={setShowForm} type='new' />}
        </>
    )
}

export default ZeroTask