'use client';

import { StreamTheme, useCall } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import { CallLobby } from '@/app/modules/call/ui/components/call-lobby';

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
    await call.leave();
    setShow('lobby');
  };

  return (
    <StreamTheme className={'h-full'}>
      {show === 'lobby' && <CallLobby onJoin={onJoin} />}
      {show === 'call' && <p>Call</p>}
      {show === 'ended' && <p>Ended</p>}
    </StreamTheme>
  );
};
