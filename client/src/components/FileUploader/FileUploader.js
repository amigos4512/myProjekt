import React, { useEffect } from 'react';
import {
  triggerUploadInput,
  uploadFile,
  preventDefaultFaileUpload,
  removePreventDefault,
  dragAndDropForFile,
} from '../../utils/workWithFiles';
import StringHelper from '../../utils/StringHelper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});

const FileUploader = ({
  action,
  id = StringHelper.createId(),
  text = 'Загрузить файл',
  withDropDown = true,
}) => {
  useEffect(() => {
    if (withDropDown) {
      preventDefaultFaileUpload();
      dragAndDropForFile(action);
      return () => {
        removePreventDefault();
      };
    }
  }, [action, withDropDown]);

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={2}
      style={{ justifyContent: 'center' }}>
      <label htmlFor='contained-button-file'>
        <Input
          type='file'
          name={`uploader${id}`}
          onChange={e => {
            uploadFile(e.target.files[0], action);
          }}
        />
        <Button
          style={{ margin: '10px 0' }}
          variant='contained'
          component='span'
          type='button'
          onClick={() => {
            triggerUploadInput(id);
          }}>
          {text}
        </Button>
      </label>
    </Stack>
  );
};

export default FileUploader;
