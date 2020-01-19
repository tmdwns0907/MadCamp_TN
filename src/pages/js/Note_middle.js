import React from 'react';
import '../css/note_middle.css';

const Note_middle = ({value}) => {

    return (
        <div className="note-middle">
            <div className="note">
                <textarea value={value}>Add your note...</textarea>
            </div>
            </div>
        );
};

export default Note_middle;

