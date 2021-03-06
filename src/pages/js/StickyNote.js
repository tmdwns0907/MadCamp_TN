import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/StickyNote.css';
import { faThumbtack, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

class StickyNote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			isToggleOn: true,
			pinbgcolor: '',
			cbtbgcolor: '',
			wholecolor: '',
			is_visible: 'hidden',
			opac: 0,
			position: 'absolute',
			text: '',
			top_color: '#FCF4AD',
			bottom_color: '#FCF8D9',
			ctop: 200,
			left: 200
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		//this.sizeChange = this.sizeChange.bind(this);
		this.timesClick = this.timesClick.bind(this);
	}

	handleClick() {
		const newColor = this.state.isToggleOn ? '#e3fafc' : '';
		const newPos = this.state.isToggleOn ? 'fixed' : 'absolute';
		const target = document.getElementsByClassName('container')[0];
		const clientRect = target.getBoundingClientRect();
		const relativeTop = clientRect.top;
		const scrolledTopLength = window.pageYOffset;

		console.log(scrolledTopLength);
		console.log(this.state.isToggleOn);

		const temp = scrolledTopLength + relativeTop;

		console.log(temp);
		const newTop = this.state.isToggleOn ? relativeTop : temp;

		console.log(newTop);
		console.log(this.state.ctop);
		console.log(this.state.pinbgcolor);

		this.setState(prevState => ({
			isToggleOn: !this.state.isToggleOn,
			pinbgcolor: newColor,
			ctop: prevState.ctop - prevState.ctop + newTop,
			position: newPos
		}));
		//window.pageYOffset=0
		console.log(this.state.ctop);
		console.log(this.state.pinbgcolor);
	}

	handleDrag = (e, ui) => {
		console.log(ui.deltaY);
		this.setState({
			ctop: this.state.ctop + ui.deltaY,
			left: this.state.left + ui.deltaX
		});
		console.log(this.state.ctop);
	};

	yellowClick = () => {
		this.setState({ top_color: '#FCF4AD', bottom_color: '#FCF8D9' });
	};
	greenClick = () => {
		this.setState({ top_color: '#D4F9D6', bottom_color: '#E9FEEA' });
	};
	pinkClick = () => {
		this.setState({ top_color: '#FDCBFA', bottom_color: '#FDE2FB' });
	};
	purpleClick = () => {
		this.setState({ top_color: '#F3C7FF', bottom_color: '#F3DAFA' });
	};
	blueClick = () => {
		this.setState({ top_color: '#B7ECFB', bottom_color: '#D2F3FC' });
	};
	grayClick = () => {
		this.setState({ top_color: '#868687', bottom_color: '#C1C1C2' });
	};
	charcoalClick = () => {
		this.setState({ top_color: '#575757', bottom_color: '#8A898B' });
	};

	buttonClick = () => {
		const flag = this.state.is_visible == 'hidden' ? 'visible' : 'hidden';
		const newColor = this.state.is_visible == 'hidden' ? '#e3fafc' : '';
		const newOpac = this.state.opac == 0 ? 1 : 0;
		this.setState({
			is_visible: flag,
			opac: newOpac,
			cbtbgcolor: newColor
		});
	};

	handleChange(event) {
		this.setState({ text: event.target.value });

		chrome.runtime.sendMessage(
			{
				action: 'change-note',
				text: event.target.value,
				id: this.state.id
			},
			res => {
				//this.changeState(res.state);
				//alert(res.success);
			}
		);
	}

	timesClick() {
		process.exit(1);
	}

	removeNote() {
		chrome.runtime.sendMessage({ action: 'remove-note-content', id: this.state.id }, res => {
			//alert(res.success);
		});
	}

	/*sizeChange(event) {
        this.setState({ 
            width: event.target.width,
        height:event.target.height });
    }*/

	render() {
		return (
			<Draggable cancel='strong'>
				<div
					className='container'
					style={{
						position: this.state.position,
						top: this.state.ctop,
						left: this.state.left
					}}>
					<div className='note-title' style={{ background: this.state.top_color }}>
						<FontAwesomeIcon
							className='pin'
							style={{ background: this.state.pinbgcolor }}
							onClick={this.handleClick}
							icon={faThumbtack}>
							{this.state.isToggleOn ? console.log('on') : console.log('off')}
						</FontAwesomeIcon>
						<span className='right-side' style={{ float: 'right' }}>
							<span
								className='change-color-button'
								style={{ background: this.state.cbtbgcolor }}
								onClick={this.buttonClick}>
								&#x022EF;
								<div
									className='color-tab'
									style={{
										visibility: this.state.is_visible,
										opacity: this.state.opac
									}}>
									<div className='yellow' onClick={this.yellowClick}></div>
									<div className='green' onClick={this.greenClick}></div>
									<div className='pink' onClick={this.pinkClick}></div>
									<div className='purple' onClick={this.purpleClick}></div>
									<div className='blue' onClick={this.blueClick}></div>
									<div className='gray' onClick={this.grayClick}></div>
									<div className='charcoal' onClick={this.charcoalClick}></div>
								</div>
							</span>
							<span className='times-button' onClick={process.exit}>
								<FontAwesomeIcon
									className='times-icon'
									style={{ color: 'red' }}
									onClick={this.removeNote}
									icon={faTimes}
								/>
								<span className='tooltip'>닫기</span>
							</span>
						</span>
						<strong className='no-cursor'>
							<div className='note-middle-wrapper' style={{ background: this.state.bottom_color }}>
								<textarea
									className='my-text'
									placeholder='Add your Note!'
									value={this.state.text}
									style={{ background: this.state.bottom_color }}
									onChange={this.handleChange}
								/>
							</div>
						</strong>
					</div>
				</div>
			</Draggable>
		);
	}
}

// add id
chrome.storage.sync.get('maxID', item => {
	var id = item.maxID;	
	if (isNaN(id)) id = -1;

	console.log(id);

	chrome.storage.sync.set({ maxID: id + 1 }, () => {
		const sticky = document.createElement('div');
		sticky.id = `stickyNote-${id + 1}`;
		document.body.appendChild(sticky);
		ReactDOM.render(<StickyNote />, sticky);
	});
});
