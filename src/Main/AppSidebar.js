import React, { useEffect, useState } from 'react';
import './AppSidebar.css';
import logo from './should-cost-logo-v2.png';
import { VscSettingsGear } from "react-icons/vsc";
import { SiReact } from "react-icons/si";
import { GoGraph } from "react-icons/go";
import { BsGraphDown } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import SideBarWaveComponent from './SidebarWave.js';


function AppSidebar({selectPage, selectedPage}) {

    const [ sidebarLoadToggle, setSidebarLoadToggle ] = useState(false);
    const [ extraDetailToggle, setExtraDetailToggle ] = useState({SETUP: false, MODELLING: false, ANALYSIS: false, TRENDING: false});

    function handleSideBarHoverEnter(region){
        setExtraDetailToggle({...extraDetailToggle, [region]: true});
    }

    function handleSideBarHoverLeave(region){
        setExtraDetailToggle({...extraDetailToggle, [region]: false});
    }


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

      const extraDetailItem = {
          visible: {    
                y: -50, 
                x: 0,
                opacity: 1,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    duration: 3,
                } },
          hidden: { 
              y: -100,
              x: -0,
              opacity: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                duration: 0.5
            }},
            slide: {
                y: 50,
                x: 0,
                opacity: 0,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    duration: 0.2
                }
            }
          
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
                            <motion.li variants={item} onMouseEnter={()=>handleSideBarHoverEnter("SETUP")} onMouseLeave={()=>handleSideBarHoverLeave("SETUP")}>
                                <div key="1" className={`app__sidebar__button__outer ${selectedPage === "SETUP" && 'app__sidebar__active'}`} onClick={()=>selectPage("SETUP")} >
                                    <VscSettingsGear size="30" className={selectedPage === "SETUP" && 'app__sidebar__rotate'}/>
                                    <p>Setup</p>
                                    <AnimatePresence>{extraDetailToggle.SETUP && (
                                        <motion.div className='app__sidebar__extra__detail__pane' initial="hidden" animate="visible" exit="slide" variants={extraDetailItem}>
                                            <SideBarWaveComponent size={10}/>
                                            <div className= "app__sidebar__component__extra__detail__text">
                                                Create or Edit Should Cost Models.
                                            </div>
                                        </motion.div>)}
                                    </AnimatePresence>
                                </div>
                            </motion.li>
                            <motion.li variants={item} onMouseEnter={()=>handleSideBarHoverEnter("MODELLING")} onMouseLeave={()=>handleSideBarHoverLeave("MODELLING")}>
                                <div key="2" className={`app__sidebar__button__outer ${selectedPage === "MODEL" && 'app__sidebar__active'}`} onClick={()=>selectPage("MODEL")}>
                                    <SiReact size="30" className={selectedPage === "MODEL" && 'app__sidebar__rotate'}/>
                                    <p>Modelling</p>
                                    <AnimatePresence>{extraDetailToggle.MODELLING && (
                                        <motion.div className='app__sidebar__extra__detail__pane' initial="hidden" animate="visible" exit="slide" variants={extraDetailItem}>
                                            <SideBarWaveComponent size={10}/>
                                            <div className= "app__sidebar__component__extra__detail__text">
                                                View Should Cost Models.
                                            </div>
                                        </motion.div>)}
                                    </AnimatePresence>
                                </div>
                            </motion.li>
                            <motion.li variants={item} onMouseEnter={()=>handleSideBarHoverEnter("ANALYSIS")} onMouseLeave={()=>handleSideBarHoverLeave("ANALYSIS")}>
                                <div key="3" className={`app__sidebar__button__outer ${selectedPage === "ANALYSIS" && 'app__sidebar__active'}`} onClick={()=>selectPage("ANALYSIS")}>
                                    <GoGraph size="30"/>
                                    <p>Analysis</p>
                                    <AnimatePresence>{extraDetailToggle.ANALYSIS && (
                                        <motion.div className='app__sidebar__extra__detail__pane' initial="hidden" animate="visible" exit="slide" variants={extraDetailItem}>
                                            <SideBarWaveComponent size={10}/>
                                            <div className= "app__sidebar__component__extra__detail__text">
                                                Analyse Aggregated Should Cost Models.
                                            </div>
                                        </motion.div>)}
                                    </AnimatePresence>
                                </div>
                            </motion.li>
                            <motion.li variants={item} onMouseEnter={()=>handleSideBarHoverEnter("TRENDING")} onMouseLeave={()=>handleSideBarHoverLeave("TRENDING")}>
                                <div key="4" className={`app__sidebar__button__outer ${selectedPage === "TRENDING" && 'app__sidebar__active'}`} onClick={()=>selectPage("TRENDING")}>
                                    <BsGraphDown size="30"/>
                                    <p>Trending</p>
                                    <AnimatePresence>{extraDetailToggle.TRENDING && (
                                        <motion.div className='app__sidebar__extra__detail__pane' initial="hidden" animate="visible" exit="slide" variants={extraDetailItem}>
                                            <SideBarWaveComponent size={10}/>
                                            <div className= "app__sidebar__component__extra__detail__text">
                                                View Historical Should Cost Trends.
                                            </div>
                                        </motion.div>)}
                                    </AnimatePresence>
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
