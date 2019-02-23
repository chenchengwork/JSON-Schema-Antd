import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Form } from 'antd';
const FormItem = Form.Item;

/**
 * 默认字段模板
 * @param props
 * @returns {*}
 * @constructor
 */
export default function DefaultFieldTemplate(props) {
    const {
        id,
        classNames,
        label,
        children,
        errors,
        rawErrors,
        help,
        description,
        hidden,
        required,
        displayLabel,
    } = props;
    if (hidden) {
        return children;
    }

    const formItemLayout = {
        labelCol: {
            // xs: { span: 24 },
            // sm: { span: 8 },
            // md: { span: 4},
        },
        wrapperCol: {
            // xs: { span: 24 },
            // sm: { span: 16 },
            // md: { span: 20},
        },
    };
    // console.log("required:", label, required)
    return displayLabel ? (
        <FormItem
            className={classNames}
            style={{margin: 0}}
            {...formItemLayout}
            colon={true}            // 是否显示冒号
            required={required}
            label={displayLabel && <span id={id}>{label}</span>}
            validateStatus={Array.isArray(rawErrors) && rawErrors.length > 0 ? "error" : "success"}
            extra={
                <Fragment>
                    <div>{errors}</div>
                    <div>{description}</div>
                    <div>{help}</div>
                </Fragment>
            }
        >
            {children}
        </FormItem>
    ) : children;
}

DefaultFieldTemplate.defaultProps = {
    hidden: false,
    readonly: false,
    required: false,
    displayLabel: true,
};

if (process.env.NODE_ENV !== "production") {
    DefaultFieldTemplate.propTypes = {
        id: PropTypes.string,
        classNames: PropTypes.string,
        label: PropTypes.string,
        children: PropTypes.node.isRequired,
        errors: PropTypes.element,
        rawErrors: PropTypes.arrayOf(PropTypes.string),
        help: PropTypes.element,
        rawHelp: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        description: PropTypes.element,
        rawDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        hidden: PropTypes.bool,
        required: PropTypes.bool,
        readonly: PropTypes.bool,
        displayLabel: PropTypes.bool,
        fields: PropTypes.object,
        formContext: PropTypes.object,
    };
}


