import { JSX, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/responsive-dialog';

export const useConfirm = (
  title: string,
  description: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);
  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };
  const onClose = () => {
    setPromise(null);
  };
  const onConfirm = () => {
    promise?.resolve(true);
    onClose();
  };
  const onCancel = () => {
    promise?.resolve(false);
    onClose();
  };
  const ConfirmationDialog = () => (
    <ResponsiveDialog
      title={title}
      description={description}
      open={promise !== null}
      onOpenChange={onClose}
    >
      <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
        <Button onClick={onCancel} className={'w-full lg:w-auto'}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          className={'w-full lg:w-auto bg-destructive hover:bg-red-800'}
        >
          Confirm
        </Button>
      </div>
    </ResponsiveDialog>
  );
  return [ConfirmationDialog, confirm];
};
