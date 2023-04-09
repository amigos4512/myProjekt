/** @format */

import React, { useState, useEffect } from 'react';
import ListView from '../ListView';
import DropDownItem from './DropDownItem';
import { validateInput } from '../../utils/workWithBrowser';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
.MuiOutlinedInput-notchedOutline{
  border-right: none;
    border-top: none;
    border-left: none;
}
`
const InputWithPrompt = ({
  funcForUpdate,
  defaultValue = '',
  valuesForPrompts = [],
  needValidate = false,
}) => {

  const [prompts, changePrompts] = useState(valuesForPrompts),
    [value, changeValue] = useState(defaultValue);
  useEffect(() => {
    changeValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <FormControl sx={{ m: 0, width: '80%' }}>
        <StyledSelect
          style={{
            height: '55px',
            backgroundColor: '#f0f0f0'
          }}
          value={value.trimStart()}
                  onChange={e => {
                    const newValue = e.target.value;
                    if (needValidate) {
                      validateInput(e, changeValue);
                    } else {
                      changeValue(newValue);
                    }
                    funcForUpdate(newValue);
                    changePrompts(
                      valuesForPrompts.filter(el =>
                        el.value.toLowerCase().includes(newValue.toLocaleLowerCase())
                      )
                    );
                  }}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value={''}>
            Выберите категорию
          </MenuItem>
          <MenuItem value={'Зимняя рыбалка'}>Зимняя рыбалка</MenuItem>
          <MenuItem value={'Катушки'}>Катушки</MenuItem>
          <MenuItem value={'Крючки'}>Крючки</MenuItem>
          <MenuItem value={'Леска, шнур'}>Леска, шнур</MenuItem>
          <MenuItem value={'Приманки'}>Приманки</MenuItem>
          <MenuItem value={'Оснастки'}>Оснастки</MenuItem>
          <MenuItem value={'Удилища и спининги'}>Удилища и спининги</MenuItem>
          <MenuItem value={'Аксессуары'}>Аксессуары</MenuItem>
        </StyledSelect>
      </FormControl>
      <div
      //  className={`dropDown ${classForDropDown}`}
       >
         <ListView
         listForRender={prompts}
           ComponentForRender={DropDownItem}
          // options={optionsForDropDown}
         />
       </div>
     
   
    </>
  );
}

export default InputWithPrompt;
