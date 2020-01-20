import React, { Component } from 'react';
import Note_Middle from './Note_Middle';
import Note_Bottom from './Note_Bottom';
import '../css/StickyNote.css';
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

class StickyNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            isToggleOn: true
        }
        this.handleClick = this.handleClick.bind(this);
    }
    

      handleClick() {
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
        document.getElementById("pin").style.backgroundColor="red";
      }
    
    

    render() {
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
                                    <div className="color-tab">color
                                    <div className="black"></div>
                                    <div className="white"></div>
                                    <div className="yellow"></div>
                                    </div>
    </div>
                                <div className="close-button">
                                    &times;
                <span className="tooltip">닫기</span>
                                </div>
                            </div>
                        </strong>
                        <section className="note-middle-wrapper">
                            <Note_Middle></Note_Middle>
                        </section>
                        <section className="note-bottom-wrapper">
                            <Note_Bottom></Note_Bottom>
                        </section>
                    </div>
                </div>
            </Draggable >

        );
    }


};

export default StickyNote;

