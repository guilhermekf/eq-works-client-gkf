import React from 'react';
import Section from '../components/Section';
import messages from '../constants/message';
import useApi from '../hooks/useApi';
import ResponsiveAreaChart from './responsiveAreaChart'
import useFilters from '../hooks/useFilters';
import { Select } from '../components/StyledComponents';

const Chart = () => {
    const [filters, setFilters] = useFilters();
    const {title, description } = messages.chart;
    const [data] = useApi(filters, '');

    return (
      <Section title={title} description={description} >
        Filter: 
        <Select onChange={(e) => { setFilters({...filters, ...{frequency: e.target.value, data: '', location: ''}}) }}>
            <option value='hourly'>Hourly</option>
            <option value='daily'>Daily</option>
        </Select>
        <ResponsiveAreaChart
            title={'Clicks'}
            height={150}
            data={data}
            axisKey={'fullDate'}
            areaKey={'clicks'}
            color={'#82ca9d'}
            tooltipFormatter={(value) => parseInt(value).toLocaleString('en-ca')}
        />
        <ResponsiveAreaChart
            title={'Revenue'}
            height={150}
            data={data}
            axisKey={'fullDate'}
            areaKey={'revenue'}
            color={'#ffc658'}
            tooltipFormatter={(value) => parseInt(value).toLocaleString('en-ca')}
        />
        <ResponsiveAreaChart
            title={'Impressions'}
            height={150}
            data={data}
            axisKey={'fullDate'}
            areaKey={'impressions'}
            color={'#8884d8'}
            tooltipFormatter={(value) => parseInt(value).toLocaleString('en-ca')}
        />
        <ResponsiveAreaChart
            title={'Events'}
            height={150}
            data={data}
            axisKey={'fullDate'}
            areaKey={'events'}
            color={'#8844d8'}
            tooltipFormatter={(value) => parseInt(value).toLocaleString('en-ca')}
        />
      </Section>
    );
};

export default Chart;
