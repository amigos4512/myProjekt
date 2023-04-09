/** @format */

import {
  LOAD_ALL_PROMPTS,
  CLEAR_PROMPT,
  UPDATE_PROMPTS_CATEGORYS,
} from '../actions/types';

const updateDataForPrompts = (state, action) => {
  if (state === undefined) {
    return {
      categorys: [],
    };
  }
  switch (action.type) {
    case LOAD_ALL_PROMPTS:
      return {
        ...action.payload,
      };

    case UPDATE_PROMPTS_CATEGORYS:
      return {
        ...state.dataForPrompts,
        categorys: action.payload,
      };
    case CLEAR_PROMPT:
      return {
        categorys: [],
      };
    default:
      return state.dataForPrompts;
  }
};

export default updateDataForPrompts;
