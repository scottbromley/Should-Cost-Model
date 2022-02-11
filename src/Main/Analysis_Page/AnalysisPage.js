import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

function AnalysisPage() {
  const [divToggle, setDivToggle] = useState(false);

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.3,
      },
    },
  }
  
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  }
  

  return (
    <div
      style={{
        with: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <buton
        style={{
          border: "1px solid white",
          backgroundColor: "orange",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          justifyConent: "center",
          alignItems: "center",
        }}
        onClick={() => setDivToggle(!divToggle)}
      >
        Click me!
      </buton>
      <br />
      

      <AnimatePresence>
        {divToggle && (
          <motion.ul initial="hidden" animate="visible" variants={list}>
            <motion.li variants={item} >Item 1</motion.li>
            <motion.li variants={item} >Item 2</motion.li>
            <motion.li variants={item} >Item 3</motion.li>
            <motion.li variants={item} >Item 4</motion.li>
            <motion.li variants={item} >Item 5</motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AnalysisPage;

// <div
// style={{
//   color: "grey",
//   width: "100%",
//   height: "100%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   flexDirection: "column"
// }}
// >
// <h1>Coming Soon!</h1>
// <p>This is the space where further analysis of the models can be conducted. The output of all of the models can be computed and information about which recipes have the most potential for cost saving can be viewed here.</p>
// <p>The entire database of recipes and ingredients can be viewed in one place and compared against each other.</p>
// <p>There can also be functionality to aggregate by category: grouped by supplier, material type, lead buyer etc..</p>
// </div>
