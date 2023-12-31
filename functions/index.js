/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

/** /const {onRequest} = require("firebase-functions/v2/https");
/** const logger = require("firebase-functions/logger");*/

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe =require("stripe")("sk_test_51Ny5oMCllkDjlmChIpoaEuj3r60VnQjlt2xUKRNbaMHxAu14mvfMPXLblDrpHpdzMVPYfmhbGGg5HB6TnXLD5Lg800flIXCN8N");


//API
// App config
const app = express();

//Middlewares
app.use(cors({origin: true}));
app.use(express.json());


//API routes


app.get("/", (request, response) => response.status(200).send("Hello World!"));


app.post("/payments/create", async (request, response) => {
const total = request.query.total;
console.log("payment request recieved boom!!! for this amount >>> ", total);
const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "pkr",
    });

    // ok created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })

});




// listen command

exports.api = functions.https.onRequest(app);

//example endpoint
// http://127.0.0.1:5001/alAmayas-12/us-central1/api
