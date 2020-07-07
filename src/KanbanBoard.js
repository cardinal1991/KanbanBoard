import React, {Component } from 'react';
//import ReactDOM from 'react-dom'

import PropTypes from 'prop-types';

import List from './List'

var menu = 'Do zrobienia';

class KanbanBoard extends Component{
    render(){
        return(// zwracamy 3 kolumny jako 3 listy oddzielone wlasnosci ida w gore do index
            <div className='app'>  

                <List  title={menu} taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card)=>card.status === "todo") // to nam filtruje cards wlasnoscia status
                } />

                <List  title='W toku' taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card)=>card.status === "in-progress")
                } />

                <List  title='Zrobione' taskCallbacks={this.props.taskCallbacks} cards={
                    this.props.cards.filter((card)=>card.status === "done")
                } />

            </div>
        );
    }
};

KanbanBoard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
}

export default KanbanBoard

//str84 dodaje taskCallbacks={this.props.taskCallbacks}