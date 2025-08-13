
'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { mockPatients } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import {Link} from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function QuestionPatientDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const patientId = params.id ? parseInt(params.id as string, 10) : null;
  const patient = patientId ? mockPatients.find((p) => p.id === patientId) : null;
  const question = searchParams.get('question');

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
                    <Link href="/dashboard/all-questions">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to All Questions
                    </Link>
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
            <Link href="/dashboard/all-questions">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Questions
            </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Patient Details</CardTitle>
            {question && 
                <CardDescription>
                    Showing patient who asked: "{decodeURIComponent(question)}"
                </CardDescription>
            }
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">S.N.</TableHead>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Mobile Number</TableHead>
                        <TableHead>Age/Gender</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.mobile}</TableCell>
                        <TableCell>{`${patient.age}/${patient.gender.charAt(0)}`}</TableCell>
                    </TableRow>
                </TableBody>
             </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
