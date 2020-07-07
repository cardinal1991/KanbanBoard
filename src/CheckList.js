import React, {Component } from 'react';
//import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';



class CheckList extends Component{

 checkInputKeyPress(evt){
     if(evt.key === 'Enter'){
         this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
         evt.target.value='';
     }
 }

    render(){
       


        let tasks = this.props.tasks.map((task)=> ( // mapujemy zadania z checklisty
            <li key={task.id} className="checklist_task">
                <input  type="checkbox" checked={task.done} onChange={
                    this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, this.props.taskIndex)
                }/>
                {task.name}
                <a  href="#" className="checklist_task--remove" onClick={
                    this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, this.props.taskIndex)
                }/>
            </li>
        ));
        return (
            <div className="checklist">
                <ul  >{tasks}
                </ul>
                <input type="text" className="checklist--add-task"
                placeholder="wpisz cos i nacisnij ENTER, aby dodac zadanie..."
                onKeyPress={this.checkInputKeyPress.bind(this)}/>
                
            </div>
        ); //zwracamy liste tasks z cardsList, 2 element tablicy z 3 podelementami
    }       // przypisujemy done jako wstepnie zaznaczone i imie z wlasnosci task bedacego elementem tasks
};

CheckList.propTypes = {
    cardId: PropTypes.number,
    taskCallbacks: PropTypes.object,
    tasks: PropTypes.array
};

export default CheckList;