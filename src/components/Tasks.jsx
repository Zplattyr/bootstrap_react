import React from 'react';
import classNames from 'classnames';

const renderAddModal = (inputRefName,inputRefContent,add) => (
  <div class="modal fade" id="add_card" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Добавить задачу</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">

          <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Примечание</span>
          <input type="text" ref={inputRefName} class="form-control" aria-describedby="basic-addon1"/>
          </div>

          <div class="input-group">
          <span class="input-group-text">Описание</span>
          <textarea class="form-control" ref={inputRefContent} aria-label="With textarea"></textarea>
          </div>

        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={add}>Добавить</button>
        </div>
      </div>
    </div>
  </div>
)

let toDoListOriginal = [];
let toDoListDuplicate = [];
let tasks = [];

function Tasks({ firestore, user }) {
  const [state, setstate] = React.useState(0);
  const inputRefContent = React.useRef();
  const inputRefName = React.useRef();
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
    if (inputRefContent.current.value) {
      if (inputRefContent.current.value.length <= 77) {

        var item = {name: inputRefName.current.value,content: inputRefContent.current.value}
        toDoListOriginal.push(item);
        console.log(toDoListOriginal)
        firestore.collection('users').doc(user.uid).set({ tasks: toDoListOriginal });
        toDoListDuplicate.push(item);
        inputRefContent.current.value = '';
        inputRefName.current.value = '';
        setstate('Добавление')
      } else {
        alert('Не больше 77 символов!');
      }
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
  const styles = {maxwidth: "18rem",margin:"auto"};
  return (
    <div>

      {renderAddModal(inputRefName,inputRefContent,add)}

    <div className="container">

      <button className={classNames('reload', { disable: !user })} onClick={reload}></button>
      <button className={classNames('add', { disable: !user })}
      data-bs-toggle="modal" data-bs-target="#add_card"></button>

      {toDoListDuplicate.map((item, index) => (
        <div class="card text-bg-dark mb-3 col-lg-9" style={styles}key={`${item}_${index}`}
          onClick={() => deleteFromDuplicateList(item)}>
          <button type="button" class="btn-close btn-for-card" onClick={() => deleteFromOriginalList(item)} aria-label="Close"></button>
      <div class="card-header">{item.name}
      </div>
      <div class="card-body">
        <h3 class="card-title">{item.content}</h3>
      </div>
    </div>
      ))}

    </div>
    </div>
  );
}

export default Tasks;
