import { useState } from 'react';

const useFilters = () => {
    const [filters, setFilters] = useState({
        frequency: "hourly",
        highlight: '',
        location: '',
        date: ''
    });

    return [filters, setFilters];
}

export default useFilters;