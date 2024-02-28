import React, { useState, useEffect , useRef } from "react";

const OTPInput = (props) => {
  const [inputValues, setInputValues] = useState(
    props.value ? Array.from(props.value) : []
  );
  useEffect(() => {
    if (props.onChange) props.onChange(inputValues.join(""));
  }, [inputValues]);
  const otpReferences = useRef([]);
  const inputLength = 6
  return (
    <>
      <div className="flex justify-center mb-2 space-x-2 rtl:space-x-reverse">
        {Array.from({ length: inputLength }, (value, index) => value).map((_, index) => (
          <div>
            <input
              key={index}
              onKeyUp={(event) => {
                if(event.target.value && index < inputLength - 1){
                  otpReferences.current[index + 1].focus()
                }
              }}  
              ref={(reference) => (otpReferences.current[index] = reference)}
              onKeyDown={(event) => {

                if(event.key === "Backspace" && !event.target.value && index > 0){
                  otpReferences.current[index - 1].focus()
                }
                if(event.key === "Enter" && event.target.value && index < inputLength - 1){
                  otpReferences.current[index + 1].focus()
                }
                
                if (index === 0) {
                  console.log(event.key , event.ctrlKey||event.metaKey)
                  if (
                    (event.ctrlKey||event.metaKey) &&
                    (event.key === "v" || event.key === "V")
                  ) {
                  console.log(index)
                    navigator.clipboard
                      .readText()
                      .then((text) => {
                        setInputValues(Array.from(text)?.filter((item)=> !isNaN(item) ))
                      })
                      .catch((err) => {
                        console.error(
                          "Failed to read clipboard contents: ",
                          err
                        );
                      });
                      otpReferences.current[inputLength - 1].focus()
                  }
                }
              }}
              onChange={(e) => {
                const item = [...inputValues];
                item[index] = e.target.value;
                setInputValues(item);
              }}
              value={inputValues[index]}
              type="text"
              maxlength="1"
              id="code-1"
              className="block w-12 h-12 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
          </div>
        ))}
      </div>
      {/* <p
        id="helper-text-explanation"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400"
      >
        Please introduce the 6 digit code we sent via email.
      </p> */}
    </>
  );
};

export default OTPInput;
