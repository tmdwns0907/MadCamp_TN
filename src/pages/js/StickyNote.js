import React, { Component } from 'react';
import Note_middle from './Note_middle';
import Note_bottom from './Note_bottom';
import '../css/StickyNote.css';
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

class StickyNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
        }
    }
    

    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
     
        //this를 사용하기 위해서 bind를 해주어야 합니다. 
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick() {
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
      }
    
    render() {
        const dragHandlers = {onStart: this.onStart};
        return (

            <Draggable handle="strong" onStart={() => this.state.isToggleOn}>
                <div className="container">
                    <div className="sticky-note-template">
                        <strong className="cursor">
                            <div className="note-title">
                                
                                    <FontAwesomeIcon className="pin" onClick={this.handleClick} icon={faThumbtack} >
                                        {this.state.isToggleOn ? console.log("on") : console.log("off")}
                                    </FontAwesomeIcon>
                                
                                <div className="change-color-button">
                                    &#x022EF;
    </div>
                                <div className="close-button">
                                    &times;
                <span class="tooltip">닫기</span>
                                </div>
                            </div>
                        </strong>
                        <section className="note-middle-wrapper">
                            <Note_middle></Note_middle>
                        </section>
                        <section className="note-bottom-wrapper">
                            <Note_bottom></Note_bottom>
                        </section>
                    </div>
                </div>
            </Draggable >

        );
    }


};

export default StickyNote;

