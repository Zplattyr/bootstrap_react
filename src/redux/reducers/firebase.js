const initialState = {
  userId: undefined,
  firestore: undefined,
};

const firebaseInfo = (state = initialState, action) => {
  if (action.type === 'SET_ID') {
    return {
      ...state,
      userId: action.payload,
    };
  }
  if (action.type === 'SET_FIRESTORE') {
    return {
      ...state,
      firestore: action.payload,
    };
  }
  return state;
};

export default firebaseInfo;
