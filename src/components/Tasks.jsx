import React from 'react';
import classNames from 'classnames';

let toDoListOriginal = [];
let toDoListDuplicate = [];
let tasks = [];

function Tasks({ firestore, user }) {
  const [state, setstate] = React.useState(0);
  const [isOuting, setOutingState] = React.useState(0);
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (user) {
      var docRef = firestore.collection('users').doc(user.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          tasks = doc.data().tasks;
          toDoListOriginal = tasks.map((x) => x);
          toDoListDuplicate = toDoListOriginal.map((x) => x);
          setstate(123);
        }
      });
    }
  }, [user, firestore]);

  const reload = () => {
    toDoListDuplicate = toDoListOriginal.map((x) => x);
    setstate("reload");
  };

  const add = () => {
    inputRef.current.focus();
    if (inputRef.current.value && isOuting) {
      if (inputRef.current.value.length <= 77) {
        toDoListOriginal.push(inputRef.current.value);
        firestore.collection('users').doc(user.uid).set({ tasks: toDoListOriginal });
        toDoListDuplicate.push(inputRef.current.value);
        inputRef.current.value = '';
        setOutingState(!isOuting);
      } else {
        alert('Не больше 77 символов!');
      }
    } else {
      setOutingState(!isOuting);
    }
  };

  const search = (e) => {
    if (e.keyCode === 13) {
      add();
    }
  };

  const deleteFromDuplicateList = (item) => {
    toDoListDuplicate.splice(toDoListDuplicate.indexOf(item), 1);
    setstate(`${Math.random()}_${item}`);
  };

  const deleteFromOriginalList = (item) => {
    toDoListOriginal.splice(toDoListOriginal.indexOf(item), 1);
    firestore.collection('users').doc(user.uid).set({ tasks: toDoListOriginal });
  };

  return (
    <div className="container">
      <div className={classNames('input', { divouting: isOuting })}>
        <input
          type="text"
          ref={inputRef}
          size="10"
          onKeyDown={search}
          className={classNames({ inputouting: isOuting })}></input>
      </div>
      <button className={classNames('reload', { disable: !user })} onClick={reload}></button>
      <button className={classNames('add', { disable: !user })} onClick={add}></button>
      {toDoListDuplicate.map((item, index) => (
        <button
          className={classNames('checkpoint')}
          key={`${item}_${index}`}
          onClick={() => deleteFromDuplicateList(item)}>
          <div className="bomb" onClick={() => deleteFromOriginalList(item)}></div>
          <h3>{item}</h3>
        </button>
      ))}
    </div>
  );
}

export default Tasks;
