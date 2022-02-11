import React, { useEffect, useState } from 'react';
import './AppSidebar.css';
import logo from './should-cost-logo-v2.png';
import { VscSettingsGear } from "react-icons/vsc";
import { SiReact } from "react-icons/si";
import { GoGraph } from "react-icons/go";
import { BsGraphDown } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";


function AppSidebar({selectPage, selectedPage}) {

    const [ sidebarLoadToggle, setSidebarLoadToggle ] = useState(false);

    useEffect(()=>{
        setSidebarLoadToggle(true);
    }, [])

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
        <div className='app__sidebar__outer'>
            <div className='app__sidebar__logo'>
                <img src={logo} alt="Greencore Logo" width="60" height="60"/>
            </div>
            <AnimatePresence>
                {sidebarLoadToggle && (
                    <div className='app__sidebar__content'>
                        <motion.ul  initial="hidden"
                                    animate="visible"
                                    variants={list}
                                    style={{listStyleType: "none", padding: "0px", margin: "0px"}}
                                    >
                            <motion.li variants={item}>
                                <div key="1" className={`app__sidebar__button__outer ${selectedPage === "SETUP" && 'app__sidebar__active'}`} onClick={()=>selectPage("SETUP")}>
                                    <VscSettingsGear size="30" className={selectedPage === "SETUP" && 'app__sidebar__rotate'}/>
                                    <p>Setup</p>
                                </div>
                            </motion.li>
                            <motion.li variants={item}>
                                <div key="2" className={`app__sidebar__button__outer ${selectedPage === "MODEL" && 'app__sidebar__active'}`} onClick={()=>selectPage("MODEL")}>
                                    <SiReact size="30" className={selectedPage === "MODEL" && 'app__sidebar__rotate'}/>
                                    <p>Modelling</p>
                                </div>
                            </motion.li>
                            <motion.li variants={item}>
                                <div key="3" className={`app__sidebar__button__outer ${selectedPage === "ANALYSIS" && 'app__sidebar__active'}`} onClick={()=>selectPage("ANALYSIS")}>
                                    <GoGraph size="30"/>
                                    <p>Analysis</p>
                                </div>
                            </motion.li>
                            <motion.li variants={item}>
                                <div key="4" className={`app__sidebar__button__outer ${selectedPage === "TRENDING" && 'app__sidebar__active'}`} onClick={()=>selectPage("TRENDING")}>
                                    <BsGraphDown size="30"/>
                                    <p>Trending</p>
                                </div>
                            </motion.li>
                        </motion.ul> 
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AppSidebar
