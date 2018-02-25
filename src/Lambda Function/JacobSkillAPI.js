exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      // New Session
      console.log("NEW SESSION");
    }

    switch (event.request.type) {
      case "LaunchRequest":
        // > Launch Request
        console.log("LAUNCH REQUEST");
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Hello Jacob", true),
            {}
          )
        );
        break;

      case "IntentRequest":
        // > Intent Request
        console.log("INTENT REQUEST");

        switch (event.request.intent.name) {
          case "GetJacobName":
            context.succeed(
              generateResponse(
                buildSpeechletResponse("You are Jacob", true),
                {}
              )
            );
            break;

          case "FitnessGrahamPacer":
            context.succeed(
              generateResponse(
                buildSpeechletResponse("The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.", true),
                {}
              )
            );
            break;

          default:
            throw "Invalid intent";
        }
        break;

      case "SessionEndedRequest":
        // > Session Ended Request
        console.log("SESSION ENDED REQUEST");
        break;

      default:
        context.fail("INVALID REQUEST TYPE: ${event.request.type}");
    }

  } catch (error) {
    context.fail("Exception: #{error}");
  }
};

// Helpers
let buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText,
    },
    shouldEndSession: shouldEndSession
  };

};

let generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };

};