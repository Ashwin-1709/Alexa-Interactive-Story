/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const intro = "Welcome! You are selected to be part of the first batch of astronauts going to Pluto. Experience the journey with your fellow astronauts filled with many challenges. Are you ready to embark on this exciting adventure?!"
const story = [
    "\nIt’s been a year since you retired from the Space Federation and are now settled in Metropolis. It was a pleasant surprise as you were out for just another evening walk when you encountered your old friend, Professor Gilbert, from the Federation." ,
    "\nYou smile and shake hands with the Professor. You accepted the mission.\n After taking the proposal, you return to the Space Federation to train for the mission. You will be leading the team consisting of yourself, Professor Gilbert, Zack (The Engineer), John (The Astronaut), and Sara (The Doctor). After going through rigorous training, the day of the launch is tomorrow. The shuttle blasts off to space, and the journey begins. As soon as the rocket escapes the Earth's atmosphere, one of its engines fails. You tell everyone to keep calm and send Zack to check if there is a way to get the engine back online. Zack informs you that the engine is completely blown off but using the one working engine, they can still reach Pluto but cannot take off again till the engine is repaired or replaced. You enter Pluto's orbit. You are posed with the decision of whether to land on the sandy dunes or the valley of mountains.\nMake a decision: The Sandy Dunes\n or\n the The Valley of Mountains." ,
    "\nZack nods and goes into the cockpit to set in the coordinates. You have finally landed in the valley. The temperature outside is -50 degrees, skies filled with darkness, nothing but empty lands stretching for as far as you can see.",
    "\nYou decide to wear your protective suits and start exploring. You enter a cave. While exploring the cave, you find a strange transparent crystal emitting fumes near the top of a stone." ,
    "\nDo you think you should take the Professor’s advice and stay away or collect some of it for research later?\n Take a choice: Take the crystal back to the spaceship for research\n or\n Follow the Professor’s advice and continue exploration." ,
    "\nYou decide to take a sample of the crystal. While trying to store the crystal in a container, you accidentally break the container exposing the crystal fumes to your suit. The fumes are corrosive and burn through your suit, exposing your skin to -50 degree temperature resulting in serious frostbite.",
    "\nSara collects another sample of the crystal to bring it back to the ship. Do you think you have enough time to reach the ship or it would be better to amputate your hand and not risk the mission.\n Make a decision:  Try making it back to the ship before the frostbite spreads\n or\n Amputate your hand to prevent the frostbite from spreading." , 
    "\nSara proceeds with the amputation to prevent the frostbite spread. After fighting the strong and cold winds of the poles, the team finally gets back to the spaceship. Meanwhile, the Professor begins experiments on the crystal.", 
    "\nThe team quickly builds a shelter and gets to work on making the heater with the space fuel. With an energy and water source in place, now you can start growing food too! The soil of Pluto is rich in minerals, and the melted ice caps provide sufficient water for irrigation. With the mission's objectives met, you have successfully completed your mission, and you call upon more people to come and inhabit Pluto! Congratulations, you have completed one of the eight possible endings!"
    ]
const protagonist = [
    "\n\"Professor, it’s really nice to see you after so long. What brings you here to Metropolis today?\"" ,
    "\n\"Zack, set the coordinates for the valley. I think we have a better chance of surviving there.\"",
    "\n\"All right guys! We have landed. Zack and John, stay back and try to repair the engine, while me, Sara and Professor go out to explore the terrain.\"",
    "\n\"Maybe it’s something dangerous, but maybe it’s something useful! Who knows?! I better get some of it for research and we can run some tests back on the ship.\"" , 
    "\n\"Ahhh! My hand is becoming numb.\"", 
    "\n\"No! I cannot risk the mission. Sara, go ahead, amputate it.\"", 
    "\n\"And why is that Professor?\""
    ]
const professor = [
    "\n\"I am currently a part of the team for our mission, 'A New Home' which is a team of 5 astronauts who will set up shelter, look for possible sources of fuel, and help begin the colonization of Pluto. But we are still one short on the team. Which reminds me, you can be the perfect candidate for the mission. Your aerospace knowledge and your experience can really come in handy. What do you say, another mission, like the old times?\"",
    "\n\"I think you should stay away from the crystal as we don’t know what it is. Those fumes look dangerous.\"",
    "\n\"Well, I guess I should thank you, captain, for going ahead with getting this crystal for research.\"" ,
    "\n\"This fumes emitted by the crystal have a very high calorific value, almost similar to the fuel we use on our ship! We can even use it to heat the water and melt the polar ice caps. I suppose we should set up a shelter after making a heater to keep us warm and then set it up to melt the ice and snow for water.\""    
    ]
const sara = [
    "\n\"Wait! Don’t panic! I have something in my first aid kit that may help temporarily, but we’ll have to head back to the ship to treat it properly, or there’ll be a risk of it spreading, and we’ll have to perform an amputation if we don’t reach in time.\""
    ]
function switchVoice(text,voice_name) {
  if (text){
    return "<voice name='" + voice_name + "'>" + text + "</voice>"
  }
}
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
        const speakOutput = story[0] + switchVoice(protagonist[0] , "Joey") + switchVoice(professor[0] , "Matthew") + story[1];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a decision: The Sandy Dunes\n or\n the The Valley of Mountains')
            .getResponse();
    }
};

const LandingSpot_ValleyHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LandingSpot_Valley';
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[1] , "Joey")+ story[2] + switchVoice(protagonist[2] , "Joey") + story[3] + switchVoice(professor[1] , "Matthew") + switchVoice(protagonist[3] , "Joey") + story[4]; 

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Take a choice: Take the crystal back to the spaceship for research\n or\n Follow the Professor’s advice and continue exploration.')
            .getResponse();
    }
};

const ExplorationOfCaves_TakeCrystalHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ExplorationOfCaves_TakeCrystal';
    },
    handle(handlerInput) {
        const speakOutput = story[5] + switchVoice(protagonist[4] , "Matthew") + " You Scream. " + switchVoice(sara[0] , "Salli") + story[6];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a decision:  Try making it back to the ship before the frostbite spreads or Amputate your hand to prevent the frostbite from spreading.')
            .getResponse();
    }
};

const LifeOrDeath_AmputateHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LifeOrDeath_Amputate';
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[5] , "Joey") + story[7] + switchVoice(professor[2], "Matthew") + switchVoice(protagonist[6] , "Joey") + switchVoice(professor[3], "Matthew") + story[8];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! You have completed one of the eight possible endings !')
            .getResponse();
    }
}
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
        LandingSpot_ValleyHandler,
        ExplorationOfCaves_TakeCrystalHandler,
        LifeOrDeath_AmputateHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
