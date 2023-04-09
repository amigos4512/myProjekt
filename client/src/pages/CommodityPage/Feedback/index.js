/** @format */

import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Rating from '../../../components/Rating';
import ReviewStatus from '../../../components/ReviewStatus';
import { connectToStore } from '../../../utils/workWithRedux';
import { updateUserReviews } from '../../../actions/userData';
import { UpdateReview } from '../../../utils/workWithApiRequests';
import Button from '@mui/material/Button';
import GoodsService from '../../../services/GoodsService';
import { createValidImgSrc } from '../../../utils/workWithBrowser';
import {
  findUserReview,
  updateUserReview,
  updateReviews,
  clearUserReview,
  removeReview,
  updateRating,
} from '../../../actions/commodityData';
import styled from 'styled-components';

const Img = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: aliceblue;
`;
const ReviewBlock = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  && textarea {
    border: 1px solid gray;
    border-radius: 8px;
    width: 100%;
    padding: 8px;
    word-break: break-word;
    overflow: auto;
  }
  && button {
    margin: 10px;
  }
`;

const Feedback = ({
  userData: { userName, token, avatarSrc, fullName },
  commodityData: { userReview, reviews, id },
  actions: {
    findUserReview,
    updateUserReview,
    updateReviews,
    clearUserReview,
    removeReview,
    updateRating,
    updateUserReviews,
  },
}) => {
  const [review, updateLocalReview] = useState(
      userReview ? userReview.review : ''
    ),
    [loading, changeLoading] = useState(false);

  useEffect(() => {
    updateLocalReview(userReview?.review ?? '');
  }, [userReview]);

  useEffect(() => {
    findUserReview(userName, reviews);
    return () => clearUserReview();
  }, [userName, reviews, clearUserReview, findUserReview]);

  if (!userName) {
    return null;
  }
  const ReviewRating = userReview?.rating;

  const deleteReview = async (
    e,
    { userReview },
    { token },
    { clearUserReview, removeReview, updateRating, changeLoading }
  ) => {
    e.preventDefault();
    changeLoading(true);
    await GoodsService.removeReview(userReview.reviewId, token);
    updateRating(0, userReview?.rating);
    clearUserReview();
    removeReview({ reviewId: userReview.reviewId });
    changeLoading(false);
  };
  const userData = {
      token,
      avatar: avatarSrc,
      fullName,
      userName,
    },
    reviewData = {
      review: review?.trim(),
      commodityId: id,
      userReview,
    },
    funcsForUpdateReview = {
      updateReviews,
      updateUserReview,
      changeLoading,
      clearUserReview,
      removeReview,
      updateRating,
      updateUserReviews,
    };
  const updateInput = (e, updateFunction) => {
    const input = e.target,
      inputValue = input.value;
    updateFunction(inputValue);
  };

  return (
    <>
    {!userReview?.review ? (
      <h3 style={{ textAlign: 'center' }}>Оставить отзыв</h3>)
       : (<h3 style={{ textAlign: 'center' }}>Изменить отзыв</h3>)}
      <Paper
        className='commodityPage__feedback'
        elevation={3}
        style={{
          backgroundColor: 'aquamarine',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '20px',
          margin: '25px 0',
        }}>
        <Img src={createValidImgSrc(avatarSrc)} alt={`avatar-${userName}`} />
        <ReviewBlock>
          <form
            style={{ width: '100%' }}
            onSubmit={e =>
              UpdateReview(e, reviewData, userData, funcsForUpdateReview)
            }>
            <h4>{fullName}</h4>
            <p>Оцените товар: </p>
            {ReviewRating && (
              <Rating
                userRating={userReview?.rating}
                commodityData={{
                  id: id ?? null,
                  userReview: userReview ?? null,
                }}
                funcsForUpdate={{
                  updateUserReview,
                  updateReviews,
                  updateRating,
                  updateUserReviews,
                }}
              />
            )}
            {!ReviewRating && (
              <Rating
                userRating={0}
                commodityData={{
                  id: id ?? null,
                  userReview: userReview ?? null,
                }}
                funcsForUpdate={{
                  updateUserReview,
                  updateReviews,
                  updateRating,
                  updateUserReviews,
                }}
              />
            )}
            {ReviewRating && (
              <>
                {!review && (
                  <p> Для созадния отзыва, напишите что-нибудь о товаре</p>
                )}
                <TextareaAutosize
                  style={{ height: '60px' }}
                  maxRows={4}
                  placeholder='Понравился товар?'
                  defaultValue={review?.trimStart()}
                  onChange={e => updateInput(e, updateLocalReview)}
                />
              </>
            )}

            {userReview?.review ? (
              <>
                <Button
                  variant='contained'
                  color='success'
                  type='submit'
                  disabled={userReview?.review && false}>
                 {userReview?.review===review ?('Изменить'):('Сохранить')} 
                </Button>
                <Button
                  variant='outlined'
                  color='error'
                  onClick={e =>
                    deleteReview(
                      e,
                      { userReview },
                      { token },
                      {
                        clearUserReview,
                        removeReview,
                        updateRating,
                        changeLoading,
                      }
                    )
                  }>
                  Удалить
                </Button>
              </>
            ) : (
              <Button
                variant='contained'
                color='success'
                type='submit'
                disabled={review?.trim() === '' ?? false}>
                Опубликовать
              </Button>
            )}
          </form>
        </ReviewBlock>
      </Paper>
      <ReviewStatus loading={loading} oldReview={review} />
    </>
  );
};

export default connectToStore(['userData', 'commodityData'], {
  findUserReview,
  updateUserReview,
  updateReviews,
  clearUserReview,
  removeReview,
  updateRating,
  updateUserReviews,
})(Feedback);
