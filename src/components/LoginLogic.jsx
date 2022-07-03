import React from 'react';
import firebase from 'firebase';
import {useSelector} from 'react-redux';
import {Modal,Button} from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Авторизация
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Для использования необходимо сначала авторизоваться в учетной записи Google
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onLogin}>Войти</Button>
      </Modal.Footer>
    </Modal>
  );
}


function LoginLogic() {
  const [modalShow, setModalShow] = React.useState(false);
  const firstEnter = React.useRef(1)

  const {auth,user} = useSelector(({firebaseInfo}) => {
    return {
      auth: firebaseInfo.auth,
      user: firebaseInfo.user
    }
  })

  React.useEffect(()=>{

    setTimeout(()=>{
    if (!user  && firstEnter.current){
      firstEnter.current = 0;
      setModalShow(1)
    }
  },1000)

  },[user])


  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  const out = async () => {
    await auth.signOut();
  };

  setTimeout(()=> {

  },1000)
  if (user) {
    return (
      <div className="avatar">
        <img onClick={out} src={user.photoURL} alt={user.displayName}
        className="avatar-img"/>
      </div>
    );
  } else {

    return (

      <div className='avatar'>

        <div>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Войти
          </Button>
        </div>

          <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          onLogin={() => login()}
          />


      </div>

    );
  }
}

export default LoginLogic;
