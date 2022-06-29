import React from 'react';
import firebase from 'firebase';

function LoginLogic({ user, firestore, auth }) {
  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  const out = async () => {
    await auth.signOut();
  };

  if (user) {
    console.log(user)
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
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#login">
      Войти
      </button>
</div>
      <div className="modal fade" id="login" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Авторизация</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Для использования необходимо сначала авторизоваться в учетной записи Google
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={login} data-bs-dismiss="modal">Войти</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default LoginLogic;
