import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPatientQuestions } from '@/lib/mock-data';
import { MessageSquareQuote } from 'lucide-react';

export function PatientQuestionsTab() {
  const totalQuestions = mockPatientQuestions.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Patient Questions</CardTitle>
        <MessageSquareQuote className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalQuestions}</div>
        <p className="text-xs text-muted-foreground">Total questions asked by patients in the selected period.</p>
      </CardContent>
    </Card>
  );
}
