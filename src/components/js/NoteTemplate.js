import React from 'react';
import '../css/NoteTemplate.css';

const NoteTemplate = ({ form, children }) => {
  return (
    <main className="note-template">
      <div className="title">
        My Sticky Note
      </div>
      <section className="form-wrapper">
        {form}
      </section>
      <section className="notes-wrapper">
        {children}
      </section>
    </main>
  );
};

export default NoteTemplate;