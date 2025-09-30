import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({ message = 'Loading...', size = 'md' }: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Terjadi kesalahan', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-4">
      <div className="text-center">
        <p className="text-red-500 mb-2">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            Coba lagi
          </button>
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  message?: string;
  action?: React.ReactNode;
}

export function EmptyState({ message = 'Tidak ada data', action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-4">
      <p className="text-muted-foreground">{message}</p>
      {action}
    </div>
  );
}