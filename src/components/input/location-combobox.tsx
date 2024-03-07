import { useState } from 'react';
import { Combobox } from '@headlessui/react';

const locations = [
  'Tokyo, Japan',
  'New York, USA',
  'Beijing, China',
  'Seoul, Korea',
  'Toronto, Canada'
];

type LocationComboboxProps = {
  handleLocationChange: (location: string) => void;
};

export function LocationCombobox({
  handleLocationChange
}: LocationComboboxProps) {
  const [selectedLocation, setSelectedLocation] = useState('');
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
    <Combobox value={selectedLocation} onChange={handleSelect} name='location'>
      <Combobox.Input onChange={(e) => setQuery(e.target.value)} />
      <Combobox.Options>
        {filteredLocations.map((location) => (
          <Combobox.Option key={location} value={location}>
            {location}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
