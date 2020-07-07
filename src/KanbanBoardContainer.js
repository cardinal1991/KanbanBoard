import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';

import update from 'react-addons-update';

class KanbanBoardContainer extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            cards:[],
        };
    }

    componentDidMount(){
        fetch('./contacts.json')
        .then((response)=> response.json())
        .then((responseData) => {
            this.setState({cards: responseData});
        })
        .catch((error)=>{
            console.log('Błąd pobierania i przetwarzania danych.', error);
        });
    }

   

    deleteTask(cardId, taskId, taskIndex){
        //szuka indexu karty
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

        //nowy obiekt pusty? bez zadania
        let nextState = update(this.state.cards,{
            [cardIndex]: {
                tasks: {$splice: [[taskIndex,1]]}
            }
        });

        //stan komponentu ustawia na zmieniony obiekt
        this.setState({card:nextState});
        //wywołuję API w celu usuniecia zadania z serwera
        fetch(`${'./contacts.json'}/cards/${cardId}/tasks/${taskId}`,{
            method: 'delete',
        });

    }

    toggleTask(cardId, taskId, taskIndex){
        //szuka indexu karty
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        //zapisuje referencje do wartosci done zadania.
        let newDoneValue;
        //za pomocą $apply zmienimy wartość done na przeciwną
        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks:{
                    [taskIndex]:{
                        done: {$apply: (done) => {
                            newDoneValue = !done
                            return newDoneValue;
                        }}
                    }
                }
            }
        });
        //ustawia staan komponentu na zmieniony obiekt.
        this.setState({cards:nextState});

        //wywoluje API, aby przelączyć zadanie na serwerze.
        fetch(`${'./contacts.json'}/cards/${cardId}/tasks/${taskId}`,{
            method: 'put',
            body: JSON.stringify({done:newDoneValue})
        });

    }

    addTask(cardId, taskName){
           //szuka indexu karty
           let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

           //nowe zadanie z tymczasowym id
           let newTask = {id:Date.now(), name:taskName, done:false};

           //tworzt nowy obiekt i dodaje do tablicy zadan
           let nextState = update(this.state.cards, {
               [cardIndex]: {
                   tasks: {$push: [newTask]}
               }
           });
           //ustawia stan kopm. na zmieniony obiekt
           this.setState({cards:nextState});

           //wyw api +zad na serw.
           fetch(`${'./contacts.json'}/cards/${cardId}/tasks`,{
            method: 'post',
            body: JSON.stringify(newTask)
           })
           .then((response)=>response.json())
           .then((responseData)=>{
               //id serw.zad.->react
               newTask.id=responseData.id
               this.setState({cards:nextState});
           });
    }


    render(){
        return <KanbanBoard cards={this.state.cards}
        taskCallbacks={{
            toggle: this.toggleTask.bind(this),
            delete: this.deleteTask.bind(this),
            add: this.addTask.bind(this)
        }} />
    }
}

export default KanbanBoardContainer;

