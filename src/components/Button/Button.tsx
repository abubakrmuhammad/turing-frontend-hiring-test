type ButtonProps = {
  label: string;
};

function Button({ label }: ButtonProps) {
  return (
    <button className="inline-block bg-primary text-white px-4 py-3 text-base font-medium min-w-[110px]">
      {label}
    </button>
  );
}

export default Button;
