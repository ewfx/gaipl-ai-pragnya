import React, { useState } from 'react';
import ReactFlow, { Background, Controls, Handle } from 'reactflow';
import 'reactflow/dist/style.css';

// Custom Node Component
const CustomNode = ({ data }) => {
  return (
    <div style={{
      padding: '10px 20px',
      borderRadius: '50%',
      backgroundColor: data.color || '#ccc',
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      width: '100px',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div>{data.label}</div>
      <Handle type="source" position="bottom" />
      <Handle type="target" position="top" />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

const data = {
  label: 'DB-SERVER-01',
  status: 'Active',
  relation: 'Depends On',
  color: '#f39c12',
  childs: [
    { label: 'APP-SERVER-01', status: 'Active', relation: 'Depends On', color: '#3498db' },
    { label: 'FIREWALL-01', status: 'Active', relation: 'Connected To', color: '#e74c3c',
      childs: [
        { label: 'ROUTER-01', status: 'Active', relation: 'Connected To', color: '#e74c3c' },
        { label: 'SWITCH-01', status: 'Active', relation: 'Connected To', color: '#e74c3c' }
      ]
    }
  ]
};

const generateNodesAndEdges = (node, x = 500, y = 50, parentId = null, level = 1) => {
  const nodes = [];
  const edges = [];

  const id = node.label.replace(/\s/g, '-');
  nodes.push({
    id,
    type: 'custom',
    data: { label: node.label, color: node.color },
    position: { x, y }
  });

  if (parentId) {
    edges.push({
      id: `${parentId}-${id}`,
      source: parentId,
      target: id,
      label: node.relation,
      style: { stroke: '#ccc' },
      labelStyle: { fontSize: 12 }
    });
  }

  if (node.childs) {
    const count = node.childs.length;
    const spacing = 300 / level;
    node.childs.forEach((child, index) => {
      const newX = x + (index - (count - 1) / 2) * spacing * level;
      const childResult = generateNodesAndEdges(child, newX, y + 200, id, level + 1);
      nodes.push(...childResult.nodes);
      edges.push(...childResult.edges);
    });
  }

  return { nodes, edges };
};

const BasicFlow = () => {
  const { nodes, edges } = generateNodesAndEdges(data);
  const [info, setInfo] = useState(null);

  const onNodeClick = (event, node) => {
    const nodeInfo = nodes.find((n) => n.id === node.id);
    setInfo({ ...nodeInfo, x: event.clientX, y: event.clientY });
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={onNodeClick} 
      >
        <Background />
        <Controls />
      </ReactFlow>
      {info && (
        <div style={{
          position: 'block',
          top: info.y + 10,
          left: info.x + 10,
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}>
          <div onClick={() => setInfo(null)} style={{'font-size':'14px','text-align':'right', cursor: 'pointer'}}><b>X</b></div>
          <p>{info.data.label}</p>
        </div>
      )}
    </div>
  );
};

export default BasicFlow;
