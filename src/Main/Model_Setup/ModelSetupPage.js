import React, {useState} from 'react';
import SetupSearchPane from './SetupSearchPane.js';
import IngredientsLinkPage from './IngredientsLink.js/IngredientsLinkPage.js';
import PackagingLinkPage from './PackagingLink.js/PackagingLinkPage.js';
import VariablesLinkPage from './VariablesLink.js/VariablesLinkPage.js';
import './ModelSetupPage.css';

function ModelSetupPage() {

    const [LPFSearchedOption, setLPFSearchedOption] = useState('');
    const [selectedPage, setSelectedPage] = useState('INGREDIENT');

    function handlePageSelection(selection){
        setSelectedPage(selection);
    }

    function LPFOptionSelected(args){
        setLPFSearchedOption(args);
        console.log(args)
    }

    return (
        <div className='model__setup__page__outer'>
            <SetupSearchPane LPFOptionSelected={LPFOptionSelected} LPFSearchedOption={LPFSearchedOption} handlePageSelection={handlePageSelection} selectedPage={selectedPage} />
            {selectedPage === 'INGREDIENT' && <IngredientsLinkPage LPFSearchedOption={LPFSearchedOption}/>}
            {selectedPage === 'PACKAGING' && <PackagingLinkPage LPFSearchedOption={LPFSearchedOption}/>}
            {selectedPage === 'VARIABLES' && <VariablesLinkPage LPFSearchedOption={LPFSearchedOption}/>}
        </div>
    )
}

export default ModelSetupPage
