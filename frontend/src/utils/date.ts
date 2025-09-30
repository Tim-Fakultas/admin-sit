/**
 * Utility functions for date formatting
 */

export const formatDate = (dateString: string, locale: string = 'id-ID'): string => {
  return new Date(dateString).toLocaleDateString(locale);
};

export const formatDateTime = (dateString: string, locale: string = 'id-ID'): string => {
  return new Date(dateString).toLocaleString(locale);
};

export const formatDateWithTime = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString('id-ID')} ${date.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })}`;
};

export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};