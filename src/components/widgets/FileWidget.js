import React, {Component} from "react";
import PropTypes from "prop-types";
import {Upload, Button} from 'antd';
import {dataURItoBlob, shouldRender} from "../../utils";

function addNameToDataURL(dataURL, name) {
    return dataURL.replace(";base64", `;name=${name};base64`);
}

function processFile(file) {
    const {name, size, type} = file;
    return new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.onload = event => {
            resolve({
                dataURL: addNameToDataURL(event.target.result, name),
                name,
                size,
                type,
            });
        };
        reader.readAsDataURL(file);
    });
}

function processFiles(files) {
    return Promise.all([].map.call(files, processFile));
}

function extractFileInfo(dataURLs) {
    return dataURLs
        .filter(dataURL => typeof dataURL !== "undefined")
        .map(dataURL => {
            const {blob, name} = dataURItoBlob(dataURL);
            return {
                name: name,
                size: blob.size,
                type: blob.type,
            };
        });
}

class FileWidget extends Component {
    constructor(props) {
        super(props);
        const {value} = props;
        const values = Array.isArray(value) ? value : [value];
        this.state = {values, fileList: [], filesInfo: extractFileInfo(values)};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldRender(this, nextProps, nextState);
    }

    // 更新formData数据
    updateFormData = (fileList) => {
        const {multiple, onChange} = this.props;

        processFiles(fileList).then(filesInfo => {
            const values = filesInfo.map(fileInfo => fileInfo.dataURL);

            if (multiple) {
                onChange(values);
            } else {
                onChange(values[0]);
            }
        });
    }

    render() {
        const {multiple, id, readonly, disabled, autofocus} = this.props;

        const props = {
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);

                    this.updateFormData(newFileList);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }), () => this.updateFormData(this.state.fileList));
                return false;
            },
            fileList: this.state.fileList,
            id,
            multiple,
            disabled: disabled || readonly
        };

        return (
            <Upload {...props}>
                <Button icon="upload">选择文件</Button>
            </Upload>
        );
    }
}

FileWidget.defaultProps = {
    autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
    FileWidget.propTypes = {
        multiple: PropTypes.bool,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        autofocus: PropTypes.bool,
    };
}

export default FileWidget;
