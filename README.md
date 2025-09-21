# VectorShift Pipeline Builder

A **visual, node-based pipeline editor** built with **React Flow, Zustand, and FastAPI**.
Create, connect, and manage pipelines of nodes (Input, LLM, Text, Output, Logger) in a **drag-and-drop interface**. Detect cycles, submit pipelines, and inspect node/edge data instantly.

---

## 🚀 Features

* **Drag-and-drop node editor**: Add Input, LLM, Text, Output, and Logger nodes.
* **Connect nodes visually**: Create directed edges between nodes.
* **Cycle detection**: Automatically checks if the pipeline forms a DAG (Directed Acyclic Graph).
* **Undo/Redo**: Manage node/edge history efficiently.
* **Node operations**: Add, delete, duplicate nodes and edges.
* **Submit pipeline**: Send nodes and edges to backend and visualize response.
* **Real-time modal output**: Inspect parsed pipeline results.
* **Persistent state**: Built with Zustand for global state management.

---

## 🌐 Live Demo

Try it online here: [**VectorShift Pipeline Builder Demo**](https://parshuramsingh.github.io/vectorshift-pip)

## 🍽 Tech Stack

* **Frontend**: React, React Flow Renderer, Zustand, Tailwind CSS, React Icons
* **Backend**: Python, FastAPI, Pydantic
* **Deployment Ready**: CORS configured for cross-origin requests

---

## 📁 Folder Structure

```
frontend/
├─ src/
│ ├─ components/
│ │ ├─ Toolbar.jsx
│ │ └─ SubmitModal.jsx
│ ├─ nodes/
│ │ ├─ InputNode.jsx
│ │ ├─ OutputNode.jsx
│ │ ├─ LLMNode.jsx
│ │ ├─ TextNode.jsx
│ │ └─ NodeBase.jsx
│ ├─ store.js
│ └─ ui.js
├─ package.json
backend/
├─ main.py
├─ requirements.txt
```

---

## ⚡ Installation

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

---

## 🎨 Usage

1. Open the frontend at `localhost:3000`.
2. Drag nodes from the toolbar or click to add default nodes.
3. Connect nodes by dragging from the input/output handles.
4. Delete nodes or edges using the delete buttons (implemented in the UI).
5. Click **Submit Pipeline** to send nodes and edges to the FastAPI backend.

Backend Response Example:

```json
{
  "num_nodes": 4,
  "num_edges": 3,
  "is_dag": true
}
```

If `is_dag` is `false`, your pipeline contains a cycle.

---

## 🧠 Notes

* Cycle detection uses **Kahn’s Algorithm** on node adjacency.
* Handles with suffixes (`nodeId-handle`) are correctly mapped to parent nodes.
* Supports **undo/redo** for changes in nodes and edges.
* Designed for extensibility: add new node types by extending `NodeBase`.

---

## 🛠 Extendability

To add a new node type:

1. Create a new node component in `nodes/`.
2. Add it to `nodeTypes` in `ui.js`.
3. Update the backend logic if the new node type affects pipeline processing.

---

## 📊 Backend API

* **GET /**: Check backend status: `http://localhost:8000/`
* **POST /pipelines/parse**: Submit a pipeline to check nodes, edges, and DAG status.
