module.exports = {
    schema: {
        "title": "常用字符串描述",
        "description": "",
        "type": "object",
        "required": [],
        "properties": {
            text: {
                type: "string",
                title: "text类型",
                format: "text",
                default: "text"
            },
            password: {
                type: "string",
                title: "password类型",
                format: "password",
                default: "password"
            },
            email: {
                type: "string",
                title: "email类型",
                format: "email",
                default: "email"
            },
            color: {
                type: "string",
                title: "color类型",
                format: "color",
                default: "#ccc"
            },
            select: {
                type: "string",
                title: "select类型",
                enum: [
                    "10",
                    "20",
                    "30"
                ],
                enumNames: ["age1", "age2", "age3"],
                format: "select",
                default: "10"
            },
            textarea: {
                type: "string",
                title: "textarea类型",
                format: "textarea",
                default: "test textarea"
            },
            radio: {
                type: "string",
                title: "radio类型",
                enum: [
                    "10",
                    "20",
                    "30"
                ],
                enumNames: ["age1", "age2", "age3"],
                format: "radio",
                default: "10"
            },
        }
    },
    uiSchema: {
        textarea: {
            "ui:rows": 4
        }
    },
    // 默认formData数据
    formData: {}
};
