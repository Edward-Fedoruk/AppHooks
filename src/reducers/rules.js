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
    case types.EDIT_RULE: 
      return {
        ...state,
        recipes: [
          action.newRule, 
          ...state.recipes.filter(recipe => recipe.id !== action.id)
        ]
      }
    case types.DELETE_RULE: 
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.id !== action.id)
      }
    default:
      return state
  }
}
