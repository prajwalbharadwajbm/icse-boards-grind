export interface ProsePassage {
  extract: string;
  explanation: string;
}

export interface ProseWordMeaning {
  word: string;
  meaning: string;
}

export interface LiteraryDevice {
  device: string;
  example: string;
  explanation: string;
}

export interface ProseQA {
  question: string;
  answer: string;
}

export interface ProseMCQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ProseData {
  id: string;
  title: string;
  author: string;
  summary: string;
  themes: string[];
  passages: ProsePassage[];
  wordMeanings: ProseWordMeaning[];
  literaryDevices: LiteraryDevice[];
  questions: ProseQA[];
  mcqs: ProseMCQ[];
}

export const PROSE_DATA: ProseData[] = [
  // ─── 1. The Elevator ─────────────────────────────────────────────────────
  {
    id: "the-elevator",
    title: "The Elevator",
    author: "William Sleator",
    summary:
      "Martin, a short, skinny twelve-year-old boy, lives on the 17th floor of an old apartment building. He is terrified of the small, creaky, dimly-lit elevator that makes strange sounds and feels claustrophobic. He tries taking the stairs but gets exhausted climbing 17 flights and his father, who is tall and athletic, mocks him for being 'a wimp.' One day, a fat, pale woman with a staring, smiling face appears in the elevator. She never speaks, never presses a button, and seems to be waiting for him specifically. Her intense, unblinking gaze terrifies Martin. He tries various strategies to avoid her — taking stairs, varying his timing — but she keeps appearing unpredictably. His father refuses to believe him and calls him a coward. Finally, Martin's worst fear comes true: the elevator stops between floors and the light goes out, leaving him trapped alone with the woman in total darkness. She reaches out and touches his arm. The story ends on this cliffhanger, leaving readers to imagine what happens next.",
    themes: [
      "Fear and phobia",
      "Bullying and intimidation",
      "Helplessness and vulnerability",
      "Parent-child relationship",
      "Suspense and the unknown",
      "Courage and cowardice",
    ],
    passages: [
      {
        extract:
          "It was an old building with an old elevator — Loss narrow one, with a door that creaked and groaned. The lightbulb in the ceiling was dim. And Martin was afraid of it.",
        explanation:
          "This opening establishes the setting — an old, cramped, poorly-lit elevator in an aged apartment building. The personification of the door ('creaked and groaned') makes the elevator seem alive and threatening. Martin's fear is introduced right away, setting the tone for the story.",
      },
      {
        extract:
          "He was a small, thin boy for his age, and he was terrified of the elevator. His father, tall and broad, told him it was silly, told him to grow up and stop being a baby.",
        explanation:
          "The contrast between Martin and his father is established — Martin is small and thin while his father is tall and broad. His father's dismissive attitude ('silly,' 'grow up,' 'stop being a baby') shows a lack of empathy and understanding. This adds to Martin's helplessness since the one person who should protect him belittles his fears.",
      },
      {
        extract:
          "She was fat. She was so fat that she nearly filled the tiny elevator. Her cotton dress, printed with large red flowers, could not hide the rolls of fat around her middle. Her pale, doughy face seemed to fill the rest of the space.",
        explanation:
          "The mysterious woman is described in vivid, unsettling detail. Her physical size fills the already claustrophobic elevator, making it feel even more confining. The description of her face as 'pale, doughy' creates an eerie, almost inhuman quality. Her presence intensifies Martin's fears about the elevator.",
      },
      {
        extract:
          "She didn't press any button. She didn't speak. She just stood there, her arms folded across her chest, smiling at him, filling the elevator with her enormous body.",
        explanation:
          "The woman's behaviour is deeply unsettling — she doesn't press a button (suggesting she has no floor to go to), doesn't speak, and simply smiles and stares. This silence and inaction make her seem predatory, as if she is in the elevator solely because of Martin. Her folded arms suggest patience and confidence.",
      },
      {
        extract:
          "Martin couldn't take the stairs. He had tried that once, after the first time he had seen the fat lady. But seventeen floors were too many. He was exhausted by the time he got to his apartment.",
        explanation:
          "This passage shows Martin trapped between two fears — the elevator with the mysterious woman and the impossibility of climbing 17 flights of stairs. The physical exhaustion of the stairs makes avoidance impractical, forcing him to confront his fear repeatedly.",
      },
      {
        extract:
          "And then one day the elevator stopped. It stopped between floors. The light went out. And the fat lady pressed the stop button.",
        explanation:
          "The climax of the story — Martin's worst nightmare comes true. The elevator stops between floors (trapped), the light goes out (darkness), and the woman deliberately presses the stop button (she is in control, not random chance). Every element of his fear converges in this moment.",
      },
      {
        extract:
          "In the darkness he could hear her breathing, and he could smell her perfume, and then she reached over and touched his arm.",
        explanation:
          "The story ends on a terrifying cliffhanger. In complete darkness, Martin's senses heighten — he hears her breathing and smells her perfume. The final detail — 'she reached over and touched his arm' — is the moment of contact Martin has been dreading. The open ending forces readers to imagine what happens next.",
      },
    ],
    wordMeanings: [
      { word: "Creaked", meaning: "Made a harsh, squeaking sound" },
      { word: "Groaned", meaning: "Made a deep, strained sound" },
      { word: "Dimly", meaning: "With very little light; faintly" },
      { word: "Claustrophobic", meaning: "Suffering from fear of enclosed spaces" },
      { word: "Wimp", meaning: "A weak or cowardly person" },
      { word: "Doughy", meaning: "Soft, pale, and unhealthy looking (like dough)" },
      { word: "Enormous", meaning: "Extremely large; huge" },
      { word: "Exhausted", meaning: "Extremely tired; completely drained of energy" },
      { word: "Precisely", meaning: "Exactly; at the exact time" },
      { word: "Reluctantly", meaning: "Unwillingly; with hesitation" },
      { word: "Humiliation", meaning: "Feeling of shame or embarrassment" },
      { word: "Deliberately", meaning: "Intentionally; on purpose" },
      { word: "Inevitable", meaning: "Certain to happen; unavoidable" },
      { word: "Petrified", meaning: "Extremely frightened; paralysed with fear" },
    ],
    literaryDevices: [
      {
        device: "Personification",
        example: "a door that creaked and groaned",
        explanation: "The elevator door is given human qualities of creaking and groaning, making it seem alive and hostile, reflecting Martin's fear.",
      },
      {
        device: "Imagery",
        example: "Her pale, doughy face seemed to fill the rest of the space",
        explanation: "Vivid visual imagery creates an unsettling picture of the fat woman's face — pale, soft, and filling the confined space, adding to the claustrophobic atmosphere.",
      },
      {
        device: "Suspense",
        example: "The elevator stopped between floors. The light went out.",
        explanation: "Short, declarative sentences build tension and suspense. Each sentence escalates the danger — stopped, then darkness — creating a sense of impending doom.",
      },
      {
        device: "Contrast",
        example: "He was a small, thin boy... His father, tall and broad",
        explanation: "The contrast between Martin's small frame and his father's large build emphasises Martin's vulnerability and his father's inability to understand his son's fears.",
      },
      {
        device: "Foreshadowing",
        example: "She didn't press any button",
        explanation: "The woman's behaviour foreshadows her sinister intentions — not pressing a button suggests she has no destination and is there specifically for Martin.",
      },
      {
        device: "Cliffhanger",
        example: "and then she reached over and touched his arm",
        explanation: "The story ends abruptly at the moment of maximum tension, leaving the reader to imagine the outcome — a classic cliffhanger ending.",
      },
    ],
    questions: [
      {
        question: "Why was Martin afraid of the elevator?",
        answer: "Martin was afraid of the elevator because it was old, narrow, and cramped with a creaking door and dim lighting. He felt claustrophobic in the tiny space. The elevator made strange sounds and felt unreliable. His fear worsened dramatically when the mysterious fat woman started appearing in it, staring and smiling at him without speaking.",
      },
      {
        question: "Describe the mysterious fat woman. Why is she frightening?",
        answer: "The woman was extremely fat, nearly filling the tiny elevator. She had a pale, doughy face, wore a cotton dress with large red flowers, and had rolls of fat. She was frightening because: (1) She never pressed any button — suggesting she had no destination. (2) She never spoke. (3) She just stood smiling and staring at Martin with folded arms. (4) She seemed to appear unpredictably, as if waiting specifically for him.",
      },
      {
        question: "How does Martin's father react to his fears? What does this reveal?",
        answer: "Martin's father dismisses his fears completely. He calls Martin 'silly,' tells him to 'grow up' and 'stop being a baby,' and later calls him 'a wimp.' This reveals that the father is insensitive and unsympathetic. He values toughness over empathy and cannot understand his son's genuine terror. His dismissal leaves Martin utterly alone with his fears, with no one to turn to for help.",
      },
      {
        question: "Why couldn't Martin simply avoid the elevator by taking the stairs?",
        answer: "Martin lived on the 17th floor of the building. He tried taking the stairs once but was completely exhausted by the time he reached his apartment. Climbing 17 flights was physically impossible for a small, thin twelve-year-old on a daily basis. He was trapped between the impossible stairs and the terrifying elevator.",
      },
      {
        question: "Describe the climax of the story. Why is it effective?",
        answer: "The climax occurs when the elevator stops between floors, the light goes out, and the fat woman deliberately presses the stop button. Martin is trapped in total darkness with the woman. He can hear her breathing and smell her perfume. Then she reaches out and touches his arm. It is effective because: (1) Every element of Martin's fear converges — enclosed space, darkness, the woman. (2) The woman's deliberate action (pressing stop) confirms she is not random. (3) The story ends on this cliffhanger, leaving the outcome to the reader's imagination.",
      },
      {
        question: "What is the significance of the story's open ending?",
        answer: "The open-ended cliffhanger is significant because it leaves the reader's imagination to fill in the horror. By not telling us what the woman does to Martin, the author creates fear of the unknown — which is often more terrifying than any explicit event. It also mirrors Martin's own experience of dreading the unknown. The ending forces readers to engage personally with the fear.",
      },
      {
        question: "What are the main themes of the story?",
        answer: "The main themes are: (1) Fear and phobia — Martin's genuine claustrophobia and fear of the unknown. (2) Bullying/Intimidation — both the fat woman's silent intimidation and the father's verbal bullying. (3) Helplessness — Martin cannot escape (stairs are too many, father won't listen). (4) Parent-child disconnect — the father's lack of understanding isolates Martin. (5) Suspense — the story builds dread through uncertainty and the unknown.",
      },
      {
        question: "How does William Sleator build suspense in the story?",
        answer: "Sleator builds suspense through: (1) Gradual escalation — the woman appears more frequently. (2) Sensory details — creaking doors, dim lights, perfume smells. (3) Short sentences at key moments — 'The elevator stopped. The light went out.' (4) The woman's silence and staring — more unnerving than if she spoke. (5) The confined setting of the tiny elevator. (6) Martin's isolation — no one believes him. (7) The cliffhanger ending that leaves the worst to imagination.",
      },
    ],
    mcqs: [
      {
        id: "prose-mcq-1",
        question: "Why did Martin prefer the stairs despite living on the 17th floor?",
        options: [
          "He wanted to exercise",
          "He was afraid of the elevator",
          "The elevator was out of order",
          "His father told him to use the stairs",
        ],
        correctIndex: 1,
        explanation: "Martin tried the stairs because he was terrified of the elevator, especially after encountering the mysterious fat woman. However, 17 floors proved too exhausting.",
      },
      {
        id: "prose-mcq-2",
        question: "What was most unsettling about the fat woman's behaviour in the elevator?",
        options: [
          "She talked too much",
          "She pressed all the buttons",
          "She never spoke and never pressed any button",
          "She blocked the elevator door",
        ],
        correctIndex: 2,
        explanation: "The woman's silence and failure to press any button were the most unsettling aspects — suggesting she had no destination and was in the elevator solely because of Martin.",
      },
      {
        id: "prose-mcq-3",
        question: "What does Martin's father call him for being afraid of the elevator?",
        options: [
          "A coward",
          "A wimp",
          "A fool",
          "A child",
        ],
        correctIndex: 1,
        explanation: "Martin's father calls him 'a wimp,' dismissing his genuine fears and showing a lack of empathy for his son's terror.",
      },
      {
        id: "prose-mcq-4",
        question: "What happens at the climax of 'The Elevator'?",
        options: [
          "Martin escapes through the emergency exit",
          "The father comes to rescue Martin",
          "The elevator stops between floors and the light goes out",
          "The fat woman finally speaks to Martin",
        ],
        correctIndex: 2,
        explanation: "At the climax, the elevator stops between floors, the light goes out, and the fat woman presses the stop button — trapping Martin in darkness with her.",
      },
      {
        id: "prose-mcq-5",
        question: "The literary device used in 'a door that creaked and groaned' is:",
        options: [
          "Simile",
          "Metaphor",
          "Personification",
          "Hyperbole",
        ],
        correctIndex: 2,
        explanation: "This is personification — the door is given human qualities of creaking and groaning, making it seem alive and hostile.",
      },
      {
        id: "prose-mcq-6",
        question: "Which word best describes the atmosphere of the story?",
        options: [
          "Humorous",
          "Claustrophobic and suspenseful",
          "Romantic",
          "Adventurous",
        ],
        correctIndex: 1,
        explanation: "The story creates a claustrophobic and suspenseful atmosphere through the confined elevator setting, Martin's fears, and the mysterious woman's presence.",
      },
      {
        id: "prose-mcq-7",
        question: "The story ends with:",
        options: [
          "Martin finally confronting the woman",
          "The woman touching Martin's arm in the dark",
          "Martin's father saving him",
          "The elevator crashing",
        ],
        correctIndex: 1,
        explanation: "The story ends on a cliffhanger — in the dark, stopped elevator, the woman reaches over and touches Martin's arm, leaving the reader to imagine what happens next.",
      },
      {
        id: "prose-mcq-8",
        question: "Martin's father's attitude towards his son's fears can best be described as:",
        options: [
          "Sympathetic and understanding",
          "Dismissive and insensitive",
          "Concerned and protective",
          "Indifferent and absent",
        ],
        correctIndex: 1,
        explanation: "The father is dismissive and insensitive — he calls Martin a wimp, tells him to stop being a baby, and never takes his fears seriously.",
      },
    ],
  },

  // ─── 2. The Girl Who Can ─────────────────────────────────────────────────
  {
    id: "the-girl-who-can",
    title: "The Girl Who Can",
    author: "Ama Ata Aidoo",
    summary:
      "The story is narrated by a seven-year-old Ghanaian girl named Adjua. She lives with her mother and her grandmother, Nana. The central conflict revolves around Nana's obsession with Adjua's thin legs. Nana constantly worries that Adjua's legs are too thin to carry a child or even to carry herself properly — reflecting traditional values where a woman's worth is measured by her ability to bear children. Adjua's mother silently disagrees but rarely confronts Nana. Adjua is confused by her grandmother's fixation on legs and childbearing. However, everything changes when Adjua wins a race at her school's inter-school athletics competition. Nana, who had always criticised the thin legs, suddenly becomes proud and boasts to everyone about her granddaughter's victory. She declares that she always knew Adjua's legs were perfect — for running. The story humorously highlights the shift from traditional to modern values, showing that a girl's worth isn't just in childbearing but in her individual talents and achievements.",
    themes: [
      "Traditional vs. modern values",
      "Women's empowerment and identity",
      "Generation gap",
      "A child's perspective on adult concerns",
      "Physical appearance and self-worth",
      "Pride and changing attitudes",
    ],
    passages: [
      {
        extract:
          "Any kind of legs would have done. But these? … These are just sticks. How will she ever carry a pregnancy?",
        explanation:
          "Nana expresses her primary concern — Adjua's thin legs won't support a pregnancy. This reveals the traditional mindset where a woman's physical worth is measured by her ability to bear children. The dismissive 'just sticks' shows how harshly she judges her granddaughter's body.",
      },
      {
        extract:
          "I have always wanted to ask somebody the meaning of that. They always talk about legs. 'She has good legs.' What does that mean?",
        explanation:
          "Adjua's innocent confusion about adult conversations about legs and childbearing highlights the child narrator's perspective. She doesn't understand the cultural significance adults attach to women's bodies. This naivety provides both humour and a critique of these traditional values.",
      },
      {
        extract:
          "My mother doesn't say anything. She just looks at my legs and shakes her head. I know she doesn't agree with Nana, but she doesn't want to argue.",
        explanation:
          "The mother's silence represents the younger generation's quiet disagreement with traditional values. She doesn't share Nana's obsession but respects her elder too much to argue openly. This silent resistance shows the gradual shift in attitudes between generations.",
      },
      {
        extract:
          "Then Nana said, 'Hmm, as for Adjua, I always said she has fine legs. She can run!'",
        explanation:
          "After Adjua wins the race, Nana completely reverses her position. She claims she 'always said' Adjua has fine legs — a humorous contradiction of her earlier criticism. She now frames the thin legs as perfect for running rather than inadequate for childbearing, showing how pride in achievement can change traditional perspectives.",
      },
      {
        extract:
          "Nana was so pleased. She told everybody who came to the house. She told the people at the market. She even told the pastor after church on Sunday.",
        explanation:
          "Nana's pride after the race victory is overwhelming — she tells everyone she can. This shows how achievement (even one that doesn't fit traditional expectations) can transform a critical person into a proud supporter. The humour lies in how completely and quickly her attitude changes.",
      },
      {
        extract:
          "I don't know what is wrong with my legs. Nana says they are too thin. But I can run. I can run very fast.",
        explanation:
          "Adjua's simple declaration captures the story's message — she doesn't understand the adult preoccupation with her legs' appearance, but she knows what they can do. Her confidence in her ability contrasts with Nana's criticism and represents the modern view that a person's worth lies in what they can achieve, not how they look.",
      },
    ],
    wordMeanings: [
      { word: "Sticks", meaning: "Very thin legs (used disparagingly)" },
      { word: "Carry a pregnancy", meaning: "Bear a child; sustain the physical demands of pregnancy" },
      { word: "Fine legs", meaning: "Good, suitable legs" },
      { word: "Inter-school", meaning: "Between different schools; a competition involving multiple schools" },
      { word: "Athletics", meaning: "Sports involving physical activities like running, jumping" },
      { word: "Pastor", meaning: "A religious leader, especially in a Christian church" },
      { word: "Generation gap", meaning: "Difference in opinions and values between older and younger people" },
      { word: "Perspective", meaning: "A particular way of viewing things; point of view" },
      { word: "Traditional", meaning: "Following customs and beliefs passed down through generations" },
      { word: "Boast", meaning: "Talk with excessive pride about one's achievements" },
    ],
    literaryDevices: [
      {
        device: "First-person narration (Child narrator)",
        example: "I have always wanted to ask somebody the meaning of that",
        explanation: "The story is told through 7-year-old Adjua's eyes, providing an innocent, unfiltered perspective on adult concerns. This makes the cultural critique humorous rather than preachy.",
      },
      {
        device: "Irony",
        example: "Nana said, 'I always said she has fine legs'",
        explanation: "The dramatic irony is that Nana had always criticised Adjua's legs as 'sticks.' Her claim that she 'always said' they were fine is a humorous reversal that exposes how easily pride can rewrite memory.",
      },
      {
        device: "Symbolism",
        example: "Adjua's legs",
        explanation: "Adjua's thin legs symbolise the conflict between traditional and modern values. To Nana, they represent inadequacy (can't bear children). To the modern world, they represent ability (can win races).",
      },
      {
        device: "Humour",
        example: "She told everybody who came to the house. She told the people at the market. She even told the pastor",
        explanation: "The repetitive listing of everyone Nana tells creates humour through exaggeration — her pride is so overwhelming she can't stop sharing the news, despite her earlier criticism.",
      },
      {
        device: "Contrast",
        example: "Nana's criticism vs. Nana's praise",
        explanation: "The sharp contrast between Nana's harsh criticism of Adjua's legs before the race and her effusive praise afterward highlights the hypocrisy and the power of achievement to change perspectives.",
      },
    ],
    questions: [
      {
        question: "Why is Nana worried about Adjua's legs?",
        answer: "Nana is worried because Adjua's legs are very thin — she calls them 'sticks.' In her traditional mindset, a woman's legs need to be strong and sturdy to carry a pregnancy and bear children. Since she measures a woman's worth by her ability to have children, she sees Adjua's thin legs as a serious inadequacy.",
      },
      {
        question: "What does the story reveal about the generation gap?",
        answer: "The story reveals a clear generation gap: (1) Nana (grandmother) holds traditional values — a girl's worth is in childbearing. (2) The mother silently disagrees but doesn't argue — representing a transitional generation. (3) Adjua (child) is oblivious to these concerns and simply values what she can do (run fast). The three generations show progressive movement from traditional to modern values.",
      },
      {
        question: "How does Nana's attitude change after the race? What causes this change?",
        answer: "Before the race, Nana constantly criticised Adjua's thin legs, calling them 'sticks' and worrying they couldn't support a pregnancy. After Adjua wins the inter-school race, Nana completely reverses her position — she proudly tells everyone that she 'always said' Adjua has fine legs. The cause is pride in achievement — Adjua's victory gives Nana a new reason to boast, and she conveniently forgets her earlier criticism.",
      },
      {
        question: "What is the significance of the child narrator in this story?",
        answer: "The child narrator (Adjua, age 7) is significant because: (1) Her innocence provides an unbiased perspective on adult prejudices. (2) She doesn't understand the cultural significance of legs and childbearing, highlighting how absurd these adult concerns can be. (3) Her confusion ('What does that mean?') forces the reader to question these traditional values. (4) It adds humour — adult concerns seem silly through a child's eyes.",
      },
      {
        question: "What is the central message of the story?",
        answer: "The central message is that a girl's worth should not be measured by traditional standards like her ability to bear children. The story argues for modern values where a girl's individual talents, abilities, and achievements define her worth. Adjua's thin legs, condemned by tradition, prove to be an asset in athletics — showing that what matters is what you can do, not how you look or conform to outdated expectations.",
      },
      {
        question: "How does the mother's role in the story contribute to its theme?",
        answer: "The mother's role is crucial — she represents the silent middle ground between tradition and modernity. She doesn't agree with Nana's obsession with Adjua's legs (she 'shakes her head') but doesn't openly argue. This silence reflects how many women in traditional societies quietly disagree with oppressive norms but lack the power or willingness to challenge elders directly. Her silence makes Nana's views go unchallenged until Adjua's achievement speaks for itself.",
      },
      {
        question: "Why is the title 'The Girl Who Can' significant?",
        answer: "The title is significant because it defines Adjua by her ability rather than her appearance. Instead of being 'the girl with thin legs' (as Nana sees her), she becomes 'the girl who can' — the girl who can run, who can win, who can achieve. The title emphasises capability over physical attributes and represents the story's message of female empowerment through personal achievement.",
      },
    ],
    mcqs: [
      {
        id: "prose-mcq-9",
        question: "What is Nana's primary concern about Adjua?",
        options: [
          "Her academic performance",
          "Her thin legs and ability to bear children",
          "Her eating habits",
          "Her behaviour at school",
        ],
        correctIndex: 1,
        explanation: "Nana is obsessed with Adjua's thin legs, which she fears won't be able to 'carry a pregnancy' — reflecting her traditional view that a woman's worth is in childbearing.",
      },
      {
        id: "prose-mcq-10",
        question: "How does Nana react after Adjua wins the race?",
        options: [
          "She remains critical of Adjua's legs",
          "She claims she always knew Adjua's legs were fine",
          "She is indifferent to the achievement",
          "She worries that running will make Adjua's legs thinner",
        ],
        correctIndex: 1,
        explanation: "Nana completely reverses her position, claiming 'I always said she has fine legs' — a humorous contradiction of her earlier criticism.",
      },
      {
        id: "prose-mcq-11",
        question: "The story is narrated by:",
        options: [
          "Nana, the grandmother",
          "Adjua's mother",
          "Adjua, a seven-year-old girl",
          "An omniscient third-person narrator",
        ],
        correctIndex: 2,
        explanation: "The story is narrated by Adjua, a 7-year-old girl, whose innocent perspective provides both humour and cultural critique.",
      },
      {
        id: "prose-mcq-12",
        question: "What does Adjua's mother do when Nana criticises Adjua's legs?",
        options: [
          "She argues with Nana",
          "She agrees with Nana",
          "She silently disagrees but doesn't argue",
          "She takes Adjua to a doctor",
        ],
        correctIndex: 2,
        explanation: "The mother shakes her head in disagreement but doesn't argue with Nana — representing the silent, transitional generation between traditional and modern values.",
      },
      {
        id: "prose-mcq-13",
        question: "The central theme of 'The Girl Who Can' is:",
        options: [
          "The importance of physical beauty",
          "Traditional vs. modern values regarding women's worth",
          "The importance of athletics in schools",
          "Grandmother-granddaughter relationships",
        ],
        correctIndex: 1,
        explanation: "The central theme is the conflict between traditional values (women's worth = childbearing) and modern values (women's worth = individual achievement and talent).",
      },
      {
        id: "prose-mcq-14",
        question: "Nana calling Adjua's legs 'sticks' is an example of:",
        options: [
          "Simile",
          "Metaphor",
          "Personification",
          "Alliteration",
        ],
        correctIndex: 1,
        explanation: "Calling the legs 'sticks' is a metaphor — directly comparing thin legs to sticks without using 'like' or 'as.'",
      },
      {
        id: "prose-mcq-15",
        question: "What event changes Nana's perspective on Adjua's legs?",
        options: [
          "Adjua grows taller",
          "Adjua wins an inter-school running race",
          "A doctor says Adjua is healthy",
          "Adjua's mother confronts Nana",
        ],
        correctIndex: 1,
        explanation: "Adjua winning the inter-school athletics race transforms Nana's perspective — the same thin legs she mocked become a source of immense pride.",
      },
      {
        id: "prose-mcq-16",
        question: "The title 'The Girl Who Can' emphasises:",
        options: [
          "Physical appearance",
          "Traditional feminine qualities",
          "Ability and achievement over looks",
          "Academic intelligence",
        ],
        correctIndex: 2,
        explanation: "The title defines Adjua by what she CAN do (ability/achievement) rather than how she looks, reinforcing the story's message about female empowerment.",
      },
    ],
  },

  // ─── 3. The Last Lesson ──────────────────────────────────────────────────
  {
    id: "the-last-lesson",
    title: "The Last Lesson",
    author: "Alphonse Daudet",
    summary:
      "Set in French-occupied Alsace during the Franco-Prussian War, the story is narrated by a young schoolboy named Franz. On a seemingly ordinary morning, Franz is late for school and dreads being scolded by his strict teacher, M. Hamel, for not learning his French participles. But when Franz arrives, he finds the classroom oddly quiet and filled with elderly villagers sitting at the back. M. Hamel, dressed in his finest formal clothes, gently announces that this is the last lesson in French — an order has come from Berlin that only German will be taught in Alsace-Lorraine from the next day. Franz is shocked and filled with regret for wasting time, skipping lessons, and not learning his own language. M. Hamel speaks passionately about the beauty and importance of the French language, calling it 'the most beautiful, the clearest, the most logical language in the world.' He says that a people can resist enslavement as long as they hold fast to their language, which is 'the key to a prison.' The elderly villagers, including old Hauser, weep as they realise they too neglected to learn their language properly. As the church clock strikes twelve and the Prussian bugles sound, M. Hamel stands up, too emotional to speak, and writes 'Vive La France!' on the blackboard before dismissing the class with a gesture.",
    themes: [
      "Linguistic identity and patriotism",
      "Regret and the value of what is lost",
      "Language as resistance against oppression",
      "Education and its true importance",
      "Colonialism and cultural suppression",
      "Coming of age through crisis",
    ],
    passages: [
      {
        extract:
          "For the last two years all our bad news had come from there — the lost battles, the draft, the orders of the commanding officer.",
        explanation:
          "This establishes the wartime setting — Alsace has been receiving bad news from the Franco-Prussian War. The bulletin board outside the town hall symbolises the constant intrusion of war into civilian life. The 'lost battles' foreshadow the upcoming loss of their language.",
      },
      {
        extract:
          "My children, this is the last time I shall teach you. The order has come from Berlin to teach only German in the schools of Alsace and Lorraine. The new teacher comes tomorrow. This is your last French lesson.",
        explanation:
          "M. Hamel's announcement is the turning point of the story. His gentle, sad tone contrasts with his usual strictness. The order 'from Berlin' represents the power of the conquering nation to destroy cultural identity. Calling the students 'my children' reveals his deep emotional connection to them.",
      },
      {
        extract:
          "Then, from one thing to another, M. Hamel went on to talk of the French language, saying that it was the most beautiful language in the world — the clearest, the most logical; that we must guard it among us and never forget it.",
        explanation:
          "M. Hamel's passionate defence of the French language reveals his patriotism and love for his culture. He elevates the language beyond a mere school subject to a symbol of national identity. 'Guard it among us' suggests language preservation as a form of cultural resistance.",
      },
      {
        extract:
          "My friends, said he, I — I — But something choked him. He could not go on. Then he turned to the blackboard, took a piece of chalk, and, bearing on with all his might, he wrote as large as he could — 'Vive La France!'",
        explanation:
          "The climax of the story — M. Hamel is too overwhelmed with emotion to speak. The repetition of 'I — I —' shows his choking grief. His final act — writing 'Vive La France!' (Long Live France) — is a powerful act of defiance and patriotism, conveying through writing what he cannot say aloud.",
      },
      {
        extract:
          "What a thunderclap these words were to me! … My last French lesson! Why, I hardly knew how to write! I should never learn any more!",
        explanation:
          "Franz's reaction reveals his shock and instant regret. The metaphor 'thunderclap' conveys the devastating impact of the news. His realisation that he 'hardly knew how to write' and 'should never learn any more' captures the painful awareness of wasted opportunities.",
      },
      {
        extract:
          "When a people are enslaved, as long as they hold fast to their language it is as if they had the key to their prison.",
        explanation:
          "This is the most famous line of the story and its central message. Language is compared to a key that can unlock the prison of enslavement. As long as a conquered people preserve their language, they preserve their identity and hope for freedom. It elevates language from a mere communication tool to a weapon of resistance.",
      },
      {
        extract:
          "Poor man! It was in honour of this last lesson that he had put on his fine Sunday clothes; and now I understood why the old men of the village were sitting there in the back of the room.",
        explanation:
          "Franz's understanding dawns — M. Hamel's formal attire and the villagers' presence are acts of respect and mourning for the last French lesson. The 'Sunday clothes' treat the lesson as a solemn, almost sacred occasion. The old men represent the entire community paying tribute to their dying language.",
      },
    ],
    wordMeanings: [
      { word: "Thunderclap", meaning: "A sudden, shocking revelation (metaphor for the startling news)" },
      { word: "Draft", meaning: "Compulsory military service" },
      { word: "Saar", meaning: "A region between France and Germany" },
      { word: "Participles", meaning: "A grammatical form of a verb" },
      { word: "Cranky", meaning: "Irritable, bad-tempered" },
      { word: "Solemn", meaning: "Serious, grave, formal" },
      { word: "Reproach", meaning: "Express disapproval or disappointment" },
      { word: "Enslaved", meaning: "Made a slave; deprived of freedom" },
      { word: "Angelus", meaning: "A Roman Catholic prayer recited at morning, noon, and evening" },
      { word: "Vive La France", meaning: "'Long Live France!' — a patriotic exclamation" },
      { word: "Primer", meaning: "An elementary textbook for teaching children" },
      { word: "Bulletin board", meaning: "A notice board for public announcements" },
      { word: "Mounted", meaning: "Climbed up; rose" },
      { word: "Wretches", meaning: "Miserable, unfortunate people" },
    ],
    literaryDevices: [
      {
        device: "Metaphor",
        example: "When a people are enslaved, as long as they hold fast to their language it is as if they had the key to their prison",
        explanation: "Language is compared to a key and enslavement to a prison. This powerful metaphor elevates language preservation to an act of liberation.",
      },
      {
        device: "Metaphor",
        example: "What a thunderclap these words were to me!",
        explanation: "The announcement is compared to a thunderclap — sudden, loud, and shocking — conveying the devastating impact on Franz.",
      },
      {
        device: "Irony",
        example: "Franz's regret for not learning French properly",
        explanation: "Situational irony — Franz, who always tried to avoid French class, now desperately wishes he had more time to learn. What he took for granted has become precious.",
      },
      {
        device: "Symbolism",
        example: "The Prussian bugles / the Angelus bell",
        explanation: "The Prussian bugles symbolise German military control and the end of French cultural identity. The Angelus bell marks the end of the last French lesson — the death of a tradition.",
      },
      {
        device: "Pathos",
        example: "He turned to the blackboard... and wrote as large as he could — 'Vive La France!'",
        explanation: "M. Hamel's inability to speak, followed by his defiant writing of 'Vive La France!', creates deep pathos — evoking pity and sadness in the reader.",
      },
    ],
    questions: [
      {
        question: "What was the order from Berlin? How did it affect the people of Alsace?",
        answer: "The order from Berlin decreed that only German would be taught in the schools of Alsace and Lorraine from the next day onwards. French would no longer be permitted. This devastated the people because it meant losing their language — a fundamental part of their cultural identity. Even people who had neglected to learn French properly now felt deep regret and grief.",
      },
      {
        question: "How did Franz feel when he heard about the last lesson? How had his attitude been before?",
        answer: "Franz was shocked — the news hit him like a 'thunderclap.' He was filled with instant regret for all the times he had skipped classes, avoided studying, and not learned his participles. Before the announcement, Franz had been a carefree, lazy student who dreaded M. Hamel's scolding and found excuses to avoid school. The impending loss made him realise the true value of what he had taken for granted.",
      },
      {
        question: "Why was M. Hamel dressed in his formal Sunday clothes?",
        answer: "M. Hamel wore his fine Sunday clothes — his beautiful green coat, frilled shirt, and embroidered silk cap — in honour of his last French lesson. It was his way of paying tribute to the French language and his teaching career. The formal attire treated the last lesson as a solemn, almost sacred occasion, showing the deep respect and grief M. Hamel felt.",
      },
      {
        question: "Explain the significance of 'When a people are enslaved... the key to their prison.'",
        answer: "This is the story's most important message. M. Hamel says that as long as a conquered people preserve their language, they hold 'the key to their prison' — meaning language is the key to cultural identity and eventual freedom. Even if politically enslaved, a people who maintain their language maintain their identity, heritage, and hope. Language becomes a form of resistance against oppression.",
      },
      {
        question: "Why were the village elders present at the last lesson?",
        answer: "The elderly villagers — including old Hauser with his primer — came to the last French lesson to pay their respects and express gratitude. They came partly out of sorrow for losing their language, and partly out of regret for not having attended school more regularly themselves. Their presence showed that the loss affected the entire community, not just the schoolchildren.",
      },
      {
        question: "Describe the last scene of the story. Why is it so powerful?",
        answer: "In the last scene, the church clock strikes twelve and Prussian bugles sound outside. M. Hamel tries to speak but is choked with emotion — 'I — I —' is all he manages. He turns to the blackboard and writes 'Vive La France!' as large as he can, then dismisses the class with a gesture. It is powerful because: (1) His inability to speak shows overwhelming grief. (2) Writing replaces speech — the written word endures. (3) 'Vive La France!' is an act of defiance. (4) The silent gesture of dismissal conveys what words cannot.",
      },
      {
        question: "What is the central theme of 'The Last Lesson'?",
        answer: "The central theme is the importance of linguistic and cultural identity. The story demonstrates that language is not just a school subject but the foundation of a people's identity, pride, and freedom. When a conquering power takes away a people's language, it attempts to erase their culture. The story also explores themes of regret (for taking things for granted), patriotism, and the power of education.",
      },
      {
        question: "How does the character of Franz change during the story?",
        answer: "Franz undergoes a significant transformation: (1) At the start, he is carefree, dreads school, and considers French lessons boring. (2) Upon hearing the announcement, he is shocked and filled with regret. (3) He begins to see M. Hamel differently — with sympathy and respect rather than fear. (4) He listens attentively and values every word of the lesson. (5) By the end, he understands the true importance of language and identity. This is a coming-of-age moment.",
      },
    ],
    mcqs: [
      {
        id: "prose-mcq-17",
        question: "What order came from Berlin in 'The Last Lesson'?",
        options: [
          "Schools would be closed permanently",
          "Only German would be taught in schools of Alsace-Lorraine",
          "French teachers would be sent to Berlin",
          "Students must learn both French and German",
        ],
        correctIndex: 1,
        explanation: "The order from Berlin decreed that only German would be taught in the schools of Alsace and Lorraine, effectively banning French education.",
      },
      {
        id: "prose-mcq-18",
        question: "What does M. Hamel compare language to?",
        options: [
          "A sword",
          "A bridge",
          "The key to a prison",
          "A shield",
        ],
        correctIndex: 2,
        explanation: "M. Hamel says language is like 'the key to a prison' — as long as enslaved people preserve their language, they can resist oppression.",
      },
      {
        id: "prose-mcq-19",
        question: "Why was Franz surprised when he reached school?",
        options: [
          "The school was closed",
          "M. Hamel was absent",
          "The classroom was quiet and villagers were present",
          "New German teachers were already there",
        ],
        correctIndex: 2,
        explanation: "Franz was surprised because the usually noisy classroom was eerily quiet, and elderly villagers were sitting at the back of the room for the last French lesson.",
      },
      {
        id: "prose-mcq-20",
        question: "What did M. Hamel write on the blackboard at the end?",
        options: [
          "Au Revoir",
          "Vive La France!",
          "Merci Beaucoup",
          "Adieu Mon Ami",
        ],
        correctIndex: 1,
        explanation: "M. Hamel wrote 'Vive La France!' (Long Live France!) — a powerful act of patriotic defiance as his final message.",
      },
      {
        id: "prose-mcq-21",
        question: "Franz's initial attitude towards school was:",
        options: [
          "Enthusiastic and eager",
          "Carefree and reluctant",
          "Fearful and anxious",
          "Indifferent and bored",
        ],
        correctIndex: 1,
        explanation: "Franz was carefree and reluctant — he dreaded going to school, avoided studying participles, and would rather spend time outdoors.",
      },
      {
        id: "prose-mcq-22",
        question: "'What a thunderclap these words were to me!' The literary device used here is:",
        options: [
          "Simile",
          "Metaphor",
          "Personification",
          "Hyperbole",
        ],
        correctIndex: 1,
        explanation: "This is a metaphor — the announcement is directly compared to a thunderclap (sudden, shocking), without using 'like' or 'as.'",
      },
      {
        id: "prose-mcq-23",
        question: "Why did the old villagers attend the last lesson?",
        options: [
          "They were forced to attend by the authorities",
          "To pay tribute to M. Hamel and express regret for neglecting their language",
          "To protest against the German order",
          "To learn German from the new teacher",
        ],
        correctIndex: 1,
        explanation: "The villagers attended to pay their respects to the last French lesson and M. Hamel, and also out of regret for not having learned their own language properly.",
      },
      {
        id: "prose-mcq-24",
        question: "The story 'The Last Lesson' is set during:",
        options: [
          "World War I",
          "World War II",
          "The Franco-Prussian War",
          "The French Revolution",
        ],
        correctIndex: 2,
        explanation: "The story is set during the Franco-Prussian War (1870-71), when Alsace and Lorraine were annexed by Prussia (Germany).",
      },
    ],
  },

  // ─── 4. The Pedestrian ───────────────────────────────────────────────────
  {
    id: "the-pedestrian",
    title: "The Pedestrian",
    author: "Ray Bradbury",
    summary:
      "Set in November 2053 AD, the story follows Leonard Mead, a writer who loves taking solitary evening walks through a silent, deserted city. In this dystopian future, everyone stays indoors watching television screens — the streets are empty, houses glow with 'tomb-like' TV light, and sidewalks are cracked from disuse. Mead is the only person who walks for pleasure, breathing the cold night air and enjoying the silence. One evening, a robotic police car — the only one in a city of three million (since crime has practically vanished because everyone stays home) — stops him and interrogates him. It asks his profession (writer — 'no profession' since nobody reads anymore), his marital status (unmarried — 'no wife'), and why he is walking ('just walking' — incomprehensible to the machine). The car orders him to get in and takes him to the Psychiatric Center for Research on Regressive Tendencies — essentially, he is being institutionalised for the 'crime' of walking and thinking independently. As the car passes his house — the only one with lights on and no TV — the empty streets stretch out around him. The story is a powerful critique of technology's dehumanising effect, the death of individuality, and a society that pathologises nonconformity.",
    themes: [
      "Technology vs. humanity",
      "Conformity and loss of individuality",
      "Isolation in a connected world",
      "Death of creativity and independent thought",
      "Dystopian society and surveillance",
      "Nature vs. artificial living",
    ],
    passages: [
      {
        extract:
          "In ten years of walking by night or day, for thousands of miles, he had never met another person walking, not once in all that time.",
        explanation:
          "This establishes the extreme isolation of Leonard Mead. In a city of three million, not a single person walks — everyone is indoors watching TV. The detail 'ten years' and 'thousands of miles' emphasises how long and consistently Mead has been the sole walker, highlighting the totality of society's retreat indoors.",
      },
      {
        extract:
          "The houses were dark. In all that stretch of road, not a single house had a light burning. People sat in their houses, in the dark, their faces lit by their television screens.",
        explanation:
          "A vivid image of a society consumed by technology. Houses are dark except for the ghostly glow of TV screens illuminating faces. People choose artificial electronic light over real light, symbolising how technology has replaced genuine human experience and connection.",
      },
      {
        extract:
          "Everything went on in the tomb-like houses at night now... The tombs, ill-lit by television light, where the people sat like the dead.",
        explanation:
          "Bradbury compares houses to 'tombs' and people to 'the dead.' This powerful metaphor suggests that by surrendering to technology and abandoning active life, people have essentially died. They exist but don't truly live — their houses are graves.",
      },
      {
        extract:
          "'What are you doing out?' 'Walking.' 'Walking!' 'Just walking.' 'Walking where? For what?' 'Walking for air. Walking to see.'",
        explanation:
          "The exchange between Mead and the police car reveals the dystopian society's values. Simple walking — a natural human activity — is incomprehensible to the machine. 'Walking to see' suggests Mead walks to observe and think, activities this society considers suspicious and abnormal.",
      },
      {
        extract:
          "'Your profession?' 'I guess you'd call me a writer.' 'No profession,' said the police car.",
        explanation:
          "The police car's dismissal of 'writer' as 'no profession' reveals that in this society, creative writing has no value because nobody reads. Art, literature, and imagination have been replaced by television. The machine literally cannot comprehend the value of creative thought.",
      },
      {
        extract:
          "He was taken to the Psychiatric Center for Research on Regressive Tendencies.",
        explanation:
          "The climax — Mead is being institutionalised not for a crime but for being different. Walking, thinking, and being a writer are classified as 'regressive tendencies' — meaning going backward. In this dystopia, individual thought is pathologised as mental illness. Conformity is sanity; nonconformity is madness.",
      },
      {
        extract:
          "His house was the only one in all the city with all the lights on while everyone else's houses were dark with only the grey flicker of TV screens.",
        explanation:
          "Mead's brightly-lit house symbolises knowledge, awareness, and independent thought — the light of the mind. It stands in stark contrast to the dark houses with their grey TV flickers. This single bright house among millions of dark ones represents the lonely position of the free thinker in a conformist society.",
      },
    ],
    wordMeanings: [
      { word: "Pedestrian", meaning: "A person walking; also suggests something ordinary or dull" },
      { word: "Tomb-like", meaning: "Resembling a grave; dark, silent, lifeless" },
      { word: "Regressive", meaning: "Going backward; returning to a less developed state" },
      { word: "Psychiatric", meaning: "Relating to mental illness or its treatment" },
      { word: "Murmur", meaning: "A soft, low sound" },
      { word: "Phantom", meaning: "A ghost; something apparently seen but having no physical reality" },
      { word: "Buckling", meaning: "Bending, warping under pressure or neglect" },
      { word: "Intermittent", meaning: "Occurring at irregular intervals; not continuous" },
      { word: "Metallic", meaning: "Resembling metal; cold, mechanical" },
      { word: "Lone", meaning: "Single, solitary, alone" },
      { word: "Riveted", meaning: "Completely engrossed; fixed firmly" },
      { word: "Surge", meaning: "A sudden powerful forward or upward movement" },
      { word: "Dystopian", meaning: "An imagined society characterised by suffering and oppression" },
    ],
    literaryDevices: [
      {
        device: "Metaphor",
        example: "The tombs, ill-lit by television light, where the people sat like the dead",
        explanation: "Houses are compared to tombs and people to the dead, suggesting that surrender to technology has killed genuine human life. People exist physically but are spiritually dead.",
      },
      {
        device: "Symbolism",
        example: "Mead's brightly-lit house vs. the dark houses with TV flickers",
        explanation: "Mead's lit house symbolises knowledge, independent thought, and human warmth. The dark TV-lit houses symbolise intellectual death, conformity, and the cold glow of technology.",
      },
      {
        device: "Irony",
        example: "Only one police car for a city of three million",
        explanation: "Ironic because crime has vanished not because society is good, but because everyone is trapped indoors watching TV. The absence of crime is a symptom of lifelessness, not virtue.",
      },
      {
        device: "Personification",
        example: "The police car speaks and makes decisions autonomously",
        explanation: "The robotic police car speaks, interrogates, and makes judgments — given human authority. This personification of technology and dehumanisation of people is central to the story's critique.",
      },
      {
        device: "Dystopian imagery",
        example: "Cracked sidewalks, empty streets, dark houses, TV-lit faces",
        explanation: "Bradbury creates a vivid dystopian landscape where infrastructure decays (cracked sidewalks), streets are deserted, and people are prisoners of their screens — all pointing to a society in decline.",
      },
    ],
    questions: [
      {
        question: "What kind of society does Ray Bradbury depict in 'The Pedestrian'?",
        answer: "Bradbury depicts a dystopian society set in 2053 where technology (specifically television) has completely taken over people's lives. Everyone stays indoors watching screens, streets are deserted, sidewalks are cracked from disuse, and there is only one police car for 3 million people. Creativity, literature, and independent thought have been eliminated. Walking — a basic human activity — is considered abnormal.",
      },
      {
        question: "Why is Leonard Mead considered abnormal by this society?",
        answer: "Mead is considered abnormal because: (1) He walks outdoors for pleasure — nobody else does this. (2) He is a writer — nobody reads anymore. (3) He is unmarried — in a society where everyone follows the same pattern. (4) His house lights are on without a TV — unique in the entire city. (5) He enjoys nature, fresh air, and thinking — activities considered 'regressive tendencies' requiring psychiatric treatment.",
      },
      {
        question: "Explain the significance of the title 'The Pedestrian.'",
        answer: "The title has a double meaning: (1) Literally, it refers to Leonard Mead as a person who walks — the only pedestrian in a city of millions. (2) Figuratively, 'pedestrian' means ordinary or dull. The irony is that in this society, what is truly ordinary (walking) has become extraordinary, while what should be considered dull (sitting in front of a TV every night) has become the norm.",
      },
      {
        question: "What does the police car represent in the story?",
        answer: "The robotic police car represents: (1) The surveillance state — technology monitoring and controlling citizens. (2) The death of human authority — no human officer, just a machine. (3) Society's intolerance of nonconformity — anyone who behaves differently is treated as criminal. (4) The absurdity of the system — a car that cannot comprehend walking or writing, yet has the power to imprison someone for doing these things.",
      },
      {
        question: "What is the significance of Mead being taken to the 'Psychiatric Center for Research on Regressive Tendencies'?",
        answer: "It is deeply significant because it shows that in this dystopia, independent thought is classified as mental illness. 'Regressive Tendencies' implies that walking, thinking, and writing are going backward — when in reality, it is the society that has regressed by abandoning all human activities. It's a commentary on how conformist societies pathologise dissent.",
      },
      {
        question: "How does Bradbury use light and darkness symbolically?",
        answer: "Light symbolises knowledge, awareness, and life. Darkness symbolises ignorance, conformity, and spiritual death. Mead's house is brightly lit (alive, thinking, creative), while all other houses are dark with only the grey TV flicker (passive, dead). The streets are dark and empty. The police car operates in darkness. Mead walks in darkness but is himself a figure of light — the lone thinker in a dark world.",
      },
      {
        question: "What warning does Bradbury convey through this story?",
        answer: "Bradbury warns against: (1) Over-reliance on technology — it can replace human connection, creativity, and independent thought. (2) Conformity — a society that punishes difference is a dead society. (3) Passive entertainment — mindless TV consumption kills intellectual curiosity. (4) Loss of basic human activities — walking, reading, talking, thinking. The story, written in 1951, was remarkably prescient about screen addiction.",
      },
      {
        question: "Compare Leonard Mead's lifestyle with that of the rest of the city's inhabitants.",
        answer: "Mead: walks outdoors, enjoys nature and fresh air, is a writer/reader, has lights on at home, no TV, is unmarried, thinks independently. Everyone else: stays indoors always, watches TV in dark rooms, doesn't walk or exercise, faces lit by screens, follows identical routines, never goes outside. Mead is alive and thinking; the rest are 'like the dead' in their 'tombs.'",
      },
    ],
    mcqs: [
      {
        id: "prose-mcq-25",
        question: "In what year is 'The Pedestrian' set?",
        options: [
          "2023",
          "2053",
          "2153",
          "1984",
        ],
        correctIndex: 1,
        explanation: "The story is set in November 2053 AD — a dystopian future where technology has completely taken over human life.",
      },
      {
        id: "prose-mcq-26",
        question: "Why is there only one police car for a city of three million?",
        options: [
          "Budget cuts",
          "Crime has practically vanished because everyone stays indoors",
          "The police force is corrupt",
          "Technology replaced human police officers",
        ],
        correctIndex: 1,
        explanation: "Crime has virtually disappeared because everyone stays home watching TV — not because society is virtuous, but because it is lifeless.",
      },
      {
        id: "prose-mcq-27",
        question: "The police car classifies Mead's profession of 'writer' as:",
        options: [
          "A dangerous profession",
          "An artistic profession",
          "No profession",
          "An outdated profession",
        ],
        correctIndex: 2,
        explanation: "The police car says 'No profession' because in this society nobody reads, so writing has no recognised value.",
      },
      {
        id: "prose-mcq-28",
        question: "Where is Leonard Mead taken at the end of the story?",
        options: [
          "The police station",
          "His home",
          "The Psychiatric Center for Research on Regressive Tendencies",
          "A rehabilitation centre",
        ],
        correctIndex: 2,
        explanation: "Mead is taken to the Psychiatric Center — his 'crime' of walking and thinking independently is classified as a mental illness requiring treatment.",
      },
      {
        id: "prose-mcq-29",
        question: "Bradbury compares the houses in the city to:",
        options: [
          "Castles",
          "Prisons",
          "Tombs",
          "Temples",
        ],
        correctIndex: 2,
        explanation: "Houses are compared to 'tombs' — dark, silent graves where people sit 'like the dead,' illuminated only by TV screens.",
      },
      {
        id: "prose-mcq-30",
        question: "What makes Mead's house unique in the entire city?",
        options: [
          "It is the largest house",
          "It is the only one with all lights on and no TV",
          "It is the oldest house",
          "It has a garden",
        ],
        correctIndex: 1,
        explanation: "Mead's house is the only one brightly lit with actual lights and no TV — symbolising knowledge and independent thought in a dark, conformist society.",
      },
      {
        id: "prose-mcq-31",
        question: "The central theme of 'The Pedestrian' is:",
        options: [
          "The benefits of technology",
          "The importance of exercise",
          "The dehumanising effect of technology and loss of individuality",
          "The dangers of walking at night",
        ],
        correctIndex: 2,
        explanation: "The story warns about technology's power to dehumanise society, destroy individuality, kill creativity, and pathologise independent thought.",
      },
      {
        id: "prose-mcq-32",
        question: "The title 'The Pedestrian' is ironic because:",
        options: [
          "Mead doesn't actually walk",
          "Walking (a basic activity) has become extraordinary and suspicious",
          "Pedestrians are respected in this society",
          "The story is about driving, not walking",
        ],
        correctIndex: 1,
        explanation: "The irony is that the most basic human activity — walking — has become so extraordinary in this society that it's treated as a symptom of mental illness.",
      },
    ],
  },

  // ─── 5. With the Photographer ────────────────────────────────────────────
  {
    id: "with-the-photographer",
    title: "With the Photographer",
    author: "Stephen Leacock",
    summary:
      "The narrator visits a photographer's studio to have his portrait taken. From the start, the experience is humiliating. He waits for an hour in a 'dim, sepulchral' room, then is led to the studio where the photographer studies his face with obvious distaste. The photographer tilts, adjusts, and repositions the narrator's head and features, clearly dissatisfied with what he sees. He makes disparaging remarks about the narrator's face — the mouth, the ears, the expression — and suggests 'fixing' them all. The narrator endures this silently. When the proofs arrive, the photographer has retouched the photo so extensively that the person in the picture is completely unrecognisable — the face is smoothed, the ears are changed, the expression is altered. It looks like a 'beautiful' stranger, not the narrator at all. The narrator breaks down, overwhelmed by the realisation that his natural face is considered so flawed it needs to be entirely replaced. He confronts the photographer emotionally, saying he'd rather have his own imperfect face than a beautiful fake. The story humorously satirises the photography industry's obsession with artificial beauty and the way society pressures people to look 'perfect' rather than natural.",
    themes: [
      "Artificiality vs. authenticity",
      "Society's obsession with appearance",
      "Humour and satire",
      "Self-identity and self-acceptance",
      "The absurdity of pursuing perfection",
      "Professional arrogance",
    ],
    passages: [
      {
        extract:
          "I waited an hour. I read the 'Ladies Companion' for 1912. I began to see that photography was a business for which one needed to have a special aptitude.",
        explanation:
          "The narrator's long wait immediately establishes the photographer's arrogance and lack of concern for clients. Reading a decades-old magazine suggests the studio is outdated and neglected. His wry observation about 'special aptitude' is the first hint of the story's satirical tone.",
      },
      {
        extract:
          "The photographer rolled his head to one side and looked at me with an expression of deep distaste. 'The face is quite wrong,' he said.",
        explanation:
          "The photographer's reaction to the narrator's face is brutally rude — he studies it with 'deep distaste' and declares it 'quite wrong.' This reveals the photographer's arrogance and the absurdity of telling someone their own face is 'wrong.' It sets up the story's satire of the beauty industry.",
      },
      {
        extract:
          "'I think,' said the photographer, looking at me critically, 'I think we can improve the face quite a bit. The mouth needs to be adjusted. And the ears — I can fix those. And the expression — we'll change that entirely.'",
        explanation:
          "The photographer proposes to 'fix' every feature of the narrator's face — mouth, ears, expression. The absurdity is that these are not flaws to be repaired but natural features of a human face. His clinical language treats a person's identity as a problem to be solved.",
      },
      {
        extract:
          "The proofs came. I looked at them. The picture was beautiful. It was a work of art. But it was not me. It looked like someone else entirely.",
        explanation:
          "When the retouched photo arrives, it is technically beautiful but completely unrecognisable. The photographer has replaced the narrator's real face with an idealised fiction. This is the story's central irony — creating beauty by destroying identity.",
      },
      {
        extract:
          "'I want my face back,' I said. 'I want to look like myself, not like some beautiful stranger.'",
        explanation:
          "The narrator's emotional outburst is the climax — he rejects artificial beauty in favour of his own natural appearance. 'I want my face back' is a powerful declaration of self-acceptance, arguing that authenticity is more valuable than manufactured perfection.",
      },
      {
        extract:
          "The photographer looked at me in amazement. 'But this is far better than the original,' he said. 'The original was hopeless.'",
        explanation:
          "The photographer's response reveals his complete inability to value natural appearance. Calling the real face 'hopeless' shows how deeply ingrained the obsession with artificial beauty is in his profession. He genuinely cannot understand why someone would prefer their real face.",
      },
    ],
    wordMeanings: [
      { word: "Sepulchral", meaning: "Gloomy, dismal; resembling a tomb" },
      { word: "Aptitude", meaning: "Natural ability or skill for something" },
      { word: "Distaste", meaning: "Dislike, aversion; disapproval" },
      { word: "Critically", meaning: "In a way that expresses disapproval; analytically" },
      { word: "Proofs", meaning: "Trial prints of a photograph for approval before final printing" },
      { word: "Retouched", meaning: "Altered or improved (a photograph) by removing imperfections" },
      { word: "Unrecognisable", meaning: "Impossible to identify; changed beyond recognition" },
      { word: "Disparaging", meaning: "Expressing disapproval; belittling" },
      { word: "Tilted", meaning: "Moved or positioned at an angle" },
      { word: "Endure", meaning: "Suffer through patiently; tolerate" },
      { word: "Confronted", meaning: "Faced or challenged directly" },
      { word: "Satirise", meaning: "Use humour, irony, or exaggeration to criticise" },
    ],
    literaryDevices: [
      {
        device: "Satire",
        example: "The entire story satirises the photography industry and its obsession with artificial beauty",
        explanation: "Leacock uses humour and exaggeration to mock how photographers (and by extension, society) value manufactured beauty over natural appearance, and how people's real faces are treated as problems to be fixed.",
      },
      {
        device: "Irony",
        example: "The picture was beautiful... But it was not me",
        explanation: "Situational irony — the purpose of a portrait is to capture someone's likeness, but the retouched photo creates a beautiful stranger. The better the photo looks, the worse it serves its purpose.",
      },
      {
        device: "Hyperbole",
        example: "The photographer's extreme distaste for the narrator's face and desire to change every feature",
        explanation: "The photographer's reactions are exaggerated for comic effect — declaring the face 'quite wrong' and proposing to fix every single feature satirises the beauty industry's impossible standards.",
      },
      {
        device: "First-person narration",
        example: "The story is told from the narrator's perspective",
        explanation: "The first-person narration allows readers to experience the humiliation directly. The narrator's dry, understated reactions to the photographer's rudeness create a distinctly British style of humour.",
      },
      {
        device: "Imagery",
        example: "a dim, sepulchral room",
        explanation: "The waiting room is described with tomb-like imagery ('sepulchral'), foreshadowing how the photographer will 'kill' the narrator's real identity and replace it with a lifeless, perfect image.",
      },
    ],
    questions: [
      {
        question: "What was the narrator's experience in the photographer's waiting room?",
        answer: "The narrator waited for a full hour in a 'dim, sepulchral' (gloomy, tomb-like) room. He read an old 'Ladies Companion' magazine from 1912. The long wait and dreary setting established the photographer's arrogance and disregard for clients. It set the stage for the humiliating experience to follow.",
      },
      {
        question: "How did the photographer react upon seeing the narrator's face?",
        answer: "The photographer studied the narrator's face with obvious 'deep distaste' and declared it 'quite wrong.' He criticised multiple features — the mouth, ears, and expression — and proposed to 'fix' all of them. He treated the narrator's natural appearance as a collection of flaws rather than a human face, displaying extreme professional arrogance.",
      },
      {
        question: "What happened when the proofs arrived? Why was the narrator upset?",
        answer: "The retouched proofs showed a beautiful, technically perfect photograph — but it was completely unrecognisable. The photographer had changed every feature so dramatically that the person in the photo was 'someone else entirely.' The narrator was upset because his identity had been erased. The photo was not a portrait of him but of an imaginary, 'perfect' person.",
      },
      {
        question: "What is the central message or theme of the story?",
        answer: "The central message is that authenticity and self-acceptance are more valuable than artificial perfection. The story satirises society's obsession with appearance and the beauty industry's tendency to replace real faces with manufactured ideals. It argues that a person's natural features — even imperfect ones — are their identity, and erasing them in pursuit of 'beauty' destroys something far more valuable.",
      },
      {
        question: "How does Leacock use humour in this story?",
        answer: "Leacock uses: (1) Understatement — the narrator's calm, dry reactions to outrageous rudeness. (2) Exaggeration — the photographer's extreme distaste and desire to change everything. (3) Irony — a portrait that looks nothing like the subject. (4) Absurdity — a photographer who thinks faces are 'wrong.' (5) The narrator's polite endurance of humiliation before finally breaking down. This understated British humour makes the satire effective.",
      },
      {
        question: "What does the narrator mean by 'I want my face back'?",
        answer: "'I want my face back' is both literal and figurative. Literally, he wants a photo that actually looks like him. Figuratively, it represents a declaration of self-acceptance — he wants to be himself, not an artificially beautified version. It's a rejection of the photographer's (and society's) standards of beauty in favour of authenticity and personal identity.",
      },
      {
        question: "What does the photographer represent in this story?",
        answer: "The photographer represents: (1) Society's obsession with appearance and artificial beauty standards. (2) Professional arrogance — believing he knows better than the subject what they should look like. (3) The beauty and media industry that profits from making people feel inadequate. (4) The devaluation of authenticity in favour of manufactured perfection. His inability to appreciate a real face symbolises society's distorted values.",
      },
      {
        question: "What is the significance of the title 'With the Photographer'?",
        answer: "The simple title 'With the Photographer' understates the dramatic events of the story — a technique typical of Leacock's humour. It suggests an ordinary visit, but what unfolds is a deeply humiliating experience that raises questions about beauty, identity, and self-worth. The casualness of the title contrasts with the seriousness of the themes, which is itself a form of irony.",
      },
    ],
    mcqs: [
      {
        id: "prose-mcq-33",
        question: "How long did the narrator wait at the photographer's studio?",
        options: [
          "Fifteen minutes",
          "Thirty minutes",
          "One hour",
          "Two hours",
        ],
        correctIndex: 2,
        explanation: "The narrator waited for a full hour in the dim, sepulchral waiting room, reading old magazines.",
      },
      {
        id: "prose-mcq-34",
        question: "The photographer's first reaction to the narrator's face was:",
        options: [
          "Admiration",
          "Indifference",
          "Deep distaste",
          "Sympathy",
        ],
        correctIndex: 2,
        explanation: "The photographer looked at the narrator with 'deep distaste' and declared his face 'quite wrong.'",
      },
      {
        id: "prose-mcq-35",
        question: "What was wrong with the retouched photograph?",
        options: [
          "It was blurry",
          "It was too dark",
          "It looked like a completely different person",
          "It was damaged",
        ],
        correctIndex: 2,
        explanation: "The retouched photo was beautiful but looked like 'someone else entirely' — the narrator was unrecognisable because every feature had been altered.",
      },
      {
        id: "prose-mcq-36",
        question: "The word 'sepulchral' used to describe the waiting room means:",
        options: [
          "Bright and cheerful",
          "Gloomy and tomb-like",
          "Modern and clean",
          "Noisy and busy",
        ],
        correctIndex: 1,
        explanation: "'Sepulchral' means gloomy and resembling a tomb — setting the dark, uncomfortable tone for the narrator's experience.",
      },
      {
        id: "prose-mcq-37",
        question: "The story 'With the Photographer' is primarily a:",
        options: [
          "Tragedy",
          "Romance",
          "Satire",
          "Mystery",
        ],
        correctIndex: 2,
        explanation: "The story is a satire — Leacock uses humour, irony, and exaggeration to criticise the photography industry's obsession with artificial beauty.",
      },
      {
        id: "prose-mcq-38",
        question: "'I want my face back' expresses the narrator's desire for:",
        options: [
          "A different photographer",
          "A cheaper photograph",
          "Authenticity over artificial beauty",
          "Revenge on the photographer",
        ],
        correctIndex: 2,
        explanation: "The narrator's declaration represents his desire for authenticity — he'd rather look like himself than like a beautiful but fake stranger.",
      },
      {
        id: "prose-mcq-39",
        question: "The photographer represents:",
        options: [
          "A skilled artist",
          "Society's obsession with artificial beauty standards",
          "A misunderstood genius",
          "A caring professional",
        ],
        correctIndex: 1,
        explanation: "The photographer represents society's obsession with manufactured beauty and the devaluation of natural, authentic appearance.",
      },
      {
        id: "prose-mcq-40",
        question: "The literary device used primarily in this story is:",
        options: [
          "Allegory",
          "Satire",
          "Tragedy",
          "Fable",
        ],
        correctIndex: 1,
        explanation: "Satire is the primary literary device — Leacock uses humour and exaggeration to mock society's beauty standards and the photography industry.",
      },
    ],
  },
];
