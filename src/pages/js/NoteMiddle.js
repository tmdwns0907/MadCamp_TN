import React from 'react';
import '../css/NoteMiddle.css';

const NoteMiddle = ({ value, onChange }) => {
    return (
        <div className="note-middle">
            <div className="note-text">
                <textarea value={value} onChange={onChange} />
            </div>
        </div>
    );
};

export default NoteMiddle;

