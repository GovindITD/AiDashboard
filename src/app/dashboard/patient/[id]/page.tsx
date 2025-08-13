
'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/ui/card';
import { mockPatients, mockPatientQuestions } from '../../../../lib/mock-data';
import { Button } from '../../../../components/ui/button';
import {Link} from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '../../../../components/ui/separator';

export default function PatientQuestionPage() {
  const params = useParams();
  const patientId = params.id ? parseInt(params.id as string, 10) : null;
  const patient = patientId ? mockPatients.find((p) => p.id === patientId) : null;

  // Mock Q&A data - in a real app, you'd fetch this based on patientId
  const questionsAndAnswers = [
    {
      question: mockPatientQuestions[0],
      answer: "The common side effects are mild nausea and headache. These usually go away after a few days."
    },
    {
      question: mockPatientQuestions[2],
      answer: "Your cholesterol levels are slightly elevated, but your other results are normal. We'll monitor this."
    },
     {
      question: mockPatientQuestions[6],
      answer: "We accept most major insurance plans. Our billing department can provide a detailed breakdown of costs and coverage for you."
    }
  ];

  if (!patient) {
    return (
       <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
          <Card>
            <CardHeader>
                <CardTitle>Patient Not Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p>The patient you are looking for does not exist.</p>
                 <Button asChild className="mt-4">
                    <a href="/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </a>
                </Button>
            </CardContent>
        </Card>
       </div>
    );
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <Button asChild variant="outline" size="sm" className="mb-4">
            <a href="/dashboard/ai-visits">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to AI Visits
            </a>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Patient Questions</CardTitle>
            <CardDescription>
              Displaying questions and answers for {patient.name}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {questionsAndAnswers.map((qa, index) => (
              <div key={index}>
                <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">Question {index + 1}:</h3>
                    <p className="text-muted-foreground bg-secondary p-3 rounded-md">{qa.question}</p>
                </div>
                <div>
                     <h3 className="font-semibold text-lg mb-2">AI Answer:</h3>
                     <p className="text-foreground bg-primary/10 p-3 rounded-md">{qa.answer}</p>
                </div>
                {index < questionsAndAnswers.length - 1 && <Separator className="my-6" />}
              </div>
            ))}
             {questionsAndAnswers.length === 0 && (
                <p>No questions have been recorded for this patient.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
