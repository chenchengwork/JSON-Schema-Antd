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
        // registry: {
        //     widgets: {BaseInput},
        // },
    } = props;
    const {max, min, step} = rangeSpec(schema);
    const marks = {};
    for(let i = min; i <= max; i+=step){
        marks[i] = i;
    }

    return (
        <Slider
            value={value}
            disabled={disabled}
            onChange={(value) => {
                onChange(value);
            }}
            marks={marks}
            {...{max, min, step}}
        />
    );
}

if (process.env.NODE_ENV !== "production") {
    RangeWidget.propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };
}

export default RangeWidget;
