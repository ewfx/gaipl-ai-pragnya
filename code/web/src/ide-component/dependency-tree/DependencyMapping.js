import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, Handle } from 'reactflow';
import 'reactflow/dist/style.css';
import { useIncident } from '../../context/IncidentContext';

// Custom Node Component to render nodes with dynamic styles based on data
const CustomNode = ({ data }) => {
  return (
    <div style={{
      padding: '10px 20px',
      backgroundColor: data.color || '#ccc',
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      width: '200px',
      height: '75px',
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

// Define custom node type
const nodeTypes = { custom: CustomNode };

/**
 * Converts relationship data into a tree structure with status and color information.
 * @param {Array} relationships - List of relationships between nodes.
 * @param {Array} alerts - List of alerts with severity information.
 * @returns {Array} Root nodes of the tree structure.
 */
function convertToTree(relationships, alerts) {
  if (!relationships || !relationships.length) return [];

  const findStatusAndColor = (name) => {
    const alert = alerts.find(a => a.appid === name || a.host === name || a.instance === name);
    if (alert) {
      const color = alert.severity === 'Critical' ? '#c30010' :
                    alert.severity === 'Warning' ? '#f39c12' :
                    'green';
      return { status: alert.severity, color };
    }
    return { status: 'Unknown', color: '#c30010' };
  };

  const nodes = {};

  relationships.forEach(rel => {
    const parent = rel.parent_ci_name;
    const child = rel.child_ci_name;

    if (!nodes[parent]) {
      const parentStatus = findStatusAndColor(parent);
      nodes[parent] = { label: parent, status: parentStatus.status, relation: rel.relationship_type, color: parentStatus.color, childs: [] };
    }

    if (!nodes[child]) {
      const childStatus = findStatusAndColor(child);
      nodes[child] = { label: child, status: childStatus.status, relation: rel.relationship_type, color: childStatus.color, childs: [] };
    }

    nodes[parent].childs.push(nodes[child]);
  });

  return Object.values(nodes).filter(node => !relationships.some(rel => rel.child_ci_name === node.label));
}

/**
 * Recursively generates nodes and edges for ReactFlow visualization.
 * @param {Object} node - Current node object.
 * @param {number} x - X-coordinate for node positioning.
 * @param {number} y - Y-coordinate for node positioning.
 * @param {string|null} parentId - ID of the parent node.
 * @param {number} level - Current depth level in the tree.
 * @returns {Object} Nodes and Edges for ReactFlow.
 */
const generateNodesAndEdges = (node, x = 500, y = 50, parentId = null, level = 1) => {
  const nodes = [];
  const edges = [];

  if (!node || !node.label) return { nodes, edges };

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

// Main Component for rendering the ReactFlow graph
const BasicFlow = () => {
  const [alerts, setAlerts] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const { selectedIncident } = useIncident();

  const { nodes, edges } = generateNodesAndEdges(convertToTree(relationships, alerts)[0]);

  useEffect(() => {
    if (!selectedIncident) return;

    fetch(`http://localhost:8000/dependency-map/`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        const incidentId = selectedIncident.incident_id;
        setRelationships(data[incidentId] ? data[incidentId] : data.relationship);
        setAlerts(selectedIncident.correlated_alerts);
      });
  }, [selectedIncident]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default BasicFlow;
