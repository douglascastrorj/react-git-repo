export const API_URL = `https://api.github.com`;
export const SEARCH_API  = `${API_URL}/search`;
export const REPO_API = `${API_URL}/repos`



export const formatNumberToString = number => {
    return number > 9 ? String(number) : "0" + String(number);
}

export const formatDate = dateString => {
    const date = new Date(dateString);

    const formatedDate = formatNumberToString(date.getDate()) + "/" + formatNumberToString(date.getMonth()) + "/" + formatNumberToString(date.getFullYear());

    return formatedDate;
}