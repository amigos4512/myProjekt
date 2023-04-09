/** @format */

import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { fetchGoods } from '../../actions/goodsList';
import { findGoods } from '../../utils/workWithApiRequests';
import { connectToStore } from '../../utils/workWithRedux';
 function SelectItem({ actions: { fetchGoods }, history }) {
  const [value, setValue] = React.useState('');
  const handleChange = event => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
  if(selectedValue!==''){
    findGoods(event, history, selectedValue.trim(), fetchGoods);
  }else{
    fetchGoods()
    history.push(`/Goods`)
  }
  };

  return (
    <>
      <FormControl sx={{ m: 0, width: '45%' }}>
        <Select
          style={{
            height: '37px',
            borderWidth: '1px',
            backgroundColor: 'white',
          }}
          value={value}
          onChange={handleChange}
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
        </Select>
      </FormControl>
    </>
  );
}
export default connectToStore(null, { fetchGoods })(SelectItem, true);