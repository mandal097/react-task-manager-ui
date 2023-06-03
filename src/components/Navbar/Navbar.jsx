import styles from './Navbar.module.scss'
import { useNavigate } from 'react-router-dom'
import { CgMathPlus } from 'react-icons/cg'
import { useState } from 'react'
import TaskForm from '../TaskForm/TaskForm'

const Navbar = () => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);


    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.wrapper}>
                    <div className={styles.logo} onClick={() => navigate('/')}>
                        TASK MANAGEMENT APP
                    </div>
                    <div className={styles.right}>

                        <button onClick={() => setShowForm(true)}  >
                            <CgMathPlus className={styles.icon} />New Task</button>
                    </div>
                </div>
            </div>
            {showForm && <TaskForm setShowForm={setShowForm} type='new' />}
        </>
    )
}

export default Navbar