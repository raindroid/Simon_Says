"""
curl -X POST -u "apikey:9bgDGQmyUo_CuLsJWT0Lv_5g_GBe1P7M2K1JeuAaTudF" \
--header "Content-Type: application/json" \
--data '{
  "text": "I love apples! I do not like oranges.",
  "features": {
    "sentiment": {
      "targets": [
        "apples",
        "oranges",
        "broccoli"
      ]
    },
    "keywords": {
      "emotion": true
    }
  }
}' \
"https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/6a673e6b-2096-4737-873a-c905fd17603a/v1/analyze?version=2019-07-12"

curl -X POST -u "apikey:TawcICq8sXEf1J9ySZ9zxXhvRtm9JLPvxAZsEmEK-npK" \
--header "Content-Type: application/json" \
--data-binary @tone.json \
"https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/5edd1dce-a69b-4ac2-b3aa-bac2656cd7b3/v3/tone_chat?version=2017-09-21&sentences=false"
"""

import json
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import EmotionOptions, Features, CategoriesOptions, SentimentOptions

from myapi.keys import api_keys

def natural_language_understanding(text):
    authenticator = IAMAuthenticator(api_keys["ibm-watson-nl"]["key"])
    natural_language_understanding = NaturalLanguageUnderstandingV1(
        version='2020-08-01',
        authenticator=authenticator
    )
    natural_language_understanding.set_service_url(api_keys["ibm-watson-nl"]["url"])

    response = natural_language_understanding.analyze(
        text=text,
        features=Features(categories=CategoriesOptions(limit=3), 
                          emotion=EmotionOptions(), 
                          sentiment=SentimentOptions(document=True))).get_result()

    return response

if __name__ == "__main__":
    sample_text = 'On April 27, 2016, autistic writer and activist Amy Sequenzia posted an article on the Autism Women’s Network website entitled “Autistic Conversion Therapy.” In it, she described her reaction to the newspaper headline, “Obama calls for end to ‘conversion’ therapies for gay and transgender youth.” She agreed with the US President that any "expert" intervention that attempts to change who young people are in terms of their sexuality and gender identity is both violent and immoral. She also shifted some words around in her reading of the article to consider a similar challenge to the dominant "expert" treatment of autistic young people, Applied Behavioral Analysis (ABA). ABA is the most commonly used and funded autism intervention today that seeks to shape "normal" behaviors in autistic children while extinguishing those behaviors designated as autistic (Williams & Williams, 2011). '
    print(json.dumps(natural_language_understanding(sample_text), indent=2))