import React, {Fragment} from 'react'
import { Collapse, Icon } from 'antd';
const Panel = Collapse.Panel;
import "./ObjectFieldTemplate.css";
/**
 * 默认对象字段的模板
 * @param props
 * @returns {*}
 * @constructor
 *

 .ant-collapse > .ant-collapse-item {
    border-bottom: 1px solid #d9d9d9;
}

 */
export default function DefaultObjectFieldTemplate(props) {
    const {TitleField, DescriptionField, schema, uiSchema} = props;

    return (
        <span className={"object-field-tpl"} key={props.arrItemIndex || 0}>
            {uiSchema["ui:collapse"] ?
                <Collapse accordion bordered={false}>
                    <Panel
                        // header={props.uiSchema["ui:title"] || props.title}
                        header={
                            <div>
                                {(props.uiSchema["ui:title"] || props.title) + (typeof props.arrItemIndex !== "undefined" ? props.arrItemIndex + 1 : "")}

                                {uiSchema["ui:delIcon"] && props.onDropIndexClick ?
                                    <Icon
                                        onClick={(e) => {
                                            props.onDropIndexClick()();
                                            e.stopPropagation();
                                        }}
                                        type="delete"
                                        title="删除"
                                        style={{cursor: "pointer", color: "red", marginLeft: 30}}
                                    />: null
                                }
                            </div>
                        }
                    >
                        <span>{props.description}</span>
                        {props.properties.map(prop => prop.content)}
                    </Panel>
                </Collapse>
                : <Fragment>
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
            }
        </span>
    );

}
