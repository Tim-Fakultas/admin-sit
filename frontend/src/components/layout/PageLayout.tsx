import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function PageLayout({ 
  title, 
  subtitle, 
  showBackButton = false, 
  actions, 
  children 
}: PageLayoutProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.back()}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          </div>
          {subtitle && (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}