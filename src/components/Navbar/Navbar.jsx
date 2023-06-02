// import React, { useState } from 'react'
import styles from './Navbar.module.scss'
import { useNavigate } from 'react-router-dom'
import { IoMdLogIn } from 'react-icons/io'
import { CgMathPlus } from 'react-icons/cg'
import { logout } from '../../redux/userRedux'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import TaskForm from '../TaskForm/TaskForm'
import { clearTasks } from '../../redux/taskRedux'

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const [showForm, setShowForm] = useState(false);

    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.clear();
        dispatch(logout());
        dispatch(clearTasks());
        navigate('/login');
    };

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.wrapper}>
                    <div className={styles.logo} onClick={() => navigate('/')}>
                        TASK MANAGEMENT APP
                    </div>
                    <div className={styles.right}>
                        {user &&
                            <button
                                onClick={() => setShowForm(true)}
                            >
                                <CgMathPlus className={styles.icon} />New Task</button>}
                        {/* <div className={styles.right}> */}
                            {!user ?
                                <button onClick={() => navigate('/login')}>
                                    <IoMdLogIn className={styles.icon} />Login</button>
                                : <>
                                    <button onClick={logoutUser}><IoMdLogIn className={styles.icon} />Logout</button>
                                    <div className={styles.user_name}>
                                        <p>{user?.name}</p>
                                    </div>
                                </>
                            }
                        {/* </div> */}
                    </div>
                </div>
            </div>
            {showForm && <TaskForm setShowForm={setShowForm} type='new' />}
        </>
    )
}

export default Navbar