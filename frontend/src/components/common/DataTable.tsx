import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingState, ErrorState, EmptyState } from '@/components/common/States';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  title?: string;
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
  emptyMessage?: string;
  actions?: (item: T) => React.ReactNode;
}

export function DataTable<T extends { id: number }>({ 
  title, 
  data, 
  columns, 
  isLoading, 
  error, 
  onRetry, 
  emptyMessage = "Tidak ada data",
  actions 
}: DataTableProps<T>) {
  
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;

  const renderCell = (item: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    return String(item[column.accessor] || '-');
  };

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {data.length === 0 ? (
          <EmptyState message={emptyMessage} />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-2 text-left">No</th>
                  {columns.map((column, index) => (
                    <th key={index} className={`px-2 py-2 text-left ${column.className || ''}`}>
                      {column.header}
                    </th>
                  ))}
                  {actions && <th className="px-2 py-2 text-left">Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-2 py-2">{index + 1}</td>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className={`px-2 py-2 ${column.className || ''}`}>
                        {renderCell(item, column)}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-2 py-2">
                        {actions(item)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}