const initialState = {
  items: [],
  userId: undefined,
};

const tasks = (state = initialState, action) => {
  if (action.type === 'SET_TASKS') {
    return {
      ...state,
      items: action.payload,
    };
  }
  return state;
};

export default tasks;
