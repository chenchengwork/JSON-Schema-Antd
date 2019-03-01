import React, {Component} from "react";
import PropTypes from "prop-types";

import {default as DefaultErrorList} from "./ErrorList";
import {
    getDefaultFormState,
    retrieveSchema,
    shouldRender,
    toIdSchema,
    setState,
    getDefaultRegistry,
} from "../utils";
import validateFormData, {toErrorList} from "../validate";


// 添加自定义扩展
import * as extendTpl from "../ExtendJsonSchema/tpl";
import * as extendFields from "../ExtendJsonSchema/field";


export default class Form extends Component {
    submitButtonRef = null;

    static defaultProps = {
        uiSchema: {},
        noValidate: false,
        liveValidate: false,
        safeRenderCompletion: false,
        noHtml5Validate: false,
        ErrorList: DefaultErrorList,
    };

    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props);
    }

    componentDidCatch(error, errorInfo) {
        console.error(error);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
    }

    getStateFromProps(props) {
        const state = this.state || {};
        const schema = "schema" in props ? props.schema : this.props.schema;
        const uiSchema = "uiSchema" in props ? props.uiSchema : this.props.uiSchema;
        const edit = typeof props.formData !== "undefined";
        const liveValidate = props.liveValidate || this.props.liveValidate;
        const mustValidate = edit && !props.noValidate && liveValidate;
        const {definitions} = schema;
        const formData = getDefaultFormState(schema, props.formData, definitions);  // 获取formData的值
        const retrievedSchema = retrieveSchema(schema, definitions, formData);      // 还原json schema

        const {errors, errorSchema} = mustValidate
            ? this.validate(formData, schema)
            : {
                errors: state.errors || [],
                errorSchema: state.errorSchema || {},
            };
        const idSchema = toIdSchema(
            retrievedSchema,
            uiSchema["ui:rootFieldId"],
            definitions,
            formData,
            props.idPrefix
        );

        return {
            schema,
            uiSchema,
            idSchema,
            formData,
            edit,
            errors,
            errorSchema,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldRender(this, nextProps, nextState);
    }

    validate(formData, schema = this.props.schema) {
        const {validate, transformErrors} = this.props;
        const {definitions} = this.getRegistry();
        const resolvedSchema = retrieveSchema(schema, definitions, formData);
        return validateFormData(
            formData,
            resolvedSchema,
            validate,
            transformErrors
        );
    }

    renderErrors() {
        const {errors, errorSchema, schema, uiSchema} = this.state;
        const {ErrorList, showErrorList, formContext} = this.props;

        if (errors.length && showErrorList != false) {
            return (
                <ErrorList
                    errors={errors}
                    errorSchema={errorSchema}
                    schema={schema}
                    uiSchema={uiSchema}
                    formContext={formContext}
                />
            );
        }
        return null;
    }

    onChange = (formData, newErrorSchema) => {
        // console.log('formData', formData)
        const mustValidate = !this.props.noValidate && this.props.liveValidate;
        let state = {formData};
        if (mustValidate) {
            const {errors, errorSchema} = this.validate(formData);
            state = {...state, errors, errorSchema};
        } else if (!this.props.noValidate && newErrorSchema) {
            state = {
                ...state,
                errorSchema: newErrorSchema,
                errors: toErrorList(newErrorSchema),
            };
        }

        setState(this, state, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state);
            }
        });
    };

    onBlur = (...args) => {
        if (this.props.onBlur) {
            this.props.onBlur(...args);
        }
    };

    onFocus = (...args) => {
        if (this.props.onFocus) {
            this.props.onFocus(...args);
        }
    };

    onSubmit = event => {
        event.preventDefault(); // 组织默认提交

        if (!this.props.noValidate) {
            const {errors, errorSchema} = this.validate(this.state.formData);
            if (Object.keys(errors).length > 0) {
                setState(this, {errors, errorSchema}, () => {
                    if (this.props.onError) {
                        this.props.onError(errors);
                    } else {
                        console.error("Form validation failed", errors);
                    }
                });
                return;
            }
        }

        setState(this, {errors: [], errorSchema: {}}, () => {
            if (this.props.onSubmit) {
                this.props.onSubmit({...this.state, status: "submitted"});
            }
        });

        return false;
    };

    submit = () => {
        event.preventDefault();
        this.submitButtonRef.click();
    }

    getRegistry() {
        // For BC, accept passed SchemaField and TitleField props and pass them to
        // the "fields" registry one.
        const {fields, widgets} = getDefaultRegistry();
        return {
            fields: {
                ...fields,
                ...{
                    colorPicker: extendFields.ColorPickerField
                },
                ...this.props.fields
            },
            widgets: {...widgets, ...this.props.widgets},
            ArrayFieldTemplate: this.props.ArrayFieldTemplate || extendTpl.ArrayFieldTemplate,
            ObjectFieldTemplate: this.props.ObjectFieldTemplate || extendTpl.ObjectFieldTemplate,
            FieldTemplate: this.props.FieldTemplate,
            definitions: this.props.schema.definitions || {},
            formContext: this.props.formContext || {},
        };
    }

    render() {
        const {
            children,
            safeRenderCompletion,
            id,
            idPrefix,
            className,
            name,
            method,
            target,
            action,
            autocomplete,
            enctype,
            acceptcharset,
            noHtml5Validate,
        } = this.props;

        const {schema, uiSchema, formData, errorSchema, idSchema} = this.state;
        const registry = this.getRegistry();
        const _SchemaField = registry.fields.SchemaField;

        return (
            <form
                className={className ? className : "rjsf"}
                id={id}
                name={name}
                method={method}
                target={target}
                action={action}
                autoComplete={autocomplete}
                encType={enctype}
                acceptCharset={acceptcharset}
                noValidate={noHtml5Validate}
                onSubmit={this.onSubmit}
            >
                {this.renderErrors()}

                <_SchemaField
                    schema={schema}
                    uiSchema={uiSchema}
                    errorSchema={errorSchema}
                    idSchema={idSchema}
                    idPrefix={idPrefix}
                    formData={formData}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    registry={registry}
                    safeRenderCompletion={safeRenderCompletion}
                />

                { children }
                <button type="submit" style={{display: "none"}} ref={(ref) => this.submitButtonRef = ref}>submit</button>
                {/*{children ? (*/}
                    {/*children*/}
                {/*) : (*/}
                    {/*<p>*/}
                        {/*<button type="submit" className="btn btn-info">*/}
                            {/*Submit*/}
                        {/*</button>*/}
                    {/*</p>*/}
                {/*)}*/}
            </form>
        );
    }
}

if (process.env.NODE_ENV !== "production") {
    Form.propTypes = {
        schema: PropTypes.object.isRequired,
        uiSchema: PropTypes.object,
        formData: PropTypes.any,
        widgets: PropTypes.objectOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object])
        ),
        fields: PropTypes.objectOf(PropTypes.func),
        ArrayFieldTemplate: PropTypes.func,
        ObjectFieldTemplate: PropTypes.func,
        FieldTemplate: PropTypes.func,
        ErrorList: PropTypes.func,
        onChange: PropTypes.func,
        onError: PropTypes.func,
        showErrorList: PropTypes.bool,
        onSubmit: PropTypes.func,
        id: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        method: PropTypes.string,
        target: PropTypes.string,
        action: PropTypes.string,
        autocomplete: PropTypes.string,
        enctype: PropTypes.string,
        acceptcharset: PropTypes.string,
        noValidate: PropTypes.bool,
        noHtml5Validate: PropTypes.bool,
        liveValidate: PropTypes.bool,
        validate: PropTypes.func,
        transformErrors: PropTypes.func,
        safeRenderCompletion: PropTypes.bool,
        formContext: PropTypes.object,
    };
}
