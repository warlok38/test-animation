import * as motion from "motion/react-client";

const box = {
  width: 100,
  height: 100,
  backgroundColor: "#9911ff",
  borderRadius: 5,
};

export const MotionBox = () => {
  return (
    <motion.div
      style={box}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{ rotate: 360 }}
    />
  );
};
