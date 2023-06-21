import clsx from 'clsx';

type InputProps = {
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ label, className, ...props }: InputProps) {
  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <label className="text-[14px] leading-[17px]">
        {props.required && <span className="text-red-500 mr-1">*</span>}
        <span>{label}</span>
      </label>
      <input
        className="border border-gray-400 rounded-sm px-4 py-3 text-[14px] leading-[17px] text-[#232323] outline-none"
        {...props}
      />
    </div>
  );
}

export default Input;
