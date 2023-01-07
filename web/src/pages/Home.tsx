import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { IList } from '../types';
import List from '../components/List';
import '../styles/main.css';

const Home = () => {
   const [lists, setLists] = useState<IList[]>([]);

   const fetchData = async () => {
      try {
         const response = await axios.get('http://localhost:4000/todos/lists');
         setLists(response.data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);
   return (
      <div className='main-container'>
         <div className='list' id='add-list'>
            create a new list
            <br />
            <div id='plus'>+</div>
         </div>
         {lists.map((list: IList) => (
            <List {...list} key={list.id} />
         ))}
      </div>
   );
};

export default Home;
