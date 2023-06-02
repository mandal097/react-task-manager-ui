import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://node-task-manager-q3yy.onrender.com/api/v1'
    // baseURL: 'http://localhost:5000/api/v1/'
});

export default instance;