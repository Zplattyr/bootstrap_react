import firebase from 'firebase/app';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import {setUser,setFirestore,setAuth} from '../redux/actions/firebase'

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

function FirebaseUpdate() {
  const dispatch = useDispatch()
  const [user] = useAuthState(auth);

  React.useEffect(()=>{
    dispatch(setUser(user))
    dispatch(setFirestore(firestore))
    dispatch(setAuth(auth))
  })

  return null

}

export default FirebaseUpdate;
