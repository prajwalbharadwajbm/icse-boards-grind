export interface JCDialogueLine {
  speaker: string;
  stageDirection?: string;
  original: string;
  modern: string;
}

export interface JCSceneLines {
  act: number;
  scene: number;
  title: string;
  openingDirection?: string;
  lines: JCDialogueLine[];
}

export const JC_SCENE_LINES: JCSceneLines[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // ACT 3
  // ═══════════════════════════════════════════════════════════════════════
  {
    act: 3,
    scene: 1,
    title: "The Assassination",
    openingDirection: "Rome. Before the Capitol; the Senate sitting above. A crowd of people; among them Artemidorus and the Soothsayer. Flourish. Enter Caesar, Brutus, Cassius, Casca, Decius, Metellus, Trebonius, Cinna, Antony, Lepidus, Popilius, Publius, and others.",
    lines: [
      {
        speaker: "Caesar",
        original: "The ides of March are come.",
        modern: "The fifteenth of March has arrived (and nothing has happened to me).",
      },
      {
        speaker: "Soothsayer",
        original: "Ay, Caesar; but not gone.",
        modern: "Yes, Caesar — but the day is not over yet.",
      },
      {
        speaker: "Artemidorus",
        original: "Hail, Caesar! Read this schedule.",
        modern: "Hail, Caesar! Read this letter.",
      },
      {
        speaker: "Decius",
        original: "Trebonius doth desire you to o'er-read,\nAt your best leisure, this his humble suit.",
        modern: "Trebonius wants you to read this humble request when you have a moment.",
      },
      {
        speaker: "Artemidorus",
        original: "O Caesar, read mine first; for mine's a suit\nThat touches Caesar nearer. Read it, great Caesar.",
        modern: "O Caesar, read mine first — it concerns you personally. Read it, great Caesar.",
      },
      {
        speaker: "Caesar",
        original: "What touches us ourself shall be last served.",
        modern: "Whatever concerns me personally will be dealt with last.",
      },
      {
        speaker: "Metellus",
        stageDirection: "Kneeling",
        original: "Most high, most mighty, and most puissant Caesar,\nMetellus Cimber throws before thy seat\nAn humble heart—",
        modern: "Most high, mighty, and powerful Caesar, Metellus Cimber kneels before your throne with a humble heart—",
      },
      {
        speaker: "Caesar",
        original: "I must prevent thee, Cimber.\nThese couchings and these lowly courtesies\nMight fire the blood of ordinary men,\nAnd turn pre-ordinance and first decree\nInto the law of children. Be not fond,\nTo think that Caesar bears such rebel blood\nThat will be thaw'd from the true quality\nWith that which melteth fools — I mean, sweet words,\nLow-crooked court'sies and base spaniel-fawning.\nThy brother by decree is banished:\nIf thou dost bend and pray and fawn for him,\nI spurn thee like a cur out of my way.",
        modern: "I must stop you, Cimber. This bowing and scraping might sway ordinary men and turn established law into child's play. Don't be foolish enough to think Caesar has such weak blood that it can be melted by what fools fall for — sweet words, deep bows, and dog-like grovelling. Your brother was banished by law. If you bow, beg, and grovel for him, I'll kick you out of my way like a stray dog.",
      },
      {
        speaker: "Metellus",
        original: "Is there no voice more worthy than my own\nTo sound more sweetly in great Caesar's ear\nFor the repealing of my brother's banishment?",
        modern: "Is there no one whose voice matters more than mine to plead for reversing my brother's banishment?",
      },
      {
        speaker: "Brutus",
        stageDirection: "Kneeling",
        original: "I kiss thy hand, but not in flattery, Caesar;\nDesiring thee that Publius Cimber may\nHave an immediate freedom of repeal.",
        modern: "I kiss your hand — not to flatter you, Caesar — asking that Publius Cimber be allowed to return from exile immediately.",
      },
      {
        speaker: "Caesar",
        original: "What, Brutus!",
        modern: "What — even you, Brutus!",
      },
      {
        speaker: "Cassius",
        stageDirection: "Kneeling",
        original: "Pardon, Caesar; Caesar, pardon:\nAs low as to thy foot doth Cassius fall,\nTo beg enfranchisement for Publius Cimber.",
        modern: "Pardon, Caesar — Cassius falls as low as your feet to beg for Publius Cimber's freedom.",
      },
      {
        speaker: "Caesar",
        original: "I could be well moved, if I were as you:\nIf I could pray to move, prayers would move me:\nBut I am constant as the northern star,\nOf whose true-fix'd and resting quality\nThere is no fellow in the firmament.\nThe skies are painted with unnumber'd sparks,\nThey are all fire and every one doth shine,\nBut there's but one in all doth hold his place:\nSo in the world; 'tis furnish'd well with men,\nAnd men are flesh and blood, and apprehensive;\nYet in the number I do know but one\nThat unassailable holds his rank,\nUnshaked of motion: and that I am he.",
        modern: "I could be swayed if I were like you. If I begged others, then begging would work on me. But I am as constant as the North Star — there is no other star in the sky as fixed and steady. The heavens are full of countless sparks, all bright and shining, but only one holds its position. So it is with men — the world is full of them, all flesh and blood and feeling, yet I know only one who holds his ground, unshakeable. And that one is me.",
      },
      {
        speaker: "Casca",
        stageDirection: "First to stab Caesar",
        original: "Speak, hands, for me!",
        modern: "Let my dagger do the talking!",
      },
      {
        speaker: "Caesar",
        original: "Et tu, Brute! Then fall, Caesar!",
        modern: "Even you, Brutus! Then let Caesar die!",
      },
      {
        speaker: "Cinna",
        original: "Liberty! Freedom! Tyranny is dead!\nRun hence, proclaim, cry it about the streets.",
        modern: "Liberty! Freedom! The tyrant is dead! Run — announce it — shout it in the streets.",
      },
      {
        speaker: "Brutus",
        original: "People and senators, be not affrighted;\nFly not; stand still: ambition's debt is paid.",
        modern: "People and senators, don't be afraid. Don't run — stay where you are. Ambition has received its punishment.",
      },
      {
        speaker: "Cassius",
        original: "Some to the common pulpits, and cry out\n'Liberty, freedom, and enfranchisement!'",
        modern: "Go to the public platforms and shout 'Liberty, freedom, and rights for the people!'",
      },
      {
        speaker: "Brutus",
        original: "Stoop, Romans, stoop,\nAnd let us bathe our hands in Caesar's blood\nUp to the elbows, and besmear our swords:\nThen walk we forth, even to the marketplace,\nAnd, waving our red weapons o'er our heads,\nLet's all cry 'Peace, freedom and liberty!'",
        modern: "Kneel, Romans, kneel — let us wash our hands in Caesar's blood up to the elbows and smear our swords. Then we'll walk to the marketplace, waving our bloody weapons over our heads, crying 'Peace, freedom, and liberty!'",
      },
      {
        speaker: "Cassius",
        original: "How many ages hence\nShall this our lofty scene be acted over\nIn states unborn and accents yet unknown!",
        modern: "How many ages from now will this noble scene be re-enacted in countries not yet founded and languages not yet spoken!",
      },
      {
        speaker: "Brutus",
        original: "How many times shall Caesar bleed in sport,\nThat now on Pompey's basis lies along\nNo worthier than the dust!",
        modern: "How many times will Caesar bleed again in plays, he who now lies at the base of Pompey's statue, no more important than the dust!",
      },
      {
        speaker: "Antony",
        stageDirection: "Entering, seeing Caesar's body",
        original: "O mighty Caesar! dost thou lie so low?\nAre all thy conquests, glories, triumphs, spoils,\nShrunk to this little measure? Fare thee well.",
        modern: "O mighty Caesar! Do you lie so low? Have all your conquests, glories, triumphs, and prizes shrunk to this tiny space? Farewell.",
      },
      {
        speaker: "Antony",
        original: "I know not, gentlemen, what you intend,\nWho else must be let blood, who else is rank:\nIf I myself, there is no hour so fit\nAs Caesar's death hour, nor no instrument\nOf half that worth as those your swords, made rich\nWith the most noble blood of all this world.",
        modern: "I don't know, gentlemen, what you plan — who else must bleed, who else you consider corrupt. If you mean me, there is no better time than the hour of Caesar's death, and no better weapons than your swords, enriched with the noblest blood in the world.",
      },
      {
        speaker: "Brutus",
        original: "O Antony, beg not your death of us.\nThough now we must appear bloody and cruel,\nAs, by our hands and this our present act,\nYou see we do, yet see you but our hands\nAnd this the bleeding business they have done:\nOur hearts you see not; they are pitiful.",
        modern: "O Antony, don't beg us for death. Though we must look bloody and cruel, as you can see from our hands and this act, you only see our hands and the bloody deed they've done. You cannot see our hearts — they are full of pity.",
      },
      {
        speaker: "Antony",
        original: "I doubt not of your wisdom.\nLet each man render me his bloody hand:\nFirst, Marcus Brutus, will I shake with you.",
        modern: "I don't doubt your wisdom. Let me shake each of your bloody hands. First, Marcus Brutus, I'll shake with you.",
      },
      {
        speaker: "Antony",
        original: "That I did love thee, Caesar, O, 'tis true:\nIf then thy spirit look upon us now,\nShall it not grieve thee dearer than thy death,\nTo see thy Antony making his peace,\nShaking the bloody fingers of thy foes,\nMost noble! in the presence of thy corse?",
        modern: "That I loved you, Caesar — oh, it's true. If your spirit is watching us now, won't it grieve you more than your death to see your Antony making peace, shaking the bloody hands of your enemies, right next to your corpse?",
      },
      {
        speaker: "Antony",
        original: "I do beseech ye, if you bear me hard,\nNow, whilst your purpled hands do reek and smoke,\nFulfil your pleasure. Live a thousand years,\nI shall not find myself so apt to die.",
        modern: "I beg you — if you hold a grudge against me, do it now while your purple hands still steam with blood. Even if I lived a thousand years, I'd never find a more fitting time to die.",
      },
      {
        speaker: "Brutus",
        original: "You shall not in his funeral speech blame us,\nBut speak all good you can devise of Caesar,\nAnd say you do't by our permission.",
        modern: "You must not blame us in your funeral speech. Speak all the good you can think of about Caesar, and say you do so with our permission.",
      },
      {
        speaker: "Antony",
        stageDirection: "Alone with Caesar's body",
        original: "O, pardon me, thou bleeding piece of earth,\nThat I am meek and gentle with these butchers!\nThou art the ruins of the noblest man\nThat ever lived in the tide of times.\nWoe to the hand that shed this costly blood!\nOver thy wounds now do I prophesy,—\nA curse shall light upon the limbs of men;\nDomestic fury and fierce civil strife\nShall cumber all the parts of Italy.",
        modern: "O forgive me, you bleeding piece of earth, for being meek and gentle with these butchers! You are the remains of the noblest man who ever lived. Woe to the hands that shed this precious blood! Over your wounds I now prophesy — a curse shall fall upon all of humanity. Internal rage and fierce civil war shall burden all of Italy.",
      },
    ],
  },
  {
    act: 3,
    scene: 2,
    title: "The Funeral Speeches",
    openingDirection: "The Forum. Enter Brutus and Cassius, and a throng of Citizens.",
    lines: [
      {
        speaker: "Brutus",
        original: "Romans, countrymen, and lovers! hear me for my\ncause, and be silent, that you may hear: believe me\nfor mine honour, and have respect to mine honour, that\nyou may believe.",
        modern: "Romans, countrymen, and friends! Listen to my reasons, and be quiet so you can hear. Trust me because of my honour, and respect my honour so you can trust me.",
      },
      {
        speaker: "Brutus",
        original: "If there be any in this assembly, any dear friend of\nCaesar's, to him I say, that Brutus' love to Caesar\nwas no less than his. If then that friend demand\nwhy Brutus rose against Caesar, this is my answer:\nnot that I loved Caesar less, but that I loved\nRome more.",
        modern: "If there is anyone here who was a dear friend of Caesar, I tell him that Brutus loved Caesar just as much. If that friend asks why Brutus turned against Caesar, here is my answer: not that I loved Caesar less, but that I loved Rome more.",
      },
      {
        speaker: "Brutus",
        original: "Had you rather Caesar were living and\ndie all slaves, than that Caesar were dead, to live\nall free men? As Caesar loved me, I weep for him;\nas he was fortunate, I rejoice at it; as he was\nvaliant, I honour him: but, as he was ambitious, I\nslew him.",
        modern: "Would you rather Caesar were alive and you all die as slaves, or that Caesar is dead and you all live as free men? Because Caesar loved me, I weep for him; because he was fortunate, I celebrate; because he was brave, I honour him — but because he was ambitious, I killed him.",
      },
      {
        speaker: "Citizens",
        original: "Let him be Caesar!\nCaesar's better parts\nShall be crown'd in Brutus!",
        modern: "Make him Caesar! The best parts of Caesar shall be crowned in Brutus!",
      },
      {
        speaker: "Brutus",
        original: "Good countrymen, let me depart alone,\nAnd, for my sake, stay here with Antony:\nDo grace to Caesar's corpse, and grace his speech.",
        modern: "Good countrymen, let me leave alone. For my sake, stay here with Antony. Show respect to Caesar's body and listen respectfully to his speech.",
      },
      {
        speaker: "Antony",
        original: "Friends, Romans, countrymen, lend me your ears;\nI come to bury Caesar, not to praise him.\nThe evil that men do lives after them;\nThe good is oft interred with their bones;\nSo let it be with Caesar.",
        modern: "Friends, Romans, countrymen — lend me your ears. I come to bury Caesar, not to praise him. The evil that men do lives on after them; the good is often buried with their bones. So let it be with Caesar.",
      },
      {
        speaker: "Antony",
        original: "The noble Brutus\nHath told you Caesar was ambitious:\nIf it were so, it was a grievous fault,\nAnd grievously hath Caesar answer'd it.\nHere, under leave of Brutus and the rest—\nFor Brutus is an honourable man;\nSo are they all, all honourable men—\nCome I to speak in Caesar's funeral.",
        modern: "The noble Brutus has told you Caesar was ambitious. If that's true, it was a serious fault, and Caesar has paid dearly for it. Here, with the permission of Brutus and the others — for Brutus is an honourable man, and so are they all, all honourable men — I come to speak at Caesar's funeral.",
      },
      {
        speaker: "Antony",
        original: "He was my friend, faithful and just to me:\nBut Brutus says he was ambitious;\nAnd Brutus is an honourable man.\nHe hath brought many captives home to Rome\nWhose ransoms did the general coffers fill:\nDid this in Caesar seem ambitious?\nWhen that the poor have cried, Caesar hath wept:\nAmbition should be made of sterner stuff:\nYet Brutus says he was ambitious;\nAnd Brutus is an honourable man.",
        modern: "He was my friend, faithful and just to me. But Brutus says he was ambitious — and Brutus is an honourable man. He brought many prisoners home to Rome whose ransoms filled the public treasury. Did that seem ambitious? When the poor cried, Caesar wept. Ambition should be made of harder stuff. Yet Brutus says he was ambitious — and Brutus is an honourable man.",
      },
      {
        speaker: "Antony",
        original: "You all did see that on the Lupercal\nI thrice presented him a kingly crown,\nWhich he did thrice refuse: was this ambition?\nYet Brutus says he was ambitious;\nAnd, sure, he is an honourable man.",
        modern: "You all saw that at the Lupercal festival I offered him a crown three times, and three times he refused it. Was that ambition? Yet Brutus says he was ambitious — and surely, he is an honourable man.",
      },
      {
        speaker: "Antony",
        original: "I speak not to disprove what Brutus spoke,\nBut here I am to speak what I do know.\nYou all did love him once, not without cause:\nWhat cause withholds you then, to mourn for him?\nO judgment! thou art fled to brutish beasts,\nAnd men have lost their reason. Bear with me;\nMy heart is in the coffin there with Caesar,\nAnd I must pause till it come back to me.",
        modern: "I'm not here to disprove what Brutus said, but to speak what I know. You all loved him once, and for good reason. What reason stops you from mourning him now? O good judgment — you have fled to animals, and men have lost their minds. Bear with me; my heart is in that coffin with Caesar, and I must pause until it comes back to me.",
      },
      {
        speaker: "First Citizen",
        original: "Methinks there is much reason in his sayings.",
        modern: "I think he makes a lot of sense.",
      },
      {
        speaker: "Second Citizen",
        original: "If thou consider rightly of the matter,\nCaesar has had great wrong.",
        modern: "If you think about it properly, Caesar has been greatly wronged.",
      },
      {
        speaker: "Antony",
        original: "But yesterday the word of Caesar might\nHave stood against the world; now lies he there.\nAnd none so poor to do him reverence.\nO masters, if I were disposed to stir\nYour hearts and minds to mutiny and rage,\nI should do Brutus wrong, and Cassius wrong,\nWho, you all know, are honourable men:\nI will not do them wrong; I rather choose\nTo wrong the dead, to wrong myself and you,\nThan I will wrong such honourable men.",
        modern: "Only yesterday, Caesar's word could have stood against the entire world. Now he lies there, and no one — not even the lowliest — shows him respect. O friends, if I wanted to stir your hearts to mutiny and rage, I would be wronging Brutus and Cassius, who as you know are honourable men. I won't wrong them. I'd rather wrong the dead, myself, and you, than wrong such honourable men.",
      },
      {
        speaker: "Antony",
        original: "But here's a parchment with the seal of Caesar;\nI found it in his closet, 'tis his will:\nLet but the commons hear this testament—\nWhich, pardon me, I do not mean to read—\nAnd they would go and kiss dead Caesar's wounds\nAnd dip their napkins in his sacred blood.",
        modern: "But here is a document with Caesar's seal — I found it in his room, it's his will. If only the common people heard this will — which, forgive me, I don't intend to read — they would go kiss dead Caesar's wounds and dip their handkerchiefs in his sacred blood.",
      },
      {
        speaker: "Citizens",
        original: "The will, the will! we will hear Caesar's will.",
        modern: "The will! The will! We want to hear Caesar's will!",
      },
      {
        speaker: "Antony",
        original: "If you have tears, prepare to shed them now.\nYou all do know this mantle: I remember\nThe first time ever Caesar put it on;\n'Twas on a summer's evening, in his tent,\nThat day he overcame the Nervii.\nLook, in this place ran Cassius' dagger through:\nSee what a rent the envious Casca made:\nThrough this the well-beloved Brutus stabb'd;\nAnd as he pluck'd his cursed steel away,\nMark how the blood of Caesar follow'd it.",
        modern: "If you have tears, prepare to shed them now. You all recognise this cloak. I remember the first time Caesar put it on — it was a summer evening, in his tent, the day he defeated the Nervii tribe. Look — here is where Cassius's dagger went through. See what a tear the envious Casca made. Through this hole, the beloved Brutus stabbed — and as he pulled his cursed blade away, see how Caesar's blood followed it.",
      },
      {
        speaker: "Antony",
        original: "For Brutus, as you know, was Caesar's angel:\nJudge, O you gods, how dearly Caesar loved him!\nThis was the most unkindest cut of all;\nFor when the noble Caesar saw him stab,\nIngratitude, more strong than traitors' arms,\nQuite vanquish'd him: then burst his mighty heart.",
        modern: "For Brutus, as you know, was Caesar's favourite. Judge, O gods, how dearly Caesar loved him! This was the cruellest cut of all — for when noble Caesar saw Brutus stab him, ingratitude, stronger than the traitors' weapons, completely defeated him. Then his mighty heart burst.",
      },
      {
        speaker: "Antony",
        original: "Good friends, sweet friends, let me not stir you up\nTo such a sudden flood of mutiny.\nThey that have done this deed are honourable:\nWhat private griefs they have, alas, I know not,\nThat made them do it: they are wise and honourable,\nAnd will, no doubt, with reasons answer you.",
        modern: "Good friends, sweet friends — let me not stir you to a sudden flood of mutiny. Those who did this deed are honourable. What personal grievances they had, I don't know. They are wise and honourable, and will no doubt answer you with reasons.",
      },
      {
        speaker: "Antony",
        original: "Here is the will, and under Caesar's seal.\nTo every Roman citizen he gives,\nTo every several man, seventy-five drachmas.",
        modern: "Here is the will, sealed by Caesar himself. To every Roman citizen, to every single man, he gives seventy-five drachmas (silver coins).",
      },
      {
        speaker: "Citizens",
        original: "Most noble Caesar! We'll revenge his death!",
        modern: "Most noble Caesar! We'll avenge his death!",
      },
      {
        speaker: "Antony",
        original: "Moreover, he hath left you all his walks,\nHis private arbours and new-planted orchards,\nOn this side Tiber; he hath left them you,\nAnd to your heirs for ever, common pleasures,\nTo walk abroad, and recreate yourselves.\nHere was a Caesar! when comes such another?",
        modern: "Moreover, he has left you all his gardens, his private walks and newly planted orchards on this side of the Tiber River. He has left them to you and your heirs forever, as public parks to walk in and enjoy. Here was a Caesar! When will there ever be another like him?",
      },
      {
        speaker: "Citizens",
        original: "Never, never! Come, away, away!\nWe'll burn his body in the holy place,\nAnd with the brands fire the traitors' houses.",
        modern: "Never, never! Come — let's go! We'll burn his body in the sacred place and use the burning wood to set fire to the traitors' houses.",
      },
      {
        speaker: "Antony",
        stageDirection: "Alone",
        original: "Now let it work. Mischief, thou art afoot,\nTake thou what course thou wilt!",
        modern: "Now let it take effect. Chaos, you are set in motion — take whatever path you choose!",
      },
    ],
  },
  {
    act: 3,
    scene: 3,
    title: "The Mob Kills Cinna the Poet",
    openingDirection: "A street. Enter Cinna the Poet.",
    lines: [
      {
        speaker: "Cinna the Poet",
        original: "I dreamt to-night that I did feast with Caesar,\nAnd things unluckily charge my fantasy:\nI have no will to wander forth of doors,\nYet something leads me forth.",
        modern: "I dreamt tonight that I was feasting with Caesar, and unlucky thoughts weigh on my imagination. I have no desire to go outside, yet something draws me out.",
      },
      {
        speaker: "First Citizen",
        original: "What is your name?",
        modern: "What's your name?",
      },
      {
        speaker: "Cinna the Poet",
        original: "My name is Cinna.",
        modern: "My name is Cinna.",
      },
      {
        speaker: "First Citizen",
        original: "Tear him to pieces; he's a conspirator!",
        modern: "Tear him apart — he's one of the conspirators!",
      },
      {
        speaker: "Cinna the Poet",
        original: "I am Cinna the poet, I am Cinna the poet!",
        modern: "I am Cinna the poet! I am Cinna the poet!",
      },
      {
        speaker: "Third Citizen",
        original: "Tear him for his bad verses, tear him for his bad verses!",
        modern: "Tear him up for his bad poetry! Tear him up for his bad poetry!",
      },
      {
        speaker: "Cinna the Poet",
        original: "I am not Cinna the conspirator!",
        modern: "I'm not Cinna the conspirator!",
      },
      {
        speaker: "Second Citizen",
        original: "It is no matter, his name's Cinna; pluck but his\nname out of his heart, and turn him going.",
        modern: "It doesn't matter — his name is Cinna. Rip the name right out of his heart and send him on his way.",
      },
      {
        speaker: "Citizens",
        original: "Come, brands, ho! fire-brands! To Brutus', to\nCassius'; burn all! Some to Decius' house, and\nsome to Casca's; some to Ligarius': away, go!",
        modern: "Come, torches! Firebrands! To Brutus's house! To Cassius's! Burn everything! Some go to Decius's house, some to Casca's, some to Ligarius's! Go!",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ACT 4
  // ═══════════════════════════════════════════════════════════════════════
  {
    act: 4,
    scene: 1,
    title: "The Triumvirate Plans",
    openingDirection: "A house in Rome. Antony, Octavius, and Lepidus, seated at a table.",
    lines: [
      {
        speaker: "Antony",
        original: "These many, then, shall die; their names are prick'd.",
        modern: "All these people, then, shall die — their names are marked on the list.",
      },
      {
        speaker: "Octavius",
        original: "Your brother too must die; consent you, Lepidus?",
        modern: "Your brother must die too. Do you agree, Lepidus?",
      },
      {
        speaker: "Lepidus",
        original: "I do consent—",
        modern: "I agree—",
      },
      {
        speaker: "Octavius",
        original: "Prick him down, Antony.",
        modern: "Mark his name down, Antony.",
      },
      {
        speaker: "Lepidus",
        original: "Upon condition Publius shall not live,\nWho is your sister's son, Mark Antony.",
        modern: "On the condition that Publius doesn't survive either — he's your sister's son, Mark Antony.",
      },
      {
        speaker: "Antony",
        original: "He shall not live; look, with a spot I damn him.",
        modern: "He won't survive. Look — with a mark I condemn him to death.",
      },
      {
        speaker: "Antony",
        stageDirection: "After Lepidus exits",
        original: "This is a slight unmeritable man,\nMeet to be sent on errands: is it fit,\nThe three-fold world divided, he should stand\nOne of the three to share it?",
        modern: "This is a worthless, insignificant man, only fit to run errands. Is it right that when the world is divided three ways, he should stand as one of the three who share it?",
      },
      {
        speaker: "Octavius",
        original: "You may do your will;\nBut he's a tried and valiant soldier.",
        modern: "You can do as you like, but he's a proven and brave soldier.",
      },
      {
        speaker: "Antony",
        original: "So is my horse, Octavius; and for that\nI do appoint him store of provender:\nIt is a creature that I teach to fight,\nTo wind, to stop, to run directly on,\nHis corporal motion govern'd by my spirit.\nAnd, in some taste, is Lepidus but so;\nHe must be taught and train'd and bid go forth;\nA barren-spirited fellow; one that feeds\nOn abjects, orts and imitations.",
        modern: "So is my horse, Octavius — and for that I give it plenty of feed. It's a creature I train to fight, to turn, to stop, to charge straight ahead, its physical movements governed by my will. And in a way, Lepidus is just the same — he must be taught, trained, and told what to do. He's a dull, unimaginative fellow who feeds on leftovers and second-hand ideas.",
      },
      {
        speaker: "Octavius",
        original: "But, Antony, our great enemies are mustering.\nLet us make haste together and determine\nHow covert matters may be best disclosed,\nAnd open perils surest answer'd.",
        modern: "But, Antony — our great enemies are gathering their forces. Let's hurry and decide together how to uncover hidden plots and deal with the dangers we face.",
      },
    ],
  },
  {
    act: 4,
    scene: 2,
    title: "Brutus and Cassius Quarrel (Outside the Tent)",
    openingDirection: "Camp near Sardis. Before Brutus's tent. Drum. Enter Brutus, Lucilius, Lucius, and soldiers; Titinius and Pindarus meet them.",
    lines: [
      {
        speaker: "Brutus",
        original: "Stand, ho!",
        modern: "Halt!",
      },
      {
        speaker: "Lucilius",
        original: "He greets me well. Your master, Pindarus,\nIn his own change, or by ill officers,\nHath given me some worthy cause to wish\nThings done, undone.",
        modern: "He greets me politely. But your master, Pindarus — whether it's a change in him or through bad officers — has given me good reason to wish some things had not been done.",
      },
      {
        speaker: "Brutus",
        original: "Thou hast described\nA hot friend cooling: ever note, Lucilius,\nWhen love begins to sicken and decay,\nIt useth an enforced ceremony.\nThere are no tricks in plain and simple faith.",
        modern: "You've described a warm friend growing cold. Always remember, Lucilius — when friendship begins to weaken and fade, it uses forced, stiff politeness. True, simple loyalty has no need for such tricks.",
      },
      {
        speaker: "Cassius",
        stageDirection: "Entering",
        original: "Most noble brother, you have done me wrong.",
        modern: "Most noble brother, you have wronged me.",
      },
      {
        speaker: "Brutus",
        original: "Judge me, you gods! wrong I mine enemies?\nAnd, if not so, how should I wrong a brother?",
        modern: "Gods, judge me! Do I even wrong my enemies? And if not, how could I wrong a brother?",
      },
      {
        speaker: "Cassius",
        original: "Brutus, this sober form of yours hides wrongs;\nAnd when you do them—",
        modern: "Brutus, this calm manner of yours hides wrongdoing, and when you do wrong—",
      },
      {
        speaker: "Brutus",
        original: "Cassius, be content.\nSpeak your griefs softly: I do know you well.\nBefore the eyes of both our armies here,\nWhich should perceive nothing but love from us,\nLet us not wrangle: bid them move away;\nThen in my tent, Cassius, enlarge your griefs,\nAnd I will give you audience.",
        modern: "Cassius, calm down. Speak your complaints quietly. I know you well. In front of both our armies, who should see nothing but friendship between us, let's not quarrel. Tell them to move away. Then in my tent, Cassius, air your grievances fully, and I will listen.",
      },
    ],
  },
  {
    act: 4,
    scene: 3,
    title: "The Quarrel and Caesar's Ghost",
    openingDirection: "Within Brutus's tent.",
    lines: [
      {
        speaker: "Cassius",
        original: "That you have wrong'd me doth appear in this:\nYou have condemn'd and noted Lucius Pella\nFor taking bribes here of the Sardians;\nWherein my letters, praying on his side,\nBecause I knew the man, were slighted off.",
        modern: "That you've wronged me is clear from this: you condemned and publicly disgraced Lucius Pella for taking bribes from the Sardians, even though my letters defending him — because I knew the man — were ignored.",
      },
      {
        speaker: "Brutus",
        original: "You wrong'd yourself to write in such a case.",
        modern: "You wronged yourself by writing in defence of such a case.",
      },
      {
        speaker: "Cassius",
        original: "In such a time as this it is not meet\nThat every nice offence should bear his comment.",
        modern: "In times like these, it's not appropriate that every minor offence should be punished.",
      },
      {
        speaker: "Brutus",
        original: "Let me tell you, Cassius, you yourself\nAre much condemn'd to have an itching palm;\nTo sell and mart your offices for gold\nTo undeservers.",
        modern: "Let me tell you, Cassius — you yourself are widely condemned for having greedy hands, for selling your official positions for gold to people who don't deserve them.",
      },
      {
        speaker: "Cassius",
        original: "I an itching palm!\nYou know that you are Brutus that speak this,\nOr, by the gods, this speech were else your last.",
        modern: "Me, greedy! You'd better be glad you're Brutus saying this — or by the gods, those would be your last words.",
      },
      {
        speaker: "Brutus",
        original: "The name of Cassius honours this corruption,\nAnd chastisement doth therefore hide his head.",
        modern: "The name of Cassius gives a respectable cover to this corruption, and so punishment hides its face.",
      },
      {
        speaker: "Cassius",
        original: "Chastisement!",
        modern: "Punishment!",
      },
      {
        speaker: "Brutus",
        original: "Remember March, the ides of March remember:\nDid not great Julius bleed for justice' sake?\nWhat villain touch'd his body, that did stab,\nAnd not for justice? O, I myself, what shall I say?\nShall we now contaminate our fingers\nWith base bribes, and sell the mighty space\nOf our large honours for so much trash\nAs may be grasped thus? I had rather be a dog,\nAnd bay the moon, than such a Roman.",
        modern: "Remember March — remember the Ides of March! Didn't great Julius bleed for the sake of justice? Was any villain who stabbed him doing it for anything other than justice? What can I say about myself? Shall we now dirty our hands with cheap bribes, and sell the great space of our honours for as much worthless money as you can hold in your fist? I'd rather be a dog howling at the moon than that kind of Roman.",
      },
      {
        speaker: "Cassius",
        original: "I denied you not.",
        modern: "I didn't refuse you.",
      },
      {
        speaker: "Brutus",
        original: "You did.",
        modern: "You did.",
      },
      {
        speaker: "Cassius",
        original: "I did not: he was but a fool that brought\nMy answer back. Brutus hath rived my heart:\nA friend should bear his friend's infirmities,\nBut Brutus makes mine greater than they are.",
        modern: "I did not — the messenger who brought my answer was a fool. Brutus has broken my heart. A friend should tolerate his friend's weaknesses, but Brutus makes mine seem worse than they are.",
      },
      {
        speaker: "Brutus",
        original: "I do not, till you practise them on me.",
        modern: "I don't — until you use them against me.",
      },
      {
        speaker: "Cassius",
        original: "Come, Antony, and young Octavius, come,\nRevenge yourselves alone on Cassius,\nFor Cassius is aweary of the world;\nHated by one he loves; braved by his brother;\nCheck'd like a bondman; all his faults observed,\nSet in a note-book, learn'd, and conn'd by rote,\nTo cast into my teeth. O, I could weep\nMy spirit from mine eyes! There is my dagger,\nAnd here my naked breast; within, a heart\nDearer than Plutus' mine, richer than gold:\nIf that thou be'st a Roman, take it forth.",
        modern: "Come, Antony and young Octavius — take your revenge on Cassius alone, for Cassius is weary of the world. Hated by the one he loves, defied by his brother, scolded like a slave — all my faults observed, written down, memorized, and thrown in my face. O, I could weep my soul from my eyes! Here is my dagger, and here is my bare chest; inside is a heart more precious than Plutus's gold mine, richer than gold. If you're truly a Roman, take it out.",
      },
      {
        speaker: "Brutus",
        original: "Sheathe your dagger:\nBe angry when you will, it shall have scope;\nDo what you will, dishonour shall be humour.\nO Cassius, you are yoked with a lamb\nThat carries anger as the flint bears fire;\nWho, much enforced, shows a hasty spark,\nAnd straight is cold again.",
        modern: "Put your dagger away. Be angry when you want — I'll allow it. Do what you will — I'll treat your dishonour as a mood. O Cassius, you are paired with a gentle soul who carries anger like flint holds fire — when struck hard, it shows a quick spark, and then immediately goes cold again.",
      },
      {
        speaker: "Brutus",
        original: "O Cassius, I am sick of many griefs.",
        modern: "O Cassius, I am weighed down by many sorrows.",
      },
      {
        speaker: "Cassius",
        original: "Of your philosophy you make no use,\nIf you give place to accidental evils.",
        modern: "Your philosophy is useless if you let random misfortunes get to you.",
      },
      {
        speaker: "Brutus",
        original: "No man bears sorrow better. Portia is dead.",
        modern: "No man handles sorrow better than I do. Portia is dead.",
      },
      {
        speaker: "Cassius",
        original: "Ha! Portia!",
        modern: "What! Portia!",
      },
      {
        speaker: "Brutus",
        original: "She is dead.",
        modern: "She is dead.",
      },
      {
        speaker: "Cassius",
        original: "How 'scaped I killing when I cross'd you so?\nO insupportable and touching loss!",
        modern: "How did I escape being killed when I pushed you so far? O unbearable and heartbreaking loss!",
      },
      {
        speaker: "Brutus",
        original: "Impatient of my absence,\nAnd grief that young Octavius with Mark Antony\nHave made themselves so strong — for with her death\nThat tidings came — with this she fell distract,\nAnd, her attendants absent, swallow'd fire.",
        modern: "Unable to bear my absence, and grieved that young Octavius and Mark Antony had grown so powerful — that news came along with the news of her death — she went mad, and with her servants away, she swallowed hot coals.",
      },
      {
        speaker: "Brutus",
        original: "Well, to our work alive. What do you think\nOf marching to Philippi presently?",
        modern: "Well, let's turn to the work of the living. What do you think of marching to Philippi right away?",
      },
      {
        speaker: "Cassius",
        original: "I do not think it good.",
        modern: "I don't think that's a good idea.",
      },
      {
        speaker: "Brutus",
        original: "Your reason?",
        modern: "What's your reason?",
      },
      {
        speaker: "Cassius",
        original: "'Tis better that the enemy seek us:\nSo shall he waste his means, weary his soldiers,\nDoing himself offence; whilst we, lying still,\nAre full of rest, defence and nimbleness.",
        modern: "It's better to let the enemy come to us. That way he'll waste his resources, tire his soldiers, and harm his own position, while we stay rested, well-defended, and agile.",
      },
      {
        speaker: "Brutus",
        original: "Good reasons must, of force, give place to better.\nThe people 'twixt Philippi and this ground\nDo stand but in a forced affection;\nFor they have grudged us contribution:\nThe enemy, marching along by them,\nBy them shall make a fuller number up,\nCome on refresh'd, new-added, and encouraged;\nFrom which advantage shall we cut him off,\nIf at Philippi we do face him there.\nThere is a tide in the affairs of men,\nWhich, taken at the flood, leads on to fortune;\nOmitted, all the voyage of their life\nIs bound in shallows and in miseries.\nOn such a full sea are we now afloat,\nAnd we must take the current when it serves,\nOr lose our ventures.",
        modern: "Good reasons must give way to better ones. The people between Philippi and here only support us reluctantly — they've resented our demands for supplies. The enemy, marching through their territory, will recruit more soldiers, arriving refreshed, reinforced, and encouraged. We can cut off that advantage if we face him at Philippi. There is a tide in the affairs of men which, taken at its peak, leads to fortune. If missed, the rest of life's journey is stuck in shallows and misery. We are now afloat on such a full tide, and we must ride the current while it serves us, or lose everything.",
      },
      {
        speaker: "Ghost of Caesar",
        stageDirection: "Appearing to Brutus",
        original: "Thy evil spirit, Brutus.",
        modern: "I am your evil spirit, Brutus.",
      },
      {
        speaker: "Brutus",
        original: "Why comest thou?",
        modern: "Why have you come?",
      },
      {
        speaker: "Ghost of Caesar",
        original: "To tell thee thou shalt see me at Philippi.",
        modern: "To tell you that you shall see me again at Philippi.",
      },
      {
        speaker: "Brutus",
        original: "Well; then I shall see thee again?",
        modern: "Very well — then I shall see you again?",
      },
      {
        speaker: "Ghost of Caesar",
        original: "Ay, at Philippi.",
        modern: "Yes, at Philippi.",
      },
      {
        speaker: "Brutus",
        original: "Why, I will see thee at Philippi, then.",
        modern: "Then I will see you at Philippi.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ACT 5
  // ═══════════════════════════════════════════════════════════════════════
  {
    act: 5,
    scene: 1,
    title: "Before the Battle of Philippi",
    openingDirection: "The plains of Philippi. Enter Octavius, Antony, and their army.",
    lines: [
      {
        speaker: "Octavius",
        original: "Now, Antony, our hopes are answered:\nYou said the enemy would not come down,\nBut keep the hills and upper regions;\nIt proves not so: their battles are at hand;\nThey mean to warn us at Philippi here,\nAnswering before we do demand of them.",
        modern: "Now, Antony, our hopes are confirmed. You said the enemy wouldn't come down but would stay in the hills. That's not the case — their forces are nearby. They intend to challenge us here at Philippi, meeting us before we even demand it.",
      },
      {
        speaker: "Antony",
        original: "Tut, I am in their bosoms, and I know\nWherefore they do it: they could be content\nTo visit other places; and come down\nWith fearful bravery, thinking by this face\nTo fasten in our thoughts that they have courage;\nBut 'tis not so.",
        modern: "Bah — I know what's in their hearts and why they do it. They'd rather be elsewhere. They come down with frightened bravery, hoping this show of force will convince us they have courage. But it's not so.",
      },
      {
        speaker: "Brutus",
        stageDirection: "Meeting the opposing generals",
        original: "Words before blows: is it so, countrymen?",
        modern: "Words before fighting — is that how it is, countrymen?",
      },
      {
        speaker: "Octavius",
        original: "Not that we love words better, as you do.",
        modern: "Not because we prefer words over action, the way you do.",
      },
      {
        speaker: "Brutus",
        original: "Good words are better than bad strokes, Octavius.",
        modern: "Good words are better than bad sword strikes, Octavius.",
      },
      {
        speaker: "Antony",
        original: "In your bad strokes, Brutus, you give good words:\nWitness the hole you made in Caesar's heart,\nCrying 'Long live! hail, Caesar!'",
        modern: "With your bad sword strokes, Brutus, you give good words — witness the hole you made in Caesar's heart while crying 'Long live Caesar! Hail, Caesar!'",
      },
      {
        speaker: "Cassius",
        original: "Antony,\nThe posture of your blows are yet unknown;\nBut for your words, they rob the Hybla bees,\nAnd leave them honeyless.",
        modern: "Antony, we haven't seen the strength of your blows yet, but as for your words — they steal from the famous Hybla bees and leave them without honey (your words are sweet but deceptive).",
      },
      {
        speaker: "Antony",
        original: "Not stingless too.",
        modern: "But not stingless, either.",
      },
      {
        speaker: "Octavius",
        original: "Come, come, the cause. If arguing make us sweat,\nThe proof of it shall turn to redder drops.\nLook; I draw a sword against conspirators;\nWhen think you that the sword goes up again?\nNever, till Caesar's three and thirty wounds\nBe well avenged; or till another Caesar\nHave added slaughter to the sword of traitors.",
        modern: "Come, let's get to the point. If arguing makes us sweat, the real fight will turn that sweat to blood. Look — I draw my sword against conspirators. When do you think this sword will be sheathed? Never — until Caesar's thirty-three wounds are fully avenged, or until another Caesar has been added to the traitors' kill count.",
      },
      {
        speaker: "Brutus",
        stageDirection: "Speaking privately with Cassius",
        original: "No, Cassius, no: think not, thou noble Roman,\nThat ever Brutus will go bound to Rome;\nHe bears too great a mind. But this same day\nMust end that work the ides of March begun;\nAnd whether we shall meet again I know not.\nTherefore our everlasting farewell take:\nFor ever, and for ever, farewell, Cassius!\nIf we do meet again, why, we shall smile;\nIf not, why then, this parting was well made.",
        modern: "No, Cassius — don't think, noble Roman, that Brutus will ever go to Rome in chains. His mind is too great for that. But this very day must end what the Ides of March began. Whether we shall meet again, I don't know. So let us say our eternal farewell. Forever and forever, farewell, Cassius! If we meet again, we shall smile; if not, then this parting was well done.",
      },
      {
        speaker: "Cassius",
        original: "For ever, and for ever, farewell, Brutus!\nIf we do meet again, we'll smile indeed;\nIf not, 'tis true this parting was well made.",
        modern: "Forever and forever, farewell, Brutus! If we meet again, we'll smile indeed. If not, then truly this parting was well made.",
      },
    ],
  },
  {
    act: 5,
    scene: 2,
    title: "The Battle Begins",
    openingDirection: "The field of battle. Alarum. Enter Brutus and Messala.",
    lines: [
      {
        speaker: "Brutus",
        original: "Ride, ride, Messala, ride, and give these bills\nUnto the legions on the other side.",
        modern: "Ride, Messala, ride! Deliver these orders to the legions on the other side of the field.",
      },
      {
        speaker: "Brutus",
        original: "Let them set on at once; for I perceive\nBut cold demeanour in Octavius' wing,\nAnd sudden push gives them the overthrow.\nRide, ride, Messala: let them all come down.",
        modern: "Have them attack at once — I see weakness in Octavius's flank, and a sudden charge will overthrow them. Ride, Messala — let them all charge down!",
      },
    ],
  },
  {
    act: 5,
    scene: 3,
    title: "The Death of Cassius",
    openingDirection: "Another part of the field. Alarums. Enter Cassius and Titinius.",
    lines: [
      {
        speaker: "Cassius",
        original: "O, look, Titinius, look, the villains fly!\nMyself have to mine own turn'd enemy:\nThis ensign here of mine was turning back;\nI slew the coward, and did take it from him.",
        modern: "O look, Titinius — the cowards are running! My own men have turned against me. This standard-bearer of mine was retreating — I killed the coward and took the flag from him.",
      },
      {
        speaker: "Titinius",
        original: "O Cassius, Brutus gave the word too early;\nWho, having some advantage on Octavius,\nTook it too eagerly: his soldiers fell to spoil,\nWhilst we by Antony are all enclosed.",
        modern: "O Cassius — Brutus gave the order too early. Having gained some advantage over Octavius, he pushed too eagerly. His soldiers started looting while we were surrounded by Antony.",
      },
      {
        speaker: "Cassius",
        original: "Go, Pindarus, get higher on that hill;\nMy sight was ever thick; regard Titinius,\nAnd tell me what thou notest about the field.",
        modern: "Go, Pindarus — get higher on that hill. My eyesight was always poor. Watch Titinius, and tell me what you see happening on the field.",
      },
      {
        speaker: "Pindarus",
        stageDirection: "From above",
        original: "Titinius is enclosed round about\nWith horsemen, that make to him on the spur;\nYet he spurs on. Now they are almost on him.\nNow, Titinius! Now some light. O, he lights too.\nHe's ta'en! And, hark! they shout for joy.",
        modern: "Titinius is surrounded by horsemen charging at full speed, yet he rides on. Now they're almost on him. Now, Titinius! Now some are dismounting. O, he dismounts too. He's captured! And listen — they shout for joy.",
      },
      {
        speaker: "Cassius",
        original: "Come down, behold no more.\nO, coward that I am, to live so long,\nTo see my best friend ta'en before my face!\nCome hither, sirrah:\nIn Parthia did I take thee prisoner;\nAnd then I swore thee, saving of thy life,\nThat whatsoever I did bid thee do,\nThou shouldst attempt it. Come now, keep thine oath;\nNow be a free man: and with this good sword,\nThat ran through Caesar's bowels, search this bosom.\nStand not to answer: here, take thou the hilts;\nAnd, when my face is cover'd, as 'tis now,\nGuide thou the sword.",
        modern: "Come down — don't look any more. O, what a coward I am to live so long, only to see my best friend captured before my eyes! Come here, servant. In Parthia I took you prisoner, and then I made you swear, in exchange for your life, that whatever I commanded, you would do it. Now keep your oath. Be a free man — and with this good sword that ran through Caesar's body, pierce this chest. Don't hesitate to answer — here, take the handle. And when my face is covered, as it is now, guide the sword.",
      },
      {
        speaker: "Pindarus",
        stageDirection: "Kills Cassius",
        original: "So, I am free; yet would not so have been,\nDurst I have done my will. O Cassius,\nFar from this country Pindarus shall run,\nWhere never Roman shall take note of him.",
        modern: "So — I am free. Yet I would rather not have gained my freedom this way, if I'd had the choice. O Cassius! Far from this country Pindarus will run, where no Roman will ever find him.",
      },
      {
        speaker: "Titinius",
        stageDirection: "Returning to find Cassius dead",
        original: "Why didst thou send me forth, brave Cassius?\nDid I not meet thy friends? and did not they\nPut on my brows this wreath of victory,\nAnd bid me give it thee? Didst thou not hear their shouts?\nAlas, thou hast misconstrued every thing!\nBut, hold thee, take this garland on thy brow;\nThy Pindarus shall do what he would not dare.\nBrutus, come apace,\nAnd see how I regarded Caius Cassius.\nBy your leave, gods — this is a Roman's part.\nCome, Cassius' sword, and find Titinius' heart.",
        modern: "Why did you send me away, brave Cassius? Didn't I meet your friends? Didn't they place this victory wreath on my head and tell me to give it to you? Didn't you hear their cheers? Alas — you misunderstood everything! But here — take this garland on your forehead. Your Pindarus has done what he would not have dared. Brutus, come quickly and see how I honoured Caius Cassius. With your permission, gods — this is a Roman's duty. Come, Cassius's sword, and find Titinius's heart.",
      },
      {
        speaker: "Brutus",
        stageDirection: "Finding both bodies",
        original: "Are yet two Romans living such as these?\nThe last of all the Romans, fare thee well!\nIt is impossible that ever Rome\nShould breed thy fellow. Friends, I owe more tears\nTo this dead man than you shall see me pay.\nI shall find time, Cassius, I shall find time.",
        modern: "Are there still two Romans alive like these? The last of all true Romans — fare you well! It is impossible that Rome could ever produce your equal. Friends, I owe more tears to this dead man than you will ever see me shed. I shall find the time, Cassius. I shall find the time.",
      },
    ],
  },
  {
    act: 5,
    scene: 4,
    title: "Young Cato Falls",
    openingDirection: "Another part of the field. Alarum. Enter fighting, soldiers of both armies; then Brutus, Young Cato, Lucilius, and others.",
    lines: [
      {
        speaker: "Young Cato",
        original: "What bastard doth not? Who will go with me?\nI will proclaim my name about the field:\nI am the son of Marcus Cato, ho!\nA foe to tyrants, and my country's friend;\nI am the son of Marcus Cato, ho!",
        modern: "What coward wouldn't fight? Who will go with me? I will shout my name across the battlefield! I am the son of Marcus Cato! An enemy of tyrants and a friend to my country! I am the son of Marcus Cato!",
      },
      {
        speaker: "Lucilius",
        stageDirection: "Pretending to be Brutus",
        original: "And I am Brutus, Marcus Brutus, I;\nBrutus, my country's friend; know me for Brutus!",
        modern: "And I am Brutus — Marcus Brutus! Brutus, my country's friend! Know me as Brutus!",
      },
      {
        speaker: "First Soldier",
        original: "I'll tell the news. Here comes the general.\nBrutus is ta'en, Brutus is ta'en, my lord.",
        modern: "I'll deliver the news. Here comes the general. Brutus is captured, Brutus is captured, my lord!",
      },
      {
        speaker: "Antony",
        original: "This is not Brutus, friend; but, I assure you,\nA prize no less in value: keep this man safe,\nGive him all kindness: I had rather have\nSuch men my friends than enemies.",
        modern: "This is not Brutus, friend. But I assure you, he is a prize no less valuable. Keep this man safe and treat him kindly — I would rather have men like this as friends than enemies.",
      },
    ],
  },
  {
    act: 5,
    scene: 5,
    title: "The Death of Brutus",
    openingDirection: "Another part of the field. Enter Brutus, Dardanius, Clitus, Strato, and Volumnius.",
    lines: [
      {
        speaker: "Brutus",
        original: "Come, poor remains of friends, rest on this rock.",
        modern: "Come, you poor remnants of my friends — rest on this rock.",
      },
      {
        speaker: "Brutus",
        original: "The ghost of Caesar hath appear'd to me\nTwo several times by night; at Sardis once,\nAnd, this last night, here in Philippi fields:\nI know my hour is come.",
        modern: "The ghost of Caesar has appeared to me twice at night — once at Sardis and last night here on the fields of Philippi. I know my time has come.",
      },
      {
        speaker: "Clitus",
        stageDirection: "Aside",
        original: "What, I, my lord? No, not for all the world.",
        modern: "What — me, my lord? No, not for all the world.",
      },
      {
        speaker: "Dardanius",
        stageDirection: "Aside",
        original: "Shall I do such a deed?",
        modern: "Could I really do such a thing?",
      },
      {
        speaker: "Brutus",
        original: "Farewell to you; and you; and you, Volumnius.\nStrato, thou hast been all this while asleep;\nFarewell to thee too, Strato. Countrymen,\nMy heart doth joy that yet in all my life\nI found no man but he was true to me.\nI shall have glory by this losing day\nMore than Octavius and Mark Antony\nBy this vile conquest shall attain unto.",
        modern: "Farewell to you, and you, and you, Volumnius. Strato, you've been sleeping all this time. Farewell to you too, Strato. Countrymen — my heart rejoices that in all my life I never found a man who wasn't true to me. I shall gain more glory from this day of defeat than Octavius and Mark Antony will gain from this wretched conquest.",
      },
      {
        speaker: "Brutus",
        original: "Night hangs upon mine eyes; my bones would rest,\nThat have but labour'd to attain this hour.\nFarewell, good Strato. Caesar, now be still:\nI kill'd not thee with half so good a will.",
        modern: "Darkness hangs over my eyes; my bones want to rest, having worked only to reach this moment. Farewell, good Strato. Caesar, now be at peace — I did not kill you with half as much willingness as I now kill myself.",
      },
      {
        speaker: "Octavius",
        stageDirection: "Finding Brutus's body",
        original: "According to his virtue let us use him,\nWith all respect and rites of burial.\nWithin my tent his bones to-night shall lie,\nMost like a soldier, order'd honourably.",
        modern: "Let us treat him according to his virtue, with full respect and proper burial rites. Tonight his body shall lie in my tent, like a soldier, honoured appropriately.",
      },
      {
        speaker: "Antony",
        original: "This was the noblest Roman of them all:\nAll the conspirators save only he\nDid that they did in envy of great Caesar;\nHe only, in a general honest thought\nAnd common good to all, made one of them.\nHis life was gentle, and the elements\nSo mix'd in him that Nature might stand up\nAnd say to all the world 'This was a man!'",
        modern: "This was the noblest Roman of them all. All the conspirators, except for him, did what they did out of envy of great Caesar. Only he joined them out of a genuine, honest concern for the common good of all. His life was gentle, and the qualities in him were so perfectly balanced that Nature herself might stand up and say to all the world, 'This was a man!'",
      },
    ],
  },
];
