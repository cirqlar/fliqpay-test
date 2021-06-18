# Fliqpay Frontend Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The project can be found hosted [here](https://fliqpay-test.vercel.app/).

## Installation

### Clone the source code 
```bash
git clone https://github.com/cirqlar/fliqpay-test.git
```
### Install dependencies
_Note: Ensure you have changed into the cloned directory before you run this command_
```bash
npm install
```
### Set up env

Copy the contents of `.env.example` into a file named `.env.local` and complete it in with details.
_Note: See the [API section](#api) for details about the API_

### Start development server
```bash
npm start
```
You can now view the app on [http://localhost:3000](http://localhost:3000).
### Testing

Use the following command to execute tests. To run in watch mode, omit the `-- --watchALl=false` flag
```bash
npm test -- --watchAll=false
```

## API

In order to prevent leakage of sensitive keys, a simple proxy server (which can be found at [https://github.com/cirqlar/fliqpay-api.git](https://github.com/cirqlar/fliqpay-api.git)) was used to forward requests to the [fixer](fixer.io) api after appending the api key. Visit the repository to find instructions on configuring it.

## Assumptions and Relevant Information

- The project assumes a value of `0.369` (when REACT_APP_TRANSACTION_FEE, is not set) for it's transaction fee percentage. 
- During the conversion calculation, the transaction fee is rounded down and the final converted amount is rounded up (to two decimal places).
- The send amount is limited to a hardcoded 1,000,000.00
- The send amount is limited to two decimal places