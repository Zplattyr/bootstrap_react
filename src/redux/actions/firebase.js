export const setUserId = (id) => ({
  type: 'SET_ID',
  payload: id,
});

export const setFirestore = (fire) => ({
  type: 'SET_FIRESTORE',
  payload: fire,
});
