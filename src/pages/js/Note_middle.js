import React from 'react';
import '../css/Note_Middle.css';

<<<<<<< HEAD
const Note_middle = ({ value }) => {
=======
const Note_Middle = ({value}) => {
>>>>>>> a188b95eb9b0f0f912051ff09ef406368222db8c

    return (
        <div className="note-middle">
            <div className="note-text">
                <textarea value={value}>Add your note...</textarea>
            </div>
        </div>
    );
};

export default Note_Middle;

