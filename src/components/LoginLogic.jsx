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
      <div class='avatar'>
      <div>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Войти
      </button>
</div>
      <div class="modal fade hide" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Авторизация</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Для использования необходимо сначала авторизоваться в учетной записи Google
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" onClick={login} data-bs-dismiss="modal">Войти</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default LoginLogic;
