/** @format */

import React from 'react';
import Rating from '@mui/material/Rating';

const RatingInMedal = ({ rating }) => {
  if (rating === 1) {
    return <Rating name='read-only' value={1} readOnly />;
  }
  if (rating === 2) {
    return <Rating name='read-only' value={2} readOnly />;
  }
  if (rating === 3) {
    return <Rating name='read-only' value={3} readOnly />;
  }
  if (rating === 4) {
    return <Rating name='read-only' value={4} readOnly />;
  }
  if (rating === 5) {
    return <Rating name='read-only' value={5} readOnly />;
  } else {
    return <Rating name='read-only' value={0} readOnly />;
  }
};

export default RatingInMedal;
