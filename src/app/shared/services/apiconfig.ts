export const BaseHeader = {
      'Content-Type': 'text/plain'
};

export const BaseUrl = 'http://ahwwebtxaus001:3000/api';

export const BaseICUrl = 'https://ciccrm.ascension.org/api/ahwivrtxpla001.ds.sjhs.com/icws/connection';

/* Use this for PROD environment:
   export const REST_API_URL = 'https://sb-fhir-dstu2.smarthealthit.org'; */

/* Use this for QA environment:
  export const REST_API_URL_QA = 'https://sb-fhir-dstu2.smarthealthit.org'; */


// export const BaseUrl = getEnv()

// function getEnv() {
//   let env: string;
//   let data = {
//         endPoint: ''
//   };
//   console.log('Mode: ' + MODE);
//   env = MODE;

//   switch (env) {
//     case 'development':
//     data = {
//       endPoint: REST_API_URL_QA
//     }
//     break;
//   };
//   switch (prod) {
//     case 'production':
//     data = {
//       endPoint: REST_API_URL
//     }
//     break;
//   };
// }
