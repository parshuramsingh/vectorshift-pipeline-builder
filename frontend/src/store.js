import create from 'zustand';
import { nanoid } from 'nanoid';
import { applyNodeChanges, applyEdgeChanges, addEdge } from 'react-flow-renderer';

const initialNodes = [
  { id: '1', type: 'inputNode', position: { x: 50, y: 40 }, data: { label: 'Input' } },
  { id: '2', type: 'llmNode', position: { x: 300, y: 40 }, data: { label: 'LLM' } },
  { id: '3', type: 'textNode', position: { x: 300, y: 220 }, data: { text: 'Hello {{who}}' } },
  { id: '4', type: 'outputNode', position: { x: 600, y: 120 }, data: { label: 'Output' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-4', source: '2', target: '4' },
];

const useStore = create((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  history: [],
  future: [],

  // Basic setters
  setNodes: (fn) => set(state => ({ nodes: typeof fn === 'function' ? fn(state.nodes) : fn })),
  setEdges: (fn) => set(state => ({ edges: typeof fn === 'function' ? fn(state.edges) : fn })),

  // React Flow handlers
  onNodesChange: (changes) => set(state => ({
    nodes: applyNodeChanges(changes, state.nodes),
    history: [...state.history, { nodes: applyNodeChanges(changes, state.nodes), edges: state.edges }],
    future: []
  })),
  onEdgesChange: (changes) => set(state => ({
    edges: applyEdgeChanges(changes, state.edges),
    history: [...state.history, { nodes: state.nodes, edges: applyEdgeChanges(changes, state.edges) }],
    future: []
  })),

  // Node & Edge operations
  addNode: (node) => set(state => ({
    nodes: [...state.nodes, node],
    history: [...state.history, { nodes: [...state.nodes, node], edges: state.edges }],
    future: []
  })),
  addEdge: (edge) => set(state => ({
    edges: addEdge(edge, state.edges),
    history: [...state.history, { nodes: state.nodes, edges: addEdge(edge, state.edges) }],
    future: []
  })),
  deleteNode: (nodeId) => set(state => ({
    nodes: state.nodes.filter(n => n.id !== nodeId),
    edges: state.edges.filter(e => e.source !== nodeId && e.target !== nodeId),
    history: [...state.history, { nodes: state.nodes.filter(n => n.id !== nodeId), edges: state.edges.filter(e => e.source !== nodeId && e.target !== nodeId) }],
    future: []
  })),
  deleteEdge: (edgeId) => set(state => ({
    edges: state.edges.filter(e => e.id !== edgeId),
    history: [...state.history, { nodes: state.nodes, edges: state.edges.filter(e => e.id !== edgeId) }],
    future: []
  })),
  duplicateNode: (nodeId) => set(state => {
    const nodeToCopy = state.nodes.find(n => n.id === nodeId);
    if (!nodeToCopy) return {};
    const newNode = { ...nodeToCopy, id: nanoid(), position: { x: nodeToCopy.position.x + 20, y: nodeToCopy.position.y + 20 } };
    return {
      nodes: [...state.nodes, newNode],
      history: [...state.history, { nodes: [...state.nodes, newNode], edges: state.edges }],
      future: []
    };
  }),

  // Undo/Redo
  undo: () => set(state => {
    if (state.history.length === 0) return {};
    const last = state.history[state.history.length - 1];
    return {
      nodes: last.nodes,
      edges: last.edges,
      history: state.history.slice(0, -1),
      future: [ { nodes: state.nodes, edges: state.edges }, ...state.future ]
    };
  }),
  redo: () => set(state => {
    if (state.future.length === 0) return {};
    const next = state.future[0];
    return {
      nodes: next.nodes,
      edges: next.edges,
      history: [...state.history, { nodes: state.nodes, edges: state.edges }],
      future: state.future.slice(1)
    };
  }),

  // Reset
  resetFlow: () => set({
    nodes: initialNodes,
    edges: initialEdges,
    history: [],
    future: []
  }),
}));

export default useStore;
