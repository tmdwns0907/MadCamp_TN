import React from 'react';
import '../css/Note_Middle.css';

const Note_Middle = ({value}) => {

    return (
        <div className="note-middle">
            <div className="note-text">
                <textarea value={value}>Add your note...</textarea>
            </div>
            </div>
        );
};

export default Note_Middle;

