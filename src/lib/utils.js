import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function convertToISOWithMidnight(dateString) {
  // Create a new Date object from the input string
  const inputDate = new Date(dateString);
  console.log(inputDate)
  // Check if the input date is valid
  if (isNaN(inputDate.getTime())) {
      throw new Error("Invalid date string");
  }

  // Set the time to midnight (00:00:00)
  inputDate.setHours(0, 0, 0, 0);
  console.log(inputDate)
  // Return the result as an ISO string
  return inputDate.toISOString();
}


export function convertToISOWithPreviousDay(dateString) {
  // Create a new Date object from the input string
  const inputDate = new Date(dateString);
  console.log(inputDate);

  // Check if the input date is valid
  if (isNaN(inputDate.getTime())) {
    throw new Error("Invalid date string");
  }

  // Subtract one day from the input date
  inputDate.setDate(inputDate.getDate() - 1);
  console.log(inputDate);

  // Return the result as an ISO string
  return inputDate.toISOString();
}


export function convertToISOWithNextDay(dateString) {
  // Create a new Date object from the input string
  const inputDate = new Date(dateString);
  console.log(inputDate);

  // Check if the input date is valid
  if (isNaN(inputDate.getTime())) {
    throw new Error("Invalid date string");
  }

  // Subtract one day from the input date
  inputDate.setDate(inputDate.getDate() + 1);
  console.log(inputDate);

  // Return the result as an ISO string
  return inputDate.toISOString();
}

export function convertToISOWithLastMinute(dateString) {
  // Create a new Date object from the input string
  const inputDate = new Date(dateString);
  console.log(inputDate)

  // Check if the input date is valid
  if (isNaN(inputDate.getTime())) {
      throw new Error("Invalid date string");
  }

  // Set the time to 11:59:59
  inputDate.setHours(23, 59, 59, 999);
  console.log(inputDate)
  // Return the result as an ISO string
  return inputDate.toISOString();
}




//check if an object is empty 


export const isObjectEmpty = (objectName) => (Object.keys(objectName).length === 0 && objectName.constructor === Object) 


export const getDateTimeString = (inputDate) => {
  // Check if inputDate is undefined or not a valid date string
  if (!inputDate || isNaN(new Date(inputDate).getTime())) {
    return '-'; // or handle it in a way that makes sense for your application
  }

  // Format the date
  const dateObject = new Date(inputDate);
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObject
  );

  return formattedDate;
}