
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { mockPatients } from '../../lib/mock-data';
import { Users } from 'lucide-react';
import { Button } from '../ui/button';
import {Link} from 'react-router-dom';
import { PatientQuestionsTab } from './PatientQuestionsTab';

export function PatientVisitsTab() {
  const [showDetails, setShowDetails] = React.useState(false);
  const patients = mockPatients;

  // Mock data for visit counts
  const todayVisits = 5;
  const yesterdayVisits = 8;

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <Card onClick={toggleDetails} className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Visits in AI
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayVisits}</div>
            <p className="text-xs text-muted-foreground">
              Total patient visits for today. Click to {showDetails ? 'hide' : 'view'} details.
            </p>
          </CardContent>
        </Card>
        <Card onClick={toggleDetails} className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Yesterday&apos;s Visits in AI
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{yesterdayVisits}</div>
             <p className="text-xs text-muted-foreground">
              Total patient visits for yesterday. Click to {showDetails ? 'hide' : 'view'} details.
            </p>
          </CardContent>
        </Card>
        <PatientQuestionsTab />
      </div>

      {showDetails && (
        <Card>
          <CardHeader>
            <CardTitle>Patient Visits</CardTitle>
            <CardDescription>A list of patients who have visited in the selected period.</CardDescription>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient, index) => (
                  <TableRow key={patient.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.mobile}</TableCell>
                    <TableCell>{`${patient.age}/${patient.gender.charAt(0)}`}</TableCell>
                    <TableCell>
                      <a href={`/dashboard/patient/${patient.id}`}>
                        <Button variant="link" size="sm">View</Button>
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
