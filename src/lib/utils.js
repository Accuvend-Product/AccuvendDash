import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import ABUJA from "../images/biller-images/ABUJA.jpeg";
import IBADAN from "../images/biller-images/IBADAN.jpeg";
import KANO from "../images/biller-images/KANO.jpeg";
import YOLA from "../images/biller-images/YOLA.jpeg";
import BENIN from "../images/biller-images/BENIN.jpeg";
import IKEJA from "../images/biller-images/IKEJA.jpeg";
import PORTHARCOURT from "../images/biller-images/PORTHARCOURT.jpeg";
import EKO from "../images/biller-images/EKO.jpeg";
import JOS from "../images/biller-images/JOS.jpeg";
import ENUGU from "../images/biller-images/ENUGU.jpeg";
import KADUNA from "../images/biller-images/KADUNA.jpeg";
import PLUG from "../images/biller-images/plug.png";
import ABA from "../images/biller-images/ABA.png";
import MTN from "../images/biller-images/MTN.png";
import _9MOBILE from "../images/biller-images/9MOBILE.png";
import GLO from "../images/biller-images/GLO.png";
import AIRTEL from "../images/biller-images/AIRTEL.png";
 
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


export const getBillerImage = (biller) => {
  const logos = {
      ABUJA,
      IBADAN,
      KANO,
      YOLA,
      BENIN,
      IKEJA,
      PORTHARCOURT,
      EKO,
      JOS,
      ENUGU,
      KADUNA,
      ABA, 
      GLO, 
      "9MOBILE": _9MOBILE,
      MTN,
      AIRTEL
    };
  return logos[biller] ? logos[biller] : PLUG
}

export function convertZodErrorToObject(error) {
  // Initialize an empty object to store field errors
  const errorsObject = {};

  // Iterate through each error in the errors array
  error.errors.forEach((err) => {
    // Extract the field name and message from the error
    const fieldName = err.path[0];
    const errorMessage = err.message;

    // Add the field name and message to the errors object
    errorsObject[fieldName] = errorMessage;
  });

  // Return the errors object
  return errorsObject;
}

// export checkIfStringIsNumber() 




/**
 * Calculates the duration between two timestamps in seconds, minutes, and hours.
 * @param {string} startTime - The start timestamp in ISO 8601 format.
 * @param {string} endTime - The end timestamp in ISO 8601 format.
 * @returns {string} A string representation of the duration in hours, minutes, or seconds.
 */
export function calculateDuration(startTime, endTime) {
  // Convert timestamps to Date objects
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  // Calculate the difference in milliseconds
  const duration = endDate - startDate;

  // Convert milliseconds to seconds, minutes, and hours
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(duration / (1000 * 60));
  const hours = Math.floor(duration / (1000 * 60 * 60));

  if(hours > 0) return `${hours} hrs`;
  if(minutes > 0) return `${minutes} mins`;
  return `${seconds} secs`;
}



export function generateCSVContent (headers, items , valuefunction = (value , key) => value){
  let str  = ''
  //generate the headers 
  for(let header in headers){
    str += header + ','
  }
  str += '\r\n';


  //generating body 
  for(let item of items){
    for(let header in headers){ 
      if(valuefunction === null){
        str += item[header] + ','
      }else {
        str += valuefunction(item[header],header) + ','
      }
    }
    str += '\r\n'
  }
   
  return str
}

// content is a string
export function exportCSVFile(fileTitle , content , htmLlink , reactLinkRef) {
  

  var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  var blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
      if(!link && !reactLinkRef ) var link = document.createElement("a");
      else var link = htmLlink
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilenmae);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}