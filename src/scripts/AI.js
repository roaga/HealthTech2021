// import NLU from 'ibm-watson/natural-language-understanding/v1'
// import {IamAuthenticator} from 'ibm-watson/auth'
// import DeepAI from "deepai";

// const naturalLanguageUnderstanding = new NLU({
//   version: '2020-08-01',
//   authenticator: new IamAuthenticator({
//     apikey: 'k4sZVsUjG-ojC-nkkh1TCS0PzrQh9TAo1v6NNQVsqVEW', // TODO: get from env
//   }),
//   serviceUrl: 'https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/90774996-ec17-4440-b524-2c61f3a14481',
// });

const AI = {
    analyzeSentiment: async (text) => {
        console.log('hello')
        // DeepAI.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');
        // let sentimentResponse = await naturalLanguageUnderstanding.analyze({
        //     "text": text,
        //     'features': {
        //         'entities': {
        //           'emotion': true,
        //           'sentiment': true,
        //           'limit': 2,
        //         },
        //         'keywords': {
        //           'emotion': true,
        //           'sentiment': true,
        //           'limit': 2,
        //         }
        //     }
        // });
        // let sentiment = sentimentResponse.sentiment.document.score;
        // console.log(sentimentResponse);
        // console.log(sentiment);

        // DeepAI.callStandardApi("sentiment-analysis", {
        //     text: text,
        // }).then((resp) => {
        //     console.log(resp);
        //     console.log("hi")
        // });

        fetch('https://sentim-api.herokuapp.com/api/v1/', { // using: https://sentim-api.herokuapp.com
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              text: text,
            })
        }).then((response) => response.json()).then((json) => {
            console.log(json);
        })
        .catch((error) => {
          console.error(error);
        });
    }
}

export {AI}