import React from 'react';
import { Title, Description } from './StyledComponents';

const Section = ({ title, description, children,}) => (
  <>
    <Title>{title}</Title>
    <Description>{description}</Description>
    {children}
  </>
);

export default Section;
