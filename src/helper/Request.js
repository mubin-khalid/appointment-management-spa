/*
|--------------------------------------------------------------------------
| Request
|--------------------------------------------------------------------------
|
| This is a helper file which contains the Request.
|
| This is used for reaching out to the API endpoint in a consistent manner.
|
*/
import axios from "axios";
import _ from 'lodash';
/**
 * Fetches response from API
 *
 * @param  {Object} options
 *   : An Object variable that contains option values. Expected are:
 *     > token
 *     > method
 *     > endpoint
 *     > params
 *     > data
 *     > isDataRaw
 *     > headers
 *     > onSuccessCallback
 *     > onErrorCallback
 *
 * @return {*}
 */
export default function(options) {

  let defaults = {}; // Prepare axios options container

  // Set default values
  // **************************************************

  // Set default value for header if it does not exist
  if (_.isUndefined(options.headers) ) {
    options.headers = {};
  }

  // Set default value for endpoint if it does not exist
  if ( _.isUndefined(options.endpoint) ) {
    options.endpoint = '';
  }

  // Set default value for method if it does not exist
  if ( _.isUndefined(options.method) ) {
    options.method = 'get';
  }

  // Set default value for isDataRaw if it does not exist
  if ( _.isUndefined(options.isDataRaw) ) {
    options.isDataRaw = false;
  }

  // Set default value for isParamsRaw if it does not exist
  if ( _.isUndefined(options.isParamsRaw) ) {
    options.isParamsRaw = false;
  }

  // Set required values for axios options
  // **************************************************
  defaults.method = options.method;
  defaults.url = process.env.VUE_APP_LARAVEL_API + '/' + options.endpoint;

  // If (query)params exists, add it to defaults, otherwise, leave it be
  if ( (!_.isUndefined(options.params)) && (!_.isEmpty(options.params)) ) {
    defaults.url = options.isParamsRaw ? defaults.url + '?' + options.params : defaults.url + '?' + stringify(options.params);
  }

  // If data exists, add it to defaults, otherwise, leave it be
  if ( (!_.isUndefined(options.data)) && (!_.isEmpty(options.data)) ) {
    defaults.data = options.isDataRaw ? options.data : stringify(options.data);
  }

  // Set headers -----
  defaults.headers = options.headers;

  // Authorization
  let token = localStorage.getItem("access_token");
  if ( !isEmpty(token) ) {
    defaults.headers['Authorization'] = 'Bearer ' + token;
  }
  // defaults.headers['Content-Type'] = 'application/json';
  // console.log(defaults.headers)
  // Set Default for Content-Type if its empty
  // if ( _.isUndefined(options.headers['Content-Type']) ) {
  //     defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  // }

  return new Promise((resolve, reject) => {

    // Start calling API using axios
    // noinspection ES6ModulesDependencies
    axios(defaults)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
} // End of Request method

/**
 * Helper method to convert an object to querystring
 *
 * @param  {object} obj
 *   : the object to be converted
 *
 * @return {string}
 */
function stringify(obj) {
  let has = Object.prototype.hasOwnProperty;
  let pairs = [];

  for (let key in obj) {
    if (has.call(obj, key)) {
      if (_.isArray(obj[key])) {
        for (let v in obj[key]) {
          // noinspection JSUnfilteredForInLoop
          pairs.push(encodeURIComponent(key) +'[]='+ encodeURIComponent(obj[key][v]));
        }
      } else {
        pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
      }
    }
  }
  return pairs.join('&');
} // End of stringify() method

function isEmpty(v) {
  if (window._.isArray(v) || window._.isObject(v)) {
    return window._.size(v) === 0;
  } else {
    return (
      window._.isNil(v)
      || window._.trim(v) === ''
      || v === 0
    );
  }
}
