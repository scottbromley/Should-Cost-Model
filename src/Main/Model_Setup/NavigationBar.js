import React from 'react';
import {GoPackage} from 'react-icons/go';
import {FaCarrot} from 'react-icons/fa';
import {VscVariableGroup} from 'react-icons/vsc';
import {MdHorizontalRule} from 'react-icons/md';
import './NavigationBar.css';

function NavigationBar({handlePageSelection, selectedPage}) {
    return (
        <div className='navigation__bar__outer'>
            <div className={`navigation__bar__icon__space ${selectedPage==='INGREDIENT' ? 'navigation__space__active' : 'navigation__space__NOT__active'}`} onClick={()=>handlePageSelection('INGREDIENT')}>
                <FaCarrot size={20}/>
                <span>Ingredients</span>
            </div>
            <MdHorizontalRule size={20} />
            <div className={`navigation__bar__icon__space ${selectedPage==='PACKAGING' ? 'navigation__space__active' : 'navigation__space__NOT__active'}`}  onClick={()=>handlePageSelection('PACKAGING')}>
                <GoPackage size={20}/>
                <span>Packaging</span>
            </div>
            <MdHorizontalRule size={20} />
            <div className={`navigation__bar__icon__space ${selectedPage==='VARIABLES' ? 'navigation__space__active' : 'navigation__space__NOT__active'}`}  onClick={()=>handlePageSelection('VARIABLES')}>
                <VscVariableGroup size={20}/>
                <span>Variables</span>
            </div>
        </div>
    )
}

export default NavigationBar
