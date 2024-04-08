
export const apiUrl = (endpoint) => {
    return `${import.meta.env.VITE_SERVER_API}${endpoint}`;
};