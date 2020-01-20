import React from "react";
import GGEditor, { Flow } from "gg-editor";
import MonacoEditor from "react-monaco-editor";

import "./App.css";
import useWorkflowToGraphData from "./workflow-to-graph-data";

const App = () => {
  const [data, code, setCode] = useWorkflowToGraphData();
  const graphConfig = {
    layout: {
      type: "dagre",
      rankdir: "TB", // The center of the graph by default
      ranksep: 50,
      nodesep: 50
    },
    defaultNode: {
      shape: "rect"
    },
    defaultEdge: {
      shape: "polyline",
      style: {
        radius: 20,
        offset: 35,
        endArrow: true,
        lineWidth: 2,
        stroke: "#C2C8D5"
      }
    }
  };

  return (
    <div className="container">
      <GGEditor className="editor">
        <Flow className="editor-bd" data={data} graphConfig={graphConfig} />
      </GGEditor>
      <MonacoEditor
        width="40%"
        language="json"
        theme="vs-dark"
        value={code}
        onChange={setCode}
        options={{ selectOnLineNumbers: true, formatOnPaste: true }}
      />
    </div>
  );
};

export default App;
