import { createAvatar } from '@dicebear/core';
import { initials, botttsNeutral } from '@dicebear/collection';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Props {
  seed: string;
  className?: string;
  variant: 'botttsNeutral' | 'initials';
}

export const PlaceholderAvatar = ({ seed, className, variant }: Props) => {
  let avatar;
  if (variant === 'botttsNeutral') {
    avatar = createAvatar(botttsNeutral, { seed });
  } else {
    avatar = createAvatar(initials, { seed, fontWeight: 500, fontSize: 42 });
  }
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt={'avatar'} />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
