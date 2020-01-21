import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/StickyNote.css';
import { faThumbtack, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            is_visible: "hidden",
            opac: 0,
            position: "absolute",

            text: "",

            top_color: "#FCF4AD",
            bottom_color: "#FCF8D9",

            
            top: "200px"
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.sizeChange = this.sizeChange.bind(this);
        this.timesClick=this.timesClick.bind(this);
    }


    handleClick() {
        const newColor = this.state.isToggleOn ? "#e3fafc" : ''
        const newPos = this.state.isToggleOn ? "fixed" : "absolute"
        const target=document.getElementsByClassName('container')[0]
        const clientRect=target.getBoundingClientRect()
        const relativeTop = clientRect.top
        const scrolledTopLength=window.pageYOffset
        console.log(scrolledTopLength)
        console.log(this.state.isToggleOn)
        const temp=scrolledTopLength+relativeTop
        console.log(temp)
        const newTop = this.state.isToggleOn ? relativeTop:temp
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
            pinbgcolor: newColor,
            position: newPos,
            top:newTop
        }));
        //window.pageYOffset=0
    }

    yellowClick = () => {
        this.setState(prevState => ({
            top_color: "#FCF4AD",
            bottom_color: "#FCF8D9"
        }));
    }
    greenClick = () => {
        this.setState(prevState => ({
            top_color: "#D4F9D6",
            bottom_color: "#E9FEEA"
        }));
    }
    pinkClick = () => {
        this.setState(prevState => ({
            top_color: "#FDCBFA",
            bottom_color: "#FDE2FB"
        }));
    }
    purpleClick = () => {
        this.setState(prevState => ({
            top_color: "#F3C7FF",
            bottom_color: "#F3DAFA"
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
    charcoalClick = () => {
        this.setState(prevState => ({
            top_color: "#575757",
            bottom_color: "#8A898B"
        }));
    }

    buttonClick = () => {
        const flag = this.state.is_visible == "hidden" ? "visible" : "hidden"
        const newColor = this.state.is_visible == "hidden" ? "#e3fafc" : ''
        const newOpac = this.state.opac == 0 ? 1 : 0
        this.setState(prevState => ({
            is_visible: flag,
            opac: newOpac,
            cbtbgcolor: newColor
        }));
    }

    handleChange(event) {
        this.setState({ text: event.target.value });
    }

    timesClick() {
        process.exit(1);
    }
    /*sizeChange(event) {
        this.setState({ 
            width: event.target.width,
        height:event.target.height });
    }*/

    render() {
        return (
            <Draggable cancel="strong"  onStart={() => this.state.isToggleOn}>
                <div className="container" style={{position: this.state.position, top:this.state.top}}>
                    

                        <div className="note-title" style={{ background: this.state.top_color }}>

                            <FontAwesomeIcon className="pin" style={{ background: this.state.pinbgcolor}} onClick={this.handleClick} icon={faThumbtack} >
                                {this.state.isToggleOn ? console.log("on") : console.log("off")}
                            </FontAwesomeIcon>
                            <span className= "right-side" style={{float:"right"}}>
                            <span className="change-color-button" style={{  background: this.state.cbtbgcolor }} onClick={this.buttonClick}>
                                &#x022EF;
                                    <div className="color-tab" style={{ visibility: this.state.is_visible, opacity: this.state.opac }}>
                                    <div className="yellow" onClick={this.yellowClick}></div>
                                    <div className="green" onClick={this.greenClick}></div>
                                    <div className="pink" onClick={this.pinkClick}></div>
                                    <div className="purple" onClick={this.purpleClick}></div>
                                    <div className="blue" onClick={this.blueClick}></div>
                                    <div className="gray" onClick={this.grayClick}></div>
                                    <div className="charcoal" onClick={this.charcoalClick}></div>
                                </div>
                            </span>
                            <span className="times-button" onClick={process.exit}>
                                <FontAwesomeIcon className="times-icon" style={{color:"red"}} icon={faTimes} />
                                <span className="tooltip">닫기</span>
                            </span>
                            </span>
                            <strong className="no-cursor">
                                <div className="note-middle-wrapper" style={{ background: this.state.bottom_color }}>

                                    <textarea className="my-text" placeholder="Add your Note!" value={this.state.text} style={{ background: this.state.bottom_color }} onChange={this.handleChange} />
                                </div>
                            </strong>
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