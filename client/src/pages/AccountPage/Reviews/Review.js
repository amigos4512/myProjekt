/** @format */

import React, { useState } from 'react';
import Rating from '../../../components/Rating';
import styled from 'styled-components';
import { createValidImgSrc } from '../../../utils/workWithBrowser';
import { connectToStore } from '../../../utils/workWithRedux';
import { updateUserReviews } from '../../../actions/userData';
import { updateReviews, deleteReviews } from '../utils';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const Img = styled.img`
  width: 450px;
  height: 300px;
`;

const Review = ({
  data: {
    commodityImg,
    commodityTitle,
    reviewRating: rating,
    review,
    commodityId,
    reviewId,
  },
  userData: { token, userName },
  actions: { updateUserReviews },
}) => {
  const [locaReviewData, updateLocalReviewData] = useState(review),
    userReview = {
      rating,
      reviewId,
      review: locaReviewData?.trim(),
    },
    dataForUpdate = {
      ...userReview,
      token,
    },
    funcsForUpdate = {
      updateUserReviews,
    };

  const updateInput = (e, updateFunction) => {
    const input = e.target,
      inputValue = input.value;
    updateFunction(inputValue);
  };

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: '1rem auto',
            width: 600,
            height: 500,
          },
        }}>
        <Paper elevation={3}>
          <form onSubmit={e => updateReviews(e, dataForUpdate, funcsForUpdate)}>
            <Img
              src={createValidImgSrc(commodityImg)}
              alt={`byer-${userName}`}
            />

            <h4>Товар:"{commodityTitle}"</h4>

            <Rating
              userRating={rating}
              commodityData={{
                id: commodityId,
                userReview,
              }}
              funcsForUpdate={{ updateUserReviews }}
            />

            <TextareaAutosize
              maxRows={4}
              placeholder='Напишите что нибудь о товаре'
              defaultValue={locaReviewData?.trimStart()}
              style={{ width: '80%', height: '40px' }}
              onChange={e => updateInput(e, updateLocalReviewData)}
            />

            <Button
              style={{ margin: '10px' }}
              variant='contained'
              color='success'
              type='submit'
              disabled={
                locaReviewData?.trim() === review || !locaReviewData?.trim()
                  ? true
                  : false
              }>
              Изменить
            </Button>
            <Button
              style={{ margin: '10px' }}
              variant='outlined'
              color='error'
              onClick={() => deleteReviews(dataForUpdate, funcsForUpdate)}>
              Удалить
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default connectToStore(['userData'], { updateUserReviews })(Review);
