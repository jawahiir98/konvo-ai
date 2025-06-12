import { ResponsiveDialog } from '@/components/responsive-dialog';
import { AgentsForm } from '@/app/modules/agents/ui/components/agent-form';
import { AgentGetOne } from '@/app/modules/agents/types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}
export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
}: Props) => {
  return (
    <ResponsiveDialog
      title={'Edit Agent'}
      description={'Edit the agent details'}
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
        initialValues={initialValues}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
