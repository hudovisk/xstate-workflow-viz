import React from "react";

const conditionalBranchNode = state => {
  const label = state.conditions.map(condition => condition.field).join(",");
  return {
    shape: "diamond",
    label
  };
};

const sendEventNode = state => {
  const label = state.eventId;
  return {
    shape: "rect",
    label
  };
};

const unknownNode = () => ({
  shape: "rect",
  label: "unkown"
});

const finalNode = () => ({
  shape: "circle",
  label: "Exit"
});

const startNode = () => ({
  shape: "circle",
  label: "Start"
});

const getNodeFromState = state => {
  switch (state.type) {
    case "conditional_branch":
      return conditionalBranchNode(state);
    case "send_event":
      return sendEventNode(state);
    case "start":
      return startNode(state);
    case "final":
      return finalNode(state);
    default:
      return unknownNode(state);
  }
};

const normalEdges = state => {
  const edges = Object.keys(state.on || {});
  console.log(edges);
  return edges.map(edge => ({ target: state.on[edge], label: edge }));
};

const getEdgesFromState = state => {
  switch (state.type) {
    case "conditional_branch":
    case "send_email":
    case "final":
    default:
      return normalEdges(state);
  }
};

const codeToData = code => {
  const { states } = JSON.parse(code);
  const keys = Object.keys(states);
  const nodes = [];
  const edges = [];

  for (const key of keys) {
    const node = {
      id: key,
      ...getNodeFromState(states[key])
    };
    const edgesFromState = getEdgesFromState(states[key]).map(edge => ({
      ...edge,
      source: key
    }));

    nodes.push(node);
    edges.push(...edgesFromState);
  }

  console.log("codeToData", { nodes, edges });

  return { nodes, edges };
};

const useWorkflowToGraphData = (initialCode = "", options = {}) => {
  const delay = options.delay || 1000;
  const [code, setCode] = React.useState(initialCode);
  const [data, setData] = React.useState({ nodes: [], edges: [] });

  React.useEffect(() => {
    const convertTimeout = setTimeout(() => {
      try {
        console.log("converting code...");
        setData(codeToData(code));
      } catch (e) {
        console.error(e);
      }
    }, delay);

    return () => clearTimeout(convertTimeout);
  }, [code, delay]);

  return [data, code, setCode];
};

export default useWorkflowToGraphData;
