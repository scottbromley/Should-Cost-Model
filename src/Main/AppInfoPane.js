import React from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import diagram from "./Should_Cost_Diagram.png";


function AppInfoPane({handleToggleAppInfoPane}) {
  return (
  <div style={{position: "fixed", width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.75)", padding: "0px", left: "0px", top: "0px", zIndex:"10", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <AiOutlineCloseCircle style={{color: "white", position: "absolute", right: "10px", top: "10px", height: "30px", width: "30px"}} onClick={handleToggleAppInfoPane} />
    <div style={{width: "800px", height: "700px", backgroundColor: "white", borderRadius: "10px", margin: "10px", padding: "10px", textAlign: "justify", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1 style={{color: "rgb(51, 63, 72)", fontFamily: "Tahoma", marginBottom: "0px"}}>Hello, and welcome to my demo React app!</h1>
        <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "left"}}>
            <h3 style={{color: "rgb(51, 63, 72)", fontFamily: "Tahoma", marginBottom: "0px", marginTop: "10px",}}>Purpose</h3>
            <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                <p style={{width: "70%", color: "rgb(51, 63, 72)", fontFamily: "Tahoma", marginBottom: "0px", marginTop: "0px", padding: "15px", fontSize: "14px"}}>
                This app has got quite a specific function, and might seem a bit abstract without the broarder context, but it serves as a demonstration of several techniques. 
                The purpose of this tool is to model the price of food items. The recipe information is known, and can be used to calculate the 
                amount of each sub ingredient and packaging item required to make up a primary ingredient. The cost of each component can be linked to
                one of two databases, and then used to compute the total 'should cost' of an ingredient. There are two sources of price data: the 'LPF', live price forecast, 
                or the "Other" database - a database built up within this app by the users. </p>
                <img src={diagram} alt="Diagram of Should Cost Model" style={{width: "25%", marginBottom: "0px", marginTop: "0px",}}/>  
            </div>
        </div>
        <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "left"}}>     
        <h3 style={{color: "rgb(51, 63, 72)", fontFamily: "Tahoma", marginBottom: "0px", marginTop: "10px",}}>Technologies</h3>
        <p style={{color: "rgb(51, 63, 72)", fontFamily: "Tahoma", marginBottom: "0px", marginTop: "0px", padding: "0px", fontSize: "14px"}}>
            <ul style={{marginTop: "4px"}}>
                <li>React</li>
                <li>Firebase Realtime Database</li>
                <li>Select Search for searchable drop downs</li>
                <li>AG Grid table, with embedded dropdowns and searchable drops downs</li>
                <li>Material UI and React Icons</li>
                <li>Chart.js</li>
            </ul>
        </p>
        <h3 style={{color: "rgb(51, 63, 72)", fontFamily: "Tahoma", marginBottom: "0px", marginTop: "10px",}}>User Instructions</h3>
        <p style={{color: "rgb(51, 63, 72)", fontFamily: "Tahoma", marginBottom: "0px", marginTop: "0px", padding: "0px", fontSize: "14px"}}>
            <ul style={{marginTop: "4px"}}>
                <li>Try searching for an ingredient in the model set-up page using the search bar. This will return the recipe for that ingredient and show the percentage quantity of its component parts.</li>
                <li>Have a go at filtering, sorting and searching in the table.</li>
                <li>The first area for data input is to select a data source for each sub ingredient - this can either be "LPF" (live price forecast), or "Other" (a database that is built up within this app as users add to it).</li>
                <li>Once the price source has been selected, the lists in the next column are rendered so that you can search within either of these databases. The price is then calculated for each row.</li>
                <li>Select "Input" as a price source option and use the form to add a new ingredient to the database.</li>
                <li>Move to the modelling page, where the information inputted about an ingredient can be visualiased on a waterfall chart.</li>
                <li>Try changing the sliders on the left hand side to see how a change to one of the input variables impacts the price.</li>
            </ul>
        </p>
        </div>
    </div>
  </div>
  );
}

export default AppInfoPane;
