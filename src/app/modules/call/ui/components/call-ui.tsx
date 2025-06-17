'use client';

import { StreamTheme, useCall } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import { CallLobby } from '@/app/modules/call/ui/components/call-lobby';
import { CallActive } from '@/app/modules/call/ui/components/call-active';
import { CallEnded } from '@/app/modules/call/ui/components/call-ended';

interface Props {
  meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<'lobby' | 'call' | 'ended'>('lobby');

  const onJoin = async () => {
    if (!call) return;
    await call.join();
    setShow('call');
  };
  const onLeave = async () => {
    if (!call) return;
    await call.endCall();
    setShow('ended');
  };

  return (
    <StreamTheme className={'h-full'}>
      {show === 'lobby' && <CallLobby onJoin={onJoin} />}
      {show === 'call' && (
        <CallActive meetingName={meetingName} onLeave={onLeave} />
      )}
      {show === 'ended' && <CallEnded />}
    </StreamTheme>
  );
};
