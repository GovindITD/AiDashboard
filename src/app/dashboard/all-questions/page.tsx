
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '../../../components/ui/table';
import { mockPatientQuestionsWithPatient } from '../../../lib/mock-data';
import { Button } from '../../../components/ui/button';
import {Link} from 'react-router-dom';
import { ArrowLeft, FileDown } from 'lucide-react';

export default function AllQuestionsPage() {
    const questionCounts = mockPatientQuestionsWithPatient.reduce((acc, item) => {
        acc[item.question] = (acc[item.question] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const uniqueQuestions = Object.entries(questionCounts).map(([question, count], index) => {
        const firstOccurrence = mockPatientQuestionsWithPatient.find(item => item.question === question);
        return {
            question,
            patientId: firstOccurrence!.patientId, // Since we need a patient to link to
            patientCount: count,
        };
    });

    const totalPatientCount = uniqueQuestions.reduce((sum, item) => sum + item.patientCount, 0);

    return (
        <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 md:p-8">
            <div className="w-full max-w-4xl">
                <Button asChild variant="outline" size="sm" className="mb-4">
                    <a href="/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </a>
                </Button>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>All Patient Questions</CardTitle>
                        <CardDescription>A list of all questions asked by patients via the AI. Click a question to see patient details.</CardDescription>
                    </div>
                     <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <FileDown className="mr-2 h-4 w-4" />
                            Download PDF
                        </Button>
                        <Button variant="outline" size="sm">
                            <FileDown className="mr-2 h-4 w-4" />
                            Download Excel
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[80px]">S.N.</TableHead>
                        <TableHead>Question</TableHead>
                        <TableHead className="text-right">Patient Count</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {uniqueQuestions.map((item, index) => (
                        <TableRow key={index} >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">
                                <a href={`/dashboard/question/${item.patientId}?question=${encodeURIComponent(item.question)}`} className="block w-full h-full cursor-pointer hover:underline">
                                    {item.question}
                                </a>
                            </TableCell>
                            <TableCell className="text-right">{item.patientCount}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2} className="text-right font-bold">Total Patient Count</TableCell>
                            <TableCell className="text-right font-bold">{totalPatientCount}</TableCell>
                        </TableRow>
                    </TableFooter>
                    </Table>
                </CardContent>
                </Card>
            </div>
        </main>
    );
}
