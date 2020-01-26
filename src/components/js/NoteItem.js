import React, { Component } from 'react';
import '../css/NoteItem.css';

class NoteItem extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.checked !== nextProps.checked;
	}
	render() {
		const { text, url, checked, id, onToggle, onRemove } = this.props;

		console.log(id);

		return (
			<div className='note-item' onClick={() => onToggle(id)}>
				<div
					className='remove'
					onClick={e => {
						e.stopPropagation(); // stops onToggle to be executed
						onRemove(id);
					}}>
					&times;
				</div>

				<div className={`note-text ${checked && 'checked'}`}>
					<div>{text}</div>
					<div>{url}</div>
				</div>
				{checked && <div className='check-mark'>✓</div>}
			</div>
		);
	}
}

export default NoteItem;
