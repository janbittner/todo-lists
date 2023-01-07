import React from 'react';
import '../styles/item.css';
import { IItem } from '../types';

const Item = ({
   id,
   description,
   createdBy,
   status,
   title,
   deadline,
}: IItem) => {
   return (
      <li id='item' key={id}>
         <label>
            <input type='checkbox' />
            {title}
         </label>
         <div>...</div>
      </li>
   );
};

export default Item;
