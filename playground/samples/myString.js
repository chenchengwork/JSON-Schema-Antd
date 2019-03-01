module.exports = {
    schema: {
        "title": "",
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
            color1: {
                type: "string",
                title: "color类型-ui",
                default: "#ccc"
            },

        }
    },
    uiSchema: {
        color1: {
            "ui:field": "colorPicker"
        }
    },
    // 默认formData数据
    formData: {}
};
