import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { ChevronDown, LogOutIcon, CreditCardIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { PlaceholderAvatar } from '@/components/placeholder-avatar';
export const DashboardUserButton = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  if (isPending || !data?.user) {
    return null;
  }
  const onSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push('/sign-in'),
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-lg border border-border/10 p-3 w-full flex
        items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden"
      >
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <PlaceholderAvatar
            seed={data.user.name}
            variant={'initials'}
            className={'size-9 mr-3'}
          />
        )}
        <div
          className={
            'flex flex-col gap-0.5 min-w-0 overflow-hidden flex-1 text-left'
          }
        >
          <p className={'w-full truncate text-sm'}>{data.user.name}</p>
          <p className={'w-full truncate text-xs'}>{data.user.email}</p>
        </div>
        <ChevronDown className={'size-4 shrink-0'} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'} side={'right'} className={'w-72'}>
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="font-normal truncate text-muted-foreground">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={'cursor-pointer flex items-center justify-between'}
        >
          Billing <CreditCardIcon className={'size-4'} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onSignOut}
          className={'cursor-pointer flex items-center justify-between'}
        >
          Logout <LogOutIcon className={'size-4'} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
