import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import ABUJA from "../images/disco-images/ABUJA.jpeg";
import IBADAN from "../images/disco-images/IBADAN.jpeg";
import KANO from "../images/disco-images/KANO.jpeg";
import YOLA from "../images/disco-images/YOLA.jpeg";
import BENIN from "../images/disco-images/BENIN.jpeg";
import IKEJA from "../images/disco-images/IKEJA.jpeg";
import PORTHACOURT from "../images/disco-images/PORTHACOURT.jpeg";
import EKO from "../images/disco-images/EKO.jpeg";
import JOS from "../images/disco-images/JOS.jpeg";
import WHATSAPP_IMAGE_1 from "../images/disco-images/WhatsApp Image 2023-12-14 at 14.06.48 (3).jpeg";
import ENUGU from "../images/disco-images/ENUGU.jpeg";
import KADUNA from "../images/disco-images/KADUNA.jpeg";
import PLUG from "../images/disco-images/plug.png";
 
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


export const getDiscoImage = (disco) => {
  const logos = {
      ABUJA,
      IBADAN,
      KANO,
      YOLA,
      BENIN,
      IKEJA,
      PORTHACOURT,
      EKO,
      JOS,
      ENUGU,
      KADUNA,
    };

  return logos[disco] ? logos[disco] : PLUG
}