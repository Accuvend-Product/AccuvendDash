import { CheckCircle2, XCircle } from "lucide-react";
/**
 * Checks if a specific event exists in the events array.
 * @param {Array} events - The array of events to search.
 * @param {string} event - The event type to check.
 * @returns {boolean} Returns true if the event exists in the events array, otherwise returns false.
 */
export const checkEventExist = (events, event) => {
  const _event = events?.filter((item) => item?.eventType === event);
  if (_event.length > 0) return true;
  else return false;
};

/**
 * Returns the first occurrence of an event in the events array that matches the specified event type.
 * @param {Array<Object>} events - An array of event objects to search through.
 * @param {string} event - The event type to search for.
 * @returns {Object} Returns the event object if found, otherwise returns an empty object.
 */

export const returnEventIfExist = (events , event) => {
    const _event = events?.filter((item) => item?.eventType === event);
    if (_event.length > 0) return  _event[0];
    else return {}
}

/**
* Function to determine background color based on previous and current state.
* @param {boolean} prevState - The previous state.
* @param {boolean} currentState - The current state.
* @returns {string} Returns the background color class.
*/
export const getBgColor = (prevState, currentState) => {
  console.log(prevState, currentState);
  if (!prevState) {
      return "bg-[#F7F7F7] text-gray-500";
  }
  if (!currentState) {
      return "bg-[#FFBF001A]";
  } else {
      return "bg-[#f0fbf5]";
  }
};

/**
* Function to get an icon component based on previous and current state.
* @param {boolean} prevState - The previous state.
* @param {boolean} currentState - The current state.
* @returns {React.Component} Returns an icon component.
*/
export const getIcon = (prevState, currentState) => {
  if (!prevState) {
      return (
          <>
              <span className="relative flex h-6 w-6 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-slate-300 opacity-50"></span>
                  <span className=" relative inline-flex rounded-full h-3 w-3 bg-slate-500"></span>
              </span>
          </>
      );
  }
  if (!currentState) {
      return (
          <>
              <span className="relative flex h-6 w-6 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffbb00] opacity-75"></span>
                  <span className="animate-pulse relative inline-flex rounded-full h-4 w-4 bg-[#ffbb00]"></span>
              </span>
          </>
      );
  } else {
      return <CheckCircle2 strokeWidth={"2.5px"} className="text-green-600" />;
  }
};

/**
* Function to get the status class based on the provided status.
* @param {string} status - The status value.
* @returns {string} Returns the status class for styling.
*/
export const getStatusClass = (status) => {
  let statusClass; 
  switch (status.toLowerCase()) {
      case "complete":
          statusClass = "bg-green-100 text-green-800 font-bold py-2 px-3  text-xs";
          break;
      case "failed":
          statusClass = "bg-red-100 text-red-800 font-bold py-2 px-3  text-xs";
          break;
      case "pending":
          statusClass = "bg-gray-100 text-black-800 font-bold py-2 px-3  text-xs";
          break;
      case "inprogress":
            statusClass = "bg-yellow-100 text-yellow-800 font-bold py-2 px-3  text-xs";
            break;
      default:
          statusClass = "bg-black text-white font-bold py-2 px-3  text-xs";
  }
  return statusClass;
}

/**
 * Formats a timestamp into a readable date or time string.
 * @param {string} _date - The timestamp to format.
 * @param {string} type - The type of formatting ('date' for date only, 'time' for time only).
 * @returns {string} Returns the formatted date or time string.
 */

export const formatTimeStamp = (_date , type) => {
  let date = new Date();
  try {
      date = new Date(_date);
  } catch (err) {
      // Handle invalid date format gracefully
      return ''
  }
  const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
  };
  if(type === 'time') {
    delete options.month
    delete options.day
    delete options.year
  }

  if(type === 'date') {
    delete options.hour
    delete options.minute
    delete options.seconds
  }

  try{
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    return formattedDate;
  }catch(err){
    return ''
  }
  
}