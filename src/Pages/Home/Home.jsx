import CallToAction from "../../Components/CallToAction/CallToAction";
import HeroSection from "../../Components/HeroSection/HeroSection";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import RestaurentsSlider from "../../Components/RestaurentsSlider/RestaurentsSlider";
import { motion } from "framer-motion";
import TagCloud from "../../Components/TagCloud/TagCloud";
import Newsletter from "../../Components/Newsletter/Newsletter";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <HeroSection />
      <HowItWorks />
      <RestaurentsSlider />
      <TagCloud />
      <CallToAction />
      <Newsletter />
    </motion.div>
  );
};

export default Home;
