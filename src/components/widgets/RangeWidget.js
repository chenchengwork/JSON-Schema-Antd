import React from "react";
import PropTypes from "prop-types";
import { Slider } from 'antd';
import {rangeSpec} from "../../utils";

function RangeWidget(props) {
    const {
        schema,
        value,
        disabled,
        onChange,
        registry: {
            widgets: {BaseInput},
        },
    } = props;

    return (
        <Slider
            value={value}
            disabled={disabled}
            onChange={(value) => {
                onChange(value);
            }}
            {...rangeSpec(schema)}
        />
    );
}

if (process.env.NODE_ENV !== "production") {
    RangeWidget.propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };
}

export default RangeWidget;
