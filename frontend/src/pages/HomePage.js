import React from 'react';
import Section1 from '../components/Section1/Section1';
import Section2 from '../components/Section2/Section2';  // Импортируем Section2
import DeviceSection from './DeviceSection/DeviceSection';
import TeamSection from '../components/TeamSection/TeamSection';
import SliderSection from '../components/SliderSection/SliderSection';

const HomePage = () => {
  return (
    <div>
      <Section1 />
      <Section2 /> {/* Добавляем Section2 после Section1 */}
      <DeviceSection />
      <SliderSection />
      <TeamSection />
    </div>
  );
};

export default HomePage;
