import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTRPC } from '@/trpc/client';
import { MeetingGetOne } from '../../types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CommandSelect } from '@/app/modules/meetings/ui/components/command-select';
import { PlaceholderAvatar } from '@/components/placeholder-avatar';
import { meetingsInsertSchema } from '@/app/modules/meetings/server/schema';
import { NewAgentDialog } from '@/app/modules/agents/ui/components/new-agent-dialog';

interface Props {
  onSuccess?: (id: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingsForm = ({ onSuccess, onCancel, initialValues }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [agentSearch, setAgentSearch] = useState<string>('');
  const [isOpenAgentDialog, setIsOpenAgentDialog] = useState<boolean>(false);

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );
  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        // TODO: Invalidate free tier usage
        if (typeof onSuccess === 'function') {
          onSuccess(data.id);
        }
      },
      onError: (error) => {
        toast.error(error.message || 'Something went wrong');
        // TODO: Check error code = FORBIDDEN ?
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        if (typeof onSuccess === 'function') {
          onSuccess(data.id);
        }
      },
      onError: (error) => {
        toast.error(error.message || 'Something went wrong');
      },
    })
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      agentId: initialValues?.agentId ?? '',
    },
  });

  const isEdit = !!initialValues;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };
  return (
    <>
      <Form {...form}>
        <form className={'space-y-4'} onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name={'name'}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={'e.g Daily Meeting'} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name={'agentId'}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={
                      agents?.data?.items.map((agent) => ({
                        id: agent.id,
                        value: agent.id,
                        children: (
                          <div className={'flex items-center gap-x-2'}>
                            <PlaceholderAvatar
                              seed={agent.name}
                              variant={'botttsNeutral'}
                              className={'border size-6'}
                            />
                            <span>{agent.name}</span>
                          </div>
                        ),
                      })) ?? []
                    }
                    onSelect={field.onChange}
                    value={field.value}
                    onSearch={setAgentSearch}
                    placeholder={'Select an Agent'}
                  />
                </FormControl>
                <FormDescription className={'w-full justify-center flex'}>
                  Not finding what you are looking for ?&nbsp;
                  <button
                    onClick={() => setIsOpenAgentDialog(true)}
                    type={'button'}
                    className={'text-primary hover:underline'}
                  >
                    Create new agent
                  </button>
                </FormDescription>
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
      <NewAgentDialog
        open={isOpenAgentDialog}
        onOpenChange={setIsOpenAgentDialog}
      />
    </>
  );
};
