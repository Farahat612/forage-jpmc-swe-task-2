# Real-Time Stock Price Monitoring App

## Description

This repository contains the code for a real-time stock price monitoring app, developed as part of JPMC's Forage program.

## Features

- Live streaming of stock price data.
- Interactive graph that displays real-time changes in stock prices.
- User-friendly interface with a start/stop button for data streaming.
- Real-time updates without the need to refresh the page.

## Contributions

- Implemented the data fetching functionality from the server.
- Updated the app to continuously request data every 100ms until the app is closed or the server stops providing data.
- Fixed the data duplication issue when updating the Perspective table.
- Made necessary changes to the Graph component to correctly display and update the data.

## Installation

To run the app locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies using npm or yarn.
3. Start the development server.

```shell
git clone https://github.com/your-username/stock-price-monitoring-app.git
cd stock-price-monitoring-app
npm install
npm start


The app will be accessible at http://localhost:3000 in your web browser.

Usage
Open the app in your web browser.
Click the "Start Streaming Data" button to begin fetching real-time stock price data.
The graph will start displaying the stock price changes as they occur.
To stop the data streaming, click the "Stop Streaming Data" button.
Contributing
Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

License
This project is licensed under the MIT License.


