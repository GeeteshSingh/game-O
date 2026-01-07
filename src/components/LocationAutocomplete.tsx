"use client";

import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface LocationAutocompleteProps {
  onSelect: (address: string, coordinates: { lat: number; lng: number }) => void;
  placeholder?: string;
  defaultValue?: string;
}

const LocationAutocomplete = ({
  onSelect,
  placeholder = "Search for a location...",
  defaultValue = ""
}: LocationAutocompleteProps) => {
  const [address, setAddress] = useState(defaultValue);

  const handleSelect = async (address: string) => {
    setAddress(address);
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      onSelect(address, latLng);
    } catch (error) {
      console.error('Error selecting location:', error);
    }
  };

  return (
    <div className="relative">
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder,
                className: 'w-full',
              })}
            />
            <div className="absolute z-10 w-full mt-1">
              {loading && <div className="p-2">Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'bg-blue-50 cursor-pointer p-2 border-b'
                  : 'bg-white cursor-pointer p-2 border-b';
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { className })}
                    key={suggestion.placeId}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default LocationAutocomplete;