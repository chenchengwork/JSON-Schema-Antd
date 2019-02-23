import React from "react";
import PropTypes from "prop-types";

import {asNumber} from "../../utils";
import { Select } from 'antd';
/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue({type, items}, value) {
    if (value === "") {
        return undefined;
    } else if (
        type === "array" &&
        items &&
        ["number", "integer"].includes(items.type)
    ) {
        return value.map(asNumber);
    } else if (type === "boolean") {
        return value === "true";
    } else if (type === "number") {
        return asNumber(value);
    }
    return value;
}

function getValue(value, multiple) {
    return value;
    // if (multiple) {
    //     return [].slice
    //         .call(event.target.options)
    //         .filter(o => o.selected)
    //         .map(o => o.value);
    // } else {
    //     return value;
    // }
}

function SelectWidget(props) {
    const {
        schema,
        id,
        options,
        value,
        required,
        disabled,
        readonly,
        multiple,
        autofocus,
        onChange,
        onBlur,
        onFocus,
        placeholder,
    } = props;
    const {enumOptions, enumDisabled} = options;
    const emptyValue = multiple ? [] : "";

    return (
        <Select
            id={id}
            mode={multiple && "multiple"}
            value={typeof value === "undefined" ? emptyValue : Array.isArray(value) ? value : value.toString()}
            disabled={disabled || readonly}
            autoFocus={autofocus}
            placeholder={placeholder}
            onChange={event => {
                const newValue = getValue(event, multiple);
                onChange(processValue(schema, newValue));
            }}
        >
            {enumOptions ? enumOptions.map(({value, label}, i) => {
                // const disabled = enumDisabled && enumDisabled.indexOf(value) != -1;
                return (
                    <Select.Option key={i} value={value.toString()}>
                        {label}
                    </Select.Option>
                );
            }): null}
        </Select>
    );
}

SelectWidget.defaultProps = {
    autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
    SelectWidget.propTypes = {
        schema: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        options: PropTypes.shape({
            enumOptions: PropTypes.array,
        }).isRequired,
        value: PropTypes.any,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        multiple: PropTypes.bool,
        autofocus: PropTypes.bool,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
    };
}

export default SelectWidget;