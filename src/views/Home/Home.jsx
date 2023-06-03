import React from 'react'
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.home}>
            <div className={styles.home_wrap}>
                <h1>Introducing the Ultimate Task Management App!</h1>
                <p className={styles.about_app}>Welcome to our task management app, the ultimate solution for organizing and optimizing your daily productivity. With our intuitive interface and powerful features, stay on top of your tasks, streamline your workflow, and achieve your goals effortlessly.</p>
                <h2 className={styles.choose_message}>Click here to go to task page</h2>
                <div className={styles.btns}>
                    <button onClick={() => navigate('/tasks')}>Tasks</button>
                </div>
            </div>
        </div>
    )
}

export default Home