'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { OctagonAlert } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Password required.' }),
});

export const SignInView = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: (error) => {
          setError(error.error.message);
          setPending(false);
        },
      }
    );
  };
  const onGithubSignIn = () => {
    authClient.signIn.social({
      provider: 'github',
    });
  };
  const onGoogleSignIn = () => {
    authClient.signIn.social({
      provider: 'google',
    });
  };
  return (
    <div className={'flex flex-col gap-6'}>
      <Card className={'overflow-hidden p-0`'}>
        <CardContent className={'grid md:grid-cols-2 p-0'}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={'p-6 md:p-8'}
            >
              <div className="flex flex-col gap-8 w-full">
                <div className="flex flex-col items-center text-center">
                  <h1 className={'text-2xl font-bold'}>Welcome Back</h1>
                  <p className={'text-muted-foreground text-balance'}>
                    Login to your account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name={'email'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className={'bg-destructive/10 border-none w-full'}>
                    <OctagonAlert className="h-4 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button className="w-full" type="submit" disabled={pending}>
                  {pending ? 'Signing In...' : 'Sign In'}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span
                    className={
                      'bg-card font-medium text-muted-foreground relative z-10 px-2'
                    }
                  >
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={'outline'}
                    type={'button'}
                    className={'w-full'}
                    disabled={pending}
                    onClick={onGoogleSignIn}
                  >
                    <FaGoogle /> Google
                  </Button>
                  <Button
                    variant={'outline'}
                    type={'button'}
                    className={'w-full'}
                    disabled={pending}
                    onClick={onGithubSignIn}
                  >
                    <FaGithub /> Github
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don't have an account ?
                  <Link
                    href={'/sign-up'}
                    className={'underline font-medium underline-offset-4'}
                  >
                    {' '}
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div
            className={
              'bg-radial from-text-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center'
            }
          >
            <img
              src={'/logo.svg'}
              alt={'Logo'}
              className={'w-[92px] h-[92px]'}
            />
            <p className={'text-2xl font-semibold text-white'}>Konvo.AI</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{' '}
        <a href={'#'}>Terms of Service </a> and <a href={'#'}> Privacy </a>
      </div>
    </div>
  );
};
