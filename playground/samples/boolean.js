module.exports = {
    schema: {
        "title": "常用Boolean描述",
        "description": "",
        "type": "object",
        "required": [],
        "properties": {
            checkbox:{
                type: "boolean",
                title: "checkbox类型",
                format: "checkbox",
                default: true
            },
            select:{
                type: "boolean",
                title: "select类型",
                enum:[false, true],
                enumNames:["NO", "YES"],
                format: "select",
                default: true
            },
            radio:{
                type: "boolean",
                title: "radio类型",
                format: "radio",
                default: true
            },
        }
    },
    uiSchema: {

    },
    // 默认formData数据
    formData: {

    }
};
