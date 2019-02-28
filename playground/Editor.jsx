import React, { PureComponent } from 'react';
import JsonSchemaForm from "../src";


export default class Editor extends PureComponent{
    onFormDataChange = ({formData}) => {
        console.log(formData);
    };

    render(){
        let {schema, UISchema: uiSchema, formData} = style;

        formData = schema ? formData : {};
        schema = schema || {};
        uiSchema = uiSchema || {};

        // console.log("schema->", schema);
        // console.log("uiSchema->", uiSchema);
        // console.log("formData->", formData);

        return (
            <JsonSchemaForm
                // ArrayFieldTemplate={ArrayFieldTemplate}
                // ObjectFieldTemplate={ObjectFieldTemplate}
                // FieldTemplate={FieldTemplate}
                liveValidate={true}
                schema={schema}
                uiSchema={uiSchema}
                fields={{
                    // resourceFile: ResourceFileField,
                    // colorPicker: ColorPickerField,
                    // codeEditor: CodeEditorField,
                }}
                formData={formData}
                onChange={this.onFormDataChange}
                // validate={validate}
                // transformErrors={transformErrors}
                onSubmit={({formData}) =>{}}
                onBlur={(id, value) => {}}
                onFocus={(id, value) =>{}}
                onError={console.error}
            />
        )
    }
}


const style = {
    schema: {
        "title": "",
        "description": "",
        "type": "object",
        "required": [],
        "properties": {
            map:{
                "type": "object",
                title: "地图配置",
                "properties": {
                    "center": {
                        "type": "array",
                        "title": "中心点",
                        "minItems": 2,
                        "items": [
                            {
                                "title": "经度",
                                "type": "number",
                                "default": 104.223828
                            },
                            {
                                "title": "纬度",
                                "type": "number",
                                "default": 37.972688
                                // "default": 35.072688
                            }
                        ]
                    },
                    "zoom": {
                        type: "number",
                        title: "缩放等级",
                        default: 3
                    },
                    "pitch": {
                        type: "number",
                        title: "倾斜角度",
                        default: 70
                        // default: 0
                    },
                    "bearing": {
                        type: "number",
                        title: "旋转角度",
                        default: 0
                    },
                    "isInteractive":{
                        type: "boolean",
                        title: "开启交互",
                        default: true
                    },
                }
            },
            event: {
                "type": "object",
                title: "事件效果",
                properties: {
                    supernatantColor: {
                        type: "string",
                        title: "省份浮层颜色",
                        default: "#28407B"
                    },
                    supernatantOpacity: {
                        type: "number",
                        title: "省份浮层颜色透明度",
                        default: 0.8
                    }
                }
            },
            "legend": {
                type: "object",
                title: "图例",
                properties: {
                    "position": {
                        type: "object",
                        title: "位置",
                        properties: {
                            "top": {
                                type: "number",
                                title: "距离头部(px)",
                                default: 50
                            },
                            "left": {
                                type: "number",
                                title: "距离左侧(px)",
                                default: 0
                            },
                        }
                    },
                    repaymentColor: {
                        type: "string",
                        title: "还款颜色",
                        default: "#EFDE3F"
                    },
                    loanColor: {
                        type: "string",
                        title: "放款颜色",
                        default: "#FF3649"
                    },
                    "circleRadius": {
                        type: "number",
                        title: "圆半径",
                        default: 7
                    },
                    "fontSize": {
                        type: "number",
                        title: "字体大小",
                        default: 14
                    },
                    "fontColor": {
                        type: "string",
                        title: "字体颜色",
                        default: "#ffffff"
                    },

                }
            },
            "ui":{
                type: "object",
                title: "柱和呼吸灯",
                properties: {
                    "breatheDiameter": {
                        type: "number",
                        title: "呼吸灯直径",
                        default: 45
                    },
                    "barBaseW": {
                        type: "number",
                        title: "柱状图基础宽度",
                        default: 35
                    },
                    "barBaseH": {
                        type: "number",
                        title: "柱状图基础高度",
                        default: 270
                    },

                    "isStartAnimation": {
                        type: "boolean",
                        title: "开启交叉动画",
                        default: true
                    },
                    "animationTime": {
                        type: "number",
                        title: "交叉动画时间(ms)",
                        default: 15*1000
                    }
                }
            },
            "comResource":{
                type: "object",
                title: "组件资源",
                properties: {
                    "mapFont": {
                        type: "string",
                        title: "地图字体位置",
                        default: ""
                    },
                    "chinaMap": {
                        type: "string",
                        title: "地图底图",
                        default: ""
                    },
                    "barLoanImg": {
                        type: "string",
                        title: "放款柱状图",
                        default: ""
                    },
                    "barRepaymentImg": {
                        type: "string",
                        title: "还款柱状图",
                        default: ""
                    }
                }
            }
        }
    },
    UISchema: {
        map: {
            "ui:collapse": true,
            "center": {
                "ui:collapse": true
            },
        },
        event: {
            "ui:collapse": true,
            "supernatantColor":{
                "ui:field": "colorPicker",
            }
        },
        "legend":{
            "ui:collapse": true,
            "position":{
                "ui:collapse": true,
            },
            "fontColor":{
                "ui:field": "colorPicker",
            },
            "repaymentColor":{
                "ui:field": "colorPicker",
            },
            "loanColor":{
                "ui:field": "colorPicker",
            },
        },
        "ui":{
            "ui:collapse": true
        },
        "comResource":{
            "ui:collapse": true
        }
    },
    // 默认formData数据
    formData: {}
};
