/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const intro = "Welcome ! You are selected to be part of the first batch of astronauts going to mars. Experience the journey with your fellow astronauts filled with many challenges. Are you ready to embark on this exciting adventure !?"
const story = [
    "It’s been a year since you retired from the Space Federation and are now settled in Metropolis. It was a pleasant surprise as you were out for just another evening walk when you encountered your old friend, Professor Gilbert, from the Federation.\n\"Professor, it’s really nice to see you after so long. What brings you here to Metropolis today?\"\n\"I am currently a part of the team for our mission “A New Home” which is a team of 5 astronauts who will set up shelter and look for possible sources of fuel on Mars, and help begin the colonization of Mars. But we are still one short on the team. Which reminds me, you can be the perfect candidate for the mission. Your aerospace knowledge can really come in handy. What do you say, another mission, like the old times?\" You smile and shake hands with the Professor.You accepted the mission .\n You will be leading the team consisting of him, Professor Gilbert, Zack (the engineer), John (the astronaut), and Sara (the doctor). After going through rigorous training, the day of launch is tomorrow. The shuttle blasts off to space, and the journey begins. As soon as the rocket escapes the earth's atmosphere, one of its engines fails. You tell everyone to keep calm and send Zack ( the engineer ) to check if there is a way to get the engine back online. Zack informs you that the engine is completely blown off but using the one working engine, they can still reach mars but cannot take off again till the engine is repaired or replaced. You enter Mars's orbit. You are posed with the decision of whether to land on the poles of Mars or the equator of Mars.Make a quick decision: The Poles or the Equator." ,
    "\"Zack, set the coordinates for the poles, I think we have a better chance of surviving there.\"\nZack nods and goes into the cockpit to set in the coordinates. You have finally landed at the poles. The temperature outside is -50 degrees, skies filled with darkness, nothing but empty lands stretching for as far as you can see.\"All right guys! We have landed. Zack and John, stay back and try to repair the engine, while me, Sara and Professor go out to explore the terrain.\"\nYou decide to wear your protective suits and start exploring. You enter a cave. While exploring the cave, you find a strange transparent liquid flowing drop by drop from the top of a stone.\"I think you should stay away from the liquid as we don’t know what it is.\"\n\"Maybe it’s something dangerous, but maybe it’s something useful. Who knows? I better get some of it for research and we can run some tests back on the ship.\"\nDo you think you should take the Professor’s advice and stay away or collect some of it for research later? Make a choice: Take the Liquid back to Spaceship for research or Follow Professor’s advice and continue exploration."
    ]
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = intro;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const IntroIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IntroIntent';
    },
    handle(handlerInput) {
        const speakOutput = story[0];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a quick decision: The Poles or the Equator')
            .getResponse();
    }
};

const Pole_FirstHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Pole_First';
    },
    handle(handlerInput) {
        const speakOutput = story[1];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Take the Liquid back to Spaceship for research or Follow Professor’s advice and continue exploration')
            .getResponse();
    }
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        IntroIntentHandler,
        Pole_FirstHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();