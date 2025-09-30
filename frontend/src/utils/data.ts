/**
 * Utility functions for data filtering and sorting
 */

export const filterByStatus = <T extends { status: string }>(data: T[], status: string): T[] => {
  if (!status || status === 'all') return data;
  return data.filter(item => item.status === status);
};

export const filterBySearch = <T>(
  data: T[], 
  searchTerm: string, 
  searchFields: (keyof T)[]
): T[] => {
  if (!searchTerm) return data;
  
  const term = searchTerm.toLowerCase();
  return data.filter(item => 
    searchFields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(term);
      }
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(v => 
          typeof v === 'string' && v.toLowerCase().includes(term)
        );
      }
      return false;
    })
  );
};

export const sortData = <T>(
  data: T[], 
  field: keyof T, 
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...data].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return direction === 'asc' ? comparison : -comparison;
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (aValue instanceof Date && bValue instanceof Date) {
      const comparison = aValue.getTime() - bValue.getTime();
      return direction === 'asc' ? comparison : -comparison;
    }
    
    return 0;
  });
};

export const paginateData = <T>(data: T[], page: number, pageSize: number): T[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
};

export const getTotalPages = (totalItems: number, pageSize: number): number => {
  return Math.ceil(totalItems / pageSize);
};