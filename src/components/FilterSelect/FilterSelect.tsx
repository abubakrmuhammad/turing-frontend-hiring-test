import React from 'react';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useFontElRef } from '@/context/FontElProvider';
import { FilterBy } from '@/types';

const options = ['all', 'archived', 'unarchived'] as const;

type FilterSelectProps = {
  label?: string;
  value?: FilterBy;
  onValueChange?: (value: FilterBy) => void;
};

const FilterSelect = ({
  label = 'Filter by:',

  value,
  onValueChange,
}: FilterSelectProps) => {
  const fontElRef = useFontElRef();

  return (
    <div className="flex items-center gap-2">
      <label className="text-[14px] leading-[17px]">{label}</label>
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger className="inline-flex items-center justify-center rounded px-2 text-[14px] font-medium leading-none h-[35px] gap-[5px] text-primary outline-none capitalize">
          <Select.Value placeholder="Status" />
          <Select.Icon className="text-[#575962]">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal container={fontElRef.current}>
          <Select.Content
            position="popper"
            className="overflow-hidden bg-white rounded-[3px] shadow-[0px_1px_12px_0px_rgba(0,_0,_0,_0.08)] min-w-[200px]"
            data-state="open"
          >
            <Select.Viewport className="px-2 py-4">
              <Select.Group>
                {options.map(option => (
                  <SelectItem
                    key={option}
                    value={option}
                    selected={option === value}
                  >
                    {option}
                  </SelectItem>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

type SelectItemProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
  selected?: boolean;
};

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, selected, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={clsx(
          `text-[#232323] text-[13px] leading-none rounded-[3px] flex items-center h-[40px] px-4 relative hover:text-white hover:bg-primary cursor-pointer outline-none capitalize`,
          className,
          {
            'bg-[RGBA(78,69,246,0.22)] text-primary': selected,
          }
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  }
);

SelectItem.displayName = 'SelectItem';

export default FilterSelect;
