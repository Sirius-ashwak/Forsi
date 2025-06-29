import { ChatMessage, DisruptionEvent, Scenario } from '../types';

export const mockSupplyChainNodes = [
  {
    id: 'factory-1',
    name: 'Shanghai Manufacturing Hub',
    type: 'factory' as const,
    coordinates: [31.2304, 121.4737, 0],
    status: 'operational' as const,
    capacity: 10000,
    utilizationRate: 0.85,
    lastUpdated: '2025-01-12T10:30:00Z'
  },
  {
    id: 'port-1',
    name: 'Port of Los Angeles',
    type: 'port' as const,
    coordinates: [33.7361, -118.2639, 0],
    status: 'at-risk' as const,
    capacity: 50000,
    utilizationRate: 0.95,
    lastUpdated: '2025-01-12T10:25:00Z'
  },
  {
    id: 'warehouse-1',
    name: 'Chicago Distribution Center',
    type: 'warehouse' as const,
    coordinates: [41.8781, -87.6298, 0],
    status: 'operational' as const,
    capacity: 25000,
    utilizationRate: 0.72,
    lastUpdated: '2025-01-12T10:20:00Z'
  },
  {
    id: 'supplier-1',
    name: 'Munich Precision Components',
    type: 'supplier' as const,
    coordinates: [48.1351, 11.5820, 0],
    status: 'disrupted' as const,
    capacity: 5000,
    utilizationRate: 0.45,
    lastUpdated: '2025-01-12T09:15:00Z'
  }
];

export const mockShippingRoutes = [
  {
    id: 'route-1',
    from: 'factory-1',
    to: 'port-1',
    status: 'active' as const,
    estimatedDelay: 0,
    shipments: 12
  },
  {
    id: 'route-2',
    from: 'port-1',
    to: 'warehouse-1',
    status: 'delayed' as const,
    estimatedDelay: 3,
    shipments: 8
  },
  {
    id: 'route-3',
    from: 'supplier-1',
    to: 'factory-1',
    status: 'blocked' as const,
    estimatedDelay: 7,
    shipments: 0
  }
];

export const mockDisruptions = [
  {
    id: 'disruption-1',
    title: 'Severe Weather System - Pacific Coast',
    type: 'weather' as const,
    severity: 'high' as const,
    location: [34.0522, -118.2437],
    affectedNodes: ['port-1'],
    startDate: '2025-01-12T08:00:00Z',
    estimatedEndDate: '2025-01-15T08:00:00Z',
    impact: {
      cost: 2500000,
      delay: 4,
      productsAffected: 1250
    }
  },
  {
    id: 'disruption-2',
    title: 'Labor Strike - European Manufacturing',
    type: 'political' as const,
    severity: 'critical' as const,
    location: [48.1351, 11.5820],
    affectedNodes: ['supplier-1'],
    startDate: '2025-01-10T06:00:00Z',
    impact: {
      cost: 4200000,
      delay: 12,
      productsAffected: 3400
    }
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    type: 'alert',
    content: 'Alert: Lead time surge detected in Asia-Pacific region. Estimated impact: 15% increase in delivery times.',
    timestamp: '2025-01-12T10:30:00Z',
    actions: [
      { label: 'View Details', action: 'view-disruption' },
      { label: 'Draft Communication', action: 'draft-email' }
    ]
  },
  {
    id: 'msg-2',
    type: 'assistant',
    content: 'Based on current disruptions, I recommend shifting 30% of production from Munich to Shanghai facility. This will reduce overall delays by 8 days and save approximately $1.2M in costs.',
    timestamp: '2025-01-12T10:25:00Z',
    actions: [
      { label: 'Implement Recommendation', action: 'apply-suggestion' },
      { label: 'Create Scenario', action: 'create-scenario' }
    ]
  }
];

export const mockScenarios: Scenario[] = [
  {
    id: 'scenario-1',
    name: 'Weather Impact Analysis',
    description: 'Pacific Coast storm system affecting West Coast operations',
    events: [mockDisruptions[0]],
    kpis: {
      totalCost: 2500000,
      avgDelay: 4.2,
      productsAffected: 1250,
      riskScore: 7.5
    }
  },
  {
    id: 'scenario-2',
    name: 'Multi-Region Crisis',
    description: 'Combined weather and labor disruptions across key regions',
    events: mockDisruptions,
    kpis: {
      totalCost: 6700000,
      avgDelay: 9.8,
      productsAffected: 4650,
      riskScore: 9.2
    }
  }
];

export const generateAIResponse = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const responses = [
    "Based on historical patterns and current data, I recommend diversifying suppliers in the affected region.",
    "The disruption analysis suggests implementing a 48-hour buffer in your logistics timeline.",
    "Current risk indicators show elevated probability of delays in the Asia-Pacific corridor.",
    "I've identified three alternative shipping routes that could reduce impact by 65%.",
    "Predictive models indicate this disruption may extend beyond initial estimates."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};