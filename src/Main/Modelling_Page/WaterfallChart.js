import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';


function WaterfallChart({incomingPriceWaterfallData, bottomOfWaterfall, topOfWaterFall}) {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Should Cost Waterfall Chart',
          },
        },
        scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              min: 0,
            },
          },
          animations: {
            y: {
              easing: 'easeInOutElastic',
              from: (ctx) => {
                if (ctx.type === 'data') {
                  if (ctx.mode === 'default' && !ctx.dropped) {
                    ctx.dropped = true;
                    return 0;
                  }
                }
              }
            }
          }
      };
      
      const labels = ['Incoming Price', 'Total', 'Ingredients', 'Packaging', 'Yield', 'Labour', 'Waste', 'Transport', 'Overheads', 'Byproduct', 'Margin'];
      
     const data = {
        labels,
        datasets: [
            {
                label: 'Incoming Price',
                data: incomingPriceWaterfallData,
                backgroundColor: 
                [
                    'rgba(189, 122, 179, 1)', 
                    'rgba(189, 122, 179, 0)', 
                    'rgba(255, 99, 132, 0)', 
                    'rgba(255, 99, 132, 0)', 
                    'rgba(255, 99, 132, 0)', 
                    'rgba(255, 99, 132, 0)', 
                    'rgba(255, 99, 132, 0)', 
                    'rgba(255, 99, 132, 0)', 
                    'rgba(255, 99, 132, 0)', 
                    'rgba(255, 99, 132, 0)', 
                    'rgba(255, 99, 132, 0)', 
                ],
            },
          {
            label: 'Total Should Cost',
            data: bottomOfWaterfall,
            backgroundColor: 
            [
              'rgba(92, 184, 178, 1)', 
                'rgba(92, 184, 178, 1)', 
                'rgba(255, 99, 132, 0)', 
                'rgba(255, 99, 132, 0)', 
                'rgba(255, 99, 132, 0)', 
                'rgba(255, 99, 132, 0)', 
                'rgba(255, 99, 132, 0)', 
                'rgba(255, 99, 132, 0)', 
                'rgba(255, 99, 132, 0)', 
                'rgba(255, 99, 132, 0)', 
                'rgba(255, 99, 132, 0)', 
            ],
            animations: {
              y: {
                duration: 2000,
                delay: 0
              }
            },
          },
          {
            label: 'Price Breakdown Waterfall',
            data: topOfWaterFall,
            backgroundColor: [
                'rgba(141, 198, 63, 1)',
                'rgba(255, 0, 0, 0)',
                'rgba(141, 198, 63, 1)',
                'rgba(141, 198, 63, 1)',
                'rgba(141, 198, 63, 1)',
                'rgba(141, 198, 63, 1)',
                'rgba(141, 198, 63, 1)',
                'rgba(141, 198, 63, 1)',
                'rgba(141, 198, 63, 1)',
                'rgba(141, 198, 63, 1)',
                'rgba(141, 198, 63, 1)',
            ],
            animations: {
              y: {
                duration: 2000,
                delay: 0
              }
            },
          },
          
        ],
      };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );

    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
}

export default WaterfallChart
