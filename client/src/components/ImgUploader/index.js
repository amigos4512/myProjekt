/** @format */

import React from 'react';
import FileUploader from '../FileUploader/FileUploader';
import UpdateImg from './UpdateImg';
import StringHelper from '../../utils/StringHelper';
// import EditIcon from '@mui/icons-material/Edit';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// import {
//   initModalWindow,
//   // createValidImgSrc,
// } from '../../utils/workWithBrowser';

const ImgUploader = ({ img, actionForUpdateImgData, extraClass = '' }) => {
  if (img.src) {
    return (
      <>
        <div className={`imgUploader flexWrap ${extraClass}`}>
          {/* <img
            className='imgUploader__img'
            src={createValidImgSrc(img.src)}
            alt={img.alt}
          /> */}
          {/* <div className='imgUploader__editing'>
            <EditIcon onClick={() => initModalWindow(`.updateImg_${img.id}`)} />
          </div> */}
        </div>
        {/* <div className={`imgUploader flexWrap ${extraClass}`}>
          <img
            className='imgUploader__img'
            src={createValidImgSrc(img.src)}
            alt={img.alt}
          />
          <div className='imgUploader__editing'>
            <AddCircleOutlineIcon
              onClick={() => initModalWindow(`.updateImg_${img.id}`)}
            />
          </div>
        </div> */}
        <UpdateImg img={img} funcForUpdateData={actionForUpdateImgData} />

        {/* <EditIcon onClick={() => initModalWindow(`.updateImg_${img.id}`)} /> */}
      </>
    );
  }
  return (
    <FileUploader
      action={actionForUpdateImgData}
      id={StringHelper.createId()}
    />
  );
};

export default ImgUploader;
