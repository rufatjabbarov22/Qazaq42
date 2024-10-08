import React from 'react';
import Section1 from '../components/Section1/Section1';
import DeviceSection from './DeviceSection/DeviceSection';
import TeamSection from '../components/TeamSection/TeamSection';
import SliderSection from '../components/SliderSection/SliderSection';
import Section2 from '../components/Section2/Section2';


const HomePage = () => {
  return (
    <div>
      <Section1 />
      <Section2 />
      <DeviceSection />
      <SliderSection />
      <TeamSection />
    </div>
  
  );
};

export default HomePage;