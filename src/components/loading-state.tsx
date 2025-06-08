import { Loader2Icon } from 'lucide-react';

interface Props {
  title: string;
  description: string;
}

export const LoadingState = ({ title, description }: Props) => {
  return (
    <div className={'px-8 py-4 justify-center flex flex-1 items-center'}>
      <div className="flex flex-col items-center p-10 shadown-sm gap-y-6y bg-background rounded-lg justify-center">
        <Loader2Icon className="size-6 animate-spin text-primary" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className={'text-lg font-medium'}>{title}</h6>
          <p className={'text-sm'}>{description}</p>
        </div>
      </div>
    </div>
  );
};
