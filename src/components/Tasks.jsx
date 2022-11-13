import React from 'react';
import classNames from 'classnames';
import {useSelector} from 'react-redux';

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


function Tasks() {
  const {user,firestore} = useSelector(({firebaseInfo}) => {
    return {
      firestore: firebaseInfo.firestore,
      user: firebaseInfo.user
    }
  })


  const [toDoListDuplicate, settoDoListDuplicate] = React.useState([{
    name:'Пусто...',
    content: 'Вы не авторизованы. Войдите в свой аккаунт'
  }]);
  const inputRefContent = React.useRef();
  const inputRefName = React.useRef();
  const toDoListOriginal = React.useRef([]);

  React.useEffect(() => {
    if (user) {
      var docRef = firestore.collection('users').doc(user.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          var tasks = doc.data().tasks;
          toDoListOriginal.current = tasks.map((x) => x);

          if (toDoListOriginal.current.length){
            settoDoListDuplicate(toDoListOriginal.current.map((x) => x));
          }
          else{
            settoDoListDuplicate([{
              name:'Нет задач?',
              content: 'Добавьте первую задачу, нажав на плюс!'
            }])
          }
          
        }
      });
    }
    else {
      settoDoListDuplicate([{
        name:'Пусто.',
        content: 'Вы не авторизованы. Войдите в свой аккаунт'
      }]);
    }
  }, [user, firestore]);

  const reload = () => {
    settoDoListDuplicate(toDoListOriginal.current.map((x) => x));
  };

  const add = () => {
    if (inputRefContent.current.value) {
      if (inputRefContent.current.value.length <= 77) {
        console.log(toDoListOriginal.current.length.toString + 1)
        var item = {name: inputRefName.current.value,content: inputRefContent.current.value}
        if (!inputRefName.current.value){
          var num = toDoListOriginal.current.length + 1
          item['name'] = 'Задача #' + num.toString()
        }
        toDoListOriginal.current.push(item);
        firestore.collection('users').doc(user.uid).set({ tasks: toDoListOriginal.current });
        inputRefContent.current.value = '';
        inputRefName.current.value = '';
        settoDoListDuplicate(toDoListOriginal.current.map((x) => x));
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
    var tempData = toDoListDuplicate.map((x) => x)
    tempData.splice(tempData.indexOf(item), 1);
    settoDoListDuplicate(tempData.map((x) => x));
  };

  const deleteFromOriginalList = (item) => {
    toDoListOriginal.current.splice(toDoListOriginal.current.indexOf(item), 1);
    firestore.collection('users').doc(user.uid).set({ tasks: toDoListOriginal.current });
  };
  const styles = {maxwidth: "18rem",margin:"auto"};

  return (
    <div>
      {renderAddModal(inputRefName,inputRefContent,add,search)}

    <div className="container">

      <button className={classNames('reload no-copy', { disable: !user })} onClick={reload}></button>
      <button className={classNames('add no-copy', { disable: !user })}
      data-bs-toggle="modal" data-bs-target="#add_card"></button>

      {toDoListDuplicate.map((item, index) => (
        <div id='card' className={classNames('card text-bg-dark mb-3 col-lg-9',{ disable: (!user || !toDoListOriginal.current.length)})} style={styles} key={`${item}_${index}`}
          onClick={() => deleteFromDuplicateList(item)}>
          <button type="button" className="btn-close btn-for-card" onClick={() => deleteFromOriginalList(item)} aria-label="Close"></button>
      <div className="no-copy card-header"><em>{item.name}</em></div>
      <div className="card-body">
        <h3 className="no-copy card-title">{item.content}</h3>
      </div>
    </div>
      ))}

    </div>
    </div>
  );
}

export default Tasks;
