module.exports = {
    schema: {
        "title": "常用数组描述",
        "description": "",
        "type": "object",
        "required": [],
        "properties": {
            "fixedItems": {
                "type": "array",
                "title": "固定成员类型数组",
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

            "defaultsAndMinItems": {
                "type": "array",
                "title": "List and item level defaults",
                "minItems": 3,
                "default": [
                    "carp",
                    "trout",
                    "bream"
                ],
                "items": {
                    "type": "string",
                    "default": "unidentified"
                }
            },

            "nestedList": {
                "type": "array",
                "title": "Nested list",
                "items": {
                    "type": "array",
                    "title": "Inner list",
                    "items": {
                        "type": "string",
                        "default": "lorem ipsum"
                    }
                }
            },
        }
    },
    uiSchema: {
        "fixedItems": {
            "ui:collapse": true
        },
    },
    // 默认formData数据
    formData: {

    }
};
