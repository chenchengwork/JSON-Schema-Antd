import React, {Fragment} from 'react'
/**
 * 默认对象字段的模板
 * @param props
 * @returns {*}
 * @constructor
 */
export default function DefaultObjectFieldTemplate(props) {
    const {TitleField, DescriptionField} = props;

    return (
        <Fragment>
            {(props.uiSchema["ui:title"] || props.title) && (
                <TitleField
                    id={`${props.idSchema.$id}__title`}
                    title={props.title || props.uiSchema["ui:title"]}
                    required={props.required}
                    formContext={props.formContext}
                />
            )}
            {props.description && (
                <DescriptionField
                    id={`${props.idSchema.$id}__description`}
                    description={props.description}
                    formContext={props.formContext}
                />
            )}
            {props.properties.map(prop => prop.content)}
        </Fragment>
    );
}
