/** @format */

import React, { useState } from 'react';
import MoreReviews from '../../../components/MoreReviews';
import ListView from '../../../components/ListView';
import Review from './Review';
import { connectToStore } from '../../../utils/workWithRedux';

const Reviews = ({ userData: { reviews } }) => {
  const [countReviews, switchCountReviews] = useState(3);

  if (!reviews.length) {
    return null;
  }

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Отзывы</h2>

      <ListView
        listForRender={reviews.slice(0, countReviews)}
        ComponentForRender={Review}
      />
      <MoreReviews
        className='accountPage__reviews-item-moreBtn'
        reviews={reviews}
        countReviews={countReviews}
        switchCountReviews={switchCountReviews}
      />
    </>
  );
};

export default connectToStore(['userData.reviews'], null)(Reviews);
