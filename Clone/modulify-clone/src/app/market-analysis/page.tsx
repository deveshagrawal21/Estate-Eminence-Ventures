'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function MarketAnalysisPage() {
  const [selectedCity, setSelectedCity] = useState('mumbai');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1y');
  const [selectedChart, setSelectedChart] = useState('price');

  const cityData = {
    mumbai: {
      title: 'Mumbai Real Estate Market Trends',
      priceGrowth: '8.5%',
      avgPrice: '₹18,500/sqft',
      inventory: '12,450',
      demandIndex: '82/100',
      roi: '4.8%',
      hotAreas: ['Bandra', 'Worli', 'Powai', 'Andheri West', 'Malad'],
      priceChart: '/mumbai-price-chart.png',
      description: 'Mumbai continues to be one of India\'s strongest real estate markets, with steady price appreciation and high demand in premium locations. The MMR region shows robust growth with new infrastructure developments fueling investment opportunities.',
      // Price data by months for different timeframes
      priceData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Price per sq.ft (₹000s)',
            data: [16.8, 17.0, 17.4, 17.6, 17.8, 18.0, 18.2, 18.3, 18.4, 18.5, 18.7, 18.9],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      // Transaction volume data
      transactionData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Monthly Transactions',
            data: [450, 420, 480, 520, 540, 580, 610, 590, 620, 650, 670, 690],
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
            borderRadius: 4
          }
        ]
      },
      // Property type distribution
      propertyTypeData: {
        labels: ['Apartments', 'Villas', 'Row Houses', 'Plots', 'Commercial'],
        datasets: [
          {
            label: 'Listings by Property Type',
            data: [64, 12, 8, 10, 6],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(249, 115, 22, 0.7)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(236, 72, 153, 0.7)'
            ],
            borderRadius: 4
          }
        ]
      }
    },
    // Data for Delhi
    delhi: {
      title: 'Delhi NCR Real Estate Market Trends',
      priceGrowth: '5.2%',
      avgPrice: '₹12,800/sqft',
      inventory: '18,350',
      demandIndex: '76/100',
      roi: '3.9%',
      hotAreas: ['Gurgaon', 'Noida Expressway', 'Dwarka Expressway', 'New Delhi Central', 'Greater Noida West'],
      priceChart: '/delhi-price-chart.png',
      description: 'Delhi NCR market shows steady recovery with infrastructure improvements and commercial developments driving residential demand. Peripheral areas like Noida and Gurgaon continue to offer better yields compared to central Delhi.',
      // Price data
      priceData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Price per sq.ft (₹000s)',
            data: [11.9, 12.0, 12.1, 12.3, 12.4, 12.5, 12.6, 12.6, 12.7, 12.8, 12.9, 13.0],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      // Transaction volume data
      transactionData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Monthly Transactions',
            data: [580, 550, 590, 620, 640, 660, 680, 650, 690, 710, 730, 750],
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
            borderRadius: 4
          }
        ]
      },
      // Property type distribution
      propertyTypeData: {
        labels: ['Apartments', 'Villas', 'Row Houses', 'Plots', 'Commercial'],
        datasets: [
          {
            label: 'Listings by Property Type',
            data: [52, 18, 15, 8, 7],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(249, 115, 22, 0.7)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(236, 72, 153, 0.7)'
            ],
            borderRadius: 4
          }
        ]
      }
    },
    // Data for Bangalore
    bangalore: {
      title: 'Bangalore Real Estate Market Trends',
      priceGrowth: '10.2%',
      avgPrice: '₹8,900/sqft',
      inventory: '22,180',
      demandIndex: '88/100',
      roi: '5.2%',
      hotAreas: ['Whitefield', 'Electronic City', 'Sarjapur Road', 'Hebbal', 'Indiranagar'],
      priceChart: '/bangalore-price-chart.png',
      description: 'Bangalore leads India\'s real estate market with robust growth fueled by the IT sector. The city shows excellent long-term investment potential with consistent demand and high rental yields especially near tech corridors.',
      // Price data
      priceData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Price per sq.ft (₹000s)',
            data: [7.9, 8.0, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9.0, 9.1],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      // Transaction volume data
      transactionData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Monthly Transactions',
            data: [720, 680, 750, 790, 820, 850, 880, 900, 920, 950, 980, 1020],
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
            borderRadius: 4
          }
        ]
      },
      // Property type distribution
      propertyTypeData: {
        labels: ['Apartments', 'Villas', 'Row Houses', 'Plots', 'Commercial'],
        datasets: [
          {
            label: 'Listings by Property Type',
            data: [68, 14, 6, 8, 4],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(249, 115, 22, 0.7)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(236, 72, 153, 0.7)'
            ],
            borderRadius: 4
          }
        ]
      }
    },
    // Data for Hyderabad
    hyderabad: {
      title: 'Hyderabad Real Estate Market Trends',
      priceGrowth: '12.1%',
      avgPrice: '₹7,200/sqft',
      inventory: '14,750',
      demandIndex: '86/100',
      roi: '5.4%',
      hotAreas: ['HITEC City', 'Gachibowli', 'Kondapur', 'Banjara Hills', 'Kukatpally'],
      priceChart: '/hyderabad-price-chart.png',
      description: 'Hyderabad has emerged as one of India\'s fastest growing real estate markets with exceptional price appreciation in the western corridor. The city benefits from infrastructure development and a business-friendly environment.',
      // Price data
      priceData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Price per sq.ft (₹000s)',
            data: [6.2, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7.0, 7.1, 7.2, 7.3, 7.4],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      // Transaction volume data
      transactionData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Monthly Transactions',
            data: [520, 490, 540, 580, 610, 650, 680, 700, 720, 750, 780, 800],
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
            borderRadius: 4
          }
        ]
      },
      // Property type distribution
      propertyTypeData: {
        labels: ['Apartments', 'Villas', 'Row Houses', 'Plots', 'Commercial'],
        datasets: [
          {
            label: 'Listings by Property Type',
            data: [58, 22, 8, 9, 3],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(249, 115, 22, 0.7)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(236, 72, 153, 0.7)'
            ],
            borderRadius: 4
          }
        ]
      }
    }
  };

  const currentCity = cityData[selectedCity as keyof typeof cityData];

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Real Estate Market Analysis</h1>
          <p className="text-gray-600 max-w-3xl">
            Access comprehensive market data and analytics powered by AI to make informed investment decisions. Our analysis combines thousands of data points from multiple sources to provide accurate market insights.
          </p>
        </div>

        {/* City and Timeframe Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div>
              <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-2">Select City</label>
              <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi NCR</option>
                <option value="bangalore">Bangalore</option>
                <option value="hyderabad">Hyderabad</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeframe-select" className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
              <select
                id="timeframe-select"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last 1 Year</option>
                <option value="3y">Last 3 Years</option>
                <option value="5y">Last 5 Years</option>
              </select>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-4">{currentCity.title}</h2>
          <p className="text-gray-600 mb-6">{currentCity.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Price Growth (Annual)</h3>
              <p className="text-2xl font-bold text-blue-600">{currentCity.priceGrowth}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Average Price</h3>
              <p className="text-2xl font-bold text-blue-600">{currentCity.avgPrice}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-sm font-medium text-gray-500 mb-2">ROI (Rental Yield)</h3>
              <p className="text-2xl font-bold text-blue-600">{currentCity.roi}</p>
            </div>
          </div>

          {/* Chart Selection Tabs */}
          <div className="mb-4">
            <div className="flex space-x-2 border-b border-gray-200">
              <button
                onClick={() => setSelectedChart('price')}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedChart === 'price'
                    ? 'text-blue-600 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Price Trends
              </button>
              <button
                onClick={() => setSelectedChart('transactions')}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedChart === 'transactions'
                    ? 'text-blue-600 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Transaction Volume
              </button>
              <button
                onClick={() => setSelectedChart('property-types')}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedChart === 'property-types'
                    ? 'text-blue-600 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Property Types
              </button>
            </div>
          </div>

          {/* Chart Display Area */}
          <div className="mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 h-80">
              {selectedChart === 'price' && (
                <Line
                  options={lineChartOptions}
                  data={currentCity.priceData}
                />
              )}

              {selectedChart === 'transactions' && (
                <Bar
                  options={barChartOptions}
                  data={currentCity.transactionData}
                />
              )}

              {selectedChart === 'property-types' && (
                <Bar
                  options={barChartOptions}
                  data={currentCity.propertyTypeData}
                />
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              {selectedChart === 'price' && 'Average property price per square foot trends'}
              {selectedChart === 'transactions' && 'Monthly property transaction volume'}
              {selectedChart === 'property-types' && 'Distribution of property types (%)'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Hot Investment Areas</h3>
              <ul className="space-y-2">
                {currentCity.hotAreas.map((area, index) => (
                  <li key={index} className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <Link href={`/properties?location=${area.toLowerCase().replace(' ', '-')}`} className="text-blue-600 hover:underline">
                      {area}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Market Indicators</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Demand Index</span>
                    <span className="text-sm font-medium text-gray-800">{currentCity.demandIndex}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${parseInt(currentCity.demandIndex.split('/')[0])}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Supply-Demand Balance</span>
                    <span className="text-sm font-medium text-gray-800">Moderate</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Future Growth Potential</span>
                    <span className="text-sm font-medium text-gray-800">High</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Reports Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Reports & Forecasts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Q1 2025 Market Report</h3>
                <p className="text-gray-600 mb-4">Comprehensive analysis of the Indian real estate market performance in Q1 2025 with city-wise breakdown.</p>
                <a href="#" className="text-blue-600 hover:underline">Download PDF</a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">5-Year Growth Forecast</h3>
                <p className="text-gray-600 mb-4">Long-term price and demand forecast for major Indian cities with investment recommendations.</p>
                <a href="#" className="text-blue-600 hover:underline">Download PDF</a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Luxury Segment Analysis</h3>
                <p className="text-gray-600 mb-4">In-depth analysis of the luxury real estate segment in India with price trends and buyer profiles.</p>
                <a href="#" className="text-blue-600 hover:underline">Download PDF</a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-50 rounded-xl p-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Need personalized market insights?</h2>
              <p className="text-gray-600">
                Our real estate experts can provide detailed market analysis tailored to your investment goals.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex py-3 px-6 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
