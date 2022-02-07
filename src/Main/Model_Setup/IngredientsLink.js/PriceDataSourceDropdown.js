import React, {useState} from 'react';
import './PriceDataSourceDropdown.css';

function PriceDataSourceDropdown(props) {
    
    const[source, setSource] = useState(props.value);

    const onSourceChange = (event) => {
        setSource(event.target.value);
    }
    
    return (
        <div className='price__data__source__dropdown__outer'>
            <select value={source} onChange={onSourceChange}>
                <option value="LPF"> LPF </option>
                <option value="OTHER"> Other Price </option>
                <option value="INPUT"> Input </option>
                <option value="PROPOSED"> Proposed </option>
            </select>
        </div>
    )
}

export default PriceDataSourceDropdown
