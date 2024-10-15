import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function sliceUrl(url) {
    return url.split("/").filter((item) => item !== "");
}

export function generatePathUntilIndex(array, index) {
    const newArray = array.slice(0, index);
    return "/" + newArray.join("/");
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}.`;
    return formattedDate;
}
