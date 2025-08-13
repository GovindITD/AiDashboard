"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "../../../components/ui/table";
import {
  mockPatients,
  mockPatientQuestionsWithPatient,
} from "../../../lib/mock-data";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, FileDown } from "lucide-react";

export default function AiVisitsPage() {
  const patients = mockPatients;

  const questionCountsByPatient = mockPatientQuestionsWithPatient.reduce(
    (acc, item) => {
      acc[item.patientId] = (acc[item.patientId] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  const patientsWithQuestionCount = patients.slice(0, 8).map((patient) => ({
    ...patient,
    questionCount: questionCountsByPatient[patient.id] || 0,
  }));

  const totalQuestions = patientsWithQuestionCount.reduce(
    (sum, patient) => sum + patient.questionCount,
    0
  );

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
              <CardTitle>Patient Visits in AI</CardTitle>
              <CardDescription>
                A list of patients who have interacted with the AI.
              </CardDescription>
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
                  <TableHead>View Question</TableHead>
                  <TableHead className="text-right">Question Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientsWithQuestionCount.map((patient, index) => (
                  <TableRow key={patient.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {patient.name}
                    </TableCell>
                    <TableCell>{patient.mobile}</TableCell>
                    <TableCell>{`${patient.age}/${patient.gender.charAt(
                      0
                    )}`}</TableCell>
                    <TableCell>
                      <a href={`/dashboard/patient/${patient.id}`}>
                        <Button variant="link" size="sm">
                          View
                        </Button>
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      {patient.questionCount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} className="text-right font-bold">
                    Total Questions
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {totalQuestions}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
