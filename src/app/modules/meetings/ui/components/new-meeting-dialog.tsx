import { ResponsiveDialog } from '@/components/responsive-dialog';
import { MeetingsForm } from '@/app/modules/meetings/ui/components/meeting-form';
import { useRouter } from 'next/navigation';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const NewMeetingsDialog = ({ open, onOpenChange }: Props) => {
  const router = useRouter();
  const onSuccess = (id: string) => {
    onOpenChange(false);
    router.push(`/meetings/${id}`);
  };
  const onError = () => {
    onOpenChange(false);
  };
  return (
    <ResponsiveDialog
      title={'New Meetings'}
      description={'Create a new Meeting'}
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingsForm
        onSuccess={(id: string) => onSuccess(id)}
        onCancel={onError}
      />
    </ResponsiveDialog>
  );
};
