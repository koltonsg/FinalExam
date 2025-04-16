import { Entertainer } from '../types/Entertainer';

interface FetchEntertainersResponse {
  entertainers: Entertainer[];
  totalNumEntertainers: number;
}
const API_URL = 'https://localhost:4000';
export const fetchEntertainers = async (
  pageSize: number,
  pageNum: number
): Promise<FetchEntertainersResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/Entertainer?pageSize=${pageSize}&pageNum=${pageNum}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Entertainers');
    }
    return await response.json();
  } catch (error) {
    console.error('error fetching Entertainers:', error);
    throw error;
  }
};
