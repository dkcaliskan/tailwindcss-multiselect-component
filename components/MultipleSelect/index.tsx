import React, { FunctionComponent, useEffect, useState } from 'react';

import { IoCloseSharp } from 'react-icons/io5';
import { BsSearch, BsCheck } from 'react-icons/bs';

type OptionSchema = {
  id: string;
  label: string;
  value: string;
};

type MultipleSelectSchema = {
  id: string;
  label: string;
  selectionLabel: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  options: OptionSchema[];
  selectedOptions: OptionSchema[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<OptionSchema[]>>;
};

const MultipleSelect: FunctionComponent<MultipleSelectSchema> = ({
  id,
  label,
  searchLabel,
  selectionLabel,
  searchPlaceholder,
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (search.length > 0) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [search]);

  const removeHandler = (option: OptionSchema) => {
    setSelectedOptions((prev) =>
      prev.filter((selected) => selected.id !== option.id)
    );
  };

  const selectHandler = (option: OptionSchema) => {
    if (selectedOptions.some((selected) => selected.id === option.id)) {
      removeHandler(option);
    } else {
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor={id}>
          <span className='line-clamp-1 text-gray-300'>{label}</span>
        </label>

        <div
          id={id}
          className={`${
            isOpen && 'rounded-b-none border-b-none'
          } select bg-custom-black-950 text-gray-300 rounded-lg px-3 pr-9 py-2 w-full focus:outline-offset-0 border-[1px] border-custom-gray-800 line-clamp-1 ${
            selectedOptions.length > 0
              ? 'py-[8px] grid grid-cols-2 h-full gap-3 z-1'
              : 'pt-[9px]'
          }`}
          tabIndex={0}
          role='button'
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          aria-label={`Open ${label} options`}
        >
          {selectedOptions.length > 0
            ? selectedOptions.map((option, index) => (
                <button
                  tabIndex={0}
                  key={option.id || index}
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    removeHandler(option);
                  }}
                  className='flex items-center justify-between gap-x-1 px-2 rounded-md z-10 hover:bg-gray-300 hover:text-custom-black-900 border-[1px] border-gray-400'
                >
                  <span className='line-clamp-1'>{option.label}</span>
                  <IoCloseSharp size={16} />
                </button>
              ))
            : selectionLabel}
        </div>

        {isOpen && (
          <div className='border-x-[1px] border-b-[1px] border-custom-gray-800 bg-custom-black-950 text-gray-300 rounded-b-lg pt-2 pb-3'>
            <div className='relative px-1.5'>
              <label htmlFor='search' className=''>
                {searchLabel}
              </label>
              <input
                id='search'
                className='input bg-custom-black-950 text-gray-300 border-custom-gray-800 border-[1px] rounded-md w-full focus:outline-offset-0 text-lg'
                placeholder={searchPlaceholder || 'Search'}
                type='text'
                autoComplete='off'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search.length > 0 && (
                <button
                  type='button'
                  className='absolute top-[9px] right-[36px] text-gray-300'
                  onClick={() => setSearch('')}
                  aria-label='Clear search'
                >
                  <IoCloseSharp size={23} />
                </button>
              )}

              <div className='absolute top-[12px] right-[14px]'>
                <BsSearch size={18} className='text-gray-300' />
              </div>
            </div>

            <div className='overflow-y-auto px-1.5 pt-3'>
              <ul tabIndex={0} role='listbox'>
                {filteredOptions.map((option, index) => (
                  <li
                    key={option.id || index}
                    className='cursor-pointer py-1 rounded-md hover:bg-custom-gray-800 hove:text-gray-300'
                    onClick={() => selectHandler(option)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectHandler(option);
                      }
                    }}
                    role='options'
                  >
                    {selectedOptions.some(
                      (selected) => selected.id === option.id
                    ) ? (
                      <span className='flex items-center cursor-pointer'>
                        <BsCheck className='h-5 w-5' />
                        {option.label}
                      </span>
                    ) : (
                      <span className='pl-[20px] cursor-pointer'>
                        {option.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipleSelect;
