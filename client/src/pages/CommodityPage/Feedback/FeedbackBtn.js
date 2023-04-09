import React from 'react';
import { connectToStore } from '../../../utils/workWithRedux';
import { setDataRemove } from '../../../utils/workWithBrowser';
import Button from '@mui/material/Button';
import { deleteReview } from '../../../utils/workWithApiRequests';

const FeedbackBtn = ({
  commodityData: { userReview },
  newReview,
  e,
  token,
  clearUserReview,
  removeReview,
  updateRating,
  changeLoading,
}) => {
  return (
    <>
      {userReview?.review ? (
        <div className='btnGroup_center'>
          <Button
            variant='contained'
            color='success'
            type='submit'
            disabled={userReview.review.trim() === newReview.trim() ?? false}>
            Изменить
          </Button>
          {/* <button type='submit' className='btn' disabled={userReview.review.trim() === newReview.trim() ?? false}>
            Изменить
          </button> */}
          <Button
            variant='outlined'
            color='error'
            onClick={e =>
              deleteReview(
                e,
                { userReview },
                { token },
                { clearUserReview, removeReview, updateRating, changeLoading }
              )
            }>
            Удалить
          </Button>
          {/* <button
            type='submit'
            className='btn'
            onClick={e => setDataRemove(e, '.commodityPage__feedback')}>
            Удалить
          </button> */}
        </div>
      ) : (
        <button
          type='submit'
          className='btn btn_center'
          disabled={newReview?.trim() === '' ?? false}>
          Опубликовать
        </button>
      )}
    </>
  );
};

export default connectToStore(['commodityData.userReview'], null)(FeedbackBtn);
