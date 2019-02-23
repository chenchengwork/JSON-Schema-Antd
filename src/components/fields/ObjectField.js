import React, {Component} from "react";
import PropTypes from "prop-types";
import { DefaultObjectFieldTemplate } from '../tpl';

import {
    orderProperties,
    retrieveSchema,
    getDefaultRegistry,
} from "../../utils";


class ObjectField extends Component {
    static defaultProps = {
        uiSchema: {},
        formData: {},
        errorSchema: {},
        idSchema: {},
        required: false,
        disabled: false,
        readonly: false,
    };

    isRequired(name) {
        const schema = this.props.schema;
        return (
            Array.isArray(schema.required) && schema.required.indexOf(name) !== -1
        );
    }

    onPropertyChange = name => {
        return (value, errorSchema) => {
            const newFormData = {...this.props.formData, [name]: value};
            this.props.onChange(
                newFormData,
                errorSchema &&
                this.props.errorSchema && {
                    ...this.props.errorSchema,
                    [name]: errorSchema,
                }
            );
        };
    };

    render() {
        const {
            uiSchema,
            formData,
            errorSchema,
            idSchema,
            name,
            required,
            disabled,
            readonly,
            idPrefix,
            onBlur,
            onFocus,
            registry = getDefaultRegistry(),
        } = this.props;
        const {definitions, fields, formContext} = registry;
        const {SchemaField, TitleField, DescriptionField} = fields;
        const schema = retrieveSchema(this.props.schema, definitions, formData);
        const title = schema.title === undefined ? name : schema.title;
        const description = uiSchema["ui:description"] || schema.description;
        let orderedProperties;

        try {
            const properties = Object.keys(schema.properties);
            // 定义显示属性先后顺序
            orderedProperties = orderProperties(properties, uiSchema["ui:order"]);
        } catch (err) {
            return (
                <div>
                    <p className="config-error" style={{color: "red"}}>
                        Invalid {name || "root"} object field configuration:
                        <em>{err.message}</em>.
                    </p>
                    <pre>{JSON.stringify(schema)}</pre>
                </div>
            );
        }

        const Template = registry.ObjectFieldTemplate || DefaultObjectFieldTemplate;

        const templateProps = {
            title: uiSchema["ui:title"] || title,
            description,
            TitleField,
            DescriptionField,
            onDropIndexClick: this.props.onDropIndexClick,
            arrItemIndex: this.props.arrItemIndex,
            properties: orderedProperties.map(name => {
                return {
                    content: (
                        <SchemaField
                            key={name}
                            name={name}
                            required={this.isRequired(name)}
                            schema={schema.properties[name]}
                            uiSchema={uiSchema[name]}
                            errorSchema={errorSchema[name]}
                            idSchema={idSchema[name]}
                            idPrefix={idPrefix}
                            formData={formData[name]}
                            onChange={this.onPropertyChange(name)}
                            onBlur={onBlur}
                            onFocus={onFocus}
                            registry={registry}
                            disabled={disabled}
                            readonly={readonly}
                        />
                    ),
                    name,
                    readonly,
                    disabled,
                    required,
                };
            }),
            required,
            idSchema,
            uiSchema,
            schema,
            formData,
            formContext,
        };
        return <Template {...templateProps} />;
    }
}

if (process.env.NODE_ENV !== "production") {
    ObjectField.propTypes = {
        schema: PropTypes.object.isRequired,
        uiSchema: PropTypes.object,
        errorSchema: PropTypes.object,
        idSchema: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        formData: PropTypes.object,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        registry: PropTypes.shape({
            widgets: PropTypes.objectOf(
                PropTypes.oneOfType([PropTypes.func, PropTypes.object])
            ).isRequired,
            fields: PropTypes.objectOf(PropTypes.func).isRequired,
            definitions: PropTypes.object.isRequired,
            formContext: PropTypes.object.isRequired,
        }),
    };
}

export default ObjectField;
