import { Call } from '@/types';
import clsx from 'clsx';

const labelMap = {
  missed: 'Missed',
  answered: 'Answered',
  voicemail: 'Voice Mail',
} as const;

const colorMap = {
  missed: '#C91D3E',
  answered: '#1DC9B7',
  voicemail: '#325AE7',
};

function CallType({ type }: { type?: Call['call_type'] }) {
  if (!type) return type;

  return (
    <span
      className={clsx(``)}
      style={{
        color: colorMap[type],
      }}
    >
      {labelMap[type]}
    </span>
  );
}

export default CallType;
