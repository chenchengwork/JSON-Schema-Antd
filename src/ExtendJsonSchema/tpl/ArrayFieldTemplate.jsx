/**
 * 定义数组模板
 */
import { Button, Row, Col, Collapse, Icon } from 'antd';
import React, { Fragment } from "react";
const Panel = Collapse.Panel;

function IconBtn(props) {
    const {type = "primary", icon, className, children, ...otherProps} = props;

    return <Button type={type} icon={icon} className={className} {...otherProps}>{children}</Button>
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

    const {hasToolbar, hasMoveUp, hasMoveDown, hasRemove} = props;
    let toolBarNum = 0;
    let toolSpan = 0;
    if(hasToolbar) {
        [hasMoveUp || hasMoveDown, hasMoveUp || hasMoveDown, hasRemove].forEach(item => item && toolBarNum++);
        toolSpan = toolBarNum + 3;
    }


    return (
        <Row key={props.index} className={props.className} gutter={5}>
            <Col span={hasToolbar ? 24 - toolSpan : 24}>
                {props.children}
            </Col>

            {props.hasToolbar && (
                <Col span={toolSpan}>
                    <Button.Group>
                        {(hasMoveUp || hasMoveDown) && (
                            <IconBtn
                                icon="arrow-up"
                                className="array-item-move-up"
                                tabIndex="-1"
                                style={btnStyle}
                                disabled={props.disabled || props.readonly || !props.hasMoveUp}
                                onClick={props.onReorderClick(props.index, props.index - 1)}
                                title={"上移"}
                            />
                        )}

                        {(hasMoveUp || hasMoveDown) && (
                            <IconBtn
                                icon="arrow-down"
                                className="array-item-move-down"
                                tabIndex="-1"
                                style={btnStyle}
                                disabled={ props.disabled || props.readonly || !props.hasMoveDown }
                                onClick={props.onReorderClick(props.index, props.index + 1)}
                                title={"下移"}
                            />
                        )}

                        {hasRemove && (
                            <IconBtn
                                type="danger"
                                icon="delete"
                                className="array-item-remove"
                                tabIndex="-1"
                                style={btnStyle}
                                disabled={props.disabled || props.readonly}
                                onClick={props.onDropIndexClick(props.index)}
                                title="删除"
                            />
                        )}
                    </Button.Group>
                </Col>
            )}
        </Row>
    );
}

/**
 * 数组元素类型相同的模板
 * @param props
 * @returns {*}
 * @constructor
 */
export default function DefaultNormalArrayFieldTemplate(props) {
    const { uiSchema, schema } = props;

    return uiSchema["ui:collapse"] ?(
        <Collapse accordion bordered={false}>
            <Panel
                header={
                    <div>
                        {uiSchema["ui:title"] || props.title}
                        {uiSchema["ui:addIcon"] || props.canAdd ? <Icon
                            onClick={(e) => {
                                props.onAddClick(e);
                                e.stopPropagation();
                            }}
                            type="plus"
                            title="添加"
                            style={{cursor: "pointer", marginLeft: 30}}
                        /> : null}
                    </div>
                }
            >
                <span>{props.description}</span>
                {/*{props.items && props.items.map((p, index) => <Fragment key={index}>{p.children}</Fragment>)}*/}
                {props.items && props.items.map((p) =>  DefaultArrayItem(p))}
            </Panel>
        </Collapse>
        ): (
            <fieldset className={props.className}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <ArrayFieldTitle
                        key={`array-field-title-${props.idSchema.$id}`}
                        TitleField={props.TitleField}
                        idSchema={props.idSchema}
                        title={props.uiSchema["ui:title"] || props.title}
                        required={props.required}
                    />
                    {props.canAdd && (
                        <IconBtn
                            icon="plus"
                            onClick={props.onAddClick}
                            disabled={props.disabled || props.readonly}
                            style={{marginLeft: 20}}
                            title="添加"
                        />
                    )}
                </div>

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
            </fieldset>
        );
}
