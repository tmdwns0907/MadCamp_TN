import React from 'react';
import '../css/NoteMiddle.css';

const NoteMiddle = ({ value }) => {

    return (
        <div className="note-middle">
            <div className="note-text">
                <textarea value={value}>Add your note...</textarea>
            </div>
        </div>
    );
};

export default NoteMiddle;

