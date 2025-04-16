export interface Engagement {
  engagementNumber: number;

  startDate?: string;
  endDate?: string;

  startTime?: string;
  stopTime?: string;

  contractPrice?: number;

  customerId?: number;
  agentId?: number;
  entertainerId?: number;
}
