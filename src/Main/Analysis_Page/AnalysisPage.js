import React from 'react'

function AnalysisPage() {
    return (
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
    )
}

export default AnalysisPage
