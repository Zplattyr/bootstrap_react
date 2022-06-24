import React from 'react';
import { Nav, Tasks, LoginLogic } from './components';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyBxlNnZzJ1-Q0Tls_ZrUzbwVhZmka6d0bU',
  authDomain: 'react-site-62807.firebaseapp.com',
  projectId: 'react-site-62807',
  storageBucket: 'react-site-62807.appspot.com',
  messagingSenderId: '222261735060',
  appId: '1:222261735060:web:c75e89d9e4a4d4f36b0e81',
});

const auth = firebase.auth();
const firestore = firebase.firestore();
let tasks = [];


function App() {
  const [user] = useAuthState(auth);

  return (
    <div>
    <nav className="navbar bg-dark">
    <LoginLogic firestore={firestore} user={user} auth={auth} />
  <form className="container-fluid justify-content-center">
    <button className="btn btn-lg btn-outline-success me-2" type="button">Задачи</button>
    <button className="btn btn-md btn-outline-secondary" type="button" onClick={()=>alert("В разработке!")}>Заметки</button>
    <button className="btn btn-md btn-outline-secondary" type="button" onClick={()=>alert("В разработке!")}>Информация</button>
  </form>
    </nav>
      <Tasks firestore={firestore} user={user} tasks={tasks} />
    </div>

  );
}

export default App;
