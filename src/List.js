import React, {Component } from 'react';
//import ReactDOM from 'react-dom'

import PropTypes from 'prop-types';

import Card from './Card';

class List extends Component{
    render(){
        let cards = this.props.cards.map((card)=> { // element cards bedzie nazwany card
            return <Card key={card.id}
            taskCallbacks={this.props.taskCallbacks} {...card}/> //...operator rozszczepienia spread operator
        });
        return ( // zwracamy cards wlasnosci ida w gore do kanbanboard
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>);
    };
}
List.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
};
export default List;


