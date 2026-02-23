import { useEffect, useMemo, useState } from 'react';
import { Combobox } from '@headlessui/react';
import locationsData from '../../../public/resource/worldcities.json';

const locations = locationsData.map((location) => location.location);

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
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredLocations = useMemo(() => {
    if (debouncedQuery === '') return [];
    const lowerCaseQuery = debouncedQuery.toLowerCase();
    return locations.filter((location) =>
      location.toLowerCase().startsWith(lowerCaseQuery)
    );
  }, [debouncedQuery]);

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
