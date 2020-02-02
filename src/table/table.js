import React, { useState, useMemo } from 'react';

import moment from 'moment';
import DataTable from 'react-data-table-component';
import { ClearButton, TextField, Select } from '../components/StyledComponents';

import Section from '../components/Section';
import messages from '../constants/message';
import useFilters from '../hooks/useFilters';
import usePoi from '../hooks/usePoi';
import useApi from '../hooks/useApi';

const Table = () => {
    const [poi] = usePoi();
    const [filters, setFilters] = useFilters();
    const [data, pending] = useApi(filters, '/poi');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const {title, description } = messages.table;

    const columns = [
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
            format: row => moment(row.date).utc().format('DD-MM-YYYY')
        },
        {
            name: 'Hour',
            selector: 'hour',
            sortable: true,
            format: row => moment(row.hour, 'HH').format('hh:mm A'),
            hide: filters.frequency === 'daily'? 999999 : 0
        },
        {
            name: 'Location',
            selector: 'location',
            sortable: true,
        },
        {
            name: 'Impressions',
            selector: 'impressions',
            sortable: true,
            format: row => parseInt(row.impressions).toLocaleString('en-ca')
        },
        {
            name: 'Clicks',
            selector: 'clicks',
            sortable: true,
            format: row => parseInt(row.clicks).toLocaleString('en-ca')
        },
        {
            name: 'Revenue',
            selector: 'revenue',
            sortable: true,
            format: row => parseInt(row.revenue).toLocaleString('en-ca', {style: 'currency', currency: 'CAD', minimumFractionDigits: 2})
        },
        {
            name: 'Events',
            selector: row => row.events || 0,
            sortable: true,
            format: row => parseInt(row.events || 0).toLocaleString('en-ca')
        },  
    ];

    const conditionalRowStyles = [
        {
          when: row => {
            var {date, hour, ...obj} = row; 
            return filters.highlight && Object.values(obj).find(x => x.toString().toLowerCase().includes(filters.highlight));
          },
          style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)',
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        }
    ];

    const filteredItems = data.filter(item => (!filters.location || (item.location && item.location === filters.location)) && 
                                              (!filters.date || (item.date && item.date === filters.date)));
    const filter = useMemo(() => {
        const handleClear = () => {
            if (filters.highlight) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilters({...filters, highlight: ''})
            }
        };

        const handleFrequency = (frequency) => {
            setFilters(prevState => { return {...prevState, frequency: frequency, date: '', location: ''}});
        }
    
        return (
            <>
                <Select onChange={(e) => { setFilters({...filters, date: e.target.value}) }}>
                    <option value=''>Select Date</option>;
                    {Array.from(new Set(data.map(item => item.date))).map((item, key) => {
                        return <option key={key} value={item}>{moment(item).utc().format('DD-MM-YYYY')}</option>;
                    })}
                </Select>
                <Select onChange={(e) => { setFilters({...filters, location: e.target.value}) }}>
                    <option value=''>Select Location</option>;
                    {poi.map((item, key) => {
                        return <option key={key} value={item.name}>{item.name}</option>;
                    })}
                </Select>
                <Select onChange={(e) => { handleFrequency(e.target.value) }}>
                    <option value='hourly'>Hourly</option>
                    <option value='daily'>Daily</option>
                </Select>
                <TextField id="search" type="text" placeholder="Highlight" value={filters.highlight} onChange={e => setFilters({...filters, highlight: e.target.value.toLowerCase()})} />
                <ClearButton onClick={handleClear}>X</ClearButton>
            </>
        )
      }, [filters, resetPaginationToggle, data, poi, setFilters]);
    

    return (
        <Section title={title} description={description} >
            <DataTable
                columns={columns}
                data={filteredItems}
                highlightOnHover
                responsive
                pagination //using client side because I didnt change the server to permit pagination
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={filter}
                conditionalRowStyles={conditionalRowStyles}
                progressPending={pending}
            />
        </Section>
    );
};

export default Table;
