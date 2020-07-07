import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import CheckList from './CheckList'
import marked from 'marked'

let titlePropType = (props, propName, componentName) => {  //sprawdzimy dlugosc tekstu
    if(props[propName]) {
        let value = props[propName];
        if(typeof value !== 'string' || value.length > 80) {
            return new Error(
                `Wartość ${propName} w ${componentName} jest dłuższa niż 80 znaków.`
            );
        }
    }
}

class Card extends Component{
    constructor(){
        super(...arguments);
        this.state={
            showDetails: false
        };
    }
    toggleDetails(){
        this.setState({showDetails: !this.state.showDetails});
    }

    render(){
        let cardDetails;
        if(this.state.showDetails){
            cardDetails=(
                <div className="card_details">
                   <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
                    <CheckList cardId={this.props.id} 
                    tasks={this.props.tasks}
                    taskCallbacks={this.props.taskCallbacks}/>
                </div>
            );
        };

        let sideColor={
            position: 'absolute',
            zIndex: -1,
            top:0,
            bottom:0,
            left:0,
            width:7,
            backgroundColor: this.props.color // fajna opcja
        };

        return( // tytul karty
            <div className="card">

             <div style={sideColor} />

                <div className={this.state.showDetails? "card_title card_title--is-open":"card_title"}
                 onClick={ this.toggleDetails.bind(this) 
                }>{this.props.title}
                </div> 

                {cardDetails}

            </div> 
            ); //opis karty oraz ew. check lista
    }
};

Card.propTypes = {
    id:PropTypes.number,
    title: titlePropType,
    description: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.array,
    taskCallbacks: PropTypes.object,
};

export default Card;