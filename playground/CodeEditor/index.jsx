import styles from './index.scss';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor/lib';
const isFunction = (value) => typeof value === "function";

/**
 * 编辑器配置
 * @type {{selectOnLineNumbers: boolean, readOnly: boolean, folding: boolean, fontSize: number}}
 */
const defaultEditorOpts = {
    selectOnLineNumbers: true,  // 显示行号
    readOnly: false,            // 只读
    folding: true,              // 允许代码折叠
    fontSize: 10,               // 设置字号大小
    // renderLineHighlight: "gutter",    // 高亮当前行 "gutter" | "none"
    // minimap: false,
    minimap: {
        enabled: false
    }
};

export default class CodeEditor extends Component {
    static propTypes = {
        code: PropTypes.string.isRequired,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        language: PropTypes.string,
        theme: PropTypes.string,
        // 编辑器配置
        editorOpts: PropTypes.shape({
            selectOnLineNumbers: PropTypes.bool,
            readOnly: PropTypes.bool,
            folding: PropTypes.bool,
            fontSize: PropTypes.number,
        }),
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        editorDidMount: PropTypes.func,     // 编辑器加载完成回调
        autoFocus: PropTypes.bool
    };

    static defaultProps = {
        code: "",
        width: "100%",
        height: 260,
        language: "json",
        theme: "vs-dark",
        editorOpts: defaultEditorOpts,
        autoFocus: false
    };

    componentDidCatch(e){
        console.error(e);
    }

    componentDidUpdate(){
        this._doOnBlur();
    }

    editorWillMount(monaco){

    }

    _doOnBlur = () => {
        const { onBlur } = this.props;
        if(this.editor) {
            // 清除上次的监听事件
            this.disposableForBlur && this.disposableForBlur.dispose();

            this.disposableForBlur = this.editor.onDidBlurEditorText((e) => {
                isFunction(onBlur) && onBlur(this.props.code, e);
            }, null, true);
        }
    }

    editorDidMount(editor, monaco) {
        const { onBlur, autoFocus, editorDidMount } = this.props;
        if(autoFocus)  editor.focus();
        this.editor = editor;

        // 失去焦点回调
        this._doOnBlur();

        // 添加编辑器加载完成
        isFunction(editorDidMount) && editorDidMount(editor,monaco);
    }

    onChange = (newValue, e) => {
        const { onChange } = this.props;
        isFunction(onChange) && onChange(newValue, e);
    }

    render() {
        const { code, language, theme, width, height, editorOpts } = this.props;

        return (
            <div className={styles["code-content"]}>
                <MonacoEditor
                    width={width}
                    height={height}
                    language={language}
                    theme={theme}
                    value={code}
                    options={Object.assign({}, defaultEditorOpts, editorOpts)}
                    onChange={::this.onChange}
                    editorDidMount={::this.editorDidMount}
                    editorWillMount={::this.editorWillMount}
                />
            </div>
        );
    }
}

/**
 * 扩展语法和代码提示
 * @param {Object} monaco       // 编辑器实例
 * @param {String} language     // 语言类型 如: "javascript", "json", "sql",....
 */
const extendLanguage = (monaco, language) => {

    // 自定义分词
    monaco.languages.setMonarchTokensProvider(language, {
        tokenizer: {
            root: [
                [/\[error.*/, "custom-error"],
                [/\[notice.*/, "custom-notice"],
                [/\[info.*/, "custom-info"],
                [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
            ],
        }
    });

    // 定义新的主题,用来包含匹配的"自定义分词"
    monaco.editor.defineTheme(`${language}_theme`, {
        base: 'vs',     // 基础主题"vs", "vs-dark", ...
        inherit: false,
        rules: [
            { token: 'custom-info', foreground: '808080' },
            { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
            { token: 'custom-notice', foreground: 'FFA500' },
            { token: 'custom-date', foreground: '008800' },
        ]
    });


    // 自定义代码提示项
    monaco.languages.registerCompletionItemProvider(language, {
        triggerCharacters: [":"],       // 触发提示的字符
        provideCompletionItems: (model, position) => {
            // 获取当前行的code
            let code = model.getValueInRange({
                startLineNumber: position.lineNumber,       // 开始行号
                startColumn: 1,                             // 开始列号
                endLineNumber: position.lineNumber,         // 结束行号
                endColumn: position.column,                 // 结束行号
            });
            // console.log("textUntilPosition->", textUntilPosition);
            code = code.trim();

            if(code.match(/^T\.$/)){
                return [
                    {
                        label: 'helper',        // 代码提示显示的label
                        kind: monaco.languages.CompletionItemKind.Class,
                        // insertText: "",      // 实际插入的文本,可以没有该字段默认去label中的值

                        // insertText: [
                        //     'if (${1:condition}) {',
                        //     '\t$0',
                        //     '} else {',
                        //     '\t',
                        //     '}'
                        // ].join('\n'),

                        // documentation: "",      // 文档说明
                    },
                    {
                        label: 'checkType',
                        kind: monaco.languages.CompletionItemKind.Class
                    }
                ]
            }else if(code.match(/^T\.helper\.$/)){
                return [
                    {
                        label: 'deepmerge',        // 代码提示显示的label
                        kind: monaco.languages.CompletionItemKind.Function
                    },
                    {
                        label: 'deepClone',
                        kind: monaco.languages.CompletionItemKind.Function
                    }
                ]

            }else if(code.match(/^T\.checkType\.$/)){
                return [
                    {
                        label: 'isArray',        // 代码提示显示的label
                        kind: monaco.languages.CompletionItemKind.Function
                    },
                    {
                        label: 'isNull',
                        kind: monaco.languages.CompletionItemKind.Function
                    }
                ]
            }

            return [
                {
                    label: 'simpleText',
                    kind: monaco.languages.CompletionItemKind.Text
                }
            ];
        }
    });
};


