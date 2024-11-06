import { io, Socket } from 'socket.io-client';
import mockData from './mockData.json';

let socket: Socket;

export const initSocket = () => {
  socket = io('http://localhost:3000', {
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('Connected to mock WebSocket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from mock WebSocket server');
  });
};

export const sendQuery = (query: string) => {
  return new Promise((resolve) => {
    if (query.toLowerCase().startsWith('mock:')) {
      const mockQuery = query.slice(5).trim().toLowerCase();
      const response = getMockResponse(mockQuery);
      setTimeout(() => resolve(response), 500); // Simulate network delay
    } else {
      // For non-mock queries, you can implement actual API calls here in the future
      resolve({ message: 'Non-mock queries are not implemented yet.' });
    }
  });
};

const getMockResponse = (query: string) => {
  // Here you can define different mock responses based on the query
  if (query.includes('influenza trends')) {
    return {
      type: 'chart',
      data: mockData.influenzaTrends,
      message: 'Here are the influenza trends for California over the past 5 years.',
    };
  } else if (query.includes('regional comparison')) {
    return {
      type: 'table',
      data: mockData.regionalComparison,
      message: 'Here\'s a comparison of influenza cases across different regions in California.',
    };
  } else {
    return {
      type: 'text',
      message: 'I\'m sorry, I don\'t have specific information for that query. Please try asking about influenza trends or regional comparisons.',
    };
  }
};

export const closeSocket = () => {
  if (socket) socket.close();
};