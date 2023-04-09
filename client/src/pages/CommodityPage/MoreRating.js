import React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import URating from '@mui/material/Rating';

const Container = styled.div`
  border: 0.5px solid #80808024;
  border-radius: 10px;
  background-color: aliceblue;
  padding: 15px;
  h3 {
    text-align: center;
  }
  button {
    background-color: black;
  }
`;
const MoreRatingInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  svg {
    color: gold;
  }
`;
const MoreRatingInfoStars = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;
function MoreRating({
  rating,
  calculateNumberOfRating,
  calculateRatingPercentage,
  Rating,
  userReview,
  updateUserReview,
  updateReviews,
  updateRating,
  updateUserReviews,
  writeReview,
  userName,
  id,
}) {
  return (
    <Container>
      <h3>Рейтинг покупателей</h3>

      <MoreRatingInfo>
        <span>средняя: {rating?.general}</span>
        <span>оценок: {calculateNumberOfRating(rating)}</span>
      </MoreRatingInfo>

      <MoreRatingInfo>
        <URating name='read-only' value={5} readOnly />
        <div
          style={{
            width: `${calculateRatingPercentage(rating, 5)}%`,
          }}></div>
        <div>{rating.fiveStars}</div>
      </MoreRatingInfo>
      <MoreRatingInfo>
        <URating name='read-only' value={4} readOnly />
        <div>{rating.fourStars}</div>
      </MoreRatingInfo>
      <MoreRatingInfo>
        <URating name='read-only' value={3} readOnly />
        <div>{rating.threeStars}</div>
      </MoreRatingInfo>
      <MoreRatingInfo>
        <URating name='read-only' value={2} readOnly />
        <div>{rating.twoStars}</div>
      </MoreRatingInfo>
      <MoreRatingInfo>
        <URating name='read-only' value={1} readOnly />
      </MoreRatingInfo>
      <MoreRatingInfoStars>
        <div>Оцените товар:</div>
        <Rating
          userRating={userReview ? userReview.rating : 0}
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
      </MoreRatingInfoStars>
      <Button
        onClick={() => writeReview(userName)}
        variant='contained'
        color='success'>
        {userReview?.review ? 'Редактировать отзыв' : 'Написать отзыв'}
      </Button>
    </Container>
  );
}

export default MoreRating;
