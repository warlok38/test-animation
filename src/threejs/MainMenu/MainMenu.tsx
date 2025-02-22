import { Button, Flex } from "antd";
import { motion } from "motion/react";

export const MainMenu = () => {
  return (
    <Flex align="center" justify="center" style={{ height: "100%" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Button>Начать</Button>
      </motion.div>
    </Flex>
  );
};
