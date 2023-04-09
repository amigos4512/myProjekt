/** @format */

import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connectToStore } from '../../utils/workWithRedux';
import { fetchGoods } from '../../actions/goodsList';
import { findGoods } from '../../utils/workWithApiRequests';
import Select from './SelectItem';
import styled from 'styled-components';

const SearchWrapper = styled.form`
  width: 50%;
  position: relative;
  input {
    width: 100%;
    height: 33px;
    padding-right: 18px;
    border-width: 1px;
    border-radius: 4px;
    padding-left: 8px;
  }
  input::placeholder {
    color: rgba(0, 0, 0, 0.87);
    font-style: italic;
    font-size: 16px;
  }
`;
const Button = styled.button`
  color: black;
  height: 33px;
  position: relative;
  border: none;
  :hover {
    box-shadow: none;
    color: #1565c0;
    background-color: aqua;
  }
  :focus {
    box-shadow: none;
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 50%;
`;

const SearchAndSelect = ({ actions: { fetchGoods }, history }) => {
  const [value, updateValue] = useState('');

  const InputVal = e => {
   
  if(value!==''){
      e.preventDefault();
      e.stopPropagation()
      findGoods(e, history, value.trim(), fetchGoods)
  }
  else{
    e.preventDefault();
    e.stopPropagation()
    history.push(`/Goods`)
    fetchGoods()
  }
  };

  return (
    <Flex>
      <Select />
      <SearchWrapper
        onSubmit={InputVal}
        >
        <input
          type='text'
          placeholder='Введите название или категорию ...'
          value={value.trimStart()}
          onChange={e => updateValue(e.target.value)}
          
        />
      </SearchWrapper>
      <Button type='submit' 
      onClick={InputVal}
      >
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </Flex>
  );
};

export default connectToStore(null, { fetchGoods })(SearchAndSelect, true);
