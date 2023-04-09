/** @format */

import { findNeedElements } from '../../../utils/workWithBrowser';

export const feedbackMouseLeave = () => {
  findNeedElements('.helperIcon').forEach(el => {
    el.classList.remove('helperIcon_active');
    el.childNodes.forEach(el => {
      el.classList.remove('fab_active');
    });
    setTimeout(() => el.classList.add('hiddenElem'), 500);
  });
};

export const feedbackMouseEnter = () => {
  findNeedElements('.helperIcon').forEach(async el => {
    el.classList.remove('hiddenElem');
    await new Promise(resolv =>
      setTimeout(() => el.classList.add('helperIcon_active'), 200)
    );
    el.childNodes.forEach(el => {
      el.classList.add('fab_active');
    });
  });
};
