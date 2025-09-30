'use client';

import { useApiData } from "@/hooks/useApi";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DebugInfo() {
  const { user } = useAuthContext();
  const { data: stats } = useApiData<any>({ endpoint: '/dashboard/stats' });
  const { data: surats } = useApiData<any[]>({ endpoint: '/surat' });
  const searchParams = useSearchParams();

  // Hanya tampilkan jika:
  // 1. Development mode DAN ada parameter ?debug=true
  // 2. Atau ada environment variable SHOW_DEBUG=true
  const showDebug = (process.env.NODE_ENV === 'development' && searchParams.get('debug') === 'true') ||
                   process.env.NEXT_PUBLIC_SHOW_DEBUG === 'true';

  if (!showDebug) {
    return null;
  }

  return (
    <Card className="mt-6 border-yellow-200 bg-yellow-50">
      <CardHeader>
        <CardTitle className="text-yellow-700">🐛 Debug Info</CardTitle>
        <p className="text-sm text-yellow-600">
          Untuk menyembunyikan, hapus parameter ?debug=true dari URL
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm">User Info:</h4>
          <pre className="text-xs bg-white p-2 rounded border">
            {JSON.stringify({ 
              id: user?.id, 
              role: user?.role?.slug, 
              nim_nip: user?.nim_nip 
            }, null, 2)}
          </pre>
        </div>
        <div>
          <h4 className="font-semibold text-sm">Dashboard Stats:</h4>
          <pre className="text-xs bg-white p-2 rounded border">
            {JSON.stringify(stats, null, 2)}
          </pre>
        </div>
        <div>
          <h4 className="font-semibold text-sm">Surat Data ({surats?.length || 0} items):</h4>
          <pre className="text-xs bg-white p-2 rounded border max-h-40 overflow-y-auto">
            {JSON.stringify(surats?.map(s => ({ 
              id: s.id, 
              status: s.status, 
              user_id: s.user_id,
              user_nim: s.user?.nim_nip 
            })), null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}