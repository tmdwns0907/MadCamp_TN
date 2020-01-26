import React, { Component } from 'react';
import NoteItem from './NoteItem';

class NoteItemList extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.notes !== nextProps.notes;
	}

	render() {
		const { notes, onToggle, onRemove } = this.props;

		const noteList = notes.map(({ id, text, url, checked }) => (
			<NoteItem
				id={id}
				text={text}
				url={url}
				checked={checked}
				onToggle={onToggle}
				onRemove={onRemove}
				key={id}
			/>
		));
		return <div>{noteList}</div>;
	}
}

export default NoteItemList;
