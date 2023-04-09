/** @format */
import * as React from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SwitchBuyBtn from '../../SwitchBuyBtn';
import RatingInMedal from '../../Rating/RatingInMedal';
import { createValidImgSrc, scrollToTop } from '../../../utils/workWithBrowser';
import UAHryvnia from './images/UA-Hryvnia.svg';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: #fff;
  :hover {
    color: inherit;
    text-decoration: none;
  }
`;
const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

export default function CommodityPreviewCard({
  data: {
    id,
    previewImg: { previewImgSrc, previewImgAlt },
    price,
    title,
    rating,
  },
}) {
  return (
    <Card
      style={{
        margin: '10px 0',
        border: '1px solid gray',
        padding: '7px',
        width: 'calc(95%/3)',
        textAlign: 'center',
        position: 'relative',
      }}>
      <CardHeader
        title={title.length <= 21 ? title : title.slice(0, 25) + '...'}
      />
      <div>
        <img
          style={{ maxWidth: '400px', height: '400px ' }}
          src={createValidImgSrc(previewImgSrc)}
          alt={previewImgAlt}
        />
      </div>
      <CardContent>
        <Flex>
          Цена: {price} гр.
          <img
            style={{ width: '28px', marginLeft: '10px ' }}
            src={UAHryvnia}
            alt='ua hryvnya'
          />
        </Flex>
      </CardContent>
      <RatingInMedal rating={rating.general} />
      <Stack direction='row' spacing={2} style={{ justifyContent: 'center' }}>
        <SwitchBuyBtn id={id} />
        <Button variant='contained'>
          <StyledLink
            to={`/Goods/commodity-${id}`}
            onClick={() => scrollToTop()}>
            Подробнее
          </StyledLink>
        </Button>
      </Stack>
    </Card>
  );
}
