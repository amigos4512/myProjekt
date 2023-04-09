/** @format */

import { defaultActions } from './default';

export const chekAccessToResetPasswordPage = async (
  token,
  ...defaultParams
) => {
  const errorFunc = userName => {
    if (!userName) {
      alert('Ваш токен устарел, попробуйте снова!');
    }
  };
  await defaultActions(token, ...defaultParams, errorFunc);
};
