import * as types from "../actions/types"

const initialState = {
  recipes: [],
  currentRecipe: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_RULES:
      return { 
        ...state,
        recipes: action.recipes
      } 
    case types.SET_RULE: 
      return {
        ...state, 
        currentRecipe: action.recipe 
      }
    case types.ADD_RULE:
      return {
        ...state,
        recipes: [...state.recipes, action.recipe]
      }
    default:
      return state
  }
}