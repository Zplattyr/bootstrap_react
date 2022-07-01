const initialState = {
  user: 0,
  firestore: 0,
  auth: 0
};

const firebaseInfo = (state = initialState, action) => {
  if (action.type === 'SET_USER') {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === 'SET_FIRESTORE') {
    return {
      ...state,
      firestore: action.payload,
    };
  }
  if (action.type === 'SET_AUTH') {
    return {
      ...state,
      auth: action.payload,
    };
  }
  return state;
};

export default firebaseInfo;
