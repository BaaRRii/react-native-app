import * as ActionTypes from './ActionTypes';

export const favoritos = (state = {
  favoritos: []
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITO:
      if (state.favoritos.some(e => e === action.payload)) {
        return state;
      }
      else{
        return {...state, favoritos: [...state.favoritos, action.payload]};
      }
    case ActionTypes.POST_FAVORITO:
      return state;

    default:
      return state;
  }
};