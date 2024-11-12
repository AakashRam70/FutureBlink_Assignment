import React, { useCallback, useState } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
    useEdgesState,
    useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    { id: '1', type: 'input', data: { label: 'Lead Source' }, position: { x: 250, y: 5 } },
];

const nodeTypes = {
    coldEmail: (props) => (
        <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5, background: '#f7fafc' }}>
            Cold Email
        </div>
    ),
    delay: (props) => (
        <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5, background: '#ffe4c4' }}>
            Wait/Delay
        </div>
    ),
};

const NodeEditor = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodeId, setNodeId] = useState(2);

    const handleAddNode = useCallback((type) => {
        const newNode = {
            id: `${nodeId}`,
            type,
            position: { x: Math.random() * 500, y: Math.random() * 400 },
            data: { label: type.charAt(0).toUpperCase() + type.slice(1) },
        };
        setNodes((nds) => [...nds, newNode]);
        setNodeId((id) => id + 1);
    }, [nodeId, setNodes]);

    const handleRemoveNode = useCallback((id) => {
        setNodes((nds) => nds.filter((node) => node.id !== id));
        setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    }, [setNodes, setEdges]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div style={{ marginBottom: 10 }}>
                <button onClick={() => handleAddNode('coldEmail')}>Add Cold Email Node</button>
                <button onClick={() => handleAddNode('delay')}>Add Wait/Delay Node</button>
                <button onClick={() => handleAddNode('default')}>Add Lead Source Node</button>
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
            <div style={{ marginTop: 10 }}>
                {nodes.map((node) => (
                    <div key={node.id} style={{ margin: '5px 0' }}>
                        {node.data.label} (ID: {node.id}){' '}
                        <button onClick={() => handleRemoveNode(node.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NodeEditor;
