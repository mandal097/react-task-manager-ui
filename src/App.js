import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tasks from './views/Tasks/Tasks';
import TasksDetails from './views/TasksDetails/TasksDetails';

function App() {


  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className='routes'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/tasks/:taskId' element={<TasksDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
