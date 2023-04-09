import React from 'react';
import LoadingIndicator from '../LoadingIndicator';
import { connectToStore } from '../../utils/workWithRedux';

const StatusContent = ({ fullName, userReview }) => {
  let message = ', ';
  if (userReview?.reviewWasRemoved) {
    message += 'вы удалили свой отзыв';
  } else if (userReview?.review) {
    message += 'спасибо за отзыв';
  } else if (!userReview?.review) {
    message += 'вы еще не оставляли  свой отзыв';
  }
  return (
    <span style={{ color: 'green' }}>
      {fullName}
      {message}
    </span>
  );
};

const ReviewStatus = ({
  commodityData: { userReview },
  userData: { fullName },
  loading,
  oldReview,
}) => {
  const loadingReview = loading ? <LoadingIndicator /> : null;
  const content = !loading ? (
    <StatusContent
      userReview={userReview}
      fullName={fullName}
      oldReview={oldReview}
    />
  ) : null;
  return (
    <h4 style={{ textAlign: 'center', margin: '0' }}>
      {loadingReview}
      {content}
    </h4>
  );
};

export default connectToStore(
  ['userData.fullName', 'commodityData.userReview'],
  null
)(ReviewStatus);
