import { ChangeEvent } from "react";

export function Select({
  value,
  onChange,
  options,
  label,
  isDisabled,
}: {
  value: string | number;
  label: string;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; name: string }[];
  isDisabled?: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-1">
      <label className="ml-1 text-xs text-gray-300" htmlFor={label}>
        {label}
      </label>
      <select
        disabled={isDisabled}
        className="min-w-[200px] cursor-pointer rounded-md bg-gray-700 p-2 transition ease-in hover:bg-gray-800 active:border-0 active:ring-0 disabled:pointer-events-none sm:min-w-full"
        id={label}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
