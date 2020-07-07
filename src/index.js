import React from 'react';
import ReactDOM from 'react-dom'



import './App.css'

import KanbanBoardContainer from './KanbanBoardContainer';

var way = document.querySelector('#container');

// let cardsList=[
//     {
//     id:1,
//     title:"przeczytac ksiazke",
//     description:"Muszę przeczytać **książkę**",
//     color:'#BD8D31',
//     status:"in-progress",
//     tasks:[]

//     },
//     {
//     id:2,
//     title:"napisac kodu",
//     description:"Muszę przepisac kod z ksiazki strona www: [Helion](https://www.google.pl)",
//     color:'#3A7E28',
//     status:"todo",
//     tasks:[
//         {
//             id:1,
//             name:"example1",
//             done:true
//         },
//         {
//             id:2,
//             name:"example2",
//             done:false
//         },
//         {
//             id:3,
//             name:"example3",
//             done:false
//         }
//     ]

//     }
// ];

ReactDOM.render(<KanbanBoardContainer/>, way);
    // exportujemy cardsList jako cards
    //raczej spinamy cards z cardsListzs
    // tu ostatecznie dochodza wszystkie wlasnosci //istotna zmiana patrz str83