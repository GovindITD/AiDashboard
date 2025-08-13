
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import {Link} from 'react-router-dom';
import { ArrowLeft, FileDown } from 'lucide-react';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { mockReminderLog } from '../../../lib/mock-data';

const mockCreditHistory = [
  { id: 1, date: new Date(2023, 10, 15), reference: 'PAY_REF_001', amount: 500, type: 'Credit', rate: 1, creditMsg: 500, balance: 500 },
  { id: 3, date: new Date(2023, 10, 18), reference: 'PAY_REF_003', amount: 100, type: 'Credit', rate: 1, creditMsg: 100, balance: 600 },
  { id: 6, date: new Date(2023, 10, 25), reference: 'PAY_REF_006', amount: 200, type: 'Credit', rate: 1, creditMsg: 200, balance: 800 },
];

export default function CreditHistoryPage() {
    const totalCreditAmount = mockCreditHistory.reduce((sum, item) => item.type === 'Credit' ? sum + item.amount : sum, 0);
    const totalCreditMsg = mockCreditHistory.reduce((sum, item) => sum + item.creditMsg, 0);

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
                            <CardTitle>Transaction History</CardTitle>
                            <CardDescription>A log of your credit and reminder transactions.</CardDescription>
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
                        <Tabs defaultValue="credit-history">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="credit-history">Credit History</TabsTrigger>
                                <TabsTrigger value="reminder-log">Reminder Log</TabsTrigger>
                            </TabsList>
                            <TabsContent value="credit-history">
                                 <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">S.N.</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Rerefence No</TableHead>
                                            <TableHead className="text-right">Credit (Rs)</TableHead>
                                            <TableHead className="text-right">Rate</TableHead>
                                            <TableHead className="text-right">Credit Msg</TableHead>
                                            <TableHead className="text-right">Balance</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockCreditHistory.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{format(item.date, 'PPP')}</TableCell>
                                            <TableCell className="font-medium">{item.reference}</TableCell>
                                            <TableCell className={`text-right ${item.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>{item.amount.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">{item.rate.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">{item.creditMsg}</TableCell>
                                            <TableCell className="text-right">{item.balance.toFixed(2)}</TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow className="font-bold">
                                            <TableCell colSpan={3} className="text-right font-bold">Total</TableCell>
                                            <TableCell className="text-right font-bold text-green-600">{totalCreditAmount.toFixed(2)}</TableCell>
                                            <TableCell className="text-right"></TableCell>
                                            <TableCell className="text-right font-bold">{totalCreditMsg}</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TabsContent>
                            <TabsContent value="reminder-log">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">S.N.</TableHead>
                                            <TableHead>Date time</TableHead>
                                            <TableHead>Message</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mockReminderLog.map((log, index) => (
                                            <TableRow key={log.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{format(log.date, 'PPP p')}</TableCell>
                                                <TableCell className="font-medium">{log.message}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
