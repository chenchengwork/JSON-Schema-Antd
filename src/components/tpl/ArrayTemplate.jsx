/**
 * 定义数组模板
 */
import { Button, Row, Col } from 'antd';

function IconBtn(props) {
    const {type = "primary", icon, className, children, ...otherProps} = props;

    return <Button type={type} icon={icon} className={className} {...otherProps}>{children}</Button>
}

function AddButton({onClick, disabled}) {

    return (
        <IconBtn
            icon="plus"
            className="btn-add col-xs-12"
            tabIndex="0"
            onClick={onClick}
            disabled={disabled}
        >增加</IconBtn>
    )
}

function ArrayFieldTitle({TitleField, idSchema, title, required}) {
    if (!title) {
        // See #312: Ensure compatibility with old versions of React.
        return <div/>;
    }
    const id = `${idSchema.$id}__title`;
    return <TitleField id={id} title={title} required={required}/>;
}

function ArrayFieldDescription({DescriptionField, idSchema, description}) {
    if (!description) {
        // See #312: Ensure compatibility with old versions of React.
        return <div/>;
    }
    const id = `${idSchema.$id}__description`;
    return <DescriptionField id={id} description={description}/>;
}

// Used in the two templates
function DefaultArrayItem(props) {
    const btnStyle = {};

    return (
        <Row key={props.index} className={props.className} gutter={5}>
            <Col span={props.hasToolbar ? 11 : 24}>
                {props.children}
            </Col>

            {props.hasToolbar && (
                <Col span={13}>
                    <Button.Group>
                        {(props.hasMoveUp || props.hasMoveDown) && (
                            <IconBtn
                                icon="arrow-up"
                                className="array-item-move-up"
                                tabIndex="-1"
                                style={btnStyle}
                                disabled={props.disabled || props.readonly || !props.hasMoveUp}
                                onClick={props.onReorderClick(props.index, props.index - 1)}
                            >上移</IconBtn>
                        )}

                        {(props.hasMoveUp || props.hasMoveDown) && (
                            <IconBtn
                                icon="arrow-down"
                                className="array-item-move-down"
                                tabIndex="-1"
                                style={btnStyle}
                                disabled={ props.disabled || props.readonly || !props.hasMoveDown }
                                onClick={props.onReorderClick(props.index, props.index + 1)}
                            >下移</IconBtn>
                        )}

                        {props.hasRemove && (
                            <IconBtn
                                type="danger"
                                icon="delete"
                                className="array-item-remove"
                                tabIndex="-1"
                                style={btnStyle}
                                disabled={props.disabled || props.readonly}
                                onClick={props.onDropIndexClick(props.index)}
                            >删除</IconBtn>
                        )}
                    </Button.Group>
                </Col>
            )}
        </Row>
    );
}

/**
 * 数组元素类型不同的模板
 * @param props
 * @returns {*}
 * @constructor
 */
export function DefaultFixedArrayFieldTemplate(props) {
    return (
        <fieldset className={props.className}>
            <ArrayFieldTitle
                key={`array-field-title-${props.idSchema.$id}`}
                TitleField={props.TitleField}
                idSchema={props.idSchema}
                title={props.uiSchema["ui:title"] || props.title}
                required={props.required}
            />

            {(props.uiSchema["ui:description"] || props.schema.description) && (
                <div
                    className="field-description"
                    key={`field-description-${props.idSchema.$id}`}>
                    {props.uiSchema["ui:description"] || props.schema.description}
                </div>
            )}

            <div
                className="row array-item-list"
                key={`array-item-list-${props.idSchema.$id}`}>
                {props.items && props.items.map(DefaultArrayItem)}
            </div>

            {props.canAdd && (
                <AddButton
                    onClick={props.onAddClick}
                    disabled={props.disabled || props.readonly}
                />
            )}
        </fieldset>
    );
}

/**
 * 数组元素类型相同的模板
 * @param props
 * @returns {*}
 * @constructor
 */
export function DefaultNormalArrayFieldTemplate(props) {
    return (
        <fieldset className={props.className}>
            <ArrayFieldTitle
                key={`array-field-title-${props.idSchema.$id}`}
                TitleField={props.TitleField}
                idSchema={props.idSchema}
                title={props.uiSchema["ui:title"] || props.title}
                required={props.required}
            />

            {(props.uiSchema["ui:description"] || props.schema.description) && (
                <ArrayFieldDescription
                    key={`array-field-description-${props.idSchema.$id}`}
                    DescriptionField={props.DescriptionField}
                    idSchema={props.idSchema}
                    description={
                        props.uiSchema["ui:description"] || props.schema.description
                    }
                />
            )}

            <div
                className="row array-item-list"
                key={`array-item-list-${props.idSchema.$id}`}>
                {props.items && props.items.map(p => DefaultArrayItem(p))}
            </div>

            {props.canAdd && (
                <AddButton
                    onClick={props.onAddClick}
                    disabled={props.disabled || props.readonly}
                />
            )}
        </fieldset>
    );
}
