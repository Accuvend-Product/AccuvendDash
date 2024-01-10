import React,{useState, useEffect} from 'react'

const OTPInput = (props) => {

  const [inputValues, setInputValues] = useState(props.value ? Array.from(props.value) : [])
  useEffect(()=>{
    if(props.onChange)props.onChange(inputValues.join(""))
  },[inputValues])
  return (
    <>
    <div class="flex mb-2 space-x-2 rtl:space-x-reverse">
        
        {Array.from({ length: 7 }, (value, index) => value).map((_,index) => <div>
            <input onChange={(e)=>{
                const item = [...inputValues]
                item[index] = e.target.value
                setInputValues(item)
            }} value={inputValues[index]} type="text" maxlength="1" id="code-1" class="block w-12 h-12 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required/>
        </div>)}
        
    </div>
    <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Please introduce the 6 digit code we sent via email.</p>
  </>
  )
}

export default OTPInput