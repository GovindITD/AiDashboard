
'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import * as React from 'react';
import { PaymentConfirmationDialog } from './PaymentConfirmationDialog';

const addCreditSchema = z.object({
  amount: z.coerce.number().min(1, 'Amount must be at least 1.'),
  paymentMethod: z.enum(['card', 'upi'], {
    required_error: 'You need to select a payment method.',
  }),
});

type AddCreditFormValues = z.infer<typeof addCreditSchema>;

interface AddCreditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRecharge: (amount: number) => void;
}

export function AddCreditDialog({ open, onOpenChange, onRecharge }: AddCreditDialogProps) {
  const [isPaymentDialogOpen, setPaymentDialogOpen] = React.useState(false);
  const [rechargeAmount, setRechargeAmount] = React.useState(0);

  const form = useForm<AddCreditFormValues>({
    resolver: zodResolver(addCreditSchema),
    defaultValues: {
      amount: 100,
    },
  });
  
  const watchedAmount = useWatch({
    control: form.control,
    name: 'amount',
  });

  function onSubmit(data: AddCreditFormValues) {
    setRechargeAmount(data.amount);
    setPaymentDialogOpen(true);
    onOpenChange(false);
  }
  
  React.useEffect(() => {
    if (!open) {
      form.reset({amount: 100});
    }
  }, [open, form]);

  const handlePaymentConfirm = () => {
      onRecharge(rechargeAmount);
      setPaymentDialogOpen(false);
      form.reset();
  }

  const handlePaymentBack = () => {
    setPaymentDialogOpen(false);
    onOpenChange(true);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Credits</DialogTitle>
            <DialogDescription>
              Recharge your account to continue using AI services.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center text-sm font-semibold text-primary">
              Using AI services: 1 Rs = 2 Credits
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter amount" {...field} />
                    </FormControl>
                    {watchedAmount > 0 && (
                      <FormDescription>
                        You will get {watchedAmount * 2} credits.
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="card" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Credit/Debit Card
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="upi" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            UPI
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <div className="w-full text-center">
                  <Button type="submit" className="w-full">
                      Recharge Now
                  </Button>
                  <p className="text-xs text-red-600 mt-2">
                      GST and convenience fee will not be included in these amount.
                  </p>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <PaymentConfirmationDialog
        open={isPaymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        amount={rechargeAmount}
        onConfirm={handlePaymentConfirm}
        onBack={handlePaymentBack}
      />
    </>
  );
}
