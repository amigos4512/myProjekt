/** @format */

import React from 'react';
import styled from 'styled-components';
import Img from './images/delivery.png';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import ChatIcon from '@mui/icons-material/Chat';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const Delivery = styled.div`
  background-color: honeydew;
  padding: 20px;
  border: 1px solid silver;
  box-shadow: 0.3em 0.3em 1em rgba(0, 0, 0, 0.2);
  && h4,
  h5 {
    text-align: center;
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const DeliveryPage = () => {
  return (
    <Delivery>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img style={{ width: '23%' }} src={Img} alt='delivery img' />
        <h2 style={{ marginLeft: '6%' }}>Информация о доставке заказов </h2>
      </div>
      <p>
        Доставка осуществляется с понедельника по пятницу. В выходные и
        праздничные дни отдел доставки не работает.
      </p>
      <h2>Доставка по Украине </h2>
      <p>
        Доставка в города Украины осуществляется транспортной компанией{' '}
        <a href='https://novaposhta.ua'>"НОВА ПОШТА" </a>
        На сайте транспортной компании Вы можете уточнить возможность доставки в
        Ваш населенный пункт, а также тарифы и сроки доставки.
      </p>
      <p>
        Услуги доставки оплачиваются покупателем. Обязательно проверяйте заказ
        на почте при получении. Если у Вас возникли трудности с получением
        заказа, какие-либо вопросы или предложения, пожалуйста, свяжитесь с
        нами:
      </p>

      <Flex>
        <LocalPhoneIcon style={{ margin: '3px 5px 0 0' }} />
        <h4>По телефонам:</h4>
      </Flex>
      <h4>(097) 1812089;</h4>
      <h4>(097) 1812089.</h4>
      <Flex>
        <AccessTimeFilledIcon style={{ margin: '3px 5px 0 0' }} />
        <h4>Время работы:</h4>
      </Flex>
      <h5>Понедельник - Пятница: с 9:00 до 18:00</h5>
      <Flex>
        <AttachEmailIcon style={{ margin: '3px 5px 0 0' }} />
        <h4>E-mail: </h4>
      </Flex>

      <h5>
        <a href='https://mail.ukr.net'>amigos4512@ukr.net</a>
      </h5>
      <Flex>
        <ChatIcon style={{ margin: '3px 5px 0 0' }} />
        <h4>Viber</h4>
      </Flex>

      <h4>(097) 1812089</h4>
    </Delivery>
  );
};
