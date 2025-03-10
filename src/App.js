import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import Home from './views/Home/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tasks from './views/Tasks/Tasks';
import TasksDetails from './views/TasksDetails/TasksDetails';

function App() {

  const user = useSelector(state => state.user.currentUser);

  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className='routes'>
          <Routes>
            <Route path='/' element={user ? <Navigate to='/tasks' /> : <Home />} />
            <Route path='/register' element={!user ? <Register /> : <Navigate to='/tasks' />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/tasks' />} />
            <Route path='/tasks' element={!user ? <Navigate to='/' /> : <Tasks />} />
            <Route path='/tasks/:taskId' element={!user ? <Navigate to='/' /> : <TasksDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
