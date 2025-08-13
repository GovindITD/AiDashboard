
'use client';

import * as React from 'react';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Calendar } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Label } from '../../components/ui/label';

interface DateFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  fromDate: Date | undefined;
  setFromDate: (date: Date | undefined) => void;
  toDate: Date | undefined;
  setToDate: (date: Date | undefined) => void;
}

export function DateFilter({ className, fromDate, setFromDate, toDate, setToDate }: DateFilterProps) {

  const handleDatePresetChange = (value: string) => {
    const now = new Date();
    switch (value) {
      case 'today':
        setFromDate(now);
        setToDate(now);
        break;
      case 'last7':
        setFromDate(addDays(now, -7));
        setToDate(now);
        break;
      case 'last15':
        setFromDate(addDays(now, -15));
        setToDate(now);
        break;
      case 'last30':
        setFromDate(addDays(now, -30));
        setToDate(now);
        break;
      default:
        setFromDate(undefined);
        setToDate(undefined);
    }
  };


  return (
    <div className={cn('flex items-center gap-4', className)}>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleDatePresetChange('today')}>Current Date</Button>
            <Button variant="outline" size="sm" onClick={() => handleDatePresetChange('last7')}>Last 7 Days</Button>
            <Button variant="outline" size="sm" onClick={() => handleDatePresetChange('last15')}>Last 15 Days</Button>
            <Button variant="outline" size="sm" onClick={() => handleDatePresetChange('last30')}>Last 30 Days</Button>
        </div>
       <div className="flex items-center gap-2">
         <Label htmlFor="from-date" className="text-sm font-medium">From</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="from-date"
              variant={'outline'}
              size="sm"
              className={cn('w-[180px] justify-start text-left font-normal', !fromDate && 'text-muted-foreground')}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fromDate ? (
                format(fromDate, 'LLL dd, y')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="single"
              selected={fromDate}
              onSelect={setFromDate}
              disabled={(date) =>
                (toDate && date > toDate) || date > new Date()
              }
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </div>

       <div className="flex items-center gap-2">
        <Label htmlFor="to-date" className="text-sm font-medium">To</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="to-date"
              variant={'outline'}
              size="sm"
              className={cn('w-[180px] justify-start text-left font-normal', !toDate && 'text-muted-foreground')}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {toDate ? (
                format(toDate, 'LLL dd, y')
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="single"
              selected={toDate}
              onSelect={setToDate}
               disabled={(date) =>
                (fromDate && date < fromDate) || date > new Date()
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
