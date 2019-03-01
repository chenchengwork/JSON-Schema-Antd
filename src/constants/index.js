/**
 * json schema type和widget的映射关系
 * @type {{boolean: {checkbox: string, radio: string, select: string, hidden: string}, string: {text: string, password: string, email: string, hostname: string, ipv4: string, ipv6: string, uri: string, "data-url": string, radio: string, select: string, textarea: string, hidden: string, date: string, datetime: string, "date-time": string, "alt-date": string, "alt-datetime": string, color: string, file: string}, number: {text: string, select: string, updown: string, range: string, radio: string, hidden: string}, integer: {text: string, select: string, updown: string, range: string, radio: string, hidden: string}, array: {select: string, checkboxes: string, files: string}}}
 */
export const widgetMap = {
    boolean: {
        checkbox: "CheckboxWidget",
        radio: "RadioWidget",
        select: "SelectWidget",
        hidden: "HiddenWidget",
    },
    string: {
        // 已确认的类型
        text: "TextWidget",
        password: "PasswordWidget",
        email: "EmailWidget",
        radio: "RadioWidget",
        select: "SelectWidget",
        textarea: "TextareaWidget",
        color: "ColorWidget",
        hidden: "HiddenWidget",
        hostname: "TextWidget",
        ipv4: "TextWidget",
        ipv6: "TextWidget",

        // 未确认的类型
        uri: "URLWidget",
        "data-url": "FileWidget",
        date: "DateWidget",
        datetime: "DateTimeWidget",
        "date-time": "DateTimeWidget",
        "alt-date": "AltDateWidget",
        "alt-datetime": "AltDateTimeWidget",
        file: "FileWidget",
    },
    number: {
        // 已确认的类型
        text: "TextWidget",
        select: "SelectWidget",
        range: "RangeWidget",

        // 未确认的类型
        // radio: "RadioWidget",
        hidden: "HiddenWidget",
        updown: "UpDownWidget",
    },
    integer: {
        text: "TextWidget",
        select: "SelectWidget",
        range: "RangeWidget",

        // radio: "RadioWidget",
        updown: "UpDownWidget",
        hidden: "HiddenWidget",
    },
    array: {
        select: "SelectWidget",
        checkboxes: "CheckboxesWidget",

        // 未确认的类型
        files: "FileWidget",
    },
};


/**
 * 枚举组件类型
 * @type {{array: string, boolean: string, integer: string, number: string, object: string, string: string}}
 */
export const COMPONENT_TYPES = {
    array: "ArrayField",
    boolean: "BooleanField",
    integer: "NumberField",
    number: "NumberField",
    object: "ObjectField",
    string: "StringField",
};

/**
 * 必须类型表示
 * @type {string}
 */
export const REQUIRED_FIELD_SYMBOL = "*";
