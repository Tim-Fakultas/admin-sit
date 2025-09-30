interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    const configs = {
      'disetujui': {
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        label: 'Disetujui'
      },
      'diajukan': {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        label: 'Diajukan'
      },
      'ditolak': {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        label: 'Ditolak'
      },
      'perbaikan': {
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-800',
        label: 'Perlu Perbaikan'
      }
    };
    
    return configs[status as keyof typeof configs] || {
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      label: status.charAt(0).toUpperCase() + status.slice(1)
    };
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const config = getStatusConfig(status);

  return (
    <span 
      className={`
        ${sizeClasses[size]} 
        ${config.bgColor} 
        ${config.textColor} 
        rounded-full font-medium inline-flex items-center
      `}
    >
      {config.label}
    </span>
  );
}