import React, {Component} from "react";
import PropTypes from "prop-types";
import { shouldRender } from "../../utils";
import InputColor from './InputColor';

class ColorPicker extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldRender(this, nextProps, nextState);
    }

    render() {
        const {multiple, id, readonly, disabled, formData} = this.props;

        return (
            <InputColor
                color={formData}
                onChange={(currentColor) => {
                    this.props.onChange(currentColor)
                }}
            />
        );
    }
}

ColorPicker.defaultProps = {
    autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
    ColorPicker.propTypes = {
        multiple: PropTypes.bool,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        autofocus: PropTypes.bool,
    };
}

export default ColorPicker;
