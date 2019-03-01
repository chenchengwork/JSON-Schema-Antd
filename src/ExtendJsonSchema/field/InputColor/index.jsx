import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Input, Row, Col } from 'antd';
import SketchPicker from 'react-color/lib/Sketch';
import {render as reactDomRender, unmountComponentAtNode} from "react-dom";

const mountDomId = "input-color-id";
const colorImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABO1BMVEVHcExjsb/uTqzhymrlZp7Rjox7w57FwYJNm+aw6VX+m0/6Soe611x2urJkoNbks2r0aG2Du6v/MJhIm+r/MZj/MZj/QWj/c03+m1D/TlCSxZTktWH7zFSg3XBxr7y/u4A7kvo5lPn/Kqz/N4Rnodb/gk3+sU//dE7/0VL/J8X/Jb6FyZJ6psNaqs2z61LAzmP6Mb/Sl4Lgd5OXsar9pFBImez/S01vua//OX7+jk7+Ykz+bkz/LaH/V0z5ML3/QGn/JMH+eU3/L5z/Rlj/PXOR04Cyu5P9uU/+g03/JrhZqs2j4GeFyo+Cqrz8y1L20Fe35lM8lfX/M43/KK//QmBvpMtRo9qRsK70P7TBymLXj4bLrHX9w1DUxnWitqHcf4/tz2DQnX7+OYeb2nPgdJXGumzsV6H5sVH/MZea7IfDAAAANHRSTlMA/fz9/iH9/v/+/jr9Nv02VFTz2dmB0MPZ7IGB0Mv9w76Bvr7Zgb7YVFTYx77H2dnH2MfYBQ7XUQAAAelJREFUSMft1VlbgkAUBuBUlCnFpX192ve9RNxAU3Oh0BYETcUlxf7/L+gMWHoxqPf1eXveM2eAGWdm/vN3417aX5yfX9xbck9V7l/OhMNvb6n4+3vh7HRiuXNZTvyCZFK4cU6YZk2WE4kRINjHzuUOhdLpBCzRwaAAoGIfJ5xrGMBMmR9Qqdh1ynqqlSjPA8G76KTihYIAC1BU987y+URNkB4COwZNvwU4jsVMIsvhMAAYSIfyj49bcr3vIWYIPFTGBNC/CaDtI4LD/AMEDB+Cob7igqDj8natVtsgbzmfzxsAhAEqVBe6A+htE8FqBGKiaCj9ldIp3L3Xq1ar10QwFzEDJMbzHb3bbJvlVY+HCIJz+DdIEKo8Lz+ZJY8UHEnf8zQ7zBURHPX7/RykXi+WGnRZ5FyPj5+fTzhbRLCRG5QXSy06qyAb9/w8IOvkF1c3ikstR4PWVIQUkTMIIIb8qjeLRQwcDppWJcQqCse5XJhsWXxLJ9C95YD+WU0CgJBoM0nA6nPdxKBB05omlRHLIlE0wLn1AcLt6WxWVcsYsIpow2uMOda+xgh4hV1gwIw71D4o1zRVKnsBvMKDEm3MhGtmG4A0BJfOiTdT4F6VJK+XBcAuBKa6+5j1iwMvWtjZZf7/Nv5wvgHGFpB5+rlLRwAAAABJRU5ErkJggg==";

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
                            if(typeof this.props.onChange === "function") {
                                const currentColor = e.rgb.a < 1 ? `rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})` : e.hex
                                this.props.onChange(currentColor);
                            }
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
                    <Input value={this.props.color} onChange={(e) => this.props.onChange(e.target.value)}/>
                </Col>
                <Col span={2}>
                    <div style={{
                        width: 30,
                        height: 30,
                        backgroundImage: `url(${colorImg})`,
                        backgroundSize: "30px 30px",
                        cursor: "pointer",
                    }} onClick={this.handleColorShow}></div>
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
