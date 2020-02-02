import { useEffect, useState } from 'react';
import axios from 'axios';

const useApi = (filters, setFilters, url) => {
    const [poi, setPoi] = useState([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const poi = await axios(process.env.REACT_APP_API_URL + `poi`);
            setPoi(poi.data);
            setPending(false);
        };
        fetchData();
    }, []);

    return [poi, pending];
}

export default useApi;