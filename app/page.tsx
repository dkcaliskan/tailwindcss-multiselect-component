'use client';

import MultipleSelect from '@/components/MultipleSelect';
import { useState } from 'react';

type OptionSchema = {
  id: string;
  label: string;
  value: string;
};

export default function Home() {
  const [selectedOptions, setSelectedOptions] = useState<OptionSchema[]>([]);

  const options = [
    {
      id: '1',
      label: 'Option 1',
      value: 'option-1',
    },
    {
      id: '2',
      label: 'Option 2',
      value: 'option-2',
    },
    {
      id: '3',
      label: 'Option 3',
      value: 'option-3',
    },
    {
      id: '4',
      label: 'Option 4',
      value: 'option-4',
    },
    {
      id: '5',
      label: 'Option 5',
      value: 'option-5',
    },
  ];

  return (
    <main className='flex min-h-screen flex-col justify-between p-16'>
      <MultipleSelect
        selectionLabel='Select options'
        id='multiple-select'
        label='Multiple select'
        searchPlaceholder='Search options'
        options={options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </main>
  );
}
