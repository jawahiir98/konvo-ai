import { ResponsiveDialog } from '@/components/responsive-dialog';
import { MeetingsForm } from '@/app/modules/meetings/ui/components/meeting-form';
import { MeetingGetOne } from '@/app/modules/meetings/types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}
export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: Props) => {
  const onSuccess = () => {
    onOpenChange(false);
  };
  const onError = () => {
    onOpenChange(false);
  };
  return (
    <ResponsiveDialog
      title={'Edit Meeting'}
      description={'Edit the meeting details'}
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingsForm
        initialValues={initialValues}
        onSuccess={onSuccess}
        onCancel={onError}
      />
    </ResponsiveDialog>
  );
};
