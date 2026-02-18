export interface PoemStanza {
  lines: string;
  explanation: string;
}

export interface WordMeaning {
  word: string;
  meaning: string;
}

export interface PoemQA {
  question: string;
  answer: string;
}

export interface LiteraryDevice {
  device: string;
  example: string;
  explanation: string;
}

export interface PoemMCQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PoemData {
  id: string;
  title: string;
  poet: string;
  summary: string;
  themes: string[];
  stanzas: PoemStanza[];
  wordMeanings: WordMeaning[];
  literaryDevices: LiteraryDevice[];
  questions: PoemQA[];
  mcqs: PoemMCQ[];
}

export const POEMS_DATA: PoemData[] = [
  // ─── 1. Haunted Houses ─────────────────────────────────────────────────────
  {
    id: "haunted-houses",
    title: "Haunted Houses",
    poet: "H.W. Longfellow",
    summary:
      "The poem says that every house where people have lived is haunted — not by frightening ghosts, but by the lasting impressions and memories of people who once lived there. 'Houses' is a metaphor for our bodies or lives, and being 'haunted' means we carry permanent imprints from the people we've known. These influences hover quietly like harmless phantoms, shaping us at every stage. Longfellow suggests our subconscious is filled with countless past interactions. An outsider sees only our present self, but inside we feel our whole history. Past influences keep swaying our choices even when forgotten. The poem concludes with a metaphor of moonlight creating a bridge over the sea — just as past influences light our path through life's journey into the unknown.",
    themes: [
      "Memory and influence of the past",
      "Invisible connections between people",
      "Balance between desires and aspirations",
      "The spirit world enriching daily life",
      "Ownership of experiences",
    ],
    stanzas: [
      {
        lines:
          "All houses wherein men have lived and died\nAre haunted houses.",
        explanation:
          "Here, 'houses' is a metaphor for our bodies or lives, and being 'haunted' indicates the indelible mark or influence left by the people we encounter. Just as every house has its history, every person carries the memories and impacts of past relationships.",
      },
      {
        lines:
          "Through the open doors\nThe harmless phantoms on their errands glide,\nWith feet that make no sound upon the floors.",
        explanation:
          "Open doors signify moments of vulnerability or openness in our lives. The 'harmless phantoms' symbolise people who've passed through our lives, sometimes unnoticed but leaving subtle meaningful imprints. Their silent movements suggest the full depth of their influence isn't immediately evident.",
      },
      {
        lines:
          "We meet them at the door-way, on the stair,\nAlong the passages they come and go,\nImpalpable impressions on the air,\nA sense of something moving to and fro.",
        explanation:
          "The various places mentioned (doorway, stair, passages) allude to different phases and transitional moments in our lives. These people affect us at varying intensities and at different times, but their impact remains, even if it's as elusive as 'impressions on the air.'",
      },
      {
        lines:
          "There are more guests at table than the hosts\nInvited; the illuminated hall\nIs thronged with quiet, inoffensive ghosts,\nAs silent as the pictures on the wall.",
        explanation:
          "Our conscious mind (the 'table') often only acknowledges a fraction of the influences and memories we carry. However, our subconscious (the 'illuminated hall') is filled with countless past interactions, represented by the 'quiet, inoffensive ghosts'.",
      },
      {
        lines:
          "The stranger at my fireside cannot see\nThe forms I see, nor hear the sounds I hear;\nHe but perceives what is; while unto me\nAll that has been is visible and clear.",
        explanation:
          "Our experiences, memories, and the impact of past relationships are deeply personal. Others might only see our current state, but we are vividly aware of our history and the multitude of influences that shape our present perception and feelings.",
      },
      {
        lines:
          "We have no title-deeds to house or lands;\nOwners and occupants of earlier dates\nFrom graves forgotten stretch their dusty hands,\nAnd hold in mortmain still their old estates.",
        explanation:
          "While we may feel ownership over our bodies and lives, we don't truly own the influences and memories within us. People from our past, even those long forgotten, continue to impact our choices and perceptions. 'Mortmain' means 'dead hand' — the unyielding grip of past memories.",
      },
      {
        lines:
          "The spirit-world around this world of sense\nFloats like an atmosphere, and everywhere\nWafts through these earthly mists and vapours dense\nA vital breath of more ethereal air.",
        explanation:
          "The 'spirit-world' signifies the realm of memories and past influences that envelope our tangible existence. This ethereal realm breathes life into our daily experiences, enriching our understanding and perspective.",
      },
      {
        lines:
          "Our little lives are kept in equipoise\nBy opposite attractions and desires;\nThe struggle of the instinct that enjoys,\nAnd the more noble instinct that aspires.",
        explanation:
          "Our lives are in a constant state of balance, shaped by both our baser instincts and higher aspirations. These instincts are influenced by the varied people we encounter, some pulling us toward momentary pleasures and others elevating us toward greater goals.",
      },
      {
        lines:
          "These perturbations, this perpetual jar\nOf earthly wants and aspirations high,\nCome from the influence of an unseen star\nAn undiscovered planet in our sky.",
        explanation:
          "Our internal conflicts, the battle between desires and aspirations, often arise from hidden or unacknowledged influences. This 'unseen star' or 'undiscovered planet' symbolises those powerful yet unrecognised people or moments that guide our inner compass.",
      },
      {
        lines:
          "And as the moon from some dark gate of cloud\nThrows o'er the sea a floating bridge of light,\nAcross whose trembling planks our fancies crowd\nInto the realm of mystery and night,",
        explanation:
          "This picturesque imagery depicts how past influences can serve as guiding lights, much like how the moon illuminates a path across the sea. It emphasises that our past shapes our journey, even into the unknown.",
      },
      {
        lines:
          "So from the world of spirits there descends\nA bridge of light, connecting it with this,\nO'er whose unsteady floor, that sways and bends,\nWander our thoughts above the dark abyss.",
        explanation:
          "The world of past influences (or spirits) provides a connection to our present. As we navigate our lives, our decisions and feelings are continually shaped by those who've left their mark on us. The 'dark abyss' represents the unknown aspects of life.",
      },
    ],
    wordMeanings: [
      { word: "Haunted", meaning: "Deeply influenced or pervaded by memories of people from the past" },
      { word: "Houses", meaning: "Metaphor for the lives or bodies of individuals" },
      { word: "Phantoms", meaning: "Ghostly figures representing lingering memories or influences" },
      { word: "Errands", meaning: "Their purposes or reasons for influencing our lives" },
      { word: "Glide", meaning: "Move smoothly and continuously; subtle and unnoticed manner" },
      { word: "Impalpable", meaning: "Difficult to feel or grasp; intangible" },
      { word: "Illuminated hall", meaning: "One's conscious awareness or present state of mind" },
      { word: "Fireside", meaning: "A personal, intimate space within oneself" },
      { word: "Title-deeds", meaning: "Claims or rights to ownership" },
      { word: "Mortmain", meaning: "'Dead hand' — the unyielding grip of past memories over one's present" },
      { word: "Equipoise", meaning: "Balance or equilibrium" },
      { word: "Perturbations", meaning: "Disturbances or conflicts within oneself" },
      { word: "Abyss", meaning: "Deep, uncharted territory or the unknown aspects of life" },
      { word: "Ethereal", meaning: "Extremely delicate and light; heavenly" },
      { word: "Aspirations", meaning: "Higher goals or ambitions" },
    ],
    literaryDevices: [
      {
        device: "Metaphor",
        example: "All houses wherein men have lived and died / Are haunted houses",
        explanation: "'Houses' represents human bodies/lives, and 'haunted' represents being influenced by memories of past people.",
      },
      {
        device: "Personification",
        example: "The harmless phantoms on their errands glide",
        explanation: "Memories and influences are personified as ghosts moving through our lives with purpose.",
      },
      {
        device: "Simile",
        example: "As silent as the pictures on the wall",
        explanation: "Compares the quiet ghosts (memories) to still, silent pictures — present but unobtrusive.",
      },
      {
        device: "Imagery",
        example: "And as the moon from some dark gate of cloud / Throws o'er the sea a floating bridge of light",
        explanation: "Vivid visual imagery of moonlight creating a luminous path over the sea, symbolising how past influences guide us.",
      },
      {
        device: "Alliteration",
        example: "These perturbations, this perpetual jar",
        explanation: "Repetition of the 'p' sound emphasises the constant internal conflict between desires and aspirations.",
      },
    ],
    questions: [
      {
        question: "What does the phrase 'haunted houses' mean in the context of the poem?",
        answer: "In the poem, 'haunted houses' does not refer to scary ghost-filled homes. Instead, it is a metaphor for human lives/bodies being 'haunted' by the lasting impressions, memories, and influences of people who have passed through our lives. Every person carries these invisible imprints.",
      },
      {
        question: "Why does the poet call the phantoms 'harmless'?",
        answer: "The poet calls the phantoms 'harmless' because these are not frightening ghosts but gentle memories and influences of past people. They move silently, gliding without making any sound, and they don't cause harm — they simply linger as subtle impressions that shape who we are.",
      },
      {
        question: "What does 'The stranger at my fireside cannot see / The forms I see' mean?",
        answer: "This means that our personal experiences and memories are deeply private. An outsider (the stranger) can only perceive our current state, but we ourselves are vividly aware of our entire history — all the people, memories, and influences that have shaped us. Others cannot see our inner world.",
      },
      {
        question: "Explain the significance of 'mortmain' in the poem.",
        answer: "'Mortmain' literally means 'dead hand.' It signifies that people from our past, even those long forgotten, still hold a permanent grip on our present lives. Their influence over our choices, perceptions, and identity cannot be shaken off — they 'hold their old estates' forever.",
      },
      {
        question: "What is the 'spirit-world' that Longfellow describes?",
        answer: "The 'spirit-world' represents the realm of memories, past influences, and impressions that surround our tangible reality. It floats like an atmosphere around our world of sense, enriching our daily experiences with a 'vital breath of more ethereal air' — making our lives richer and deeper.",
      },
      {
        question: "How does the poem end? What is the significance of the 'bridge of light'?",
        answer: "The poem ends with the image of moonlight creating a bridge of light over the sea, which symbolises how past influences connect the spirit world to our present reality. Our thoughts wander across this unsteady bridge above the 'dark abyss' of the unknown, guided by the light of past connections.",
      },
      {
        question: "What keeps our lives in 'equipoise' according to the poet?",
        answer: "According to the poet, our lives are kept in balance (equipoise) by the constant pull of opposite forces — our baser instincts that seek pleasure ('the instinct that enjoys') and our nobler aspirations that seek higher goals ('the instinct that aspires'). These opposing influences come from the various people who've shaped us.",
      },
      {
        question: "What atmosphere or mood does the poem create?",
        answer: "Despite the title suggesting something eerie, the poem creates a peaceful and reflective atmosphere. The ghosts are described as 'harmless,' 'quiet,' and 'inoffensive.' The overall mood is contemplative and gentle, exploring how memories and past influences enrich our lives rather than frighten us.",
      },
    ],
    mcqs: [
      {
        id: "poem-mcq-1",
        question: "What does the phrase \"dark abyss\" in the poem Haunted Houses symbolise?",
        options: [
          "Life experiences",
          "Challenges in life",
          "A deep pit",
          "Despair and depression",
        ],
        correctIndex: 3,
        explanation: "The 'dark abyss' symbolises despair and depression — the depth of human experience and emotional darkness that haunts the living.",
      },
      {
        id: "poem-mcq-2",
        question: "The atmosphere created in the poem Haunted Houses is:",
        options: ["melancholic", "eerie", "peaceful", "unsettling"],
        correctIndex: 2,
        explanation: "Despite the title, the poem creates a peaceful atmosphere. The phantoms are described as harmless, quiet, and going about their errands silently.",
      },
      {
        id: "poem-mcq-3",
        question: "The ghosts/phantoms in H.W. Longfellow's Haunted Houses are described as:",
        options: ["harmless", "mischievous", "malevolent", "vengeful"],
        correctIndex: 0,
        explanation: "The poem describes the phantoms as 'harmless' — they glide silently on their errands and leave only 'impalpable impressions' in the air.",
      },
      {
        id: "poem-mcq-4",
        question: "Which of the following options contains the same literary device as the given verse from the poem?\n\"As silent as the pictures on the wall\"",
        options: [
          "Because I could not stop for death. He kindly stopped for me.",
          "Where the mind is without fear, and the head is held high.",
          "Soon, the sun's warmth makes them shed crystal shells, shattering and avalanching on the snow crust.",
          "Some are like fields of sunlit corn.",
        ],
        correctIndex: 3,
        explanation: "The original line uses a simile ('As silent as...'). 'Some are like fields of sunlit corn' also uses a simile (using 'like').",
      },
    ],
  },

  // ─── 2. The Glove and the Lions ────────────────────────────────────────────
  {
    id: "the-glove-and-the-lions",
    title: "The Glove and the Lions",
    poet: "Leigh Hunt",
    summary:
      "The poem opens with King Francis watching his lions fight in an arena, surrounded by nobles and elegant ladies. Among them sits Count de Lorge, sighing for a beautiful lady. The lions rampage fiercely, with bloody foam flying over the barricades. The king remarks humorously that the spectators are safer in their seats. The lady, believing De Lorge to be the bravest man, decides to test his love by dropping her glove into the lion pit. De Lorge bows, leaps among the wild lions, retrieves the glove quickly, but then angrily throws it in her face instead of returning it lovingly. King Francis approves, declaring 'No love, but vanity, sets love a task like that.'",
    themes: [
      "Vanity and pride",
      "True love vs. superficial love",
      "Courage and chivalry",
      "Testing love dangerously",
      "Consequences of arrogance",
    ],
    stanzas: [
      {
        lines:
          "King Francis was a hearty king, and loved a royal sport,\nAnd one day as his lions fought, sat looking on the court;",
        explanation:
          "King Francis is introduced as a lively, energetic king who delights in royal entertainments. He kept lions for violent sport, sitting safely above the arena as the beasts battled below.",
      },
      {
        lines:
          "The nobles filled the benches, and the ladies in their pride,\nAnd 'mongst them sat the Count de Lorge, with one for whom he sighed:",
        explanation:
          "The arena was filled with aristocrats and elegant ladies dressed in their finest. Among them was Count de Lorge, who had eyes only for one particular lady, sighing longingly for her.",
      },
      {
        lines:
          "And truly 'twas a gallant thing to see that crowning show,\nValour and love, and a king above, and the royal beasts below.",
        explanation:
          "The scene embodied ideals of chivalry and romance — bravery and love, with the king presiding above while fierce royal beasts battled below. It was truly a magnificent spectacle.",
      },
      {
        lines:
          "Ramped and roared the lions, with horrid laughing jaws;\nThey bit, they glared, gave blows like beams, a wind went with their paws;",
        explanation:
          "The lions prowled and roared aggressively, their mouths stretched wide as if laughing horribly. They bit savagely, glared fiercely, striking mighty blows with their paws as powerful as beams of light.",
      },
      {
        lines:
          "With wallowing might and stifled roar they rolled on one another;\nTill all the pit with sand and mane was in a thunderous smother;",
        explanation:
          "With immense, crushing power and muffled roars, the lions wrestled and rolled over each other until the pit was filled with flying sand and tangled manes in deafening, chaotic turmoil.",
      },
      {
        lines:
          "The bloody foam above the bars came whisking through the air;\nSaid Francis then, 'Faith, gentlemen, we're better here than there.'",
        explanation:
          "Bloody foam from the lions' mouths sprayed over the barricades. King Francis humorously remarked to his audience that they were much safer watching from their seats than down in the pit.",
      },
      {
        lines:
          "De Lorge's love o'erheard the King, a beauteous lively dame\nWith smiling lips and sharp bright eyes, which always seemed the same;",
        explanation:
          "The lady whom De Lorge pined for overheard the king's comment. She was strikingly beautiful with an unchanging smile and piercing, intelligent eyes — always sparkling and alluring.",
      },
      {
        lines:
          "She thought, the Count my lover is brave as brave can be;\nHe surely would do wondrous things to show his love of me;",
        explanation:
          "She was confident her lover was as courageous as any man could be, and that he would carry out remarkable deeds to demonstrate the depth of his devotion to her.",
      },
      {
        lines:
          "King, ladies, lovers, all look on; the occasion is divine;\nI'll drop my glove, to prove his love; great glory will be mine.",
        explanation:
          "With everyone watching — the king, ladies, and lovers — she saw the perfect opportunity. She decided to drop her glove into the lion pit to test his love, believing great glory would be hers.",
      },
      {
        lines:
          "She dropped her glove, to prove his love, then looked at him and smiled;\nHe bowed, and in a moment leaped among the lions wild:",
        explanation:
          "She daringly dropped her glove into the pit and turned to the Count with a confident smile. He bowed gracefully, then instantly leaped down into the midst of the wild, vicious lions.",
      },
      {
        lines:
          "The leap was quick, return was quick, he has regained his place,\nThen threw the glove, but not with love, right in the lady's face.",
        explanation:
          "As quickly as he leaped in, the Count leaped back out with extraordinary agility, glove in hand. But rather than tenderly returning it, he spitefully threw it right in her face.",
      },
      {
        lines:
          "'By God!' said Francis, 'rightly done!' and he rose from where he sat:\n'No love,' quoth he, 'but vanity, sets love a task like that.'",
        explanation:
          "King Francis approved of the Count's shocking action, declaring 'That was the right thing to do!' He proclaimed that it was not true love but vanity and pride that set such a dangerous challenge.",
      },
    ],
    wordMeanings: [
      { word: "Hearty", meaning: "Lively, vigorous, energetic" },
      { word: "Court", meaning: "Enclosed arena for sports and spectacles" },
      { word: "Nobles", meaning: "Aristocrats, members of the highest social class" },
      { word: "Sighed", meaning: "Longed, pined, yearned" },
      { word: "Gallant", meaning: "Noble, chivalrous, dignified" },
      { word: "Valour", meaning: "Courage, bravery, boldness" },
      { word: "Ramped", meaning: "Prowled, stalked aggressively" },
      { word: "Horrid", meaning: "Terrifying, dreadful, causing horror" },
      { word: "Glared", meaning: "Stared angrily and intensely" },
      { word: "Wallowing", meaning: "Rolling, thrashing around" },
      { word: "Stifled", meaning: "Muffled, choked, suppressed" },
      { word: "Smother", meaning: "Chaotic mix, turmoil" },
      { word: "Whisking", meaning: "Spraying, scattering rapidly" },
      { word: "Beauteous", meaning: "Beautiful, attractive" },
      { word: "Quoth", meaning: "Said, spoke" },
      { word: "Vanity", meaning: "Excessive pride, self-importance" },
    ],
    literaryDevices: [
      {
        device: "Personification",
        example: "Ramped and roared the lions, with horrid laughing jaws",
        explanation: "The lions' jaws are described as 'laughing,' giving them a human quality to emphasise their terrifying ferocity.",
      },
      {
        device: "Simile",
        example: "They bit, they glared, gave blows like beams",
        explanation: "Compares the force of the lions' paw strikes to powerful beams, emphasising the immense strength of their blows.",
      },
      {
        device: "Alliteration",
        example: "Ramped and roared the lions",
        explanation: "Repetition of the 'r' sound creates a sense of the lions' fierce, aggressive energy.",
      },
      {
        device: "Irony",
        example: "Then threw the glove, but not with love, right in the lady's face",
        explanation: "The lady expected a loving return of her glove as proof of devotion, but instead received it thrown angrily in her face — the opposite of what she anticipated.",
      },
      {
        device: "Kinesthetic imagery",
        example: "The bloody foam above the bars came whisking through the air",
        explanation: "Creates a vivid sense of motion and violence as the bloody foam sprays from the lions' fight over the barricades.",
      },
    ],
    questions: [
      {
        question: "What kind of king was Francis? What was the 'royal sport' he enjoyed?",
        answer: "King Francis was a hearty (lively, energetic, good-natured) king. The 'royal sport' he enjoyed was watching his lions fight in an enclosed arena — a violent spectacle where fierce lions battled each other for entertainment while the king and nobles watched safely from above.",
      },
      {
        question: "Why did the lady drop her glove into the lion pit?",
        answer: "The lady dropped her glove to test Count de Lorge's love and bravery. She wanted to prove that he was brave enough to risk his life for her, and she wanted to gain great glory for herself. With the king, nobles, and ladies all watching, she saw it as the perfect opportunity to show off her lover's devotion.",
      },
      {
        question: "How did Count de Lorge react after retrieving the glove?",
        answer: "After leaping into the pit, retrieving the glove quickly, and returning safely, De Lorge did NOT return the glove lovingly. Instead, he angrily threw it right in the lady's face. This showed his disgust at being used as a pawn in her dangerous game of vanity.",
      },
      {
        question: "What did King Francis say at the end? What does it reveal?",
        answer: "King Francis exclaimed 'By God! Rightly done!' and declared 'No love, but vanity, sets love a task like that.' This reveals the moral of the poem — the lady's action was motivated not by genuine love but by vanity and pride. True love would never put a loved one's life at risk for a spectacle.",
      },
      {
        question: "What is the central theme of the poem?",
        answer: "The central theme is the difference between true love and vanity. The poem shows that genuine love doesn't require dangerous tests or public demonstrations. The lady's action was driven by pride and a desire for glory, not real love. The Count's angry response and the King's verdict condemn such vain behaviour.",
      },
      {
        question: "Describe the scene of the lion fight. What imagery does the poet use?",
        answer: "The lions 'ramped and roared' with 'horrid laughing jaws,' bit and glared fiercely, gave blows 'like beams.' They rolled on each other with 'wallowing might and stifled roar' until the pit was in a 'thunderous smother' of sand and mane. 'Bloody foam above the bars came whisking through the air.' The imagery is vivid and violent, emphasising the extreme danger of the pit.",
      },
      {
        question: "Was De Lorge's act of throwing the glove justified? Give reasons.",
        answer: "Yes, De Lorge's act was justified because: (1) The lady risked his life for her own vanity and glory, not out of love. (2) True love does not demand dangerous proof. (3) By throwing the glove back, he showed he recognised her shallow motives. (4) Even King Francis approved, saying it was 'rightly done.' The act exposed the lady's pride and sent a powerful message about genuine vs. superficial love.",
      },
      {
        question: "What is the tone/mood of the poem?",
        answer: "The tone is light-hearted and good-natured, despite the dramatic events. The poet Leigh Hunt uses playful language and a narrative style that makes it entertaining rather than deeply serious. The poem is meant to be enjoyed for its poetic beauty and gentle humour, with a subtle moral about vanity and love.",
      },
    ],
    mcqs: [
      {
        id: "poem-mcq-5",
        question: "Which of the following lines reflects Count de Lorge's valour?",
        options: [
          "Then threw the glove, but not with love.",
          "And 'mongst them sat Count de Lorge, with one for whom he sighed.",
          "He bowed, and in a moment leaped among the lions wild.",
          "I'll drop my glove, to prove his love.",
        ],
        correctIndex: 2,
        explanation: "Leaping among wild lions to retrieve the glove is the direct act of valour — it shows his bravery and courage in the face of mortal danger.",
      },
      {
        id: "poem-mcq-6",
        question: "\"The lions roared with horrid laughing jaws.\" Which of the following uses the same literary device (auditory imagery)?",
        options: [
          "The snowflakes glittered like diamonds.",
          "The caged bird sings with a fearful trill.",
          "My hands were icicles because of the cold weather.",
          "The smell of freshly brewed coffee woke me up.",
        ],
        correctIndex: 1,
        explanation: "Both the original line and 'the caged bird sings with a fearful trill' use auditory imagery — sounds that the reader can almost hear.",
      },
      {
        id: "poem-mcq-7",
        question: "Which of the following is NOT a theme of the poem The Glove and the Lions?",
        options: ["Vanity", "Chivalry", "Pride", "Cruelty"],
        correctIndex: 3,
        explanation: "The poem's themes include vanity (the lady's motive), chivalry (De Lorge's leap), and pride (the lady's arrogance). Cruelty is not a central theme.",
      },
      {
        id: "poem-mcq-8",
        question: "Choose the option that lists the sequence of events in the correct order.\n(i) Retrieving the glove, the angry Count flung it in her face.\n(ii) The count's beloved threw her glove into the arena.\n(iii) The Count realised it was her vanity.\n(iv) The king was enjoying the fight of the royal beasts.",
        options: [
          "(i), (ii), (iii), (iv)",
          "(iv), (ii), (iii), (i)",
          "(ii), (iii), (iv), (i)",
          "(iv), (iii), (i), (ii)",
        ],
        correctIndex: 1,
        explanation: "First the king watches (iv), then the lady drops the glove (ii), the Count realises her vanity (iii), and finally throws the glove back (i).",
      },
    ],
  },

  // ─── 3. The Power of Music ─────────────────────────────────────────────────
  {
    id: "the-power-of-music",
    title: "The Power of Music",
    poet: "Sukumar Ray",
    summary:
      "The poem is a humorous nonsense verse describing how Bhisma Lochan Sharma's terrible singing spreads far and wide during summer, from Delhi to Burma. He sings with full energy as if his life depends on it. His powerful but awful voice causes chaos — people are dazed and trampled, bullock-carts overturn, horses line the roadsides in confusion, fish dive to the bottom of lakes, trees collapse, and birds flip upside down in the sky. Everyone pleads for him to stop, but Bhisma is unconcerned and continues bellowing. The heavens weep and mansions tumble. Finally, a clever billy goat charges at him, butting him with its horns, and Bhisma Lochan grants the world the 'golden gift of silence.'",
    themes: [
      "Humour and satire",
      "The destructive power of bad music",
      "Stubbornness and self-obsession",
      "Absurdity and exaggeration",
      "Relief and silence as a gift",
    ],
    stanzas: [
      {
        lines:
          "When summer comes, we hear the hums\nBhisma Lochan Sharma.\nYou catch his strain on hill and plain from Delhi down to Burma.",
        explanation:
          "Bhisma Lochan Sharma is introduced as a singer with a very loud voice. In summer, his singing spreads everywhere — from Delhi to Burma — showing how far his loud voice carries. This is a humorous exaggeration (hyperbole).",
      },
      {
        lines:
          "He sings as though he's staked his life, he sings as though he's hell-bent;\nThe people, dazed, retire amazed although they know it's well-meant.",
        explanation:
          "He sings with full energy and passion, as if his life depends on it. Though people know he means no harm ('well-meant'), his intense singing confuses and amazes them, leaving them dazed.",
      },
      {
        lines:
          "They're trampled in the panic rout or languish pale and sickly,\nAnd plead, 'My friend, we're near our end, oh stop your singing quickly!'",
        explanation:
          "His singing causes chaos — people get trampled in panic or become pale and sick. They desperately plead with him to stop singing before they die. This is humorous exaggeration.",
      },
      {
        lines:
          "The bullock-carts are overturned, and horses line the roadside;\nBut Bhisma Lochan, unconcerned, goes booming out his broadside.",
        explanation:
          "Even bullock carts overturn and horses stand frightened along the roadsides. But Bhisma Lochan pays no attention to the chaos and continues bellowing loudly — he is completely unconcerned.",
      },
      {
        lines:
          "The wretched brutes resent the blare the hour they hear it sounded,\nThey whine and stare with feet in air or wonder quite confounded.",
        explanation:
          "The animals strongly dislike his singing from the moment they hear it. They whine, stand puzzled with feet in the air, and are completely confused and bewildered by his voice.",
      },
      {
        lines:
          "The fishes dived below the lake in frantic search for silence,\nThe very trees collapse and shake – you hear the crash a mile hence –",
        explanation:
          "Even the fish dive to the bottom of lakes to escape his voice. Trees collapse and shake violently, their crashing audible from a mile away. This absurd exaggeration adds to the humour.",
      },
      {
        lines:
          "And in the sky the feathered fly turn turtle while they're winging,\nAgain we cry, 'We're going to die, oh won't you stop your singing?'",
        explanation:
          "Birds in the sky flip upside down ('turn turtle') in panic while flying. People desperately cry out again, begging him to stop. The image of birds tumbling mid-air is one of the most absurd and funny in the poem.",
      },
      {
        lines:
          "But Bhisma's soared beyond our reach, howe'er we plead and grumble;\nThe welkin weeps to hear his screech, and mighty mansions tumble.",
        explanation:
          "Bhisma is beyond anyone's control, ignoring all pleas. His screeching makes even the sky (welkin) weep, and mighty mansions collapse under the force of his voice.",
      },
      {
        lines:
          "But now there comes a billy goat, a most sagacious fellow,\nHe downs his horns and charges straight, with bellow answering bellow.",
        explanation:
          "A clever (sagacious) billy goat comes along and aggressively charges at Bhisma, bleating just as loudly back at him — answering his bellowing with its own.",
      },
      {
        lines:
          "The strains of song are tossed and whirled by blast of brutal violence,\nAnd Bhisma Lochan grants the world the golden gift of silence.",
        explanation:
          "The goat's violent charge tosses and whirls Bhisma's singing away. Finally, Bhisma stops singing, granting the world the precious 'golden gift of silence.' The ending brings comic relief.",
      },
    ],
    wordMeanings: [
      { word: "Hums", meaning: "Low, continuous sounds" },
      { word: "Strain", meaning: "A particular style or melody of music" },
      { word: "Staked his life", meaning: "Risked his life" },
      { word: "Hell-bent", meaning: "Determined to do something no matter what" },
      { word: "Dazed", meaning: "Stunned, confused" },
      { word: "Retire", meaning: "Withdraw, move away" },
      { word: "Well-meant", meaning: "Good intentioned" },
      { word: "Trampled", meaning: "Crushed underfoot" },
      { word: "Rout", meaning: "Disorderly retreat" },
      { word: "Languish", meaning: "Lose strength and health" },
      { word: "Broadside", meaning: "Strong verbal attack" },
      { word: "Wretched brutes", meaning: "Unhappy, troubled animals" },
      { word: "Blare", meaning: "Loud, harsh noise" },
      { word: "Confounded", meaning: "Confused, perplexed" },
      { word: "Turn turtle", meaning: "Turn upside down" },
      { word: "Welkin", meaning: "Sky, heavens" },
      { word: "Sagacious", meaning: "Wise, discerning" },
      { word: "Bellow", meaning: "Loud deep cry of an animal" },
      { word: "Golden gift of silence", meaning: "The precious and welcome return of peace and quiet" },
    ],
    literaryDevices: [
      {
        device: "Hyperbole",
        example: "You catch his strain on hill and plain from Delhi down to Burma",
        explanation: "Exaggerates the reach of his voice to comical extremes, emphasising how impossibly loud his singing is. Hyperbole is the primary device creating humour throughout the poem.",
      },
      {
        device: "Personification",
        example: "The welkin weeps to hear his screech",
        explanation: "The sky (welkin) is given the human ability to weep, emphasising the extreme unpleasantness of Bhisma's singing in a humorous way.",
      },
      {
        device: "Alliteration",
        example: "blast of brutal violence",
        explanation: "Repetition of the 'b' sound creates a sense of forceful impact when the billy goat charges at Bhisma.",
      },
      {
        device: "Oxymoron",
        example: "golden gift of silence",
        explanation: "Silence is described as a 'golden gift' — ironic because silence is usually taken for granted, but after Bhisma's terrible singing, it becomes the most precious thing.",
      },
      {
        device: "Imagery",
        example: "And in the sky the feathered fly turn turtle while they're winging",
        explanation: "Creates a vivid, absurd visual image of birds flipping upside down mid-flight, adding to the poem's comic effect.",
      },
    ],
    questions: [
      {
        question: "What kind of poem is 'The Power of Music'? What is its purpose?",
        answer: "It is a nonsense verse — a humorous, satirical poem. Its primary purpose is to amuse and entertain readers through absurd exaggeration and comic situations. The satire is directed against bad, loud singing.",
      },
      {
        question: "How does Bhisma Lochan's singing affect humans?",
        answer: "People are dazed and retire amazed. They get trampled in the panic or languish pale and sickly. They desperately plead with him to stop, saying 'we're near our end' and 'we're going to die.' Despite knowing his singing is well-meant, they cannot tolerate it.",
      },
      {
        question: "What is the effect of Bhisma's singing on animals?",
        answer: "Bullock-carts overturn and horses line the roadsides in confusion. Animals whine and stare with feet in air, completely confounded. Fish dive below the lake searching for silence. Birds in the sky turn turtle (flip upside down) while flying. Trees collapse and shake, heard from a mile away.",
      },
      {
        question: "What kind of person is Bhisma Lochan Sharma?",
        answer: "Bhisma is portrayed as stubborn and self-obsessed. He is hell-bent on singing, completely unconcerned about the chaos he causes. He pays no attention to complaints, pleas, or the suffering around him. He is passionate about his singing even though it is terribly loud and discordant.",
      },
      {
        question: "How does the world finally get silence? Why is it called a 'golden gift'?",
        answer: "A clever (sagacious) billy goat charges at Bhisma with lowered horns, bellowing just as loudly. The goat's violent charge tosses away Bhisma's singing, and he finally stops. Silence is called a 'golden gift' because after enduring his terrible singing, the absence of noise becomes the most precious and valuable thing imaginable.",
      },
      {
        question: "What is the main literary device used in the poem? Give examples.",
        answer: "Hyperbole (exaggeration) is the main device used throughout. Examples: (1) His voice carries from Delhi to Burma, (2) Bullock-carts overturn, (3) Trees collapse, (4) Birds turn turtle in the sky, (5) The welkin (sky) weeps, (6) Mighty mansions tumble. All these are absurd exaggerations that create the poem's humour.",
      },
      {
        question: "Describe the billy goat and its role in the poem.",
        answer: "The billy goat is described as 'a most sagacious (wise) fellow.' It plays the role of the hero who finally stops Bhisma's terrible singing. The goat downs its horns and charges straight at Bhisma, answering his bellow with its own bellow. The 'blast of brutal violence' from the goat tosses Bhisma's singing away, granting the world silence.",
      },
      {
        question: "What is the irony in the title 'The Power of Music'?",
        answer: "The title is ironic because 'the power of music' usually suggests something positive and beautiful. However, in this poem, the 'power' of Bhisma's music is entirely destructive and negative — it causes chaos, suffering, and destruction. The title uses irony to set up the humorous contrast between expected beauty and actual disaster.",
      },
    ],
    mcqs: [
      {
        id: "poem-mcq-17",
        question: "\"The people, dazed, retire amazed, although they know it's well meant.\" This line tells us that Bhisma Lochan's singing was ______.",
        options: ["melodious", "discordant", "soothing", "unbelievable"],
        correctIndex: 1,
        explanation: "People are 'dazed' and 'amazed' (in a negative sense) — they know he means well, but his singing is discordant (harsh and unpleasant).",
      },
      {
        id: "poem-mcq-18",
        question: "\"And in the sky the feathered fly turn turtle while they're winging.\" What does the phrase 'turn turtle' mean?",
        options: [
          "Act like a turtle",
          "Jump like a turtle",
          "Turn upside down",
          "Become a turtle",
        ],
        correctIndex: 2,
        explanation: "'Turn turtle' is an idiom meaning to turn upside down — the birds flip over mid-flight because of the terrible singing.",
      },
      {
        id: "poem-mcq-19",
        question: "What does the phrase \"panic rout\" imply in the poem The Power of Music?",
        options: [
          "Solemn parade",
          "Celebration",
          "Unhappy occasion",
          "Chaotic situation",
        ],
        correctIndex: 3,
        explanation: "'Panic rout' describes a chaotic, disorderly retreat — everyone fleeing in terror from Bhisma's terrible singing.",
      },
      {
        id: "poem-mcq-20",
        question: "Which are the geographical locations mentioned in the poem The Power of Music?\n(i) Delhi (ii) Kolkata (iii) Burma (iv) Bangalore",
        options: [
          "(i) and (ii)",
          "(i) and (iii)",
          "(ii) and (iv)",
          "(iii) and (iv)",
        ],
        correctIndex: 1,
        explanation: "The poem mentions Delhi and Burma — 'on plains from Delhi to Burma' — as the range over which Bhisma's voice could be heard.",
      },
    ],
  },

  // ─── 4. A Considerable Speck ───────────────────────────────────────────────
  {
    id: "a-considerable-speck",
    title: "A Considerable Speck",
    poet: "Robert Frost",
    summary:
      "The speaker notices a tiny speck moving across a white sheet of paper he is writing on. At first, he thinks it's just dust blown by his breath, but he realises it is a living mite moving with its own purpose. The mite pauses suspiciously at his pen, races toward the wet ink, then recoils in disgust. The speaker observes how this tiny creature — almost too small to have feet — runs in terror and creeps cunningly, clearly wanting to live. The mite eventually cowers in the middle of the page, surrendering to its fate. The speaker, who rejects the 'collectivistic regimenting love' of modern society, decides to let the mite live because it has done no harm and displays intelligence. He concludes: 'I have a mind myself and recognize / Mind when I meet with it in any guise.'",
    themes: [
      "Respect for intelligence and mind",
      "Value of individual thinking",
      "Compassion for all living beings",
      "Critique of collectivism",
      "Observation and reflection",
    ],
    stanzas: [
      {
        lines:
          "A speck that would have been beneath my sight\nOn any but a paper sheet so white\nSet off across what I had written there.",
        explanation:
          "The poet notices an extremely tiny speck on bright white paper. It's so tiny it would normally be invisible — only the stark contrast of the white paper makes it perceptible. It moves across his writing.",
      },
      {
        lines:
          "And I had idly poised my pen in air\nTo stop it with a period of ink\nWhen something strange about it made me think,",
        explanation:
          "His pen was hovering in the air, about to end the speck with a drop of ink. But something curious about the way it moved caught his attention and made him stop to think more carefully.",
      },
      {
        lines:
          "This was no dust speck by my breathing blown,\nBut unmistakably a living mite\nWith inclinations it could call its own.",
        explanation:
          "He realises this isn't random dust moved by his breath — it is definitively a living mite, moving with self-directed purpose and its own inclinations. It has a will of its own.",
      },
      {
        lines:
          "It paused as with suspicion of my pen,\nAnd then came racing wildly on again\nTo where my manuscript was not yet dry;",
        explanation:
          "The mite pauses apprehensively, seeming to suspect the poet's pen as a threat. Then it resumes scurrying rapidly toward the part of the manuscript where ink is still wet.",
      },
      {
        lines:
          "Then paused again and either drank or smelt–\nWith loathing, for again it turned to fly.",
        explanation:
          "Reaching the wet ink, the mite pauses and either drinks or smells it — but recoils with disgust (loathing), quickly turning to flee from the noxious substance.",
      },
      {
        lines:
          "Plainly with an intelligence I dealt.\nIt seemed too tiny to have room for feet,\nYet must have had a set of them complete",
        explanation:
          "The poet concludes he is witnessing an intelligent creature. Though impossibly tiny — seemingly too small for feet — the mite must have a complete set to move so purposefully.",
      },
      {
        lines:
          "To express how much it didn't want to die.\nIt ran with terror and with cunning crept.\nIt faltered: I could see it hesitate;",
        explanation:
          "The mite's movements reveal a strong will to survive. It runs with fear but also moves with careful cunning. It falters and hesitates, seeming to deliberate what to do next.",
      },
      {
        lines:
          "Then in the middle of the open sheet\nCower down in desperation to accept\nWhatever I accorded it of fate.",
        explanation:
          "After hesitating, the mite ends up frozen in the centre of the page, crouching down in desperate surrender, willing to accept whatever fate the poet chooses to deal out.",
      },
      {
        lines:
          "I have none of the tenderer-than-thou\nCollectivistic regimenting love\nWith which the modern world is being swept.",
        explanation:
          "The poet declares he does not possess sentimental, excessively gentle love, nor the oppressive 'collectivist' love that tries to control everything. He criticises this mentality overtaking the modern world.",
      },
      {
        lines:
          "But this poor microscopic item now!\nSince it was nothing I knew evil of\nI let it lie there till I hope it slept.",
        explanation:
          "However, observing this tiny, helpless mite which has done no harm, the poet decides to leave it alone undisturbed, hoping it will fall asleep in peace on the page.",
      },
      {
        lines:
          "I have a mind myself and recognize\nMind when I meet with it in any guise.\nNo one can know how glad I am to find\nOn any sheet the least display of mind.",
        explanation:
          "The poet affirms that he possesses intelligence and can perceive it in any living being, however humble. He is overjoyed to find even the smallest display of mind — whether in a tiny creature or in creative writing.",
      },
    ],
    wordMeanings: [
      { word: "Speck", meaning: "A tiny spot or fleck" },
      { word: "Idly", meaning: "Lazily, without purpose" },
      { word: "Poised", meaning: "Held suspended, balanced" },
      { word: "Mite", meaning: "A very small insect or arachnid" },
      { word: "Inclinations", meaning: "Natural tendencies or preferences" },
      { word: "Manuscript", meaning: "A handwritten document or text" },
      { word: "Loathing", meaning: "Intense dislike or disgust" },
      { word: "Cunning", meaning: "Skillful aptitude, craftiness" },
      { word: "Crept", meaning: "Moved stealthily and carefully" },
      { word: "Faltered", meaning: "Hesitated, wavered" },
      { word: "Cower", meaning: "Crouch down in fear or submission" },
      { word: "Accorded", meaning: "Allowed, granted" },
      { word: "Tenderer-than-thou", meaning: "Excessively gentle or sentimental" },
      { word: "Collectivistic", meaning: "Focused on group control rather than individualism" },
      { word: "Regimenting", meaning: "Strictly controlling according to rules" },
      { word: "Microscopic", meaning: "Extremely tiny; visible only by microscope" },
      { word: "Guise", meaning: "Form, manifestation" },
    ],
    literaryDevices: [
      {
        device: "Oxymoron",
        example: "A Considerable Speck",
        explanation: "The title itself is an oxymoron — a 'speck' is tiny and insignificant, while 'considerable' means large or important. This contrast highlights the poem's theme that even the smallest being can be significant.",
      },
      {
        device: "Personification",
        example: "It paused as with suspicion of my pen",
        explanation: "The mite is given human qualities of suspicion, intelligence, and decision-making, emphasising the poet's recognition of 'mind' in even the smallest creature.",
      },
      {
        device: "Alliteration",
        example: "with cunning crept",
        explanation: "The repetition of the 'c' sound emphasises the mite's careful, stealthy movement as it tries to survive.",
      },
      {
        device: "Irony",
        example: "I have none of the tenderer-than-thou / Collectivistic regimenting love",
        explanation: "The poet ironically claims he doesn't have sentimental love for all creatures, yet his careful observation and mercy toward the mite show deep compassion and respect for life.",
      },
      {
        device: "Satire",
        example: "Collectivistic regimenting love / With which the modern world is being swept",
        explanation: "Frost satirises the collectivist ideology that values the group over the individual, arguing that indiscriminate love without recognising individual mind is hollow.",
      },
    ],
    questions: [
      {
        question: "How did the poet first notice the speck? Why was it visible?",
        answer: "The poet noticed a tiny speck moving across the paper he was writing on. It was so small it would have been invisible anywhere else — it was only visible because of the high contrast between the tiny dark speck and the stark white paper sheet.",
      },
      {
        question: "What made the poet realise the speck was a living mite?",
        answer: "Something 'strange' about the way the speck moved made the poet think more carefully. He noticed it moved with self-directed purpose — it had 'inclinations it could call its own.' It wasn't random dust blown by his breath but a living creature moving deliberately.",
      },
      {
        question: "How did the mite show intelligence?",
        answer: "The mite showed intelligence in several ways: (1) It paused with 'suspicion' of the poet's pen — awareness of threats. (2) It drank/smelt the wet ink and recoiled with loathing — showing preferences. (3) It ran with terror AND 'cunning crept' — combining panic with strategic movement. (4) It hesitated and deliberated before cowering in surrender — showing decision-making ability.",
      },
      {
        question: "Why did the poet decide to spare the mite?",
        answer: "The poet spared the mite NOT out of sentimental, indiscriminate love (which he criticises), but because: (1) The mite had done no harm ('nothing I knew evil of'). (2) It displayed intelligence and a mind of its own. (3) The poet values and recognises 'mind' wherever he encounters it, and the mite's display of mind made it worthy of being spared.",
      },
      {
        question: "What does 'collectivistic regimenting love' mean? Why does Frost criticise it?",
        answer: "'Collectivistic regimenting love' refers to an indiscriminate, imposed group-love that values the collective over the individual. Frost criticises it because it fails to recognise individual intelligence and mind. He values individual thinking, imagination, and creativity — he believes a creature with real intelligence (like the mite) is more deserving of consideration than empty collective sentiment.",
      },
      {
        question: "Explain the significance of the last four lines of the poem.",
        answer: "The last lines — 'I have a mind myself and recognize / Mind when I meet with it in any guise / No one can know how glad I am to find / On any sheet the least display of mind' — convey the central theme. The poet values intelligence and individual thinking above all. He can recognise 'mind' in any form — whether a tiny mite or creative writing. The phrase 'on any sheet' has a double meaning: the paper with the mite AND written pages, suggesting he values intelligent thought everywhere.",
      },
      {
        question: "Why is the title 'A Considerable Speck' an oxymoron? What is its significance?",
        answer: "It is an oxymoron because 'speck' means something tiny and insignificant, while 'considerable' means large or worthy of attention. The title's significance is that even the smallest, most overlooked entity (like a mite) can be 'considerable' when it displays intelligence and a will to live. It challenges us to recognise the importance of mind in any form.",
      },
      {
        question: "What is the central theme of the poem?",
        answer: "The central theme is the importance and value of individual mind, intelligence, and creativity. The poet uses the encounter with a tiny mite to argue that any display of mind — no matter how small — deserves recognition and respect. He contrasts this with collectivist thinking that ignores individual intelligence. The poem celebrates the ability to think independently.",
      },
    ],
    mcqs: [
      {
        id: "poem-mcq-13",
        question: "Which of the following options contains the same literary device (visual imagery) that appears in:\n\"…On any but a paper sheet so white…\"",
        options: [
          "Silver and blue as the mountain mist.",
          "He names the sky his own.",
          "The fir trees dark and high.",
          "Song and mother-croon of bird.",
        ],
        correctIndex: 2,
        explanation: "The original line uses visual imagery (whiteness of the paper). 'The fir trees dark and high' also creates a visual image through colour and size.",
      },
      {
        id: "poem-mcq-14",
        question: "Choose the option that lists the sequence of events in the correct order.\n(i) He changes his mind when he notices something unusual.\n(ii) The poet realises the speck is a living mite.\n(iii) He intends to use his pen to erase the speck.\n(iv) The poet notices a speck on the white paper.",
        options: [
          "(i), (ii), (iii), (iv)",
          "(iv), (ii), (iii), (i)",
          "(ii), (iii), (iv), (i)",
          "(iv), (iii), (i), (ii)",
        ],
        correctIndex: 3,
        explanation: "First the poet notices the speck (iv), then considers erasing it (iii), changes his mind upon noticing movement (i), and finally realises it's a living mite (ii).",
      },
      {
        id: "poem-mcq-15",
        question: "Select the correct relationship between the two statements:\nStatement I: The poet concludes that the mite proves to be an intelligent creature.\nStatement II: The mite seems to dislike the ink as it quickly whirls around to fly away.",
        options: [
          "Statement II is the cause for Statement I.",
          "Statement II is true, and Statement I is false.",
          "Statement I and Statement II are independent of each other.",
          "Statement I is true, and Statement II is false.",
        ],
        correctIndex: 0,
        explanation: "The mite's ability to dislike ink and choose to avoid it (Statement II) is evidence of intelligence, which causes the poet to conclude it's intelligent (Statement I).",
      },
      {
        id: "poem-mcq-16",
        question: "What is the central idea in Frost's poem A Considerable Speck?",
        options: [
          "The poet critiques society's disregard for smaller aspects of life.",
          "Every living being, no matter how small, has its own perspective and intelligence.",
          "The struggle between man-made creations and the natural world.",
          "The insignificance of individual thoughts in the grand scheme of the universe.",
        ],
        correctIndex: 1,
        explanation: "The poem celebrates the idea that every living being — even one almost too small to see — possesses its own intelligence and perspective worthy of respect.",
      },
    ],
  },

  // ─── 5. When Great Trees Fall ──────────────────────────────────────────────
  {
    id: "when-great-trees-fall",
    title: "When Great Trees Fall",
    poet: "Maya Angelou",
    summary:
      "The poem uses an extended metaphor of great trees falling to describe the impact of losing great souls. When great trees fall, rocks shudder, lions hunker down, and elephants lumber to safety — symbolising how everyone, great and small, is shaken. When great souls die, the air becomes 'light, rare, sterile,' and we struggle to breathe. Our memories sharpen painfully, gnawing on kind words unsaid and promised walks never taken. Our souls shrink without their nurturing presence, and our minds 'fall away,' leaving us in a state of dark, cave-like ignorance. Yet slowly, 'peace blooms' — irregularly but surely. Spaces fill with a soothing vibration, our senses are restored (though changed), and we are inspired: 'They existed. They existed. We can be. Be and be better. For they existed.'",
    themes: [
      "Grief and loss",
      "Impact of great people's deaths",
      "Memory and regret",
      "Healing and acceptance",
      "Legacy and inspiration",
    ],
    stanzas: [
      {
        lines:
          "When great trees fall,\nrocks on distant hills shudder,\nlions hunker down\nin tall grasses,\nand even elephants\nlumber after safety.",
        explanation:
          "An extended metaphor: the death of a great person is compared to a giant tree falling. Even distant rocks shudder, powerful lions hide in fear, and elephants rush to safety — symbolising how everyone, strong and weak, is shaken by the loss.",
      },
      {
        lines:
          "When great trees fall\nin forests,\nsmall things recoil into silence,\ntheir senses\neroded beyond fear.",
        explanation:
          "Small creatures become utterly silent and still, overwhelmed beyond even the ability to feel fear. This powerfully conveys the absolute, stunning nature of the loss — everything is shocked into silence.",
      },
      {
        lines:
          "When great souls die,\nthe air around us becomes\nlight, rare, sterile.",
        explanation:
          "Transitioning from metaphor to reality — when great people die, the air feels drained of spirit, no longer rich and vibrant but 'sterile.' This evokes the isolation and emptiness of grief.",
      },
      {
        lines:
          "We breathe, briefly.\nOur eyes, briefly,\nsee with\na hurtful clarity.",
        explanation:
          "The word 'briefly' suggests the difficulty of getting through each moment. Breathing feels laboured and vision is painfully clear — capturing the feeling of barely being able to function in immediate grief.",
      },
      {
        lines:
          "Our memory, suddenly sharpened,\nexamines,\ngnaws on kind words\nunsaid,\npromised walks\nnever taken.",
        explanation:
          "Grief sharpens memory, leading to agonising nostalgia. We fixate on missed opportunities — kind words we never uttered, walks we never took. The pain of 'what-ifs' and regrets gnaws at us.",
      },
      {
        lines:
          "Great souls die and\nour reality, bound to\nthem, takes leave of us.",
        explanation:
          "When central figures in our lives die, our very sense of reality — which was tethered to them — disappears. We feel unmoored and cast adrift in their absence.",
      },
      {
        lines:
          "Our souls,\ndependent upon their\nnurture,\nnow shrink, wizened.",
        explanation:
          "Our souls, which were sustained by their spiritual nourishment and care, become diminished and withered (wizened) without them — shrinking into weaker versions of ourselves.",
      },
      {
        lines:
          "Our minds, formed\nand informed by their\nradiance,\nfall away.",
        explanation:
          "Our ways of thinking, shaped and developed under their radiant influence, now feel diminished and unable to sustain themselves. Our minds lose their light without their inspiring presence.",
      },
      {
        lines:
          "We are not so much maddened\nas reduced to the unutterable ignorance\nof dark, cold\ncaves.",
        explanation:
          "More than driving us mad, the loss leaves us in a state of inexpressible, primordial ignorance — like creatures condemned to dark caves. This powerfully conveys total disorientation and despair.",
      },
      {
        lines:
          "And when great souls die,\nafter a period peace blooms,\nslowly and always\nirregularly.",
        explanation:
          "With the beautiful phrase 'peace blooms,' healing gradually emerges after the initial anguish. But the process is always slow and nonlinear — it doesn't follow a predictable pattern.",
      },
      {
        lines:
          "Spaces fill\nwith a kind of\nsoothing electric vibration.",
        explanation:
          "The void left behind begins to fill with an uplifting spirit — a comforting electricity and vibration, as if the person's enduring energy still resonates and comforts us.",
      },
      {
        lines:
          "Our senses, restored, never\nto be the same, whisper to us.",
        explanation:
          "Our senses gradually recover but are forever changed — made more alert and sensitive by the experience of loss. They now whisper to us, more receptive than before.",
      },
      {
        lines:
          "They existed. They existed.\nWe can be. Be and be\nbetter. For they existed.",
        explanation:
          "The simple repetition 'they existed' powerfully overcomes the finality of death. Their existence proves we can also exist — and more importantly, we can be BETTER because of their influence. Their legacy inspires us to live fuller lives.",
      },
    ],
    wordMeanings: [
      { word: "Shudder", meaning: "Tremble, quiver" },
      { word: "Hunker", meaning: "Crouch or squat down" },
      { word: "Lumber", meaning: "Move in a slow, heavy, awkward way" },
      { word: "Recoil", meaning: "Draw back in fear or pain" },
      { word: "Eroded", meaning: "Gradually destroyed or worn away" },
      { word: "Sterile", meaning: "Unable to sustain life; barren" },
      { word: "Hurtful clarity", meaning: "A painfully clear understanding of the loss" },
      { word: "Gnaws", meaning: "Bites or chews persistently; here, agonises" },
      { word: "Wizened", meaning: "Shrivelled, withered" },
      { word: "Radiance", meaning: "Brilliance, luminosity" },
      { word: "Unutterable", meaning: "Inexpressible, unspeakable" },
      { word: "Blooms", meaning: "Flourishes, thrives" },
      { word: "Irregularly", meaning: "Sporadically, inconsistently" },
      { word: "Vibration", meaning: "Quiver, oscillation; here, a comforting resonance" },
      { word: "Restored", meaning: "Renewed, rejuvenated" },
    ],
    literaryDevices: [
      {
        device: "Extended Metaphor",
        example: "When great trees fall, rocks on distant hills shudder...",
        explanation: "The entire opening compares the death of great people to the falling of great trees, with all of nature reacting — this extended metaphor runs through the whole poem.",
      },
      {
        device: "Personification",
        example: "Our memory, suddenly sharpened, examines, gnaws on kind words unsaid",
        explanation: "Memory is personified as something that actively examines and 'gnaws' — like an animal chewing persistently — conveying how grief makes memories painfully vivid and intrusive.",
      },
      {
        device: "Imagery",
        example: "the air around us becomes light, rare, sterile",
        explanation: "Vivid sensory imagery that makes grief tangible — the air itself changes quality after a great loss, becoming thin, empty, and lifeless.",
      },
      {
        device: "Repetition",
        example: "They existed. They existed. We can be. Be and be better.",
        explanation: "The repetition of 'they existed' and 'be' creates emotional emphasis, transforming grief into affirmation and inspiration. It becomes a chant of remembrance and hope.",
      },
      {
        device: "Alliteration",
        example: "We can be. Be and be better",
        explanation: "The repeated 'b' sounds create a rhythmic, affirming quality that reinforces the message of hope and growth through loss.",
      },
      {
        device: "Metaphor",
        example: "reduced to the unutterable ignorance of dark, cold caves",
        explanation: "Compares the state of grief to being trapped in dark, cold caves — a place of primordial ignorance and isolation, conveying complete disorientation after loss.",
      },
    ],
    questions: [
      {
        question: "What does the 'falling of great trees' symbolise in the poem?",
        answer: "The falling of great trees symbolises the death of great, influential people — beloved leaders, mentors, or loved ones whose presence shaped the world around them. Just as a great tree falling shakes the entire forest, the death of a great soul sends shockwaves through the lives of everyone connected to them.",
      },
      {
        question: "How does the poet describe the immediate impact of a great soul's death?",
        answer: "The immediate impact is described as: the air becomes 'light, rare, sterile' — drained of spirit. Breathing feels laboured ('We breathe, briefly'). Our eyes see with 'hurtful clarity' — a painfully clear awareness of what we've lost. Memory sharpens and gnaws on regrets — kind words unsaid and promised walks never taken.",
      },
      {
        question: "What happens to our souls and minds when great souls die?",
        answer: "Our souls, which were 'dependent upon their nurture,' shrink and become 'wizened' (shrivelled/withered) without their nourishment. Our minds, 'formed and informed by their radiance,' fall away — losing the inspiration and guidance that shaped our thinking. We are reduced to 'the unutterable ignorance of dark, cold caves.'",
      },
      {
        question: "How does healing come after the loss?",
        answer: "Healing comes slowly and 'always irregularly' — it's not linear or predictable. Gradually, 'peace blooms' and spaces fill with a 'soothing electric vibration' — the enduring energy of the departed. Our senses are restored, though 'never to be the same.' Finally, we are inspired by the simple truth: 'They existed. We can be. Be and be better.'",
      },
      {
        question: "Explain the significance of the last three lines of the poem.",
        answer: "The final lines — 'They existed. They existed. / We can be. Be and be / better. For they existed.' — transform grief into inspiration. The repetition of 'they existed' affirms their lasting impact despite death. 'We can be. Be and be better' shows that their memory empowers us to live more fully and meaningfully. Their legacy is not just sadness but motivation to grow.",
      },
      {
        question: "What analogy does Angelou use? Why is it appropriate?",
        answer: "Angelou uses the analogy of great trees falling in forests. It is appropriate because: (1) When a great tree falls, it has widespread repercussions — rocks shudder, animals flee — just as a great person's death affects everyone. (2) It impacts both large and small creatures, just as loss affects people of all kinds. (3) Trees are strong, enduring, and provide shelter — just like great people nurture those around them.",
      },
      {
        question: "What stages of grief does the poem describe?",
        answer: "The poem describes: (1) Shock — rocks shudder, creatures recoil into silence. (2) Painful realization — air becomes sterile, hurtful clarity, sharpened memory. (3) Regret — gnawing on unsaid words and untaken walks. (4) Diminishment/Despair — souls shrink, minds fall away, reduced to dark caves. (5) Gradual healing — peace blooms slowly. (6) Acceptance and inspiration — 'They existed. We can be. Be and be better.'",
      },
      {
        question: "What is the overall tone and message of the poem?",
        answer: "The poem moves from grief and despair to hope and inspiration. While it honestly portrays the devastating impact of losing great people — the pain, regret, and disorientation — it ultimately delivers a realistic and positive message: loss can connect us more profoundly to life. The departed's legacy inspires us to live better. The poem argues that while death fells great trees, new growth inevitably follows.",
      },
    ],
    mcqs: [
      {
        id: "poem-mcq-9",
        question: "Which of the following is NOT a characteristic of a 'great soul'?",
        options: ["nurtures", "shrinks", "radiant", "informs"],
        correctIndex: 1,
        explanation: "'Shrinks' is what happens to our souls AFTER a great soul dies ('our souls... now shrink, wizened'). The great soul's characteristics are nurturing, radiating, and informing.",
      },
      {
        id: "poem-mcq-10",
        question: "Select the correct relationship between the two statements:\nStatement I: The falling of a great tree shocks both big and small creatures.\nStatement II: The death of a great person maddens their loved ones.",
        options: [
          "Statement I is true, Statement II is false.",
          "Statement I is false, and Statement II is true.",
          "Statement I is an analogy for Statement II.",
          "Statement I is the reason for Statement II.",
        ],
        correctIndex: 0,
        explanation: "Statement I is true — the poem describes rocks shuddering, lions crouching, etc. Statement II is false — the poem says 'We are not so much maddened as reduced to... ignorance.'",
      },
      {
        id: "poem-mcq-11",
        question: "The five stages of grief are shock, anger, bargaining, depression and acceptance. Which stage is expressed in these lines?\n\"And when great souls die, after a period peace blooms,\"",
        options: ["shock", "anger", "depression", "acceptance"],
        correctIndex: 3,
        explanation: "'Peace blooms' after the period of grief represents acceptance — the final stage where one comes to terms with the loss and finds peace.",
      },
      {
        id: "poem-mcq-12",
        question: "The central idea of Angelou's poem When Great Trees Fall is that _________.",
        options: [
          "when a gigantic tree falls, it affects all the trees in the jungle",
          "the death of an ancient tree disturbs all the animals in the jungle",
          "the impact of the death of a loved one on those struggling to cope with the loss",
          "life will never be the same after the loss of a loved one",
        ],
        correctIndex: 2,
        explanation: "The poem's central idea is the profound impact of losing a great soul on those left behind — their struggle through grief, and eventual healing through the departed's legacy.",
      },
    ],
  },
];
