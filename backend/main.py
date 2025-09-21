from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware
from collections import deque

app = FastAPI(title="VectorShift Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str = None
    data: Dict[str, Any] = None

class Edge(BaseModel):
    id: str = None
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get("/")
def root():
    return {"msg": "VectorShift backend is running"}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges

    num_nodes = len(nodes)
    num_edges = len(edges)

    # Extract valid node IDs
    ids = set(n.id for n in nodes)

    # Build adjacency list
    adj: Dict[str, List[str]] = {nid: [] for nid in ids}
    for e in edges:
        # Strip handle suffix if present (e.g., "3-var-who" -> "3")
        source_id = e.source.split('-')[0]
        target_id = e.target.split('-')[0]

        if source_id in ids and target_id in ids:
            adj[source_id].append(target_id)

    # Kahn's algorithm to detect cycles
    indeg: Dict[str, int] = {nid: 0 for nid in ids}
    for u in adj:
        for v in adj[u]:
            indeg[v] += 1

    q = deque([n for n, d in indeg.items() if d == 0])
    visited = 0
    while q:
        u = q.popleft()
        visited += 1
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)

    is_dag = visited == len(ids)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
