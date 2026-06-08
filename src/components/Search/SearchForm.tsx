// src/components/Search/SearchForm.tsx
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useSearchContext } from '../../context/SearchContext';
import type { SearchOptions } from '../../types.ts';

interface SearchFormProps {
    className?: string;
}

const todayInputValue = () => new Date().toISOString().split('T')[0];

const SearchForm: React.FC<SearchFormProps> = ({ className = '' }) => {
    const navigate = useNavigate();
    const { updateSearchParams } = useSearchContext();

    const [destination, setDestination] = useState<string>('');
    const [checkIn, setCheckIn] = useState<string>('');
    const [checkOut, setCheckOut] = useState<string>('');
    const [options, setOptions] = useState<SearchOptions>({ adults: 1, children: 0, rooms: 1 });
    const [error, setError] = useState<string | null>(null);

    const today = useMemo(todayInputValue, []);

    const updateOption = (key: keyof SearchOptions, value: string) => {
        setOptions((current) => ({
            ...current,
            [key]: Number(value),
        }));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const trimmedDestination = destination.trim();

        if (!trimmedDestination || !checkIn || !checkOut) {
            setError("Please select a destination and dates.");
            return;
        }

        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkInDate < todayDate) {
            setError("Check-in date cannot be in the past.");
            return;
        }
        if (checkOutDate <= checkInDate) {
            setError("Check-out date must be after check-in date.");
            return;
        }

        updateSearchParams({
            destination: trimmedDestination,
            checkInDate,
            checkOutDate,
            options
        });
        navigate('/Rooms/Search');
    };

    return (
        <form
            className={`space-y-3 ${className}`}
            onSubmit={handleSearch}
        >
            {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700" role="alert">
                    {error}
                </p>
            )}

            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-[minmax(180px,1.4fr)_minmax(140px,1fr)_minmax(140px,1fr)_minmax(120px,0.8fr)_auto]">
                <label className="block">
                    <span className="mb-1 block text-[11px] font-semibold text-[#0a1e3d]">
                        Destination
                    </span>
                    <input
                        type="text"
                        value={destination}
                        placeholder="City or hotel"
                        className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#d4a574] focus:ring-2 focus:ring-[#d4a574]/20"
                        onChange={(e) => setDestination(e.target.value)}
                        required
                    />
                </label>

                <label className="block">
                    <span className="mb-1 block text-[11px] font-semibold text-[#0a1e3d]">
                        Check-in
                    </span>
                    <input
                        type="date"
                        value={checkIn}
                        min={today}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#d4a574] focus:ring-2 focus:ring-[#d4a574]/20"
                        onChange={(e) => setCheckIn(e.target.value)}
                        required
                    />
                </label>

                <label className="block">
                    <span className="mb-1 block text-[11px] font-semibold text-[#0a1e3d]">
                        Check-out
                    </span>
                    <input
                        type="date"
                        value={checkOut}
                        min={checkIn || today}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#d4a574] focus:ring-2 focus:ring-[#d4a574]/20"
                        onChange={(e) => setCheckOut(e.target.value)}
                        required
                    />
                </label>

                <label className="block">
                    <span className="mb-1 block text-[11px] font-semibold text-[#0a1e3d]">
                        Guests
                    </span>
                    <select
                        className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#d4a574] focus:ring-2 focus:ring-[#d4a574]/20"
                        value={options.adults}
                        onChange={(e) => updateOption('adults', e.target.value)}
                    >
                        <option value={1}>1 Adult</option>
                        <option value={2}>2 Adults</option>
                        <option value={3}>3 Adults</option>
                        <option value={4}>4 Adults</option>
                    </select>
                </label>

                <button
                    type="submit"
                    className="mt-0 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#d4a574] px-4 text-sm font-semibold text-[#0a1e3d] shadow-sm transition hover:bg-[#c19563] focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:ring-offset-2 md:col-span-2 lg:col-span-1 lg:mt-5 lg:w-auto"
                >
                    <Search className="h-4 w-4" />
                    Search
                </button>
            </div>
        </form>
    );
};
export default SearchForm;
