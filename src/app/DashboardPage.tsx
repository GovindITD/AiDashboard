
'use client';

import * as React from 'react';
import { differenceInDays, format } from 'date-fns';
import { Header } from '../components/dashboard/Header';
import { DateFilter } from '../components/dashboard/DateFilter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Users, MessageSquareQuote } from 'lucide-react';
import { mockPatients } from '../lib/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [fromDate, setFromDate] = React.useState<Date | undefined>();
  const [toDate, setToDate] = React.useState<Date | undefined>();
  const [showDetails, setShowDetails] = React.useState(false);
  const [todayAiVisits, setTodayAiVisits] = React.useState(0);
  const [todayQuestions, setTodayQuestions] = React.useState(0);
  const [selectedRangeAiVisits, setSelectedRangeAiVisits] = React.useState(0);
  const [selectedRangeQuestions, setSelectedRangeQuestions] = React.useState(0);
  
  const patients = mockPatients;
  const navigate = useNavigate();

  const toggleDetails = () => setShowDetails(!showDetails);
  
  React.useEffect(() => {
    // Calculate today's visits and questions on initial render
    setTodayAiVisits(Math.floor(Math.random() * 3) + 2);
    setTodayQuestions(Math.floor(Math.random() * 10) + 15);
  }, []);
  
  React.useEffect(() => {
    const calculateVisits = () => {
      if (!fromDate || !toDate) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        setSelectedRangeAiVisits(8); // Default to yesterday's hardcoded value
        setSelectedRangeQuestions(30);
        return;
      }
      
      const duration = differenceInDays(toDate, fromDate) + 1;
      const aiVisits = duration * (Math.floor(Math.random() * 3) + 2);
      const questions = duration * (Math.floor(Math.random() * 10) + 15);
      
      setSelectedRangeAiVisits(aiVisits);
      setSelectedRangeQuestions(questions);
    };
    
    if (typeof window !== 'undefined') {
        calculateVisits();
    }
  }, [fromDate, toDate]);
  
  const getRangeTitle = (baseTitle: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (fromDate && toDate) {
        const fromDateStart = new Date(fromDate);
        fromDateStart.setHours(0,0,0,0);
        if (differenceInDays(toDate, fromDate) === 0 && fromDateStart.getTime() === today.getTime()) {
            return `Today's ${baseTitle}`;
        }
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0,0,0,0);
        if(differenceInDays(toDate, fromDate) === 0 && fromDateStart.getTime() === yesterday.getTime()) {
            return `Yesterday's ${baseTitle}`;
        }
        if (differenceInDays(toDate, fromDate) === 0) {
            return `${baseTitle} on ${format(fromDate, 'LLL dd')}`;
        }
        return `${baseTitle} in Range`;
    }
    return `Yesterday's ${baseTitle}`; // Default title
  }
  
  const getRangeDescription = (entity: string, singular: string, plural: string) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (fromDate && toDate) {
           const fromDateStart = new Date(fromDate);
           fromDateStart.setHours(0,0,0,0);
           if (differenceInDays(toDate, fromDate) === 0 && fromDateStart.getTime() === today.getTime()) {
              return `Total ${plural} for today.`;
           }
           const yesterday = new Date();
           yesterday.setDate(yesterday.getDate() - 1);
           yesterday.setHours(0,0,0,0);
            if(differenceInDays(toDate, fromDate) === 0 && fromDateStart.getTime() === yesterday.getTime()) {
                return `Total ${plural} for yesterday.`;
            }
           if (differenceInDays(toDate, fromDate) === 0) {
              return `Total ${plural} for ${format(fromDate, 'LLL dd, y')}.`;
           }
           return `Total ${plural} from ${format(fromDate, 'LLL dd')} to ${format(toDate, 'LLL dd')}.`;
      }
       return `Total ${plural} for yesterday.`; // Default description
  }

  const handleAiVisitClick = () => {
    navigate('/dashboard/ai-visits');
  }

  const handleAllQuestionsClick = () => {
    navigate('/dashboard/all-questions');
  }


  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col gap-8 p-4 md:p-8">
        <div className="flex items-center justify-end">
          <DateFilter
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        </div>
        
        <div className="space-y-6">
          {/* Patient Visit in AI Section */}
          <div>
            <h2 className="text-xl font-bold p-3 rounded-t-lg bg-sky-200 text-sky-800">1. Patient Visit in AI</h2>
             <div className="grid gap-4 md:grid-cols-2 p-4 border border-t-0 rounded-b-lg border-sky-200">
                <Card onClick={handleAiVisitClick} className="cursor-pointer bg-sky-50 hover:bg-sky-100 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-sky-800">
                      Today's Patients in AI
                    </CardTitle>
                    <Users className="h-4 w-4 text-sky-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-sky-900">{todayAiVisits}</div>
                    <p className="text-xs text-sky-600">
                     Total AI patient visits for today. Click to view details.
                    </p>
                  </CardContent>
                </Card>
                <Card onClick={handleAiVisitClick} className="cursor-pointer bg-sky-50 hover:bg-sky-100 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-sky-800">
                       {getRangeTitle('Patients in AI')}
                    </CardTitle>
                    <Users className="h-4 w-4 text-sky-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-sky-900">{selectedRangeAiVisits}</div>
                    <p className="text-xs text-sky-600">
                      {getRangeDescription('visit', 'AI patient visit', 'AI patient visits')}. Click to view details.
                    </p>
                  </CardContent>
                </Card>
            </div>
          </div>
          
           {showDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Patient Visits in AI</CardTitle>
                <CardDescription>A list of patients who have interacted with the AI.</CardDescription>
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
                    {patients.slice(0, 5).map((patient, index) => (
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

          {/* Total Patient Question Section */}
           <div>
            <h2 className="text-xl font-bold p-3 rounded-t-lg bg-green-200 text-green-800">2. Total Patient Question</h2>
            <div className="grid gap-4 md:grid-cols-2 p-4 border border-t-0 rounded-b-lg border-green-200">
               <Card onClick={handleAllQuestionsClick} className="cursor-pointer bg-green-50 hover:bg-green-100 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-800">
                     Today's Questions in AI
                  </CardTitle>
                  <MessageSquareQuote className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900">{todayQuestions}</div>
                   <p className="text-xs text-green-600">Total questions asked today. Click to view details.</p>
                </CardContent>
              </Card>
               <Card onClick={handleAllQuestionsClick} className="cursor-pointer bg-green-50 hover:bg-green-100 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-800">
                    {getRangeTitle('Questions in AI')}
                  </CardTitle>
                  <MessageSquareQuote className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900">{selectedRangeQuestions}</div>
                   <p className="text-xs text-green-600">{getRangeDescription('question', 'question asked', 'questions asked')}. Click to view details.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
    

    

    
