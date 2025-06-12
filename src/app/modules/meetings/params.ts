import { parseAsInteger, parseAsString, createLoader } from 'nuqs/server';
import { DEFAULT_PAGE } from '@/constants';
import { parseAsStringEnum } from 'nuqs';
import { MeetingStatus } from '@/app/modules/meetings/types';

export const filterSearchParams = {
  search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  status: parseAsStringEnum(Object.values(MeetingStatus)),
  agentId: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
};
export const loadSearchParams = createLoader(filterSearchParams);
