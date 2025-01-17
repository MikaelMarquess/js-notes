import React, { Fragment, useState, useEffect, useRef } from "react";

import ReactQuill from "react-quill";

const Editor = (props) => {
  const [currentContent, setCurrentContent] = useState("");
  const [timer, setTimer] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    setCurrentContent(props.note.body);
  }, [props.note]);

  const updateNote = (body) => {
    const title = body.replace(/(<([^>]+)>)/gi, "").substring(0, 15);
    props.updateNote(props.note, { title: title, body: body });
  };

  const handleChange = (content, delta, source) => {
    clearTimeout(timer);
    if (source === "user") {
      setCurrentContent(content);
      setTimer(setTimeout(() => updateNote(content), 2000));
    }
  };

  useEffect(() => {
    const editorContainer = editorRef.current?.getEditor()?.root;
    if (editorContainer) {
      editorContainer.style.height = "auto";
      editorContainer.style.minHeight = "150px";
    }
  }, [currentContent]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <Fragment>
      <ReactQuill
        ref={editorRef}
        value={currentContent}
        modules={modules}
        onChange={handleChange}
        style={{ backgroundColor: "white", minHeight: "150px" }} // Adiciona estilo para evitar fundo preto
      />
    </Fragment>
  );
};

export default Editor;
