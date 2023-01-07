import React from 'react';
import { IItem, IList, IUser } from '../types';
import '../styles/list.css';
import Item from './Item';

const List = ({ title, items, users }: IList) => {
   return (
      <div className='list'>
         <div id='list-header'>
            <h2>{title}</h2>
            <button>+</button>
         </div>

         <p>
            Contributors: {users.map((user: IUser) => user.username).join(', ')}
         </p>

         <ul>
            {items.map((item: IItem) => (
               <Item {...item} />
            ))}
         </ul>
      </div>
   );
};

export default List;
