import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:
      const comentario = action.payload;
      const id = state.comentarios.length;
      comentario.id = id;
      return { ...state, errMess: null, comentarios: state.comentarios.concat(comentario) };

    default:
      return state;
  }
};