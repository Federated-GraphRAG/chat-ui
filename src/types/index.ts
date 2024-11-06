export interface GraphNode {
    id: string;
    label: string;
    // Add other properties as needed
  }
  
  export interface GraphEdge {
    source: string;
    target: string;
    label: string;
    // Add other properties as needed
  }
  
  export interface GraphData {
    nodes: GraphNode[];
    edges: GraphEdge[];
  }