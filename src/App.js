import {Tasks, LoginLogic} from './components';
import './bootstrap/css/bootstrap.css'

function App() {
  return (
    <div>
    <nav className="navbar bg-dark">
    <LoginLogic/>
  <form className="container-fluid justify-content-center">
    <button className="btn btn-lg btn-outline-success me-2" type="button">Задачи</button>
    <button className="btn btn-md btn-outline-secondary" type="button" onClick={()=>alert("В разработке!")}>Заметки</button>
    <button className="btn btn-md btn-outline-secondary" type="button" onClick={()=>alert("В разработке!")}>Информация</button>
  </form>
    </nav>
      <Tasks/>
    </div>

  );
}

export default App;
