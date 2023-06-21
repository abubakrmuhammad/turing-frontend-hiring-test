import React from 'react';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';

const FilterSelect = ({ label = 'Filter by:' }) => (
  <div className="flex items-center gap-2">
    <label className="text-[14px] leading-[17px]">{label}</label>
    <Select.Root>
      <Select.Trigger className="inline-flex items-center justify-center rounded px-2 text-[14px] font-medium leading-none h-[35px] gap-[5px] text-primary outline-none">
        <Select.Value placeholder="Status" />
        <Select.Icon className="text-[#575962]">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          className="overflow-hidden bg-white rounded-[3px] shadow-[0px_1px_12px_0px_rgba(0,_0,_0,_0.08)] min-w-[200px]"
          data-state="open"
        >
          <Select.Viewport className="px-2 py-4">
            <Select.Group>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  </div>
);

type SelectItemProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
};

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={clsx(
          `text-[#232323] text-[13px] leading-none rounded-[3px] flex items-center h-[40px] px-4 relative hover:text-primary hover:bg-[RGBA(78,69,246,0.22)] cursor-pointer outline-none font-sans transition`,
          className
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
