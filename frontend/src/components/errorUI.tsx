import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ErrorUI({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
        <Button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          Retry
        </Button>
      </div>
    </div>
  );
}