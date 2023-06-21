import clsx from 'clsx';

function StatusPill({
  archived,
  className,
  ...props
}: { archived: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'inline-block px-2 py-1 rounded-[2px] text-xs font-medium min-w-[66px',
        className,
        {
          'bg-[RGBA(114,114,114,0.12)] text-[#727272]': !archived,
          'bg-[RGBA(29,201,183,0.08)] text-[#1DC9B7]': archived,
        }
      )}
      {...props}
    >
      {archived ? 'Archived' : 'Unarchive'}
    </div>
  );
}

export default StatusPill;
