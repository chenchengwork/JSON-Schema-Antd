import React from "react";
import PropTypes from "prop-types";
import {REQUIRED_FIELD_SYMBOL} from '../../constants';

function TitleField(props) {
    const {id, title, required} = props;
    const legend = required ? title + REQUIRED_FIELD_SYMBOL : title;

    if(!title) return null;
    return <h3 id={id}>{legend}</h3>;
}

if (process.env.NODE_ENV !== "production") {
    TitleField.propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        required: PropTypes.bool,
    };
}

export default TitleField;
