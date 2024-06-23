/**
 * getServer.ts
 */



const API_URL =import.meta.env.VITE_DEVELOPMENT_API


/**
 * @example
 * // Example usage of the custom fetch object
 * // You would do this
 * import api from '@/Utils/getServer';
 * api('/v1/category/all', {method: 'GET'});
 * 
 * // Instead of this
 * fetch('localhost:18888/api/v1/category/all', {method: 'GET'});
 * 
 * @description
 * This is a custom Fetch object, it loads server URL as base URL,
 * so you won't have to keep adding full URL everytime. Also, to control
 * the server port whenever it changes, and adapt to server mode (dev, prod).
 * 
 * @param {String} endpoint - The endpoint you want to get, post, delete, ...
 * @param {RequestInit} options - Same options you would pass with Fetch API
 * 
 * @returns {Promise<Response>} A promise thar resolves to the Response object from the fetch request.
 */
function api(endpoint: string | null, options?: RequestInit): Promise<Response> {
    return fetch(`${API_URL}${endpoint}`, options);
}

export default api;

