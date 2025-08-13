
'use client';

import * as React from 'react';
import { Hospital, LogOut, CreditCard, History } from 'lucide-react';
import { useRouter } from 'next/navigation';
import "../../App.css"
import { Button } from '../../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog';
import { AddCreditDialog } from './AddCreditDialog';
import {Link, useNavigate} from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const [isCreditDialogOpen, setCreditDialogOpen] = React.useState(false);
  const [creditBalance, setCreditBalance] = React.useState(150); // Mock balance

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      <header className="flex h-24 items-center justify-between border-b bg-primary/10 px-4 sm:px-6 relative">
        <div className="flex flex-1 items-center gap-4">
          <div className="bg-primary/20 text-primary p-3 rounded-xl">
            <Hospital className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">Karen Hospital</h1>
            <h2 className="text-md font-semibold text-muted-foreground -mt-1">AI Dashboard</h2>
          </div>
        </div>
        
        <div className="flex flex-1 justify-center items-center">
           <div className="text-xl font-bold text-green-600">
            Credit: <span className="font-bold">{creditBalance}</span>
          </div>
        </div>

        <div className="flex flex-1 justify-end items-center gap-2">
           <Button variant="outline" onClick={() => setCreditDialogOpen(true)}>
              <CreditCard className="h-4 w-4 mr-2" />
              Add Credit
            </Button>
            <Button asChild variant="outline">
              <a href="/dashboard/credit-history">
                <History className="h-4 w-4 mr-2" />
                Credit History
              </a>
            </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" aria-label="Logout">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will be returned to the login page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>
      <AddCreditDialog 
        open={isCreditDialogOpen} 
        onOpenChange={setCreditDialogOpen}
        onRecharge={(amount) => setCreditBalance(prev => prev + amount)}
      />
    </>
  );
}
