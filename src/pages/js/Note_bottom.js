import React, { Component } from 'react';
import '../css/note_bottom.css';
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Note_bottom extends Component {
    
    render() {
        return (
            <div className= "note-bottom">
            <FontAwesomeIcon icon={faThumbtack} />
            </div>
        );
    }
};

export default Note_bottom;
