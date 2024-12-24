"use client";
import IntaSend from "intasend-node";

const intasend = new IntaSend(
  "ISPubKey_test_dc14d731-8062-4a15-b4bc-691c40a4f248",
  "ISSecretKey_test_d29c3e14-1c7c-4e93-9235-b098f33e4082",
  true // Test ? Set true for test environment
);

const collection = intasend.collection();
export default function Intasend() {
  function handlePayment() {
    collection
      .mpesaStkPush({
        first_name: "Joe",
        last_name: "Doe",

        email: "joe@doe.com",
        host: "http://localhost:3001/chats",
        amount: 10,
        phone_number: "254790670542",
        api_ref: "test",
      })
      .then((resp) => {
        // Redirect user to URL to complete payment
        console.log(`STK Push Resp:`, resp);
      })
      .catch((err) => {
        console.error(`STK Push Resp error:`, err);
      });
    fetch("https://payment.intasend.com/api/v1/[protected-resource", {
      Authorization: "ISSecretKey_test_d29c3e14-1c7c-4e93-9235-b098f33e4082",
    });
  }

  return <button onClick={handlePayment}>Pay now</button>;
}
