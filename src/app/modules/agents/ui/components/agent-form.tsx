import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { AgentGetOne } from '../../types';
import { z } from 'zod';
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { agentsInsertSchema } from '@/app/modules/agents/server/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlaceholderAvatar } from '@/components/placeholder-avatar';

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export const AgentsForm = ({ onSuccess, onCancel, initialValues }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {},
      onError: () => {},
    })
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      instructions: initialValues?.instructions ?? '',
    },
  });

  const isEdit = !!initialValues;
  const isPending = createAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      console.log('TODO: update agent');
    } else {
      createAgent.mutate(values);
    }
  };
  return (
    <Form {...form}>
      <form className={'space-y-4'} onSubmit={form.handleSubmit(onSubmit)}>
        <PlaceholderAvatar
          seed={form.watch('name')}
          variant={'botttsNeutral'}
          className={'size-16 border'}
        />
        <FormField
          name={'name'}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder={'e.g Math tutor'} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name={'instructions'}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={
                    'You are a helpful math assistant that can asnwer questions and help with assignments.'
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className={'flex justify-between gap-x-2'}>
          {onCancel && (
            <Button
              onClick={onCancel}
              variant={'ghost'}
              disabled={isPending}
              type={'button'}
            >
              Cancel
            </Button>
          )}
          <Button type={'submit'} disabled={isPending}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
