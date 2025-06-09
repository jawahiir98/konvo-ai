import { ResponsiveDialog } from '@/components/responsive-dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const NewAgentDialog = ({ open, onOpenChange }: Props) => {
  return (
    <ResponsiveDialog
      title={'New Agent'}
      description={'Create a new agent'}
      open={open}
      onOpenChange={onOpenChange}
    >
      new agent form
    </ResponsiveDialog>
  );
};
