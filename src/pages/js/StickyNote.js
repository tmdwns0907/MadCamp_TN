import React, { Component } from 'react';
import Note_middle from './Note_middle';
import Note_bottom from './Note_bottom';
import '../css/StickyNote.css';
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

class StickyNote extends Component {

    render() {
        return (

            <Draggable handle="strong">
                <div className="container">
                    <div className="sticky-note-template">
                        <strong className="cursor">
                            <div className="note-title">
                                <FontAwesomeIcon icon={faThumbtack} />
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

