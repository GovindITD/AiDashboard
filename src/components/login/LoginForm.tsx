
'use client';

import * as React from 'react';
// import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Stethoscope } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { useNavigate } from 'react-router-dom';


const loginSchema = z.object({
  mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile number must be 10 digits.'),
  otp: z.string().regex(/^[0-9]{6}$/, 'OTP must be a 6-digit number.').optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [otpSent, setOtpSent] = React.useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobile: '',
      otp: '',
    },
  });

  const handleSendOtp = () => {
    const mobile = form.getValues('mobile');
    if (!/^[0-9]{10}$/.test(mobile)) {
      form.setError('mobile', { type: 'manual', message: 'Please enter a valid 10-digit mobile number to receive an OTP.' });
      return;
    }
    // In a real app, trigger OTP sending API
    setOtpSent(true);
    toast({
      title: 'OTP Sent',
      description: `An OTP has been sent to ${mobile}.`,
    });
  };

  function onSubmit(data: LoginFormValues) {
    if (!otpSent || !data.otp) {
      form.setError("otp", { type: "manual", message: "Please enter the OTP you received." });
      return;
    }
    // In a real app, you would authenticate the user here.
    console.log(data);
    toast({
      title: 'Login Successful',
      description: 'Redirecting to your dashboard...',
    });
    navigate('/dashboard');
  }

  return (
    <>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
            <Stethoscope className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-primary">MediView AI Dashboard</CardTitle>
          <CardDescription>Welcome back! Please log in to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <div className="flex gap-2">
                       <FormControl>
                        <Input placeholder="Enter your 10-digit mobile number" {...field} disabled={otpSent} />
                      </FormControl>
                      <Button type="button" onClick={handleSendOtp} disabled={otpSent}>
                        {otpSent ? 'Sent' : 'Send OTP'}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {otpSent && (
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your 6-digit OTP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={!otpSent}>
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
