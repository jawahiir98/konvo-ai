import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { ChevronDown, LogOutIcon, CreditCardIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerDescription,
} from '@/components/ui/drawer';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlaceholderAvatar } from '@/components/placeholder-avatar';

export const DashboardUserButton = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const isMobile = useIsMobile();

  const onSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push('/sign-in'),
      },
    });
  };

  if (isPending || !data?.user) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger
          className="rounded-lg border border-border/10 p-3 w-full flex space-x-2
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
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant={'outline'} onClick={() => {}}>
              Billing <CreditCardIcon className={'text-black size-4'} />
            </Button>
            <Button variant={'outline'} onClick={onSignOut}>
              Logout <LogOutIcon className={'text-black'} />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-lg border border-border/10 p-3 w-full flex space-x-2
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
