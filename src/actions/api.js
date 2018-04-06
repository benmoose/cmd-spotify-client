/**
 * Functions for accessing the API
 */

import axios from 'axios'

/**
 * Standardised function for accessing the API
 * @param {object} config axios config
 */
export default function api (config) {
  // set the base URL
  const baseURL = process.env.REACT_APP_API_URL
  // return axios promise
  return axios({
    baseURL,
    ...config
  })
}
