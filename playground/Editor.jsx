import React, { PureComponent } from 'react';
import JsonSchemaForm from "../src";
import CodeEditor from './CodeEditor';

import "antd/lib/card/style";
import "antd/lib/row/style"
import "antd/lib/col/style"
import { Card, Row, Col, Button } from 'antd'

const EnumSampleData = [
    {
        label: "数组",
        value: require("./samples/myArray")
    },
    {
        label: "字符串",
        value: require("./samples/myString")
    },
    {
        label: "mySample",
        value: require("./samples/mySample")
    },
    {
        label: "Sample",
        value: require("./samples/sample")
    },
    {
        label: "Nested",
        value: require("./samples/nested")
    },
    {
        label: "Arrays",
        value: require("./samples/arrays")
    },
];

/**
 * 通过字符串获取json对象
 * @param value
 * @return {{isError: boolean, data: null}}
 */
const getJsonByStr = (value) => {
    let resp = {
        isError: false,
        data: null
    };

    try{
        resp.data = JSON.parse(value);
    }catch (e) {
        resp.isError = true;
    }

    return resp;
};

const cardBodyStyle = {
    padding: 0
};

export default class Index extends PureComponent{
    state = {
        data: null,
        editorData: {

        }
    };

    updateData = (data) => this.setState({data: null}, () => this.setState({data}))

    render(){
        let {data} = this.state;

        return (
            <div>
                <SelectData updateData={this.updateData}/>

                { data ? <Editor {...data}/> : null }
            </div>
        )
    }
}

/**
 * 编辑器
 */
class Editor extends PureComponent{
    state = {
        schemaStr: JSON.stringify(this.props.schema, undefined, 4),
        uiSchemaStr: JSON.stringify(this.props.uiSchema, undefined, 4),
        formDataStr: JSON.stringify(this.props.formData, undefined, 4),
        schema: this.props.schema,
        uiSchema: this.props.uiSchema,
        formData: this.props.formData,
        errorFieldName: null,
    };
    componentDidCatch(error, errorInfo) {
        console.error(error);
    }

    onFormDataChange = ({formData}) => {
        this.setFormData(formData);
    };

    updateData = (key, value) => {
        let keyToValue = {};
        if(["schemaStr", "uiSchemaStr", "formDataStr"].indexOf(key) !== -1){
            keyToValue[key] = value;
            const {isError, data} = getJsonByStr(value);
            if(!isError){
                keyToValue[key.replace("Str", "")] = data;
                keyToValue["errorFieldName"] = null;
            }else {
                keyToValue["errorFieldName"] = key;
            }
        }
        this.setState(keyToValue)
    };

    setFormData = (value) => {
        this.setState({
            formDataStr: JSON.stringify(value, undefined, 4),
            formData: value
        })
    };

    render(){
        let {schema, uiSchema, formData, schemaStr, uiSchemaStr, formDataStr, errorFieldName} = this.state;

        formData = schema ? formData : {};
        schema = schema || {};
        uiSchema = uiSchema || {};

        const getErrorMsg = (key) => errorFieldName === key ? <span style={{color: "red"}}>格式错误</span> : "";

        return (
            <Row>
                <Col span={14}>
                    <Row>
                        <Col span={24}>
                            <Card
                                title="schema"
                                bodyStyle={cardBodyStyle}
                                extra={getErrorMsg("schemaStr")}
                            >
                                <CodeEditor
                                    code={schemaStr}
                                    language="json"
                                    onChange={(code) => this.updateData("schemaStr", code)}
                                    height={300}
                                    editorOpts={{fontSize: 12}}
                                    autoFocus={true}
                                />
                            </Card>
                        </Col>

                        <Col span={24}>
                            <Row>
                                <Col span={12}>
                                    <Card
                                        title="uiSchema"
                                        bodyStyle={cardBodyStyle}
                                        extra={getErrorMsg("uiSchemaStr")}
                                    >
                                        <CodeEditor
                                            code={uiSchemaStr}
                                            language="json"
                                            onChange={(code) => this.updateData("uiSchemaStr", code)}
                                            height={300}
                                            editorOpts={{fontSize: 12}}
                                        />
                                    </Card>
                                </Col>

                                <Col span={11} offset={1}>
                                    <Card
                                        title="formData"
                                        bodyStyle={cardBodyStyle}
                                        extra={getErrorMsg("formDataStr")}
                                    >
                                        <CodeEditor
                                            code={formDataStr}
                                            language="json"
                                            onChange={(code) => this.updateData("formDataStr", code)}
                                            height={300}
                                            editorOpts={{fontSize: 12}}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Col span={10}>
                    <JsonSchemaForm
                        // ArrayFieldTemplate={ArrayFieldTemplate}
                        // ObjectFieldTemplate={ObjectFieldTemplate}
                        // FieldTemplate={FieldTemplate}
                        liveValidate={true}
                        mustValidate={true}
                        schema={schema}
                        uiSchema={uiSchema}
                        fields={{
                            // resourceFile: ResourceFileField,
                            // colorPicker: ColorPickerField,
                            // codeEditor: CodeEditorField,
                        }}
                        formData={formData}
                        onChange={this.onFormDataChange}
                        // validate={validate}
                        // transformErrors={transformErrors}
                        onSubmit={({formData}) =>{}}
                        onBlur={(id, value) => {}}
                        onFocus={(id, value) =>{}}
                        onError={console.error}
                    />
                </Col>
            </Row>
        )
    }
}


/**
 * 选择数据
 */
class SelectData extends PureComponent{
    state = {
        selectedIdx: 0
    };

    componentDidMount() {
        this.setData(0);
    }

    setData = (idx) => {
        this.setState({selectedIdx: idx}, () => {
             this.props.updateData(EnumSampleData[idx].value)
        })
    };

    render(){
        const { selectedIdx } = this.state;

        return (
            <Button.Group style={{margin: 10}}>
                {EnumSampleData.map((item, idx) => (
                    <Button
                        type={selectedIdx === idx ? "primary" : ""}
                        key={item.label}
                        onClick={() => this.setData(idx)}
                    >
                        {item.label}
                    </Button>
                ))}
            </Button.Group>
        )
    }
}


