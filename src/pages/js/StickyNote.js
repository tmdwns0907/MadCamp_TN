import React, { Component } from 'react';
import Note_Middle from './Note_Middle';
import Note_Bottom from './Note_Bottom';
import '../css/StickyNote.css';
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

class StickyNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            isToggleOn: true
<<<<<<< HEAD
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({ isToggleOn: !prevState.isToggleOn }));
    }

    render() {
        const dragHandlers = { onStart: this.onStart };
=======
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
>>>>>>> a188b95eb9b0f0f912051ff09ef406368222db8c
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
<<<<<<< HEAD
                                </div>
                                <div className="close-button">
                                    &times;
                                    <span class="tooltip">닫기</span>
=======
                                    <div className="color-tab">color
                                    <div className="black"></div>
                                    <div className="white"></div>
                                    <div className="yellow"></div>
                                    </div>
    </div>
                                <div className="close-button">
                                    &times;
                <span className="tooltip">닫기</span>
>>>>>>> a188b95eb9b0f0f912051ff09ef406368222db8c
                                </div>
                            </div>
                        </strong>
                        <section className="note-middle-wrapper">
<<<<<<< HEAD
                            <Note_middle />
                        </section>
                        <section className="note-bottom-wrapper">
                            <Note_bottom />
=======
                            <Note_Middle></Note_Middle>
                        </section>
                        <section className="note-bottom-wrapper">
                            <Note_Bottom></Note_Bottom>
>>>>>>> a188b95eb9b0f0f912051ff09ef406368222db8c
                        </section>
                    </div>
                </div>
            </Draggable >
        );
    }
};

//export default StickyNote;

const sticky = document.createElement('div');
sticky.id = "stickyNote";
document.body.appendChild(sticky);
ReactDOM.render(<StickyNote />, sticky);
