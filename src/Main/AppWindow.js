import React, {useState, useEffect} from 'react';
import './AppWindow.css';
import ModelSetupPage from './Model_Setup/ModelSetupPage.js';
import AnalysisPage from './Analysis_Page/AnalysisPage.js';
import TrendingPage from './Trending_Page/TrendingPage';
import ModellingPage from './Modelling_Page/ModellingPage';
import LoadingSpinner from './LoadingSpinner';

function AppWindow({selectedPage}) {

    const [loadingSpinnerToggle, setLoadinSpinnerToggle] = useState(false);

    useEffect(()=>{
        setLoadinSpinnerToggle(true)
        setTimeout(function(){
            setLoadinSpinnerToggle(false)
        }, 1500)
    }, [])

    return (
        <div className='app__window__outer'>
            {selectedPage==='SETUP' ? <ModelSetupPage/> : <div></div>}
            {selectedPage==='MODEL' ? <ModellingPage/> : <div></div>}
            {selectedPage==='ANALYSIS' ? <AnalysisPage/> : <div></div>}
            {selectedPage==='TRENDING' ? <TrendingPage/> : <div></div>}
            {loadingSpinnerToggle && <LoadingSpinner/>}
        </div>
        
    )
}

export default AppWindow
