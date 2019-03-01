import PropTypes from "prop-types";
import React from "react";
import { Row, Col } from 'antd';

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

    return displayLabel? (
        <Row
            className={classNames}
            style={{marginBottom: 10}}
        >
            <Col span={24}>
                { required && label ? <span style={{color: "red"}}>*</span> : null}
                <span id={id}>
                    {label}
                </span>
            </Col>
            <Col span={24}>
                {children}
            </Col>
            { Array.isArray(rawErrors) && rawErrors.length > 0 ? <Col span={24}><span style={{color: "red"}}>{errors}</span></Col>: null}
            <Col span={24}><span style={{color: "rgba(0,0,0,0.5)"}}>{description}</span></Col>
            <Col span={24}><span style={{color: "rgba(0,0,0,0.5)"}}>{help}</span></Col>
        </Row>
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


