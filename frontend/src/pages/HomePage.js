import React from 'react';
import Section1 from '../components/Section1/Section1';
import Section2 from '../components/Section2/Section2';  // Импортируем Section2
import DeviceSection from './DeviceSection/DeviceSection';
// import TeamSection from '../components/TeamSection/TeamSection';
import SliderSection from '../components/SliderSection/SliderSection';
import VideoSection from '../components/TeamSection/VideSection/VideoSection';
import StatisticsSection from './StatisticsSection';
import FAQSection from './FAQSection';

const HomePage = () => {
  return (
    <div>
      <Section1 />
      <Section2 />
      <StatisticsSection />
      <DeviceSection />
      <VideoSection />
      <SliderSection />
      <FAQSection />
      {/* <TeamSection /> */}
    </div>
  );
};

export default HomePage;
