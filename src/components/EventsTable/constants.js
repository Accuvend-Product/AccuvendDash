export const METER_VALIDATION_REQUEST_SENT_TO_VENDOR =
  "METER_VALIDATION_REQUEST_SENT_TO_VENDOR";
export const METER_VALIDATION_RECIEVED_FROM_VENDOR =
  "METER_VALIDATION_RECIEVED_FROM_VENDOR";
export const METER_VALIDATION_SENT_PARTNER = "METER_VALIDATION_SENT_PARTNER";
export const CREATE_USER_INITIATED = "CREATE_USER_INITIATED";
export const CREATE_USER_CONFIRMED = "CREATE_USER_CONFIRMED";
export const CHECK_DISCO_UP_INITIATED_TO_VENDOR =
  "CHECK_DISCO_UP_INITIATED_TO_VENDOR";
export const CHECK_DISCO_UP_CONFIRMED_FROM_VENDOR =
  "CHECK_DISCO_UP_CONFIRMED_FROM_VENDOR";
export const POWER_PURCHASE_INITIATED_BY_CUSTOMER =
  "POWER_PURCHASE_INITIATED_BY_CUSTOMER";
export const VEND_ELECTRICITY_REQUESTED_FROM_VENDOR =
  "VEND_ELECTRICITY_REQUESTED_FROM_VENDOR";
export const TOKEN_RECIEVED_FROM_VENDOR = "TOKEN_RECIEVED_FROM_VENDOR";
export const TOKEN_REQUEST_FAILED = "TOKEN_REQUEST_FAILED";
export const TOKEN_REQUEST_TIMEDOUT = "TOKEN_REQUEST_TIMEDOUT";
export const TOKEN_REQUEST_SUCCESS_WITH_NO_TOKEN =
  "TOKEN_REQUEST_SUCCESS_WITH_NO_TOKEN";
export const POWER_PURCHASE_INITIATED_BY_CUSTOMER_REQUERY =
  "POWER_PURCHASE_INITIATED_BY_CUSTOMER_REQUERY";
export const GET_TRANSACTION_TOKEN_FROM_VENDOR_INITIATED =
  "GET_TRANSACTION_TOKEN_FROM_VENDOR_INITIATED";
export const GET_TRANSACTION_TOKEN_FROM_VENDOR_RETRY =
  "GET_TRANSACTION_TOKEN_FROM_VENDOR_RETRY";
export const GET_TRANSACTION_TOKEN_REQUESTED_FROM_VENDOR =
  "GET_TRANSACTION_TOKEN_REQUESTED_FROM_VENDOR";
export const TOKEN_SENT_TO_PARTNER = "TOKEN_SENT_TO_PARTNER";
export const TOKEN_SENT_TO_PARTNER_RETRY = "TOKEN_SENT_TO_PARTNER_RETRY";
export const TOKEN_SENT_TO_EMAIL = "TOKEN_SENT_TO_EMAIL";
export const TOKEN_SENT_TO_NUMBER = "TOKEN_SENT_TO_NUMBER";
export const PARTNER_TRANSACTION_COMPLETE = "PARTNER_TRANSACTION_COMPLETE";
export const WEBHOOK_NOTIFICATION_SENT_TO_PARTNER =
  "WEBHOOK_NOTIFICATION_SENT_TO_PARTNER";
export const WEBHOOK_NOTIFICATION_CONFIRMED_FROM_PARTNER =
  "WEBHOOK_NOTIFICATION_CONFIRMED_FROM_PARTNER";
export const WEBHOOK_NOTIFICATION_TO_PARTNER_RETRY =
  "WEBHOOK_NOTIFICATION_TO_PARTNER_RETRY";
export const RETRY_PURCHASE_FROM_NEW_VENDOR = "RETRY_PURCHASE_FROM_NEW_VENDOR";

// (%vendor% and %partner%)
export const eventsObjectHeadingsDscription = {
  METER_VALIDATION_REQUEST_SENT_TO_VENDOR: {
    heading: "We've sent a request to validate the meter with %vendor% ",
    description:
      "Our system initiated the process to ensure accurate meter validation with %vendor%",
    failedStateDescription:
      "The attempt to send the meter validation to request to the %vendor% failed.",
  },
  METER_VALIDATION_RECIEVED_FROM_VENDOR: {
    heading: "Meter validation details received from %vendor% ",
    description:
      " We've successfully received and processed the meter validation information from %vendor%.",
    failedStateDescription:
      "There was an issue while receiving meter validation details from the %vendor%.",
  },
  METER_VALIDATION_SENT_PARTNER: {
    heading: "Meter validation results shared with %partner% ",
    description:
      " We've informed %partner% about the outcome of the meter validation process.",
    failedStateDescription:
      "The attempt to send meter validation results to %partner% failed.",
  },
  CREATE_USER_INITIATED: {
    heading: "User creation is underway",
    description:
      "We've kicked off the process to create a new user in our system.",
    failedStateDescription:
      "Something went wrong during the initiation of user creation.",
  },
  CREATE_USER_CONFIRMED: {
    heading: "New user creation confirmed.",
    description:
      "Success! The creation of a new user has been successfully confirmed in our system.",
    failedStateDescription:
      "Confirmation of new user creation encountered an issue.",
  },
  CHECK_DISCO_UP_INITIATED_TO_VENDOR: {
    heading:
      "We're initiating a check for connection to disco with the %vendor%.",
    description: "Ensuring our systems can vend for %disco% from %vendor% ",
    failedStateDescription:
      "The attempt to initiate a disconnection check with the vendor failed.",
  },
  CHECK_DISCO_UP_CONFIRMED_FROM_VENDOR: {
    heading: "Disco connection status confirmed by %vendor%.",
    description:
      "Our vendor has confirmed the succesful connection status for %disco% from %vendor%  ",
    failedStateDescription:
      "Alert! Confirmation of %disco% connection status from the %vendor% failed. We're actively investigating and resolving the confirmation hiccup.",
  },
  POWER_PURCHASE_INITIATED_BY_CUSTOMER: {
    heading: "%partner% has initiated the process to purchase power through our platform.",
    description:
      "%partner% has initiated the process to purchase power through our platform.",
    failedStateDescription:
      "The initiation of the power purchase by %partner%  process encountered an issue.",
  },
  VEND_ELECTRICITY_REQUESTED_FROM_VENDOR: {
    heading: "Request sent to %vendor%  for electricity purchase.",
    description:
      " We've asked our %vendor%  to fulfill the customer's request for electricity purchase.",
    failedStateDescription:
      "The request to the %vendor%  for electricity purchase encountered an issue.",
  },
  TOKEN_RECIEVED_FROM_VENDOR: {
    heading: "Meter token received from the %vendor% .",
    description: " We've successfully obtained a meter token from  %vendor% .",
    failedStateDescription:
      "The recieving the meter token from the %vendor%  encountered an issue.",
  },
  TOKEN_REQUEST_FAILED: {
    heading: "Oops! Token Request Failed",
    description:
      "we encountered an issue while trying to get the meter token from %vendor% .",
    failedStateDescription:
      "The attempt to request an meter token failed.",
  },
  TOKEN_REQUEST_TIMEDOUT: {
    heading: "Time's Up! Token Request Timed Out",
    description:
      "The request for an meter token timed out.",
    failedStateDescription:
      "The request for a meter token took longer than expected.",
  },
  TOKEN_REQUEST_SUCCESS_WITH_NO_TOKEN: {
    heading: "Success, but No Token Received from %vendor% ",
    description:
      "We successfully requested an meter token, but unfortunately, none was received from %vendor%",
    failedStateDescription:
      "The successful request for an meter token did not result in receiving a token",
  },
  POWER_PURCHASE_INITIATED_BY_CUSTOMER_REQUERY: {
    heading: "We are Reinitiates Power Purchase from %vendor%",
    description:
      "We are giving it another go, restarting the power purchase process from %vendor%.",
    failedStateDescription:
      "The attempt to reinitiate the power purchase process encountered an issue",
  },
  GET_TRANSACTION_TOKEN_FROM_VENDOR_INITIATED: {
    heading:
      "We've begun the process of obtaining a transaction token from %vendor% .",
    description: "Ensuring a secure and smooth transaction.",
    failedStateDescription:
      "The attempt to initiate the retrieval of a transaction token from the %vendor%  failed.",
  },
  GET_TRANSACTION_TOKEN_FROM_VENDOR_RETRY: {
    heading:
      "Let's Try Again! Retry Transaction Token Retrieval from %vendor% ",
    description:
      "We're giving it another shot to retrieve the Meter token from %vendor% ",
    failedStateDescription:
      "The retry attempt to retrieve the Meter token from the %vendor% encountered an issue.",
  },
  GET_TRANSACTION_TOKEN_REQUESTED_FROM_VENDOR: {
    heading: "Meter token Requested from %vendor%",
    description: "We've asked %vendor% for the necessary Meter token.",
    failedStateDescription:
      "The request for a Meter token from the %vendor% encountered an issue.",
  },
  TOKEN_SENT_TO_PARTNER: {
    heading: "Meter Token Sent to %Partner%",
    description:
      "We've securely sent the meter token to  %partner%.",
    failedStateDescription:
      "The attempt to send the meter token to %partner% failed. ",
  },
  TOKEN_SENT_TO_PARTNER_RETRY: {
    heading:
      "Oops, Let's Resend That! Retrying Token Transmission to %partner%",
    description:
      "We're making sure %partner% receives the meter token successfully.",
    failedStateDescription:
      "The retry attempt to send the meter token to %partner% failed.",
  },
  TOKEN_SENT_TO_EMAIL: {
    heading: "Meter Token Sent to User's email",
    description:
      "We've sent the meter token directly to user's email address.",
    failedStateDescription:
      "The attempt to send the meter token to your email address failed.",
  },
  TOKEN_SENT_TO_NUMBER: {
    heading: "Meter Token Sent to User's Number",
    description:
      "Your meter token is en route to your phone number.",
    failedStateDescription:
      "The attempt to send the meter token to your phone number failed.",
  },
  PARTNER_TRANSACTION_COMPLETE: {
    heading: "Transaction with  %partner% Successfully Completed",
    description: "We've successfully concluded a transaction with %partner% .",
    failedStateDescription:
      "The attempt to complete a transaction with %partner% encountered an issue.",
  },
  WEBHOOK_NOTIFICATION_SENT_TO_PARTNER: {
    heading: "We've Sent a Webhook Notification to %partner%",
    description:
      "We've shared important information with our partner through a webhook notification.",
    failedStateDescription:
      "The attempt to send a webhook notification to our %partner% failed.",
  },
  WEBHOOK_NOTIFICATION_CONFIRMED_FROM_PARTNER: {
    heading:
      "Confirmation Received! %Partner% Acknowledged Our Webhook Notification",
    description:
      "Our partner has confirmed the receipt and understanding of our webhook notification. Collaboration at its best!",
    failedStateDescription:
      "Confirmation of our partner's acknowledgment of the webhook notification encountered an issue.",
  },
  WEBHOOK_NOTIFICATION_TO_PARTNER_RETRY: {
    heading: "Retrying Webhook Notification to %Partner%",
    description:
      "We're ensuring that our %partner% receives the webhook notification successfully.",
    failedStateDescription:
      "The retry attempt to send a webhook notification to %partner% failed.",
  },
  RETRY_PURCHASE_FROM_NEW_VENDOR: {
    heading:
      "Retrying the Purchase Process with a New vendor, %vendor%",
    description:
      "We're restarting the purchase process with a different, %vendor% for better results",
    failedStateDescription:
      "The attempt to retry the purchase process with a new vendor encountered an issue.",
  },
};
