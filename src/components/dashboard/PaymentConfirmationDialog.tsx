
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { useToast } from '../../hooks/use-toast';
import { Separator } from '../../components/ui/separator';
// import Image from 'next/image';

const paymentSchema = z.object({
  upiId: z.string().optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  onConfirm: () => void;
  onBack: () => void;
}

const GST_RATE = 0.18; // 18%
const CONVENIENCE_FEE = 10; // Rs. 10

export function PaymentConfirmationDialog({ open, onOpenChange, amount, onConfirm, onBack }: PaymentConfirmationDialogProps) {
  const { toast } = useToast();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
  });

  const gstAmount = amount * GST_RATE;
  const totalAmount = amount + gstAmount + CONVENIENCE_FEE;

  function onSubmit(data: PaymentFormValues) {
    console.log('Payment initiated with UPI ID:', data.upiId);
    onConfirm();
    toast({
      title: 'Recharge Successful',
      description: `Added ${amount * 2} credits to your account.`,
    });
    onOpenChange(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogDescription>
            Review the details and complete your payment.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
            <div className="space-y-2 rounded-md border p-4">
                 <div className="flex justify-between">
                    <span>Recharge Amount:</span>
                    <span className="font-medium">₹{amount.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span className="font-medium">₹{gstAmount.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                    <span>Convenience Fee:</span>
                    <span className="font-medium">₹{CONVENIENCE_FEE.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total Payable:</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4">
                <img 
                    src="https://placehold.co/200x200.png"
                    alt="QR Code" 
                    width={200}
                    height={200}
                    data-ai-hint="qr code"
                    className="rounded-md"
                />
                 <p className="text-sm text-muted-foreground">Scan QR or enter UPI ID</p>
            </div>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="upiId"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>UPI ID</FormLabel>
                    <FormControl>
                        <Input placeholder="yourname@bank" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <DialogFooter className="gap-2 sm:justify-between">
                    <Button type="button" variant="outline" onClick={onBack}>
                        Back
                    </Button>
                    <Button type="submit" className="flex-1">
                        Pay ₹{totalAmount.toFixed(2)} Now
                    </Button>
                </DialogFooter>
            </form>
            </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
