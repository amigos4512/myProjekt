import React from 'react';
import ReactLoading from 'react-loading';

const LoadingIndicator = ({ type, color }) => (
  <div style={{ textAlign: '-webkit-center' }}>
    <ReactLoading type={type} color='green' height='18px' width='40px' />
  </div>
);

export default LoadingIndicator;
