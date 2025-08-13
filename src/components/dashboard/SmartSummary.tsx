'use client';

import * as React from 'react';
import { useForm, useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { getSmartSummary } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, Loader2 } from 'lucide-react';

type State = {
  summary: string;
  keyRelationships: string;
  error?: string;
};

const initialState: State = {
  summary: '',
  keyRelationships: '',
};

export function SmartSummary() {
  const { toast } = useToast();
  const [pending, setPending] = React.useState(false);
  const [result, setResult] = React.useState<State | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const patientQuestions = formData.get('patientQuestions') as string;
    const patientOutcomes = formData.get('patientOutcomes') as string;

    try {
      const summaryResult = await getSmartSummary(patientQuestions, patientOutcomes);
      setResult(summaryResult);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setResult({ ...initialState, error: errorMessage });
      toast({
        variant: 'destructive',
        title: 'Error Generating Summary',
        description: errorMessage,
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Data Analysis</CardTitle>
          <CardDescription>
            Input patient questions and medical outcomes to find key relationships and generate a summary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="patientQuestions" className="block text-sm font-medium mb-1">
                Patient Questions
              </label>
              <Textarea
                id="patientQuestions"
                name="patientQuestions"
                placeholder="Enter patient questions, one per line..."
                className="min-h-[150px]"
                required
              />
            </div>
            <div>
              <label htmlFor="patientOutcomes" className="block text-sm font-medium mb-1">
                Patient Outcomes
              </label>
              <Textarea
                id="patientOutcomes"
                name="patientOutcomes"
                placeholder="Enter corresponding medical outcomes, one per line..."
                className="min-h-[150px]"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
              Generate Summary
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-8">
        <Card className="min-h-[200px]">
          <CardHeader>
            <CardTitle>Generated Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {pending && <div className="flex items-center space-x-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /><span>Analyzing data...</span></div>}
            {result?.error && <p className="text-destructive">{result.error}</p>}
            {result?.summary && <p className="text-sm whitespace-pre-wrap">{result.summary}</p>}
             {!pending && !result && <p className="text-sm text-muted-foreground">Your AI-generated summary will appear here.</p>}
          </CardContent>
        </Card>
        <Card className="min-h-[200px]">
          <CardHeader>
            <CardTitle>Key Relationships</CardTitle>
          </CardHeader>
          <CardContent>
            {pending && <div className="flex items-center space-x-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /><span>Identifying relationships...</span></div>}
            {result?.error && <p className="text-destructive">{result.error}</p>}
            {result?.keyRelationships && <p className="text-sm whitespace-pre-wrap">{result.keyRelationships}</p>}
            {!pending && !result && <p className="text-sm text-muted-foreground">Key insights and relationships will be displayed here.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
