function convertZodErrorToObject(error, message) {
  // Initialize an empty object to store field errors
  let errorsObject = {};

  // Iterate through each error in the errors array
//   error.errors.forEach((err) => {
//     // Extract the field name and message from the error
//     const fieldName = err.path[0];
//     const errorMessage = err.message;

    //using reduce 

    // err.path.reduce((previousItem,currentPath)=>{
    //   if(typeof currentPath === "string") previousItem[currentPath] = null 
    //   if(typeof currentPath === "number") prev
    //   return previousItem[currentPath]
    // },errorsObject)


    // Add the field name and message to the errors object
    // errorsObject[fieldName] = errorMessage;
//   });

    error.reduce((previousItem,currentPath)=>{
        console.log(previousItem,currentPath)
        console.log(errorsObject)
      if(typeof currentPath === "string") previousItem[currentPath] = null 
      if(typeof currentPath === "number") previousItem[currentPath] = []
      return currentPath
    },errorsObject)

  // Return the errors object
  return errorsObject;
}

let n1 = convertZodErrorToObject([
      "commissions",
      0,
      "commission"
    ]
    ,"Expected number, received string")

let n2 = convertZodErrorToObject([
      "commissions",
      0,
      "commission"
    ]
    ,"Expected number, received string")

let n3 = convertZodErrorToObject([
      "commissions",
      0,
      "commission"
    ]
    ,"Expected number, received string")

console.log(n1,n2,n3)