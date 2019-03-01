module.exports = {
    schema: {
        "title": "常用对象描述",
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
                        format: "color",
                        default: "#ffffff"
                    },

                }
            },
        }
    },
    uiSchema: {
        map: {
            // "ui:delIcon": true,
            "ui:collapse": true,
            "center": {
                "ui:collapse": true
            },
        },
        "legend":{
            "ui:collapse": true,
            "position":{
                "ui:collapse": true,
            }
        }

    },
    // 默认formData数据
    formData: {
        "map": {
            "center": [
                104.223828,
                37.972688
            ],
            "zoom": 3,
            "pitch": 70,
            "bearing": 0,
            "isInteractive": true
        },
        "legend": {
            "position": {
                "top": 50,
                "left": 0
            },
            "circleRadius": 7,
            "fontSize": 142,
            "fontColor": "#ffffff"
        }
    }
};
