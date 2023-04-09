/** @format */

import React, { useState, useEffect } from 'react';
import ListView from '../../components/ListView';
import Rating from '../../components/Rating';
import TextWithBr from '../../components/TextWithBr';
import MoreReviews from '../../components/MoreReviews';
import { createValidImgSrc, showReview } from '../../utils/workWithBrowser';
import Paper from '@mui/material/Paper';
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
  && section {
    border: 1px solid gray;
    border-radius: 8px;
    width: 100%;
    padding: 8px;
    height: 100px;
    word-break: break-word;
    overflow: auto;
  }
`;
const Reviews = ({ reviews }) => {
  const [countReviews, switchCountReviews] = useState(5);

  useEffect(() => showReview('.commodityPage__reviews-item'), [reviews]);

  if (!reviews.length) {
    return null;
  }

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Отзывы</h3>
      <ListView
        listForRender={reviews.slice(0, countReviews)}
        ComponentForRender={({
          data: {
            reviewerName,
            reviewerAvatar,
            reviewDate,
            review,
            reviewRating,
          },
        }) => (
          <Paper
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '20px',
              margin: '25px 0',
            }}>
            <Img
              src={createValidImgSrc(reviewerAvatar)}
              alt={`avatar-${reviewerName}`}
            />

            <ReviewBlock>
              <h3>{reviewerName}</h3>
              {window.screen.width > 575 ? <p>{reviewDate}</p> : null}

              {reviewRating ? (
                <Rating userRating={reviewRating} editable={false} />
              ) : null}
              <section>
                <TextWithBr text={review} maxlength={400} needReadMore={true} />
              </section>
            </ReviewBlock>
          </Paper>
        )}
      />
      <MoreReviews
        reviews={reviews}
        countReviews={countReviews}
        switchCountReviews={switchCountReviews}
      />
    </>
  );
};

export default Reviews;
