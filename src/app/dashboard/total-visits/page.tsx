
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { mockPatients } from '../../../lib/mock-data';
import {Link} from 'react-router-dom';
import { ArrowLeft, FileDown } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export default function TotalVisitsPage() {
    const patients = mockPatients;

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
                        <CardTitle>Total Patient Visits</CardTitle>
                        <CardDescription>A list of all patients who have visited.</CardDescription>
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
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Mobile Number</TableHead>
                        <TableHead>Age/Gender</TableHead>
                        <TableHead>Used AI</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {patients.map((patient, index) => (
                        <TableRow key={patient.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.mobile}</TableCell>
                            <TableCell>{`${patient.age}/${patient.gender.charAt(0)}`}</TableCell>
                            <TableCell>{patient.usedAI ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
                </Card>
            </div>
        </main>
    );
}
