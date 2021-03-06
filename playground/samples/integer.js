module.exports = {
    schema: {
        "title": "常用整型描述",
        "description": "",
        "type": "object",
        "required": [],
        "properties": {
            text:{
                type: "integer",
                title: "text类型",
                format: "text",
                default: 100
            },
            select:{
                type: "integer",
                title: "select类型",
                enum:[20, 30],
                enumNames:["age1", "age2"],
                format: "select",
                default: 20
            },
            range:{
                type: "integer",
                title: "range类型",
                minimum:0,
                maximum:100,
                multipleOf: 10,
                format: "range",
                default: 20
            },
        }
    },
    uiSchema: {

    },
    // 默认formData数据
    formData: {

    }
};
