export const createErrorMessage = (data) =>
    (data.response && data.response.data && data.response.data.message) ||
    data.message || data.toString();
