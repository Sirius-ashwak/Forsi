export interface SupplyChainNode {
  id: string;
  name: string;
  type: 'factory' | 'port' | 'warehouse' | 'supplier';
  coordinates: [number, number, number];
  status: 'operational' | 'disrupted' | 'at-risk';
  capacity: number;
  utilizationRate: number;
  lastUpdated: string;
}

export interface ShippingRoute {
  id: string;
  from: string;
  to: string;
  status: 'active' | 'delayed' | 'blocked';
  estimatedDelay: number;
  shipments: number;
}

export interface DisruptionEvent {
  id: string;
  title: string;
  type: 'weather' | 'political' | 'economic' | 'infrastructure';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: [number, number];
  affectedNodes: string[];
  startDate: string;
  estimatedEndDate?: string;
  impact: {
    cost: number;
    delay: number;
    productsAffected: number;
  };
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'alert';
  content: string;
  timestamp: string;
  actions?: Array<{
    label: string;
    action: string;
  }>;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  events: DisruptionEvent[];
  kpis: {
    totalCost: number;
    avgDelay: number;
    productsAffected: number;
    riskScore: number;
  };
}

export interface UserRole {
  id: string;
  name: string;
  type: 'procurement' | 'logistics' | 'executive';
  permissions: string[];
  dashboardConfig: {
    widgets: string[];
    alerts: string[];
  };
}