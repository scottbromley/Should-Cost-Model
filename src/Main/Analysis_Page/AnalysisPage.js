import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

function AnalysisPage() {
  const [divToggle, setDivToggle] = useState(false);

  return (
    <div
      style={{
        with: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "50%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      <div
style={{
  color: "grey",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
}}
>
<h1>Coming Soon!</h1>
<p>This is the space where further analysis of the models can be conducted. The output of all of the models can be computed and information about which recipes have the most potential for cost saving can be viewed here.</p>
<p>The entire database of recipes and ingredients can be viewed in one place and compared against each other.</p>
<p>There can also be functionality to aggregate by category: grouped by supplier, material type, lead buyer etc..</p>
</div>

        {/* <motion.buton
          style={{
            border: "1px solid white",
            backgroundColor: "orange",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            justifyConent: "center",
            alignItems: "center",
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => setDivToggle(!divToggle)}
        >
          Click me!
        </motion.buton>
      </div>
      <div
        style={{
          height: "50%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence>
          {divToggle && (
            <motion.div
              initial={{ y: -1200, opacity: 0 }}
              transition={{
                y: { type: "spring", stiffness: 50, duration: 0.5 },
                duration: 10,
              }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -1200, opacity: 0 }}
              style={{
                backgroundColor: "red",
                borderRadius: "5px",
                width: "100px",
                height: "100px",
              }}
            >
              Hello, world!
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>
    </div>
  );
}

export default AnalysisPage;

