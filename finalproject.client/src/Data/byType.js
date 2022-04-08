
const byType = {
      "core": [{
        "type":"core",
        "name": "fear",
        "number": 1, 
        "color": "#f19a84",
        "content": "to call mom immedeatly",
        "keywords": ["ghost", "snake", "darkness"],
        "subtype":[]
      },
      {
        "type":"core",
        "name": "anger",
        "number": 2, 
        "color": "#e56bb5",
        "content": "that when you went running, the dust settled",
        "keywords": ["queues", "rudeness", "taxes"],
        "subtype":[]
      },
      {
        "type":"core",
        "name": "sadness",
        "number": 3,
        "color": "#a3acdd",
        "content": "when you cried and watched a movie, it was still just as bad.",
        "keywords": ["break-up", "injustice", "rain"],
        "subtype":[]
      },
      {
        "type":"core",
        "name": "surprise",
        "number": 4,
        "color": "#addf97",
        "content": "that this woke you up, be open to your surroundings",
        "keywords": ["letter", "present", "blue tree"],
        "subtype":[]
      },
      {
        "type":"core",
        "name": "joy",
        "number": 5,
        "color": "#aadc85",
        "content": "to soak it up, you will have energy to do hard stuff afterwards",
        "keywords": ["icecream", "sunshine", "helping"],
        "subtype":[]
      },
      {
        "type":"core",
        "name": "love",
        "number": 6,
        "color": "#e8ec6d",
        "content": "that love lifts you up where you belong",
        "keywords": ["babies", "kittens", "nauseous"],
        "subtype":[]
      }
      ],
      "subtypes": [{
        "type": "subtype",
        "core": "love",
        "name": "peacefull",
        "number": 7,
        "color": "#f7bf95",
        "content":"",
        "keywords":["relaxed", "breeze", "safe"],
        "sub2": ["satisfied", "Tranquil"]
      },
      {
        "type": "subtype",
        "core": "love",
        "name": "tender",
        "number": 8,
        "color": "#f9d58c",
        "content":"",
        "keywords":["soft", "marsepin", "safe"],
        "sub2": ["satisfied", "Tranquil"]
      }
      ], 
      "sub-subtypes":[{
        "core": "love", 
        "subtype": "peacefull",
        "number": 5,
        "name": "satisfied", 
        "color": "#f7c096", 
        "content":"meaning you are are fulfilled", 
        "keywords":[]
      }, {}], 
      "keywords": [
        {
          "type": "core", 
          "feeling": "love", 
          "word": "babies"
        }
      ]
}

export default byType;
