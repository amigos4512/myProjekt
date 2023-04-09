import React from 'react';
import ListView from '../ListView';
import SmallCommodityPreviewCard from '../CommodityPreviewCard/Small';
import StringHelper from '../../utils/StringHelper';

const Configurate = ({ typePage, goods, ComponentWithoutData, currentPage, itemsPerPage }) => {

  let listForRender = [];

  if (typePage === 'Main') {
    listForRender.push(
      <ListView
        key={StringHelper.createId()}
        ComponentForRender={SmallCommodityPreviewCard}
        listForRender={goods.goods}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
    );
  } else {
    if (!goods.goods.length) {
      listForRender.push(
        <ListView
          key={StringHelper.createId()}
          ComponentWithoutData={ComponentWithoutData}
          listForRender={goods.goods}
        />
      );
    } else {
      listForRender.push(
        <ListView
          key={StringHelper.createId()}
          ComponentForRender={SmallCommodityPreviewCard}
          listForRender={goods.goods}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      );
    }
  }

 
  return listForRender;
};

export default Configurate;



