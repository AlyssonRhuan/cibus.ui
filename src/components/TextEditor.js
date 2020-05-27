import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React from 'react';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    const html = this.props.value;
    const contentBlock = htmlToDraft(html);
    console.log(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        descriptionState: editorState
      };
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      descriptionState: editorState
    });
    
    const description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.props.onChange(description);
  }

  render() {
    const { descriptionState } = this.state;

    return (      
      <div className="form-group col-12" style={{minHeight:'50px'}}>
        <label>{this.props.label}</label>
        <Editor
          editorState={descriptionState}
          onEditorStateChange={this.onEditorStateChange}

          wrapperClassName=""
          toolbarStyle=""
          editorClassName="border"

          wrapperStyle={{height:'170px'}}
          editorStyle={{overflowY:'auto', margin:'0px'}}
          toolbarStyle={{}}
          
          toolbar={{
            options: ['inline', 'list', 'textAlign',],
            inline: {
              options: ['bold', 'italic', 'underline'],
            },
            list: {
              options: ['unordered', 'ordered'],
            },
          }}
        />
      </div>
    )
  }
}

export default TextEditor