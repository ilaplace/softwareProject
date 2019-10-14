/*
Exporting a config constant which will return the development or production variable based on the value of the process.env.NODE_ENV which is defined when we run our app in development npm start or in production when deployed running npm run deploy.
 */

const prod = {
    url: {
        API_URL: process.env.REACT_APP_API_PRODUCTION,
        
    }
};
const dev = {
    url: {
        API_URL: process.env.REACT_APP_API_LOCAL
    }
};
export const configURI = process.env.NODE_ENV === 'development' ? dev : prod;