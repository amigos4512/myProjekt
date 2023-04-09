/** @format */

import React from 'react';
import Button from '@mui/material/Button';

const createUpdateDataBtn = (updatedFields, type) => {
  let allFieldsAreFilled = true;
  for (const key in updatedFields) {
    if (!updatedFields[key] && key !== 'img') {
      allFieldsAreFilled = false;
    }
  }
  if (Object.keys(updatedFields).length > 0 && type === 'update') {
    return (
      <Button variant='contained' type='submit'>
        Обновить данные
      </Button>
    );
  } else if (type === 'create' && allFieldsAreFilled) {
    return (
      <Button variant='contained' type='submit'>
        Создать новый товар
      </Button>
    );
  } else {
    return null;
  }
};

const ChangeCommodityBtn = ({ type, updatedFields }) => {
  return <>{createUpdateDataBtn(updatedFields, type)}</>;
};

export default ChangeCommodityBtn;
