const DAY = 24 * 60 * 60 * 1000;
const STORAGE_KEY = "chinese-tutor-prototype-v2";

const topics = [
  { id: "all", label: "全部" },
  { id: "technology", label: "科技" },
  { id: "environment", label: "环境" },
  { id: "culture", label: "文化" },
  { id: "education", label: "教育" },
  { id: "society", label: "社会" },
  { id: "health", label: "健康" },
  { id: "livelihood", label: "民生" },
];

const allowedSources = [
  {
    name: "CNA",
    url: "https://www.channelnewsasia.com/singapore",
    language: "en-SG",
    use: "Specific current-affairs links and RSS-style metadata",
  },
  {
    name: "8world",
    url: "https://www.8world.com/singapore",
    language: "zh-SG",
    use: "Chinese Singapore news links and topic discovery",
  },
  {
    name: "联合早报",
    url: "https://www.zaobao.com.sg/news/singapore",
    language: "zh-SG",
    use: "Chinese current-affairs comparison source",
  },
];

const articles = [
  {
    id: "ai-skills-2027",
    topicId: "technology",
    topicLabel: "科技",
    title: "人工智能进入课堂：学生该害怕，还是该准备？",
    sourceName: "CNA",
    sourceTitle: "AI skills to be mandatory for Singapore higher education students from 2027",
    sourceUrl:
      "https://www.channelnewsasia.com/watch/ai-skills-be-mandatory-singapore-higher-education-students-2027-6134131",
    sourceDate: "2026-05-21",
    sourceSnippet:
      "新闻报道新加坡高等教育学生将学习人工智能技能。本文改写成适合中学生的原创练习，讨论科技能力、就业准备和人文判断。",
    readingTime: "6 min",
    tags: ["人工智能", "未来工作", "责任使用", "口试热门"],
    paragraphs: [
      {
        zh:
          "人工智能不再只是科技公司的工具，它正慢慢进入学校、办公室和日常生活。对中学生来说，问题已经不是要不要接触人工智能，而是如何负责任地使用它。如果学生只把聊天机器人当成代写功课的捷径，学习能力反而会被削弱；相反，如果他们把它当成整理资料、检查思路和激发灵感的工具，就能提高效率，也能训练判断力。",
        py:
          "Rén gōng zhì néng bù zài zhǐ shì kē jì gōng sī de gōng jù, tā zhèng màn màn jìn rù xué xiào, bàn gōng shì hé rì cháng shēng huó.",
        en:
          "AI should be framed as a tool that requires responsibility, not as a shortcut that replaces thinking.",
      },
      {
        zh:
          "未来的雇主需要的不只是会按按钮的人，而是能提出好问题、明辨是非、与别人合作的人。机器可以在短时间内处理大量数据，也可以完成重复性劳动，可是它未必理解人类的处境和情感。因此，学生除了学习机器学习、算法和数据安全等知识，也必须提升沟通、领导、适应能力和同理心。",
        py:
          "Wèi lái de gù zhǔ xū yào de bù zhǐ shì huì àn àn niǔ de rén, ér shì néng tí chū hǎo wèn tí, míng biàn shì fēi de rén.",
        en:
          "The paragraph contrasts technical skills with human skills such as communication and empathy.",
      },
      {
        zh:
          "有人担心人工智能会取代入门级工作，使年轻人更难找到第一份工作。这种担忧并非空穴来风，但也不必过度悲观。关键在于学生能否把人工智能变成利器，而不是让自己被工具牵着走。工欲善其事，必先利其器；懂得善用工具的人，才更可能在瞬息万变的时代站稳脚跟。",
        py:
          "Yǒu rén dān xīn rén gōng zhì néng huì qǔ dài rù mén jí gōng zuò, shǐ nián qīng rén gèng nán zhǎo dào dì yī fèn gōng zuò.",
        en:
          "Good exam angle: acknowledge risk, then argue that preparation and tool literacy matter.",
      },
    ],
    vocab: [
      vocab("ai-jiqiren", "聊天机器人", "liáo tiān jī qì rén", "chatbot", "能与用户对话、回答问题的人工智能工具。", "聊天机器人可以协助学生整理资料，但不能代替独立思考。", "可用于科技题：聊天机器人提高效率，却也考验学生的自律。"),
      vocab("ai-suanfa", "算法", "suàn fǎ", "algorithm", "电脑处理信息和作出判断的一套步骤。", "社交媒体的算法会根据用户兴趣推荐内容。", "可用于假新闻题：算法可能形成信息茧房。"),
      vocab("ai-mingbian", "明辨是非", "míng biàn shì fēi", "to tell right from wrong", "能够判断事情是否正确、合理或有道德问题。", "面对网络信息，学生必须明辨是非。", "口试高分表达：科技越发达，人越需要明辨是非。"),
      vocab("ai-zhongfuxing", "重复性劳动", "chóng fù xìng láo dòng", "repetitive work", "步骤固定、判断力要求较低的工作。", "机器人适合处理重复性劳动。", "可用于就业题：重复性劳动最容易被自动化取代。"),
      vocab("ai-gexinghua", "个性化", "gè xìng huà", "personalised", "按照个人需要或特点进行调整。", "个性化学习能帮助学生针对弱项复习。", "教育题可用：人工智能让个性化学习更容易实现。"),
      vocab("ai-shunxi", "瞬息万变", "shùn xī wàn biàn", "changing rapidly", "变化非常快，情况难以预测。", "科技行业瞬息万变，学生必须不断学习。", "作文可用：在瞬息万变的数码时代，终身学习不可或缺。"),
    ],
    phrases: [
      phrase("ai-qi-yong", "成语", "利弊并存", "lì bì bìng cún", "好处和坏处同时存在。", "人工智能利弊并存，关键在于人如何使用。"),
      phrase("ai-gongyu", "俗语", "工欲善其事，必先利其器", "gōng yù shàn qí shì, bì xiān lì qí qì", "要做好事情，先要准备合适的工具。", "学习人工智能技能，正是为未来磨利工具。"),
      phrase("ai-haoci", "好词好句", "让科技回到服务人的本位", "ràng kē jì huí dào fú wù rén de běn wèi", "强调科技应帮助人，而不是支配人。", "政府和学校应引导学生让科技回到服务人的本位。"),
    ],
    oral: oralPack(
      "随着人工智能越来越普及，学生应不应该从中学阶段就学习人工智能技能？",
      "人工智能已进入学习和工作场景，青年必须懂得善用工具。",
      "我认为应该学习，但重点不只是技术，更是责任、判断和沟通。",
      "它能提高效率、培养未来竞争力，也能帮助学生进行个性化学习。",
      "学校可设计真实项目，让学生用AI解决问题，同时反思伦理风险。",
      [
        ["人工智能会不会让学生变懒？", "如果学生只依赖AI给答案，确实可能变懒；但如果他们用AI检查思路、比较资料，就能提升学习效率。关键在于老师如何设计任务。"],
        ["未来哪些能力最不容易被AI取代？", "我认为是同理心、沟通能力和价值判断。机器能处理数据，却不一定理解人的处境。"],
        ["政府和学校应如何避免AI被滥用？", "可以制定清楚规则，教学生引用来源，也要让他们明白抄袭和虚假信息的后果。"],
      ],
    ),
  },
  {
    id: "green-energy-carbon-tax",
    topicId: "environment",
    topicLabel: "环境",
    title: "绿色能源不是口号：减碳为什么需要个人也参与？",
    sourceName: "CNA",
    sourceTitle: "Budget 2026: Carbon tax and Singapore's climate trade-offs",
    sourceUrl:
      "https://www.channelnewsasia.com/commentary/carbon-tax-budget-2026-singapore-emission-target-industry-decarbonise-5929996",
    sourceDate: "2026-02-16",
    sourceSnippet:
      "新闻评论讨论新加坡碳税、低碳电力和绿色转型的取舍。本文改写为中学生可用的环保口试素材。",
    readingTime: "7 min",
    tags: ["绿色能源", "碳足迹", "可持续发展", "政府与个人"],
    paragraphs: [
      {
        zh:
          "气候变化听起来像遥远的全球议题，但它其实和新加坡的日常生活息息相关。我国土地有限，缺乏天然资源，能源供应长期依赖进口。因此，推动绿色能源和可持续发展，不只是为了保护环境，也是为了提高国家的韧性。太阳能、低碳电力和电动车目标，都是迈向绿色未来的重要部分。",
        py:
          "Qì hòu biàn huà tīng qǐ lái xiàng yáo yuǎn de quán qiú yì tí, dàn tā qí shí hé Xīn Jiā Pō de rì cháng shēng huó xī xī xiāng guān.",
        en:
          "Connect climate change to Singapore's resource limits and energy security.",
      },
      {
        zh:
          "不过，绿色转型不可能一蹴而就。企业需要资金更新设备，政府也要在环保目标和生活成本之间取得平衡。若碳税太低，企业缺乏减碳动力；若成本上升太快，消费者可能承受更大压力。这正是公共政策的难处：既要看长远，也要照顾眼前的民生。",
        py:
          "Bù guò, lǜ sè zhuǎn xíng bù kě néng yī cù ér jiù. Qǐ yè xū yào zī jīn gēng xīn shè bèi, zhèng fǔ yě yào qǔ dé píng héng.",
        en:
          "Good argument structure: environmental policy has trade-offs between long-term goals and current costs.",
      },
      {
        zh:
          "个人的责任同样不可忽视。节约用电、减少浪费、选择公共交通、购买真正需要的物品，看似微不足道，却能减少碳足迹。更重要的是，个人选择会影响社会风气。当越来越多人愿意物尽其用、环保消费，绿色生活就不会只是政府文件里的口号，而会成为一种新的消费观和价值观。",
        py:
          "Gè rén de zé rèn tóng yàng bù kě hū shì. Jié yuē yòng diàn, jiǎn shǎo làng fèi, xuǎn zé gōng gòng jiāo tōng dōu néng jiǎn shǎo tàn zú jì.",
        en:
          "Individual actions matter because they change social norms, not only carbon numbers.",
      },
    ],
    vocab: [
      vocab("env-tanzuji", "碳足迹", "tàn zú jì", "carbon footprint", "个人或活动造成的碳排放量。", "搭乘公共交通能减少个人碳足迹。", "环保题必备：减少碳足迹需要政府、企业和个人共同努力。"),
      vocab("env-kechixu", "可持续发展", "kě chí xù fā zhǎn", "sustainable development", "既满足现在需要，也不损害未来的发展方式。", "可持续发展要求我们兼顾经济和环境。", "作文可用：可持续发展不是选择题，而是长期责任。"),
      vocab("env-huashiranliao", "化石燃料", "huà shí rán liào", "fossil fuels", "煤、石油、天然气等不可再生能源。", "过度依赖化石燃料会加剧气候变化。", "可用于解释绿色能源为何重要。"),
      vocab("env-wujinqiyong", "物尽其用", "wù jìn qí yòng", "make full use of things", "充分利用物品，不轻易浪费。", "购买二手货体现了物尽其用的精神。", "消费习惯题可用：物尽其用能减少浪费。"),
      vocab("env-xiaofeiguan", "消费观", "xiāo fèi guān", "view of consumption", "人们对消费、购物和物品价值的看法。", "年轻人的消费观正在逐渐改变。", "议论文可用：环保教育应从改变消费观开始。"),
      vocab("env-yicuerjiu", "一蹴而就", "yī cù ér jiù", "achieved overnight", "事情一下子就成功。常用于否定。", "绿色转型不可能一蹴而就。", "高级表达：社会改变往往不能一蹴而就。"),
    ],
    phrases: [
      phrase("env-shui", "成语", "水到渠成", "shuǐ dào qú chéng", "条件成熟后，事情自然成功。", "当环保意识深入人心，绿色生活就会水到渠成。"),
      phrase("env-su", "俗语", "没有买卖，就没有伤害", "méi yǒu mǎi mài, jiù méi yǒu shāng hài", "消费选择会影响生产和伤害。", "减少过度消费，才能真正做到没有买卖，就没有伤害。"),
      phrase("env-haoci", "好词好句", "在发展与保护之间取得平衡", "zài fā zhǎn yǔ bǎo hù zhī jiān qǔ dé píng héng", "兼顾经济进步和环境保护。", "新加坡必须在发展与保护之间取得平衡。"),
    ],
    oral: oralPack(
      "新加坡人要改变生活习惯，减少碳足迹，最大的困难是什么？",
      "绿色能源和碳税成为新加坡应对气候变化的重要议题。",
      "我认为最大的困难是便利与成本，因为环保选择有时需要更多时间和金钱。",
      "政府可提供基础设施和政策引导，个人则要改变消费观。",
      "学校可通过环保项目和新闻讨论，让学生从小实践物尽其用。",
      [
        ["碳税会不会增加生活负担？", "短期内可能会，但如果收入用于支持绿色转型和弱势家庭，就能减轻冲击。"],
        ["学生能为环保做什么？", "学生可以减少一次性用品、参与旧物交换，也可以在家中提醒家人节约用电。"],
        ["环保和经济发展一定冲突吗？", "不一定。绿色产业也能创造新工作，关键是转型过程要有规划。"],
      ],
    ),
  },
  {
    id: "sg-culture-pass",
    topicId: "culture",
    topicLabel: "文化",
    title: "文化通行证：一百元能不能培养归属感？",
    sourceName: "CNA",
    sourceTitle: "SG Culture Pass credits can be used to buy SingLit books from March 2026",
    sourceUrl: "https://www.channelnewsasia.com/singapore/sg-culture-pass-singlit-books-local-films-credits-5453346",
    sourceDate: "2026-03-02",
    sourceSnippet:
      "新闻报道文化通行证扩大到本地文学作品。本文练习如何讨论文化参与、身份认同和艺术生态。",
    readingTime: "6 min",
    tags: ["文化通行证", "本地文学", "身份认同", "归属感"],
    paragraphs: [
      {
        zh:
          "文化通行证的意义，不只是让国人少花一百元看演出或买本地文学作品。它更像是一张邀请函，邀请人们走进剧场、书店、博物馆和展览空间，重新认识自己生活的城市。对于平时很少接触艺术的学生来说，这可能是一次低门槛的尝试。",
        py:
          "Wén huà tōng xíng zhèng de yì yì, bù zhǐ shì ràng guó rén shǎo huā yì bǎi yuán kàn yǎn chū huò mǎi běn dì wén xué zuò pǐn.",
        en:
          "Frame Culture Pass as access and invitation, not only a subsidy.",
      },
      {
        zh:
          "有人会质疑：政府发放储值，真的能让人爱上文化吗？这个问题值得思考。兴趣不能靠金钱强迫出来，但补贴可以降低尝试的门槛。当观众愿意踏出第一步，本地创作者也能获得更大的平台和较稳定的收入来源。长远来看，这有助于培养国人对本地文化的认同感与归属感。",
        py:
          "Yǒu rén huì zhì yí: zhèng fǔ fā fàng chǔ zhí, zhēn de néng ràng rén ài shàng wén huà ma?",
        en:
          "Balanced argument: money cannot force interest, but it lowers barriers.",
      },
      {
        zh:
          "当然，文化推广不能只靠一次性优惠。学校、家庭和社区也要创造讨论空间，让学生明白文化不是课本里的资料，而是活在语言、饮食、建筑和故事中的共同记忆。如果年轻人愿意阅读本地作品、支持本地演出、了解不同族群的历史，文化传承才不会流于形式。",
        py:
          "Dāng rán, wén huà tuī guǎng bù néng zhǐ kào yí cì xìng yōu huì. Xué xiào, jiā tíng hé shè qū yě yào chuàng zào tǎo lùn kōng jiān.",
        en:
          "Culture must be practiced and discussed, not treated as a one-time voucher.",
      },
    ],
    vocab: [
      vocab("cul-tongxingzheng", "文化通行证", "wén huà tōng xíng zhèng", "SG Culture Pass", "鼓励国人参与本地艺术文化活动的储值计划。", "文化通行证降低了国人接触艺术的门槛。", "文化题可用：文化通行证是推动本地艺术发展的创新举措。"),
      vocab("cul-menkang", "门槛", "mén kǎn", "barrier; threshold", "进入某领域或参与某活动的难度。", "补贴能降低学生接触艺术的门槛。", "高分表达：降低门槛能提高参与度。"),
      vocab("cul-rentong", "身份认同感", "shēn fèn rèn tóng gǎn", "sense of identity", "对自己所属群体、国家或文化的认同。", "了解历史能增强身份认同感。", "文化题常用：文化传承有助于培养身份认同感。"),
      vocab("cul-guishugan", "归属感", "guī shǔ gǎn", "sense of belonging", "觉得自己属于某个群体或地方。", "共同的文化记忆能增强归属感。", "口试可用：归属感能加强社会凝聚力。"),
      vocab("cul-liuyuxingshi", "流于形式", "liú yú xíng shì", "become superficial", "只重表面形式，没有真正内容。", "如果没有持续参与，文化活动容易流于形式。", "议论文可用：政策不能流于形式，必须产生实际影响。"),
      vocab("cul-chuangzuozhe", "创作者", "chuàng zuò zhě", "creator", "从事文学、艺术、音乐、戏剧等创作的人。", "文化消费能支持本地创作者。", "可用于讨论艺术生态和收入稳定。"),
    ],
    phrases: [
      phrase("cul-qianyi", "成语", "潜移默化", "qián yí mò huà", "在不知不觉中受到影响。", "长期接触本地作品，会潜移默化地增强文化认同。"),
      phrase("cul-su", "俗语", "饮水思源", "yǐn shuǐ sī yuán", "享受成果时不忘根源。", "了解先辈故事，是一种饮水思源的表现。"),
      phrase("cul-haoci", "好词好句", "让文化从展柜走进生活", "ràng wén huà cóng zhǎn guì zǒu jìn shēng huó", "强调文化不应只停留在展示中。", "文化教育应让文化从展柜走进生活。"),
    ],
    oral: oralPack(
      "你认为文化通行证能不能有效鼓励年轻人接触本地文化？",
      "文化通行证让国人更容易参与本地艺术和文学活动。",
      "我认为它有帮助，但不能单靠补贴培养兴趣。",
      "它降低门槛，也能支持本地创作者，增强身份认同感。",
      "学校可配合阅读、观展和反思活动，让体验更有深度。",
      [
        ["年轻人为什么对本地文化兴趣不高？", "他们可能觉得本地文化离考试或娱乐太远，也缺少同伴一起参与。"],
        ["社交媒体能帮助推广文化吗？", "能。短视频能提高曝光率，但内容必须有深度，否则容易流于形式。"],
        ["文化活动对年长者有什么意义？", "它能丰富精神生活，也能让年长者走出家门，建立社会联系。"],
      ],
    ),
  },
  {
    id: "school-bullying",
    topicId: "education",
    topicLabel: "教育",
    title: "校园霸凌：更严厉的惩罚够不够？",
    sourceName: "CNA",
    sourceTitle: "Parents, teachers back tougher stance on school bullying",
    sourceUrl: "https://www.channelnewsasia.com/singapore/bullying-caning-moe-schools-parents-teachers-6060926",
    sourceDate: "2026-04-16",
    sourceSnippet:
      "新闻讨论校园霸凌处理措施。本文改写为适合O水准口试的校园责任、同理心和制度建设素材。",
    readingTime: "7 min",
    tags: ["校园霸凌", "学生价值观", "同理心", "学校纪律"],
    paragraphs: [
      {
        zh:
          "校园霸凌并不只是几句玩笑话，也不是学生之间的小摩擦。语言霸凌、关系霸凌、身体霸凌和网络霸凌，都可能让受害者长期感到恐惧、尴尬和孤立。尤其在社交媒体时代，恶意评论和照片可能迅速扩散，使伤害变得更深、更持久。",
        py:
          "Xiào yuán bà líng bìng bù zhǐ shì jǐ jù wán xiào huà, yě bù shì xué shēng zhī jiān de xiǎo mó cā.",
        en:
          "Define bullying broadly and include cyberbullying for modern relevance.",
      },
      {
        zh:
          "面对霸凌，学校当然需要清楚的纪律和后果。若施暴者总能善罢甘休，受害者就会觉得求助没有意义，旁观者也可能选择隔岸观火。然而，惩罚只是其中一环。学校还必须建立安全的举报渠道，培训老师及时识别问题，并教导学生如何在不激化冲突的情况下伸出援手。",
        py:
          "Miàn duì bà líng, xué xiào dāng rán xū yào qīng chǔ de jì lǜ hé hòu guǒ. Rě shī bào zhě zǒng néng shàn bà gān xiū, shòu hài zhě jiù huì jué de qiú zhù méi yǒu yì yì.",
        en:
          "Balanced view: discipline is necessary but not enough.",
      },
      {
        zh:
          "更重要的是，学校要培养学生的同理心和责任感。很多霸凌事件之所以恶化，是因为旁观者害怕惹麻烦，或觉得那与自己无关。若学生懂得明辨是非，愿意向老师求助，也愿意陪伴被孤立的同学，校园就能从冷漠变得更有温度。",
        py:
          "Gèng zhòng yào de shì, xué xiào yào péi yǎng xué shēng de tóng lǐ xīn hé zé rèn gǎn.",
        en:
          "Use the bystander angle: a caring school culture depends on students too.",
      },
    ],
    vocab: [
      vocab("bully-baling", "霸凌", "bà líng", "bullying", "以言语、关系、身体或网络方式反复伤害他人。", "校园霸凌会严重影响学生的心理健康。", "教育题必备：校园霸凌不是小事，学校必须正视。"),
      vocab("bully-guli", "孤立", "gū lì", "isolate; exclude", "故意不让某人加入群体。", "关系霸凌常通过孤立同学来造成伤害。", "可用于解释霸凌的隐蔽性。"),
      vocab("bully-geshan", "隔岸观火", "gé àn guān huǒ", "look on indifferently", "对别人的困难冷眼旁观。", "旁观者不应隔岸观火。", "口试可用：面对不公，青年不能隔岸观火。"),
      vocab("bully-shanba", "善罢甘休", "shàn bà gān xiū", "let the matter rest", "愿意停止追究或轻易放过。常用于否定。", "受害者不应被迫善罢甘休。", "可用于强调必须追究责任。"),
      vocab("bully-yaoqu", "谣言", "yáo yán", "rumour", "未经证实却四处传播的话。", "散布谣言也是关系霸凌的一种。", "网络题可用：谣言会破坏信任。"),
      vocab("bully-gan-ga", "尴尬", "gān gà", "awkward; embarrassed", "处境难堪、不自在。", "被同学嘲笑会让人感到尴尬。", "口试叙述个人经验时可用。"),
    ],
    phrases: [
      phrase("bully-zhisang", "成语", "指桑骂槐", "zhǐ sāng mà huái", "表面骂这个，实际影射另一个人。", "有些学生会用指桑骂槐的方式羞辱同学。"),
      phrase("bully-su", "俗语", "己所不欲，勿施于人", "jǐ suǒ bù yù, wù shī yú rén", "自己不愿承受的事，不要加在别人身上。", "反霸凌教育应从己所不欲，勿施于人开始。"),
      phrase("bully-haoci", "好词好句", "把旁观者变成守护者", "bǎ páng guān zhě biàn chéng shǒu hù zhě", "鼓励学生主动保护弱势同学。", "学校应把旁观者变成守护者，建立安全校园。"),
    ],
    oral: oralPack(
      "学校采取更严厉的纪律措施，是否足以解决校园霸凌问题？",
      "校园霸凌包括语言、关系、身体和网络霸凌，影响深远。",
      "我认为严厉措施有必要，但不能单靠惩罚。",
      "学校还需要举报渠道、老师培训和同理心教育。",
      "学生也应学会求助和支持同学，避免隔岸观火。",
      [
        ["为什么受害者有时不敢求助？", "他们可能害怕被报复，也担心老师或同学不相信自己。"],
        ["网络霸凌为什么更难处理？", "因为它传播快、隐蔽性强，伤害可能在课后继续发生。"],
        ["旁观者应该怎么做？", "旁观者不一定要正面冲突，但可以记录情况、陪伴受害者，并向可信任的成人求助。"],
      ],
    ),
  },
  {
    id: "cost-of-living-cdc",
    topicId: "livelihood",
    topicLabel: "民生",
    title: "邻里购物券：雪中送炭，还是权宜之计？",
    sourceName: "8world",
    sourceTitle: "本地家庭明年1月可获多500元社理会邻里购物券",
    sourceUrl: "https://www.8world.com/singapore/sgbudget2026-cdc-and-u-save-3052886",
    sourceDate: "2026-02-12",
    sourceSnippet:
      "新闻报道预算案中的邻里购物券和生活费援助。本文练习如何讨论物价上涨、补贴和长期自立。",
    readingTime: "7 min",
    tags: ["生活成本", "邻里购物券", "补贴", "民生问题"],
    paragraphs: [
      {
        zh:
          "近年来，物价上涨已成为许多新加坡家庭关注的民生问题。从柴米油盐到水电交通，衣食住行无一不受影响。对低收入家庭而言，生活成本上升更是雪上加霜；每月收入有限，开销却不断增加，难免感到入不敷出。",
        py:
          "Jìn nián lái, wù jià shàng zhǎng yǐ chéng wéi xǔ duō Xīn Jiā Pō jiā tíng guān zhù de mín shēng wèn tí.",
        en:
          "Use concrete daily expenses to explain why cost of living is a serious issue.",
      },
      {
        zh:
          "政府发放邻里购物券和水电费补贴，无疑是雪中送炭的暖心之举。它能在短期内减轻国人的生活压力，也能支持邻里商家。然而，我们也要清醒地认识到，补贴终究只是治标不治本的权宜之计。若全球供应链紧张、能源价格上涨和地缘政治冲突持续，生活成本压力仍可能反复出现。",
        py:
          "Zhèng fǔ fā fàng lín lǐ gòu wù quàn hé shuǐ diàn fèi bǔ tiē, wú yí shì xuě zhōng sòng tàn de nuǎn xīn zhī jǔ.",
        en:
          "Classic O-Level structure: acknowledge immediate relief, then discuss long-term limits.",
      },
      {
        zh:
          "从长远来看，个人也需要培养生存技能。开源节流、精打细算、养成记账习惯，都能帮助家庭更清楚钱花在哪里。年轻人也应提升技能，适应瞬息万变的就业市场。只有政府援助和个人努力双管齐下，社会才能更有韧性。",
        py:
          "Cóng cháng yuǎn lái kàn, gè rén yě xū yào péi yǎng shēng cún jì néng. Kāi yuán jié liú, jīng dǎ xì suàn, dōu néng bāng zhù jiā tíng.",
        en:
          "Add personal responsibility without blaming families under pressure.",
      },
    ],
    vocab: [
      vocab("liv-cdc", "邻里购物券", "lín lǐ gòu wù quàn", "CDC vouchers", "政府发给家庭、可在邻里商店和超市使用的购物券。", "邻里购物券能减轻家庭短期生活压力。", "民生题必备：邻里购物券是雪中送炭的措施。"),
      vocab("liv-buties", "补贴", "bǔ tiē", "subsidy", "政府或机构给予的经济援助。", "水电费补贴能帮助家庭应付开销。", "可用于政策题：补贴能缓解压力，但不是长远之计。"),
      vocab("liv-rubufuchu", "入不敷出", "rù bù fū chū", "expenses exceed income", "收入不够支付开销。", "物价上涨让一些家庭入不敷出。", "生活成本题高频表达。"),
      vocab("liv-quanyi", "权宜之计", "quán yí zhī jì", "temporary measure", "暂时应付问题的方法。", "发放补贴是权宜之计，不是根本办法。", "议论文可用：短期措施不能取代长远规划。"),
      vocab("liv-kaiyuan", "开源节流", "kāi yuán jié liú", "increase income and reduce spending", "增加收入来源，同时减少不必要开销。", "家庭可通过开源节流应对生活成本上升。", "建议段常用。"),
      vocab("liv-jingda", "精打细算", "jīng dǎ xì suàn", "budget carefully", "仔细计划每一笔开销。", "养成记账习惯能帮助我们精打细算。", "可用于个人责任题。"),
    ],
    phrases: [
      phrase("liv-xue", "成语", "雪中送炭", "xuě zhōng sòng tàn", "在别人困难时给予及时帮助。", "邻里购物券对低收入家庭来说是雪中送炭。"),
      phrase("liv-su", "俗语", "钱要花在刀刃上", "qián yào huā zài dāo rèn shàng", "钱要用在最需要的地方。", "面对物价上涨，家庭更要把钱花在刀刃上。"),
      phrase("liv-haoci", "好词好句", "治标不治本", "zhì biāo bù zhì běn", "只解决表面问题，没有解决根本原因。", "补贴能缓解压力，却可能治标不治本。"),
    ],
    oral: oralPack(
      "政府发放邻里购物券是否是解决生活成本上升的最好方法？",
      "生活成本上升影响许多家庭，政府推出补贴和购物券。",
      "我认为购物券有帮助，但它主要解决短期压力。",
      "它能雪中送炭，也能支持邻里商家；但长期还需提升收入和技能。",
      "个人应开源节流，政府则继续帮助弱势群体和稳定经济。",
      [
        ["为什么生活成本会上升？", "原因包括全球供应链紧张、能源价格波动和地缘政治冲突。"],
        ["学生可以如何学习理财？", "学生可以记录零用钱开销，区分需要和想要，培养精打细算的习惯。"],
        ["补贴会不会让人过度依赖政府？", "如果补贴长期没有配合技能提升，确实可能产生依赖；因此援助应和自立措施并行。"],
      ],
    ),
  },
  {
    id: "exam-stress",
    topicId: "education",
    topicLabel: "教育",
    title: "减少考试压力：学生需要少一点竞争，还是多一点韧性？",
    sourceName: "CNA",
    sourceTitle: "More students seeking help for exam stress",
    sourceUrl: "https://www.channelnewsasia.com/singapore/more-students-seeking-help-exam-stress-moe-psychologists-5912371",
    sourceDate: "2026-02-06",
    sourceSnippet:
      "新闻报道学生考试压力和教育部研究降低考试利害关系。本文练习讨论心理健康、动力和学习热情。",
    readingTime: "6 min",
    tags: ["考试压力", "心理健康", "学习动力", "教育改革"],
    paragraphs: [
      {
        zh:
          "考试原本是评估学习成果的一种方式，但当成绩被看得过于沉重，它就可能变成压力的来源。有些学生害怕让父母失望，有些学生担心一次失误会影响未来道路。长期处在这种焦虑中，学生不但难以保持学习热情，也可能出现失眠、逃避和自我怀疑。",
        py:
          "Kǎo shì yuán běn shì píng gū xué xí chéng guǒ de yì zhǒng fāng shì, dàn dāng chéng jì bèi kàn de guò yú chén zhòng, tā jiù kě néng biàn chéng yā lì de lái yuán.",
        en:
          "Exams are useful, but high stakes can distort learning.",
      },
      {
        zh:
          "减少考试的好处显而易见。学生有更多时间探索课外兴趣，发挥其他方面的潜能，也能以较放松的心态学习。可是，如果完全淡化考试，部分学生可能失去动力，老师也较难准确了解学生的掌握程度。因此，问题不在于要不要考试，而在于如何让考试更合理。",
        py:
          "Jiǎn shǎo kǎo shì de hǎo chù xiǎn ér yì jiàn. Xué shēng yǒu gèng duō shí jiān tàn suǒ kè wài xìng qù.",
        en:
          "Balanced compare-and-contrast structure for O-Level oral.",
      },
      {
        zh:
          "真正健康的教育，应同时培养成绩和韧性。学校可以减少一考定终身的感觉，增加项目学习、口头表达和反思任务。家长也应肯定孩子的努力，而不是只看分数。天才等于九十九分汗水，加一分灵感；学生若能把努力看成成长过程，而不是单纯追分，就更能走得长远。",
        py:
          "Zhēn zhèng jiàn kāng de jiào yù, yīng tóng shí péi yǎng chéng jì hé rèn xìng.",
        en:
          "End with constructive solutions: school, parents, mindset.",
      },
    ],
    vocab: [
      vocab("edu-yali", "压力", "yā lì", "pressure; stress", "面对要求或困难时产生的心理负担。", "考试压力会影响学生的睡眠和情绪。", "教育题必备。"),
      vocab("edu-renxing", "韧性", "rèn xìng", "resilience", "面对挫折后仍能坚持和恢复的能力。", "学生需要培养韧性，而不是害怕失败。", "价值观题可用：韧性比短期成绩更长远。"),
      vocab("edu-qianneng", "潜能", "qián néng", "potential", "还没有完全发挥出来的能力。", "课外活动能帮助学生发挥潜能。", "教育题可用：减少考试能让学生发展多方面潜能。"),
      vocab("edu-zhangwo", "掌握程度", "zhǎng wò chéng dù", "level of mastery", "对知识或技能理解和运用的程度。", "老师需要了解学生的掌握程度。", "可用于评价考试的功能。"),
      vocab("edu-yiyouyu", "犹豫", "yóu yù", "hesitate", "拿不定主意。", "学生遇到困难时不应犹豫求助。", "口试叙述可用。"),
      vocab("edu-kajia", "可嘉", "kě jiā", "commendable", "值得赞许。", "学生愿意面对压力并寻求帮助，勇气可嘉。", "口试评价人物行为时可用。"),
    ],
    phrases: [
      phrase("edu-yiming", "成语", "一鸣惊人", "yī míng jīng rén", "平时不突出，一下子表现惊人。", "教育不应只期待学生一鸣惊人，而应重视长期成长。"),
      phrase("edu-han", "俗语", "天才等于九十九分汗水，加一分灵感", "tiān cái děng yú jiǔ shí jiǔ fēn hàn shuǐ, jiā yī fēn líng gǎn", "成功主要靠努力。", "面对考试，学生更需要持续努力。"),
      phrase("edu-haoci", "好词好句", "把分数还原为反馈，而不是审判", "bǎ fēn shù huán yuán wéi fǎn kuì, ér bù shì shěn pàn", "强调分数应用来帮助进步。", "学校应把分数还原为反馈，而不是审判。"),
    ],
    oral: oralPack(
      "新加坡是否应该进一步减少考试，以减轻学生压力？",
      "越来越多学生面对考试压力，社会开始反思高利害考试。",
      "我认为可以减少不必要的考试，但不能完全取消评估。",
      "考试能了解掌握程度，但过度竞争会影响心理健康。",
      "学校应加入多元评估，家长也要肯定努力和成长。",
      [
        ["考试压力一定是父母造成的吗？", "不一定。有些压力来自父母，也有些来自学生自己的完美主义和同侪比较。"],
        ["课外活动会不会影响成绩？", "如果安排得当，课外活动能培养团队合作和坚持不懈，反而有助于整体成长。"],
        ["学生如何管理压力？", "学生可以制定复习计划、运动、睡眠充足，也要在需要时向老师或辅导员求助。"],
      ],
    ),
  },
  {
    id: "scam-data-safety",
    topicId: "technology",
    topicLabel: "科技",
    title: "网络诈骗减少了，为什么我们仍不能掉以轻心？",
    sourceName: "CNA",
    sourceTitle: "Singapore records 27.6% drop in scam cases in 2025",
    sourceUrl:
      "https://www.channelnewsasia.com/singapore/scams-ecommerce-government-officials-impersonation-pokemon-trading-cards-police-5947456",
    sourceDate: "2026-02-25",
    sourceSnippet:
      "新闻报道新加坡诈骗案件下降，但冒充政府人员等诈骗仍值得警惕。本文练习数码安全和公民意识。",
    readingTime: "6 min",
    tags: ["网络诈骗", "双重认证", "公民意识", "数码安全"],
    paragraphs: [
      {
        zh:
          "诈骗案件下降固然令人欣慰，但这不代表公众可以放松警惕。诈骗集团常常利用人的恐惧、贪念和匆忙心理，伪装成银行、政府机构或熟人，让受害者在短时间内作出错误决定。科技越发达，诈骗手法也越隐蔽。",
        py:
          "Zhà piàn àn jiàn xià jiàng gù rán lìng rén xīn wèi, dàn zhè bù dài biǎo gōng zhòng kě yǐ fàng sōng jǐng tì.",
        en:
          "Even if scam numbers drop, vigilance must remain high.",
      },
      {
        zh:
          "防范网络诈骗，不能只依靠警方。个人必须开启双重认证系统，不随意点击陌生链接，也不能擅自透露验证码和银行资料。学校也可通过真实案例教育学生，让他们学会明辨是非，识破深伪视频、假消息和钓鱼网站。",
        py:
          "Fáng fàn wǎng luò zhà piàn, bù néng zhǐ yī kào jǐng fāng. Gè rén bì xū kāi qǐ shuāng chóng rèn zhèng xì tǒng.",
        en:
          "Personal habits and education are essential in scam prevention.",
      },
      {
        zh:
          "社会也需要建立互相提醒的文化。年长者可能不熟悉数码平台，青年则可能因为过度自信而疏忽。家人之间若能经常交流最新骗局，邻里和社区中心也能举办讲座，就能把防骗从个人责任变成集体防线。",
        py:
          "Shè huì yě xū yào jiàn lì hù xiāng tí xǐng de wén huà. Nián zhǎng zhě kě néng bù shú xī shù mǎ píng tái.",
        en:
          "Make anti-scam awareness a community culture.",
      },
    ],
    vocab: [
      vocab("scam-zhapian", "网络诈骗", "wǎng luò zhà piàn", "online scam", "通过网络欺骗别人金钱或资料。", "网络诈骗手法越来越隐蔽。", "科技与公民意识题必备。"),
      vocab("scam-shuangchong", "双重认证系统", "shuāng chóng rèn zhèng xì tǒng", "two-factor authentication", "登录时需要第二层验证的安全机制。", "开启双重认证系统能提高账户安全。", "建议段可用：个人应开启双重认证系统。"),
      vocab("scam-yinbixing", "隐蔽性", "yǐn bì xìng", "hidden nature", "不容易被发现的特点。", "诈骗的隐蔽性让人防不胜防。", "可用于解释为何打击诈骗困难。"),
      vocab("scam-shenwei", "深伪", "shēn wěi", "deepfake", "利用人工智能伪造声音、影像或人物。", "深伪视频可能被用来制造假消息。", "数码安全题高分词。"),
      vocab("scam-shanzi", "擅自", "shàn zì", "without permission", "未经允许就自行行动。", "不要擅自把验证码告诉别人。", "生活安全题可用。"),
      vocab("scam-diaoyuwangzhan", "钓鱼网站", "diào yú wǎng zhàn", "phishing website", "伪装成正规网站以盗取资料的网站。", "学生应学会识别钓鱼网站。", "科技题具体例子。"),
    ],
    phrases: [
      phrase("scam-wuxie", "成语", "无懈可击", "wú xiè kě jī", "没有漏洞，无法攻击。", "没有任何系统是完全无懈可击的。"),
      phrase("scam-su", "俗语", "小心驶得万年船", "xiǎo xīn shǐ dé wàn nián chuán", "谨慎才能避免长期风险。", "面对陌生链接，小心驶得万年船。"),
      phrase("scam-haoci", "好词好句", "把警惕变成习惯", "bǎ jǐng tì biàn chéng xí guàn", "把安全意识融入日常生活。", "防骗教育应把警惕变成习惯。"),
    ],
    oral: oralPack(
      "在数码时代，打击网络诈骗为什么越来越困难？",
      "诈骗手法随着科技发展变得更隐蔽，公众仍需保持警惕。",
      "我认为困难在于诈骗者善用人性弱点和新科技。",
      "政府可加强执法，平台可提高安全机制，个人也要明辨是非。",
      "学校和社区应通过案例教育，把防骗意识变成日常习惯。",
      [
        ["为什么年长者较容易受骗？", "他们可能不熟悉数码平台，也较容易相信冒充官方人员的信息。"],
        ["青年是否比较不会被骗？", "不一定。青年熟悉科技，但也可能因为自信而忽略风险。"],
        ["你会如何提醒家人防骗？", "我会提醒他们不要透露验证码，遇到紧急转账要求时先打电话确认。"],
      ],
    ),
  },
  {
    id: "ageing-society",
    topicId: "health",
    topicLabel: "健康",
    title: "超老龄化社会：让乐龄人士在社区里好好变老",
    sourceName: "CNA",
    sourceTitle: "Age Well SG active ageing centres initiative",
    sourceUrl:
      "https://www.channelnewsasia.com/singapore/age-well-sg-healthier-seniors-assisted-living-facilities-active-ageing-3922391",
    sourceDate: "2023-11-16",
    sourceSnippet:
      "新闻介绍Age Well SG和乐龄中心建设。本文练习健康、社区支持和代际责任。",
    readingTime: "7 min",
    tags: ["乐龄人士", "预防保健", "社区", "就地安老"],
    paragraphs: [
      {
        zh:
          "新加坡迈向超老龄化社会，意味着更多乐龄人士需要医疗、陪伴和长期护理。老去并不可怕，可怕的是长期独居、缺乏交流，使内心越来越凄凉。因此，照顾年长者不能只靠医院，也要靠社区、家庭和个人提早规划。",
        py:
          "Xīn Jiā Pō mài xiàng chāo lǎo líng huà shè huì, yì wèi zhe gèng duō lè líng rén shì xū yào yī liáo, péi bàn hé cháng qī hù lǐ.",
        en:
          "Ageing is not only a medical issue; loneliness and community support matter.",
      },
      {
        zh:
          "乐龄中心和健康SG等计划，强调预防保健和就地安老。若老人能在熟悉的社区参加运动、学习和志愿活动，他们就更容易保持身心健康。社区中心不只是活动场地，也可以成为发现需要帮助者的前线。",
        py:
          "Lè líng zhōng xīn hé Jiàn Kāng SG děng jì huà, qiáng diào yù fáng bǎo jiàn hé jiù dì ān lǎo.",
        en:
          "Explain active ageing centres as preventive and social support.",
      },
      {
        zh:
          "青年在这个课题中也有角色。我们可以多陪伴家中长辈，教他们使用手机应用，也可以参与社区探访。这样的行动看似平凡，却能让年长者感到被看见、被尊重。一个有温度的社会，不会把年长者当成负担，而会珍惜他们的经验和贡献。",
        py:
          "Qīng nián zài zhè ge kè tí zhōng yě yǒu jué sè. Wǒ men kě yǐ duō péi bàn jiā zhōng zhǎng bèi, jiāo tā men shǐ yòng shǒu jī yìng yòng.",
        en:
          "Good oral ending: youth can contribute through companionship and digital help.",
      },
    ],
    vocab: [
      vocab("age-chaolaoling", "超老龄化社会", "chāo lǎo líng huà shè huì", "super-aged society", "65岁以上人口占比很高的社会。", "新加坡正迈向超老龄化社会。", "社会题必备：超老龄化社会带来医疗和护理压力。"),
      vocab("age-leling", "乐龄人士", "lè líng rén shì", "seniors", "对年长者较尊重、积极的称呼。", "乐龄人士需要的不只是医疗，也需要陪伴。", "健康题常用。"),
      vocab("age-yufang", "预防保健", "yù fáng bǎo jiàn", "preventive care", "通过运动、检查和健康管理预防疾病。", "预防保健能减少日后的医疗负担。", "政策题高频表达。"),
      vocab("age-jiudianlao", "就地安老", "jiù dì ān lǎo", "ageing in place", "让年长者在熟悉的社区和家中安老。", "就地安老能让老人保持熟悉的人际关系。", "可用于Age Well SG相关题。"),
      vocab("age-changqi", "长期护理", "cháng qī hù lǐ", "long-term care", "长期照顾身体虚弱或失能者的服务。", "人口老化会增加长期护理需求。", "社会政策题可用。"),
      vocab("age-qiliang", "凄凉", "qī liáng", "desolate; lonely", "形容孤独、冷清、心情悲伤。", "长期独居会让老人内心凄凉。", "叙述独居老人处境时可用。"),
    ],
    phrases: [
      phrase("age-laoyou", "成语", "老有所依", "lǎo yǒu suǒ yī", "年老时有所依靠。", "社区支持能帮助乐龄人士老有所依。"),
      phrase("age-su", "俗语", "家有一老，如有一宝", "jiā yǒu yī lǎo, rú yǒu yī bǎo", "长辈经验丰富，值得珍惜。", "我们应以家有一老，如有一宝的态度尊重长辈。"),
      phrase("age-haoci", "好词好句", "让照护从医院延伸到社区", "ràng zhào hù cóng yī yuàn yán shēn dào shè qū", "强调社区在照顾老人方面的重要性。", "未来的养老模式应让照护从医院延伸到社区。"),
    ],
    oral: oralPack(
      "面对人口老龄化，新加坡最需要加强哪一方面的支持？",
      "新加坡迈向超老龄化社会，医疗和陪伴需求增加。",
      "我认为最需要加强社区支持，因为孤独会影响身心健康。",
      "乐龄中心、预防保健和就地安老能帮助老人保持活跃。",
      "青年也应陪伴长辈，参与探访，让社会更有温度。",
      [
        ["为什么独居老人需要特别关注？", "他们可能缺乏及时帮助，也容易感到孤独和凄凉。"],
        ["科技能如何帮助老人？", "科技可用于远程医疗和紧急求助，但也要有人教老人使用。"],
        ["青年为什么要关心老龄化？", "因为这是整个社会共同面对的挑战，也关系到我们的家人和未来。"],
      ],
    ),
  },
  {
    id: "secondhand-consumption",
    topicId: "environment",
    topicLabel: "环境",
    title: "淘旧货与二手货：环保消费是不是新的价值观？",
    sourceName: "CNA TODAY",
    sourceTitle: "Where did this secondhand shirt come from?",
    sourceUrl: "https://www.channelnewsasia.com/today/ground-up/secondhand-clothes-thrift-shops-youths-4635081",
    sourceDate: "2024-07-28",
    sourceSnippet:
      "新闻探讨年轻人购买二手衣物及其可持续性疑问。本文练习环保消费、价值观和维修文化。",
    readingTime: "6 min",
    tags: ["二手消费", "维修文化", "消费观", "可持续生活"],
    paragraphs: [
      {
        zh:
          "近年来，越来越多年轻人喜欢淘旧货，把二手衣物和旧家具视为一种寻宝体验。对他们来说，二手货不只是便宜，也代表一种较环保、较有个性的生活方式。旧物被重新使用，就像被赋予新生，减少了浪费，也让消费多了一层意义。",
        py:
          "Jìn nián lái, yuè lái yuè duō nián qīng rén xǐ huān táo jiù huò, bǎ èr shǒu yī wù hé jiù jiā jù shì wéi yì zhǒng xún bǎo tǐ yàn.",
        en:
          "Second-hand consumption can be framed as sustainability and self-expression.",
      },
      {
        zh:
          "不过，二手消费也不一定完全环保。如果商家大量进口衣物，或消费者因为价格低而买得更多，原本的环保意义就可能被削弱。因此，真正的关键不是买新的还是旧的，而是我们是否改变“一坏即丢”的习惯，是否愿意维修、交换和物尽其用。",
        py:
          "Bù guò, èr shǒu xiāo fèi yě bù yí dìng wán quán huán bǎo. Rú guǒ shāng jiā dà liàng jìn kǒu yī wù, yuán běn de yì yì jiù kě néng bèi xuē ruò.",
        en:
          "Avoid one-sided praise; discuss hidden trade-offs.",
      },
      {
        zh:
          "推动维修文化在新加坡并不容易。生活节奏快，人们习惯追求方便，修理有时比购买新品更麻烦。然而，如果学校和社区能举办旧物交换、维修工作坊和环保挑战，学生就能从体验中改变消费观。环保不一定要轰轰烈烈，也可以从珍惜一件旧物开始。",
        py:
          "Tuī dòng wéi xiū wén huà zài Xīn Jiā Pō bìng bù róng yì. Shēng huó jié zòu kuài, rén men xí guàn zhuī qiú fāng biàn.",
        en:
          "Practical solution: community repair and swap activities.",
      },
    ],
    vocab: [
      vocab("thrift-taojiuhuo", "淘旧货", "táo jiù huò", "go thrifting", "逛二手店寻找旧物或二手商品。", "周末和朋友淘旧货，是一种特别的消费体验。", "环保消费题可用。"),
      vocab("thrift-ershou", "二手货", "èr shǒu huò", "second-hand goods", "被别人使用过、再转卖或转赠的物品。", "购买二手货能延长物品寿命。", "可用于讨论可持续生活。"),
      vocab("thrift-fuyuxinsheng", "赋予新生", "fù yǔ xīn shēng", "give a second life", "让旧物重新有用途或价值。", "淘旧货是给旧物赋予新生。", "好词好句可用。"),
      vocab("thrift-weixiuwenhua", "维修文化", "wéi xiū wén huà", "repair culture", "鼓励修理物品，而不是一坏就丢。", "维修文化能减少浪费。", "2025口试相关方向。"),
      vocab("thrift-xueyue", "削弱", "xuē ruò", "weaken", "使力量、效果或意义变小。", "过度消费会削弱二手购物的环保意义。", "议论文分析效果时可用。"),
      vocab("thrift-gexing", "个性化", "gè xìng huà", "personalised", "具有个人特色。", "二手衣物常能展现个性化风格。", "可用于青年消费观题。"),
    ],
    phrases: [
      phrase("thrift-shunshou", "成语", "顺手牵羊", "shùn shǒu qiān yáng", "趁机拿走别人的东西；也可指占小便宜。", "淘旧货不是薅羊毛，更不是顺手牵羊，而是理性消费。"),
      phrase("thrift-su", "俗语", "旧的不去，新的不来", "jiù de bù qù, xīn de bù lái", "旧事物离开后新事物才会出现；可反向讨论。", "现代环保观提醒我们，旧的不一定要去，也能赋予新生。"),
      phrase("thrift-haoci", "好词好句", "把消费从拥有转向珍惜", "bǎ xiāo fèi cóng yōng yǒu zhuǎn xiàng zhēn xī", "强调消费价值观的改变。", "环保教育应把消费从拥有转向珍惜。"),
    ],
    oral: oralPack(
      "在新加坡推广维修文化和二手消费，最大的挑战是什么？",
      "年轻人开始关注二手货和旧物再利用，但实践并不简单。",
      "我认为最大挑战是便利，因为买新的往往比修理更快。",
      "二手消费能减少浪费，也能改变年轻人的消费观。",
      "学校和社区可举办旧物交换和维修工作坊，让环保成为习惯。",
      [
        ["二手消费一定环保吗？", "不一定。如果消费者买得更多，或商品大量运输，环保效果会被削弱。"],
        ["为什么年轻人喜欢淘旧货？", "因为价格较低，也能找到有个性、不千篇一律的物品。"],
        ["政府需要介入吗？", "政府可支持维修空间和环保教育，但真正改变还要靠个人习惯。"],
      ],
    ),
  },
  {
    id: "electric-vehicles",
    topicId: "environment",
    topicLabel: "环境",
    title: "电动车普及：绿色交通也需要配套",
    sourceName: "CNA",
    sourceTitle: "No new petrol-only cars in Singapore from 2030",
    sourceUrl: "https://www.channelnewsasia.com/singapore/electric-vehicles-singapore-infrastructure-charging-petrol-stations-workshops-5376971",
    sourceDate: "2025-10-01",
    sourceSnippet:
      "新闻分析新加坡电动车基础设施需求。本文练习绿色交通、公共政策和生活习惯改变。",
    readingTime: "6 min",
    tags: ["电动车", "绿色交通", "基础设施", "绿色计划2030"],
    paragraphs: [
      {
        zh:
          "电动车常被视为绿色交通的重要方向。相比传统汽油车，电动车在行驶时排放较少，有助于减少城市空气污染。新加坡推动更清洁的车辆，也符合绿色计划2030的目标。然而，电动车普及不是换一辆车那么简单，它需要充电设施、维修技能和公众信心作为配套。",
        py:
          "Diàn dòng chē cháng bèi shì wéi lǜ sè jiāo tōng de zhòng yào fāng xiàng. Xiāng bǐ chuán tǒng qì yóu chē, tā yǒu zhù yú jiǎn shǎo chéng shì kōng qì wū rǎn.",
        en:
          "EV transition requires infrastructure, not only consumer choice.",
      },
      {
        zh:
          "对车主来说，最现实的问题是充电是否方便、维修是否可靠、费用是否合理。如果组屋停车场、商场和工作地点都有足够充电点，人们自然更愿意转向电动车。相反，如果充电排队时间长，或维修师傅缺乏相关技能，公众就会犹豫。",
        py:
          "Duì chē zhǔ lái shuō, zuì xiàn shí de wèn tí shì chōng diàn shì fǒu fāng biàn, wéi xiū shì fǒu kě kào, fèi yòng shì fǒu hé lǐ.",
        en:
          "Use practical concerns to explain why adoption is gradual.",
      },
      {
        zh:
          "因此，绿色交通需要政府、企业和个人一起推动。政府负责规划基础设施，企业培训技术人员，个人则应理解转型初期的不便。只要配套逐步完善，电动车就能从少数人的选择，变成更普遍、更可持续的出行方式。",
        py:
          "Yīn cǐ, lǜ sè jiāo tōng xū yào zhèng fǔ, qǐ yè hé gè rén yì qǐ tuī dòng.",
        en:
          "End with shared responsibility and gradual transition.",
      },
    ],
    vocab: [
      vocab("ev-diandong", "电动车", "diàn dòng chē", "electric vehicle", "以电力驱动的车辆。", "电动车有助于减少城市空气污染。", "环境题常用。"),
      vocab("ev-peitao", "配套", "pèi tào", "supporting measures", "使计划顺利进行的相关设施或措施。", "电动车普及需要充电设施作为配套。", "政策题高分词。"),
      vocab("ev-jichu", "基础设施", "jī chǔ shè shī", "infrastructure", "社会运作所需的基本设施。", "完善基础设施能提高公众信心。", "可用于交通、科技、社区题。"),
      vocab("ev-youyu", "犹豫", "yóu yù", "hesitate", "拿不定主意。", "如果充电不方便，车主会犹豫是否换电动车。", "口试讨论阻力时可用。"),
      vocab("ev-puji", "普及", "pǔ jí", "popularise; become widespread", "广泛推广，让更多人使用。", "电动车普及需要时间。", "科技与环保题常用。"),
      vocab("ev-xinlai", "信心", "xìn xīn", "confidence", "相信某件事可行的心理。", "可靠的维修服务能增强公众信心。", "政策题可用。"),
    ],
    phrases: [
      phrase("ev-yicuer", "成语", "一蹴而就", "yī cù ér jiù", "一下子成功。常用于否定。", "电动车普及不可能一蹴而就。"),
      phrase("ev-su", "俗语", "万事开头难", "wàn shì kāi tóu nán", "事情开始时往往最困难。", "绿色交通转型万事开头难，但方向正确。"),
      phrase("ev-haoci", "好词好句", "从观望走向行动", "cóng guān wàng zǒu xiàng xíng dòng", "从犹豫转为实际参与。", "完善配套能让车主从观望走向行动。"),
    ],
    oral: oralPack(
      "推广电动车对新加坡来说，最大的挑战是什么？",
      "电动车有助于绿色交通，但普及需要完善配套。",
      "我认为最大挑战是基础设施和公众信心。",
      "如果充电方便、维修可靠，更多人会愿意转换。",
      "政府、企业和个人应共同推动，让绿色交通逐步普及。",
      [
        ["电动车一定完全环保吗？", "不一定，还要看电力来源和电池处理，但它能减少路面排放。"],
        ["为什么有些人不愿换电动车？", "他们担心充电不方便、维修成本高或技术不成熟。"],
        ["学生能怎样支持绿色交通？", "学生可多搭公共交通、步行或骑脚踏车，也可向家人分享环保资讯。"],
      ],
    ),
  },
  {
    id: "zaobao-water-resilience",
    topicId: "environment",
    topicLabel: "环境",
    title: "节水创新：为什么每一滴水都关系到新加坡的韧性？",
    sourceName: "联合早报",
    sourceTitle: "政府拨近1亿元 推动水资源优化与工业节水创新",
    sourceUrl: "https://www.zaobao.com.sg/realtime/singapore/story20260616-7049020",
    sourceDate: "2026-06-16",
    sourceSnippet:
      "联合早报报道政府投入资金推动水资源优化与工业节水创新。本文改写成适合中学生的原创练习，讨论水资源、工业责任和个人节水习惯。",
    readingTime: "8 min",
    tags: ["水资源", "工业节水", "绿色发展", "国家韧性"],
    paragraphs: [
      {
        zh:
          "新加坡没有辽阔的天然水源，因此水资源从来不是理所当然的东西。面对气候变化、人口增长和工业需求，政府推动水资源优化，不只是为了节省开支，更是为了加强国家韧性。所谓韧性，就是在外部环境不稳定时，社会仍然能够保持基本运作。水看似平凡，却关系到家庭生活、工厂生产和公共卫生。",
        en:
          "Water security can be linked to climate change, industry, and national resilience.",
      },
      {
        zh:
          "工业节水尤其重要，因为一些行业在生产过程中需要大量用水。如果企业能通过科技循环利用废水，或改进生产流程，就能减少浪费，也能降低长期成本。这样的节水创新说明，环保并不一定和经济发展互相冲突；只要方法得当，企业既能提高效率，也能承担社会责任。",
        en:
          "This paragraph gives a balanced point: sustainability and economic efficiency can support each other.",
      },
      {
        zh:
          "对学生来说，节水也不是一句口号。洗澡时间缩短一点、及时关紧水龙头、提醒家人不要浪费，虽然都是小事，却能培养珍惜资源的意识。更重要的是，学生要明白绿色发展需要未雨绸缪，不能等到危机出现才寻找长远之计。把每一滴水都用在值得的地方，才是物尽其用的态度。",
        en:
          "Good oral angle: personal habits matter because they build values before crisis arrives.",
      },
    ],
    vocab: [
      vocab("water-youhua", "水资源优化", "shuǐ zī yuán yōu huà", "water resource optimisation", "通过科技、规划和管理，让有限水源被更有效地使用。", "水资源优化能帮助新加坡应对长期用水需求。", "环境题可用：水资源优化体现了政府未雨绸缪的治理思维。"),
      vocab("water-gongye", "工业节水", "gōng yè jié shuǐ", "industrial water conservation", "企业在生产过程中减少用水和浪费。", "工业节水不仅保护环境，也能降低企业成本。", "可用于讨论企业社会责任。"),
      vocab("water-renxing", "韧性", "rèn xìng", "resilience", "面对压力、危机或变化时保持稳定和恢复能力。", "稳定的水源供应能增强国家韧性。", "高分表达：韧性社会需要长远规划，而不是临时补救。"),
      vocab("water-xunhuan", "循环利用", "xún huán lì yòng", "recycle and reuse", "把资源处理后再次使用，减少浪费。", "工厂可循环利用废水，减少对新水源的依赖。", "环保与科技题常用。"),
      vocab("water-choumou", "未雨绸缪", "wèi yǔ chóu móu", "prepare for difficulties in advance", "还没有下雨就先修补门窗，比喻提前准备。", "面对水源压力，政府必须未雨绸缪。", "议论文高级成语：未雨绸缪比亡羊补牢更有效。"),
      vocab("water-changyuan", "长远之计", "cháng yuǎn zhī jì", "long-term solution", "能够从根本上解决问题的长期办法。", "节水创新是保障水安全的长远之计。", "可和“权宜之计”对比使用。"),
    ],
    phrases: [
      phrase("water-xishui", "成语", "细水长流", "xì shuǐ cháng liú", "节约使用，才能长期维持。", "水资源管理讲求细水长流，不能只看眼前方便。"),
      phrase("water-kaiyuan", "俗语", "开源节流", "kāi yuán jié liú", "增加来源，同时减少浪费。", "面对资源有限的现实，政府和企业都需要开源节流。"),
      phrase("water-haoci", "好词好句", "把每一滴水都当成国家韧性的考题", "bǎ měi yī dī shuǐ dōu dāng chéng guó jiā rèn xìng de kǎo tí", "把节水提升到国家安全和社会责任层面。", "在新加坡，节水不是小题大做，而是国家韧性的一部分。"),
    ],
    oral: oralPack(
      "新加坡要长期保障水资源安全，政府、企业和个人哪一方最关键？",
      "新加坡水源有限，因此水资源优化和工业节水越来越重要。",
      "我认为三方都重要，但政府的规划最关键，因为它能带动企业和个人行动。",
      "政府可投入科技和制定标准，企业可循环利用水源，个人则要养成节水习惯。",
      "学校可通过节水项目和新闻讨论，让学生从日常生活理解资源韧性。",
      [
        ["为什么水资源问题适合放进口试讨论？", "因为它连接环境、科技、民生和国家安全，能展现学生综合分析问题的能力。"],
        ["企业为什么要参与节水？", "企业用水量较大，如果能改进流程，影响会比个人更明显，也能体现社会责任。"],
        ["个人节水会不会太微不足道？", "单个人的作用有限，但习惯会影响家庭和社会风气，长期累积就有意义。"],
      ],
    ),
  },
  {
    id: "zaobao-ai-tcm-health",
    topicId: "health",
    topicLabel: "健康",
    title: "AI遇上中医：科技能不能让养生更个性化？",
    sourceName: "联合早报",
    sourceTitle: "从舌诊辨证到智能艾灸 AI为中医养生添助力",
    sourceUrl: "https://www.zaobao.com.sg/news/china/story20260616-7049061",
    sourceDate: "2026-06-16",
    sourceSnippet:
      "联合早报报道人工智能被用于舌诊辨证、智能艾灸等中医养生场景。本文原创改写，训练学生讨论科技、健康管理和判断力。",
    readingTime: "8 min",
    tags: ["人工智能", "健康管理", "中医养生", "判断力"],
    paragraphs: [
      {
        zh:
          "过去，人们谈到中医养生，常想到望闻问切、草药和艾灸。如今，人工智能开始进入这个领域，例如通过舌诊图像分析身体状态，或根据个人情况提供智能艾灸建议。这种变化让健康服务看起来更个性化，也更方便，但它同时提醒我们：科技可以辅助判断，却不能完全取代专业医生。",
        en:
          "Use this as a balanced tech-health discussion: convenience plus limits.",
      },
      {
        zh:
          "如果使用得当，人工智能能帮助人们更早关注身体变化。它可以整理数据、发现规律，并提醒用户改善作息、饮食和运动。不过，健康管理最怕的是误信偏方或过度依赖软件。一个算法即使再先进，也不一定了解每个人复杂的病史和生活环境。",
        en:
          "A strong point: AI can notice patterns, but health advice needs context and professional judgement.",
      },
      {
        zh:
          "因此，学生在讨论这类新闻时，可以强调明辨是非的重要性。科技让养生更便利，却也可能制造焦虑，让人把普通小症状看成大问题。真正负责任的做法，是把人工智能当作辅助工具，必要时寻求专业意见。对症下药，才不会让科技服务健康的初衷流于形式。",
        en:
          "Good exam ending: technology should support health, not create anxiety or replace judgement.",
      },
    ],
    vocab: [
      vocab("health-shezhen", "舌诊", "shé zhěn", "tongue diagnosis", "通过观察舌头状态来辅助判断身体情况。", "人工智能可通过图像分析协助舌诊。", "健康与科技题可用。"),
      vocab("health-bianzheng", "辨证", "biàn zhèng", "diagnostic pattern analysis", "中医根据症状和体质综合判断问题。", "辨证需要经验，也需要了解个人情况。", "可用于说明AI不能完全取代专业判断。"),
      vocab("health-aijiu", "智能艾灸", "zhì néng ài jiǔ", "smart moxibustion", "利用科技辅助控制或建议艾灸方式。", "智能艾灸让传统养生方式变得更方便。", "讨论传统文化与科技结合时可用。"),
      vocab("health-gexinghua", "个性化", "gè xìng huà", "personalised", "根据个人情况作出调整。", "个性化健康建议比统一建议更有针对性。", "科技教育健康题都常用。"),
      vocab("health-yangsheng", "养生", "yǎng shēng", "health preservation", "通过饮食、作息和运动维持健康。", "年轻人也应该重视养生，而不是等生病后才后悔。", "可用于健康生活方式题。"),
      vocab("health-pianfang", "误信偏方", "wù xìn piān fāng", "wrongly trust folk remedies", "没有科学或专业依据就相信偏门治疗方法。", "误信偏方可能延误治疗。", "口试可用：公众必须提高健康素养，避免误信偏方。"),
    ],
    phrases: [
      phrase("health-duizheng", "成语", "对症下药", "duì zhèng xià yào", "针对问题采取合适方法。", "健康管理必须对症下药，不能盲目照搬网络建议。"),
      phrase("health-suyao", "俗语", "是药三分毒", "shì yào sān fēn dú", "提醒人们用药和治疗要谨慎。", "面对健康资讯，我们要记住是药三分毒，不可自行乱试。"),
      phrase("health-haoci", "好词好句", "科技应为健康加分，而不是制造焦虑", "kē jì yīng wèi jiàn kāng jiā fēn, ér bú shì zhì zào jiāo lǜ", "强调科技应帮助人，而不是让人更不安。", "人工智能进入健康领域后，更需要清楚边界。"),
    ],
    oral: oralPack(
      "人工智能进入健康管理领域，对公众来说是利大于弊，还是弊大于利？",
      "人工智能能提供个性化健康建议，也能辅助传统养生方式。",
      "我认为整体利大于弊，但前提是公众不能盲目依赖科技。",
      "AI能提高便利性和效率，但健康判断需要专业知识，也涉及个人体质。",
      "政府和学校可加强健康素养教育，让学生学会分辨可靠资讯。",
      [
        ["为什么年轻人也要关心健康管理？", "因为作息、饮食和运动习惯往往从年轻时形成，越早重视越能预防问题。"],
        ["AI健康建议有什么风险？", "它可能忽略个人病史，也可能让人误把软件建议当成医生诊断。"],
        ["传统中医和现代科技能不能结合？", "可以。科技能提高便利性和数据分析能力，但传统经验和专业判断仍然重要。"],
      ],
    ),
  },
  {
    id: "zaobao-ai-industry-agents",
    topicId: "technology",
    topicLabel: "科技",
    title: "AI智能体来了：学生为什么要理解产业变化？",
    sourceName: "联合早报",
    sourceTitle: "林玉文：“AI+产业”与“AI智能体”",
    sourceUrl: "https://www.zaobao.com.sg/forum/views/story20260616-7034235",
    sourceDate: "2026-06-16",
    sourceSnippet:
      "联合早报观点文章讨论“AI+产业”和AI智能体。本文原创改写为中学生可理解的科技与未来工作素材。",
    readingTime: "8 min",
    tags: ["AI智能体", "产业转型", "未来工作", "数据安全"],
    paragraphs: [
      {
        zh:
          "人们过去常把人工智能理解为聊天工具，但AI智能体的出现，让科技的角色更进一步。它不只是回答问题，还可能根据目标安排步骤、调用工具、整理资料，甚至协助完成一部分工作流程。对学生来说，这不只是科技新闻，而是未来学习和就业环境正在改变的信号。",
        en:
          "AI agents can be discussed as a shift from answering questions to carrying out tasks.",
      },
      {
        zh:
          "当人工智能进入产业转型，许多重复性劳动会被自动化处理。企业可能用AI提升效率，减少人为错误，也让员工把时间放在沟通、创意和判断上。可是，效率提高并不代表所有问题都会迎刃而解。数据安全、责任归属和员工再培训，都是社会必须认真面对的课题。",
        en:
          "Balanced point: productivity gains come with safety, accountability, and training concerns.",
      },
      {
        zh:
          "因此，中学生不必因为人工智能而过度焦虑，但也不能视而不见。真正重要的是学会和工具协同，懂得提出好问题、检查资料来源，并培养不容易被取代的能力。工欲善其事，必先利其器；不过，利器掌握在人手中，才不会反过来牵着人走。",
        en:
          "Good oral conclusion: students should learn to work with AI while keeping human judgement.",
      },
    ],
    vocab: [
      vocab("agent-zhinengti", "AI智能体", "zhì néng tǐ", "AI agent", "能够根据目标自主安排步骤并调用工具的人工智能系统。", "AI智能体可能改变人们完成工作的方式。", "科技题新词，可用来讨论未来工作。"),
      vocab("agent-chanye", "产业转型", "chǎn yè zhuǎn xíng", "industrial transformation", "行业因科技、市场或政策而改变运作方式。", "人工智能正在推动许多行业的产业转型。", "可用于经济与科技结合题。"),
      vocab("agent-zidonghua", "自动化", "zì dòng huà", "automation", "用机器或系统完成原本需要人手的工作。", "自动化能减少重复性劳动。", "未来就业题常用。"),
      vocab("agent-xietong", "协同", "xié tóng", "collaborate; coordinate", "多方配合，一起完成目标。", "学生要学会与人工智能协同，而不是完全依赖它。", "高分表达：人机协同将成为未来重要能力。"),
      vocab("agent-anquan", "数据安全", "shù jù ān quán", "data security", "保护个人或机构资料不被滥用或泄露。", "企业使用AI时必须重视数据安全。", "可用于隐私、诈骗、科技监管题。"),
      vocab("agent-xiaolv", "提升效率", "tí shēng xiào lǜ", "improve efficiency", "用更少时间或资源完成更多事情。", "AI能帮助企业提升效率，但不能代替价值判断。", "科技利弊题基本表达。"),
    ],
    phrases: [
      phrase("agent-gongyu", "成语", "工欲善其事，必先利其器", "gōng yù shàn qí shì, bì xiān lì qí qì", "要做好事情，先要准备合适工具。", "学习AI技能正是为了在未来善用工具。"),
      phrase("agent-libing", "俗语", "利弊并存", "lì bì bìng cún", "好处和坏处同时存在。", "AI智能体利弊并存，关键在于制度和使用者素养。"),
      phrase("agent-haoci", "好词好句", "让AI成为助手而不是替身", "ràng AI chéng wéi zhù shǒu ér bú shì tì shēn", "强调人工智能应辅助人，而不是让人放弃思考。", "学生应让AI成为助手而不是替身，保持独立判断。"),
    ],
    oral: oralPack(
      "AI智能体越来越普及，学生应如何为未来工作做好准备？",
      "AI智能体能执行更复杂的任务，未来工作模式会继续改变。",
      "我认为学生应学习AI工具，但更要培养沟通、判断和适应能力。",
      "重复性劳动可能被自动化取代，而人类优势在于创意、同理心和价值判断。",
      "学校可设计项目式学习，让学生在真实任务中练习人机协同。",
      [
        ["AI会不会让很多人失业？", "部分工作会受影响，但也会出现新岗位。关键是社会要提供再培训，个人也要终身学习。"],
        ["学生使用AI完成作业算不算作弊？", "如果直接复制答案就是不诚信；如果用来整理资料、检查思路，并注明使用方式，就更合理。"],
        ["政府需要监管AI吗？", "需要。监管能保护数据安全，也能明确责任，避免技术被滥用。"],
      ],
    ),
  },
];

const state = loadState();
let timerId = null;
let deferredInstallPrompt = null;

function vocab(id, term, pinyin, english, meaning, example, examUse) {
  return { id, term, pinyin, english, meaning, example, examUse, type: "vocab" };
}

function phrase(id, label, term, pinyin, meaning, example) {
  const typeMap = { 成语: "chengyu", 俗语: "suyu", 好词好句: "haoci" };
  return { id, label, term, pinyin, meaning, example, type: typeMap[label] || "phrase" };
}

function oralPack(prompt, phenomenon, stance, reason, suggestion, questions) {
  return {
    prompt,
    outline: [
      ["现象", phenomenon],
      ["立场", stance],
      ["理由", reason],
      ["建议", suggestion],
    ],
    questions: questions.map(([q, sample]) => ({ q, sample })),
  };
}

function loadState() {
  const fallback = {
    tab: "today",
    articleId: articles[0].id,
    topicFilter: "all",
    pinyin: false,
    english: false,
    saved: {},
    reviews: {},
    completedDates: [],
    notes: "",
    timerLeft: 120,
    pipeline: {
      status: "fallback",
      message: "Prototype article library ready",
      checkedAt: null,
    },
  };

  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return fallback;
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function singaporeDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Singapore",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function singaporeDateLabel(date = new Date()) {
  return new Intl.DateTimeFormat("zh-SG", {
    timeZone: "Asia/Singapore",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function currentArticle() {
  return articles.find((article) => article.id === state.articleId) || articles[0];
}

function filteredArticles() {
  if (state.topicFilter === "all") return articles;
  return articles.filter((article) => article.topicId === state.topicFilter);
}

function setArticle(id) {
  if (!articles.some((article) => article.id === id)) return;
  state.articleId = id;
  state.timerLeft = 120;
  persist();
  render();
}

function nextArticle() {
  const list = filteredArticles();
  const currentIndex = Math.max(0, list.findIndex((article) => article.id === state.articleId));
  const next = list[(currentIndex + 1) % list.length];
  setArticle(next.id);
  showToast(`已切换：${next.topicLabel}`);
}

function setTopicFilter(topicId) {
  state.topicFilter = topicId;
  const list = filteredArticles();
  if (!list.some((article) => article.id === state.articleId)) {
    state.articleId = list[0]?.id || articles[0].id;
  }
  persist();
  render();
}

function allLearnableItems() {
  return articles.flatMap((article) => [
    ...article.vocab.map((item) => ({ ...item, articleId: article.id, articleTitle: article.title })),
    ...article.phrases.map((item) => ({ ...item, articleId: article.id, articleTitle: article.title })),
  ]);
}

function itemById(id) {
  return allLearnableItems().find((item) => item.id === id);
}

function savedItems() {
  return Object.values(state.saved)
    .map((entry) => ({ ...entry.item, savedAt: entry.savedAt }))
    .sort((a, b) => b.savedAt - a.savedAt);
}

function reviewFor(id) {
  if (!state.reviews[id]) {
    state.reviews[id] = {
      interval: 1,
      dueAt: Date.now(),
      seen: 0,
      mastered: false,
    };
  }
  return state.reviews[id];
}

function dueSavedItems() {
  return savedItems().filter((item) => {
    const review = reviewFor(item.id);
    return !review.mastered && review.dueAt <= Date.now();
  });
}

function completeToday() {
  const key = singaporeDateKey();
  if (!state.completedDates.includes(key)) {
    state.completedDates.push(key);
    state.completedDates = state.completedDates.slice(-60);
  }
  persist();
}

function currentStreak() {
  const completed = new Set(state.completedDates);
  let count = 0;
  const cursor = new Date();
  for (let i = 0; i < 60; i += 1) {
    const key = singaporeDateKey(cursor);
    if (!completed.has(key)) break;
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

function highlightTerms(text, article = currentArticle()) {
  const items = [...article.vocab, ...article.phrases]
    .sort((a, b) => b.term.length - a.term.length);

  let output = "";
  let index = 0;

  while (index < text.length) {
    const item = items.find((candidate) => text.startsWith(candidate.term, index));
    if (item) {
      output += state.pinyin
        ? `<span class="inline-term pinyin-term">${renderRubyTerm(item.term, item.pinyin)}</span>`
        : `<mark class="inline-term">${escapeHtml(item.term)}</mark>`;
      index += item.term.length;
    } else {
      output += escapeHtml(text[index]);
      index += 1;
    }
  }

  return output;
}

function renderRubyTerm(term, pinyin) {
  const chars = [...term];
  const hanChars = chars.filter(isHanCharacter);
  const syllables = String(pinyin || "")
    .replace(/[，,；;]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (hanChars.length && hanChars.length === syllables.length) {
    let syllableIndex = 0;
    return chars
      .map((char) => {
        if (!isHanCharacter(char)) return escapeHtml(char);
        const ruby = `<ruby><rb>${escapeHtml(char)}</rb><rt>${escapeHtml(syllables[syllableIndex])}</rt></ruby>`;
        syllableIndex += 1;
        return ruby;
      })
      .join("");
  }

  return `<ruby><rb>${escapeHtml(term)}</rb><rt>${escapeHtml(pinyin || "")}</rt></ruby>`;
}

function isHanCharacter(char) {
  return /[\u3400-\u9fff]/u.test(char);
}

function recommendedArticles() {
  const current = currentArticle();
  const picks = [current];
  const preferredSources = ["联合早报", "8world", "CNA", "CNA TODAY"];

  for (const source of preferredSources) {
    const article = articles.find(
      (candidate) => candidate.id !== current.id && candidate.sourceName.includes(source),
    );
    if (article && !picks.some((picked) => picked.id === article.id)) {
      picks.push(article);
    }
  }

  for (const article of articles) {
    if (picks.length >= 5) break;
    if (!picks.some((picked) => picked.id === article.id)) picks.push(article);
  }

  return picks.slice(0, 5);
}

function render() {
  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.classList.toggle("active", button.dataset.nav === state.tab);
  });

  const titleMap = {
    today: "今日沉浸",
    review: "复习",
    saved: "词句本",
    oral: "口试",
    profile: "进度",
  };
  document.getElementById("screenTitle").textContent = titleMap[state.tab];

  const view = document.getElementById("view");
  const renderers = {
    today: renderToday,
    review: renderReview,
    saved: renderSaved,
    oral: renderOral,
    profile: renderProfile,
  };
  view.innerHTML = renderers[state.tab]();
}

function renderToday() {
  const article = currentArticle();
  const completed = state.completedDates.includes(singaporeDateKey());
  const list = filteredArticles();

  return `
    <section class="cover-hero">
      <img src="./hero-cover.png" alt="Elegant Chinese study desk with a news reading app" />
      <div class="cover-copy">
        <span class="chip warm">${escapeHtml(singaporeDateLabel())}</span>
        <h2>每天读一点，语感就会慢慢长出来。</h2>
        <p>新闻主题 · 原创中文篇章 · 有声调拼音 · 词句反复练</p>
      </div>
    </section>

    <section class="topic-strip" aria-label="Topic filters">
      ${topics
        .map(
          (topic) => `
            <button class="topic-pill ${state.topicFilter === topic.id ? "active" : ""}" type="button" data-topic-filter="${topic.id}">
              ${escapeHtml(topic.label)}
            </button>
          `,
        )
        .join("")}
    </section>

    <section class="lesson-hero">
      <div class="hero-copy">
        <div class="source-row">
          <span class="chip">${escapeHtml(article.topicLabel)}</span>
          <span class="chip amber">${escapeHtml(article.readingTime)}</span>
          <a class="source-link" href="${article.sourceUrl}" target="_blank" rel="noreferrer">
            源文：${escapeHtml(article.sourceName)}
          </a>
        </div>
        <h2 class="lesson-title">${escapeHtml(article.title)}</h2>
        <p class="lesson-summary">${escapeHtml(article.sourceSnippet)}</p>
        <div class="action-row hero-actions">
          <button class="primary-button" type="button" data-next-article>Next article</button>
          <button class="secondary-button" type="button" data-nav-jump="oral">练口头报告</button>
        </div>
      </div>
    </section>

    <section class="toolbar" aria-label="Reading controls">
      <button class="toggle-button ${state.pinyin ? "active" : ""}" type="button" data-toggle="pinyin">
        词下拼音 ${state.pinyin ? "On" : "Off"}
      </button>
      <button class="toggle-button ${state.english ? "active" : ""}" type="button" data-toggle="english">
        Hints ${state.english ? "On" : "Off"}
      </button>
    </section>

    <section class="card reading-card">
      <div class="chip-row">
        ${article.tags.map((tag) => `<span class="chip soft">${escapeHtml(tag)}</span>`).join("")}
      </div>
      <div class="passage">
        ${article.paragraphs
          .map(
            (paragraph) => `
              <p>${highlightTerms(paragraph.zh, article)}</p>
              ${state.english ? `<p class="english-hint">${escapeHtml(paragraph.en)}</p>` : ""}
            `,
          )
          .join("")}
      </div>
    </section>

    <section class="panel">
      <h2>今日词汇</h2>
      <div class="grid two">
        ${article.vocab.map(renderVocabCard).join("")}
      </div>
    </section>

    <section class="panel phrase-card">
      <h2>今日词句</h2>
      ${article.phrases.map(renderPhraseItem).join("")}
    </section>

    <section class="panel">
      <div class="section-heading">
        <h2>推荐源文</h2>
        <span class="small">跨新闻频道链接，不复制原文</span>
      </div>
      <div class="grid source-grid">
        ${recommendedArticles().map(renderSourceCard).join("")}
      </div>
    </section>

    <section class="panel">
      <div class="section-heading">
        <h2>阅读库</h2>
        <span class="small">${list.length} articles</span>
      </div>
      <div class="article-list">
        ${list.map(renderArticleRow).join("")}
      </div>
    </section>

    <section class="card">
      <div class="action-row">
        <button class="primary-button" type="button" data-complete>
          ${completed ? "今日已完成" : "完成今日练习"}
        </button>
        <button class="secondary-button" type="button" data-next-article>再读一篇</button>
      </div>
    </section>
  `;
}

function renderSourceCard(article) {
  return `
    <article class="source-card">
      <div>
        <span class="chip">${escapeHtml(article.sourceName)}</span>
        <h3>${escapeHtml(article.sourceTitle)}</h3>
        <p class="small">${escapeHtml(article.sourceDate)} · ${escapeHtml(article.topicLabel)}</p>
      </div>
      <a class="text-link" href="${article.sourceUrl}" target="_blank" rel="noreferrer">打开源文</a>
    </article>
  `;
}

function renderArticleRow(article) {
  const active = article.id === currentArticle().id;
  return `
    <article class="article-row ${active ? "active" : ""}">
      <div>
        <span class="chip ${active ? "warm" : "soft"}">${escapeHtml(article.topicLabel)}</span>
        <h3>${escapeHtml(article.title)}</h3>
        <p class="small">${escapeHtml(article.sourceName)} · ${escapeHtml(article.readingTime)}</p>
      </div>
      <button class="secondary-button compact" type="button" data-open-article="${article.id}">
        ${active ? "正在读" : "阅读"}
      </button>
    </article>
  `;
}

function renderVocabCard(item) {
  const saved = Boolean(state.saved[item.id]);
  return `
    <article class="vocab-card">
      <div class="vocab-top">
        <div>
          <div class="term">${escapeHtml(item.term)}</div>
          <div class="term-meta tone">${escapeHtml(item.pinyin)} · ${escapeHtml(item.english)}</div>
        </div>
        <button class="mini-action ${saved ? "saved" : ""}" type="button" data-save="${item.id}" aria-label="Save ${escapeHtml(item.term)}">
          <svg><use href="#${saved ? "icon-check" : "icon-plus"}"></use></svg>
        </button>
      </div>
      <p class="example">${escapeHtml(item.meaning)}</p>
      <p class="example">${escapeHtml(item.example)}</p>
      <div class="exam-use">${escapeHtml(item.examUse)}</div>
    </article>
  `;
}

function renderPhraseItem(item) {
  const saved = Boolean(state.saved[item.id]);
  return `
    <article class="phrase-item">
      <div class="vocab-top">
        <div>
          <span class="chip coral">${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.term)}</strong>
          <div class="term-meta tone">${escapeHtml(item.pinyin)}</div>
        </div>
        <button class="mini-action ${saved ? "saved" : ""}" type="button" data-save="${item.id}" aria-label="Save ${escapeHtml(item.term)}">
          <svg><use href="#${saved ? "icon-check" : "icon-plus"}"></use></svg>
        </button>
      </div>
      <p class="example">${escapeHtml(item.meaning)}</p>
      <p class="example">${escapeHtml(item.example)}</p>
    </article>
  `;
}

function renderReview() {
  const due = dueSavedItems();
  const saved = savedItems();

  if (!saved.length) {
    return `
      <section class="empty-state card">
        <img src="./hero-cover.png" alt="" />
        <h2>先收藏几个词句</h2>
        <p class="small">从今日词汇开始收藏，复习页会安排默写和造句。</p>
        <button class="primary-button" type="button" data-nav-jump="today">去今日沉浸</button>
      </section>
    `;
  }

  const reviewItems = due.length ? due : saved.slice(0, 3);
  const dictation = reviewItems[0];

  return `
    <section class="card">
      <div class="metric-row">
        <span class="chip">Due ${due.length}</span>
        <span class="chip amber">Saved ${saved.length}</span>
      </div>
    </section>

    <section class="panel">
      <h2>默写回忆</h2>
      <article class="review-card">
        <p class="small">意思：${escapeHtml(dictation.meaning)}</p>
        <input class="review-input" data-dictation-input="${dictation.id}" autocomplete="off" placeholder="输入这个词或短语" />
        <div class="action-row">
          <button class="secondary-button" type="button" data-check-dictation="${dictation.id}">检查</button>
          <button class="secondary-button" type="button" data-reveal="${dictation.id}">显示答案</button>
        </div>
      </article>
    </section>

    <section class="panel">
      <h2>间隔复习</h2>
      <div class="grid">
        ${reviewItems.map(renderReviewCard).join("")}
      </div>
    </section>

    <section class="panel">
      <h2>造句训练</h2>
      <textarea class="notes-input" data-notes placeholder="用今天收藏的一个词写一句高级华文句子">${escapeHtml(
        state.notes,
      )}</textarea>
    </section>
  `;
}

function renderReviewCard(item) {
  const review = reviewFor(item.id);
  const dueLabel = review.dueAt <= Date.now() ? "现在复习" : `下次 ${new Date(review.dueAt).toLocaleDateString("zh-SG")}`;
  return `
    <article class="review-card">
      <div class="saved-top">
        <div>
          <div class="term">${escapeHtml(item.term)}</div>
          <div class="term-meta tone">${escapeHtml(item.pinyin || "")} · ${escapeHtml(dueLabel)}</div>
        </div>
        <span class="chip">${review.seen}x</span>
      </div>
      <p class="small">${escapeHtml(item.articleTitle || "阅读库词句")}</p>
      <p class="example">${escapeHtml(item.example)}</p>
      <div class="action-row">
        <button class="secondary-button" type="button" data-grade="${item.id}" data-result="again">再来</button>
        <button class="primary-button" type="button" data-grade="${item.id}" data-result="good">记得</button>
      </div>
    </article>
  `;
}

function renderSaved() {
  const saved = savedItems();
  if (!saved.length) {
    return `
      <section class="empty-state card">
        <img src="./hero-cover.png" alt="" />
        <h2>词句本是空的</h2>
        <p class="small">收藏词汇、成语、俗语和好词好句后，这里会成为你的个人素材库。</p>
        <button class="primary-button" type="button" data-nav-jump="today">去收藏</button>
      </section>
    `;
  }

  return `
    <section class="card">
      <div class="metric-row">
        <span class="chip">${saved.length} saved</span>
        <span class="chip amber">${dueSavedItems().length} due</span>
      </div>
    </section>
    <section class="grid">
      ${saved.map(renderSavedCard).join("")}
    </section>
  `;
}

function renderSavedCard(item) {
  const review = reviewFor(item.id);
  return `
    <article class="saved-card">
      <div class="saved-top">
        <div>
          <div class="term">${escapeHtml(item.term)}</div>
          <div class="term-meta tone">${escapeHtml(item.pinyin || "")} · ${escapeHtml(item.type)}</div>
        </div>
        <button class="mini-action" type="button" data-remove="${item.id}" aria-label="Remove ${escapeHtml(item.term)}">
          <svg><use href="#icon-trash"></use></svg>
        </button>
      </div>
      <p class="small">${escapeHtml(item.articleTitle || "阅读库词句")}</p>
      <p class="example">${escapeHtml(item.meaning)}</p>
      <p class="example">${escapeHtml(item.example)}</p>
      <div class="action-row">
        <button class="secondary-button" type="button" data-grade="${item.id}" data-result="good">安排复习</button>
        <button class="secondary-button" type="button" data-master="${item.id}">
          ${review.mastered ? "已掌握" : "标为掌握"}
        </button>
      </div>
    </article>
  `;
}

function renderOral() {
  const article = currentArticle();
  return `
    <section class="card">
      <span class="chip coral">${escapeHtml(article.topicLabel)} · 口头报告 · 2 min</span>
      <h2>${escapeHtml(article.oral.prompt)}</h2>
      <div class="timer-row">
        <span class="timer">${formatTimer(state.timerLeft)}</span>
        <button class="primary-button" type="button" data-timer="start">开始</button>
        <button class="secondary-button" type="button" data-timer="reset">重置</button>
      </div>
    </section>

    <section class="panel">
      <h2>报告框架</h2>
      <div class="outline-grid">
        ${article.oral.outline
          .map(
            ([label, text]) => `
              <div class="outline-item">
                <strong>${escapeHtml(label)}</strong>
                ${escapeHtml(text)}
              </div>
            `,
          )
          .join("")}
      </div>
    </section>

    <section class="panel">
      <h2>讨论问题</h2>
      <div class="grid">
        ${article.oral.questions
          .map(
            (question, index) => `
              <article class="question-card">
                <h3>${index + 1}. ${escapeHtml(question.q)}</h3>
                <button class="secondary-button" type="button" data-sample="${index}">参考回答</button>
                <p class="english-hint" id="sample-${index}" hidden>${escapeHtml(question.sample)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderProfile() {
  const pipeline = state.pipeline;
  return `
    <section class="stats-grid">
      <div class="stat"><strong>${currentStreak()}</strong><span>day streak</span></div>
      <div class="stat"><strong>${state.completedDates.length}</strong><span>lessons done</span></div>
      <div class="stat"><strong>${savedItems().length}</strong><span>saved words</span></div>
    </section>

    <section class="panel">
      <h2>考试目标</h2>
      <p class="example">Singapore-Cambridge GCE O-Level Higher Chinese 1116</p>
      <div class="chip-row">
        <span class="chip">口头报告</span>
        <span class="chip">讨论</span>
        <span class="chip">阅读理解</span>
        <span class="chip">写作素材</span>
      </div>
    </section>

    <section class="panel">
      <h2>内容库</h2>
      <div class="stats-grid mini">
        <div class="stat"><strong>${articles.length}</strong><span>原创练习篇章</span></div>
        <div class="stat"><strong>${topics.length - 1}</strong><span>主题筛选</span></div>
        <div class="stat"><strong>${allLearnableItems().length}</strong><span>可收藏词句</span></div>
      </div>
    </section>

    <section class="panel">
      <h2>内容管线</h2>
      <div class="metric-row">
        <span class="status-pill ${pipeline.status === "live" ? "" : "warn"}">${escapeHtml(pipeline.message)}</span>
      </div>
      <p class="small">原型目前内置原创练习篇章，并链接到具体新闻源文；正式版可接入RSS抓取、AI改写和自动安全检查。</p>
      <div class="grid">
        ${allowedSources
          .map(
            (source) => `
              <article class="review-card">
                <strong>${escapeHtml(source.name)}</strong>
                <a href="${source.url}" target="_blank" rel="noreferrer">${escapeHtml(source.url)}</a>
                <p class="small">${escapeHtml(source.use)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function formatTimer(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function toggleSave(id) {
  const item = itemById(id);
  if (!item) return;

  if (state.saved[id]) {
    delete state.saved[id];
    delete state.reviews[id];
    showToast("已从词句本移除");
  } else {
    state.saved[id] = { item, savedAt: Date.now() };
    reviewFor(id);
    showToast(`已收藏：${item.term}`);
  }
  persist();
  render();
}

function gradeReview(id, result) {
  const review = reviewFor(id);
  review.seen += 1;
  review.mastered = false;
  if (result === "again") {
    review.interval = 1;
  } else {
    review.interval = Math.min(Math.max(review.interval * 2, 2), 16);
  }
  review.dueAt = Date.now() + review.interval * DAY;
  persist();
  render();
  showToast(result === "again" ? "明天再复习" : "已安排下一次复习");
}

function resetTimer() {
  window.clearInterval(timerId);
  timerId = null;
  state.timerLeft = 120;
  persist();
  render();
}

function startTimer() {
  if (timerId) return;
  timerId = window.setInterval(() => {
    state.timerLeft = Math.max(0, state.timerLeft - 1);
    persist();
    if (state.tab === "oral") render();
    if (state.timerLeft === 0) {
      window.clearInterval(timerId);
      timerId = null;
      showToast("两分钟到");
    }
  }, 1000);
}

async function checkPipelineHealth() {
  const rssUrl = "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=10416";
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 3500);
  try {
    const response = await fetch(rssUrl, { signal: controller.signal });
    if (!response.ok) throw new Error("RSS unavailable");
    state.pipeline = {
      status: "live",
      message: "RSS metadata reachable",
      checkedAt: Date.now(),
    };
  } catch {
    state.pipeline = {
      status: "fallback",
      message: "Using built-in article library",
      checkedAt: Date.now(),
    };
  } finally {
    window.clearTimeout(timeout);
    persist();
    if (state.tab === "profile") render();
  }
}

document.addEventListener("click", async (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.dataset.nav) {
    state.tab = target.dataset.nav;
    persist();
    render();
    return;
  }

  if (target.dataset.navJump) {
    state.tab = target.dataset.navJump;
    persist();
    render();
    return;
  }

  if (target.dataset.topicFilter) {
    setTopicFilter(target.dataset.topicFilter);
    return;
  }

  if (target.dataset.openArticle) {
    setArticle(target.dataset.openArticle);
    return;
  }

  if (target.hasAttribute("data-next-article")) {
    nextArticle();
    return;
  }

  if (target.dataset.toggle) {
    state[target.dataset.toggle] = !state[target.dataset.toggle];
    persist();
    render();
    return;
  }

  if (target.dataset.save) {
    toggleSave(target.dataset.save);
    return;
  }

  if (target.hasAttribute("data-complete")) {
    completeToday();
    render();
    showToast("今日练习已完成");
    return;
  }

  if (target.dataset.grade) {
    gradeReview(target.dataset.grade, target.dataset.result);
    return;
  }

  if (target.dataset.remove) {
    delete state.saved[target.dataset.remove];
    delete state.reviews[target.dataset.remove];
    persist();
    render();
    showToast("已移除");
    return;
  }

  if (target.dataset.master) {
    const review = reviewFor(target.dataset.master);
    review.mastered = !review.mastered;
    persist();
    render();
    return;
  }

  if (target.dataset.reveal) {
    const item = itemById(target.dataset.reveal);
    showToast(item ? item.term : "答案未找到");
    return;
  }

  if (target.dataset.checkDictation) {
    const input = document.querySelector(`[data-dictation-input="${target.dataset.checkDictation}"]`);
    const item = itemById(target.dataset.checkDictation);
    const correct = item && input?.value.trim() === item.term;
    showToast(correct ? "正确" : `再想想：${item?.term || ""}`);
    return;
  }

  if (target.dataset.sample) {
    const sample = document.getElementById(`sample-${target.dataset.sample}`);
    if (sample) sample.hidden = !sample.hidden;
    return;
  }

  if (target.dataset.timer === "start") {
    startTimer();
    return;
  }

  if (target.dataset.timer === "reset") {
    resetTimer();
    return;
  }

  if (target.id === "installButton" && deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt = null;
    target.hidden = true;
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-notes]")) {
    state.notes = event.target.value;
    persist();
  }
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  document.getElementById("installButton").hidden = false;
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

render();
checkPipelineHealth();
