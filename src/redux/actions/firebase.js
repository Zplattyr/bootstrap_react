export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const setFirestore = (fire) => ({
  type: 'SET_FIRESTORE',
  payload: fire,
});

export const setAuth = (auth) => ({
  type: 'SET_AUTH',
  payload: auth,
});
