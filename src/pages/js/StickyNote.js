import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NoteMiddle from './NoteMiddle';
import NoteBottom from './NoteBottom';
import '../css/StickyNote.css';
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import { Resizable, ResizableBox } from 'react-resizable';
class StickyNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            isToggleOn: true,
            pincolor: '',
            wholecolor: '',
            is_visible: "hidden",
            opac: 0,

            text: "Add your Note!",

            top_color: "#FCF4AD",
            bottom_color: "#FCF8D9",

            /*width:100,
            height:100*/
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.sizeChange = this.sizeChange.bind(this);
    }


    handleClick() {
        const newColor = this.state.isToggleOn ? "red" : "gray"
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
            pincolor: newColor
        }));
    }

    yellowClick = () => {
        this.setState(prevState => ({
            top_color: "#FCF4AD",
            bottom_color: "#FCF8D9"
        }));
    }
    blueClick = () => {
        this.setState(prevState => ({
            top_color: "#B7ECFB",
            bottom_color: "#D2F3FC"
        }));
    }
    grayClick = () => {
        this.setState(prevState => ({
            top_color: "#868687",
            bottom_color: "#C1C1C2"
        }));
    }

    buttonClick = () => {
        const flag = this.state.is_visible == "hidden" ? "visible" : "hidden"
        const newOpac = this.state.opac == 0 ? 1 : 0
        this.setState(prevState => ({
            is_visible: flag,
            opac: newOpac
        }));
    }

    handleChange(event) {
        this.setState({ text: event.target.value });
    }

    /*sizeChange(event) {
        this.setState({ 
            width: event.target.width,
        height:event.target.height });
    }*/

    render() {
        return (

            <Draggable handle="strong" onStart={() => this.state.isToggleOn}>
                <div className="container">
                    <div className="sticky-note-template">
                        <strong className="cursor">
                            <div className="note-title" style={{background:this.state.top_color}}>

                                <FontAwesomeIcon className="pin" style={{ color: this.state.pincolor }} onClick={this.handleClick} icon={faThumbtack} >
                                    {this.state.isToggleOn ? console.log("on") : console.log("off")}
                                </FontAwesomeIcon>

                                <div className="change-color-button" onClick={this.buttonClick}>
                                    &#x022EF;
                                    <div className="color-tab" style={{ visibility: this.state.is_visible, opacity: this.state.opac }}>color
                                    <div className="yellow" onClick={this.yellowClick}></div>
                                    <div className="blue" onClick={this.blueClick}></div>
                                    <div className="gray" onClick={this.grayClick}></div>
                                    </div>
                                </div>
                                <div className="close-button">
                                    &times;
                                    <span className="tooltip">닫기</span>
                                </div>
                            </div>
                        </strong>

                        <section className="note-middle-wrapper" style={{background:this.state.bottom_color}}>
                
                                <textarea value={this.state.text} style={{background:this.state.bottom_color}} onChange={this.handleChange} />
                        

                        </section>
                        <section className="note-bottom-wrapper" style={{background:this.state.bottom_color}}>
                        <ResizableBox className="box" width={20} height={20}>
            <span className="text">{"<ResizableBox>"}</span>
          </ResizableBox>
                        </section>
                    </div>
                </div>
            </Draggable >
            
        );
    }


};

const sticky = document.createElement('div');
sticky.id = "stickyNote";
document.body.appendChild(sticky);
ReactDOM.render(<StickyNote />, sticky);
