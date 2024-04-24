export type ArgProps<T> = {
  arg: T;
};

const PROD_BASE_URL = "https://portefolio.dynv6.net/api";
const DEV_BASE_URL = "http://localhost:8080/api";

const BASE_URL = process.env.NODE_ENV === "development"
  ? DEV_BASE_URL
  : PROD_BASE_URL;

/**
 * Makes a network request using the Fetch API with specified options.
 *
 * @param {string} url - The URL for the network request.
 * @param {RequestInit} [requestOptions] - Optional request options such as method, headers, and body.
 *                                        Refer to the RequestInit type for available options.
 *                                        More info: https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.requestinit.html
 * @returns {Promise<T>} - A Promise that resolves to the parsed JSON response.
 * @template T - The expected data type of the response.
 *
 * @throws {Error} - If the network request fails or the response is not successful.
 */
export default async function fetcher<T>(
  url: string,
  requestOptions: RequestInit = {
    method: "GET",
  },
): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${url}`, requestOptions);

    if (!response.ok) {
      throw new Error(
        `Network request to ${url} failed with status ${response.status} (${response.statusText}).`,
      );
    }

    const responseData = (await response.json()) as T;
    return responseData;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(`Network request to ${url} failed: ${error.message}`);
    } else {
      throw error;
    }
  }
}
