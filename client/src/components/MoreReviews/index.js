import React from 'react';
import { calcRemainingReviewsCount } from './utils';
import Button from '@mui/material/Button';

const MoreReviews = ({
  reviews,
  countReviews,
  switchCountReviews,
  className = null,
}) => {
  return (
    <>
      {reviews.length > countReviews ? (
        <Button
          variant='contained'
          onClick={() =>
            switchCountReviews(
              count =>
                (count += calcRemainingReviewsCount(
                  countReviews,
                  reviews.length
                ))
            )
          }>
          Показать еще {calcRemainingReviewsCount(countReviews, reviews.length)}
        </Button>
      ) : null}
    </>
  );
};

export default MoreReviews;
