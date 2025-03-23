import React from 'react';
import ReactFlow, { Background, Controls, Handle } from 'reactflow';
import 'reactflow/dist/style.css';

// Custom Node Component
const CustomNode = ({ data }) => {
  return (
    <div style={{
      padding: '10px 20px',
      borderRadius: '8px',
      backgroundColor: data.color || '#ccc',
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    }}>
      {data.label}
      <Handle type="source" position="bottom" />
      <Handle type="target" position="top" />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };
const data = {
    label: 'Label 1',
    status: 'Active',
    childs: [
      {
        label: 'Node 2',
        status: 'Failed'
      },
      {
        label: 'Node 3',
        status: 'Active',
        childs: [
          {
            label: 'Node 4',
            status: 'Failed'
          },
          {
            label: 'Node 5',
            status: 'Failed'
          }
        ]
      }
    ]
  };
const BasicFlow = () => {
  const { nodes, edges } = generateNodesAndEdges(data);
   
  console.log(nodes);
  console.log(edges);
  /*const nodes = [
    { id: '1', type: 'custom', data: { label: 'Node 1', color: '#007bff' }, position: { x: 250, y: 50 } },
    { id: '2', type: 'custom', data: { label: 'Node 2', color: '#28a745' }, position: { x: 200, y: 200 } },
    { id: '3', type: 'custom', data: { label: 'Node 3', color: '#dc3545' }, position: { x: 300, y: 200 } },
  ];

  const edges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3', animated: true },
  ];*/

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

const generateNodesAndEdges = (node, x = 500, y = 50, parentId = null, level = 1) => {
    const nodes = [];
    const edges = [];
  
    const id = node.label.replace(/\s/g, '-');
    nodes.push({
      id,
      data: { label: node.label },
      position: { x, y },
      style: { backgroundColor: getColor(node.status), color: '#fff', padding: '10px', borderRadius: '8px' }
    });
  
    if (parentId) {
      edges.push({ id: `${parentId}-${id}`, source: parentId, target: id, animated: true });
    }
  
    if (node.childs) {
      const count = node.childs.length;
      const spacing = 200 / level;
      node.childs.forEach((child, index) => {
        const newX = x + (index - (count - 1) / 2) * spacing * level;
        const childResult = generateNodesAndEdges(child, newX, y + 150, id, level + 1);
        nodes.push(...childResult.nodes);
        edges.push(...childResult.edges);
      });
    }
  
    return { nodes, edges };
  };

  const getColor = (status) => {
    switch (status) {
      case 'Active': return '#28a745';
      case 'Failed': return '#dc3545';
      default: return '#6c757d';
    }
  };

export default BasicFlow;
