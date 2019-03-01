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
                "title": "普通数组",
                "minItems": 3,
                "maxItems": 4,
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

            "select": {
                "type": "array",
                "title": "select类型",

                "format": "select",
                uniqueItems:true,
                "items": {
                    "type": "string",
                    "enum": [
                        "carp",
                        "trout",
                        "bream"
                    ],
                    "default": ["carp"]
                },
                "default": [
                    "carp",
                    "trout",
                    "bream"
                ],
            },

            "checkboxes": {
                "type": "array",
                "title": "checkboxes类型",

                "format": "checkboxes",
                uniqueItems:true,
                "items": {
                    "type": "string",
                    "enum": [
                        "carp",
                        "trout",
                        "bream"
                    ],
                    "default": ["carp"]
                },
                "default": [
                    "carp",
                    "trout",
                    "bream"
                ],
            },

            "nestedList": {
                "type": "array",
                "title": "嵌套数组",
                "items": {
                    "type": "array",
                    "title": "内嵌数组",
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
            "ui:collapse": true,        // 是否折叠
        },
        "defaultsAndMinItems":{
            "ui:collapse": true,
            "ui:options": {
                "orderable": true,  // 是否允许排序
                "removable": true,  // 是否允许删除
                "addable": true,    // 是否允许添加元素
            }
        },
        "nestedList":{
            "ui:options": {
                "orderable": true,  // 是否允许排序
                "removable": true,  // 是否允许删除
                "addable": true,    // 是否允许添加元素
            },
            "items":{
                "ui:options": {
                    "orderable": true,  // 是否允许排序
                    "removable": true,  // 是否允许删除
                    "addable": true,    // 是否允许添加元素
                },
            }
        }
    },
    // 默认formData数据
    formData: {

    }
};
