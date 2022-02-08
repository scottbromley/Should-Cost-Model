import React from 'react';
import './AppSidebar.css';
import logo from './should-cost-logo-v2.png';
import { VscSettingsGear } from "react-icons/vsc";
import { SiReact } from "react-icons/si";
import { GoGraph } from "react-icons/go";
import { BsGraphDown } from "react-icons/bs";


function AppSidebar({selectPage, selectedPage}) {

    return (
        <div className='app__sidebar__outer'>
            <div className='app__sidebar__logo'>
                <img src={logo} alt="Greencore Logo" width="60" height="60"/>
            </div>
            <div className='app__sidebar__content'>
                <div className={`app__sidebar__button__outer ${selectedPage === "SETUP" && 'app__sidebar__active'}`} onClick={()=>selectPage("SETUP")}>
                    <VscSettingsGear size="30" className={selectedPage === "SETUP" && 'app__sidebar__rotate'}/>
                    <p>Setup</p>
                </div>
                <div className={`app__sidebar__button__outer ${selectedPage === "MODEL" && 'app__sidebar__active'}`} onClick={()=>selectPage("MODEL")}>
                    <SiReact size="30" className={selectedPage === "MODEL" && 'app__sidebar__rotate'}/>
                    <p>Modelling</p>
                </div>
                <div className={`app__sidebar__button__outer ${selectedPage === "ANALYSIS" && 'app__sidebar__active'}`} onClick={()=>selectPage("ANALYSIS")}>
                    <GoGraph size="30"/>
                    <p>Analysis</p>
                </div>
                <div className={`app__sidebar__button__outer ${selectedPage === "TRENDING" && 'app__sidebar__active'}`} onClick={()=>selectPage("TRENDING")}>
                    <BsGraphDown size="30"/>
                    <p>Trending</p>
                </div>
            </div> 
        </div>
    )
}

export default AppSidebar
