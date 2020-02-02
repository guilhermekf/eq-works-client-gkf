import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

const useApi = (filters, url) => {
    const [data, setData] = useState([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        const stats = await axios(process.env.REACT_APP_API_URL + `stats${url}/${filters.frequency}`);
        const events = await axios(process.env.REACT_APP_API_URL + `events${url}/${filters.frequency}`);
        let results = [];

        for(let i=0; i<stats.data.length; i++) {
            let newObj = {
                ...stats.data[i], 
                ...(events.data.find((x) => x.date === stats.data[i].date && x.hour === stats.data[i].hour && x.poi_id === stats.data[i].poi_id)),
                fullDate: formatDate(stats.data[i].date, stats.data[i].hour)
            }
            results.push(newObj);
        }
        setData(results);
        setPending(false);
      };
      fetchData();
    }, [filters.frequency, url]);

    const formatDate = (date, hour) => {
        var returndate = null;
        if(hour) {
            returndate = moment(date).add(hour, 'hour').utc().format('HH:mm DD-MM-YYYY');
        } else {
            returndate = moment(date).utc().format('DD-MM-YYYY');
        }
        return returndate;
    }

    return [data, pending];
}

export default useApi;