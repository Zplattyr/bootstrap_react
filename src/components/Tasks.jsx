import React from 'react';
import classNames from 'classnames';

const renderAddModal = (inputRefName,inputRefContent,add,search) => (
  <div className="modal fade" id="add_card" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">Добавить задачу</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div className="modal-body">

          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Примечание</span>
          <input type="text" ref={inputRefName} className="form-control"
          aria-describedby="basic-addon1" placeholder="Можно оставить пустым"/>
          </div>

          <div className="input-group">
          <span className="input-group-text inputb">Описание</span>
          <textarea className="form-control" ref={inputRefContent}
          aria-label="With textarea" placeholder="Содержание"></textarea>
          </div>

        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={add} onKeyDown={search}>Добавить</button>
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
        console.log(toDoListOriginal.length.toString + 1)
        var item = {name: inputRefName.current.value,content: inputRefContent.current.value}
        if (!inputRefName.current.value){
          var num = toDoListOriginal.length + 1
          item['name'] = 'Задача #' + num.toString()
        }
        toDoListOriginal.push(item);
        console.log(toDoListOriginal)
        firestore.collection('users').doc(user.uid).set({ tasks: toDoListOriginal });
        toDoListDuplicate.push(item);
        inputRefContent.current.value = '';
        inputRefName.current.value = '';
        setstate(Math.random())
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

      {renderAddModal(inputRefName,inputRefContent,add,search)}

    <div className="container">

      <button className={classNames('reload', { disable: !user })} onClick={reload}></button>
      <button className={classNames('add', { disable: !user })}
      data-bs-toggle="modal" data-bs-target="#add_card"></button>

      {toDoListDuplicate.map((item, index) => (
        <div className="card text-bg-dark mb-3 col-lg-9" style={styles}key={`${item}_${index}`}
          onClick={() => deleteFromDuplicateList(item)}>
          <button type="button" className="btn-close btn-for-card" onClick={() => deleteFromOriginalList(item)} aria-label="Close"></button>
      <div className="card-header">{item.name}
      </div>
      <div className="card-body">
        <h3 className="card-title">{item.content}</h3>
      </div>
    </div>
      ))}

    </div>
    </div>
  );
}

export default Tasks;
