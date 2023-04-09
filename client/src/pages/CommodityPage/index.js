/** @format */

import React, { useEffect } from 'react';
import LoadingData from '../../components/LoadingData';
import Rating from '../../components/Rating';
import SimilarGoods from './SimilarGoods';
import Reviews from './Reviews';
import Feedback from './Feedback';
import SwitchBuyBtn from '../../components/SwitchBuyBtn';
import TextWithBr from '../../components/TextWithBr';
import styles from 'styled-components';
import { connectToStore } from '../../utils/workWithRedux';
import { updateUserReviews } from '../../actions/userData';
import {
  createValidImgSrc,
  scrollToElem,
  STORE_NAME,
} from '../../utils/workWithBrowser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { ReactTitle } from 'react-meta-tags';
import {
  fetchCommodity,
  fetchSimilarGoods,
  updateUserReview,
  updateReviews,
  updateRating,
} from '../../actions/commodityData';
import {
  calculateNumberOfRating,
  renderStars,
  calculateRatingPercentage,
  writeReview,
  initPage,
} from './utils';
import UAHryvnia from '../../components/CommodityPreviewCard/Small/images/UA-Hryvnia.svg';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import MoreRating from './MoreRating';

const CardContentStars = styles(CardContent)`
border : 0.5px solid #80808024;
border-radius: 10px;
background-color: aliceblue;
 .stars {
    svg {
      color: gold;
      font-size: 24px;
    }
  }
   .reviews {
    svg{
      cursor:pointer;
      color: gray;
    }
 }
  
`;
const CardContentPrice = styles(CardContent)`
border : 0.5px solid #80808024;
border-radius: 10px;
background-color: aliceblue;
  div {
    display: flex;
    align-content: center;
  }
  button{
    background-color: darkorchid;
  }
`;
const Description = styles(CardContent)`
border : 0.5px solid #80808024;
border-radius: 10px;
background-color: aliceblue;
word-break: break-word;
`;

const ExpandMore = styled(props => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CommodityPage = ({
  commodityData: {
    loading,
    error,
    title,
    rating,
    descr,
    img,
    reviews,
    price,
    category,
    countReviews,
    id,
    similarGoods,
    userReview,
  },
  userData: { userName },
  actions: {
    fetchCommodity,
    fetchSimilarGoods,
    updateUserReview,
    updateReviews,
    updateRating,
    updateUserReviews,
  },
  match,
}) => {
  useEffect(() => {
    const commodityId = match.params.id;
    initPage(commodityId, fetchCommodity, fetchSimilarGoods);
  }, [match.params.id, fetchCommodity, fetchSimilarGoods]);
  const [expanded, setExpanded] = React.useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <ReactTitle title={`${STORE_NAME} | товар: "${title}"`} />
      <LoadingData
        configData={{
          loading,
          error,
          funcForRender: null,
          routeForRedirect: '/',
        }}>
        <Card>
          <CardHeader
            title={title}
            style={{ textAlign: 'center', borderBottom: '1px solid gray' }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardMedia
                style={{ padding: '20px' }}
                component='img'
                image={createValidImgSrc(img?.imgSrc)}
                alt={img?.imgAlt ?? 'img'}
              />
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <Typography variant='h5' color='text.secondary'>
                  <span>Категория:</span> {category}
                </Typography>
                <CardContentStars className='flexWrap'>
                  <div className='stars'>
                    <FontAwesomeIcon icon={faStar} />{' '}
                    {userReview?.rating ? userReview.rating : rating.general}
                  </div>
                  <CardActions disableSpacing>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label='show more'>
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <div
                    className='reviews'
                    onClick={() =>
                      countReviews
                        ? scrollToElem('commodityPage__reviews')
                        : null
                    }>
                    <FontAwesomeIcon icon={faCommentAlt} />
                    {''} {countReviews}
                  </div>
                </CardContentStars>

                <Collapse in={expanded} timeout='auto' unmountOnExit>
                  <MoreRating
                    rating={rating}
                    calculateNumberOfRating={calculateNumberOfRating}
                    renderStars={renderStars}
                    calculateRatingPercentage={calculateRatingPercentage}
                    Rating={Rating}
                    userReview={userReview}
                    updateUserReview={updateUserReview}
                    updateReviews={updateReviews}
                    updateRating={updateRating}
                    updateUserReviews={updateUserReviews}
                    writeReview={writeReview}
                    userName={userName}
                    id={id}
                  />
                </Collapse>

                <Description>
                  <TextWithBr
                    text={descr}
                    maxlength={1000}
                    needReadMore={true}
                  />
                </Description>
                <CardContentPrice className=' flexWrap_SB'>
                  <div>
                    Цена: {price} гр{' '}
                    <img
                      style={{ width: '28px', marginLeft: '10px ' }}
                      src={UAHryvnia}
                      alt='ua hryvnya'
                    />
                  </div>
                  <SwitchBuyBtn id={id} />
                </CardContentPrice>
              </CardContent>
            </Grid>
          </Grid>
          <CardContent
            className='commodityPage__similarGoods'
            color='text.secondary'>
            <SimilarGoods goods={similarGoods} />
          </CardContent>

          <CardContent>
            <div className='commodityPage__reviews'>
              <Reviews reviews={reviews.filter(({ review }) => review)} />
            </div>
            <Feedback />
          </CardContent>
        </Card>
      </LoadingData>
    </>
  );
};

export default connectToStore(['commodityData', 'userData'], {
  fetchCommodity,
  fetchSimilarGoods,
  updateUserReview,
  updateReviews,
  updateRating,
  updateUserReviews,
})(CommodityPage);
