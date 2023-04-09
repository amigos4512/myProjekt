/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import ChatIcon from '@mui/icons-material/Chat';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SavingsIcon from '@mui/icons-material/Savings';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import styled from 'styled-components';

const Paymant = styled.div`
  background-color: honeydew;
  padding: 20px;
  border: 1px solid silver;
  box-shadow: 0.3em 0.3em 1em rgba(0, 0, 0, 0.2);
  & ul {
    margin: 19px 39px;
    padding: 0;
    font-size: 18px;
    color: darkblue;
    & li {
      padding-bottom: 10px;
    }
  }
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

export const PaymentPage = () => {
  return (
    <Paymant>
      <h1>Информация об оплате заказов</h1>
      <Flex>
        <CreditScoreIcon style={{ margin: '3px 5px 0 0' }} />
        <h4>Оплата банковской картой </h4>
      </Flex>
      <p>
        Если у вас есть банковская карта, вы сможете безопасно оплатить покупку
        с ее помощью.
      </p>
      <p>
        Оплата заказа производится через платежную систему картами VISA и
        MasterCard любого украинского банка на сайте либо другим удобным для вас
        способом.
      </p>
      <ul>
        <li>
          {' '}
          При переводе денег, обязательно подписывайте свой платеж в назначении
          платежа (номер заказа или фамилия, на кого оформлен заказ). Это
          позволит быстро и оперативно найти Вашу оплату и вовремя отправить
          заказ.
        </li>
        <li>
          {' '}
          Перевод производится на карту Приватбанка. При переводе денег с
          платежных карт других банков, деньги поступают на счет с задержкой 1-2
          дня. Учитывайте это при оплате заказов и делайте оплату вовремя.
        </li>
        <li>
          {' '}
          Для более быстрой обработки вашей оплаты, квитанцию (или скриншот
          экрана) сбрасывайте на Viber +38 (067) 637-26-07{' '}
        </li>
      </ul>
      <Flex>
        <SavingsIcon style={{ margin: '3px 5px 0 0' }} />
        <h4>Терминалы и кассы банков. </h4>
      </Flex>
      <p>
        Оплата производится наличными в любом отделении банка в кассе либо через
        терминал самообслуживания. Перевод осуществляется на карту Приватбанка.
      </p>
      <ul>
        <li>
          {' '}
          При оплате в назначении платежа обязательно указывайте номер заказа
          или фамилию, на кого оформлен заказ. Это позволит быстро и оперативно
          найти Вашу оплату и вовремя отправить заказ.
        </li>
        <li>
          {' '}
          Для более быстрой обработки вашей оплаты, фото квитанции сбрасывайте
          на Viber +38 (067) 637-26-07
        </li>
      </ul>
      <Flex>
        <LocalShippingIcon style={{ margin: '3px 5px 0 0' }} />
        <h4>Оплата при получении в отделении "Нова Пошта" - пока недоступна</h4>
      </Flex>
      <ul>
        <li>
          {' '}
          Возможна оплата наложенным платежом (оплата при получении в отделении
          "НОВА ПОШТА"), при этом Вы дополнительно оплачиваете расходы по
          наложенному платежу, согласно тарифам этой компании.
        </li>
        <li>
          {' '}
          Отправка заказа наложенным платежом возможна на сумму свыше 200,00
          грн.
        </li>
      </ul>
      <Link to='/return'>Гарантии обмена товара или денежное возмещение.</Link>
      <p>
        Если у Вас возникли трудности с оплатой заказа, какие-либо вопросы или
        предложения, пожалуйста, свяжитесь с нами:
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
    </Paymant>
  );
};
