import { Entertainer } from '../types/Entertainer';

const API_URL = `https://localhost:4000`;
export const fetchEntertainers = async (
  pageSize: number,
  pageNum: number
): Promise<Entertainer[]> => {
  const response = await fetch(
    `${API_URL}/Entertainer?pageSize=${pageSize}&pageNum=${pageNum}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Entertainers');
  }

  return await response.json();
};

export const addEntertainer = async (
  newEntertainer: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/Entertainer/AddEntertainer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntertainer),
    });

    if (!response.ok) {
      throw new Error('Failed to add entertainer');
    }

    return await response.json();
  } catch (error) {
    console.error('error adding entertainer', error);
    throw error;
  }
};

export const updateEntertainer = async (
  entertainerId: number,
  updatedEntertainer: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(
      `${API_URL}/Entertainer/UpdateEntertainer/${entertainerId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEntertainer),
      }
    );

    return await response.json();
  } catch (error) {
    console.error('Error updating entertainer', error);
    throw error;
  }
};

export const deleteEntertainer = async (entertainerId: number): Promise<void> => {
  try {
    const response = await fetch(
      `${API_URL}/Entertainer/DeleteEntertainer/${entertainerId}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete Entertainer');
    }
  } catch (error) {
    console.error('Error deleting Entertainer:', error);
    throw error;
  }
};
