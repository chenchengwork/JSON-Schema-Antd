import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Input, Row, Col } from 'antd';
import SketchPicker from 'react-color/lib/Sketch';
import {render as reactDomRender, unmountComponentAtNode} from "react-dom";
import "./index.css";

const mountDomId = "input-color-id";

export default class InputColor extends PureComponent{
    static propTypes = {
        color: PropTypes.string,
        onChange: PropTypes.func
    };

    static defaultProps = {
        color: "rgba(0, 0, 0, 0.5)",
    };

    state = {
        isShowColorPicker: false,
    };

    handleColorShow = (e) => {
        const { isShowColorPicker } = this.state;
        const clientX = e.clientX;
        const clientY = e.clientY;

        this.setState({isShowColorPicker: !isShowColorPicker}, () => {

            if(this.state.isShowColorPicker) {
                mountReact(<div
                    style={{
                        display: 'block',
                        position: "absolute",
                        top: clientY + 20,
                        right: window.innerWidth - clientX,
                        zIndex: 1000000
                    }}
                >
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                        }}
                        onClick={(e) => this.handleColorShow(e)}
                    />
                    <SketchPicker
                        // color="#ffffff"
                        // color="hsla(255,0.5,0.2, 0.5)"
                        color={this.props.color}
                        onChange={(e) => {
                            if(typeof this.props.onChange === "function") this.props.onChange(e);
                        }}
                    />
                </div>);
            }else {
                unmountReact();
            }
        })
    };

    render(){

        return (
            <Row className={"input-color"}>
                <Col span={22}>
                    <Input value={this.props.color} onChange={() => {}}/>
                </Col>
                <Col span={2}>
                    <div className={"color-icon"} onClick={this.handleColorShow}></div>
                </Col>
            </Row>
        )
    }
}


/**
 * 挂载react组件
 * @param component //reactElement react组件
 */
const mountReact = (component) => {
    const domId = mountDomId;

    let domObject = document.querySelector('#' + domId);
    if(!domObject){
        const el = document.createElement('div');
        el.setAttribute('id', domId);
        document.querySelector('body').appendChild(el);
        domObject = el;
    }

    unmountComponentAtNode(domObject);

    reactDomRender(component, domObject);
}

/**
 * 销毁react组件
 */
const unmountReact = () => {
    const domObject = document.querySelector('#' + mountDomId);
    if(domObject) unmountComponentAtNode(domObject);
}
