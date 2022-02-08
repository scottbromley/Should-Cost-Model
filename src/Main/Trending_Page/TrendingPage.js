import React from 'react'

function TrendingPage() {
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
        <p>This is the space where historical trending can be explored. Snapshots of the models can be saved at regular time intervals and saved to a separate database.</p>
        <p>The model of a given ingredient can then be rebuilt and the changing price over time can be viewed to add another dimension to the analysis.</p>
      </div>
    )
}

export default TrendingPage
