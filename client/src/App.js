import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import { Toaster } from 'react-hot-toast';
import Todo from './components/Todo';

function App() {
  return (
    <div className="App">
   <Toaster className="toast-dsgn" />

    <Form/>
    {/* <Todo/> */}
    </div>
  );
}

export default App;
