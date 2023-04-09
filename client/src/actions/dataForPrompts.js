/** @format */
import { createAction } from '../utils/workWithRedux';
import { LOAD_ALL_PROMPTS, CLEAR_PROMPT } from './types';

export const loadPrompts = data => createAction(LOAD_ALL_PROMPTS, data);

export const clearPrompts = () => createAction(CLEAR_PROMPT);

export const loadPromptFomServer = token => async dispatch => {
  console.log('loadPromptFomServe');
  dispatch(loadPrompts());
};
