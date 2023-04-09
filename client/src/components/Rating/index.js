import Box from '@mui/material/Box';
import URating from '@mui/material/Rating';
import React, { useState, useEffect } from 'react';
import { updateCommodityRating } from './utils';
import { connectToStore } from '../../utils/workWithRedux';

const Rating = ({
  readOnly,
  userRating,
  editable = true,
  commodityData = {},
  funcsForUpdate = {},
  userData: { token, fullName, avatarSrc, userName },
}) => {
  const { id: commodityId, userReview } = commodityData,
    [localUserRating, changeLocalUserRating] = useState(+userRating);
  const [value, setValue] = useState(+userRating);
  useEffect(() => {
    changeLocalUserRating(userRating);
  }, [userRating]);

  const dataForUpdateRating = {
      avatar: avatarSrc,
      reviewId: userReview?.reviewId,
      token,
      commodityId,
      editable,
      localUserRating,
      userReview,
      fullName,
      userName,
    },
    funcsForUpdateRating = { changeLocalUserRating, ...funcsForUpdate };

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}>
      <URating
        readOnly={readOnly}
        name='simple-controlled'
        value={value}
        onChange={(event, newValue) => {
          updateCommodityRating(
            event,
            dataForUpdateRating,
            funcsForUpdateRating
          );
          setValue(newValue);
        }}
      />
    </Box>
  );
};

export default connectToStore(['userData'], null)(Rating);
