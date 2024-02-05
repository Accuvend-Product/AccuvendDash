export const METER_VALIDATION_REQUEST_SENT_TO_VENDOR = "METER_VALIDATION_REQUEST_SENT_TO_VENDOR";
export const METER_VALIDATION_RECIEVED_FROM_VENDOR = "METER_VALIDATION_RECIEVED_FROM_VENDOR";
export const METER_VALIDATION_SENT_PARTNER = "METER_VALIDATION_SENT_PARTNER";
export const CREATE_USER_INITIATED = "CREATE_USER_INITIATED";
export const CREATE_USER_CONFIRMED = "CREATE_USER_CONFIRMED";
export const CHECK_DISCO_UP_INITIATED_TO_VENDOR = "CHECK_DISCO_UP_INITIATED_TO_VENDOR";
export const CHECK_DISCO_UP_CONFIRMED_FROM_VENDOR = "CHECK_DISCO_UP_CONFIRMED_FROM_VENDOR";
export const POWER_PURCHASE_INITIATED_BY_CUSTOMER = "POWER_PURCHASE_INITIATED_BY_CUSTOMER";
export const VEND_ELECTRICITY_REQUESTED_FROM_VENDOR = "VEND_ELECTRICITY_REQUESTED_FROM_VENDOR";
export const TOKEN_RECIEVED_FROM_VENDOR = "TOKEN_RECIEVED_FROM_VENDOR";
export const TOKEN_REQUEST_FAILED = "TOKEN_REQUEST_FAILED";
export const TOKEN_REQUEST_TIMEDOUT = "TOKEN_REQUEST_TIMEDOUT";
export const TOKEN_REQUEST_SUCCESS_WITH_NO_TOKEN = "TOKEN_REQUEST_SUCCESS_WITH_NO_TOKEN";
export const POWER_PURCHASE_INITIATED_BY_CUSTOMER_REQUERY = "POWER_PURCHASE_INITIATED_BY_CUSTOMER_REQUERY";
export const GET_TRANSACTION_TOKEN_FROM_VENDOR_INITIATED = "GET_TRANSACTION_TOKEN_FROM_VENDOR_INITIATED";
export const GET_TRANSACTION_TOKEN_FROM_VENDOR_RETRY = "GET_TRANSACTION_TOKEN_FROM_VENDOR_RETRY";
export const GET_TRANSACTION_TOKEN_REQUESTED_FROM_VENDOR = "GET_TRANSACTION_TOKEN_REQUESTED_FROM_VENDOR";
export const TOKEN_SENT_TO_PARTNER = "TOKEN_SENT_TO_PARTNER";
export const TOKEN_SENT_TO_PARTNER_RETRY = "TOKEN_SENT_TO_PARTNER_RETRY";
export const TOKEN_SENT_TO_EMAIL = "TOKEN_SENT_TO_EMAIL";
export const TOKEN_SENT_TO_NUMBER = "TOKEN_SENT_TO_NUMBER";
export const PARTNER_TRANSACTION_COMPLETE = "PARTNER_TRANSACTION_COMPLETE";
export const WEBHOOK_NOTIFICATION_SENT_TO_PARTNER = "WEBHOOK_NOTIFICATION_SENT_TO_PARTNER";
export const WEBHOOK_NOTIFICATION_CONFIRMED_FROM_PARTNER = "WEBHOOK_NOTIFICATION_CONFIRMED_FROM_PARTNER";
export const WEBHOOK_NOTIFICATION_TO_PARTNER_RETRY = "WEBHOOK_NOTIFICATION_TO_PARTNER_RETRY";
export const RETRY_PURCHASE_FROM_NEW_VENDOR = "RETRY_PURCHASE_FROM_NEW_VENDOR"


  
// (%vendor% and %partner%)
export const eventsObjectHeadingsDscription = {
    "METER_VALIDATION_REQUEST_SENT_TO_VENDOR": {
    //   heading: "Meter Validation Request Sent to Vendor",
        heading: "We've sent a request to validate the meter with %vendor% ",
      description: "Our system initiated the process to ensure accurate meter validation with %vendor%",
      failedStateDescription: "Uh-oh! The attempt to send the meter validation to request to the %vendor% failed. We're investigating the issue to resolve it promptly.",
    },
    "METER_VALIDATION_RECIEVED_FROM_VENDOR": {
      heading: "Meter validation details received from %vendor% ",
      description: " We've successfully received and processed the meter validation information from %vendor%.",
      failedStateDescription: "Oops! There was an issue while receiving meter validation details from the %vendor%. We're actively working on resolving this hiccup.",
    },
    "METER_VALIDATION_SENT_PARTNER": {
      heading: "Meter validation results shared with %partner% ",
      description: " We've informed %partner% about the outcome of the meter validation process.",
      failedStateDescription: "Alert! The attempt to send meter validation results to %partner% failed. We're investigating and addressing the issue for a smooth process.",
    },
    "CREATE_USER_INITIATED": {
      heading: "User creation is underway",
      description: "We've kicked off the process to create a new user in our system.",
      failedStateDescription: "Oops! Something went wrong during the initiation of user creation. We're on it and working to fix the issue promptly.",
    },
    "CREATE_USER_CONFIRMED": {
      heading: "New user creation confirmed.",
      description: "Success! The creation of a new user has been successfully confirmed in our system.",
      failedStateDescription: "Alert! Confirmation of new user creation encountered an issue. We're actively investigating and resolving the confirmation hiccup.",
    },
    "CHECK_DISCO_UP_INITIATED_TO_VENDOR": {
      heading: "We're initiating a check for connection to disco with the %vendor%.",
      description: "Ensuring our systems can vend for %disco% from %vendor% ",
      failedStateDescription: "Uh-oh! The attempt to initiate a disconnection check with the vendor failed. We're addressing the issue for a seamless process.",
    },
    "CHECK_DISCO_UP_CONFIRMED_FROM_VENDOR": {
      heading: "Disco connection status confirmed by %vendor%.",
      description: "Our vendor has confirmed the succesful connection status for %disco% from %vendor%  ",
      failedStateDescription: "Alert! Confirmation of %disco% connection status from the %vendor% failed. We're actively investigating and resolving the confirmation hiccup.",
    },
    "POWER_PURCHASE_INITIATED_BY_CUSTOMER": {
      heading: "Customer's power purchase journey has begun.",
      description: "%partner% has initiated the process to purchase power through our platform.",
      failedStateDescription: "Uh-oh! The initiation of the power purchase process encountered an issue. We're actively working on resolving this hiccup.",
    },
    "VEND_ELECTRICITY_REQUESTED_FROM_VENDOR": {
      heading: "Request sent to %vendor%  for electricity purchase.",
      description: " We've asked our %vendor%  to fulfill the customer's request for electricity purchase.",
      failedStateDescription: "Alert! The request to the %vendor%  for electricity purchase encountered an issue. We're actively investigating and resolving the request hiccup.",
    },
    "TOKEN_RECIEVED_FROM_VENDOR": {
      heading: "Meter token received from the %vendor% .",
      description: " We've successfully obtained a meter token from  %vendor% .",
      failedStateDescription: "Oops! The token from the %vendor%  encountered an issue. We're actively investigating and resolving the hiccup.",
    },
    "TOKEN_REQUEST_FAILED": {
      heading: "Oops! Token Request Failed",
      description: "Unfortunately, we encountered an issue while trying to get the meter token from %vendor% .",
      failedStateDescription: "Oops! The attempt to request an authentication token failed. We're investigating the issue to resolve it promptly.",
    },
    "TOKEN_REQUEST_TIMEDOUT": {
      heading: "Time's Up! Token Request Timed Out",
      description: "The request for an authentication token took longer than expected, and it timed out. Let's give it another shot.",
      failedStateDescription: "Uh-oh! The request for an authentication token timed out. We're actively working on resolving this timeout issue.",
    },
    "TOKEN_REQUEST_SUCCESS_WITH_NO_TOKEN": {
      heading: "Success, but No Token Received from %vendor% ",
      description: "We successfully requested an meter token, but unfortunately, none was received from %vendor%",
      failedStateDescription: "Alert! The successful request for an authentication token did not result in receiving a token. We're actively investigating and resolving the issue.",
    },
    "POWER_PURCHASE_INITIATED_BY_CUSTOMER_REQUERY": {
      heading: "We are Reinitiates Power Purchase from %vendor%",
      description: "We are giving it another go, restarting the power purchase process from %vendor%.",
      failedStateDescription: "Oops! The customer's attempt to reinitiate the power purchase process encountered an issue. We're actively working on resolving this hiccup.",
    },
    "GET_TRANSACTION_TOKEN_FROM_VENDOR_INITIATED": {
      heading: "We've begun the process of obtaining a transaction token from %vendor% .",
      description: "Ensuring a secure and smooth transaction.",
      failedStateDescription: "Uh-oh! The attempt to initiate the retrieval of a transaction token from the %vendor%  failed. We're investigating the issue to resolve it promptly.",
    },
    "GET_TRANSACTION_TOKEN_FROM_VENDOR_RETRY": {
      heading: "Let's Try Again! Retry Transaction Token Retrieval from %vendor% ",
      description: "We're giving it another shot to retrieve the Meter token from %vendor% ",
      failedStateDescription: "Oops! The retry attempt to retrieve the Meter token from the vendor encountered an issue. We're actively working on resolving this hiccup.",
    },
    "GET_TRANSACTION_TOKEN_REQUESTED_FROM_VENDOR": {
      heading: "Meter token Requested from %vendor%",
      description: "We've asked %vendor% for the necessary Meter token.",
      failedStateDescription: "Alert! The request for a Meter token from the vendor encountered an issue. We're actively investigating and resolving the request hiccup.",
    },
    "TOKEN_SENT_TO_PARTNER": {
      heading: "Meter Token Sent to Partner",
      description: "We've securely transmitted the authentication token to our valued %partner&. Ensuring secure communication.",
      failedStateDescription: "Oops! The attempt to send the authentication token to our %partner% failed. We're investigating the issue to ensure secure communication.",
    },
    "TOKEN_SENT_TO_PARTNER_RETRY": {
      heading: "Oops, Let's Resend That! Retrying Token Transmission to %partner%",
      description: "We're making sure %partner% receives the authentication token successfully. Let's ensure a smooth collaboration.",
      failedStateDescription: "Uh-oh! The retry attempt to send the authentication token to %partner% failed. We're actively working on resolving this hiccup.",
    },
    "TOKEN_SENT_TO_EMAIL": {
      heading: "Authentication Token Sent to User's email",
      description: "We've sent the authentication token directly to user's email address. Keep an eye on your inbox!",
      failedStateDescription: "Uh-oh! The attempt to send the authentication token to your email address failed. We're investigating the issue to ensure timely delivery.",
    },
    "TOKEN_SENT_TO_NUMBER": {
      heading: "Authentication Token Sent to User's Number",
      description: "Your authentication token is en route to your phone number. Keep your phone handy!",
      failedStateDescription: "Oops! The attempt to send the authentication token to your phone number failed. We're actively working on resolving this hiccup.",
    },
    "PARTNER_TRANSACTION_COMPLETE": {
      heading: "Transaction with  %partner% Successfully Completed",
      description: "We've successfully concluded a transaction with %partner% .",
      failedStateDescription: "Oops! The attempt to complete a transaction with our partner encountered an issue. We're actively investigating and resolving the completion hiccup.",
    },
    "WEBHOOK_NOTIFICATION_SENT_TO_PARTNER": {
      heading: "Partner, Heads Up! We've Sent a Webhook Notification Your Way",
      description: "We've shared important information with our partner through a webhook notification. Ensuring real-time updates.",
      failedStateDescription: "Uh-oh! The attempt to send a webhook notification to our partner failed. We're investigating and addressing the issue for real-time collaboration.",
    },
    "WEBHOOK_NOTIFICATION_CONFIRMED_FROM_PARTNER": {
      heading: "Confirmation Received! Partner Acknowledged Our Webhook Notification",
      description: "Our partner has confirmed the receipt and understanding of our webhook notification. Collaboration at its best!",
      failedStateDescription: "Alert! Confirmation of our partner's acknowledgment of the webhook notification encountered an issue. We're actively investigating and resolving the confirmation hiccup.",
    },
    "WEBHOOK_NOTIFICATION_TO_PARTNER_RETRY": {
      heading: "Let's Try Again! Retrying Webhook Notification to Partner",
      description: "We're ensuring that our partner receives the webhook notification successfully. Real-time collaboration is key!",
      failedStateDescription: "Oops! The retry attempt to send a webhook notification to our partner failed. We're actively working on resolving this hiccup.",
    },
    "RETRY_PURCHASE_FROM_NEW_VENDOR": {
      heading: "Let's Give It Another Shot! Retrying the Purchase Process with a New vendor, %vendor%",
      description: "We're restarting the purchase process with a different, %vendor% for better results",
      failedStateDescription: "Uh-oh! The attempt to retry the purchase process with a new vendor encountered an issue. We're actively working on resolving this hiccup.",
    },
  };
  