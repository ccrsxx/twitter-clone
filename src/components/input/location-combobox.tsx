import { useState } from 'react';
import { Combobox } from '@headlessui/react';

const locations = [
  'Tokyo, Japan',
  'New York, USA',
  'Beijing, China',
  'Seoul, Korea',
  'Toronto, Canada',
  'Edinburgh of the Seven Seas, Saint Helena, Ascension, and Tristan da Cunha'
];

type LocationComboboxProps = {
  defaultLocation: string;
  handleLocationChange: (location: string) => void;
};

export function LocationCombobox({
  defaultLocation,
  handleLocationChange
}: LocationComboboxProps) {
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  const [query, setQuery] = useState('');

  const filteredLocations =
    query === ''
      ? locations
      : locations.filter((location) => {
          return location.toLowerCase().includes(query.toLowerCase());
        });

  const handleSelect = (selectedValue: string) => {
    setSelectedLocation(selectedValue);
    handleLocationChange(selectedValue);
  };

  return (
    <div className='flex flex-col gap-1'>
      <Combobox
        value={selectedLocation}
        onChange={handleSelect}
        name='location'
      >
        <Combobox.Input
          className='w-full rounded-md border border-gray-300 bg-inherit px-3 py-2
        text-light-primary outline-none dark:text-dark-primary'
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search locations'
        />
        <Combobox.Options className='max-h-36 overflow-y-auto rounded-md'>
          {filteredLocations.map((location) => (
            <Combobox.Option
              key={location}
              value={location}
              className='cursor-pointer p-2 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
            >
              {location}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
