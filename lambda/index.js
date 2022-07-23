/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const buttonDocument = require('./button.json');
const BUTTON_TOKEN = 'ButtonToken';

const intro = "Welcome! You are selected to be part of the first batch of astronauts going to Pluto. Experience the journey with your fellow astronauts filled with many challenges. Are you ready to embark on this exciting adventure?!"
const story = [
    /*0*/"\nIt’s been a year since you retired from the Space Federation and are now settled in Metropolis. It was a pleasant surprise as you were out for just another evening walk when you encountered your old friend, Professor Gilbert, from the Federation." ,
    /*1*/"\nYou smile and shake hands with the Professor. You accepted the mission.\n After taking the proposal, you return to the Space Federation to train for the mission. You will be leading the team consisting of yourself, Professor Gilbert, Zack (The Engineer), John (The Astronaut), and Sara (The Doctor). After going through rigorous training, today is the launch day. The shuttle blasts off to space, and the journey begins. As soon as the rocket escapes the Earth's atmosphere, one of its engines fails. You tell everyone to keep calm and send Zack to check if there is a way to get the engine back online. Zack informs you that the engine is completely blown off but using the one working engine, they can still reach Pluto but cannot take off again till the engine is repaired or replaced. You enter Pluto's orbit. You are posed with the decision of whether to land on the sandy dunes or the valley of mountains or at the crater.\nMake a decision: The Sandy Dunes\n or\n  The Valley of Mountains\n or\n The Crater." ,
    /*2*/"\nZack nods and goes into the cockpit to set in the coordinates. You have finally landed in the valley. The temperature outside is -50 degrees, skies filled with darkness, nothing but empty lands stretching for as far as you can see.",
    /*3*/"\nYou decide to wear your protective suits and start exploring. You enter a cave. While exploring the cave, you find a strange transparent crystal emitting fumes near the top of a stone." ,
    /*4*/"\nDo you think you should take the Professor’s advice and stay away or collect some of it for research later?\n Take a choice: Take the crystal back to the spaceship for research\n or\n Follow the Professor’s advice and continue exploration." ,
    /*5*/"\nYou decide to take a sample of the crystal. While trying to store the crystal in a container, you accidentally break the container exposing the crystal fumes to your suit. The fumes are corrosive and burn through your suit, exposing your skin to -50 degree temperature resulting in serious frostbite.",
    /*6*/"\nSara collects another sample of the crystal to bring it back to the ship. Do you think you have enough time to reach the ship or it would be better to amputate your hand and not risk the mission.\n Make a decision:  Try making it back to the ship before the frostbite spreads\n or\n Amputate your hand to prevent the frostbite from spreading." , 
    /*7*/"\nSara proceeds with the amputation to prevent the frostbite spread. After fighting the strong and cold winds of the poles, the team finally gets back to the spaceship. Meanwhile, the Professor begins experiments on the crystal.", 
    /*8*/"\nThe team quickly builds a shelter and gets to work on making the heater with the space fuel. With an energy and water source in place, now you can start growing food too! The soil of Pluto is rich in minerals, and the melted ice caps provide sufficient water for irrigation. With the mission's objectives met, you have successfully completed your mission, and you call upon more people to come and inhabit Pluto! Congratulations, you have completed one of the possible endings! If you don't let fear cloud your judgement and make meaningful sacrifices, then no one can stop you from achieveing your goals! If you want to play another storyline, just say, \"Restart the game\". Enjoy playing!",
    /*9*/"\nYou decide against amputation of your hand and try to make it back to the spaceship. The strong and cold winds of the poles paralyze your hand as you try to make your way towards the ship. Eventually, the frostbite gets the better of you and you succumb to it before reaching the ship. Congrats! you have reached one of the possible endings! If you want to try again just say, \"Restart the game\"\n and here's a hint for your next attempt: Don't be afraid to take tough decisions. A mission is successful only after a lot of sacrifices. Enjoy playing!",               
    /*10*/"\nYou take the professor's advice and stay away from the liquid. The team heads out of the cave to explore further. Soon you come across an ice cap. So you decide to set up a shelter near and try to figure out how to melt the ice. You start building the shelter, which takes all-day.",
    /*11*/"\nYou go inside the storage unit but you realize most of the food is frozen beyond use and can't be eaten. Your fellow astronauts are famished but if you want to survive long term you've to come up with a plan.\n Make a decision: Replenish yourself and the team right now and plan it out later\n or\n Think long-term and ration resources for later use.",   
    /*12*/"\nIt takes a lot of convincing but you feed everyone the bare minimum and save the rest for growing crops. The soil of Pluto is rich with minerals, all you need is water, seeds, and light.",
    /*13*/"\nThe heater is constructed and now you can melt all the water in the ice caps and use it for irrigation and drinking! With a shelter, water, food supply, and an energy source harnessed, you successfully fulfilled your mission and sent back a call to earth to send more people and supplies to Pluto. Congratulations, you have completed one of the possible endings! Every small decision counts. A good leader always makes a decision which will not only benefit in the short term but long term as well! If you want to play another storyline, just say, \"Restart the game\". Enjoy playing!",  
    /*14*/"\nLooking at the condition of your team, exhausted and famished, you decide to use whatever resources you have available right now to replenish yourselves and the team.",  
    /*15*/"\nSoon with all the resources exhausted and nothing left in sight, the team starts searching for alternate food sources on Pluto but come up empty-handed. As a last call for help, you contact the Federation for reinforcement and supplies. Due to logistical issues, by the time the supplies reach you, it’s too late. Congrats! you have reached one of the possible endings! If you want to try again just say, \"Restart the game\"\n and here's a hint for your next attempt: Avoid making rash and sudden decisions. A calm and calculated decision may seem insignificant but can be crucial for success. Enjoy playing!",   
    /*16*/"\nYou reach the sandy dunes as the engine sputters one last time. The team heads out in the sweltering heat and has to quickly find a place to build a shelter. So they find shade behind a big rock and start building the shelter. Soon you detect a sandstorm alert on your monitoring device." ,
    /*17*/ "\nThe shelter is half-built and abandoning it now would mean losing most of the resources for the shelter and may lead to failure of the mission. It’s your call whether to try and complete the shelter before the sandstorm hits or abandon the shelter and return to the ship.\nMake a choice: Try to complete the shelter before the sandstorm hits\n or\n Abandon building the shelter and return to the ship" ,
    /*18*/ "\nThrough a combined team effort they manage to finish building the shelter in just enough time to get in and shield themselves from the storm. After the storm is over, you decide to go and explore a nearby crater." ,
    /*19*/ "\nThe team sets up a rope climbing harness and starts going in. After exploring and gathering the necessary resources from the crater, you decide to head back to the ship, while climbing back up the crater, one of the connected harnesses gets broken.",
    /*20*/ "\nEveryone tries to grab onto whatever they can and are left hanging by the walls of the crater. You, being on the top, have to decide whether to use the leftover harness to get back to the ship and bring the necessary equipment to help them, or coordinate with your team to help them up one by one knowing that the harness is already in a bad condition and time is crucial.\nMake a decision: Figure out a way to rescue everyone before it’s too late\n or\n Save yourself first and leave to get reinforcements for the team." ,
    /*21*/ "\nShe starts to slip but you catch her mid-air and help her up. As soon as you begin to climb out yourself, the rope snaps! You start falling but your rope harness gets stuck in a rock. You pull yourself up onto the small rock and call for help. The team had reached back with the new ropes and help you out the crater." ,
    /*22*/ "\nHaving retrieved the required fuel and resources, you finally contact the federation and inform them about the abundant fuel and resources available and call for more people to come to Mars. You smile and looks at the Professor as you finish yet another adventure together. Congratulations, you have completed one of the possible endings! The team always comes first no matter what and a true leader is nothing without their team. If you want to play another storyline, just say, \"Restart the game\". Enjoy playing!", 
    /*23*/ "\nYou pulled yourself up and quickly ran back to the spaceship to grab some harnesses and ropes but when you reached the crater it was already too late. The rope had snapped and everyone fell to their death. Left with no team and no way to retrieve more fuel yourself, you survive off of the supplies for your teammates and call for reinforcements to take you back. You get on board and head back home for maybe another shot at colonizing Pluto. Congrats! you have reached one of the possible endings! If you want to try again just say, \"Restart the game\"\n and here's a hint for your next attempt: It's the job of the captain to ensure the safety of their team. Leaving no one behind should be your first priority. Enjoy playing!",
    /*24*/ "\nAll of you returned to the ship. After an hour, the sandstorm came to a halt and the team headed back to the shelter.",
    /*25*/"\nSince you are the team lead you have to choose to salvage something from the debris of the destroyed shelter or send a search party to salvage some resources from the spaceship of a nearby landing site of some old mission.\nMake a choice: Try to make something from the ship and shelter debris\n or\nSend a search party to salvage resources from a nearby old mission landing site",
    /*26*/"\nEveryone agrees and starts looking for things that could come in handy. Meanwhile, you bring out your Geiger Counter and start looking for radioactive material that may be under the debris.",
    /*27*/"\nTo your surprise, you find the nuclear powered generator. It could generate enough energy to power the whole shelter, and luckily enough it wasn’t too damaged.",
    /*28*/"\nJohn helps Zack fixing and modifying the generator while starting to make adjustments in the spaceship’s engine room to accommodate the new generator. Soon the generator is all patched up and ready to be used on the ship. You go ahead and reprogram the commands and attach the generator. You make a final prayer and hit start. The engine sputters and then comes to life.",
    /*29*/"\nEveryone rejoices and then heads aboard this ship. You promise yourself this isn’t gonna be your last time on Pluto and return to Earth. Congratulations! you have completed one of the possible endings!  You may end up being wrong sometimes, but you should use it as motivation to improve, to try again and do better. If you want to play another storyline, just say, \"Restart the game\". Enjoy playing!",
    /*30*/"\nWith John leading the search party, the team soon arrives at the old landing site. The spaceships stood upright with no sign of those lost martyrs who could never make it back home. ",
    /*31*/"\nZack goes inside the shuttle and checks whether the communication system is working.",
    /*32*/"\nAnd to everyone’s surprise Sara manages to decrypt the code with relative ease and proceeds to send a S.O.S. message to the Space Federation for reinforcements. It takes them three days to arrive and everyone heads home back to Earth. You continue to train after returning, for a next shot at colonizing Pluto. Congratulations, you have completed one of the possible endings! A mission is a team effort and trusting your teammates goes a long way. Small failures shouldn't dishearten you, but motivate you to try again. If you want to play another storyline, just say, \"Restart the game\". Enjoy playing!",
    /**33**/"\nThe Professor heads into the ship and brings back a weather report.",
    /**34**/"\nYou start pulling up people one by one. The rope twists and unfurls so you bring up your speed. Only Sara is left now.",
    /**35**/"\n\"... from our ship.\"Hmmm. John remembers something. He studied it in the History of Missions on Pluto class.",
    /***36***/"\nThe ship makes a wobbly descent at the Crater. The atmosphere is hot and, the land underneath seems bubbling as if suppressing a lot of energy.",
    /***37***/"\nThe team spreads out and starts to look for a possible fuel or food source in the Crater. Suddenly the search is disturbed by a distress signal on the team comms. It was Sara who had initiated it.",
    /***38***/"\nDo you think you should relocate as Sara advises and go to the Sandy Dunes or, is it possible to stay at the resource-rich Crater and figure out a way to survive safely near the volcano?\n Make a choice:\n Relocate to the Sandy Dunes\n or\n Stay back at the Crater.",
    /***39***/"\nThe team brings out mining rigs and starts testing the layers of rock underneath, searching for a possible sign of the fuel. It takes a day, after which John finds a potential location for the  fuel. The team installs the rigs and starts drilling. In a few hours, the pump sputters out the first few drops of the fuel.",
    /***40***/"\nEveryone turns towards the Professor in shock.",
    /***41***/"\nDo you think that the ancient life form will help the humans and you should try to meet them and learn their ways or Is it better to find an alternative way to survive and grow plants in this sandy terrrain? Make a choice:\n Reincarnate the alien life form\n or\n Find alternate ways to farm the land for food and resources.",
    /***42***/"\nYou decide against reincarnating the alien life form and continue to search for a possible way to farm. However, the fuel is an efficient energy source, as the days go by and your supplies start diminishing. The team sends the Federation a call for help, but by the time the Federation reaches, everyone has already died of hunger. Congrats! you have reached one of the possible endings! If you want to try again just say, \"Restart the game\"\n and here's a hint for your next attempt: Always be open to new experiences. You never know what's coming your way, till you explore! Enjoy playing!",
    /***43***/"\nSara and the Professor set up the cryo-chamber and proceeded with the cloning and regeneration process. The chamber sparkles with electricity as the intensity increases by the second. After a while, the cryo-chamber comes to a rest. The Professor opens the door, and a pale-skinned creature, with large eyes, makes its way out of the chamber and takes its first few steps. The alien turns toward you and speaks in a raspy voice.",
    /**44***/"\nAfter knowing the composition of the special manure, you agree to the alien's demand and send it back to its endless sleep. Now your people can grow crops, and with the abundance of fossil fuel, you call more people on Pluto to colonize as you have completed your mission successfully. Congratulations! you have completed one of the possible endings! You should try to experiences as many mindblowing things as you can in a lifetime. Always follow your gut feeling and take leaps of faith. If you want to play another storyline, just say, \"Restart the game\". Enjoy playing!",
    ]
const protagonist = [
    /*0*/"\n\"Professor, it’s really nice to see you after so long. What brings you here to Metropolis today?\"" ,
    /*1*/"\n\"Zack, set the coordinates for the valley. I think we have a better chance of surviving there.\"",
    /*2*/"\n\"All right guys! We have landed. Zack and John, stay back and try to repair the engine, while me, Sara and Professor go out to explore the terrain.\"",
    /*3*/"\n\"Maybe it’s something dangerous, but maybe it’s something useful! Who knows?! I better get some of it for research and we can run some tests back on the ship.\"" , 
    /*4*/"\n\"Ahhh! My hand is becoming numb.\"", 
    /*5*/"\n\"No! I cannot risk the mission. Sara, go ahead, amputate it.\"", 
    /*6*/"\n\"And why is that Professor?\"",
    /*7*/"\n\"No, I think I can make it to the ship before it spreads.\"",
    /*8*/"\n\"Yeah! Good job guys ! Wait, I'll go and check our ration and set it up.\"",
    /*9*/"\n\"Bad news team, we have damage in the storage unit during landing. I am afraid we’ll have to ration for now.\"",
    /*10*/"\n\"I know it’s hard guys, but without rationing we won’t last a week here. Let’s think about the bigger picture and plan something out.\"",
    /*11*/"\n\"Guys, we have food sorted now! Congrats everyone on coming together and figuring out a way through hard times. Now it’s time we look for a fuel source to melt the ice caps and make this mission a success.\"",
    /*12*/"\n\"Zack, remember that old engine we have that we replaced with a new one after landing. Let’s fashion it into a nuclear-powered heater.\"",
    /*13*/"\n\"Team, let’s have a meal right now. We have some food left but I guess we’ll have to start looking for alternative sources too.\"" , 
    /*14*/"\n\"Guys! There is a sandstorm approaching from the south. We need to hurry up. What’s the ETA Professor?\"",
    /*15*/"\n\"Come on team! Let's pick up the pace and finish building the shelter before the storm hits.\"" ,
    /*16*/ "\n\"Everybody hold on! Don’t make any sudden movements! Some part of the harness is still intact. Nobody moves till I say.\"" ,
    /*17*/ "\n\"Let’s use the leftover part of the harness to climb up one by one. I will go first, and hold the other end from top.\"" , 
    /*18*/ "\n\"I will use the leftover harness to get back to the spaceship and bring the necessary equipment to rescue you all! Hold on tight till I return!\"",
    /*19*/ "\n\"I think we won’t be able to finish this shelter in time. Heading back to the ship would be safer.\"",
    /*20*/ "\n\"Holy cow! Our shelter has been destroyed! I don’t think we can rebuild it with what’s left. Oh God! It was stupid of me to go back. I should have tried to finish the shelter. I have failed you guys. I don't know what to do.\"",
    /*21*/ "\n\"Yeah I think I agree with the Professor. Let’s dig up guys, and hurry. We don’t know if there may be another sandstorm soon.\"",
    /*22*/ "\n\"My Geiger Counter is going off!. Hurry someone help me dig this up. There’s probably some radioactive fuel down here.\"",
    /*23*/ "\n\"The fuel chamber seems intact but the pistons seem to have taken some damage. What do you think, Zack? Can we make it work?\"",
    /*24*/ "\n\"Hurray! We did it! We did it as a team. We can go home now. Zack,  you crazy genius!\"",
    /*25*/ "\n\"I think I agree with John. There’s no use wasting time and resources on digging up debris that is worthless now. We may as well start searching for those old ships and ask for help from the Federation.\"",
    /*26*/ "\n\"Ah! Here it is the old Hades Shuttle from ‘09. It was a legendary vehicle and one of the first ones to make it to Pluto in a single trip. Zack, can you check the comms on the ship and if there’s any way we could make them work?\"",
    /**27**/ "\n\"Haha Prof, you know me. I am always hungry, and that’s because of my giant risk appetite.\"",
    /**28**/ "\n\"Well I am not hungry anymore that’s for sure!\"",
    /**29**/ "\n\"My team’s safety is my first priority Professor. Everyone! Quick! Head back to the ship ASAP!\"",
    /***30***/"\n\"Let’s head for the crater. I think that place would be rich with minerals, and we may end up finding fuel there. Zack, take us to The Crater.\"",
    /***31***/"\n\"Woah! That landing was quite scary, but thankfully, everyone is safe, I presume. It seems the engine has taken quite a bit of damage. Zack, I need it fixed as soon as possible.\"",
    /***32***/"\n\"Team, let's go out and try to find something useful here, and I need to figure out what’s all this rumbling underground. If it is what I think it is, we may have got ourselves the jackpot for crash landing here.\"",
    /***33***/"\n\"What happened Sara?! Are you all right?\"",
    /***34***/"\n\"This is the volcano that I’d been looking for! It’s the Piccard Mons! I’ve studied its eruption patterns. It erupts every 100 years and the last time it did was 26 years back. So, if my math is correct, we have a good 74 years before we need to relocate. \"",
    /***35***/"\n\"Well then! Let’s start looking for it!\"",
    /***36***/"\n\"Well done, guys! We did it! All we need now is to figure out how to grow food on this planet. I wonder how the ancient people used to live.\"",
    /***37***/"\n\"No, I think we should not risk bringing them back as we aren’t aware of their nature, and they may turn out to be hostile. I can’t compromise the integrity of this mission for your experiments, Professor.\"",
    /***38***/"\n\"I think I can take on an alien or two. Bring it on, Professor. Let’s learn the legends of this land, straight from the horse’s mouth.\"",
    /***39***/"\n\"We are from the planet Earth. Our natural resources are on the brink of exhaustion, and we’ve been appointed to find other planets for rehabilitation and colonization. We have chosen Pluto, but now that we are here, we don’t know how to make the land fertile.\"",
    /***40***/"\n\"Do you mind sharing the composition of the manure? This could be a matter of life and death for our species to survive.\"",
    ]
const professor = [
    /*0*/"\n\"I am currently a part of the team for our mission, 'A New Home' which is a team of 5 astronauts who will set up shelter, look for possible sources of fuel, and help begin the colonization of Pluto. But we are still one short on the team. Which reminds me, you can be the perfect candidate for the mission. Your aerospace knowledge and your experience can really come in handy. What do you say, another mission, like the old times?\"",
    /*1*/"\n\"I think you should stay away from the crystal as we don’t know what it is. Those fumes look dangerous.\"",
    /*2*/"\n\"Well, I guess I should thank you, captain, for going ahead with getting this crystal for research.\"" ,
    /*3*/"\n\"This fumes emitted by the crystal have a very high calorific value, almost similar to the fuel we use on our ship! We can even use it to heat the water and melt the polar ice caps. I suppose we should set up a shelter after making a heater to keep us warm and then set it up to melt the ice and snow for water.\"" ,
    /*4*/"\n\"According to my calculations, it's moving at a speed of around 30 meters per second, we have 15 minutes before it strikes us.\"" ,
    /*5*/ "\n\"Rocks deep in the lower belt of the crater are rich in minerals. I think we can extract some fuel from them, but it's going to be risky and very hard to reach.\"",
    /*6*/"\n\"But we’ll lose all our resources!\"",
    /*7*/"\n\"Don’t be so hard on yourself Captain! I think we may be able to salvage something for the debris. Meanwhile, I think we should call the Federation and ask for help.\"",
    /**8**/"\n\"Are you all right, Captain?\"",
    /***9***/"\n\"The Piccard Mons! I can’t believe how I missed it. It was theorized that an ancient civilization lived here, which, after the meteor hit, got fossilized over the years. That fossil fuel could be of great use to us.\"",
    /***10***/"\n\"You don’t have to wonder, Captain!\"",
    /***11***/"\n\"It’s been my life’s work, and after years of research, Sara and I have finally constructed a cryo-chamber. Its purpose is to clone a being using its DNA. I suppose we can use the fossil fuel to extract traces of the old aliens’ DNA. Who’s up for meeting a native Plutonian, born aeons ago, reincarnated?\"",
    

    ]
const sara = [
    /*0*/"\n\"Wait! Don’t panic! I have something in my first aid kit that may help temporarily, but we’ll have to head back to the ship to treat it properly, or there’ll be a risk of it spreading, and we’ll have to perform an amputation if we don’t reach in time.\"",
    /*1*/"\n\"Encryption you say? Let me give it a shot. I have been studying cryptography since I was a kid. I used to crack codes for fun.\"",
    /**2**/"\n\"My hands are slipping captain! I can’t hold on!\"",
    /***3***/"\n\"I am, but not for long. I followed the pulse underground to locate its source, leading me to an active volcano. I don’t think staying here and building a shelter is safe. We should relocate. The Sandy Dunes are nearby. What do you say, captain?\"", 
    ]
const john = [
    /*0*/"\n\"Hey Cap! Everyone is starving, how about we have a meal and call it a day.\"",
    /*1*/"\n\"Captain! I remember reading about this area in a class during our training. I think we aren’t far from an old landing site. They didn’t fly those old ships back because the mission failed but I think the ships might still work.\""

    ]
const alien = [
    /*0*/"\n\"It’s been so long since I felt like this. Alive. I remember this land, but it has changed so much. Why did you bring me back? What do you seek from me? From Pluto?\"",
    /*1*/"\n\"This land is rich with minerals but has been infertile for centuries, but our ancestors crafted a way to make manure that helps the crops grow steadily early on and then the soil provides enough nutrients for it to continue.\"",
    /*2*/"\n\" I will share it, but I have a demand that needs to be met. I will only share the composition with you if I am promised a painless death. I do not wish to live among unknown people, in an unknown time. I leave this planet for you to live, grow, prosper, and not make the same mistakes as you did back home.\"",

    ]

const zack = [
    /*0*/"\n\"I can’t keep going on without food captain!\"",
    /*1*/"\n\"On it Skipper!\"",
    /*2*/"\n\"We did it! We have successfully retrieved the fuel and required resources to get our ship back on foot!\"",
    /*3*/"\n\"I am afraid Professor, that won’t be possible. The transmission devices and the antenna were damaged severely when we landed. There’s no way we could communicate with them from our ship.\"",
    /*4*/"\n\"Oh, I can make it more than work Captain. I can modify it to power the spaceship’s engine directly and our ship would be good to go! But it’s gonna take some time.\"",
    /*5*/"\n\"The comms are functional but it uses an old encryption code over the message. I can’t override it and without it we won’t be able to send any meaningful messages to the Federation.\"",
    /***6***/"\n\"In no time captain! Let me do my magic.\"",
    ]
function switchVoice(text,voice_name) {
  if (text){
    return "<voice name='" + voice_name + "'>" + text + "</voice>"
  }
}

function switchVoiceLang(lang,text,voice_name) {
  if (text){
    return "<lang xml:lang='" + lang + "'><voice name='" + voice_name + "'>" + text + "</voice></lang>"
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
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LaunchTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "headlineTemplateData": {
                            "type": "object",
                            "objectId": "headlineSample",
                            "properties": {
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": "https://th-thumbnailer.cdn-si-edu.com/pUMjqpRXGguG4cbp-FERDeH5kKI=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/be/d4/bed4dfa3-55db-45ca-a7cd-18bf96028180/15n_fm2015_plutocrescentviajhuapl_live-cr.jpg",
                                            "size": "large"
                                        }
                                    ]
                                },
                                "textContent": {
                                    "primaryText": {
                                        "type": "PlainText",
                                        "text": "Welcome to the game! Are you ready to play 'A New Home' ?"
                                    }
                                },
                                "logoUrl": "",
                                "hintText": "Say, \"I am ready!\""
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const IntroIntentHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IntroIntent')
            ||(Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'restart'));
    },
    handle(handlerInput) {
        const speakOutput = story[0] + switchVoice(protagonist[0] , "Joey") + switchVoice(professor[0] , "Matthew") + story[1];
         let responseBuilder = handlerInput.responseBuilder;
        
        return responseBuilder
            .speak(speakOutput)
            .reprompt('Make a decision: The Sandy Dunes\n or\n the The Valley of Mountains')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/introTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Choose Landing Spot",
                                "listItems": [
                                    {
                                        "primaryText": "Sandy Dunes",
                                        "secondaryText": "SandyDunes",
                                        "thumbnailImage": "https://earthsky.org/upl/2019/05/Bagnold-Dune-Field-Mars-Curiosity-12-18-2015-2-800x450.jpg"
                                    },
                                    {
                                        "primaryText": "Mountain Valley",
                                        "secondaryText": "MountainValley",
                                        "thumbnailImage": "https://th.bing.com/th/id/OIP.fTuqmdrGcFRHV2k0tATBeAHaEK?pid=ImgDet&rs=1"
                                    },
                                    {
                                        "primaryText": "Crater",
                                        "secondaryText": "crater",
                                        "thumbnailImage": "https://cdn.zmescience.com/wp-content/uploads/2016/01/91951-004-D8086FB6.jpg"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const LandingSpot_ValleyHandler = {
    canHandle(handlerInput) {
        return  (
      (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'LandingSpot_Valley') ||
      (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'MountainValley')
    );
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[1] , "Joey")+ story[2] + switchVoice(protagonist[2] , "Joey") + story[3] + switchVoice(professor[1] , "Matthew") + switchVoice(protagonist[3] , "Joey") + story[4]; 

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Take a choice: Take the crystal back to the spaceship for research\n or\n Follow the Professor’s advice and continue exploration.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: Take the crystal back to the spaceship or Follow the Professor’s advice",
                                "listItems": [
                                    {
                                        "primaryText": "Take crystal",
                                        "secondaryText": "take_crystal",
                                        "thumbnailImage": "https://media.istockphoto.com/photos/underground-river-picture-id493981406?k=20&m=493981406&s=612x612&w=0&h=rnV2pV3rZxexYeLm3WtxeENmXkoUpPjtTbBo9ef02E4="
                                    },
                                    {
                                        "primaryText": "Explore",
                                        "thumbnailImage": "https://www.frommers.com/system/media_items/attachments/000/863/336/s980/BlackwaterRaftingCompany_NZ.jpg?1541005283",
                                        "secondaryText": "continue_explore"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const LandingSpot_SandyHandler = {
    canHandle(handlerInput) {
        return (
      (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'LandingSpot_Sandy') ||
      (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'SandyDunes')
    );
    },
    handle(handlerInput) {
        const speakOutput = story[16] + switchVoice(protagonist[14] , "Joey") + story[33] + switchVoice(professor[4] , "Matthew") + story[17];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('It’s your call whether to try and complete the shelter before the sandstorm hits or abandon the shelter and return to the ship.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: try and complete the shelter or abandon the shelter and return to the ship",
                                "listItems": [
                                    {
                                        "primaryText": "Complete shelter",
                                        "secondaryText": "complete_shelter",
                                        "thumbnailImage": "https://i.insider.com/5979023e552be51c008b6b64?width=1000&format=jpeg&auto=webp"
                                    },
                                    {
                                        "primaryText": "Abandon",
                                        "thumbnailImage": "https://static.timesofisrael.com/www/uploads/2021/10/000_9PG3CZ.jpg",
                                        "secondaryText": "ship_dunes"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const LandingSpot_CraterHandler = {
    canHandle(handlerInput) {
        return (
      (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'LandingSpot_Crater') ||
      (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'crater')
    );
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[30] , "Joey")+ story[36] + switchVoice(protagonist[31] , "Joey") + switchVoiceLang("en-GB",zack[6] , "Brian") + switchVoice(protagonist[32] , "Joey") + story[37] + switchVoice(protagonist[33] , "Joey") + switchVoice(sara[3] , "Salli") + story[38]; 

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a choice: Relocate to the Sandy Dunes or Stay back at the Crater')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: Relocate to the Sandy Dunes or Stay back at the Crater",
                                "listItems": [
                                    {
                                        "primaryText": "Relocate",
                                        "secondaryText": "SandyDunes",
                                        "thumbnailImage": "https://earthsky.org/upl/2019/05/Bagnold-Dune-Field-Mars-Curiosity-12-18-2015-2-800x450.jpg"
                                    },
                                    {
                                        "primaryText": "Stay back",
                                        "thumbnailImage": "https://cdn.zmescience.com/wp-content/uploads/2016/01/91951-004-D8086FB6.jpg",
                                        "secondaryText": "StayBack"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};



const OldLife_ReincarnateHandler = {
    canHandle(handlerInput) {
        return (
            (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OldLife_Reincarnate')
            ||(Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'Alien')
            );
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[38] , "Joey")+ story[43] + switchVoice(alien[0] , "Ivy") + switchVoice(protagonist[39] , "Joey") + switchVoice(alien[1] , "Ivy") + switchVoice(protagonist[40] , "Joey") + switchVoice(alien[2] , "Ivy") + story[44] ; 

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a choice: Reincarnate the alien life form or Find alternate ways to farm the land for food and resources.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "Always follow your gut feeling and take leaps of faith!",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};
const OldLife_AlternateHandler = {
    canHandle(handlerInput) {
        return(
            ( Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OldLife_Alternate')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'Farm')
            );
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[37] , "Joey")+ story[42]; 

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a choice: Reincarnate the alien life form or Find alternate ways to farm the land for food and resources.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "Always be open to new experiences. You never know what's coming your way, till you explore! ",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};
const SquareOne_StayBackHandler = {
    canHandle(handlerInput) {
        return (
            (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'SquareOne_StayBack') ||
      (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'StayBack')
    );
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[34] , "Joey")+ switchVoice(professor[9] , "Matthew") + switchVoice(protagonist[35] , "Joey") + story[39] + switchVoice(protagonist[36] , "Joey") + switchVoice(professor[10] , "Matthew") + story[40] + switchVoice(professor[11] , "Matthew") + story[41] ; 

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a choice: Reincarnate the alien life form or Find alternate ways to farm the land for food and resources.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/StayBack_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Make a choice: Reincarnate the alien life form or Find alternate ways to farm",
                                "listItems": [
                                    {
                                        "primaryText": "Reincarnate Alien",
                                        "secondaryText": "Alien",
                                        "thumbnailImage": "https://1075914428.rsc.cdn77.org/data/images/full/44632/aliens.jpg?w=617&h=359"
                                    },
                                    {
                                        "primaryText": "A way to farm",
                                        "secondaryText": "Farm",
                                        "thumbnailImage": "https://www.popsci.com/uploads/2019/01/29/FZD6JLWMCZDYNSD4VFWNO3777Y.jpg?auto=webp"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const ExplorationOfCaves_TakeCrystalHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ExplorationOfCaves_TakeCrystal')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'take_crystal'));
    },
    handle(handlerInput) {
        const speakOutput = story[5] + switchVoice(protagonist[4] , "Matthew") + " You Scream. " + switchVoice(sara[0] , "Salli") + story[6];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a decision: Try making it back to the ship before the frostbite spreads or Amputate your hand to prevent the frostbite from spreading.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: Try making it back to the ship or Amputate your hand to prevent frostbite",
                                "listItems": [
                                    {
                                        "primaryText": "Back to the ship",
                                        "secondaryText": "ship_frostbite",
                                        "thumbnailImage": "https://img.redbull.com/images/c_crop,w_4000,h_2000,x_0,y_463,f_auto,q_auto/c_scale,w_1200/redbullcom/2019/11/13/3991fcf6-00d9-4df3-bd7a-b581bbf18bcf/analog-astronauts"
                                    },
                                    {
                                        "primaryText": "Amputate hand",
                                        "thumbnailImage": "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/Frostbite-Stages/Deep_frostbite-1296x728-slide3.jpg?w=1155&h=1528",
                                        "secondaryText": "amputate_frostbite"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const LifeOrDeath_AmputateHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LifeOrDeath_Amputate')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'amputate_frostbite'));
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[5] , "Joey") + story[7] + switchVoice(professor[2], "Matthew") + switchVoice(protagonist[6] , "Joey") + switchVoice(professor[3], "Matthew") + story[8];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! You have completed one of the possible endings !')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "Don't let fear cloud your judgement and make meaningful sacrifices! No one can stop you from achieving your goals",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}

const LifeOrDeath_ReachShipHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LifeOrDeath_ReachShip')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'ship_frostbite'));
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[7] , "Joey") + story[9];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! You have completed one of the possible endings !')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "Don't be afraid to take tough decisions. A mission is successful only after a lot of sacrifices!",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}

const ExplorationOfCaves_FollowAdviceHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ExplorationOfCaves_FollowAdvice')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'continue_explore'));
    },
    handle(handlerInput) {
        const speakOutput = story[10] + switchVoiceLang("en-AU",john[0] , "Russell") + " says John. " + switchVoice(protagonist[8] , "Joey") + story[11];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a decision: Replenish yourself and the team right now and plan it out later\n or\n Think long-term and ration resources for later use.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: Eat right now and plan it later or Think long-term and ration resources",
                                "listItems": [
                                    {
                                        "primaryText": "Plan it later",
                                        "secondaryText": "plan_later",
                                        "thumbnailImage": "https://assets-natgeotv.fnghub.com/POD/12957.jpg"
                                    },
                                    {
                                        "primaryText": "Ration resources",
                                        "thumbnailImage": "https://www.automacaoindustrial.info/wp-content/uploads/2022/02/checklist-scaled.jpg",
                                        "secondaryText": "ration_resources"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const Survival_LongTermHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Survival_LongTerm')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'ration_resources'));
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[9] , "Joey") + switchVoiceLang("en-GB",zack[0] , "Brian") + switchVoice(protagonist[10] , "Joey") + story[12] + switchVoice(protagonist[11] , "Joey") + "You remember about the old nuclear-powered engine in your ship. " + switchVoice(protagonist[12] , "Joey") + switchVoiceLang("en-GB",zack[1] , "Brian") + story[13];  

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! You have completed one of the possible endings !')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "Every small decision counts. A good leader always makes long-term decisions!",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}

const Survival_PlanLaterHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Survival_PlanLater')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'plan_later'));
    },
    handle(handlerInput) {
        const speakOutput = story[14] + switchVoice(protagonist[13] , "Joey") + story[15];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! You have completed one of the possible endings !')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "Avoid making rash and sudden decisions. A calm and calculated decision can be crucial for success.",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}
const Sandstorm_buildHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Sandstorm_build')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'complete_shelter'));
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[15] , "Joey") + story[18] + switchVoice(professor[5] , "Matthew") + switchVoice(protagonist[27] , "Joey") + story[19] + switchVoice(protagonist[16] , "Joey") + story[20];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Decide whether to use the leftover harness to get back to the ship abandon the team and bring the necessary equipment from the ship to help them get back, or coordinate with your team to get them back up one by one knowing that the harness is already in a bad condition and time is crucial.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: Bring the necessary equipment from the ship or Coordinate and help the team first",
                                "listItems": [
                                    {
                                        "primaryText": "Bring harness",
                                        "secondaryText": "ship_harness",
                                        "thumbnailImage": "https://media.istockphoto.com/photos/astronaut-man-walks-in-the-desert-with-mountains-in-mars-journey-to-picture-id846499682?k=20&m=846499682&s=170667a&w=0&h=YEKTZ1luUlrttor4UTZ_V-xuA-vsb2nlldwSvbod6X0="
                                    },
                                    {
                                        "primaryText": "Rescue team",
                                        "thumbnailImage": "https://ichef.bbci.co.uk/news/999/cpsprodpb/432F/production/_121499171_lgrescue3.jpg",
                                        "secondaryText": "rescue_team"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}
const RescueMission_rescueHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RescueMission_rescue')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'rescue_team'));
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[17] , "Joey") + story[34] + switchVoice(sara[2] , "Salli") + story[21] + switchVoiceLang("en-GB",zack[2] , "Brian") + switchVoice(professor[8] , "Matthew") + switchVoice(protagonist[28] , "Joey") + "chuckled the Captain. " + story[22];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! you have completed one of the endings.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "The team always comes first no matter what and a true leader is nothing without their team.",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}

const RescueMission_abandonHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RescueMission_abandon')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'ship_harness'));
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[18] , "Joey") + story[23];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! you have completed one of the endings.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "It's the job of the captain to ensure the safety of their team. Leaving no one behind should be your first priority.",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}
const Sandstorm_AbandonBuildHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Sandstorm_AbandonBuild')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'ship_dunes'));
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[19] , "Joey")  + switchVoice(professor[6] , "Matthew") + switchVoice(protagonist[29] , "Joey") + story[24] + switchVoice(protagonist[20] , "Joey") + switchVoice(professor[7] , "Matthew") + switchVoiceLang("en-GB",zack[3] , "Brian") + story[35] + switchVoiceLang("en-AU", john[1] , "Russell") + story[25];
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Decide whether to salvage something from the debris of the destroyed shelter and the spaceship or send a search party to salvage some resources from the debris of a nearby crash landing site of some old mission.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: Salvage something from the debris or Send a search party",
                                "listItems": [
                                    {
                                        "primaryText": "Salvage debris",
                                        "secondaryText": "debris",
                                        "thumbnailImage": "https://i2-prod.mirror.co.uk/incoming/article26823878.ece/ALTERNATES/s615/0_NASA.jpg"
                                    },
                                    {
                                        "primaryText": "Search party",
                                        "thumbnailImage": "https://www.cnet.com/a/img/resize/ffa8d9620426359385ec85a78ee4cdc204550cb5/2022/04/28/c058a94c-1a52-4ce2-8419-dc4eba06131e/surface-1200x675.jpg?auto=webp&fit=crop&height=630&width=1200",
                                        "secondaryText": "search_party"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}
const WayBack_ShelterDebrisHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WayBack_ShelterDebris')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'debris'));
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[21] , "Joey")+ story[26] + switchVoice(protagonist[22] , "Joey") + story[27] + switchVoice(protagonist[23] , "Joey") + switchVoiceLang("en-GB",zack[4] , "Brian") + story[28] + switchVoice(protagonist[24] , "Joey") + story[29];  
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! you have completed one of the endings.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "You may end up being wrong sometimes, but you should use it as motivation to improve, to try again and do better!",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}
const WayBack_OldLandingSiteHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WayBack_OldLandingSite')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'search_party'));
    },
    handle(handlerInput) {
        const speakOutput = switchVoice(protagonist[25] , "Joey")  + story[30] + switchVoice(protagonist[26] , "Joey") +story[31]+switchVoiceLang("en-GB",zack[5] , "Brian") + "Sara speaks up suddenly. " + switchVoice(sara[1] , "Salli")+ story[32];
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! you have completed one of the endings.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "A mission is a team effort and trusting your teammates goes a long way. Small failures shouldn't dishearten you, but motivate you to try again.",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
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
        LandingSpot_SandyHandler,
        LandingSpot_CraterHandler,
        SquareOne_StayBackHandler,
        OldLife_ReincarnateHandler,
        OldLife_AlternateHandler,
        ExplorationOfCaves_TakeCrystalHandler,
        LifeOrDeath_AmputateHandler,
        LifeOrDeath_ReachShipHandler,
        ExplorationOfCaves_FollowAdviceHandler,
        Survival_LongTermHandler,
        Survival_PlanLaterHandler,
        Sandstorm_buildHandler,
        RescueMission_rescueHandler,
        RescueMission_abandonHandler,
        Sandstorm_AbandonBuildHandler,
        WayBack_ShelterDebrisHandler,
        WayBack_OldLandingSiteHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
