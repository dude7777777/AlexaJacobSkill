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
            buildSpeechletResponse("Welcome to Marco Polo", true),
            {}
          )
        );
        break;

      case "IntentRequest":
        // > Intent Request
        console.log("INTENT REQUEST");
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
      text: outputText
    },
    shouldEndSession: shouldEndSession
  };

};

let generateResponse = (sessionAttributes, speechletResponse) => {

  return {
    return: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };

};