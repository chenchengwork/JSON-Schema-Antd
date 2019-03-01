module.exports = {
    schema: {
        "title": "常用数值描述",
        "description": "",
        "type": "object",
        "required": [],
        "properties": {
            text:{
                type: "number",
                title: "text类型",
                format: "text",
                default: 100
            },
            select:{
                type: "number",
                title: "select类型",
                enum:[20, 30],
                enumNames:["age1", "age2"],
                format: "select",
                default: 20
            },
            range:{
                type: "number",
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
