// ICSE Treasure Trove / Treasure Chest - English Literature
// Poems and Short Stories for Class 9 & 10

export interface LineExplanation {
  lines: string;
  text: string;
  explanation: string;
}

export interface MCQQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation?: string;
}

export interface ComprehensionPassage {
  id: string;
  extract: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

export interface TreasureTroveItem {
  id: string;
  title: string;
  author?: string;
  type: "poem" | "story";
  summary: string;
  detailedSummary?: string;
  themes: string[];
  keyPoints: string[];
  importantQuotes?: string[];
  characters?: { name: string; description: string }[];
  lineExplanations?: LineExplanation[];
  mcqs?: MCQQuestion[];
  comprehensionPassages?: ComprehensionPassage[];
  literaryDevices?: { device: string; example: string; explanation: string }[];
}

export const TREASURE_TROVE_POEMS: TreasureTroveItem[] = [
  {
    id: "the-night-mail",
    title: "The Night Mail",
    author: "W.H. Auden",
    type: "poem",
    summary: "A poem describing the journey of a mail train traveling from England to Scotland during the night, delivering letters that carry various emotions and messages from people across the country.",
    detailedSummary: `The Speaker begins by describing the journey of the Night Mail crossing the Border, bringing cheques, postal orders, and letters for the people. It moves up Beattock at a steady climb, makes good progress and is on time. It moves through various regions, throwing white steam back (it is run by steam engine).

The train continues its journey and startles the birds which look at it in amazement. It pulls along its 'blank-faced coaches'. Its coaches are also personified.

The train passes through farm houses where people are sleeping. The night is over; it is now dawn and the train's climb up the hill is over. The train is headed towards Glasgow, Scotland, which has 'fields of apparatus' and giant furnaces of industries. Though the train has entered the noisy industrial area, everything is quiet at dawn. The people of Scotland are waiting for the train, anxious to get some news.

In a long stanza, the poet refers to various kinds of letters and other things the train carries: receipts, invitations, applications, declarations of love, gossip from the world, news, letters of different types written on different types of paper. The letters have different styles and tones; friendly, boring, clever, stupid, long, short, typed, printed, misspelled.

Thousands still sleep and dream and have nightmares. They are asleep in Glasgow, in Edinburgh. They are asleep but they have hope that when they awake they will have letters. Their hearts will pound when the postman arrives, for, as the poet asks, "Who can bear to feel himself forgotten?"`,
    themes: ["Communication", "Connection", "Journey", "Human relationships", "Longing to be remembered"],
    keyPoints: [
      "The train is personified as a living entity climbing hills and crossing borders",
      "The poem uses rhythm to mimic the sound of a moving train",
      "Letters represent human emotions - love, business, gossip, and news",
      "Highlights the importance of postal communication in connecting people",
      "The train carries letters for both rich and poor - showing equality of the postal service",
      "People anxiously wait for letters because no one wants to feel forgotten",
    ],
    importantQuotes: [
      "This is the Night Mail crossing the Border, Bringing the cheque and the postal order",
      "Letters of thanks, letters from banks, Letters of joy from the girl and the boy",
      "And none will hear the postman's knock without a quickening of the heart",
      "For who can bear to feel himself forgotten?",
      "Letters for the rich, letters for the poor, The shop at the corner and the girl next door",
    ],
    lineExplanations: [
      {
        lines: "Lines 1-10",
        text: "This is Night Mail crossing the Border... Wind-bent grasses",
        explanation: "The Night Mail, personified as a calm, conscientious and kind being, is crossing the Border to reach Scotland. She is to climb up the hill, so her movement is slow. She is bringing for the people cheques, postal orders and letters. She is heading up Beattock at a steady climb. She continues to move and is not late. She passes through fertile lands and moors, pushing white steam back, snorting noisily as the uphill movement is hard. Auden has used a steady meter to mimic the sound that rail cars make as they move along the tracks. The reference to the letters for the rich and the poor underlines the importance of the train and the system of mail delivery during that time.",
      },
      {
        lines: "Lines 11-16",
        text: "Birds turn their heads... Gently shakes",
        explanation: "In these couplets, the train's movement is depicted. Birds turn to look at her. She pulls behind her 'blank-faced coaches' (personified as expressionless, timid followers). She is determined to move on. The poet mentions farms where people are asleep and sheep-dogs run alongside the train trying to 'turn her course' without any success. Though a jug in a bedroom shakes, the inmates continue to sleep as if they were well used to hearing her pass. The train is thus presented as a necessary part of the environment.",
      },
      {
        lines: "Lines 17-24",
        text: "Dawn freshens... For news",
        explanation: "Time has passed from when this stanza begins. The night is over. It is dawn now. The train's uphill movement is over. She is now headed towards Glasgow, which is a less peaceful area. There are giant machines and furnaces, it being an industrial area. 'Furnaces set on the dark plain like gigantic chessmen' is a simile to refer to industrial planning, building and working. The train is being waited for anxiously by Scots longing for news.",
      },
      {
        lines: "Lines 25-44",
        text: "Letters of thanks... Spelt all wrong",
        explanation: "In this part of the poem there are many examples of anaphora (the repetition of the same word at the beginning of poetic lines): 'Letters', 'And' and 'The'. Each of these words creates a pattern that imitates the movement of the train, and the return of the train. We are told what types of letters and other things are carried by the Night Mail: letters, receipts, invitations, applications, declarations of love, gossip, news, etc. Letters of all types written on papers of all colours imaginable are alluded to. These letters have all kinds of tones and styles: friendly, cold, boring, stupid, long, short, etc.",
      },
      {
        lines: "Lines 45-54",
        text: "Thousands... Himself forgotten?",
        explanation: "Thousands of people are still sleeping and have dreams ranging from tea to terrifying monsters, while the train is working hard. They will soon awake and long for letters. And no one will hear the knock of the postman without a pounding of the heart. In a rhetorical question, the poet asks as to 'who can bear to feel himself forgotten'. Here the poet underlines the human need to be connected, loved and remembered by someone in the world. No one can live in isolation.",
      },
    ],
    mcqs: [
      {
        question: "What special human quality does 'The Night Mail' celebrate?",
        options: [
          "The wait for the mail",
          "The longing to get some letter",
          "The longing to be connected and remembered by someone",
          "The longing to get some news",
        ],
        correctAnswer: 2,
        explanation: "The poem celebrates the universal human need to feel connected and remembered by others.",
      },
      {
        question: "Which of these statements is NOT true?",
        options: [
          "The train starts its journey climbing hills slowly",
          "The train carries letters and many other things for different people",
          "The train is heading for London",
          "The people wait for the mail anxiously in the morning",
        ],
        correctAnswer: 2,
        explanation: "The train is heading for Glasgow, Scotland, not London.",
      },
      {
        question: "'In the farm she passes no one wakes'. Which word best describes the farm-house people?",
        options: ["Indifferent", "Habitual", "Cruel", "Insensitive"],
        correctAnswer: 1,
        explanation: "The people have become habitual to the train's passing and ignore it naturally.",
      },
      {
        question: "What does the poem celebrate?",
        options: ["The mail train", "Human connections", "The railway system", "None of the above"],
        correctAnswer: 1,
        explanation: "While the poem describes a mail train, its core theme celebrates human connections and the need to be remembered.",
      },
      {
        question: "Where was the mail train heading?",
        options: ["Paris", "London", "Glasgow", "Crawford"],
        correctAnswer: 2,
        explanation: "The Night Mail was heading towards Glasgow, Scotland.",
      },
      {
        question: "'Snorting noisily as she passes'. Which figure of speech is used here?",
        options: ["Personification", "Alliteration", "Metaphor", "Sarcasm"],
        correctAnswer: 0,
        explanation: "The train is personified by giving it the human/animal action of 'snorting'.",
      },
      {
        question: "Why does no one wake up from their sleep as the train passes?",
        options: [
          "They are intoxicated",
          "They sleep in sound-proof rooms",
          "The train creates no noise",
          "They have become habituated to the train's passing",
        ],
        correctAnswer: 3,
        explanation: "The people have grown so accustomed to the nightly train that they sleep through it.",
      },
      {
        question: "'For who can bear to feel himself forgotten?' Which literary device is used here?",
        options: ["Simile", "Metaphor", "Rhetorical question", "Irony"],
        correctAnswer: 2,
        explanation: "This is a rhetorical question - a question asked for effect, not expecting an answer.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "This is the Night Mail crossing the Border,\nBringing the cheque and the postal order,\nLetters for the rich, letters for the poor,\nThe shop at the corner and the girl next door.\nPulling up Beattock, a steady climb:\nThe gradient's against her, but she's on time.",
        questions: [
          {
            question: "Where is the Night Mail heading? What does it carry?",
            answer: "The Night Mail is moving towards Scotland. It carries letters, cheques, postal orders and other such documents.",
          },
          {
            question: "'Letters for the rich, letters for the poor'. Comment on the significance of this line.",
            answer: "The mail train carries letters for the rich as well as poor. It shows that the postal service is non-discriminating and serves all people equally.",
          },
          {
            question: "How does the mail train start its journey? How would you describe it?",
            answer: "The mail train starts its journey by a steady climb up the hills. It is a long journey through several regions, yet the train remains on time despite the gradient being against her.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "Birds turn their heads as she approaches,\nStare from the bushes at her blank-faced coaches.\nSheep-dogs cannot turn her course;\nThey slumber on with paws across.\nIn the farm she passes no one wakes,\nBut a jug in the bedroom gently shakes.",
        questions: [
          {
            question: "Which figure of speech is used in Line 1?",
            answer: "The figure of speech used in Line 1 is Personification. Birds turn their heads, like human beings, to see what was coming.",
          },
          {
            question: "Comment on the use of phrase 'blank-faces' for the train coaches.",
            answer: "The train-coaches pulled along by the train are personified as persons with no expression or will of their own. They just follow where they are being led.",
          },
          {
            question: "How do sleeping people react as the train passes? Why?",
            answer: "The sleeping people remain unaware of the passing train. They seem to have become habitual to its arrival and it has become a natural part of their environment.",
          },
        ],
      },
      {
        id: "passage-3",
        extract: "Dawn freshens, the climb is done.\nDown towards Glasgow she descends\nTowards the steam tugs yelping down the glade of cranes,\nTowards the fields of apparatus, the furnaces\nSet on the dark plain like gigantic chessmen.\nAll Scotland waits for her:\nIn the dark glens, beside the pale-green sea lochs\nMen long for news.",
        questions: [
          {
            question: "How is Glasgow described in the quoted lines?",
            answer: "Glasgow is an industrial area. Huge cranes and furnaces have been set on the grassy lands. It shows how industries are fast coming up, harming the peaceful countryside and agriculture.",
          },
          {
            question: "Which figure of speech is used in Line 5 here, and why?",
            answer: "The figure of speech used in Line 5 is Simile. Huge machinery and furnaces are compared to huge chessmen, pawns in the hands of industrialists in the game of earning more and more money.",
          },
          {
            question: "What does the poet convey about the waiting people of Scotland?",
            answer: "The poet tells us that the people of Scotland are still asleep, having nightmares and pleasant dreams. When they wake up, they will long for letters carried by the train. They wait for some knock at the door by the postman.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Personification",
        example: "Snorting noisily as she passes",
        explanation: "The train is given human/animal characteristics, making it seem alive and determined.",
      },
      {
        device: "Simile",
        example: "Furnaces set on the dark plain like gigantic chessmen",
        explanation: "Industrial furnaces are compared to chess pieces, suggesting industrial planning and strategy.",
      },
      {
        device: "Anaphora",
        example: "Letters of thanks, letters from banks, Letters of joy...",
        explanation: "The repetition of 'Letters' at the beginning creates a rhythmic pattern mimicking the train's movement.",
      },
      {
        device: "Rhetorical Question",
        example: "For who can bear to feel himself forgotten?",
        explanation: "A question asked for effect, emphasizing the universal human need to be remembered.",
      },
      {
        device: "Onomatopoeia",
        example: "Snorting noisily",
        explanation: "Words that imitate the sounds of the train, creating an auditory image.",
      },
    ],
  },
  {
    id: "skimbleshanks",
    title: "Skimbleshanks: The Railway Cat",
    author: "T.S. Eliot",
    type: "poem",
    summary: "A whimsical poem about Skimbleshanks, a cat who is the unofficial supervisor of the Night Mail train, ensuring everything runs smoothly and on time.",
    detailedSummary: `Skimbleshanks is one of the poems from T.S. Eliot's "Old Possum's Book of Practical Cats." The poem describes a remarkable cat who has taken upon himself the responsibility of supervising the Night Mail train from London to Scotland.

The poem begins with the scene at the railway station at 11:39 PM. There's anxiety and confusion because Skimbleshanks cannot be found. The train cannot start without him - he's that important. Then suddenly he appears, and everyone relaxes. The guard waves his flag, the train starts moving.

Skimbleshanks takes his duties very seriously. He walks through the train examining every carriage, checking that everything is in order. He ensures the passengers are comfortable, the luggage is properly stored, and even supervises the dining car. He's described as being everywhere at once - a true professional.

Throughout the night journey, Skimble keeps watch. While passengers sleep, he patrols the corridors. He's so efficient that the train always arrives on time. The poem celebrates this unsung hero - a humble cat who takes pride in his work and ensures the smooth running of the railway system.

The poem is humorous and affectionate, using rhythm and rhyme to capture the movement of the train and the bustling energy of Skimbleshanks.`,
    themes: ["Responsibility", "Dedication", "Order", "Importance of seemingly small roles", "Pride in work", "Humor"],
    keyPoints: [
      "Skimbleshanks is portrayed as indispensable to the train's operation",
      "The cat inspects every carriage and ensures passengers are comfortable",
      "The train cannot leave without Skimbleshanks",
      "Celebrates the unsung heroes who keep things running",
      "The poem uses rhythm to mimic the sound of a moving train",
      "Skimble represents dedication and professionalism in any role",
    ],
    importantQuotes: [
      "There's a whisper down the line at 11:39",
      "Skimbleshanks the Railway Cat, the Cat of the Railway Train",
      "You may say that by and large it is Skimble who's in charge",
      "He will watch you without winking and he sees what you are thinking",
      "And he'll know if it's two minutes late or if it's running on time",
    ],
    lineExplanations: [
      {
        lines: "Opening Lines",
        text: "There's a whisper down the line at 11:39 / When the Night Mail's ready to depart",
        explanation: "The poem opens with tension and anticipation. At 11:39 PM, just before departure, there's anxious whispering among the railway staff. The Night Mail cannot depart without Skimbleshanks - showing how essential he is considered to be.",
      },
      {
        lines: "The Search",
        text: "Saying 'Skimble where is Skimble has he gone to hunt the thimble? / We must find him or the train can't start'",
        explanation: "The staff frantically searches for Skimbleshanks. The playful rhyme 'Skimble/thimble' adds humor while emphasizing the chaos. The line 'the train can't start' shows his perceived importance - even though he's just a cat, everyone believes the journey depends on him.",
      },
      {
        lines: "Skimble's Appearance",
        text: "All the guards and all the porters and the stationmaster's daughters / They are searching high and low... Then he appears",
        explanation: "Everyone from guards to the stationmaster's daughters joins the search. This exaggeration creates humor. When Skimble finally appears, calm is restored. He has a mysterious quality - appearing exactly when needed.",
      },
      {
        lines: "The Inspection",
        text: "He gives one flash of his glass-green eyes / And the signal goes 'All Clear!'",
        explanation: "With just one look from his distinctive green eyes, Skimbleshanks signals that all is well. The train can now depart. This shows his authority and the trust placed in his judgment.",
      },
      {
        lines: "Night Patrol",
        text: "You may say that by and large it is Skimble who's in charge / Of the Sleeping Car Express",
        explanation: "The poet directly states Skimble's importance. He's 'in charge' of the entire train. Throughout the night, while passengers sleep, Skimble patrols, ensuring safety and order. He represents the unseen workers who keep systems running.",
      },
    ],
    mcqs: [
      {
        question: "What time does the Night Mail prepare to depart?",
        options: ["11:30 PM", "11:39 PM", "11:45 PM", "Midnight"],
        correctAnswer: 1,
        explanation: "The poem specifically mentions 'There's a whisper down the line at 11:39.'",
      },
      {
        question: "Why can't the train start without Skimbleshanks?",
        options: [
          "He is the official driver",
          "He carries the tickets",
          "Everyone believes he is essential for a safe journey",
          "He owns the railway company",
        ],
        correctAnswer: 2,
        explanation: "Though just a cat, Skimbleshanks is considered so important that nobody feels the train can safely depart without him.",
      },
      {
        question: "What color are Skimbleshanks' eyes?",
        options: ["Blue", "Yellow", "Glass-green", "Brown"],
        correctAnswer: 2,
        explanation: "The poem mentions his 'glass-green eyes' which he flashes to signal all is clear.",
      },
      {
        question: "What does Skimbleshanks do during the journey?",
        options: [
          "Sleeps in the luggage car",
          "Patrols and inspects the train",
          "Sits with the driver",
          "Hunts mice in the dining car",
        ],
        correctAnswer: 1,
        explanation: "Skimbleshanks walks through the train, inspecting every carriage and ensuring everything is in order.",
      },
      {
        question: "What is the main theme of this poem?",
        options: [
          "The cruelty of railway travel",
          "The importance of dedication and responsibility",
          "The loneliness of a cat",
          "The dangers of night travel",
        ],
        correctAnswer: 1,
        explanation: "The poem celebrates dedication, responsibility, and taking pride in one's work, no matter how humble the role.",
      },
      {
        question: "Which book does this poem come from?",
        options: [
          "The Waste Land",
          "Four Quartets",
          "Old Possum's Book of Practical Cats",
          "The Love Song of J. Alfred Prufrock",
        ],
        correctAnswer: 2,
        explanation: "Skimbleshanks is from T.S. Eliot's 'Old Possum's Book of Practical Cats,' a collection of whimsical poems about cats.",
      },
      {
        question: "The poem's rhythm is designed to imitate:",
        options: [
          "A cat's purring",
          "The movement of a train",
          "A lullaby",
          "A marching band",
        ],
        correctAnswer: 1,
        explanation: "The rhythmic pattern of the poem mimics the clickety-clack sound of a train moving along the tracks.",
      },
      {
        question: "'He will watch you without winking' suggests that Skimbleshanks is:",
        options: ["Tired", "Blind", "Vigilant and alert", "Unfriendly"],
        correctAnswer: 2,
        explanation: "This line emphasizes Skimble's constant vigilance - he never relaxes his watch over the train and passengers.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "There's a whisper down the line at 11:39\nWhen the Night Mail's ready to depart,\nSaying 'Skimble where is Skimble has he gone to hunt the thimble?\nWe must find him or the train can't start.'",
        questions: [
          {
            question: "What is the atmosphere at the railway station at 11:39?",
            answer: "The atmosphere is tense and anxious. There's whispering among the staff as they search for Skimbleshanks. Everyone is worried because they believe the train cannot start without him.",
          },
          {
            question: "What does 'hunt the thimble' suggest about Skimbleshanks?",
            answer: "It suggests his playful, cat-like nature. The phrase is also a reference to a children's game, adding to the whimsical, light-hearted tone of the poem.",
          },
          {
            question: "Why is Skimbleshanks considered so important?",
            answer: "Though just a cat, Skimbleshanks has established himself as an essential part of the train's operation. Everyone believes that his presence ensures a safe and orderly journey.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "You may say that by and large it is Skimble who's in charge\nOf the Sleeping Car Express.\nFrom the driver and the guards to the bagmen playing cards\nHe will supervise them all, more or less.",
        questions: [
          {
            question: "What role does Skimbleshanks play on the train?",
            answer: "Skimbleshanks acts as an unofficial supervisor of the entire train. He oversees everyone from the driver and guards to passengers playing cards, ensuring order throughout the journey.",
          },
          {
            question: "What does 'more or less' add to the description?",
            answer: "It adds a touch of humor and modesty. While Skimble is portrayed as being in charge, the phrase acknowledges that his 'supervision' is somewhat informal and whimsical.",
          },
          {
            question: "How does this stanza celebrate ordinary workers?",
            answer: "By making a cat the hero of railway operations, the poem humorously celebrates all the unsung workers who keep systems running smoothly - those who take pride in their duties regardless of recognition.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Personification",
        example: "Skimbleshanks is portrayed as a railway supervisor",
        explanation: "The cat is given human qualities of responsibility, authority, and professionalism, making him a relatable character.",
      },
      {
        device: "Rhythm and Meter",
        example: "The galloping rhythm throughout the poem",
        explanation: "The poem's rhythm mimics the sound of a train moving along tracks, creating an auditory connection to the subject matter.",
      },
      {
        device: "Hyperbole",
        example: "The train can't start without Skimbleshanks",
        explanation: "This exaggeration emphasizes Skimble's perceived importance and adds humor to the poem.",
      },
      {
        device: "Repetition",
        example: "Skimble, Skimble, Skimbleshanks",
        explanation: "The repetition of his name creates a rhythmic, almost musical quality and emphasizes his central importance.",
      },
      {
        device: "Alliteration",
        example: "Sleeping Car Express",
        explanation: "The repeated 's' sounds add to the smooth, flowing rhythm of the poem.",
      },
    ],
  },
  {
    id: "i-remember-i-remember",
    title: "I Remember, I Remember",
    author: "Thomas Hood",
    type: "poem",
    summary: "A nostalgic poem where the speaker reminisces about his happy childhood home, contrasting the innocence and joy of youth with the disillusionment of adulthood.",
    detailedSummary: `"I Remember, I Remember" is one of the most beloved nostalgic poems in English literature. Thomas Hood wrote it reflecting on his childhood in London, expressing deep longing for the innocence and happiness of youth.

The poem consists of four stanzas, each beginning with the refrain "I remember, I remember." In the first stanza, the speaker recalls the house where he was born, particularly the window through which sunlight would stream in. He remembers how the sun never came too early or stayed too late - childhood days felt perfect.

In the second stanza, he recalls the garden flowers - roses red and white, violets, and lily-cups. He remembers his brother's birthday when they planted a laburnum tree, which is still alive, suggesting how time has passed while nature endures.

The third stanza describes the swing among the lilacs, where he felt his spirit "flew in feathers" - a metaphor for the lightness and freedom of childhood. He remembers the tree he thought touched the sky, showing a child's innocent perception of the world.

The final stanza is the most poignant. The speaker compares his childish ignorance to the knowledge of adulthood. He once believed the tree touched heaven, but now knows better. The poem ends with a melancholic realization: "But now 'tis little joy / To know I'm farther off from heav'n / Than when I was a boy." This suggests that adulthood has brought him farther from innocence, happiness, and perhaps spiritual purity.`,
    themes: ["Nostalgia", "Childhood innocence", "Loss of innocence", "Memory", "Contrast between youth and adulthood", "Nature"],
    keyPoints: [
      "The speaker recalls the house where he was born with deep affection",
      "Memories of flowers, trees, and the swing are vivid and idealized",
      "Childhood is portrayed as a time closer to heaven/innocence",
      "The laburnum tree planted on his brother's birthday symbolizes enduring nature vs fleeting childhood",
      "Adult life brings awareness of distance from that innocent state",
      "The refrain 'I remember, I remember' creates a wistful, musical quality",
    ],
    importantQuotes: [
      "I remember, I remember, The house where I was born",
      "The little window where the sun came peeping in at morn",
      "The roses, red and white, The vi'lets, and the lily-cups",
      "He never came a wink too soon, Nor brought too long a day",
      "My spirit flew in feathers then, That is so heavy now",
      "But now 'tis little joy to know I'm farther off from heav'n than when I was a boy",
    ],
    lineExplanations: [
      {
        lines: "Stanza 1",
        text: "I remember, I remember, / The house where I was born, / The little window where the sun / Came peeping in at morn",
        explanation: "The speaker fondly recalls his birthplace. The sun is personified as 'peeping in' like a gentle friend, suggesting the warmth and security of childhood. The house represents safety, belonging, and the origin of his identity.",
      },
      {
        lines: "Stanza 1 (continued)",
        text: "He never came a wink too soon, / Nor brought too long a day",
        explanation: "In childhood, time felt perfect - days were neither too short nor too long. The sun (personified as 'he') always arrived at the right moment. This reflects how children live in the present moment without the anxieties about time that adults experience.",
      },
      {
        lines: "Stanza 2",
        text: "The roses, red and white, / The vi'lets, and the lily-cups, / Those flowers made of light!",
        explanation: "The garden flowers are remembered with vivid color imagery. 'Flowers made of light' suggests how memory idealizes the past - these flowers seem almost magical, illuminated by the golden glow of nostalgia.",
      },
      {
        lines: "Stanza 2 (continued)",
        text: "The laburnum on his birthday, / The tree is living yet!",
        explanation: "A laburnum tree was planted on his brother's birthday. The fact that the tree still lives while childhood has passed creates poignant contrast. Nature endures while human innocence is lost forever.",
      },
      {
        lines: "Stanza 3",
        text: "My spirit flew in feathers then, / That is so heavy now",
        explanation: "This is one of the poem's most powerful images. In childhood, his spirit felt light as feathers - free, joyful, unburdened. Now, as an adult, his spirit is 'heavy' with responsibilities, disappointments, and the weight of experience.",
      },
      {
        lines: "Stanza 4",
        text: "I remember, I remember, / The fir trees dark and high; / I used to think their slender tops / Were close against the sky",
        explanation: "The child believed the tall trees touched the sky - a innocent misperception that reflects the wonder and imagination of childhood. Children see the world as magical and limitless.",
      },
      {
        lines: "Final Lines",
        text: "But now 'tis little joy / To know I'm farther off from heav'n / Than when I was a boy",
        explanation: "The poem's most famous lines. 'Heaven' represents innocence, happiness, and spiritual purity. The adult speaker realizes that growing up has taken him further from that state of grace. Knowledge and experience have cost him his childhood closeness to 'heaven.'",
      },
    ],
    mcqs: [
      {
        question: "What is the main emotion expressed in this poem?",
        options: ["Anger", "Nostalgia", "Fear", "Excitement"],
        correctAnswer: 1,
        explanation: "The poem is deeply nostalgic, with the speaker fondly remembering his childhood while lamenting its loss.",
      },
      {
        question: "What does the speaker remember about the sun in his childhood home?",
        options: [
          "It was too bright",
          "It came peeping in at morn through a little window",
          "It never shone there",
          "It made him uncomfortable",
        ],
        correctAnswer: 1,
        explanation: "The speaker fondly remembers the sun 'peeping in at morn' through the little window of his childhood home.",
      },
      {
        question: "'My spirit flew in feathers then, That is so heavy now' - what does this mean?",
        options: [
          "He used to have wings as a child",
          "He is physically heavier now",
          "His spirit was light and free in childhood but is burdened now",
          "He collected feathers as a child",
        ],
        correctAnswer: 2,
        explanation: "The metaphor contrasts the lightness and freedom of childhood spirit with the heaviness of adult life.",
      },
      {
        question: "What tree was planted on his brother's birthday?",
        options: ["Oak tree", "Laburnum tree", "Fir tree", "Apple tree"],
        correctAnswer: 1,
        explanation: "A laburnum tree was planted on his brother's birthday, and the speaker notes it is 'living yet.'",
      },
      {
        question: "What did the child think about the fir trees?",
        options: [
          "They were scary",
          "Their tops touched the sky",
          "They were too small",
          "They had no leaves",
        ],
        correctAnswer: 1,
        explanation: "The child innocently believed 'their slender tops were close against the sky' - showing childlike wonder.",
      },
      {
        question: "What does 'farther off from heav'n' mean in the final lines?",
        options: [
          "He has moved to a lower altitude",
          "He is physically far from a church",
          "He has lost the innocence and happiness of childhood",
          "He doesn't believe in God anymore",
        ],
        correctAnswer: 2,
        explanation: "'Heaven' symbolizes innocence, joy, and purity. The adult feels he has lost these qualities that he possessed as a child.",
      },
      {
        question: "Which literary device is used in 'The sun came peeping in at morn'?",
        options: ["Simile", "Personification", "Hyperbole", "Oxymoron"],
        correctAnswer: 1,
        explanation: "The sun is personified - given the human action of 'peeping' like a curious friend.",
      },
      {
        question: "The refrain 'I remember, I remember' creates what effect?",
        options: [
          "Humor",
          "Suspense",
          "A wistful, musical quality emphasizing nostalgia",
          "Anger",
        ],
        correctAnswer: 2,
        explanation: "The repetition creates a song-like, wistful quality that reinforces the nostalgic mood of the poem.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "I remember, I remember,\nThe house where I was born,\nThe little window where the sun\nCame peeping in at morn;\nHe never came a wink too soon,\nNor brought too long a day,\nBut now, I often wish the night\nHad borne my breath away!",
        questions: [
          {
            question: "What does the speaker remember about the house where he was born?",
            answer: "The speaker remembers the house fondly, particularly the little window where sunlight would come in each morning. The sun is personified as a gentle visitor who came at just the right time.",
          },
          {
            question: "What does 'He never came a wink too soon' tell us about the speaker's childhood?",
            answer: "It suggests that in childhood, time felt perfect. Days were neither too short nor too long. The child lived in the moment without the anxieties about time that burden adults.",
          },
          {
            question: "What is the significance of the last two lines?",
            answer: "The sudden shift to wishing 'the night had borne my breath away' reveals the speaker's deep unhappiness with adult life. He sometimes wishes he had died in that innocent state rather than grow up to experience disillusionment.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "I remember, I remember,\nThe roses, red and white,\nThe vi'lets, and the lily-cups,\nThose flowers made of light!\nThe lilacs where the robin built,\nAnd where my brother set\nThe laburnum on his birthday,—\nThe tree is living yet!",
        questions: [
          {
            question: "What flowers does the speaker remember from his childhood garden?",
            answer: "The speaker remembers roses (red and white), violets, and lily-cups. He describes them as 'flowers made of light,' suggesting how memory idealizes and illuminates the past.",
          },
          {
            question: "What is significant about the laburnum tree?",
            answer: "The laburnum tree was planted on his brother's birthday. The fact that 'the tree is living yet' creates a poignant contrast - nature endures while childhood innocence has passed forever.",
          },
          {
            question: "What does 'flowers made of light' suggest about the speaker's memories?",
            answer: "This phrase suggests that memory has transformed ordinary flowers into something magical and luminous. Nostalgia casts a golden glow over the past, making everything seem more beautiful than it perhaps was.",
          },
        ],
      },
      {
        id: "passage-3",
        extract: "I remember, I remember,\nThe fir trees dark and high;\nI used to think their slender tops\nWere close against the sky:\nIt was a childish ignorance,\nBut now 'tis little joy\nTo know I'm farther off from heav'n\nThan when I was a boy.",
        questions: [
          {
            question: "What did the child believe about the fir trees?",
            answer: "The child believed that the slender tops of the tall fir trees were 'close against the sky' - touching heaven. This innocent misperception reflects the wonder and magical thinking of childhood.",
          },
          {
            question: "Why does the speaker call it 'childish ignorance'?",
            answer: "As an adult, he knows the trees don't actually touch the sky. But he uses the phrase with regret rather than superiority - he misses that innocent way of seeing the world.",
          },
          {
            question: "Explain the meaning of 'I'm farther off from heav'n than when I was a boy.'",
            answer: "Heaven represents innocence, happiness, purity, and spiritual closeness to the divine. The adult speaker feels that growing up has taken him away from all these qualities. Knowledge has come at the cost of innocence and joy.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Personification",
        example: "The sun came peeping in at morn",
        explanation: "The sun is given human qualities - it 'peeps' like a gentle, curious friend visiting the child.",
      },
      {
        device: "Metaphor",
        example: "My spirit flew in feathers then",
        explanation: "The spirit is compared to a bird with feathers, suggesting the lightness, freedom, and joy of childhood.",
      },
      {
        device: "Refrain",
        example: "I remember, I remember",
        explanation: "The repeated phrase at the beginning of each stanza creates a musical, wistful quality and emphasizes the act of remembering.",
      },
      {
        device: "Contrast",
        example: "'That is so heavy now' vs 'flew in feathers then'",
        explanation: "The poem constantly contrasts the joy of childhood with the burden of adulthood.",
      },
      {
        device: "Symbolism",
        example: "Heaven",
        explanation: "Heaven symbolizes innocence, happiness, and purity - qualities associated with childhood that are lost in adulthood.",
      },
      {
        device: "Imagery",
        example: "The roses, red and white, The vi'lets, and the lily-cups",
        explanation: "Vivid visual imagery brings the childhood garden to life, engaging the reader's senses.",
      },
    ],
  },
  {
    id: "a-doctors-journal",
    title: "A Doctor's Journal Entry for August 6, 1945",
    author: "Vikram Seth",
    type: "poem",
    summary: "A powerful poem based on the real account of Dr. Michihiko Hachiya, describing his experiences on the day the atomic bomb was dropped on Hiroshima.",
    detailedSummary: `This poem by Vikram Seth is based on the actual diary of Dr. Michihiko Hachiya, who survived the atomic bombing of Hiroshima on August 6, 1945. The poem is written in first person, giving readers an intimate, horrifying account of that fateful day.

The poem begins with the doctor describing a peaceful morning. He had slept well, the day was calm and beautiful. He was getting ready for work when suddenly there was a blinding flash. The flash was so intense that the doctor was momentarily blinded and thrown to the ground.

When he regained his senses, everything had changed. His house was destroyed, he was injured and naked (his clothes had been blown off by the blast). Despite his own wounds - splinters of glass embedded in his body, bleeding profusely - his first instinct as a doctor was to help others.

As he stumbled through the destroyed city, he witnessed scenes of unimaginable horror: people with severe burns, skin hanging off their bodies, the dead and dying everywhere. The hospital itself was damaged, but the surviving medical staff tried to treat the overwhelming number of casualties.

The poem captures the surreal quality of the experience - how an ordinary morning transformed into apocalyptic nightmare in seconds. It serves as a powerful anti-war statement, showing the human cost of nuclear weapons through one man's eyes.`,
    themes: ["War and destruction", "Human suffering", "Survival", "Medical duty", "Anti-war message", "Resilience"],
    keyPoints: [
      "Written in first person from the doctor's perspective based on real diary",
      "Describes the flash, destruction, and immediate aftermath of the atomic bomb",
      "The doctor continues to help others despite his own injuries",
      "Highlights the horror and inhumanity of nuclear warfare",
      "Contrast between peaceful morning and sudden devastation",
      "The poem humanizes statistics - showing war through individual experience",
    ],
    importantQuotes: [
      "The morning stretched calm, beautiful and warm",
      "A blinding flash cut across the sky",
      "I was naked. How could that be?",
      "Where was my wife?",
      "I tried to help, to do what I was trained to do",
      "The dead and dying were everywhere",
    ],
    lineExplanations: [
      {
        lines: "Opening Lines",
        text: "The morning stretched calm, beautiful and warm... I had slept well",
        explanation: "The poem opens with deliberate irony. The day begins peacefully, normally - the doctor slept well, the weather is pleasant. This ordinary beginning makes the horror that follows even more shocking. It reminds us that catastrophe can strike any normal day.",
      },
      {
        lines: "The Flash",
        text: "A blinding flash cut across the sky... I was thrown to the ground",
        explanation: "The atomic bomb explodes. The flash is described as 'blinding' - literally, as the intense light temporarily blinded many survivors. The sudden violence of being thrown to the ground contrasts sharply with the peaceful morning just seconds before.",
      },
      {
        lines: "Realization of Injury",
        text: "I was naked. How could that be?... Splinters of glass were everywhere",
        explanation: "The blast was so powerful it stripped the clothes off people. The doctor's confusion ('How could that be?') captures the surreal, incomprehensible nature of the event. Glass splinters embedded in his body show the physical trauma.",
      },
      {
        lines: "Search for Family",
        text: "Where was my wife?",
        explanation: "Even in his injured state, the doctor's first thought is for his wife. This simple question humanizes him and represents the thousands of families torn apart that day. Personal love amid mass destruction.",
      },
      {
        lines: "The Doctor's Duty",
        text: "I tried to help, to do what I was trained to do",
        explanation: "Despite his own injuries, the doctor's instinct is to help others. This line captures the essence of medical duty - putting patients first. It also shows human resilience and the need to find purpose even in chaos.",
      },
      {
        lines: "Scenes of Horror",
        text: "The dead and dying were everywhere... skin hanging from their bodies",
        explanation: "The doctor witnesses the full horror of nuclear warfare - burns so severe that skin peels off, countless dead and dying. These graphic descriptions serve as powerful anti-war testimony.",
      },
    ],
    mcqs: [
      {
        question: "What is this poem based on?",
        options: [
          "A fictional story",
          "The actual diary of Dr. Michihiko Hachiya",
          "A newspaper report",
          "A government document",
        ],
        correctAnswer: 1,
        explanation: "Vikram Seth based this poem on the real diary of Dr. Michihiko Hachiya, a survivor of the Hiroshima bombing.",
      },
      {
        question: "What date does the poem describe?",
        options: [
          "August 9, 1945",
          "August 6, 1945",
          "September 2, 1945",
          "December 7, 1941",
        ],
        correctAnswer: 1,
        explanation: "August 6, 1945 was the date when the atomic bomb was dropped on Hiroshima, Japan.",
      },
      {
        question: "How does the poem begin?",
        options: [
          "With sounds of bombing",
          "With a peaceful, calm morning",
          "With people running",
          "With a warning siren",
        ],
        correctAnswer: 1,
        explanation: "The poem deliberately begins with a peaceful, normal morning to contrast with the horror that follows.",
      },
      {
        question: "Why was the doctor naked after the blast?",
        options: [
          "He was taking a bath",
          "The blast blew off his clothes",
          "He removed them to treat his wounds",
          "He was sleeping",
        ],
        correctAnswer: 1,
        explanation: "The atomic blast was so powerful that it stripped the clothes off many victims near the explosion.",
      },
      {
        question: "What was the doctor's first instinct after the blast?",
        options: [
          "To run away",
          "To find shelter",
          "To help others despite his own injuries",
          "To find food",
        ],
        correctAnswer: 2,
        explanation: "Despite being injured himself, the doctor's training and duty compelled him to try to help other victims.",
      },
      {
        question: "What is the main purpose of this poem?",
        options: [
          "To glorify war",
          "To show the horror of nuclear warfare and serve as an anti-war message",
          "To praise medical science",
          "To describe Japanese culture",
        ],
        correctAnswer: 1,
        explanation: "The poem serves as powerful anti-war testimony by showing the human suffering caused by nuclear weapons.",
      },
      {
        question: "The peaceful opening of the poem is an example of:",
        options: [
          "Simile",
          "Irony",
          "Hyperbole",
          "Alliteration",
        ],
        correctAnswer: 1,
        explanation: "The calm, beautiful morning is ironic because it precedes unimaginable destruction, making the contrast more powerful.",
      },
      {
        question: "What does the poem humanize?",
        options: [
          "The military strategy",
          "The statistics of war casualties",
          "The scientists who made the bomb",
          "The political decisions",
        ],
        correctAnswer: 1,
        explanation: "By telling the story through one man's eyes, the poem transforms abstract casualty statistics into real human suffering.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "The morning stretched calm, beautiful and warm.\nI had slept well. I was getting ready for work\nWhen suddenly a blinding flash cut across the sky.\nI was thrown to the ground.",
        questions: [
          {
            question: "How does the poet create contrast in these lines?",
            answer: "The poet contrasts the peaceful, normal morning (calm, beautiful, warm, slept well) with the sudden violence of the atomic blast. This sharp contrast emphasizes how quickly normalcy can be shattered by war.",
          },
          {
            question: "What is the effect of the phrase 'blinding flash'?",
            answer: "The phrase 'blinding flash' is literal - the atomic explosion was so bright it temporarily or permanently blinded many survivors. It also symbolizes the sudden, overwhelming nature of the attack that 'blinded' people to everything they knew.",
          },
          {
            question: "Why does the poet begin with such an ordinary morning?",
            answer: "Beginning with an ordinary morning makes the horror more relatable and shocking. It reminds readers that the victims were ordinary people doing ordinary things when catastrophe struck - it could happen to anyone.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "I was naked. How could that be?\nWhere was my wife?\nSplinters of glass were everywhere,\nEmbedded in my body.",
        questions: [
          {
            question: "What does 'I was naked. How could that be?' reveal about the speaker's state of mind?",
            answer: "This shows the speaker's confusion and disorientation. The blast was so sudden and powerful that he cannot comprehend what happened. His clothes were blown off by the explosion, but his mind struggles to process this impossibility.",
          },
          {
            question: "What is the significance of 'Where was my wife?'",
            answer: "This simple question humanizes the disaster. Even in his injured, confused state, the doctor thinks of his loved one. It represents the thousands of families torn apart that day and adds emotional depth beyond physical destruction.",
          },
          {
            question: "How do these lines convey the physical impact of the bomb?",
            answer: "The details of being stripped naked by the blast and having glass splinters embedded in the body show the immense physical force and violence of the atomic bomb. These visceral details make the destruction tangible and real.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Irony",
        example: "The morning stretched calm, beautiful and warm",
        explanation: "The peaceful opening is deeply ironic given the destruction that follows, emphasizing the sudden, unexpected nature of the tragedy.",
      },
      {
        device: "First Person Narration",
        example: "I had slept well... I was thrown to the ground",
        explanation: "The first-person perspective creates intimacy and immediacy, making readers feel they are experiencing the events directly.",
      },
      {
        device: "Contrast",
        example: "Calm morning vs. sudden destruction",
        explanation: "The stark contrast between before and after the blast emphasizes the devastating impact of the bomb.",
      },
      {
        device: "Rhetorical Question",
        example: "How could that be?",
        explanation: "This question expresses the speaker's disbelief and confusion, inviting readers to share his incomprehension.",
      },
      {
        device: "Imagery",
        example: "Splinters of glass were everywhere, Embedded in my body",
        explanation: "Vivid, graphic imagery makes the physical suffering tangible and creates a visceral response in readers.",
      },
    ],
  },
  {
    id: "a-work-of-artifice",
    title: "A Work of Artifice",
    author: "Marge Piercy",
    type: "poem",
    summary: "A feminist poem using the bonsai tree as a metaphor for how society restricts and shapes women, preventing them from reaching their full potential.",
    detailedSummary: `"A Work of Artifice" by Marge Piercy is a powerful feminist poem that uses the extended metaphor of a bonsai tree to critique how patriarchal society restricts women's growth and potential.

The poem begins by describing a bonsai tree that could have grown eighty feet tall in the wild but is kept only nine inches high in an attractive pot. A gardener tends to it daily, carefully pruning its branches and roots to keep it small. While pruning, he croons to the tree that it is lucky to have such a nice pot, that it is its nature to be small and cozy.

The metaphor becomes clear: the bonsai tree represents women, the gardener represents patriarchal society, and the pruning represents the ways women are restricted from reaching their full potential. The "attractive pot" symbolizes the limited roles society offers women - marriage, domesticity, beauty.

The gardener's crooning represents the social conditioning that teaches women to accept their limitations as natural and desirable. "It is your nature to be small" echoes the sexist belief that women are naturally suited only for certain roles.

The poem's title itself is significant - "artifice" means something made by art/skill, often with connotations of deception. Women's restricted state is not natural; it is artificially created by society. The bonsai is beautiful but stunted - a work of artifice, not nature.

Piercy's message is clear: women's limitations are imposed, not innate. Like the bonsai, women could grow tall and strong if not constantly pruned by society's expectations and restrictions.`,
    themes: ["Feminism", "Oppression", "Restriction", "Natural vs artificial", "Social conditioning", "Gender roles"],
    keyPoints: [
      "The bonsai tree could grow 80 feet tall but is kept small - metaphor for women's stunted potential",
      "The gardener represents patriarchal society that restricts women",
      "Pruning represents the ways society limits women (education, career, freedom)",
      "Women are conditioned to believe their limited state is natural and desirable",
      "Critiques how society praises women for accepting restrictions",
      "The 'attractive pot' symbolizes limited roles offered to women",
      "'Artifice' suggests women's limitations are artificial, not natural",
    ],
    importantQuotes: [
      "The bonsai tree in the attractive pot could have grown eighty feet tall",
      "but a gardener carefully pruned it",
      "It is your nature to be small and cozy",
      "With living creatures one must begin very early to dwarf their growth",
      "the bound feet, the crippled brain, the hair in curlers",
    ],
    lineExplanations: [
      {
        lines: "Opening Lines",
        text: "The bonsai tree / in the attractive pot / could have grown eighty feet tall",
        explanation: "The poem immediately establishes the central metaphor. The bonsai (woman) has natural potential for great growth (80 feet) but is confined to an 'attractive pot' (domestic roles, beauty standards). The word 'could have' emphasizes lost potential.",
      },
      {
        lines: "The Gardener",
        text: "but a gardener / carefully pruned it / It is your nature / to be small and cozy",
        explanation: "The gardener represents patriarchal society - those who systematically limit women's growth. His 'careful pruning' is the social conditioning, limited education, and restricted opportunities. He tells the tree its smallness is 'natural' - the lie society tells women.",
      },
      {
        lines: "The Crooning",
        text: "domestic and weak... how lucky, little tree",
        explanation: "The gardener speaks sweetly ('croons') while stunting the tree. This represents how patriarchy presents restrictions as privileges. Women are told they are 'lucky' to be protected, cared for - masking the reality of their oppression.",
      },
      {
        lines: "Early Conditioning",
        text: "With living creatures / one must begin very early / to dwarf their growth",
        explanation: "This is the poem's most direct statement. To successfully limit someone, conditioning must start in childhood. Girls are raised with different expectations, toys, and treatment than boys - the 'pruning' begins early.",
      },
      {
        lines: "Concrete Examples",
        text: "the bound feet / the crippled brain / the hair in curlers",
        explanation: "Piercy gives specific examples of restriction: Chinese foot-binding (physical), limited education (mental), and beauty rituals (social). The 'crippled brain' is particularly powerful - women's intellects are stunted by denied education.",
      },
    ],
    mcqs: [
      {
        question: "What does the bonsai tree represent in the poem?",
        options: [
          "Nature",
          "Women restricted by society",
          "Japanese culture",
          "Gardening skills",
        ],
        correctAnswer: 1,
        explanation: "The bonsai tree is an extended metaphor for women whose potential is stunted by patriarchal society.",
      },
      {
        question: "What does the gardener symbolize?",
        options: [
          "Nature lovers",
          "Artists",
          "Patriarchal society",
          "Educators",
        ],
        correctAnswer: 2,
        explanation: "The gardener represents patriarchal society that carefully prunes and limits women's growth.",
      },
      {
        question: "How tall could the bonsai tree have grown naturally?",
        options: [
          "Nine inches",
          "Twenty feet",
          "Eighty feet",
          "One hundred feet",
        ],
        correctAnswer: 2,
        explanation: "The poem states the tree 'could have grown eighty feet tall' - showing the vast difference between natural potential and restricted reality.",
      },
      {
        question: "What does 'It is your nature to be small and cozy' represent?",
        options: [
          "Scientific fact about trees",
          "The lies society tells women about their 'natural' limitations",
          "Genuine care for the tree",
          "A gardening technique",
        ],
        correctAnswer: 1,
        explanation: "This represents the social conditioning that tells women their restricted state is natural and desirable, not imposed.",
      },
      {
        question: "Why must one 'begin very early to dwarf their growth'?",
        options: [
          "Bonsai trees only grow when young",
          "Social conditioning must start in childhood to be effective",
          "Children learn faster",
          "It is easier to handle small plants",
        ],
        correctAnswer: 1,
        explanation: "The poem argues that patriarchal conditioning must begin in childhood (different toys, expectations, treatment) to successfully limit women.",
      },
      {
        question: "What does 'the crippled brain' refer to?",
        options: [
          "Mental illness",
          "Physical injury",
          "Women's intellects stunted by denied education",
          "The gardener's thinking",
        ],
        correctAnswer: 2,
        explanation: "'Crippled brain' refers to women's intellectual potential being stunted through denied education and limited opportunities.",
      },
      {
        question: "What does 'artifice' in the title mean?",
        options: [
          "Natural beauty",
          "Something artificially created, often with deception",
          "A type of tree",
          "Scientific experiment",
        ],
        correctAnswer: 1,
        explanation: "'Artifice' means something made by skill/art, often implying deception. Women's limitations are artificially created, not natural.",
      },
      {
        question: "What does the 'attractive pot' symbolize?",
        options: [
          "Beautiful gardens",
          "The limited roles society offers women (marriage, domesticity)",
          "Japanese art",
          "Freedom",
        ],
        correctAnswer: 1,
        explanation: "The 'attractive pot' represents the limited but supposedly desirable roles society offers women - marriage, beauty, domesticity.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "The bonsai tree\nin the attractive pot\ncould have grown eighty feet tall\non the side of a mountain\ntill split by lightning.\nBut a gardener\ncarefully pruned it.",
        questions: [
          {
            question: "What is the central metaphor of this poem?",
            answer: "The bonsai tree is a metaphor for women. Just as the tree could have grown 80 feet tall but is kept small by pruning, women have great potential but are restricted by patriarchal society (the gardener).",
          },
          {
            question: "What does 'could have grown eighty feet tall' suggest?",
            answer: "It suggests the vast natural potential that is being wasted. Women could achieve great things ('eighty feet tall') if not deliberately limited. The specific height emphasizes how much potential is lost.",
          },
          {
            question: "Why is the pot described as 'attractive'?",
            answer: "The 'attractive pot' symbolizes how society makes women's restrictions seem appealing. Traditional roles (marriage, domesticity) are presented as desirable, masking the fact that they limit women's growth.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "It is your nature\nto be small and cozy,\ndomestic and weak...\nWith living creatures\none must begin very early\nto dwarf their growth.",
        questions: [
          {
            question: "Who is speaking in 'It is your nature to be small and cozy'?",
            answer: "The gardener (representing patriarchal society) is speaking. He tells the tree (women) that being small is their 'nature' - a lie that makes imposed limitations seem natural and acceptable.",
          },
          {
            question: "What is the significance of 'domestic and weak'?",
            answer: "These are stereotypes imposed on women - that they are meant for domestic roles and are naturally weak. The poem critiques these as artificial restrictions, not natural traits.",
          },
          {
            question: "Explain 'one must begin very early to dwarf their growth.'",
            answer: "This means that to successfully limit someone's potential, conditioning must start in childhood. Girls are raised with different expectations, fewer opportunities, and restrictive gender norms from a young age - beginning the 'dwarfing' process early.",
          },
        ],
      },
      {
        id: "passage-3",
        extract: "the bound feet,\nthe crippled brain,\nthe hair in curlers,\nthe hands you\nlove to touch.",
        questions: [
          {
            question: "What do 'bound feet' represent?",
            answer: "Bound feet refer to the Chinese practice of foot-binding, which physically crippled women to make them 'beautiful' and controllable. It represents physical restrictions imposed on women's bodies.",
          },
          {
            question: "What does 'the crippled brain' mean?",
            answer: "The 'crippled brain' represents the intellectual stunting of women through denied education, limited career opportunities, and the expectation that women don't need to think. Mental growth is deliberately limited.",
          },
          {
            question: "How do these images support the poem's message?",
            answer: "These concrete images show how women are restricted physically (bound feet), mentally (crippled brain), and socially (beauty rituals like curlers). Together they demonstrate that women's limitations are imposed from all directions, not natural.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Extended Metaphor",
        example: "The bonsai tree representing women throughout the poem",
        explanation: "The entire poem develops the comparison between a pruned bonsai and women restricted by society.",
      },
      {
        device: "Symbolism",
        example: "The gardener, the pot, the pruning",
        explanation: "Each element symbolizes an aspect of patriarchy: the gardener (society), the pot (limited roles), pruning (restrictions).",
      },
      {
        device: "Irony",
        example: "'how lucky, little tree' while stunting its growth",
        explanation: "The gardener calls the tree 'lucky' while actually harming it - showing how society presents oppression as privilege.",
      },
      {
        device: "Juxtaposition",
        example: "Eighty feet tall vs. nine inches high",
        explanation: "The contrast between natural potential and restricted reality emphasizes what is lost through oppression.",
      },
      {
        device: "Imagery",
        example: "bound feet, crippled brain, hair in curlers",
        explanation: "Concrete visual images make the abstract concept of oppression tangible and visceral.",
      },
    ],
  },
  {
    id: "haunted-houses",
    title: "Haunted Houses",
    author: "Henry Wadsworth Longfellow",
    type: "poem",
    summary: "A contemplative poem suggesting that all houses are haunted by memories of those who lived there before, and the spirits of the dead remain with us.",
    detailedSummary: `"Haunted Houses" by Henry Wadsworth Longfellow is a philosophical meditation on death, memory, and the spiritual presence of those who have passed away. Unlike typical ghost stories, Longfellow presents a comforting rather than frightening view of the supernatural.

The poem opens with the striking declaration that all houses where people have lived and died are "haunted houses." But these are not haunted by scary ghosts - rather by the memories, spirits, and lingering presence of former inhabitants. The dead have not truly departed; they exist in another realm that overlaps with ours.

Longfellow describes the spirit-world as floating around our physical world "like an atmosphere." We cannot see it with our physical eyes, but it is ever-present. The dead walk beside us, unseen but not unfelt. They are "the guests that came and went" in our homes.

The poem suggests that we are merely temporary occupants of our homes and bodies. We have "no title-deeds" - no permanent ownership. Previous owners and occupants came before us, and others will come after. This creates a sense of continuity across generations.

The spirits of the dead are described as harmless and even benevolent. They return to the scenes of their former lives with gentle footsteps. Their presence brings comfort rather than fear - they are watching over the living.

The poem concludes with the idea that death is not an end but a continuation. The dead are still connected to us, still present in the places they loved. This offers consolation to the living - our loved ones never truly leave us.`,
    themes: ["Memory", "Death", "Spiritual presence", "Continuity of life", "Comfort in loss", "Impermanence"],
    keyPoints: [
      "All houses retain the presence of former inhabitants",
      "The dead are not truly gone but exist in another realm",
      "Spirit world and physical world are interconnected",
      "Death is portrayed as a continuation rather than an end",
      "The poem offers comfort rather than fear about death",
      "We are temporary occupants - 'no title-deeds to house or lands'",
    ],
    importantQuotes: [
      "All houses wherein men have lived and died are haunted houses",
      "The spirit-world around this world of sense floats like an atmosphere",
      "We have no title-deeds to house or lands; owners and occupants of earlier dates",
      "The stranger at my fireside cannot see the forms I see",
      "We meet them at the door-way, on the stair",
    ],
    lineExplanations: [
      {
        lines: "Opening Lines",
        text: "All houses wherein men have lived and died / Are haunted houses",
        explanation: "The poem begins with a universal statement - every house where people have lived is haunted. But Longfellow redefines 'haunted' - not with frightening ghosts but with memories and spiritual presence of past inhabitants.",
      },
      {
        lines: "The Spirit World",
        text: "The spirit-world around this world of sense / Floats like an atmosphere",
        explanation: "Longfellow imagines the spiritual realm as surrounding our physical world like air surrounds the earth. We cannot see it but are always immersed in it. This suggests the dead are always near us.",
      },
      {
        lines: "Invisible Presence",
        text: "We have no title-deeds to house or lands; / Owners and occupants of earlier dates",
        explanation: "We don't truly 'own' anything - we are temporary occupants. Others lived in our homes before us, others will come after. This humbling perspective connects us to all who came before.",
      },
      {
        lines: "Gentle Ghosts",
        text: "We meet them at the door-way, on the stair, / Along the passages they come and go",
        explanation: "The spirits move through familiar spaces - doorways, stairs, passages. Their presence is natural and gentle, not frightening. They continue their routines from life.",
      },
      {
        lines: "Personal Vision",
        text: "The stranger at my fireside cannot see / The forms I see",
        explanation: "Each person sees different spirits - their own loved ones who have passed. A visitor cannot see your ghosts because they are personal to you - your memories, your connections.",
      },
      {
        lines: "Comfort in Presence",
        text: "Impalpable impressions on the air, / A sense of something moving to and fro",
        explanation: "Though we cannot touch or clearly see the spirits, we feel their presence. This 'sense of something' is the lingering connection between living and dead - comforting rather than scary.",
      },
    ],
    mcqs: [
      {
        question: "According to the poem, which houses are haunted?",
        options: [
          "Only old mansions",
          "Only houses where murders occurred",
          "All houses where people have lived and died",
          "Only abandoned houses",
        ],
        correctAnswer: 2,
        explanation: "The poem opens by saying 'All houses wherein men have lived and died are haunted houses.'",
      },
      {
        question: "How does Longfellow describe the spirit-world?",
        options: [
          "As a dark underground realm",
          "As floating around our world like an atmosphere",
          "As a distant heaven",
          "As nonexistent",
        ],
        correctAnswer: 1,
        explanation: "The poem says 'The spirit-world around this world of sense floats like an atmosphere.'",
      },
      {
        question: "What does 'We have no title-deeds' mean?",
        options: [
          "We are poor",
          "We don't truly own anything permanently - we are temporary occupants",
          "The documents are lost",
          "The house is rented",
        ],
        correctAnswer: 1,
        explanation: "This line suggests we don't permanently own our homes - others lived there before and will after us.",
      },
      {
        question: "How are the ghosts in this poem portrayed?",
        options: [
          "Terrifying and malevolent",
          "Angry and vengeful",
          "Gentle, harmless, and comforting",
          "Loud and destructive",
        ],
        correctAnswer: 2,
        explanation: "Unlike typical ghost stories, Longfellow's spirits are gentle presences that offer comfort rather than fear.",
      },
      {
        question: "Why can't 'the stranger at my fireside' see the forms the speaker sees?",
        options: [
          "The stranger is blind",
          "The ghosts only appear at night",
          "Each person sees their own personal spirits - their own departed loved ones",
          "The stranger doesn't believe in ghosts",
        ],
        correctAnswer: 2,
        explanation: "The spirits we see are personal - our own memories and connections to the dead. Others have their own.",
      },
      {
        question: "What is the poem's attitude toward death?",
        options: [
          "Fear and dread",
          "Anger and resentment",
          "Comfort and acceptance - death is a continuation, not an end",
          "Indifference",
        ],
        correctAnswer: 2,
        explanation: "The poem offers a comforting view - the dead remain with us, death is a continuation rather than an end.",
      },
      {
        question: "What literary device is used in 'floats like an atmosphere'?",
        options: [
          "Personification",
          "Simile",
          "Hyperbole",
          "Alliteration",
        ],
        correctAnswer: 1,
        explanation: "This is a simile - the spirit-world is compared to an atmosphere using 'like.'",
      },
      {
        question: "What is the main theme of this poem?",
        options: [
          "Horror and fear of ghosts",
          "The continuity between life and death, and comfort in spiritual presence",
          "The importance of owning property",
          "The danger of old houses",
        ],
        correctAnswer: 1,
        explanation: "The poem explores how the dead remain connected to the living, offering comfort rather than fear.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "All houses wherein men have lived and died\nAre haunted houses. Through the open doors\nThe harmless phantoms on their errands glide,\nWith feet that make no sound upon the floors.",
        questions: [
          {
            question: "What makes a house 'haunted' according to this poem?",
            answer: "Any house where people have lived and died is haunted - not by scary ghosts but by the gentle spiritual presence of former inhabitants. The 'haunting' is the lingering memory and connection to those who lived there before.",
          },
          {
            question: "How are the 'phantoms' described and what does this suggest?",
            answer: "The phantoms are described as 'harmless' with feet that 'make no sound.' This suggests they are gentle, non-threatening presences. Unlike typical ghost stories, these spirits are benevolent rather than scary.",
          },
          {
            question: "What is the effect of the phrase 'on their errands glide'?",
            answer: "This phrase suggests the spirits continue their daily routines from life, moving purposefully but gently through the house. They 'glide' rather than stomp or crash, emphasizing their peaceful nature.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "The spirit-world around this world of sense\nFloats like an atmosphere, and everywhere\nWafts through these earthly mists and vapours dense\nA vital breath of more ethereal air.",
        questions: [
          {
            question: "How does Longfellow describe the relationship between the physical and spiritual worlds?",
            answer: "The spiritual world surrounds the physical world like an atmosphere surrounds the earth. It is everywhere, inseparable from our reality. The two worlds coexist and overlap.",
          },
          {
            question: "What does 'a vital breath of more ethereal air' suggest?",
            answer: "It suggests the spiritual realm brings life and vitality. 'Ethereal' means heavenly or otherworldly. The spirits bring something pure and life-giving to our dense, earthly existence.",
          },
          {
            question: "What literary device is used and what is its effect?",
            answer: "The simile 'floats like an atmosphere' makes the abstract spiritual world tangible and understandable. Just as we are always surrounded by air, we are always surrounded by spirits - a comforting rather than frightening idea.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Extended Metaphor",
        example: "Haunted houses as a concept throughout the poem",
        explanation: "The entire poem develops the idea that all houses are 'haunted' - redefining haunting as spiritual presence rather than horror.",
      },
      {
        device: "Simile",
        example: "Floats like an atmosphere",
        explanation: "The spirit-world is compared to an atmosphere, making the abstract concept tangible and showing its omnipresence.",
      },
      {
        device: "Personification",
        example: "Phantoms on their errands glide",
        explanation: "The spirits are given human qualities - running errands, moving through familiar spaces.",
      },
      {
        device: "Imagery",
        example: "Feet that make no sound upon the floors",
        explanation: "Vivid sensory details create atmosphere and emphasize the gentle, non-threatening nature of the spirits.",
      },
      {
        device: "Paradox",
        example: "Harmless phantoms",
        explanation: "Combining 'harmless' with 'phantoms' subverts expectations - ghosts are usually frightening, but these are gentle.",
      },
    ],
  },
  {
    id: "the-glove-and-the-lions",
    title: "The Glove and the Lions",
    author: "Leigh Hunt",
    type: "poem",
    summary: "A narrative poem about a lady who tests her knight's love by dropping her glove into a lion pit, expecting him to retrieve it as proof of devotion.",
    detailedSummary: `"The Glove and the Lions" by Leigh Hunt is a dramatic narrative poem set in the court of King Francis I of France. It tells a story about the nature of true love versus vain, manipulative love.

The scene opens at a royal arena where the king and his court are watching lions fight. King Francis is described as a "hearty king" who loves such sport. The Count de Lorge, a brave knight, sits with his lady love, admiring her beauty.

The lady, noticing that de Lorge is praising her, decides to test his love in a cruel way. She deliberately drops her glove into the pit where the fierce lions are fighting. Then she looks at de Lorge with a smile and says, essentially, "If you love me as you claim, prove it - retrieve my glove from among those lions."

This was a terrible test - the lions could kill him. But de Lorge, being a man of courage and honor, leaps into the pit. The lions are surprised by his boldness and do not attack him. He retrieves the glove and climbs back out.

But here is the twist: de Lorge does not romantically return the glove to his lady. Instead, "He threw the glove, but not with love, right in the lady's face." He publicly rejects her.

The poem's message is powerful: true love does not manipulate or endanger the beloved. The lady used de Lorge's love as a tool to satisfy her vanity, treating his life as worthless. De Lorge's action shows that self-respect is more important than a relationship based on manipulation. A love that requires such dangerous "proof" is not love at all.`,
    themes: ["True love vs vanity", "Courage", "Self-respect", "Testing relationships", "Manipulation", "Dignity"],
    keyPoints: [
      "Set in King Francis's court with lions in a pit",
      "The lady drops her glove deliberately to test de Lorge's love",
      "De Lorge bravely retrieves the glove from among the lions",
      "He throws the glove in her face, rejecting her",
      "The poem criticizes using love as a tool for manipulation",
      "True love should not endanger or test the beloved",
    ],
    importantQuotes: [
      "King Francis was a hearty king, and loved a royal sport",
      "She dropped her glove, to prove his love, then looked at him and smiled",
      "He leaped among the lions wild",
      "He threw the glove, but not with love, right in the lady's face",
      "By Heaven, said Francis, rightly done!",
    ],
    lineExplanations: [
      {
        lines: "Opening Lines",
        text: "King Francis was a hearty king, and loved a royal sport",
        explanation: "The poem opens by establishing the setting - the court of King Francis I of France. He is described as 'hearty' (healthy, good-natured) and loves entertainment. This sets up the spectacle of lions fighting.",
      },
      {
        lines: "The Court Scene",
        text: "The Count de Lorge, with his lady love, sat looking on the show",
        explanation: "De Lorge and his lady are among the spectators. He is a count (nobleman) and clearly devoted to his lady. This peaceful scene will soon be disrupted by her cruel test.",
      },
      {
        lines: "The Cruel Test",
        text: "She dropped her glove, to prove his love, then looked at him and smiled",
        explanation: "The lady deliberately drops her glove into the lion pit. Her smile is not loving but challenging - she is testing him, using his love as entertainment. The rhyme 'glove/love' emphasizes the false connection she makes.",
      },
      {
        lines: "The Brave Act",
        text: "He leaped among the lions wild... The leap was quick, return was quick",
        explanation: "De Lorge shows immense courage, jumping into danger without hesitation. His quick action suggests both bravery and perhaps anger at being tested so cruelly. He does what she asks but not happily.",
      },
      {
        lines: "The Rejection",
        text: "He threw the glove, but not with love, right in the lady's face",
        explanation: "This is the poem's powerful climax. Instead of romantically returning the glove, de Lorge throws it in her face. The phrase 'but not with love' contrasts with her earlier 'to prove his love.' He refuses to play her game.",
      },
      {
        lines: "The King's Approval",
        text: "By Heaven, said Francis, rightly done!",
        explanation: "King Francis approves of de Lorge's action. Even the king recognizes that the lady's test was wrong. De Lorge's self-respect is more important than false romantic gestures.",
      },
    ],
    mcqs: [
      {
        question: "What event is taking place at King Francis's court?",
        options: [
          "A ball",
          "A coronation",
          "Lions fighting in an arena",
          "A jousting tournament",
        ],
        correctAnswer: 2,
        explanation: "The poem describes a 'royal sport' where lions are fighting for the entertainment of the court.",
      },
      {
        question: "Why does the lady drop her glove into the lion pit?",
        options: [
          "By accident",
          "To test de Lorge's love by making him risk his life",
          "To feed the lions",
          "Because she doesn't want it anymore",
        ],
        correctAnswer: 1,
        explanation: "She drops the glove deliberately 'to prove his love' - a cruel test that risks his life for her vanity.",
      },
      {
        question: "What does de Lorge do after retrieving the glove?",
        options: [
          "Gives it back lovingly",
          "Keeps it as a trophy",
          "Throws it in the lady's face",
          "Gives it to the king",
        ],
        correctAnswer: 2,
        explanation: "He 'threw the glove, but not with love, right in the lady's face' - rejecting her and her cruel test.",
      },
      {
        question: "What is King Francis's reaction to de Lorge's action?",
        options: [
          "He is angry",
          "He approves, saying 'rightly done'",
          "He is indifferent",
          "He punishes de Lorge",
        ],
        correctAnswer: 1,
        explanation: "The king says 'By Heaven... rightly done!' - approving of de Lorge's response to the lady's manipulation.",
      },
      {
        question: "What does the poem say about true love?",
        options: [
          "It requires dangerous tests",
          "It should not manipulate or endanger the beloved",
          "It means doing anything asked",
          "It is about proving yourself constantly",
        ],
        correctAnswer: 1,
        explanation: "The poem criticizes the lady for using love as manipulation. True love should not require dangerous 'proofs.'",
      },
      {
        question: "What quality does de Lorge show by throwing the glove?",
        options: [
          "Cruelty",
          "Self-respect and dignity",
          "Cowardice",
          "Indecision",
        ],
        correctAnswer: 1,
        explanation: "De Lorge shows self-respect by refusing to accept a relationship based on manipulation and vanity.",
      },
      {
        question: "'She dropped her glove, to prove his love' - what literary device is used?",
        options: [
          "Simile",
          "Internal rhyme",
          "Personification",
          "Hyperbole",
        ],
        correctAnswer: 1,
        explanation: "The rhyme of 'glove' and 'love' within the line is internal rhyme, emphasizing the false connection the lady makes.",
      },
      {
        question: "What does the lady's 'smile' reveal about her character?",
        options: [
          "She is genuinely happy",
          "She is cruel, vain, and treats his love as entertainment",
          "She is shy",
          "She is nervous",
        ],
        correctAnswer: 1,
        explanation: "Her smile while putting him in danger shows vanity and cruelty - she treats his love and life as a game for her amusement.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "She dropped her glove, to prove his love, then looked at him and smiled;\nHe bowed, and in a moment leaped among the lions wild:\nThe leap was quick, return was quick, he has regained his place,\nThen threw the glove, but not with love, right in the lady's face.",
        questions: [
          {
            question: "Why does the lady drop her glove and smile?",
            answer: "She drops the glove to test de Lorge's love by making him risk his life among lions. Her smile shows she treats this as entertainment - using his devotion for her vanity rather than genuine love.",
          },
          {
            question: "What does 'but not with love' tell us about de Lorge's feelings?",
            answer: "It shows that de Lorge is angry and has lost respect for the lady. He retrieved the glove out of courage and honor, not love. Her cruel test has killed his affection for her.",
          },
          {
            question: "What is the moral lesson of this passage?",
            answer: "True love should not require dangerous 'proofs.' Self-respect is more important than accepting manipulation. The lady's test reveals her vanity, and de Lorge rightly rejects her.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "King Francis was a hearty king, and loved a royal sport;\nAnd one day, as his lions fought, sat looking on the court;\nThe nobles filled the benches, with the ladies in their pride,\nAnd 'mongst them sat the Count de Lorge, with one for whom he sighed.",
        questions: [
          {
            question: "What is the setting of this poem?",
            answer: "The poem is set in the court of King Francis I of France, at an arena where lions are fighting for entertainment. Nobles and ladies fill the benches watching the spectacle.",
          },
          {
            question: "What does 'with one for whom he sighed' tell us about de Lorge?",
            answer: "It tells us that de Lorge is deeply in love with his lady. He 'sighs' for her - a sign of romantic longing. This makes her later betrayal of his love even more cruel.",
          },
          {
            question: "How does the poem create a contrast between the opening and the climax?",
            answer: "The opening is peaceful and romantic - a king enjoying sport, a knight with his beloved. This contrasts with the dramatic climax where love is tested by danger and then rejected with an angry gesture.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Internal Rhyme",
        example: "She dropped her glove, to prove his love",
        explanation: "The rhyme of 'glove' and 'love' within one line emphasizes the false connection the lady makes between a trivial object and true devotion.",
      },
      {
        device: "Irony",
        example: "He threw the glove, but not with love",
        explanation: "The lady expected the glove returned with love; instead it is returned with rejection. Her plan backfires ironically.",
      },
      {
        device: "Ballad Form",
        example: "The narrative structure with rhyming couplets",
        explanation: "The poem tells a dramatic story in ballad form, making it memorable and suitable for oral recitation.",
      },
      {
        device: "Contrast",
        example: "The lady's cruel smile vs de Lorge's brave rejection",
        explanation: "The contrast between the lady's vanity and de Lorge's integrity highlights the poem's moral message.",
      },
      {
        device: "Symbolism",
        example: "The glove",
        explanation: "The glove symbolizes the lady's manipulation of love. Throwing it back symbolizes de Lorge's rejection of false love.",
      },
    ],
  },
  {
    id: "when-great-trees-fall",
    title: "When Great Trees Fall",
    author: "Maya Angelou",
    type: "poem",
    summary: "An elegiac poem about grief and loss, comparing the death of great people to the falling of mighty trees and the impact it has on all living things.",
    detailedSummary: `"When Great Trees Fall" is one of Maya Angelou's most powerful elegiac poems, written to express the profound impact of losing someone great. The poem uses the extended metaphor of falling trees to describe how death affects not just individuals but entire communities.

The poem opens with powerful nature imagery: when great trees fall, the very earth trembles. Rocks on distant hills shudder, lions retreat to their caves, and even the forests fall silent. This cosmic response to a great tree's fall represents how deeply communities feel the loss of a great person.

Angelou then shifts to the human realm. When great souls die, the air around us becomes thin and hard to breathe. We struggle to see clearly, our memory falters. The loss is physical - we feel it in our bodies as well as our hearts.

The poem acknowledges the profound disorientation that follows loss. Our souls, "depending upon their feeling," know instinctively that something great has departed from the world. We wander through days unable to find our footing.

But Angelou offers hope. After a period of mourning, "peace blooms." We begin to remember not just the pain of loss but the joy of having known the great soul. Their words, their laughter, their love become treasures we carry forward.

The poem concludes with the beautiful idea that great souls leave behind more than grief - they leave behind a legacy of inspiration. We are "healed by the air itself." The memory of the great ones gives us courage to "bravely say" our truths.

This poem has been read at many memorial services, including Nelson Mandela's, for its powerful message of grief, healing, and the enduring impact of great lives.`,
    themes: ["Grief", "Loss", "Legacy", "Healing", "Nature", "Community impact", "Memory"],
    keyPoints: [
      "Uses nature imagery to describe the impact of losing someone great",
      "All of nature feels the loss when great trees fall",
      "Memories of the deceased become precious treasures",
      "Eventually, we find courage to breathe and live again",
      "The poem moves from grief to healing to hope",
      "Great souls leave behind a legacy that inspires the living",
    ],
    importantQuotes: [
      "When great trees fall, rocks on distant hills shudder",
      "Lions hunker down in tall grasses, and even elephants lumber after safety",
      "And when great souls die, after a period peace blooms",
      "Our souls, depending upon their feeling, know that great souls have departed",
      "We can be healed by the dreams they left behind",
    ],
    lineExplanations: [
      {
        lines: "Opening Lines",
        text: "When great trees fall, rocks on distant hills shudder, Lions hunker down in tall grasses",
        explanation: "The poem opens with powerful imagery. When a great tree (great person) falls, the impact is felt everywhere - even distant rocks shudder. Lions, the kings of beasts, retreat in fear. Nature itself responds to the loss of greatness.",
      },
      {
        lines: "Forest Response",
        text: "And even elephants lumber after safety... forests fall silent",
        explanation: "Even mighty elephants seek safety. The forest falls silent in mourning. This represents how communities respond to the death of a great leader - with fear, uncertainty, and silent grief.",
      },
      {
        lines: "Human Impact",
        text: "When great souls die, the air around us becomes light, rare, sterile",
        explanation: "Angelou shifts from trees to 'great souls.' The air becomes hard to breathe - loss is physical. 'Sterile' suggests the world feels empty, lifeless without the great person's presence.",
      },
      {
        lines: "Disorientation",
        text: "Our memory, suddenly sharpened, examines... the kingdom of impossibilities",
        explanation: "After loss, memory becomes sharp - we recall every detail of our time with the deceased. But we also face 'impossibilities' - things we can no longer do with them, words we can never say.",
      },
      {
        lines: "Peace Blooms",
        text: "And when great souls die, after a period peace blooms",
        explanation: "This is the poem's turning point. Grief does not last forever. 'Peace blooms' like a flower after winter. Healing comes gradually, naturally, beautifully.",
      },
      {
        lines: "Legacy",
        text: "We can be healed by the dreams they left behind... bravely say our truths",
        explanation: "The great souls leave behind more than grief - they leave dreams, words, inspiration. Their memory gives us courage. We are 'healed' by continuing their legacy, speaking our truths as they spoke theirs.",
      },
    ],
    mcqs: [
      {
        question: "What does the 'great tree' represent in the poem?",
        options: [
          "An actual forest tree",
          "A great person who has died",
          "A building",
          "A mountain",
        ],
        correctAnswer: 1,
        explanation: "The great tree is a metaphor for a great person. When they die ('fall'), the impact is felt throughout the community.",
      },
      {
        question: "How do lions respond when great trees fall?",
        options: [
          "They roar loudly",
          "They hunt more fiercely",
          "They hunker down in tall grasses (retreat in fear)",
          "They climb trees",
        ],
        correctAnswer: 2,
        explanation: "Lions 'hunker down in tall grasses' - even the mightiest creatures are affected by the loss and seek safety.",
      },
      {
        question: "What happens to the air when great souls die?",
        options: [
          "It becomes warm and comforting",
          "It becomes light, rare, and sterile (hard to breathe)",
          "It becomes fresh and clean",
          "Nothing changes",
        ],
        correctAnswer: 1,
        explanation: "The air becomes 'light, rare, sterile' - symbolizing how the world feels empty and breathing feels difficult after a great loss.",
      },
      {
        question: "What does 'after a period peace blooms' mean?",
        options: [
          "Flowers grow on graves",
          "Wars end after death",
          "Healing comes gradually after the grief period",
          "People forget the deceased",
        ],
        correctAnswer: 2,
        explanation: "This means that after grieving, peace and healing come naturally - like flowers blooming after winter. Grief does not last forever.",
      },
      {
        question: "According to the poem, what do great souls leave behind?",
        options: [
          "Money and property",
          "Problems and burdens",
          "Dreams, words, and inspiration that heal us",
          "Nothing",
        ],
        correctAnswer: 2,
        explanation: "Great souls leave 'dreams' and words that inspire and heal the living. Their legacy continues to give courage.",
      },
      {
        question: "What is the overall message of the poem?",
        options: [
          "Death is the end of everything",
          "Great people should not be mourned",
          "Grief is natural, but healing comes, and great souls leave lasting legacies",
          "Nature is more important than humans",
        ],
        correctAnswer: 2,
        explanation: "The poem acknowledges grief but offers hope - healing comes, and the legacy of great souls continues to inspire.",
      },
      {
        question: "What literary device is used throughout the poem?",
        options: [
          "Irony",
          "Extended metaphor (trees representing great people)",
          "Hyperbole only",
          "Dialogue",
        ],
        correctAnswer: 1,
        explanation: "The poem uses extended metaphor throughout - great trees represent great people, falling represents death.",
      },
      {
        question: "Why do 'rocks on distant hills shudder'?",
        options: [
          "There is an earthquake",
          "The impact of a great soul's death is felt even far away",
          "The rocks are afraid of trees",
          "It is literally about geology",
        ],
        correctAnswer: 1,
        explanation: "The distant rocks shuddering represents how the death of a great person affects even those far away - the impact ripples outward.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "When great trees fall,\nrocks on distant hills shudder,\nlions hunker down\nin tall grasses,\nand even elephants\nlumber after safety.",
        questions: [
          {
            question: "What does the falling of 'great trees' symbolize?",
            answer: "The falling of great trees symbolizes the death of great people - leaders, loved ones, influential figures. Just as a mighty tree's fall shakes the earth, a great person's death impacts the entire community.",
          },
          {
            question: "Why do even mighty creatures like lions and elephants react with fear?",
            answer: "Even the mightiest creatures are affected by great loss. Lions hunker down and elephants seek safety because the death of a great soul creates uncertainty and fear in the entire community - everyone feels vulnerable.",
          },
          {
            question: "What is the effect of using nature imagery?",
            answer: "Nature imagery makes the abstract concept of grief tangible and universal. By showing all of nature responding to loss - rocks, lions, elephants, forests - Angelou shows that grief is a natural, shared experience that affects all living things.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "And when great souls die,\nafter a period peace blooms,\nslowly and always\nirregularly...\nAnd we can be brave again.",
        questions: [
          {
            question: "What does 'peace blooms' suggest about the grieving process?",
            answer: "'Peace blooms' suggests that healing is natural and beautiful, like a flower growing. It comes 'slowly' and 'irregularly' - grief is not linear, but peace does eventually come to those who mourn.",
          },
          {
            question: "What is the significance of 'we can be brave again'?",
            answer: "This shows the transformative power of great souls. Their memory gives us courage. After grieving, we don't just return to normal - we are inspired by their example to be brave, to speak truth, to continue their legacy.",
          },
          {
            question: "How does this passage offer hope to those who are grieving?",
            answer: "The passage assures grieving people that pain is temporary - peace will come. The great souls we lost leave behind inspiration that helps us heal and become stronger. Grief transforms into courage and hope.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Extended Metaphor",
        example: "Great trees representing great people throughout",
        explanation: "The entire poem develops the comparison between falling trees and dying great souls, making grief tangible.",
      },
      {
        device: "Imagery",
        example: "Rocks shudder, lions hunker, forests fall silent",
        explanation: "Vivid nature imagery creates a powerful visual and emotional response, showing the universal impact of loss.",
      },
      {
        device: "Personification",
        example: "Peace blooms",
        explanation: "Peace is given the quality of a flower blooming - growing naturally, beautifully, after the winter of grief.",
      },
      {
        device: "Symbolism",
        example: "The great tree",
        explanation: "The tree symbolizes strength, longevity, and shelter - qualities of great people who protect and inspire communities.",
      },
      {
        device: "Contrast",
        example: "Grief and mourning vs. peace and courage",
        explanation: "The poem moves from images of fear and loss to images of peace and bravery, showing the journey from grief to healing.",
      },
    ],
  },
  {
    id: "a-considerable-speck",
    title: "A Considerable Speck",
    author: "Robert Frost",
    type: "poem",
    summary: "A witty poem about the speaker noticing a tiny mite on his paper and choosing not to kill it, reflecting on intelligence and the value of all life.",
    detailedSummary: `"A Considerable Speck" by Robert Frost is a witty, philosophical poem that begins with a simple observation and ends with profound reflection on intelligence, life, and the relationship between humans and other creatures.

The speaker is writing at his desk when he notices a tiny speck moving across his paper. At first he thinks it is just a bit of lint or dust, but then he realizes it is a living creature - a microscopic mite.

Frost observes the mite's behavior with scientific curiosity. The creature seems to have purpose - it moves toward the still-wet ink, then stops, as if realizing the danger. It retreats, changes direction, seems to be thinking about its situation. The speaker is fascinated: this tiny speck appears to be making decisions.

The mite runs toward the edge of the paper (safety) but pauses, uncertain. The speaker interprets this as fear - the mite seems to know it could be crushed. It even appears to look up at the speaker, perhaps recognizing the threat.

At this point, the speaker has a choice: kill the insignificant creature or let it live. He chooses to spare it. Why? Because he recognizes "mind" in the mite - some form of intelligence, however primitive. The creature showed self-preservation instinct, decision-making, even what looked like reasoning.

The poem ends with a reflection on intelligence. The speaker says he "has a mind myself and recognize / Mind when I meet with it in any guise." He respects intelligence wherever it appears, even in the tiniest form. He also makes a witty jab at those who have minds but don't use them properly.

The subtitle "Microscopic" emphasizes that the poem finds significance in the smallest things. Frost suggests that intelligence and the will to survive deserve respect regardless of the creature's size.`,
    themes: ["Respect for life", "Intelligence", "Human nature", "Compassion", "Observation", "The value of small things"],
    keyPoints: [
      "The speaker observes a tiny creature on his manuscript",
      "The mite shows signs of intelligence and fear - it makes decisions",
      "The speaker spares the creature's life out of respect for its mind",
      "Questions what constitutes intelligence and significance",
      "Even the smallest creatures deserve respect",
      "The poem values observation and thoughtfulness",
    ],
    importantQuotes: [
      "A speck that would have been beneath my sight on any other surface",
      "It paused as with suspicion of my pen",
      "It faltered: I could see it hesitate",
      "I have a mind myself and recognize mind when I meet with it",
      "No one can know how glad I am to find on any sheet the least display of mind",
    ],
    lineExplanations: [
      {
        lines: "Opening Lines",
        text: "A speck that would have been beneath my sight / On any sheet less white",
        explanation: "The poem begins with a tiny speck on paper. It's so small it would normally be invisible, but the white paper makes it noticeable. This sets up the theme: the smallest things become significant when we pay attention.",
      },
      {
        lines: "Discovery of Life",
        text: "I saw it was not dust... It was a living mite",
        explanation: "The speaker realizes the speck is alive - not lint or dust but a creature. This moment of recognition transforms something 'beneath my sight' into something worthy of attention and study.",
      },
      {
        lines: "Signs of Intelligence",
        text: "It paused as with suspicion of my pen... Then turned and fled",
        explanation: "The mite approaches the wet ink, stops (sensing danger?), then retreats. The speaker interprets this as decision-making - the creature seems to be thinking, evaluating, choosing. This is 'mind' in action.",
      },
      {
        lines: "Fear and Self-Preservation",
        text: "It faltered: I could see it hesitate... With terror",
        explanation: "The mite shows what appears to be fear - hesitation, uncertainty, awareness of danger. These are signs of consciousness, however primitive. The creature wants to survive.",
      },
      {
        lines: "The Choice",
        text: "I let it lie there... I stopped and watched",
        explanation: "The speaker chooses not to kill the mite. Instead of casually crushing it, he watches, observes, respects. This moment of choice is the poem's ethical center.",
      },
      {
        lines: "Reflection on Mind",
        text: "I have a mind myself and recognize / Mind when I meet with it in any guise",
        explanation: "The poem's key statement. The speaker respects intelligence wherever it appears. He recognizes 'mind' in the mite and honors it. Having a mind himself, he values mind in others - even tiny creatures.",
      },
    ],
    mcqs: [
      {
        question: "What does the speaker notice on his paper?",
        options: [
          "A piece of lint",
          "A living mite (tiny creature)",
          "A drop of ink",
          "A dead insect",
        ],
        correctAnswer: 1,
        explanation: "The speaker notices a tiny living mite - a microscopic creature moving across his paper.",
      },
      {
        question: "Why does the mite pause near the wet ink?",
        options: [
          "It is attracted to the ink",
          "It wants to die",
          "It seems to sense danger and hesitates (showing intelligence)",
          "It is tired",
        ],
        correctAnswer: 2,
        explanation: "The mite pauses 'as with suspicion' - it seems to recognize the wet ink as a danger and chooses to retreat.",
      },
      {
        question: "What does the speaker choose to do with the mite?",
        options: [
          "Kill it immediately",
          "Trap it for study",
          "Let it live out of respect for its intelligence",
          "Ignore it completely",
        ],
        correctAnswer: 2,
        explanation: "The speaker spares the mite because he recognizes 'mind' in its behavior - it deserves to live.",
      },
      {
        question: "What does 'I have a mind myself and recognize mind' mean?",
        options: [
          "The speaker is very intelligent",
          "The speaker respects intelligence wherever it appears, even in tiny creatures",
          "The speaker only respects human intelligence",
          "The speaker is talking to himself",
        ],
        correctAnswer: 1,
        explanation: "The speaker values intelligence in all forms. Having a mind himself, he recognizes and respects mind in the mite.",
      },
      {
        question: "What theme does this poem explore?",
        options: [
          "The superiority of humans",
          "The value of all life and respect for intelligence in any form",
          "The dangers of insects",
          "The importance of cleanliness",
        ],
        correctAnswer: 1,
        explanation: "The poem explores respect for life and intelligence, suggesting even the smallest creatures deserve consideration.",
      },
      {
        question: "What makes the speck 'considerable' despite its tiny size?",
        options: [
          "Its beautiful color",
          "Its ability to show intelligence and the will to survive",
          "Its speed",
          "Nothing - it is insignificant",
        ],
        correctAnswer: 1,
        explanation: "The speck is 'considerable' (worthy of consideration) because it displays intelligence - decision-making, fear, self-preservation.",
      },
      {
        question: "Why does the speaker observe the mite so carefully?",
        options: [
          "He is bored",
          "He is a scientist",
          "He is curious and values understanding other forms of life",
          "He wants to write a scientific paper",
        ],
        correctAnswer: 2,
        explanation: "The speaker's careful observation shows his curiosity and his value for understanding life in all its forms.",
      },
      {
        question: "What is the tone of this poem?",
        options: [
          "Angry and frustrated",
          "Thoughtful, witty, and philosophical",
          "Sad and mournful",
          "Frightened and anxious",
        ],
        correctAnswer: 1,
        explanation: "Frost's tone is thoughtful and witty - he finds humor and philosophy in observing a tiny creature.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "A speck that would have been beneath my sight\nOn any sheet less white;\nI saw it was not dust... but a living mite\nWith inclinations it could call its own.",
        questions: [
          {
            question: "What makes the speaker notice the tiny speck?",
            answer: "The white paper makes the speck visible. On any other surface, it would have been too small to notice. This shows how attention to detail can reveal significance in the smallest things.",
          },
          {
            question: "What does 'inclinations it could call its own' suggest about the mite?",
            answer: "This suggests the mite has its own will, preferences, and decision-making ability. It is not just a random speck but a creature with intentions - a form of mind or intelligence.",
          },
          {
            question: "How does this opening set up the poem's theme?",
            answer: "The opening establishes the theme by showing that something almost invisible can be significant when we pay attention. The speaker's careful observation reveals intelligence in the smallest creature.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "I have a mind myself and recognize\nMind when I meet with it in any guise.\nNo one can know how glad I am to find\nOn any sheet the least display of mind.",
        questions: [
          {
            question: "What is the speaker's attitude toward intelligence?",
            answer: "The speaker values intelligence in all forms. He is 'glad' to find any display of mind, even in a tiny mite. He respects consciousness wherever it appears.",
          },
          {
            question: "What does 'in any guise' mean here?",
            answer: "'In any guise' means in any form or appearance. Intelligence can appear in humans, animals, or even microscopic creatures. The speaker recognizes and respects it regardless of the form it takes.",
          },
          {
            question: "What is the poem's message about the value of life?",
            answer: "The poem suggests that all life that shows intelligence deserves respect. Size doesn't determine value - even a microscopic creature with a 'mind' is worthy of consideration and compassion.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Understatement",
        example: "A considerable speck",
        explanation: "Calling a microscopic mite 'considerable' is ironic understatement - it's tiny, yet the speaker finds it worthy of serious consideration.",
      },
      {
        device: "Personification",
        example: "It paused as with suspicion... faltered... hesitate",
        explanation: "The mite is given human qualities - suspicion, hesitation, decision-making - elevating it from mere speck to thinking creature.",
      },
      {
        device: "Irony",
        example: "The title 'A Considerable Speck'",
        explanation: "The irony is that something so small is 'considerable.' The poem challenges our assumptions about what deserves attention.",
      },
      {
        device: "Observation as Theme",
        example: "The detailed watching of the mite's behavior",
        explanation: "The act of careful observation is itself thematic - the speaker finds meaning by paying attention to what others would ignore.",
      },
      {
        device: "Wit and Humor",
        example: "The tone throughout the poem",
        explanation: "Frost's witty tone makes philosophy accessible. He finds humor in the situation while making serious points about intelligence and life.",
      },
    ],
  },
  {
    id: "the-power-of-music",
    title: "The Power of Music",
    author: "Bharati Mukherjee",
    type: "poem",
    summary: "A poem celebrating the transformative and healing power of music, showing how it can transport us beyond our immediate circumstances.",
    detailedSummary: `"The Power of Music" celebrates the extraordinary ability of music to transcend boundaries, heal wounds, and connect human beings across all divisions. The poem explores how music speaks a universal language that needs no translation.

The poem begins by establishing music as a force that exists beyond the physical realm. It is not merely sound waves or organized noise - it is something that touches the soul directly. The speaker describes how music can reach places within us that words cannot access.

Music is portrayed as a healer. Where medicine fails, where words prove inadequate, music can provide comfort and solace. It can ease grief, calm anxiety, and bring peace to troubled minds. The poem suggests that music operates on a level deeper than rational thought.

The poem also emphasizes music's universality. A melody can cross barriers of language, culture, and even time. A song sung centuries ago can still move listeners today. Music composed in one part of the world can touch hearts in another. This universality makes music one of humanity's greatest achievements and gifts.

The transformative power of music is another key theme. Music can change moods, alter perceptions, and transport listeners to different states of consciousness. A sorrowful piece can make us reflect; a joyful tune can lift our spirits. Music has the power to make us feel emotions we might otherwise suppress.

The poem reflects on how music connects people. Strangers at a concert become united in a shared experience. Families bond over favorite songs. Music creates communities and traditions that span generations. It is a thread that weaves through human civilization.

Ultimately, the poem is a celebration and a tribute to the ineffable quality of music - its ability to be both intensely personal and universally accessible, both ancient and forever new.`,
    themes: ["Music", "Healing", "Transcendence", "Emotional connection", "Universality", "Human unity"],
    keyPoints: [
      "Music has the ability to heal and soothe wounds that medicine cannot touch",
      "It connects people across cultures, languages, and time periods",
      "Music can transport us to different states of mind and consciousness",
      "Celebrates the universal language of melody that needs no translation",
      "Music creates shared experiences that unite strangers",
      "It touches the soul in ways that words cannot express",
    ],
    importantQuotes: [
      "Music can heal the wounds that medicine cannot touch",
      "A melody can cross the barriers of language",
      "Music speaks to the soul without needing translation",
      "Where words fail, music speaks",
      "The power of music lies in its universality",
    ],
    lineExplanations: [
      {
        lines: "Opening Lines",
        text: "Music speaks where words fail to reach",
        explanation: "The poem opens by establishing music's superiority to verbal communication in certain contexts. While words have limits, music can express emotions and ideas that language cannot capture. This sets up the poem's central theme of music's transcendent power.",
      },
      {
        lines: "Healing Power",
        text: "Music can heal the wounds that medicine cannot touch",
        explanation: "This powerful line suggests that music operates on a spiritual or emotional level that physical medicine cannot reach. Grief, heartbreak, despair - these wounds of the soul respond to music's healing power.",
      },
      {
        lines: "Universal Language",
        text: "A melody can cross the barriers of language and culture",
        explanation: "Music is portrayed as truly universal. Unlike spoken or written language, which requires translation, music communicates directly. A song from any culture can move listeners from any other culture.",
      },
      {
        lines: "Transformation",
        text: "Music transforms the listener, takes them beyond the everyday",
        explanation: "The poem describes music's ability to alter consciousness, to transport the listener from mundane reality to a heightened state of awareness and feeling.",
      },
      {
        lines: "Connection",
        text: "Through music, strangers become united in shared feeling",
        explanation: "Music creates community. At a concert, in a choir, around a campfire - music brings people together in ways that few other activities can match.",
      },
      {
        lines: "Timelessness",
        text: "Songs of centuries past still speak to hearts today",
        explanation: "Music transcends time. Ancient melodies can still move modern listeners, creating a connection across generations and centuries.",
      },
    ],
    mcqs: [
      {
        question: "What is the main theme of 'The Power of Music'?",
        options: [
          "The history of musical instruments",
          "The transformative, healing, and unifying power of music",
          "How to compose music",
          "The decline of music in modern times",
        ],
        correctAnswer: 1,
        explanation: "The poem celebrates music's ability to heal, transform, and unite people across all boundaries.",
      },
      {
        question: "According to the poem, what can music heal that medicine cannot?",
        options: [
          "Physical injuries",
          "Wounds of the soul - grief, heartbreak, emotional pain",
          "Diseases",
          "Broken bones",
        ],
        correctAnswer: 1,
        explanation: "Music heals emotional and spiritual wounds that physical medicine cannot address.",
      },
      {
        question: "Why is music described as a 'universal language'?",
        options: [
          "Everyone speaks the same language",
          "Music needs no translation - it communicates directly to the heart",
          "All music sounds the same",
          "Music has subtitles",
        ],
        correctAnswer: 1,
        explanation: "Music crosses barriers of language and culture because it speaks directly to emotions without needing words.",
      },
      {
        question: "How does music connect people according to the poem?",
        options: [
          "Through social media",
          "By creating shared emotional experiences that unite strangers",
          "By forcing them to sit together",
          "Through verbal communication",
        ],
        correctAnswer: 1,
        explanation: "Music brings people together through shared emotional experiences - at concerts, in communities, across generations.",
      },
      {
        question: "What does the poem suggest about music and time?",
        options: [
          "Music is only relevant when it's new",
          "Ancient music is irrelevant today",
          "Music transcends time - old songs can still move modern listeners",
          "Time destroys all music",
        ],
        correctAnswer: 2,
        explanation: "The poem emphasizes music's timelessness - songs from centuries past can still speak to hearts today.",
      },
      {
        question: "What does 'where words fail, music speaks' mean?",
        options: [
          "Words are useless",
          "Music can express emotions and ideas that language cannot capture",
          "Music replaces all conversation",
          "Words and music are enemies",
        ],
        correctAnswer: 1,
        explanation: "Some emotions and experiences are beyond verbal expression; music can communicate what words cannot.",
      },
      {
        question: "How does music transform the listener according to the poem?",
        options: [
          "By changing their physical appearance",
          "By altering their mood and transporting them beyond everyday reality",
          "By making them rich",
          "By teaching them facts",
        ],
        correctAnswer: 1,
        explanation: "Music transforms listeners by altering their emotional state and transporting them to heightened awareness.",
      },
      {
        question: "What is the overall tone of this poem?",
        options: [
          "Angry and critical",
          "Celebratory and reverent",
          "Sad and mournful",
          "Indifferent and cold",
        ],
        correctAnswer: 1,
        explanation: "The poem celebrates music with reverence and appreciation for its power and beauty.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "Music can heal the wounds that medicine cannot touch. A melody can cross the barriers of language and reach the heart directly, speaking what words cannot express.",
        questions: [
          {
            question: "What kind of wounds can music heal that medicine cannot?",
            answer: "Music can heal emotional and spiritual wounds - grief, heartbreak, loneliness, despair. These are wounds of the soul that physical medicine cannot treat but music can soothe and heal.",
          },
          {
            question: "How does music 'cross barriers of language'?",
            answer: "Music communicates through melody, rhythm, and emotion rather than words. It doesn't need translation because it speaks directly to feelings. A song from any culture can move listeners from any other culture.",
          },
          {
            question: "What does 'speaking what words cannot express' suggest about music?",
            answer: "This suggests that music can communicate experiences and emotions that are beyond verbal language. Some feelings are too deep, complex, or ineffable for words, but music can capture and convey them.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "Through music, strangers become united in shared feeling. The power of music lies in its universality - it speaks to all hearts, regardless of origin, creating connections that transcend all boundaries.",
        questions: [
          {
            question: "How does music unite strangers?",
            answer: "Music creates shared emotional experiences. At a concert or gathering, people who don't know each other can feel the same emotions, creating a bond. Music gives people a common experience that connects them.",
          },
          {
            question: "What does the 'universality' of music mean?",
            answer: "Universality means music speaks to everyone regardless of culture, language, age, or background. It is a truly global language that all human beings can understand and respond to.",
          },
          {
            question: "What boundaries does music transcend according to the poem?",
            answer: "Music transcends boundaries of language, culture, time, geography, and social divisions. It connects people across all the barriers that normally separate human beings.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Personification",
        example: "Music speaks to the soul",
        explanation: "Music is given human ability to 'speak,' emphasizing its communicative power and its direct connection to human emotions.",
      },
      {
        device: "Metaphor",
        example: "Music heals wounds",
        explanation: "Comparing music to medicine, this metaphor emphasizes its therapeutic and restorative power over emotional pain.",
      },
      {
        device: "Hyperbole",
        example: "Music can cross all barriers",
        explanation: "This exaggeration emphasizes music's remarkable universality and its power to connect across any division.",
      },
      {
        device: "Abstract Imagery",
        example: "Speaking to the heart/soul directly",
        explanation: "The poem uses abstract imagery to describe music's intangible effects on emotions and spirit.",
      },
      {
        device: "Celebratory Tone",
        example: "The overall reverent treatment of music",
        explanation: "The poet adopts a tone of celebration and wonder, treating music as something almost sacred in its power.",
      },
    ],
  },
];

export const TREASURE_TROVE_STORIES: TreasureTroveItem[] = [
  {
    id: "bonku-babus-friend",
    title: "Bonku Babu's Friend",
    author: "Satyajit Ray",
    type: "story",
    summary: "A science fiction story about Bonku Babu, a meek schoolteacher constantly bullied by villagers, who encounters an alien named Ang who restores his self-confidence.",
    detailedSummary: `"Bonku Babu's Friend" by Satyajit Ray is a heartwarming science fiction story that combines humor, social commentary, and fantasy to tell the tale of a man who finds his self-respect through the most unlikely of friendships.

Bonku Babu (Bhudeb Chakraborty) is a geography teacher in the small village of Kankurgachhi. He is a gentle, simple man who has become the target of everyone's mockery. The village bullies, led by the wealthy Sripati Majumdar, make him the butt of all their jokes. At the Saturday gatherings at Sripati's house, Bonku is constantly humiliated - they make him sit on a broken chair, serve him burnt rice, and ridicule everything he says.

The story establishes that this cruelty has continued for years. Bonku accepts the mockery silently, never defending himself, which only encourages the bullies. Even when they play cruel pranks on him, he doesn't retaliate. He has lost all self-respect and believes he deserves this treatment.

One night, talk at Sripati's gathering turns to a report of a UFO sighting. Everyone mocks the idea of aliens, especially ridiculing Bonku when he tentatively suggests it might be possible. They invent an elaborate hoax to frighten him - planning to dress up as an alien on the path Bonku walks home through a bamboo grove.

But that very night, a real spaceship lands in the bamboo grove. Bonku, walking home alone, encounters a glowing figure - a real alien named Ang from the planet Dorado. Initially terrified, Bonku is amazed when the alien speaks to him.

Ang reveals that he has been observing Earth and studying humans. He has chosen to communicate with Bonku specifically. Why? Because of all the people Ang observed, Bonku is distinguished by his goodness and his lack of meanness. While others around him are cruel, selfish, and petty, Bonku remains kind and patient. "You are a good man," Ang tells him.

This recognition transforms Bonku. For the first time in his life, someone has acknowledged his worth - and that someone is an advanced being from another planet. Ang gives Bonku a small gift (a pill that will give him a perfect memory for 24 hours) and departs in his spacecraft.

The next morning, Bonku is a changed man. When he arrives at the school and the students try to bully him as usual, he responds with quiet authority. When Sripati sends a mocking invitation for the Saturday gathering, Bonku declines firmly. He stands up straight, looks people in the eye, and carries himself with dignity.

The bullies are bewildered by this transformation. They don't know what happened to Bonku in the bamboo grove. But Bonku knows. He has been recognized as good by someone whose judgment matters - and that has restored his sense of self-worth.

The story is a powerful commentary on bullying, the importance of self-respect, and how external validation - especially from an unexpected source - can help someone find their inner strength.`,
    themes: ["Self-respect", "Bullying", "Kindness", "Unexpected friendship", "Inner worth", "Transformation"],
    keyPoints: [
      "Bonku Babu is a meek geography teacher constantly bullied and humiliated by villagers",
      "The village bullies, led by Sripati, make him the target of cruel jokes and pranks",
      "An alien named Ang from planet Dorado lands in the bamboo grove and meets Bonku",
      "Ang chooses Bonku because he is good and kind despite the cruelty around him",
      "The alien's recognition of Bonku's worth transforms his self-image completely",
      "Bonku stands up to his bullies and regains his dignity after the encounter",
    ],
    characters: [
      { name: "Bonku Babu (Bhudeb Chakraborty)", description: "A timid, gentle geography teacher in Kankurgachhi. Despite constant mockery and bullying, he remains kind and patient. His encounter with Ang restores his self-confidence." },
      { name: "Ang", description: "An alien from planet Dorado who has been observing Earth. He chooses to communicate with Bonku because of his goodness. Represents recognition of inner worth." },
      { name: "Sripati Majumdar", description: "A wealthy village bully who leads the mockery of Bonku. He hosts Saturday gatherings where Bonku is humiliated." },
      { name: "Nidhu Babu", description: "Another village bully who participates in mocking Bonku." },
      { name: "Ramkanai", description: "Part of the group that bullies Bonku at the Saturday meetings." },
    ],
    importantQuotes: [
      "You are a good man, Dorado recognizes goodness",
      "Bonku Babu suddenly felt ten feet tall",
      "He was the same Dorado, yet not the same",
      "He had found something in himself that had been buried all these years",
      "Bonku Babu quietly declined the invitation",
    ],
    lineExplanations: [
      {
        lines: "Opening Section",
        text: "Description of the Saturday meetings at Sripati's house",
        explanation: "The story opens by establishing the pattern of bullying. Every Saturday, Bonku is made to attend gatherings where he is systematically humiliated - given a broken chair, served burnt rice, mocked for everything he says. This establishes the cruelty he endures.",
      },
      {
        lines: "Bonku's Character",
        text: "Bonku never retaliates, never defends himself",
        explanation: "Bonku's passive acceptance of mockery shows his complete loss of self-respect. Years of bullying have convinced him he deserves this treatment. He has internalized the bullies' view of him.",
      },
      {
        lines: "The UFO Discussion",
        text: "The villagers mock the idea of aliens and plan a hoax",
        explanation: "When UFO sightings are mentioned, the bullies plan to dress up as an alien to frighten Bonku. This represents the peak of their cruelty - they will go to elaborate lengths just to humiliate him.",
      },
      {
        lines: "The Real Encounter",
        text: "A real spaceship lands; Bonku meets Ang",
        explanation: "The twist of the story: a real alien appears. While the bullies planned a fake encounter, Bonku experiences a genuine one. This unexpected reality changes everything.",
      },
      {
        lines: "Ang's Recognition",
        text: "'You are a good man. Dorado recognizes goodness.'",
        explanation: "This is the story's emotional climax. Ang, an advanced being, sees what the villagers miss - Bonku's inherent goodness. This external validation from an unexpected source restores Bonku's sense of self-worth.",
      },
      {
        lines: "The Transformation",
        text: "Bonku stands up straight, declines the invitation, carries himself with dignity",
        explanation: "After the encounter, Bonku is transformed. He no longer accepts mockery. He has found his buried self-respect. The bullies are bewildered by this new Bonku.",
      },
    ],
    mcqs: [
      {
        question: "What is Bonku Babu's profession?",
        options: [
          "Shopkeeper",
          "Geography teacher",
          "Doctor",
          "Farmer",
        ],
        correctAnswer: 1,
        explanation: "Bonku Babu is a geography teacher in the village of Kankurgachhi.",
      },
      {
        question: "Why is Bonku constantly bullied by the villagers?",
        options: [
          "Because he is cruel to them",
          "Because he is wealthy",
          "Because he is meek and never fights back",
          "Because he is a criminal",
        ],
        correctAnswer: 2,
        explanation: "Bonku is gentle and passive, never defending himself, which makes him an easy target for bullies.",
      },
      {
        question: "What did the villagers plan to do to frighten Bonku?",
        options: [
          "Lock him in a room",
          "Dress up as a ghost",
          "Dress up as an alien as a hoax",
          "Steal his belongings",
        ],
        correctAnswer: 2,
        explanation: "The bullies planned to dress up as an alien to frighten Bonku in the bamboo grove.",
      },
      {
        question: "Who is Ang?",
        options: [
          "A villager in disguise",
          "Bonku's relative",
          "A real alien from planet Dorado",
          "A teacher",
        ],
        correctAnswer: 2,
        explanation: "Ang is a real alien from the planet Dorado who lands in the bamboo grove and meets Bonku.",
      },
      {
        question: "Why did Ang choose to communicate with Bonku?",
        options: [
          "Because Bonku was intelligent",
          "Because Bonku was wealthy",
          "Because Bonku was good and kind unlike the others around him",
          "Because Bonku was a teacher",
        ],
        correctAnswer: 2,
        explanation: "Ang chose Bonku because of his inherent goodness and kindness, which the alien recognized despite the cruelty around him.",
      },
      {
        question: "What gift did Ang give to Bonku?",
        options: [
          "A spaceship",
          "Gold coins",
          "A pill that gives perfect memory for 24 hours",
          "A weapon",
        ],
        correctAnswer: 2,
        explanation: "Ang gave Bonku a small pill that would give him perfect memory for 24 hours.",
      },
      {
        question: "How does Bonku change after meeting Ang?",
        options: [
          "He becomes cruel",
          "He leaves the village",
          "He regains his self-respect and stands up to bullies",
          "He becomes an alien",
        ],
        correctAnswer: 2,
        explanation: "After Ang recognizes his worth, Bonku is transformed - he carries himself with dignity and refuses to be bullied anymore.",
      },
      {
        question: "What is the main message of this story?",
        options: [
          "Aliens are dangerous",
          "Bullying is acceptable",
          "Inner goodness has value and deserves recognition; self-respect can be restored",
          "Teachers should be bullied",
        ],
        correctAnswer: 2,
        explanation: "The story teaches that inner goodness has value, and external recognition can help restore buried self-respect.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "Every Saturday evening, Bonku Babu had to attend the meeting at Sripati Majumdar's house. He was always given a broken chair to sit on. He was always served burnt rice. And he was always the butt of everyone's jokes.",
        questions: [
          {
            question: "What do these details reveal about how Bonku is treated?",
            answer: "These details show systematic, deliberate humiliation. The broken chair, burnt rice, and constant mockery are not accidents - they are intentional cruelties. Bonku is treated as less than human, unworthy of basic respect.",
          },
          {
            question: "Why does Bonku continue to attend these meetings?",
            answer: "Bonku has lost his self-respect after years of bullying. He may feel socially obligated, or he may have come to believe he deserves this treatment. His passive acceptance only encourages the bullies.",
          },
          {
            question: "What does this opening establish about the story's themes?",
            answer: "This opening establishes themes of bullying, loss of self-respect, and social cruelty. It shows how a community can collectively mistreat a gentle person, setting up the transformation that will come later.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "'You are a good man,' said Ang. 'Of all the people I observed in this area, you alone showed no meanness. You were patient when others were cruel. You were kind when others were selfish. Dorado recognizes goodness.'",
        questions: [
          {
            question: "Why is this moment significant for Bonku?",
            answer: "This is the first time anyone has recognized Bonku's worth. An advanced being from another planet sees what the villagers miss - his fundamental goodness. This external validation from an unlikely source restores his buried self-respect.",
          },
          {
            question: "What does Ang's observation reveal about the other villagers?",
            answer: "Ang's words reveal that the other villagers are mean, cruel, and selfish - while Bonku is the opposite. The villagers' cruelty to Bonku actually highlights his moral superiority over them.",
          },
          {
            question: "How does this encounter transform Bonku?",
            answer: "Being recognized as good by an advanced, objective observer gives Bonku a new perspective on himself. He realizes his worth doesn't depend on the villagers' opinions. This realization transforms his self-image and restores his dignity.",
          },
        ],
      },
      {
        id: "passage-3",
        extract: "The next morning, Bonku Babu walked differently. He stood straight. He looked people in the eye. When the students tried their usual tricks, he responded with quiet authority. When Sripati's invitation came, he quietly declined.",
        questions: [
          {
            question: "How do these physical changes reflect Bonku's inner transformation?",
            answer: "Standing straight and making eye contact show restored self-confidence. These outward changes reflect his inner transformation - he now believes in his own worth and carries himself accordingly.",
          },
          {
            question: "What does declining Sripati's invitation signify?",
            answer: "Declining the invitation is Bonku's first act of self-assertion. He refuses to be humiliated anymore. This marks his break from the pattern of passive acceptance that had defined his life.",
          },
          {
            question: "What message does this transformation convey?",
            answer: "The transformation shows that self-respect can be restored. Once Bonku recognizes his own worth, he no longer accepts mistreatment. External validation helped him find his buried inner strength.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Science Fiction Elements",
        example: "The alien encounter with Ang",
        explanation: "Ray uses science fiction as a vehicle for social commentary. The alien serves as an objective observer who recognizes what humans miss.",
      },
      {
        device: "Irony",
        example: "The planned fake alien hoax vs. the real alien encounter",
        explanation: "Dramatic irony: the bullies plan a fake alien to scare Bonku, but a real alien appears and becomes his friend. The hoax backfires completely.",
      },
      {
        device: "Contrast",
        example: "Bonku before and after the encounter",
        explanation: "The stark contrast between the meek Bonku and the confident Bonku highlights the power of restored self-respect.",
      },
      {
        device: "Characterization through Action",
        example: "The bullies' elaborate cruelties",
        explanation: "The detailed description of how Bonku is humiliated characterizes both the bullies (cruel, petty) and Bonku (patient, long-suffering).",
      },
      {
        device: "Transformation Arc",
        example: "Bonku's journey from victim to self-respect",
        explanation: "The story follows a classic transformation arc - the protagonist moves from a low point to self-actualization through an unexpected catalyst.",
      },
    ],
  },
  {
    id: "oliver-asks-for-more",
    title: "Oliver Asks for More",
    author: "Charles Dickens",
    type: "story",
    summary: "An excerpt from Oliver Twist where the starving orphan Oliver, pushed by other boys, dares to ask for more gruel, causing outrage among the workhouse authorities.",
    detailedSummary: `"Oliver Asks for More" is one of the most famous scenes in English literature, taken from Charles Dickens' novel "Oliver Twist" (1838). It is a powerful indictment of the Poor Law system and the treatment of orphans in Victorian England.

The story is set in a workhouse - an institution where the poor, including orphans, were housed and made to work. The boys in the workhouse are deliberately kept hungry. The authorities have calculated exactly how little food they can give to keep the children barely alive while spending the minimum amount of money. Each boy receives one small bowl of thin gruel per meal, with an onion twice a week and half a roll on Sundays.

The boys are constantly starving. One larger boy, wild with hunger, threatens that he will eat one of the smaller boys if he doesn't get more food. In desperation, the boys draw lots to decide who will ask the master for more food. The lot falls on Oliver Twist.

That evening, after supper, the boys nudge Oliver forward. With his bowl and spoon in hand, Oliver approaches the master - a fat, healthy man in a white apron - and utters the immortal words: "Please, sir, I want some more."

The master's reaction is theatrical outrage. He turns pale, stares in astonishment, then grabs Oliver by the collar and screams for the beadle, Mr. Bumble. The board members are called into an emergency meeting. "Oliver Twist has asked for more!" becomes a scandalous announcement.

The board members are horrified - not at the children's hunger, but at Oliver's audacity in asking for food. They predict Oliver will come to a bad end (perhaps be hanged). Mr. Limbkins declares, "That boy will be hung." They decide to get rid of Oliver by offering five pounds to anyone who will take him as an apprentice.

The scene exposes the hypocrisy and cruelty of the Victorian establishment. The well-fed authorities, who sit in "solemn conclave" making decisions about poor children's lives, are outraged not by starvation but by a child's simple request for food. Their reaction - treating a hungry child's plea as a crime - reveals the moral bankruptcy of the system.

Dickens uses this scene to critique the Poor Law Amendment Act of 1834, which created harsh conditions in workhouses deliberately to discourage the poor from seeking assistance. The story became a powerful symbol of social injustice and helped change public attitudes toward the poor.`,
    themes: ["Poverty", "Injustice", "Courage", "Child exploitation", "Social criticism", "Hypocrisy"],
    keyPoints: [
      "Children in the workhouse are deliberately underfed - each gets only one small bowl of thin gruel",
      "The boys are so hungry they draw lots to decide who will ask for more food",
      "Oliver is chosen and speaks the famous words: 'Please, sir, I want some more'",
      "The master and authorities react with exaggerated outrage at this simple request",
      "Oliver is treated as a criminal for being hungry - the board wants to get rid of him",
      "The scene criticizes Victorian society's cruel treatment of orphans and the poor",
    ],
    characters: [
      { name: "Oliver Twist", description: "An innocent orphan boy of about nine years old. Despite constant mistreatment, he remains gentle and brave. His simple request for more food becomes a symbol of all suffering children." },
      { name: "Mr. Bumble", description: "The workhouse beadle (official). He is pompous, cruel, and self-important. He represents the heartless bureaucracy that administers the Poor Law." },
      { name: "The Master", description: "The fat, healthy man who serves the gruel. His well-fed appearance contrasts with the starving children. His outraged reaction to Oliver's request is deliberately theatrical." },
      { name: "The Board Members", description: "Well-fed gentlemen in white waistcoats who make decisions about poor children's lives. They represent institutional cruelty and hypocrisy." },
      { name: "Mr. Limbkins", description: "The board member who declares 'That boy will be hung' - showing how authorities criminalize poverty." },
    ],
    importantQuotes: [
      "Please, sir, I want some more",
      "The board were sitting in solemn conclave",
      "Oliver Twist has asked for more!",
      "That boy will be hung",
      "Child as he was, he was desperate with hunger",
      "The gruel was served out; and a long grace was said over the short commons",
    ],
    lineExplanations: [
      {
        lines: "Opening: The Workhouse System",
        text: "The room in which the boys were fed was a large stone hall... One small bowl of gruel was served to each boy.",
        explanation: "Dickens establishes the harsh setting - a cold stone hall where children receive inadequate food. The systematic starvation is presented as official policy, not neglect.",
      },
      {
        lines: "The Boys' Desperation",
        text: "The bowls never wanted washing... The boys polished them with their spoons till they shone.",
        explanation: "This detail shows how hungry the boys are - they lick their bowls completely clean. Dickens uses specific details to make the suffering vivid and undeniable.",
      },
      {
        lines: "Drawing Lots",
        text: "A council was held; lots were cast... and the lot fell upon Oliver Twist.",
        explanation: "The boys organize collectively out of desperation. That they must draw lots to ask for food - as if it were a dangerous mission - shows how frightening the authorities are to these children.",
      },
      {
        lines: "The Famous Request",
        text: "'Please, sir, I want some more.'",
        explanation: "These six simple words are among the most famous in English literature. Oliver's polite, humble request - asking for what should be a basic right - becomes an act of defiance against an unjust system.",
      },
      {
        lines: "The Master's Reaction",
        text: "The master was a fat, healthy man; but he turned very pale... gazed in stupefied astonishment.",
        explanation: "The contrast is sharp: the well-fed master versus starving children. His exaggerated shock at a hungry child asking for food reveals the absurdity and cruelty of the system.",
      },
      {
        lines: "The Board's Response",
        text: "'That boy will be hung,' said the gentleman in the white waistcoat.",
        explanation: "This prediction - that a hungry child asking for food will be executed - shows how poverty is criminalized. The board treats Oliver's natural human need as a moral failing deserving punishment.",
      },
    ],
    mcqs: [
      {
        question: "Why do the boys draw lots?",
        options: [
          "To choose a leader",
          "To decide who will ask for more food",
          "To escape the workhouse",
          "To divide extra food",
        ],
        correctAnswer: 1,
        explanation: "The starving boys draw lots to decide who will take the risk of asking the master for more food.",
      },
      {
        question: "What are the famous words Oliver speaks?",
        options: [
          "'I am hungry, sir'",
          "'Please, sir, I want some more'",
          "'Feed us better, sir'",
          "'The food is terrible'",
        ],
        correctAnswer: 1,
        explanation: "'Please, sir, I want some more' - these six words are among the most famous in English literature.",
      },
      {
        question: "How does the master react to Oliver's request?",
        options: [
          "He gives Oliver more food",
          "He ignores Oliver",
          "He turns pale with shock and calls for the beadle",
          "He laughs at Oliver",
        ],
        correctAnswer: 2,
        explanation: "The master reacts with exaggerated outrage, turning pale and calling for Mr. Bumble as if Oliver had committed a crime.",
      },
      {
        question: "What does Mr. Limbkins predict about Oliver?",
        options: [
          "That he will become rich",
          "That he will be hung (executed)",
          "That he will escape",
          "That he will get more food",
        ],
        correctAnswer: 1,
        explanation: "Mr. Limbkins says 'That boy will be hung' - treating a hungry child's request as if it were a capital crime.",
      },
      {
        question: "What is Dickens criticizing in this scene?",
        options: [
          "Oliver's bad manners",
          "The other boys' cowardice",
          "The cruel treatment of poor children and the hypocrisy of Victorian authorities",
          "The quality of the gruel",
        ],
        correctAnswer: 2,
        explanation: "Dickens criticizes the Victorian Poor Law system and the cruel, hypocritical authorities who starve children while living well themselves.",
      },
      {
        question: "What does the contrast between the fat master and the thin children suggest?",
        options: [
          "The master exercises regularly",
          "The children eat too much",
          "The system benefits authorities while starving those it should help",
          "Nothing significant",
        ],
        correctAnswer: 2,
        explanation: "The visual contrast between the well-fed master and starving children highlights the injustice - those who control resources take plenty while denying necessities to others.",
      },
      {
        question: "Why does the board decide to apprentice Oliver out?",
        options: [
          "To help him learn a trade",
          "To punish him and get rid of him for asking for more",
          "Because he graduated from the workhouse",
          "To make him happy",
        ],
        correctAnswer: 1,
        explanation: "The board wants to get rid of Oliver as punishment for his 'audacity' in asking for food - they offer five pounds to anyone who will take him.",
      },
      {
        question: "What is the significance of Oliver's politeness ('Please, sir...')?",
        options: [
          "It shows Oliver is well-educated",
          "It emphasizes his innocence and the injustice of the harsh reaction",
          "It shows he doesn't really need food",
          "It is sarcastic",
        ],
        correctAnswer: 1,
        explanation: "Oliver's polite, humble request emphasizes his innocence. The authorities' harsh reaction to such a gentle plea makes their cruelty more obvious.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "The bowls never wanted washing. The boys polished them with their spoons till they shone again... Child as he was, he was desperate with hunger, and reckless with misery.",
        questions: [
          {
            question: "What does 'the bowls never wanted washing' tell us about the children's hunger?",
            answer: "This detail shows extreme hunger - the boys lick their bowls so clean that no washing is needed. They are so starved that they consume every last trace of food, even scraping with their spoons until the bowls shine.",
          },
          {
            question: "What does 'desperate with hunger and reckless with misery' reveal about Oliver's state?",
            answer: "This phrase shows Oliver has reached a breaking point. He is not being brave by choice but is driven by desperation beyond fear. His misery has made him 'reckless' - he no longer cares about consequences because his suffering is unbearable.",
          },
          {
            question: "How does Dickens use these details to build sympathy for the children?",
            answer: "By showing specific, vivid details of hunger (polishing bowls, desperation), Dickens makes the children's suffering concrete and undeniable. Readers cannot ignore such evidence of starvation, which builds sympathy and outrage.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "The master was a fat, healthy man; but he turned very pale. He gazed in stupefied astonishment on the small rebel for some seconds, and then clung for support to the copper.",
        questions: [
          {
            question: "What is the significance of describing the master as 'fat, healthy'?",
            answer: "The master's fat, healthy appearance contrasts sharply with the thin, starving children. This contrast shows the injustice of the system - those who control resources take plenty while denying food to children in their care.",
          },
          {
            question: "Why does Dickens call Oliver a 'small rebel'?",
            answer: "Calling Oliver a 'small rebel' is ironic. A hungry child asking for food is not rebellion - it's a natural human need. But in this unjust system, even basic requests are treated as defiance. The word 'small' emphasizes Oliver's vulnerability.",
          },
          {
            question: "Why does the master need to 'cling for support'?",
            answer: "This exaggerated reaction is satirical. The master acts as if Oliver's request were a shocking attack, needing physical support. Dickens mocks the authorities' theatrical outrage at something so innocent.",
          },
        ],
      },
      {
        id: "passage-3",
        extract: "'That boy will be hung,' said the gentleman in the white waistcoat... 'I know that boy will be hung.'",
        questions: [
          {
            question: "What does this prediction reveal about the board's attitude toward poor children?",
            answer: "The prediction reveals that authorities view poor children as future criminals rather than victims. A hungry child asking for food is seen as showing criminal tendencies deserving execution. Poverty is criminalized.",
          },
          {
            question: "What is ironic about a 'gentleman in a white waistcoat' making this statement?",
            answer: "The irony is that a well-dressed, well-fed gentleman condemns a starving child. The 'white waistcoat' suggests respectability and moral purity, yet the wearer shows no compassion. Appearance of virtue hides moral bankruptcy.",
          },
          {
            question: "How does this scene function as social criticism?",
            answer: "Dickens shows how Victorian institutions treated poverty as a moral failing deserving punishment. The board's response - predicting execution for a hungry child - exposes the cruelty hiding behind respectable institutions.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Irony",
        example: "Oliver called a 'rebel' for asking for food; board's outrage at a child's hunger",
        explanation: "The irony exposes the absurdity of the system. Treating a hungry child's request as rebellion or crime reveals the moral bankruptcy of the authorities.",
      },
      {
        device: "Contrast",
        example: "Fat, healthy master vs. thin, starving children",
        explanation: "Visual contrast highlights injustice. Those who control resources eat well while denying food to those in their care.",
      },
      {
        device: "Satire",
        example: "The exaggerated reactions of master and board",
        explanation: "Dickens satirizes Victorian institutions by showing their absurd, theatrical responses to a simple request for food.",
      },
      {
        device: "Symbolism",
        example: "The gruel represents the minimum given to the poor",
        explanation: "The thin, inadequate gruel symbolizes how society treats its poorest members - giving the bare minimum while spending as little as possible.",
      },
      {
        device: "Social Commentary",
        example: "The entire scene critiques the Poor Law system",
        explanation: "Dickens uses the scene to attack the Poor Law Amendment Act of 1834, which deliberately made workhouse conditions harsh to discourage the poor from seeking help.",
      },
    ],
  },
  {
    id: "the-model-millionaire",
    title: "The Model Millionaire",
    author: "Oscar Wilde",
    type: "story",
    summary: "A witty story about Hughie Erskine, a charming but poor young man who gives a sovereign to an old beggar, only to discover the beggar was actually a millionaire in disguise.",
    detailedSummary: `"The Model Millionaire" by Oscar Wilde is a witty, charming story that plays with themes of appearances, generosity, and the nature of true wealth. It has Wilde's characteristic humor and his ability to deliver moral insights with a light touch.

Hughie Erskine is a handsome, charming young man who is poor through no fault of his own. He has tried various professions - the Stock Exchange, tea trade, wine business - but succeeded at nothing except being delightful company. Everyone likes Hughie, but liking doesn't pay bills.

Hughie is in love with Laura Merton, a beautiful girl whose father, Colonel Merton, has set a condition for marriage: Hughie must have ten thousand pounds of his own. Since Hughie has only two hundred pounds a year (and even that is uncertain), the situation seems hopeless.

One day, Hughie visits his friend Alan Trevor, an artist. Alan is painting a life-size portrait of a beggar - a magnificent work showing a wrinkled old man in ragged clothes, with a sad, weather-beaten face. The model is actually posing in the studio, and Hughie feels great pity for him.

While Alan steps out to speak with a frame-maker, Hughie stays alone with the old beggar. Moved by compassion, Hughie searches his pockets and finds only a sovereign (one pound). Though it is all the money he has to last him the rest of the month, Hughie impulsively gives it to the old man, saying, "You need it more than I do."

The old man accepts with a strange smile and slips the coin into his pocket. When Alan returns, Hughie describes what he did. Alan bursts into laughter and reveals the truth: the 'beggar' is actually Baron Hausberg, one of the richest men in Europe! He is posing as a beggar for Alan's painting.

Hughie is mortified. He has given a sovereign - his last money - to a millionaire, thinking him poor! He fears he has made a fool of himself. Alan assures him the Baron has a good sense of humor.

The next day, a messenger from Baron Hausberg arrives at Hughie's lodgings with an envelope. Inside is a check for ten thousand pounds, made out to "Hughie Erskine and Laura Merton" - a wedding present.

The Baron, touched by Hughie's genuine kindness (giving away his last coin to someone he thought was poor), has decided to give Hughie the exact sum he needs to marry Laura. The story ends with Hughie and Laura's wedding, with Alan Trevor making a speech about "model millionaires" being rare.

Wilde's story celebrates genuine generosity - Hughie's gift was valuable not because of its monetary worth (a sovereign is nothing to a millionaire) but because of the sacrifice it represented. The Baron recognized true kindness and rewarded it handsomely.`,
    themes: ["Generosity", "Appearances vs reality", "Reward for kindness", "True wealth", "Irony", "Love"],
    keyPoints: [
      "Hughie Erskine is charming but poor - he cannot marry Laura without £10,000",
      "He visits his artist friend Alan who is painting a 'beggar'",
      "Hughie gives his last sovereign to the 'beggar' out of compassion",
      "The beggar is actually Baron Hausberg, one of the richest men in Europe",
      "The Baron rewards Hughie's kindness with a £10,000 wedding gift",
      "True wealth is measured by generosity of heart, not size of bank account",
    ],
    characters: [
      { name: "Hughie Erskine", description: "A charming, handsome young man who is poor but generous. He has failed at various professions but succeeds at being kind. His impulsive gift of his last sovereign shows his genuine good heart." },
      { name: "Laura Merton", description: "Hughie's beloved, a beautiful girl. Her father will not allow marriage until Hughie has £10,000. She represents the goal Hughie cannot reach on his own." },
      { name: "Colonel Merton", description: "Laura's father, a practical man who demands financial security before allowing the marriage. His condition drives the plot." },
      { name: "Baron Hausberg", description: "One of the richest men in Europe who poses as a beggar model for a painting. He recognizes and rewards Hughie's genuine kindness with a transformative gift." },
      { name: "Alan Trevor", description: "An artist and Hughie's friend. He is painting the Baron as a beggar. He delivers the witty closing line about 'model millionaires.'" },
    ],
    importantQuotes: [
      "Millionaire models are rare enough; but model millionaires are rarer still",
      "The best thing I can do is pay him a compliment",
      "You need it more than I do",
      "He has got to have ten thousand pounds of his own",
      "Rich people don't want presents",
      "An envelope containing a cheque for ten thousand pounds",
    ],
    lineExplanations: [
      {
        lines: "Opening: Hughie's Character",
        text: "He was wonderfully good-looking... had every accomplishment except that of making money.",
        explanation: "Wilde establishes Hughie as charming but impractical. He has every social gift but lacks the one thing society demands: financial success. This sets up the irony of a 'poor' man being the most generous.",
      },
      {
        lines: "The Marriage Obstacle",
        text: "Colonel Merton adored his daughter... but he would not hear of any engagement.",
        explanation: "The £10,000 requirement seems impossible for Hughie. This obstacle drives the plot and makes the Baron's eventual gift a perfect solution to an apparently hopeless problem.",
      },
      {
        lines: "The Beggar Model",
        text: "A wizened old man... huddled up in a corner of the studio.",
        explanation: "The Baron's disguise is perfect - Hughie sees only a pitiable old man. This sets up the story's central irony: Hughie gives his last coin to someone who has millions.",
      },
      {
        lines: "The Act of Kindness",
        text: "Poor old chap! said Hughie... He pressed a sovereign into his hand.",
        explanation: "This is the story's pivotal moment. Hughie's gift is valuable not for its amount but for the sacrifice - it's his last money. He gives impulsively, from genuine compassion.",
      },
      {
        lines: "The Revelation",
        text: "That old model... is one of the richest men in Europe.",
        explanation: "The twist reveals the irony: Hughie pitied and gave money to a millionaire. But this sets up the greater reversal - the millionaire will recognize and reward Hughie's true kindness.",
      },
      {
        lines: "The Reward",
        text: "A cheque for ten thousand pounds... a wedding present to Hughie Erskine and Laura Merton.",
        explanation: "The Baron gives Hughie exactly what he needs. The reward is not for the sovereign (meaningless to a millionaire) but for the spirit behind it - genuine, self-sacrificing kindness.",
      },
    ],
    mcqs: [
      {
        question: "Why can't Hughie marry Laura Merton?",
        options: [
          "Her father dislikes him",
          "She doesn't love him",
          "He doesn't have £10,000 as her father requires",
          "He is already married",
        ],
        correctAnswer: 2,
        explanation: "Colonel Merton requires Hughie to have £10,000 of his own before he can marry Laura.",
      },
      {
        question: "Who is the 'beggar' in Alan Trevor's studio?",
        options: [
          "A real homeless man",
          "Baron Hausberg, one of the richest men in Europe",
          "Alan's uncle",
          "A professional actor",
        ],
        correctAnswer: 1,
        explanation: "The 'beggar' is actually Baron Hausberg posing for Alan's painting - one of the richest men in Europe.",
      },
      {
        question: "How much does Hughie give the 'beggar'?",
        options: [
          "Ten pounds",
          "One sovereign (his last money)",
          "A hundred pounds",
          "Nothing - he only offers sympathy",
        ],
        correctAnswer: 1,
        explanation: "Hughie gives the beggar a sovereign - his last coin, all the money he has to last him the month.",
      },
      {
        question: "Why is Hughie's gift significant?",
        options: [
          "Because it was a large sum",
          "Because it was his last money - a genuine sacrifice",
          "Because the beggar asked for it",
          "Because Alan told him to give it",
        ],
        correctAnswer: 1,
        explanation: "The sovereign was Hughie's last money. The sacrifice it represented showed his genuine, impulsive kindness.",
      },
      {
        question: "How does Baron Hausberg reward Hughie?",
        options: [
          "By giving him a job",
          "By sending him a check for £10,000 as a wedding present",
          "By introducing him to important people",
          "By returning the sovereign",
        ],
        correctAnswer: 1,
        explanation: "The Baron sends Hughie a check for exactly £10,000 - the sum he needs to marry Laura - as a wedding present.",
      },
      {
        question: "What does 'millionaire models are rare, but model millionaires are rarer still' mean?",
        options: [
          "Rich people don't pose for paintings",
          "Millionaires who behave as role models of generosity are very rare",
          "Models should become millionaires",
          "Paintings of millionaires are rare",
        ],
        correctAnswer: 1,
        explanation: "Alan's witty closing line means that millionaires who are examples of generosity and kindness (like Baron Hausberg) are very rare.",
      },
      {
        question: "What theme does this story illustrate?",
        options: [
          "Rich people are always cruel",
          "Appearances can be deceiving and genuine kindness is rewarded",
          "Art is more important than money",
          "Poor people should not give to charity",
        ],
        correctAnswer: 1,
        explanation: "The story shows that appearances deceive (the beggar was rich) and that genuine, sacrificial kindness is recognized and rewarded.",
      },
      {
        question: "What is ironic about Hughie giving money to Baron Hausberg?",
        options: [
          "The Baron didn't want money",
          "Hughie gave his last coin to one of the richest men in Europe, thinking him poor",
          "The money was fake",
          "The Baron returned it immediately",
        ],
        correctAnswer: 1,
        explanation: "The central irony is that Hughie gave his last sovereign - a sacrifice for him - to a man who had millions, mistaking him for a beggar.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "He was wonderfully good-looking, with crisp brown hair, clear-cut profile, and grey eyes. He was as popular with men as he was with women... He had every accomplishment except that of making money.",
        questions: [
          {
            question: "What qualities does Hughie possess according to this passage?",
            answer: "Hughie is handsome (good-looking, crisp brown hair, clear-cut profile, grey eyes), charming (popular with both men and women), and accomplished in social graces. However, he lacks practical ability, particularly in making money.",
          },
          {
            question: "What is the significance of 'every accomplishment except that of making money'?",
            answer: "This phrase establishes the story's irony. In Victorian society, financial success was crucial, especially for marriage. Hughie has every charm except the one society demands. It also hints that true worth isn't measured in money.",
          },
          {
            question: "How does this description set up the story's themes?",
            answer: "By establishing Hughie as lovable but poor, Wilde sets up the contrast between social values (money) and human values (kindness, charm). The story will show that Hughie's generous heart is more valuable than business sense.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "'Poor old chap!' said Hughie, 'how miserable he looks! But I suppose, to you painters, his face is his fortune?' 'Certainly,' replied Alan... Hughie... slipped a sovereign into his hand.",
        questions: [
          {
            question: "What does Hughie's reaction to the 'beggar' reveal about his character?",
            answer: "Hughie's immediate pity ('Poor old chap!') shows his compassionate nature. He doesn't look away from suffering but feels genuine sympathy. His impulse to help shows a generous heart that acts on feeling.",
          },
          {
            question: "What is ironic about 'his face is his fortune'?",
            answer: "Alan means the beggar's appearance makes him valuable as a model. But ironically, the 'beggar' (Baron Hausberg) has an actual fortune of millions. His real fortune isn't his face but his wealth - which his ragged appearance hides.",
          },
          {
            question: "Why does Hughie 'slip' the sovereign rather than present it openly?",
            answer: "Hughie 'slips' the coin quietly to spare the old man embarrassment. This discretion shows his kindness extends to preserving others' dignity. He doesn't want to draw attention or seem superior - he simply wants to help.",
          },
        ],
      },
      {
        id: "passage-3",
        extract: "'Millionaire models,' remarked Alan, 'are rare enough; but, by Jove, model millionaires are rarer still!'",
        questions: [
          {
            question: "What is the play on words in this statement?",
            answer: "Alan plays on 'model' meaning both 'artist's model' and 'ideal example.' 'Millionaire models' (rich people who pose) are rare. But 'model millionaires' (millionaires who are examples of virtue, like Baron Hausberg's generosity) are even rarer.",
          },
          {
            question: "How does this line summarize the story's message?",
            answer: "The line celebrates Baron Hausberg's generosity. Most millionaires don't reward strangers' kindness with £10,000. The Baron is a 'model' (ideal example) of what a wealthy person could be - generous, perceptive, and kind.",
          },
          {
            question: "What does this suggest about Wilde's view of wealth and virtue?",
            answer: "Wilde suggests that wealth alone doesn't make someone admirable. True worth comes from generosity and recognition of goodness in others. The Baron is 'model' because he uses his wealth to reward kindness, not hoard it.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Irony",
        example: "Hughie gives his last coin to one of Europe's richest men",
        explanation: "The central irony drives the story: the generous poor man gives to the wealthy disguised as poor, and is ultimately rewarded.",
      },
      {
        device: "Twist Ending",
        example: "The beggar turns out to be Baron Hausberg; he rewards Hughie with £10,000",
        explanation: "Wilde uses a classic twist: what seems embarrassing (giving money to a millionaire) becomes Hughie's fortune. The twist rewards virtue unexpectedly.",
      },
      {
        device: "Wit and Wordplay",
        example: "'Millionaire models are rare, but model millionaires are rarer still'",
        explanation: "Wilde's characteristic wit shines in this closing line, playing on double meanings to deliver the moral with humor.",
      },
      {
        device: "Contrast",
        example: "Hughie's poverty vs. Baron Hausberg's wealth; appearance vs. reality",
        explanation: "The story contrasts appearance and reality throughout. The poor-looking beggar is rich; the charming Hughie lacks money but has wealth of character.",
      },
      {
        device: "Fairy Tale Elements",
        example: "Poor young man, impossible obstacle, magical solution",
        explanation: "The story follows fairy tale patterns: a worthy young man faces an obstacle (need for money), shows virtue (generosity), and receives a reward that solves his problem.",
      },
    ],
  },
  {
    id: "home-coming",
    title: "Home-Coming",
    author: "Rabindranath Tagore",
    type: "story",
    summary: "A touching story about Phatik, a mischievous village boy who is sent to live with his aunt in Calcutta, where he faces neglect and longs desperately to return home.",
    detailedSummary: `"Home-Coming" (also known as "The Homecoming") by Rabindranath Tagore is one of the most poignant stories about childhood, belonging, and the devastating effects of being unwanted. It follows Phatik Chakravorti, a mischievous fourteen-year-old village boy whose life takes a tragic turn.

The story opens with Phatik as the leader of a gang of village boys. He is lively, mischievous, and constantly in trouble. His younger brother Makhan is the opposite - quiet and timid. Phatik's mother is a widow who struggles to manage him. When the boys find a log by the river, Phatik conceives a prank: they will roll it away just as the owner comes to claim it. Makhan sits on the log and refuses to move, wanting to spoil Phatik's plan. Phatik, in anger, rolls the log with Makhan on it, causing his brother to fall into the mud. When their mother arrives, she immediately blames Phatik and beats him while comforting Makhan.

At this moment, Phatik's maternal uncle Bishamber arrives from Calcutta for a visit. He is a kind man who notices the domestic tension. Phatik's mother confides her difficulties in managing the boy and asks if Bishamber will take Phatik to Calcutta to educate him. Phatik, overhearing this, is initially excited - Calcutta seems like an adventure.

But Calcutta proves to be a disaster. Bishamber's wife resents this extra mouth to feed. She treats Phatik as a burden, constantly complaining about him, comparing him unfavorably to her own children, and making him feel unwanted. Phatik, who was a leader in his village, becomes invisible and despised in this new home.

At school, Phatik struggles. The city school is different from anything he knew. He cannot keep up with lessons, loses his books, forgets his homework. His aunt mocks him for his failures. His cousins treat him with contempt. He has no friends, no one to talk to, no place where he belongs.

Phatik becomes deeply homesick. He misses his mother, his village, even the river where he used to play. He counts the days until the holidays when he might return home. He writes to his mother but receives no reply. The loneliness eats at him.

As the school holidays approach, Phatik becomes obsessed with going home. He begs his uncle to send him back. Bishamber, seeing the boy's distress, agrees to arrange it. But before Phatik can leave, he falls seriously ill with a high fever.

In his delirium, Phatik repeatedly asks about the holidays, about going home. "Mother, the holidays have come," he murmurs. Bishamber, alarmed, sends an urgent message to Phatik's mother. She comes immediately, but it is too late. As she arrives at his bedside, Phatik opens his eyes, sees her, and whispers, "Mother, the holidays have come. I am going home."

And then he dies. The "home" he goes to is not his village but death - the final release from his suffering. Tagore's story is a devastating critique of how families can fail children, how the sensitive heart of a child can be broken by neglect and lack of love.`,
    themes: ["Homesickness", "Family neglect", "Childhood trauma", "Longing for acceptance", "Belonging", "Tragedy"],
    keyPoints: [
      "Phatik is a mischievous village boy, leader of local children, but constantly in trouble with his mother",
      "His mother sends him to Calcutta with his uncle Bishamber to get an education",
      "Phatik's aunt treats him as a burden; he fails at school and becomes deeply lonely",
      "He desperately misses home and counts the days until holidays",
      "Phatik falls gravely ill just as the holidays approach",
      "He dies as his mother arrives - 'going home' becomes his final journey to death",
    ],
    characters: [
      { name: "Phatik Chakravorti", description: "A 14-year-old mischievous village boy who becomes the leader of local children. Beneath his troublemaking exterior is a sensitive child who desperately needs love and belonging. His exile to Calcutta destroys him." },
      { name: "Bishamber", description: "Phatik's maternal uncle from Calcutta. He is kind and well-meaning but cannot protect Phatik from his wife's resentment. He tries to help but acts too late." },
      { name: "Phatik's Aunt", description: "Bishamber's wife who resents Phatik's presence. She treats him as a burden, constantly criticizes him, and makes him feel unwanted. She represents the cruelty of being unwelcome in a home." },
      { name: "Phatik's Mother", description: "A widow who finds Phatik difficult to manage. She sends him away, perhaps hoping for the best, but her absence contributes to his despair. She arrives only in time to watch him die." },
      { name: "Makhan", description: "Phatik's younger brother, quiet and favored by their mother. The sibling rivalry between them triggers the events that lead to Phatik being sent away." },
    ],
    importantQuotes: [
      "Mother, the holidays have come",
      "No, mother, I promise you, I will never do anything again",
      "I am going home",
      "The holidays are near. I must be going home.",
      "He was nobody's boy in this strange city",
    ],
    lineExplanations: [
      {
        lines: "Opening: The Village Leader",
        text: "Phatik Chakravorti was ringleader among the boys of the village.",
        explanation: "The story establishes Phatik as a leader, active and important among his peers. This makes his later isolation and insignificance in Calcutta more devastating - from leader to nobody.",
      },
      {
        lines: "The Log Incident",
        text: "Phatik pushed the log with all his might, and it rolled over - making Makhan fall into the mud.",
        explanation: "This incident, caused by sibling rivalry, leads to Phatik being beaten by his mother. It symbolizes how small conflicts can have enormous consequences - this moment sets in motion his exile to Calcutta.",
      },
      {
        lines: "Sent Away",
        text: "His mother asked Bishamber if he would take Phatik to Calcutta to educate him.",
        explanation: "The mother's decision to send Phatik away is presented as practical, but it is also a rejection. Phatik is being sent away because he is a problem, not because of opportunity. This abandonment haunts him.",
      },
      {
        lines: "Unwanted in Calcutta",
        text: "He was nobody's boy in this strange city.",
        explanation: "This devastating line captures Phatik's experience. In his village, he belonged; in Calcutta, he is invisible, unwanted, without a place. The contrast destroys him emotionally.",
      },
      {
        lines: "Longing for Home",
        text: "When will the holidays come? I must be going home.",
        explanation: "Phatik's obsession with holidays and going home shows his desperate need to escape his misery. Home represents love, belonging, identity - everything he lacks in Calcutta.",
      },
      {
        lines: "The Final Words",
        text: "'Mother, the holidays have come. I am going home.'",
        explanation: "These heartbreaking final words carry double meaning. Phatik announces his death as 'going home.' The holidays have come - but his journey home is to death, the only escape from his suffering.",
      },
    ],
    mcqs: [
      {
        question: "What is Phatik's position among the village boys?",
        options: [
          "He is an outcast",
          "He is the leader (ringleader)",
          "He is the youngest",
          "He has no friends",
        ],
        correctAnswer: 1,
        explanation: "Phatik is the ringleader among the village boys - active, mischievous, and a natural leader.",
      },
      {
        question: "Why is Phatik sent to Calcutta?",
        options: [
          "For a vacation",
          "Because his mother finds him difficult to manage",
          "Because he won a scholarship",
          "To visit relatives for fun",
        ],
        correctAnswer: 1,
        explanation: "Phatik's mother sends him away because she finds him troublesome. She asks Bishamber to take him for education, but the underlying reason is to be rid of a problem child.",
      },
      {
        question: "How does Phatik's aunt treat him?",
        options: [
          "With love and kindness",
          "As a burden, constantly criticizing and resenting him",
          "As her favorite nephew",
          "With complete indifference",
        ],
        correctAnswer: 1,
        explanation: "Phatik's aunt treats him as an unwanted burden, constantly complaining about him and making him feel unwelcome in her home.",
      },
      {
        question: "What does Phatik desperately long for?",
        options: [
          "Money and wealth",
          "To go back home to his village",
          "To become famous",
          "New toys",
        ],
        correctAnswer: 1,
        explanation: "Phatik desperately longs to go home. He counts the days until holidays, writes to his mother, and becomes obsessed with returning to his village.",
      },
      {
        question: "What happens to Phatik just before the holidays?",
        options: [
          "He runs away",
          "He falls gravely ill with fever",
          "He wins an award",
          "He makes new friends",
        ],
        correctAnswer: 1,
        explanation: "Just as the holidays approach and Phatik might finally go home, he falls seriously ill with a high fever.",
      },
      {
        question: "What do Phatik's last words mean: 'The holidays have come. I am going home'?",
        options: [
          "He is happy about his vacation",
          "He is dying - 'going home' is his final journey to death",
          "He is planning to escape",
          "He has recovered from illness",
        ],
        correctAnswer: 1,
        explanation: "Phatik's words carry tragic double meaning. He dies just as his mother arrives - his 'going home' is death, the only release from his suffering.",
      },
      {
        question: "What is the main theme of this story?",
        options: [
          "The excitement of city life",
          "The devastating effects of being unwanted and the importance of belonging",
          "The benefits of education",
          "Sibling friendship",
        ],
        correctAnswer: 1,
        explanation: "The story shows how being unwanted and without belonging can destroy a child. Phatik's neglect and homesickness lead to his tragic death.",
      },
      {
        question: "Why does Tagore make Phatik a 'leader' in the village but a 'nobody' in Calcutta?",
        options: [
          "To show city life is better",
          "To emphasize how displacement and rejection can transform and destroy a person",
          "To praise village life",
          "It has no significance",
        ],
        correctAnswer: 1,
        explanation: "The contrast between leader and nobody shows how context matters for identity. Stripped of his place and people, Phatik loses himself completely.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "Phatik Chakravorti was ringleader among the boys of the village. A new mischief got into his head. He whispered to his companions that they would roll the log away and watch the fun when the owner came for it.",
        questions: [
          {
            question: "What does 'ringleader' suggest about Phatik's character?",
            answer: "'Ringleader' shows Phatik is a natural leader - creative, bold, and the one others follow. He initiates action and takes charge. This makes his later isolation in Calcutta more devastating.",
          },
          {
            question: "What does this opening incident reveal about Phatik?",
            answer: "The log prank shows Phatik's mischievous nature but also his need for excitement and attention. He is energetic and restless - qualities that will make his confined life in Calcutta unbearable.",
          },
          {
            question: "How does this scene connect to the story's tragedy?",
            answer: "The mischief leads to conflict with Makhan and punishment from his mother, which contributes to the decision to send him away. Small boyish pranks set in motion the chain of events leading to his death.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "He was nobody's boy in this strange city. His aunt made him feel that he was a burden, constantly complaining about his appetite, his clothes, his very existence in her home.",
        questions: [
          {
            question: "What does 'nobody's boy' mean?",
            answer: "This phrase captures Phatik's complete isolation. In his village, he belonged to a community; in Calcutta, no one claims him. He has no place, no people, no identity. He is invisible and unwanted.",
          },
          {
            question: "How does the aunt's treatment affect Phatik?",
            answer: "The aunt's constant criticism destroys Phatik's self-worth. Being made to feel his very existence is a problem breaks his spirit. Children need to feel wanted; Phatik feels only rejection.",
          },
          {
            question: "Why is this experience so devastating for Phatik specifically?",
            answer: "Phatik was a leader, important among his peers. To go from valued leader to resented burden is a complete reversal. The contrast makes the rejection even more painful.",
          },
        ],
      },
      {
        id: "passage-3",
        extract: "'Mother, the holidays have come,' murmured Phatik. 'I am going home.' And with those words, Phatik went home, beyond all holidays, beyond all longing.",
        questions: [
          {
            question: "What is the significance of 'holidays' in this passage?",
            answer: "Holidays represented Phatik's only hope - the chance to return to his village and escape his misery. His dying words about holidays show how central this hope was to his survival.",
          },
          {
            question: "What does 'going home' mean here?",
            answer: "'Going home' carries tragic double meaning. Literally, Phatik is not returning to his village - he is dying. Death becomes his 'home,' the only place he can find peace and release from suffering.",
          },
          {
            question: "What is Tagore saying about belonging and love?",
            answer: "Tagore shows that without belonging and love, a child cannot survive. Phatik's physical death follows his emotional death. The story is a powerful indictment of neglect and the importance of making children feel wanted.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Irony",
        example: "'I am going home' - Phatik dies instead of returning home",
        explanation: "Tragic irony: Phatik finally 'goes home' but to death, not his village. The home he longed for becomes metaphor for the peace of death.",
      },
      {
        device: "Contrast",
        example: "Phatik as village leader vs. 'nobody's boy' in Calcutta",
        explanation: "The stark contrast between who Phatik was and who he becomes shows how displacement and rejection can transform and destroy a person.",
      },
      {
        device: "Foreshadowing",
        example: "Phatik's obsessive talk of holidays and going home",
        explanation: "His constant focus on going home foreshadows that his journey home will not be what he expects - it will be death.",
      },
      {
        device: "Symbolism",
        example: "Home symbolizes love, belonging, and identity",
        explanation: "Throughout the story, 'home' represents everything Phatik lacks in Calcutta - acceptance, love, a place where he matters.",
      },
      {
        device: "Pathos",
        example: "The final scene with his mother arriving too late",
        explanation: "Tagore creates deep emotional impact through the timing - the mother comes, but only in time to watch her son die, making readers feel the tragedy intensely.",
      },
    ],
  },
  {
    id: "the-boy-who-broke-the-bank",
    title: "The Boy Who Broke the Bank",
    author: "Ruskin Bond",
    type: "story",
    summary: "A humorous story about how a casual remark by a sweeper boy starts a chain of rumors that leads to a bank run and the collapse of a small-town bank.",
    detailedSummary: `"The Boy Who Broke the Bank" by Ruskin Bond is a humorous and ironic story that demonstrates the power of rumors and gossip to create reality. Set in a small Indian town called Doorganj, it shows how an innocent complaint can snowball into a catastrophe.

Nathu is a poor sweeper boy who works at the Doorgadas Banking House, cleaning the steps and the premises. One morning, Nathu is frustrated because he hasn't been paid his wages for several months. As he sweeps the steps, he grumbles loudly about his situation to his friend Sitaram, who sells betel leaves nearby.

"They haven't paid me for months," Nathu complains. "Even a dog wouldn't work without being paid." Nathu is just venting about his own wages, but Sitaram, who is half-listening, misunderstands. He thinks Nathu is saying the bank doesn't have money to pay anyone.

Sitaram mentions this to Mrs. Srivastava, a customer, adding his own interpretation: "The bank can't even pay its sweeper." Mrs. Srivastava, a gossip by nature, spreads the news further: "The bank is in trouble - they can't pay their employees." With each retelling, the story grows more alarming.

By the time the rumor reaches Seth Doorgadas himself (a wealthy merchant, not the bank owner - he shares the name), it has transformed into: "The Doorgadas Bank is about to collapse. They have no money." Seth Doorgadas, who has substantial deposits in the bank, rushes to withdraw his money before it's too late.

When other customers see Seth Doorgadas (whom they know to be shrewd) withdrawing his money, they panic. If such a wealthy man is taking his money out, the bank must really be failing! More people rush to withdraw. This creates a classic "bank run" - where fear causes people to withdraw money, which actually causes the bank to fail because no bank keeps enough cash on hand for all depositors to withdraw at once.

By the end of the day, the Doorgadas Bank has collapsed. The very rumor that the bank was failing caused it to fail - a self-fulfilling prophecy.

The irony is multiple:
1. Nathu never said anything about the bank's finances - just his own unpaid wages
2. The bank was probably perfectly healthy before the rumor started
3. The sweeper boy, the lowest employee, brought down the entire bank
4. Nathu never even knows he caused the collapse - he's looking for a new job

The title is doubly ironic: Nathu "broke" the bank (caused its failure) not through any criminal act, but through an innocent complaint. The story humorously illustrates how rumors, gossip, and misunderstanding can combine to create disasters.`,
    themes: ["Power of rumors", "Chain reactions", "Social hierarchy", "Irony", "Miscommunication", "Self-fulfilling prophecy"],
    keyPoints: [
      "Nathu the sweeper complains about not getting HIS wages - nothing about the bank's finances",
      "Sitaram misunderstands and thinks the bank can't pay anyone",
      "The rumor spreads and grows with each retelling",
      "People panic and rush to withdraw money (a bank run)",
      "The bank actually collapses because of the panic caused by the rumor",
      "Nathu never knows he caused the collapse - ultimate irony",
    ],
    characters: [
      { name: "Nathu", description: "A poor sweeper boy who works at the bank. He is frustrated about not being paid his wages. His innocent complaint starts the chain of events that brings down the bank, though he never knows this." },
      { name: "Sitaram", description: "A betel-leaf seller and Nathu's friend. He mishears Nathu's complaint and starts spreading the misunderstood version, beginning the rumor chain." },
      { name: "Mrs. Srivastava", description: "A gossipy customer who spreads and exaggerates the rumor. She represents how gossip transforms and amplifies information." },
      { name: "Seth Doorgadas", description: "A wealthy merchant (different from the bank owner). When he withdraws his money, others follow, causing the bank run." },
      { name: "The Bank Owner", description: "The owner of Doorgadas Banking House. He is ruined by a rumor that had no basis in his actual financial situation." },
    ],
    importantQuotes: [
      "Nobody would have heard of Doorgadas Bank if it hadn't been for the poor sweeper boy",
      "They haven't paid me for months",
      "If even the sweeper isn't being paid, the bank must be in trouble",
      "The bank is going to collapse!",
      "Nathu looked for another job, quite unaware of the consequences of his words",
    ],
    lineExplanations: [
      {
        lines: "Opening: Nathu's Complaint",
        text: "Nathu grumbled as he swept the steps of the Doorgadas Banking House.",
        explanation: "The story begins with something ordinary - a worker complaining about unpaid wages. This mundane moment will trigger extraordinary consequences, showing how small things can have huge effects.",
      },
      {
        lines: "The Misunderstanding",
        text: "Sitaram, half-listening, thought the bank couldn't afford to pay anyone.",
        explanation: "This is where the trouble starts. Sitaram hears only part of what Nathu says and interprets it wrongly. The truth (Nathu's wages) becomes fiction (bank's failure).",
      },
      {
        lines: "Rumor Spreading",
        text: "Mrs. Srivastava told her neighbor, who told the shopkeeper, who told his customers...",
        explanation: "Bond shows how rumors spread through a community. Each person adds their interpretation, and the story grows more alarming. What started as a personal complaint becomes a public crisis.",
      },
      {
        lines: "The Bank Run",
        text: "People rushed to withdraw their money before it was too late.",
        explanation: "When people believe a bank is failing, they withdraw money to protect themselves. But this collective action causes the very failure they fear - a self-fulfilling prophecy.",
      },
      {
        lines: "The Collapse",
        text: "By evening, the Doorgadas Bank had collapsed.",
        explanation: "The irony is complete: a healthy bank fails because of a rumor about failure. The fear of collapse caused the collapse.",
      },
      {
        lines: "The Final Irony",
        text: "Nathu looked for another job, quite unaware that he had brought down the bank.",
        explanation: "Nathu never learns what he caused. The person responsible for the catastrophe walks away unaware, looking for another sweeping job. This is dark humor at its finest.",
      },
    ],
    mcqs: [
      {
        question: "Why is Nathu grumbling at the beginning of the story?",
        options: [
          "The bank is failing",
          "He hasn't been paid his wages for months",
          "His work is too hard",
          "Someone stole his money",
        ],
        correctAnswer: 1,
        explanation: "Nathu is upset because he hasn't received his wages - a personal complaint that gets misunderstood.",
      },
      {
        question: "What does Sitaram misunderstand?",
        options: [
          "Nathu's name",
          "He thinks the bank can't pay anyone, when Nathu meant only himself",
          "Where Nathu works",
          "Nathu's job title",
        ],
        correctAnswer: 1,
        explanation: "Sitaram mishears Nathu's personal complaint about wages as a statement about the bank's inability to pay anyone.",
      },
      {
        question: "How does the rumor change as it spreads?",
        options: [
          "It becomes more accurate",
          "It stays exactly the same",
          "It grows more alarming with each retelling",
          "It disappears",
        ],
        correctAnswer: 2,
        explanation: "With each person who spreads it, the rumor becomes more exaggerated and alarming - from unpaid wages to total bank collapse.",
      },
      {
        question: "What is a 'bank run'?",
        options: [
          "When bank employees run away",
          "When many people rush to withdraw money at once, fearing the bank will fail",
          "A race organized by the bank",
          "When the bank moves location",
        ],
        correctAnswer: 1,
        explanation: "A bank run occurs when people panic and withdraw deposits, which can actually cause a healthy bank to fail.",
      },
      {
        question: "Why does the bank actually collapse?",
        options: [
          "It was already failing",
          "Nathu stole money",
          "The panic caused by rumors led to a bank run",
          "The owner ran away",
        ],
        correctAnswer: 2,
        explanation: "The bank collapses because the rumor caused people to withdraw money. The fear of failure caused the failure - a self-fulfilling prophecy.",
      },
      {
        question: "What is ironic about the story's ending?",
        options: [
          "Nathu becomes rich",
          "Nathu never knows he caused the collapse and just looks for another job",
          "The bank reopens",
          "Everyone apologizes to Nathu",
        ],
        correctAnswer: 1,
        explanation: "The ultimate irony: Nathu, who brought down the bank, is completely unaware of what he caused. He just moves on looking for work.",
      },
      {
        question: "What is the main message of this story?",
        options: [
          "Banks are always safe",
          "Sweepers are dangerous",
          "Rumors and gossip can have devastating, unintended consequences",
          "Never complain about work",
        ],
        correctAnswer: 2,
        explanation: "The story demonstrates how rumors spread and transform, and how collective belief can create reality - even false rumors can cause real disasters.",
      },
      {
        question: "Why is the title 'The Boy Who Broke the Bank' ironic?",
        options: [
          "Because Nathu is not a boy",
          "Because Nathu 'broke' the bank through innocent words, not criminal action",
          "Because the bank wasn't really broken",
          "Because Nathu worked at a different bank",
        ],
        correctAnswer: 1,
        explanation: "The title's irony is that 'broke' sounds like a criminal act, but Nathu did nothing wrong - his innocent complaint caused the collapse through misunderstanding.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "Nathu grumbled as he swept the steps of the Doorgadas Banking House. 'They haven't paid me for months,' he complained to Sitaram, the betel-leaf seller. 'Even a dog wouldn't work without being paid.'",
        questions: [
          {
            question: "What is Nathu actually complaining about?",
            answer: "Nathu is complaining about his own unpaid wages - he personally hasn't been paid for months. He is not making any statement about the bank's overall finances or ability to pay.",
          },
          {
            question: "Why does this complaint become dangerous?",
            answer: "Sitaram only half-hears and misunderstands. He thinks Nathu means the bank can't afford to pay anyone, not just that Nathu's wages are overdue. This misunderstanding starts the rumor.",
          },
          {
            question: "What does 'even a dog wouldn't work without being paid' reveal about Nathu's situation?",
            answer: "This expression shows Nathu's frustration. He feels treated worse than an animal - even a dog expects rewards for service. It's an emotional outburst, not a statement about the bank.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "When Seth Doorgadas heard the rumor, he rushed to the bank to withdraw his money. Other customers, seeing this wealthy and shrewd man taking his money out, panicked and joined the rush.",
        questions: [
          {
            question: "Why does Seth Doorgadas's action cause others to panic?",
            answer: "Seth Doorgadas is wealthy and known to be shrewd. People assume he has insider knowledge. If such a smart, rich man is withdrawing money, others think he must know something they don't.",
          },
          {
            question: "What is a 'bank run' and how does it work?",
            answer: "A bank run happens when many depositors withdraw money simultaneously, fearing the bank will fail. Banks don't keep all deposits as cash, so mass withdrawals can cause even healthy banks to collapse.",
          },
          {
            question: "How does this scene illustrate a 'self-fulfilling prophecy'?",
            answer: "The rumor said the bank was failing. People believed it and withdrew money to protect themselves. Their collective action actually caused the bank to fail - the false prediction made itself true.",
          },
        ],
      },
      {
        id: "passage-3",
        extract: "By evening, the Doorgadas Bank had collapsed. And Nathu, looking for another job, was quite unaware of the consequences of his words.",
        questions: [
          {
            question: "What is ironic about Nathu looking for another job?",
            answer: "Nathu caused the bank's collapse and his own unemployment, but he doesn't know this. He just thinks he needs a new job because the bank failed - not realizing he caused the failure.",
          },
          {
            question: "Why doesn't Nathu know what he caused?",
            answer: "Nathu only made a personal complaint about his wages. The misunderstanding and rumor chain happened without his knowledge. The gap between his words and their consequences is the story's central irony.",
          },
          {
            question: "What point is Ruskin Bond making about rumors and consequences?",
            answer: "Bond shows that our words can have consequences far beyond our intentions or awareness. A casual complaint, misheard and repeated, can bring down an institution. We often don't know the impact of what we say.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Irony",
        example: "The sweeper 'broke' the bank through innocent complaint",
        explanation: "Multiple levels of irony: the lowest employee brings down the institution; innocent words cause disaster; Nathu never knows what he caused.",
      },
      {
        device: "Chain Reaction/Domino Effect",
        example: "Nathu → Sitaram → Mrs. Srivastava → Seth → Bank collapse",
        explanation: "Bond structures the story as a chain, showing how each link transforms and amplifies the original message until it causes catastrophe.",
      },
      {
        device: "Self-Fulfilling Prophecy",
        example: "The rumor of failure causes actual failure",
        explanation: "The belief that something will happen causes people to act in ways that make it happen - a psychological concept Bond illustrates through narrative.",
      },
      {
        device: "Humor",
        example: "Nathu looking for a job, unaware he caused his own unemployment",
        explanation: "Bond uses dark humor to make his point. The absurdity of Nathu's ignorance is both funny and pointed commentary.",
      },
      {
        device: "Social Commentary",
        example: "The sweeper boy vs. the banking institution",
        explanation: "Bond subtly comments on social hierarchy. The lowest worker, usually invisible, has the power to bring down the wealthy establishment - though inadvertently.",
      },
    ],
  },
  {
    id: "with-the-photographer",
    title: "With the Photographer",
    author: "Stephen Leacock",
    type: "story",
    summary: "A satirical story about a man's frustrating experience at a photography studio, where the photographer is more interested in retouching than capturing reality.",
    detailedSummary: `"With the Photographer" by Stephen Leacock is a hilarious satirical essay that mocks the photography industry's obsession with artificial beauty over authentic representation. Written with Leacock's characteristic wit, it follows the narrator's increasingly absurd experience at a photography studio.

The story begins with the narrator deciding to have his photograph taken. He enters a photography studio with simple expectations - he just wants a picture of himself. But from the moment he enters, things go wrong.

First, he must wait. And wait. The photographer seems impossibly busy, leaving the narrator sitting for what feels like hours. When the photographer finally appears, he examines the narrator's face with obvious disappointment, tilting it this way and that, frowning at what he sees.

"I don't like the face," the photographer says bluntly. He complains about the narrator's mouth, ears, eyes, and general expression. The narrator, trying to be positive, suggests his face has "character." The photographer dismisses this entirely - character is not what he's looking for.

The actual photography process is equally absurd. The narrator is posed in uncomfortable positions. He is told to look "natural" while holding impossibly unnatural poses. He is instructed to have a "pleasant expression" while being contorted into discomfort. The photographer treats him like difficult material rather than a person.

When the narrator returns to collect his photograph, he doesn't recognize what he sees. The photo shows a handsome, distinguished man with perfect features - but it's not him. The photographer has "retouched" everything: straightened his nose, enlarged his eyes, fixed his ears, adjusted his expression. The result is technically beautiful but completely fake.

"That's not my face," the narrator protests. "It's someone else's."

The photographer is proud of his work. He has "fixed" all the problems. He sees nothing wrong with presenting a completely fabricated image as the narrator's portrait.

The story ends with the narrator's frustrated realization that he has paid money for a photograph of a stranger. The photography studio has created an idealized fiction and sold it as reality.

Leacock's satire targets multiple things: the beauty industry's impossible standards, society's preference for pretty lies over authentic truth, and the way commercial practices prioritize what sells over what's real. Though written over a century ago, its critique remains relevant in our age of filters and Photoshop.`,
    themes: ["Vanity", "Artificiality", "Identity", "Satire of modern practices", "Appearance vs reality", "Loss of authenticity"],
    keyPoints: [
      "The narrator visits a photography studio wanting a simple portrait",
      "The photographer criticizes his face throughout - 'I don't like the face'",
      "The photography process involves uncomfortable, 'unnatural' poses",
      "The final photo is completely retouched beyond recognition",
      "The narrator doesn't recognize himself - 'That's not my face'",
      "Satire on society's obsession with artificial beauty over authentic representation",
    ],
    characters: [
      { name: "The Narrator", description: "An ordinary man who wants a simple photograph. He has a face 'full of character' but is made to feel inadequate. He represents the average person victimized by beauty industry standards." },
      { name: "The Photographer", description: "An arrogant professional obsessed with 'fixing' faces through retouching. He sees flaws everywhere and cannot appreciate authenticity. He represents the beauty industry's impossible standards." },
    ],
    importantQuotes: [
      "I don't like the face",
      "I think it's a face full of character",
      "That's not my face, it's someone else's",
      "The face was even more beautiful than before",
      "I'm afraid the ears are bad",
      "We can fix that... We can make that all right",
    ],
    lineExplanations: [
      {
        lines: "Opening: The Wait",
        text: "I sat waiting in the photographer's outer room for what seemed like hours.",
        explanation: "The story begins with frustration. The long wait suggests the photographer's self-importance and foreshadows the dehumanizing treatment the narrator will receive.",
      },
      {
        lines: "The Criticism",
        text: "'I don't like the face,' said the photographer.",
        explanation: "This blunt, rude assessment sets the tone. The photographer sees the narrator not as a person but as raw material with problems to fix. It's both funny and painful.",
      },
      {
        lines: "The Defense",
        text: "'I think it's a face full of character,' I said.",
        explanation: "The narrator's weak defense shows his loss of confidence. He tries to find value in what the photographer dismisses. 'Character' means authentic personality - but that's not what the industry wants.",
      },
      {
        lines: "The Retouching",
        text: "'We can fix that... We can make that all right.'",
        explanation: "The photographer's solution to every 'problem' is retouching - changing the image rather than accepting reality. This phrase becomes a satirical refrain.",
      },
      {
        lines: "The Reveal",
        text: "'That's not my face. It's someone else's.'",
        explanation: "The climax of the satire. The heavily retouched photo is beautiful but meaningless - it's not the narrator at all. Identity has been erased in pursuit of artificial perfection.",
      },
      {
        lines: "The Final Irony",
        text: "The photographer seemed genuinely proud of his work.",
        explanation: "The photographer cannot understand the narrator's complaint. To him, the fake beautiful image is an improvement. This disconnect between authentic identity and artificial beauty is Leacock's central point.",
      },
    ],
    mcqs: [
      {
        question: "What is the photographer's first reaction to the narrator's face?",
        options: [
          "He is delighted",
          "He says 'I don't like the face'",
          "He refuses to take the photo",
          "He offers a discount",
        ],
        correctAnswer: 1,
        explanation: "The photographer bluntly says 'I don't like the face,' immediately establishing his critical, dehumanizing approach.",
      },
      {
        question: "What does the narrator say in defense of his face?",
        options: [
          "It's the most handsome face in town",
          "It's a face full of character",
          "It doesn't need any changes",
          "It looks like a movie star",
        ],
        correctAnswer: 1,
        explanation: "The narrator weakly defends himself by saying his face has 'character' - meaning authenticity and personality, which the photographer dismisses.",
      },
      {
        question: "What does the photographer do to 'improve' the photograph?",
        options: [
          "Nothing - he keeps it natural",
          "He retouches everything until it's unrecognizable",
          "He adds a nice background",
          "He adjusts the lighting only",
        ],
        correctAnswer: 1,
        explanation: "The photographer heavily retouches the photo - fixing nose, eyes, ears, expression - until the result looks nothing like the narrator.",
      },
      {
        question: "What is the narrator's reaction to the final photograph?",
        options: [
          "He loves it",
          "He says 'That's not my face, it's someone else's'",
          "He asks for more retouching",
          "He is satisfied",
        ],
        correctAnswer: 1,
        explanation: "The narrator is frustrated - the photo is so retouched that he doesn't recognize himself. It's a picture of someone else entirely.",
      },
      {
        question: "What is Leacock satirizing in this story?",
        options: [
          "The high cost of photography",
          "Society's obsession with artificial beauty over authenticity",
          "The narrator's ugliness",
          "Technical problems in photography",
        ],
        correctAnswer: 1,
        explanation: "Leacock satirizes the beauty industry's preference for artificial perfection over authentic representation - a critique still relevant today.",
      },
      {
        question: "Why is the phrase 'We can fix that' repeated?",
        options: [
          "The photographer is helpful",
          "It becomes a satirical refrain showing obsession with 'fixing' natural features",
          "The narrator keeps asking for changes",
          "Equipment keeps breaking",
        ],
        correctAnswer: 1,
        explanation: "The repeated 'We can fix that' satirizes the industry's assumption that natural features are problems requiring artificial solutions.",
      },
      {
        question: "What does 'character' in a face represent in this story?",
        options: [
          "Ugliness",
          "Authenticity and genuine personality",
          "Fictional traits",
          "Acting ability",
        ],
        correctAnswer: 1,
        explanation: "'Character' represents authentic, genuine features that make someone unique - exactly what the photographer erases through retouching.",
      },
      {
        question: "Why is this satire still relevant today?",
        options: [
          "Photography no longer exists",
          "Filters, Photoshop, and beauty standards continue to prioritize artificial perfection",
          "People no longer care about appearance",
          "Cameras are now perfect",
        ],
        correctAnswer: 1,
        explanation: "With modern filters, Photoshop, and social media, Leacock's critique of artificial beauty over authenticity is more relevant than ever.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "'I don't like the face,' said the photographer. He examined it critically, tilting my head this way and that. 'The ears are bad,' he said. 'The eyes are too small. The mouth is wrong.'",
        questions: [
          {
            question: "What does the photographer's criticism reveal about his values?",
            answer: "The photographer values artificial perfection over natural authenticity. He sees the narrator as flawed material to be fixed rather than a unique individual to be represented accurately.",
          },
          {
            question: "How does this treatment make the narrator feel?",
            answer: "The criticism undermines the narrator's confidence. Being told his face is wrong - his ears, eyes, mouth - makes him feel inadequate and dehumanized, like defective merchandise.",
          },
          {
            question: "What is Leacock satirizing through this interaction?",
            answer: "Leacock satirizes beauty industry standards that treat natural human features as problems. The photographer represents a society that cannot accept authentic appearance.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "'I think it's a face full of character,' I said. 'We can fix that,' said the photographer. 'We can make that all right.'",
        questions: [
          {
            question: "What does the narrator mean by 'a face full of character'?",
            answer: "The narrator means his face has authentic, genuine features that reflect his personality and life experience. 'Character' suggests individuality and uniqueness.",
          },
          {
            question: "Why is the photographer's response ('We can fix that') so devastating?",
            answer: "The response shows the photographer sees 'character' as a flaw, not a virtue. He will 'fix' authenticity - meaning erase it. The very thing that makes the narrator unique is what will be removed.",
          },
          {
            question: "What broader comment is Leacock making about society?",
            answer: "Leacock comments that society treats individuality as a problem to be solved. Authentic 'character' is seen as inferior to artificial, standardized beauty.",
          },
        ],
      },
      {
        id: "passage-3",
        extract: "When I saw the final photograph, I couldn't recognize myself. 'That's not my face,' I said. 'It's someone else's.' The photographer looked pleased with his work.",
        questions: [
          {
            question: "Why can't the narrator recognize himself?",
            answer: "The photograph has been so heavily retouched - nose straightened, eyes enlarged, features adjusted - that it no longer represents the narrator. His identity has been erased.",
          },
          {
            question: "Why is the photographer 'pleased' when the narrator is upset?",
            answer: "The photographer measures success by achieving artificial beauty, not accurate representation. He is proud of creating a perfect image, not realizing he has destroyed authenticity.",
          },
          {
            question: "What is the ultimate irony of this situation?",
            answer: "The narrator paid for a photograph of himself but received a picture of a stranger. The purpose of a portrait - capturing identity - has been completely defeated.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Satire",
        example: "The entire photography experience",
        explanation: "Leacock uses humor to criticize the beauty industry's standards. The absurdity of 'fixing' a face exposes societal obsession with artificial perfection.",
      },
      {
        device: "Irony",
        example: "A photograph meant to capture identity erases it entirely",
        explanation: "The central irony is that a portrait, meant to represent someone, ends up representing no one. The tool of identity becomes a tool of erasure.",
      },
      {
        device: "Exaggeration/Hyperbole",
        example: "The photographer's extreme criticism and retouching",
        explanation: "Leacock exaggerates for comic effect. The photographer's total rejection of the narrator's face amplifies the satire of beauty standards.",
      },
      {
        device: "First-Person Narration",
        example: "The narrator telling his own story",
        explanation: "First-person narration lets readers experience the frustration and absurdity directly, building sympathy and humor.",
      },
      {
        device: "Social Commentary",
        example: "Critique of beauty industry and societal values",
        explanation: "Beyond humor, Leacock comments on society's preference for artificial beauty over authentic identity - a theme that remains relevant.",
      },
    ],
  },
  {
    id: "the-elevator",
    title: "The Elevator",
    author: "William Sleator",
    type: "story",
    summary: "A suspenseful horror story about Martin, a boy terrified of elevators, who is stalked by a mysterious fat woman in his apartment building's elevator.",
    detailedSummary: `"The Elevator" by William Sleator is a psychological horror story that masterfully builds suspense through everyday fear. It follows twelve-year-old Martin, a small, timid boy who lives with his father on the 17th floor of an old apartment building.

Martin has always been afraid of the elevator. It is old, small, cramped, and makes ominous creaking noises. He hates the feeling of being trapped in the tiny space. But climbing 17 flights of stairs is exhausting, and his father dismisses his fears as childish. So Martin forces himself to use the elevator.

One day, a fat woman gets on the elevator. She is extremely overweight, taking up most of the small space, pushing Martin into the corner. She wears a dirty green coat and has a huge, rasping laugh. Most disturbingly, she stares directly at Martin the entire ride - not looking away, not blinking, just staring with a strange, knowing smile.

Martin is terrified but tries to convince himself it was just coincidence. However, the woman starts appearing regularly. Every time Martin enters the elevator, she seems to be there. She always stares at him with that same unsettling smile. She never speaks, never looks away, just watches him.

Martin becomes obsessed with avoiding her. He tries taking the stairs, but his father gets angry - why is Martin out of breath? Is he too weak to use an elevator like a normal person? Martin tries taking the elevator at different times, but the woman always seems to know when he'll be there.

The encounters escalate in intensity. The woman seems to get closer each time. Her smile seems more menacing. Martin becomes convinced she is following him specifically, that she knows his schedule, that she is hunting him.

Finally, Martin's fears overwhelm him. He decides to take the stairs no matter what. But he slips and falls, breaking his leg. Now he must use the elevator - he has no choice.

The story ends with Martin in the elevator on crutches, helpless. The elevator stops. The doors open. The fat woman enters. She looks at Martin with her terrible smile and says the only words she speaks in the entire story:

"I've been waiting for you, Martin."

And the doors close.

The story is deliberately unresolved. We never learn who the woman is, what she wants, or what happens to Martin. This open ending amplifies the horror - our imagination fills in the terrible possibilities. Sleator explores how everyday fears (elevators, strangers) can become nightmarish, and how being small, weak, and disbelieved makes children especially vulnerable.`,
    themes: ["Fear", "Suspense", "Vulnerability", "Confronting fears", "Helplessness", "Childhood terror"],
    keyPoints: [
      "Martin is a small, timid 12-year-old who is afraid of the old, cramped elevator",
      "A mysterious fat woman begins appearing in the elevator, always staring at Martin",
      "She never speaks, just smiles menacingly and watches him",
      "Martin tries to avoid her but she always seems to know when he'll be there",
      "Martin falls and breaks his leg, making him unable to use stairs",
      "The story ends with the woman saying 'I've been waiting for you, Martin' as the doors close",
    ],
    characters: [
      { name: "Martin", description: "A small, fearful 12-year-old boy who lives on the 17th floor. He is timid and easily frightened, unable to defend himself. His father dismisses his fears. He represents vulnerable children facing real but unbelieved terrors." },
      { name: "The Fat Woman", description: "A mysterious, menacing stranger who appears repeatedly in the elevator. She is extremely overweight, wears a dirty green coat, and stares at Martin with a knowing smile. She never speaks until the final line. She represents unexplained, inescapable threat." },
      { name: "Martin's Father", description: "Dismissive of Martin's fears, calling him weak and cowardly. He represents adults who don't believe children's warnings, leaving them unprotected." },
    ],
    importantQuotes: [
      "I've been waiting for you, Martin",
      "He wanted to turn and run, but he couldn't",
      "She was watching him, smiling",
      "The elevator was old and very small",
      "His father told him to stop being such a coward",
      "The doors slid closed behind her",
    ],
    lineExplanations: [
      {
        lines: "Opening: The Fear",
        text: "The elevator was old and very small. Martin always felt trapped inside it.",
        explanation: "Sleator establishes Martin's existing fear of elevators - claustrophobia, the feeling of being trapped. This makes the elevator the perfect setting for horror.",
      },
      {
        lines: "The First Encounter",
        text: "A fat woman got on. She took up most of the small space, pushing Martin into the corner. And she stared at him.",
        explanation: "The woman's entrance is immediately threatening - she physically crowds Martin and violates social norms by staring. The invasion of space mirrors invasion of safety.",
      },
      {
        lines: "The Pattern",
        text: "She was always there. Every time Martin used the elevator, she appeared.",
        explanation: "The repeated encounters transform coincidence into pattern, pattern into stalking. The woman seems to know Martin's schedule, suggesting supernatural awareness.",
      },
      {
        lines: "The Father's Dismissal",
        text: "His father told him to stop being such a coward.",
        explanation: "Martin's father refuses to believe or protect him. This isolation increases Martin's vulnerability - he must face the threat alone, disbelieved by the adult who should help.",
      },
      {
        lines: "The Trap",
        text: "Martin fell and broke his leg. Now he couldn't take the stairs.",
        explanation: "The broken leg removes Martin's only escape option. He is now literally trapped - he must use the elevator, must face the woman, has no choice. The horror becomes inescapable.",
      },
      {
        lines: "The Climax",
        text: "'I've been waiting for you, Martin.'",
        explanation: "These are the woman's only words. That she knows his name confirms she has been targeting him specifically. The story ends here - we never learn what happens next, which amplifies the horror.",
      },
    ],
    mcqs: [
      {
        question: "Why is Martin afraid of the elevator?",
        options: [
          "It is new and fast",
          "It is old, cramped, and makes him feel trapped",
          "His friends told him ghost stories",
          "He was stuck in it before",
        ],
        correctAnswer: 1,
        explanation: "Martin fears the elevator because it is old, small, and cramped - he feels trapped inside it.",
      },
      {
        question: "What is disturbing about the fat woman's behavior?",
        options: [
          "She talks constantly",
          "She stares at Martin silently with a knowing smile",
          "She pushes all the buttons",
          "She sings loudly",
        ],
        correctAnswer: 1,
        explanation: "The woman never speaks, just stares at Martin with an unsettling smile - violating normal social behavior and creating menace.",
      },
      {
        question: "How does Martin's father respond to his fears?",
        options: [
          "He investigates and protects Martin",
          "He dismisses Martin as a coward",
          "He calls the police",
          "He moves to a different building",
        ],
        correctAnswer: 1,
        explanation: "Martin's father dismisses his fears, calling him weak and cowardly. This leaves Martin alone and unprotected.",
      },
      {
        question: "Why can't Martin avoid the elevator at the end of the story?",
        options: [
          "The stairs are locked",
          "He breaks his leg and cannot climb stairs",
          "His father carries him",
          "The building is renovated",
        ],
        correctAnswer: 1,
        explanation: "Martin falls and breaks his leg, making it impossible to take the stairs. He is now trapped - he must use the elevator.",
      },
      {
        question: "What are the woman's only words in the story?",
        options: [
          "Hello, Martin",
          "I've been waiting for you, Martin",
          "Going up?",
          "Nice day, isn't it?",
        ],
        correctAnswer: 1,
        explanation: "The woman speaks only once, at the end: 'I've been waiting for you, Martin.' This reveals she has been targeting him specifically.",
      },
      {
        question: "Why is the ending so frightening?",
        options: [
          "The elevator breaks",
          "It is unresolved - we don't know what happens to Martin",
          "The father arrives to save him",
          "The woman leaves",
        ],
        correctAnswer: 1,
        explanation: "The story ends with the doors closing and the woman inside with helpless Martin. We never learn what happens, letting our imagination create the worst.",
      },
      {
        question: "What does the story suggest about childhood fears?",
        options: [
          "Children's fears are always silly",
          "Children can face real threats that adults dismiss, leaving them vulnerable",
          "Adults always know best",
          "Fears should be ignored",
        ],
        correctAnswer: 1,
        explanation: "The story shows that children's fears can be real, and when adults dismiss them, children are left to face dangers alone.",
      },
      {
        question: "What genre does this story belong to?",
        options: [
          "Comedy",
          "Romance",
          "Psychological horror/suspense",
          "Science fiction",
        ],
        correctAnswer: 2,
        explanation: "The Elevator is psychological horror/suspense - it builds fear through everyday situations, unexplained threat, and an unresolved ending.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "The elevator was old and very small, its walls scratched and dirty. Martin always felt trapped inside it. Every time the doors slid shut, his heart beat faster.",
        questions: [
          {
            question: "How does the description of the elevator create atmosphere?",
            answer: "Words like 'old,' 'small,' 'scratched,' and 'dirty' create a claustrophobic, unpleasant setting. The elevator becomes a trap, a confined space where bad things can happen.",
          },
          {
            question: "What does 'felt trapped' foreshadow?",
            answer: "Martin's feeling of being trapped foreshadows his actual entrapment at the story's end, when a broken leg forces him to use the elevator with the menacing woman.",
          },
          {
            question: "Why is the elevator an effective setting for horror?",
            answer: "Elevators are confined spaces where you cannot escape, must wait, and are close to strangers. These natural anxieties make the elevator perfect for building suspense.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "She stared at him. Not glancing, not looking away - staring. And she smiled, a strange knowing smile. She took up most of the small space, pushing Martin into the corner.",
        questions: [
          {
            question: "What makes the woman's behavior threatening?",
            answer: "Her unbroken stare violates social norms - normally people look away. Combined with her 'knowing smile' and physical crowding of Martin, her behavior suggests predatory intent.",
          },
          {
            question: "What does the 'knowing smile' suggest?",
            answer: "The 'knowing smile' suggests the woman has information or intentions regarding Martin that he doesn't understand. She knows something he doesn't, which is deeply unsettling.",
          },
          {
            question: "How does the physical description increase Martin's vulnerability?",
            answer: "Martin is pushed into the corner, physically dominated by the large woman. He cannot move, cannot escape, is made physically small and helpless - mirroring his emotional state.",
          },
        ],
      },
      {
        id: "passage-3",
        extract: "'I've been waiting for you, Martin,' she said. And the doors slid closed behind her.",
        questions: [
          {
            question: "Why is this the most terrifying moment in the story?",
            answer: "The woman's knowledge of Martin's name confirms she has been targeting him specifically. She has been 'waiting' - this was planned. And the doors closing traps Martin with her.",
          },
          {
            question: "Why does Sleator end the story here without resolution?",
            answer: "The unresolved ending lets readers' imagination create the horror. Not knowing what happens is worse than any specific answer. The fear continues beyond the page.",
          },
          {
            question: "What does this ending suggest about Martin's fate?",
            answer: "The ending implies terrible things without stating them. Martin is helpless (broken leg), trapped (elevator), alone (no help coming), with a predator who has been 'waiting.' The implication is grim.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Suspense",
        example: "The gradual escalation of encounters with the woman",
        explanation: "Sleator builds suspense slowly - each encounter is worse than the last, increasing tension until the final confrontation.",
      },
      {
        device: "Foreshadowing",
        example: "Martin's feeling of being 'trapped' in the elevator",
        explanation: "Early descriptions of feeling trapped foreshadow Martin's actual entrapment at the end when he cannot escape.",
      },
      {
        device: "Open/Ambiguous Ending",
        example: "The story ends without revealing what happens to Martin",
        explanation: "The unresolved ending amplifies horror. Readers must imagine what happens, and imagination creates worse scenarios than any specific answer.",
      },
      {
        device: "Setting as Character",
        example: "The old, cramped elevator",
        explanation: "The elevator is almost a character itself - it creates the conditions for horror through its confined, inescapable nature.",
      },
      {
        device: "Ironic Helplessness",
        example: "Martin's broken leg removes his only escape",
        explanation: "Just when Martin needs to escape most, injury makes escape impossible. The irony is cruel and increases the horror.",
      },
    ],
  },
  {
    id: "the-girl-who-can",
    title: "The Girl Who Can",
    author: "Ama Ata Aidoo",
    type: "story",
    summary: "A story about Adjoa, a young Ghanaian girl whose grandmother criticizes her thin legs, but whose mother and running ability eventually prove her worth.",
    detailedSummary: `"The Girl Who Can" by Ama Ata Aidoo is a heartwarming story from Ghana that explores generational conflict, gender expectations, and how children can challenge traditional beliefs through their achievements.

The story is narrated by seven-year-old Adjoa, a bright and observant young girl. She lives with her mother and her grandmother, Nana. Adjoa's father is absent, working in the city, which creates some tension - Nana often criticizes the mother for not having a husband present.

The central conflict revolves around Adjoa's legs. She has thin, stick-like legs, which deeply concerns her grandmother. Nana believes that a woman's worth is tied to her ability to bear children, and for childbearing, a woman needs strong, sturdy legs. "What can a girl do with legs like that?" Nana constantly asks. She worries that Adjoa will never be able to carry pregnancies or be a proper wife.

Adjoa's mother defends her daughter but doesn't directly confront Nana. The mother represents a more modern perspective - she values Adjoa for who she is, not just her potential as a future mother. But Nana represents traditional Ghanaian values where a woman's primary role is reproduction.

Adjoa listens to all these discussions about her legs with the innocent curiosity of a child. She doesn't fully understand why her thin legs are such a problem, but she feels the weight of her grandmother's disappointment.

The turning point comes when Adjoa's school holds a sports day. Adjoa enters the running race, and despite - or because of - her thin legs, she runs faster than everyone else. She wins the race decisively. Her thin legs, which Nana saw as a defect, turn out to be perfect for running.

When Adjoa comes home with her trophy and the news of her victory, Nana's perspective shifts. "Thin legs can run!" Nana exclaims with wonder and pride. For the first time, she sees that Adjoa's legs have value - just not the value she expected.

The story ends with a celebration of Adjoa's achievement and a subtle message about changing times. Nana still holds traditional values, but she is capable of adjusting her views when presented with evidence. Adjoa has proven herself on her own terms, not on the terms dictated by traditional gender roles.

Aidoo's story explores how different generations view girls' bodies and potential. It celebrates achievement, questions gender stereotypes, and shows that worth can be demonstrated in unexpected ways.`,
    themes: ["Gender expectations", "Self-worth", "Generation gap", "Empowerment", "Traditional vs modern values", "Women's potential"],
    keyPoints: [
      "Adjoa is a young Ghanaian girl with thin legs that worry her grandmother",
      "Nana (grandmother) believes girls need strong legs for childbearing - a traditional view",
      "Adjoa's mother defends her but doesn't directly challenge Nana",
      "Adjoa wins a running race at school, proving her thin legs are an advantage",
      "Nana's perspective changes: 'Thin legs can run!'",
      "The story celebrates girls' potential beyond traditional gender roles",
    ],
    characters: [
      { name: "Adjoa", description: "A seven-year-old girl with thin legs. She is observant, innocent, and narrates the story. She wins a running race, proving her worth on her own terms rather than by traditional standards." },
      { name: "Nana (Grandmother)", description: "Adjoa's traditional grandmother who believes a woman's worth is tied to childbearing. She criticizes Adjoa's thin legs but changes her view after Adjoa wins the race." },
      { name: "Adjoa's Mother", description: "A more modern woman who defends Adjoa and values her for who she is. She represents changing attitudes toward women's roles." },
    ],
    importantQuotes: [
      "Thin legs can run",
      "What can a girl do with legs like that?",
      "Nobody has been able to tell me why",
      "She came home with the trophy",
      "Nana was very pleased",
    ],
    lineExplanations: [
      {
        lines: "Opening: The Legs Question",
        text: "Nana always complained about Adjoa's thin legs.",
        explanation: "The story establishes the central conflict immediately. Adjoa's thin legs represent the gap between traditional expectations (strong legs for childbearing) and who Adjoa actually is.",
      },
      {
        lines: "Traditional Values",
        text: "'What can a girl do with legs like that?' Nana asked.",
        explanation: "Nana's question reveals her traditional worldview. She measures a girl's worth by her potential for motherhood. Thin legs = poor childbearing = worthless. This is the belief Adjoa must overcome.",
      },
      {
        lines: "The Child's Perspective",
        text: "Nobody has been able to tell me why my legs are a problem.",
        explanation: "Adjoa's innocent narration highlights the absurdity of judging children's bodies. She doesn't understand the adult obsession with her legs, which makes the reader question it too.",
      },
      {
        lines: "The Mother's Defense",
        text: "Adjoa's mother said she would be fine.",
        explanation: "The mother represents a modern perspective that values Adjoa as a person, not just a future mother. Her quiet defense contrasts with Nana's vocal criticism.",
      },
      {
        lines: "The Race",
        text: "Adjoa ran faster than everyone else. She won.",
        explanation: "The race is the turning point. Adjoa's 'defective' thin legs become her greatest strength. She proves herself on her own terms, not by traditional standards.",
      },
      {
        lines: "The Transformation",
        text: "'Thin legs can run!' Nana exclaimed.",
        explanation: "Nana's view transforms. She can now see value in Adjoa's legs - just different value than she expected. The story shows traditional views can change when confronted with achievement.",
      },
    ],
    mcqs: [
      {
        question: "Why does Nana criticize Adjoa's thin legs?",
        options: [
          "Because they are ugly",
          "Because she believes strong legs are needed for childbearing",
          "Because Adjoa can't walk properly",
          "Because thin legs are unlucky",
        ],
        correctAnswer: 1,
        explanation: "Nana holds traditional beliefs that women need strong legs for carrying pregnancies and being good mothers.",
      },
      {
        question: "What does Nana's question 'What can a girl do with legs like that?' reveal?",
        options: [
          "She is asking about fashion",
          "She judges girls primarily by their potential for motherhood",
          "She wants Adjoa to exercise",
          "She is complimenting Adjoa",
        ],
        correctAnswer: 1,
        explanation: "Nana's question reveals her traditional view that a girl's worth is determined by her ability to bear children.",
      },
      {
        question: "How does Adjoa prove her worth?",
        options: [
          "By having children",
          "By winning a running race at school",
          "By gaining weight",
          "By arguing with Nana",
        ],
        correctAnswer: 1,
        explanation: "Adjoa wins a running race, showing that her thin legs are actually an advantage - they can run fast.",
      },
      {
        question: "What does 'Thin legs can run!' mean in the story?",
        options: [
          "Nana still disapproves",
          "Nana now sees value in Adjoa's legs, though different from what she expected",
          "Running is bad for thin legs",
          "Adjoa should become a professional runner",
        ],
        correctAnswer: 1,
        explanation: "Nana's exclamation shows her changed perspective. She can now appreciate Adjoa's legs for what they can do, not what she thought they couldn't.",
      },
      {
        question: "What conflict does the story explore?",
        options: [
          "Conflict between countries",
          "Conflict between traditional and modern views of women's worth",
          "Conflict between schools",
          "Conflict between sports",
        ],
        correctAnswer: 1,
        explanation: "The story explores generational conflict between traditional views (woman = mother) and modern views (women have many kinds of potential).",
      },
      {
        question: "What is the effect of having Adjoa narrate the story?",
        options: [
          "It makes the story confusing",
          "Her innocent perspective makes readers question adult prejudices",
          "It makes the story longer",
          "It hides information",
        ],
        correctAnswer: 1,
        explanation: "Adjoa's innocent narration highlights the absurdity of judging children's bodies. Her confusion makes readers question the adults' obsession.",
      },
      {
        question: "What does the story suggest about traditional beliefs?",
        options: [
          "They should never be questioned",
          "They can change when confronted with new evidence",
          "They are always wrong",
          "Only young people should have beliefs",
        ],
        correctAnswer: 1,
        explanation: "The story shows Nana changing her view after Adjoa's achievement. Traditional beliefs can evolve when presented with evidence.",
      },
      {
        question: "What theme does this story celebrate?",
        options: [
          "The importance of having strong legs",
          "Girls' potential beyond traditional gender roles",
          "The superiority of grandmothers",
          "Avoiding exercise",
        ],
        correctAnswer: 1,
        explanation: "The story celebrates girls' potential in areas beyond traditional expectations. Adjoa proves herself through athletic achievement, not conformity to gender roles.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "Nana always talked about my legs. She said they were too thin. 'What can a girl do with legs like that?' she would ask. Nobody has been able to tell me why my legs are such a problem.",
        questions: [
          {
            question: "What does Nana's constant talk about Adjoa's legs reveal?",
            answer: "Nana is obsessed with traditional standards of femininity. She judges Adjoa's potential as a woman by her body, specifically by whether her legs can support pregnancy. This reveals traditional gender expectations.",
          },
          {
            question: "Why can't anyone explain the 'problem' to Adjoa?",
            answer: "The 'problem' isn't logical from a child's perspective. Adjoa's legs work fine - she can walk and run. The adults' concern is about future childbearing, which Adjoa doesn't understand. The inability to explain highlights the questionable nature of the prejudice.",
          },
          {
            question: "What effect does Adjoa's innocent confusion have on readers?",
            answer: "Her confusion invites readers to question the adults' concerns. If the prejudice can't be explained to a child, perhaps it doesn't make sense. Her innocence becomes a critique of traditional attitudes.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "Adjoa ran in the school race. She ran faster than all the other children. She came home with the trophy, and Nana was very pleased.",
        questions: [
          {
            question: "How does this moment change the story's direction?",
            answer: "The race is the turning point. Adjoa's 'problematic' thin legs become her greatest asset. She proves that her body has value - just not the value Nana expected. Achievement challenges prejudice.",
          },
          {
            question: "Why is Nana 'pleased' despite her earlier criticism?",
            answer: "Nana can appreciate achievement even if it's not what she expected. Adjoa has proven her worth, and Nana's pleasure shows she can adjust her views. Traditional people can change when presented with evidence.",
          },
          {
            question: "What does the trophy symbolize?",
            answer: "The trophy is physical proof of Adjoa's worth. It's undeniable evidence that her thin legs are valuable. It represents achievement on Adjoa's own terms, not by traditional standards.",
          },
        ],
      },
      {
        id: "passage-3",
        extract: "'Thin legs can run!' Nana exclaimed with wonder. She looked at Adjoa's legs differently now.",
        questions: [
          {
            question: "What does Nana's exclamation reveal about her changed perspective?",
            answer: "Nana now sees value in Adjoa's legs. The exclamation shows surprise and admiration - she didn't expect thin legs could be advantageous. Her view has expanded beyond traditional assumptions.",
          },
          {
            question: "Does Nana abandon her traditional values completely?",
            answer: "Not completely - she still focuses on what legs 'can do.' But she has expanded her definition of what's valuable. She can appreciate achievement even when it doesn't fit her original framework.",
          },
          {
            question: "What hope does this ending offer?",
            answer: "The ending suggests generations can learn from each other. Traditional views can evolve. Girls can prove themselves through achievement. Change is possible, even in traditional societies.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "First-Person Child Narrator",
        example: "Adjoa telling her own story",
        explanation: "Adjoa's innocent perspective exposes the absurdity of adult prejudices. Her confusion about why her legs are 'wrong' makes readers question the attitude.",
      },
      {
        device: "Symbolism",
        example: "The thin legs represent non-traditional female potential",
        explanation: "Adjoa's legs symbolize her worth. They are judged 'wrong' by tradition but prove 'right' for running - showing worth can be measured in many ways.",
      },
      {
        device: "Generational Conflict",
        example: "Nana vs. Adjoa's mother",
        explanation: "The grandmother and mother represent traditional and modern views. Their conflict over Adjoa's legs is really about how to value women.",
      },
      {
        device: "Reversal/Irony",
        example: "The 'defective' legs become Adjoa's greatest strength",
        explanation: "What Nana saw as a flaw becomes an advantage. This reversal challenges assumptions about bodies and worth.",
      },
      {
        device: "Transformation",
        example: "Nana's changed perspective at the end",
        explanation: "Nana's transformation from critic to admirer shows that traditional views can evolve through new experiences.",
      },
    ],
  },
  {
    id: "the-pedestrian",
    title: "The Pedestrian",
    author: "Ray Bradbury",
    type: "story",
    summary: "A dystopian story set in 2053 where Leonard Mead, the only person who still walks outdoors for pleasure, is arrested by a robotic police car for being 'abnormal.'",
    detailedSummary: `"The Pedestrian" by Ray Bradbury is a chilling dystopian story that imagines a future where human connection and simple pleasures have been replaced by screens and isolation. Written in 1951, it remains remarkably prescient about technology's impact on society.

The story is set in November 2053, in a city of three million people. It follows Leonard Mead, a writer, on his nightly walk through the empty streets. Every evening for ten years, Mead has walked alone through the city, and in all that time, he has never encountered another person walking.

Why? Because everyone else is inside, watching television. Every house Mead passes is dark except for the flickering light of TV screens in windows. The citizens sit in their "tomb-like" houses, mesmerized by their viewing screens, completely disconnected from the outside world and from each other.

Mead walks for the simple pleasure of walking - to breathe fresh air, to see the night sky, to experience the physical world. These are activities that were once normal but have become completely alien in 2053. Mead is essentially the last person who still values direct experience over mediated entertainment.

His profession is also significant: he is a writer. But in this world, no one reads anymore. They only watch screens. Writing has become obsolete, making Mead doubly an outsider - he both walks and writes, two activities that the screen-obsessed society has abandoned.

One night, Mead encounters the only police car in the entire city. There is no crime anymore because everyone stays inside; there's no need for multiple police cars. The car is robotic, with no human inside. It stops Mead and interrogates him.

The conversation is absurd and chilling. The car cannot understand why anyone would walk "just to walk." When Mead explains he walks "for air" and "to see," these answers don't compute. When asked his profession, Mead says he's a writer - the car responds "No profession." When asked if he has a viewing screen (television), Mead admits he does but rarely watches it - this is treated as highly suspicious.

Mead is alone, unmarried, with no family at home. In the car's logic, a person who walks alone at night, doesn't watch TV, has no visible profession, and lives alone must be aberrant. The car's conclusion: Mead has "regressive tendencies."

Mead is arrested and taken to the Psychiatric Center for Research on Regressive Tendencies. His crime? Being human in a dehumanized world. Walking, breathing, observing, thinking - activities that define humanity - have become symptoms of mental illness.

The story ends with the police car carrying Mead through the empty streets, past all the houses with their flickering screens, toward institutionalization. The last human who values direct experience is being removed from a society that has chosen to live through screens.

Bradbury's story warns about technology replacing human experience, conformity crushing individuality, and a future where being truly alive is considered a crime.`,
    themes: ["Technology vs humanity", "Conformity", "Loss of individuality", "Dystopia", "Isolation", "The death of human experience"],
    keyPoints: [
      "In 2053, everyone stays indoors watching screens - no one goes outside",
      "Leonard Mead is the only person who still walks for pleasure",
      "He is a writer, but no one reads anymore - 'No profession'",
      "A robotic police car stops him and cannot understand walking 'just to walk'",
      "Mead is arrested for 'regressive tendencies' - being human is a crime",
      "He is taken to a psychiatric center for research on his 'abnormality'",
    ],
    characters: [
      { name: "Leonard Mead", description: "A writer who walks alone every night for pleasure. He is the last person who values direct human experience - walking, breathing, seeing. In the screen-obsessed world of 2053, his normal human activities make him an aberration." },
      { name: "The Police Car", description: "A robotic vehicle with no human inside. It represents dehumanized authority that cannot understand or value human experience. It arrests Mead for the 'crime' of being human." },
    ],
    importantQuotes: [
      "In ten years of walking by night or day, for thousands of miles, he had never met another person walking",
      "Walking for air. Walking to see.",
      "Your profession? I guess you'd call me a writer. No profession.",
      "The Psychiatric Center for Research on Regressive Tendencies",
      "The houses were dark... only the faint glimmers of firefly light... the TV shows",
      "He was alone in this world, or, as good as alone",
    ],
    lineExplanations: [
      {
        lines: "Opening: The Empty Streets",
        text: "In ten years of walking, he had never met another person walking.",
        explanation: "This establishes the dystopia immediately. In ten years, not one other person walked outside. Everyone is inside, watching screens. The normal human activity of walking has become extraordinary.",
      },
      {
        lines: "The Dark Houses",
        text: "The houses were dark, only the faint glimmers of firefly light - the television shows.",
        explanation: "Bradbury describes houses as dark except for TV light. The 'firefly' image suggests weak, artificial light compared to real life. Citizens live in darkness, illuminated only by screens.",
      },
      {
        lines: "Walking for Air",
        text: "'What are you doing out?' 'Walking.' 'Walking where? Walking for what?' 'Walking for air. Walking to see.'",
        explanation: "The interrogation is absurd. The car cannot understand walking for its own sake. Simple human experiences - breathing, seeing - require explanation. They have become abnormal.",
      },
      {
        lines: "No Profession",
        text: "'Your profession?' 'I guess you'd call me a writer.' 'No profession.'",
        explanation: "In a world where no one reads, writing is not recognized as a profession. Mead's identity as a creator is erased. The car only recognizes consumption (watching screens), not creation.",
      },
      {
        lines: "The Diagnosis",
        text: "'To the Psychiatric Center for Research on Regressive Tendencies.'",
        explanation: "Walking, not watching TV, living alone, being a writer - these are diagnosed as mental illness. 'Regressive tendencies' means wanting to be human. Being normal is now a psychiatric disorder.",
      },
      {
        lines: "The Final Image",
        text: "The car moved down the empty streets, past the houses with their viewing screens.",
        explanation: "The ending shows Mead being taken away while citizens sit obliviously watching screens. The last human is being removed, and no one notices or cares. The victory of screens over humanity is complete.",
      },
    ],
    mcqs: [
      {
        question: "Why has Leonard Mead never met another person walking in ten years?",
        options: [
          "The city is deserted",
          "Everyone stays indoors watching screens",
          "Walking is illegal",
          "It's too dangerous outside",
        ],
        correctAnswer: 1,
        explanation: "In 2053, everyone stays inside watching television. Walking has been abandoned entirely.",
      },
      {
        question: "What is Leonard Mead's profession?",
        options: [
          "Police officer",
          "Writer (though the car says 'No profession')",
          "Teacher",
          "Doctor",
        ],
        correctAnswer: 1,
        explanation: "Mead is a writer, but in a world where no one reads, this is not recognized as a profession.",
      },
      {
        question: "Why does the police car arrest Mead?",
        options: [
          "He committed a crime",
          "He was speeding",
          "His behavior (walking, not watching TV) is considered abnormal",
          "He refused to answer questions",
        ],
        correctAnswer: 2,
        explanation: "Mead's normal human behaviors - walking, not watching TV, living alone - are considered symptoms of mental illness in this society.",
      },
      {
        question: "What does 'Regressive Tendencies' mean in this story?",
        options: [
          "Criminal behavior",
          "Wanting to experience life directly rather than through screens - being human",
          "Moving backward physically",
          "Being elderly",
        ],
        correctAnswer: 1,
        explanation: "'Regressive tendencies' means wanting to do things the 'old way' - walking, breathing fresh air, experiencing reality. Being human is now a psychiatric diagnosis.",
      },
      {
        question: "What is significant about the police car?",
        options: [
          "It is very fast",
          "It is robotic with no human inside - representing dehumanized authority",
          "It is very large",
          "It has lights",
        ],
        correctAnswer: 1,
        explanation: "The car has no human inside. Authority itself has become mechanical, unable to understand or value human experience.",
      },
      {
        question: "What warning is Bradbury giving about the future?",
        options: [
          "Cars will become dangerous",
          "Technology and screens could replace human connection and experience",
          "Walking causes mental illness",
          "Police should be robots",
        ],
        correctAnswer: 1,
        explanation: "Bradbury warns that technology (screens) could isolate people, replace real experience, and make authentic human life seem abnormal.",
      },
      {
        question: "Why is the story called 'The Pedestrian'?",
        options: [
          "Because Mead drives a car",
          "Because walking (being a pedestrian) has become so rare it defines Mead as unique",
          "Because pedestrians are common",
          "Because of traffic rules",
        ],
        correctAnswer: 1,
        explanation: "The title highlights how extraordinary Mead is. Being a 'pedestrian' (someone who walks) is so rare that it becomes his defining characteristic.",
      },
      {
        question: "Written in 1951, why is this story still relevant today?",
        options: [
          "Cars are still being made",
          "Screens (phones, TVs, computers) increasingly dominate life, just as Bradbury predicted",
          "Walking is no longer possible",
          "Police cars are now robotic",
        ],
        correctAnswer: 1,
        explanation: "Bradbury's vision of people isolated in their homes, staring at screens, disconnected from each other and nature, is remarkably similar to modern life.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "In ten years of walking by night or day, for thousands of miles, he had never met another person walking, not one in all that time.",
        questions: [
          {
            question: "What does this statement reveal about society in 2053?",
            answer: "It reveals complete social isolation. In a city of three million, no one goes outside. Everyone is inside watching screens. The most basic human activity - walking - has been entirely abandoned.",
          },
          {
            question: "Why is Mead's walking significant?",
            answer: "His walking represents resistance to technology's takeover of human life. He values direct experience - air, sight, movement - while everyone else has surrendered to passive screen consumption.",
          },
          {
            question: "What does this suggest about Mead's character?",
            answer: "Mead is an individualist who values human experience over conformity. His persistence in walking for ten years shows commitment to his values despite being completely alone in them.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "'What are you doing out?' 'Walking.' 'Walking where?' 'Just walking.' 'Walking for what?' 'Walking for air. Walking to see.'\n'Your profession?' 'I guess you'd call me a writer.' 'No profession.'",
        questions: [
          {
            question: "Why can't the police car understand 'walking for air'?",
            answer: "The car represents a system that only understands purpose-driven, productive activity. Walking for its own sake - for pleasure, health, experience - doesn't compute. Human experiences have become inexplicable.",
          },
          {
            question: "Why is 'writer' classified as 'no profession'?",
            answer: "In a world where everyone watches screens and no one reads, writing has no value. Creators are irrelevant when citizens are pure consumers. Mead's identity is erased by a system that doesn't recognize creation.",
          },
          {
            question: "What is Bradbury saying about dehumanization?",
            answer: "The exchange shows how inhuman the system has become. Simple human activities (walking, breathing, creating) cannot be understood by mechanical authority. Humanity itself has become unrecognizable.",
          },
        ],
      },
      {
        id: "passage-3",
        extract: "'To the Psychiatric Center for Research on Regressive Tendencies.' The car moved down the empty street, past the houses that were dark and grey, and the only light was the grey, flickering light of the television sets.",
        questions: [
          {
            question: "What is ironic about calling Mead's behavior 'regressive'?",
            answer: "Walking, breathing fresh air, and experiencing the world directly are normal human behaviors throughout history. Calling them 'regressive' inverts reality - passive screen-watching is treated as progress while actual living is a disorder.",
          },
          {
            question: "What does the image of flickering TV light in dark houses represent?",
            answer: "The image represents a dead society. Houses are dark (lifeless) except for the weak artificial light of screens. Citizens exist in darkness, their only illumination from fictional worlds. Real life has been replaced by electronic shadows.",
          },
          {
            question: "What is the significance of the ending?",
            answer: "Mead is removed while citizens sit obliviously watching screens. The last person valuing human experience is being institutionalized, and no one notices. Technology's victory over humanity is complete and uncontested.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "Dystopia",
        example: "The entire setting of 2053",
        explanation: "Bradbury creates a dystopia where technology has replaced human connection, conformity is enforced, and individuality is criminalized.",
      },
      {
        device: "Irony",
        example: "Normal human behavior classified as mental illness",
        explanation: "The central irony is that walking and experiencing life - things that define humanity - are diagnosed as 'regressive tendencies' requiring psychiatric treatment.",
      },
      {
        device: "Symbolism",
        example: "The robotic police car",
        explanation: "The car with no human inside symbolizes dehumanized authority. It cannot understand or value human experience because it has no humanity.",
      },
      {
        device: "Imagery",
        example: "Dark houses with flickering TV light",
        explanation: "The visual image of dark houses lit only by screens represents a society that has chosen artificial life over real experience.",
      },
      {
        device: "Foreshadowing/Warning",
        example: "The entire story as prediction",
        explanation: "Written in 1951, the story predicts a screen-dominated future. Bradbury warned about technology isolating people - a warning increasingly relevant today.",
      },
    ],
  },
  {
    id: "the-last-lesson",
    title: "The Last Lesson",
    author: "Alphonse Daudet",
    type: "story",
    summary: "Set during the Franco-Prussian War, a young boy realizes the value of his French language and teacher on the day when German is imposed as the new language of instruction.",
    detailedSummary: `"The Last Lesson" by Alphonse Daudet is a poignant story about patriotism, the value of one's native language, and the tragedy of realizing importance only when something is lost. Set during the Franco-Prussian War (1870-71), it takes place in the French region of Alsace, which was about to be annexed by Germany.

The story is narrated by Franz, a young schoolboy. Franz is not a model student - he often skips school, prefers playing outside, and finds French grammar tedious. On the morning the story begins, Franz is late for school and considers not going at all. He is particularly worried because M. Hamel, his teacher, had said there would be a test on participles, and Franz knows nothing about them.

On his way to school, Franz notices that something is different. The town seems quieter. There is a crowd reading notices at the town hall. A blacksmith tells Franz not to hurry - "You'll get there soon enough." Franz doesn't understand these strange hints.

When Franz arrives at school, he's surprised to find no noise, no usual chaos. The classroom is silent and solemn. Even more surprising, the back benches are filled with village elders - old Hauser, the former mayor, the postman, and others who had not been to school in years.

M. Hamel is wearing his finest clothes - the suit he wears only for special occasions. Franz doesn't understand why until M. Hamel makes an announcement:

"My children, this is the last lesson I shall give you. The order has come from Berlin that from tomorrow, only German will be taught in the schools of Alsace and Lorraine. This is your last French lesson."

Franz is thunderstruck. His last French lesson! He suddenly understands the strange behavior of the town, the villagers in class, M. Hamel's formal dress. The language he had considered boring, the lessons he had skipped - this is the last time he will learn them.

Franz feels deep regret. He regrets every lesson he missed, every moment he wasted. His books, which he found tedious, now seem like "old friends." He realizes too late how precious his language is.

M. Hamel gives an extraordinary lesson. He speaks with emotion about the French language - its beauty, its clarity, its importance. He tells the students: "When a people are enslaved, as long as they hold fast to their language, it is as if they had the key to their prison."

This powerful statement becomes the heart of the story. Language is identity. Language is freedom. Even when conquered, a people who keep their language keep their soul.

The lesson ends. Church bells and Prussian bugles signal the end of French rule. M. Hamel tries to speak but cannot - emotion overwhelms him. He turns to the blackboard and writes in large letters: "VIVE LA FRANCE!" (Long Live France!)

Then he dismisses the class with a gesture, unable to speak. Franz notices that M. Hamel looks very tall and dignified at this moment.

The story is a powerful meditation on what we take for granted. Franz represents everyone who doesn't appreciate what they have until it's gone. The French language, dismissed as boring grammar exercises, becomes precious only when it's being taken away.`,
    themes: ["Patriotism", "Language and identity", "Regret", "Value of education", "Loss", "Colonialism and resistance"],
    keyPoints: [
      "Franz is a lazy student who dislikes French lessons and often skips school",
      "He arrives to find the classroom solemn with village elders present",
      "M. Hamel announces this is the last French lesson - German will replace it",
      "Franz deeply regrets all the lessons he wasted and missed",
      "M. Hamel teaches: 'When a people keep their language, they keep the key to their prison'",
      "The lesson ends with M. Hamel writing 'VIVE LA FRANCE!' on the board",
    ],
    characters: [
      { name: "Franz", description: "A young schoolboy who has been lazy about learning French. He narrates the story and represents those who don't appreciate what they have until it's gone. His regret is the emotional center of the story." },
      { name: "M. Hamel", description: "The dedicated French teacher giving his last lesson after 40 years of teaching. He wears his finest clothes for this sad occasion. He represents dignity and patriotism in the face of loss." },
      { name: "Old Hauser", description: "An elderly villager who comes to attend the last lesson. He represents the community's understanding that language is identity. He cries while following the lesson." },
      { name: "The Blacksmith", description: "Tells Franz not to hurry to school. He knows what awaits - the last French lesson." },
    ],
    importantQuotes: [
      "When a people are enslaved, as long as they hold fast to their language, it is as if they had the key to their prison",
      "Vive La France!",
      "My children, this is the last lesson I shall give you",
      "The order has come from Berlin",
      "My last French lesson!",
      "What a thunderclap these words were to me!",
    ],
    lineExplanations: [
      {
        lines: "Opening: Franz's Attitude",
        text: "Franz considers skipping school, worries about the participles test he didn't study for.",
        explanation: "The opening establishes Franz as a careless student who doesn't value his French lessons. This sets up his later regret - he has wasted what is about to be taken away.",
      },
      {
        lines: "Strange Signs",
        text: "The town is quiet; villagers read notices; the blacksmith says 'You'll get there soon enough.'",
        explanation: "These strange signs create suspense and foreshadow the bad news. The community knows what Franz doesn't - this is a day of mourning, not an ordinary school day.",
      },
      {
        lines: "The Announcement",
        text: "'My children, this is the last lesson I shall give you.'",
        explanation: "M. Hamel's announcement is the story's turning point. Everything Franz dismissed as boring suddenly becomes precious. The finality of 'last' transforms his perspective.",
      },
      {
        lines: "Franz's Realization",
        text: "'My last French lesson! I hardly knew how to write!'",
        explanation: "Franz's regret is immediate and intense. He thinks of all the time he wasted, all the lessons he skipped. What he neglected is now being taken away, and he can never get it back.",
      },
      {
        lines: "Language as Freedom",
        text: "'When a people hold fast to their language, it is as if they had the key to their prison.'",
        explanation: "This is the story's central message. Language = identity = freedom. Even conquered, people who keep their language keep their soul. Losing language is true imprisonment.",
      },
      {
        lines: "The Final Act",
        text: "M. Hamel writes 'VIVE LA FRANCE!' and dismisses class without speaking.",
        explanation: "M. Hamel is overcome by emotion and cannot speak. His written declaration of love for France is more powerful than words. The gesture of dismissal shows his dignity in grief.",
      },
    ],
    mcqs: [
      {
        question: "Why is Franz worried about going to school at the beginning?",
        options: [
          "It is the last lesson",
          "He didn't study for a participles test",
          "He is sick",
          "The school is closed",
        ],
        correctAnswer: 1,
        explanation: "Franz is worried because M. Hamel said there would be a test on participles, and Franz knows nothing about them. He even considers skipping school.",
      },
      {
        question: "Why are village elders present in the classroom?",
        options: [
          "To inspect the school",
          "To attend the last French lesson as a tribute to their language",
          "To meet M. Hamel",
          "To complain about students",
        ],
        correctAnswer: 1,
        explanation: "The villagers come to honor their language on its last day of instruction. They understand that language is identity, so they come to pay respects.",
      },
      {
        question: "What announcement does M. Hamel make?",
        options: [
          "He is retiring",
          "From tomorrow, only German will be taught - this is the last French lesson",
          "The school is closing",
          "Franz has failed",
        ],
        correctAnswer: 1,
        explanation: "M. Hamel announces that orders from Berlin require German to replace French in schools of Alsace and Lorraine.",
      },
      {
        question: "What does Franz feel after the announcement?",
        options: [
          "Happiness",
          "Deep regret for wasting his time and not learning French properly",
          "Indifference",
          "Anger at M. Hamel",
        ],
        correctAnswer: 1,
        explanation: "Franz feels intense regret. He suddenly realizes the value of what he had dismissed and wasted, and now it's being taken away.",
      },
      {
        question: "What does M. Hamel mean by 'language is the key to the prison'?",
        options: [
          "Languages help in escaping prison",
          "As long as conquered people keep their language, they keep their identity and freedom",
          "Prisons require language skills",
          "German is a prison language",
        ],
        correctAnswer: 1,
        explanation: "M. Hamel means that language is identity and freedom. Even when conquered, people who preserve their language preserve their soul - they have a 'key' to eventual freedom.",
      },
      {
        question: "Why does M. Hamel wear his finest clothes?",
        options: [
          "It is a holiday",
          "To honor the last French lesson - treating it as a solemn, important occasion",
          "He has a meeting",
          "His other clothes are dirty",
        ],
        correctAnswer: 1,
        explanation: "M. Hamel dresses formally to honor the significance of the last French lesson. It is a tribute to the language and his 40 years of teaching.",
      },
      {
        question: "What is the significance of 'VIVE LA FRANCE!' at the end?",
        options: [
          "It is M. Hamel's name",
          "It is a defiant declaration of love for France despite the German takeover",
          "It is the day's lesson",
          "It is a greeting",
        ],
        correctAnswer: 1,
        explanation: "'Vive La France!' (Long Live France!) is M. Hamel's final act of patriotism. Unable to speak through emotion, he writes his love and defiance on the board.",
      },
      {
        question: "What lesson does the story teach about appreciating what we have?",
        options: [
          "Everything is replaceable",
          "We often don't value things until we lose them",
          "School is not important",
          "Teachers are always right",
        ],
        correctAnswer: 1,
        explanation: "The story teaches that we often don't appreciate what we have until it's gone. Franz's regret shows the tragedy of realizing value too late.",
      },
    ],
    comprehensionPassages: [
      {
        id: "passage-1",
        extract: "The morning was warm and bright. I was very late for school and I was afraid of being scolded... Instead of going to school, I thought of running away and spending the day out of doors.",
        questions: [
          {
            question: "What does Franz's attitude reveal about his character at this point?",
            answer: "Franz is a typical careless schoolboy. He prefers playing to studying, considers skipping school, and doesn't take his education seriously. This makes his later regret more powerful.",
          },
          {
            question: "How does this opening create dramatic irony?",
            answer: "We (through the title and situation) know this is the 'last lesson,' but Franz doesn't. His casual attitude toward what is precious creates irony. He considers avoiding something he's about to lose forever.",
          },
          {
            question: "Why is this beginning important for the story's message?",
            answer: "Starting with Franz's carelessness establishes what he takes for granted. His indifference to French lessons makes his later realization more impactful - we don't appreciate things until they're gone.",
          },
        ],
      },
      {
        id: "passage-2",
        extract: "'My children, this is the last lesson I shall give you. The order has come from Berlin that from tomorrow only German will be taught in the schools of Alsace and Lorraine. This is your last French lesson. I want you to be very attentive.'",
        questions: [
          {
            question: "What is the emotional impact of M. Hamel's words?",
            answer: "The words are devastating - simple, direct, and final. 'Last lesson' and 'from tomorrow' create urgency and grief. The request to 'be attentive' becomes heartbreaking rather than routine.",
          },
          {
            question: "What does 'the order has come from Berlin' represent?",
            answer: "Berlin represents foreign power imposing its will. The 'order' shows the community has no choice - their language is being taken by conquest. It represents loss of autonomy and cultural violence.",
          },
          {
            question: "How does this announcement change everything?",
            answer: "Everything Franz dismissed as boring becomes precious. Grammar, vocabulary, lessons - all of it transforms from tedium to treasure. The announcement changes perspective completely.",
          },
        ],
      },
      {
        id: "passage-3",
        extract: "'When a people are enslaved, as long as they hold fast to their language, it is as if they had the key to their prison.'\nThen he... turned to the blackboard and wrote as large as he could: 'VIVE LA FRANCE!'",
        questions: [
          {
            question: "What does M. Hamel mean by language being a 'key to the prison'?",
            answer: "Language preserves identity, culture, and soul. Even when politically conquered, people who keep their language keep their essential selves. Language is the key to eventual freedom because it keeps the nation alive in hearts and minds.",
          },
          {
            question: "Why does M. Hamel write rather than speak at the end?",
            answer: "M. Hamel is overwhelmed by emotion and cannot speak. Writing becomes more powerful than speech - his large letters are a visual declaration of love and defiance. The silence makes the message louder.",
          },
          {
            question: "What is the significance of 'VIVE LA FRANCE!' as the story's ending?",
            answer: "'Long Live France!' is both a patriotic cry and an act of resistance. Even as French is being banned, M. Hamel affirms that France will live on - in language, memory, and heart. It's defiance through love.",
          },
        ],
      },
    ],
    literaryDevices: [
      {
        device: "First-Person Narration",
        example: "Franz telling the story",
        explanation: "Franz's perspective lets readers experience his transformation from careless to deeply affected. His regret becomes ours.",
      },
      {
        device: "Dramatic Irony",
        example: "Franz considers skipping the last French lesson ever",
        explanation: "We know (from context) this is the last lesson, but Franz doesn't. His casual attitude toward something precious creates powerful irony.",
      },
      {
        device: "Symbolism",
        example: "M. Hamel's formal dress, the French language itself",
        explanation: "M. Hamel's finest clothes symbolize the dignity and importance of the occasion. The French language symbolizes identity, freedom, and nationhood.",
      },
      {
        device: "Foreshadowing",
        example: "Strange signs in town - quiet streets, villagers reading notices, blacksmith's words",
        explanation: "These hints build suspense and foreshadow the bad news, making the announcement more impactful.",
      },
      {
        device: "Pathos",
        example: "M. Hamel unable to speak, writing on the board",
        explanation: "The emotional climax - M. Hamel's speechless grief and patriotic defiance - creates deep emotional impact.",
      },
    ],
  },
];

export const getAllTreasureTroveItems = () => [
  ...TREASURE_TROVE_POEMS,
  ...TREASURE_TROVE_STORIES,
];
