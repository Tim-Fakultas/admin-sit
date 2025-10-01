// Error handling utilities
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ErrorInfo {
  message: string;
  status?: number;
  code?: string;
  field?: string;
}

export const parseApiError = (error: any): ErrorInfo => {
  if (error.response?.data) {
    const { message, errors, status } = error.response.data;

    // Handle validation errors
    if (errors && typeof errors === 'object') {
      const firstField = Object.keys(errors)[0];
      const firstError = errors[firstField][0];
      return {
        message: firstError || message || 'Validation error occurred',
        status: status || error.response.status,
        field: firstField,
      };
    }

    return {
      message: message || 'An error occurred',
      status: status || error.response.status,
    };
  }

  if (error.message) {
    return { message: error.message };
  }

  return { message: 'Unknown error occurred' };
};

export const handleErrorMessage = (error: any): string => {
  const errorInfo = parseApiError(error);
  return errorInfo.message;
};
