import clsx from 'clsx';

type ButtonProps = {
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ label, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-block bg-primary text-white px-4 py-3 text-base font-medium min-w-[110px]',
        {
          'hover:bg-primary-dark': !props.disabled,
          'opacity-50 cursor-not-allowed': props.disabled,
        }
      )}
      {...props}
    >
      {label}
    </button>
  );
}

export default Button;
