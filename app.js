const DAY = 24 * 60 * 60 * 1000;
const STORAGE_KEY = "chinese-tutor-prototype-v2";
const ARTICLE_REFRESH_CADENCES = ["daily", "weekly"];
const DEFAULT_REFRESH_CADENCE = "weekly";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const APP_CONFIG = typeof window === "undefined" ? {} : window.CHINESE_TUTOR_CONFIG || {};
const PROFILE_LEAD_ENDPOINT = String(APP_CONFIG.profileLeadEndpoint || "").trim();
const PROFILE_LEAD_POST_MODE = String(APP_CONFIG.profileLeadPostMode || "auto").trim();
const OWNER_LEAD_ENDPOINT = String(APP_CONFIG.ownerLeadEndpoint || PROFILE_LEAD_ENDPOINT).trim();
const ANONYMOUS_VISITOR_ENDPOINT = "";
const LOCAL_LEAD_HISTORY_LIMIT = 2000;
const ANON_VISITOR_STORAGE_KEY = "chinese-tutor-anon-visits-v1";
const OWNER_TOOLS_STORAGE_KEY = "chinese-tutor-owner-tools-v1";
const OWNER_LEAD_TOKEN_STORAGE_KEY = "chinese-tutor-owner-lead-token-v1";
const LEAD_SYNC_STATUS_STORAGE_KEY = "chinese-tutor-lead-sync-status-v1";
const DAILY_ARTICLE_ID = "daily-recent";
const PINYIN_ENGINE_URL = "https://cdn.jsdelivr.net/npm/pinyin-pro@3.28.1/+esm";
const PINYIN_CACHE_LIMIT = 250;
const RECENT_HEADLINE_WINDOW_DAYS = 7;
const RECENT_HEADLINE_LIMIT = 24;
const WEEKLY_MAILER_SEND_LABEL = "Sunday 8:00am SGT";
const CHINESE_SOURCE_NAMES = ["8world", "联合早报", "Zaobao", "早报校园", "ZBSchools"];
const HEADLINE_FEEDS = [
  {
    sourceName: "CNA",
    section: "Top stories",
    url: "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml",
  },
  {
    sourceName: "CNA",
    section: "Singapore",
    url: "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=10416",
  },
];

const CURATED_CHINESE_RECENT_HEADLINES = [
  {
    sourceName: "早报校园",
    sourceTitle: "英国禁止青少年使用社媒",
    sourceUrl: "https://www.zbschools.sg/article/detail/2026061500154?ref=home-latest",
    sourceDate: "2026-06-15",
    topicId: "technology",
    sourceSnippet: "青少年上网安全、社媒监管与数码自律。",
  },
  {
    sourceName: "联合早报",
    sourceTitle: "资媒局未来四年投4800万元 助媒体业者发展数码内容",
    sourceUrl: "https://www.zaobao.com.sg/news/singapore/story20260618-9222813",
    sourceDate: "2026-06-18",
    topicId: "technology",
    sourceSnippet: "媒体业、人工智能与数码内容转型。",
  },
  {
    sourceName: "联合早报",
    sourceTitle: "探讨缓解教育“军备竞赛” 早报与教育部联办对话会邀公众建言",
    sourceUrl: "https://www.zaobao.com.sg/news/singapore/story20260618-9208354",
    sourceDate: "2026-06-18",
    topicId: "education",
    sourceSnippet: "教育压力、成功定义与公众参与。",
  },
  {
    sourceName: "8world",
    sourceTitle: "87%国人每周都会刷社媒视频 政府拨4800万元助媒体业转型",
    sourceUrl: "https://www.8world.com/singapore/imda-media-proejct-3185226",
    sourceDate: "2026-06-18",
    topicId: "technology",
    sourceSnippet: "社媒视频、媒体转型与数码素养。",
  },
  {
    sourceName: "8world",
    sourceTitle: "2027年QS世界大学排名 国立大学稳居前十",
    sourceUrl: "https://www.8world.com/singapore/2027-qs-world-university-rankings-3185206",
    sourceDate: "2026-06-18",
    topicId: "education",
    sourceSnippet: "高等教育、国际排名与人才竞争。",
  },
  {
    sourceName: "8world",
    sourceTitle: "什么东西可丢蓝色回收箱？ 调查：过半受访者仍不清楚",
    sourceUrl: "https://www.8world.com/singapore/reclycling-bin-poll-3184931",
    sourceDate: "2026-06-17",
    topicId: "environment",
    sourceSnippet: "回收习惯、环保教育与公众意识。",
  },
  {
    sourceName: "8world",
    sourceTitle: "首任网安局局长许智贤7月荣休 方素仪接棒掌舵",
    sourceUrl: "https://www.8world.com/singapore/csa-to-get-new-chief-executive-3184946",
    sourceDate: "2026-06-17",
    topicId: "technology",
    sourceSnippet: "网络安全、公共机构与数码治理。",
  },
  {
    sourceName: "8world",
    sourceTitle: "我国积极推广巧固球 让运动员一起训练和比赛",
    sourceUrl: "https://www.8world.com/singapore/tchoukball-movement-launch-3184981",
    sourceDate: "2026-06-17",
    topicId: "culture",
    sourceSnippet: "体育参与、包容训练与社区生活。",
  },
  {
    sourceName: "8world",
    sourceTitle: "屋里水喉常流出“屎色水” 住户：闻起来有金属味",
    sourceUrl: "https://www.8world.com/singapore/discolored-water-bedok-reservoir-hdb-3185001",
    sourceDate: "2026-06-18",
    topicId: "society",
    sourceSnippet: "居住环境、公共卫生与居民反馈。",
  },
  {
    sourceName: "8world",
    sourceTitle: "疑居民煮东西忘关火 万国弯组屋单位发生火患",
    sourceUrl: "https://www.8world.com/singapore/fire-at-buangkok-crescent-3184996",
    sourceDate: "2026-06-17",
    topicId: "society",
    sourceSnippet: "居家安全、邻里警觉与公共责任。",
  },
  {
    sourceName: "8world",
    sourceTitle: "涉嫌无牌放贷 一对男女被捕",
    sourceUrl: "https://www.8world.com/singapore/man-and-woman-to-be-charged-for-unlicensed-moneylending-offences-3185236",
    sourceDate: "2026-06-18",
    topicId: "society",
    sourceSnippet: "法律意识、金钱压力与社区安全。",
  },
  {
    sourceName: "8world",
    sourceTitle: "伦敦市长向我国偷师 宣布在伦敦建造可负担住房",
    sourceUrl: "https://www.8world.com/singapore/sadiq-khan-announce-new-homes-in-london-after-visiting-sg-3185181",
    sourceDate: "2026-06-18",
    topicId: "livelihood",
    sourceSnippet: "住房政策、城市规划与民生压力。",
  },
  {
    sourceName: "8world",
    sourceTitle: "72岁老翁失踪 警方发寻人启事",
    sourceUrl: "https://www.8world.com/singapore/72-year-old-man-missing-3185196",
    sourceDate: "2026-06-18",
    topicId: "health",
    sourceSnippet: "乐龄安全、社区关怀与家庭责任。",
  },
];

const headlineCategories = [
  {
    id: "technology",
    label: "Tech / 科技",
    keywords: [
      "ai",
      "artificial intelligence",
      "cyber",
      "data",
      "digital",
      "internet",
      "online",
      "piracy",
      "robot",
      "scam",
      "tech",
      "人工智能",
      "网络",
      "数码",
      "数据",
      "盗版",
      "诈骗",
      "科技",
    ],
  },
  {
    id: "environment",
    label: "Environment & Food / 环境与食物",
    keywords: [
      "climate",
      "energy",
      "environment",
      "flood",
      "food",
      "insect",
      "rain",
      "sustain",
      "weather",
      "气候",
      "环境",
      "昆虫",
      "粮食",
      "能源",
      "天气",
      "食物",
    ],
  },
  {
    id: "education",
    label: "Education / 教育",
    keywords: ["exam", "school", "student", "teacher", "tuition", "university", "教育", "考试", "学生", "学校", "教师"],
  },
  {
    id: "health",
    label: "Health / 健康",
    keywords: ["disease", "doctor", "health", "hospital", "mental", "medical", "virus", "健康", "医院", "疾病", "心理", "医疗"],
  },
  {
    id: "livelihood",
    label: "Jobs, Money & Housing / 民生经济",
    keywords: [
      "business",
      "cost",
      "economy",
      "housing",
      "inflation",
      "job",
      "price",
      "rent",
      "retrench",
      "salary",
      "work",
      "就业",
      "工作",
      "房价",
      "经济",
      "裁员",
      "薪水",
    ],
  },
  {
    id: "culture",
    label: "Culture & Lifestyle / 文化生活",
    keywords: [
      "arts",
      "celebrity",
      "concert",
      "culture",
      "entertainment",
      "film",
      "lifestyle",
      "music",
      "sport",
      "文化",
      "电影",
      "生活",
      "体育",
      "演唱会",
      "娱乐",
    ],
  },
  {
    id: "society",
    label: "Society, Law & World / 社会与国际",
    keywords: [
      "court",
      "crime",
      "election",
      "government",
      "law",
      "police",
      "politics",
      "transport",
      "war",
      "world",
      "国际",
      "法律",
      "交通",
      "警方",
      "社会",
      "政府",
    ],
  },
];

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
  {
    name: "早报校园",
    url: "https://www.zbschools.sg/",
    language: "zh-SG",
    use: "Student-friendly simplified Chinese news for reading exposure",
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
  {
    id: "erp2-location-charging",
    topicId: "technology",
    topicLabel: "科技",
    title: "ERP 2.0定位收费：科技便利会不会牺牲隐私？",
    sourceName: "CNA",
    sourceTitle: "Singapore running pilot for ERP 2 location-based charging",
    sourceUrl: "https://www.channelnewsasia.com/singapore/erp-2-location-based-charging-trial-test-6182281",
    sourceDate: "2026-06-16",
    sourceSnippet:
      "CNA报道新加坡正测试ERP 2.0定位式收费。本文改写成原创练习，讨论智慧交通、拥堵管理和个人隐私之间的平衡。",
    readingTime: "6 min",
    tags: ["ERP 2.0", "智慧交通", "个人隐私", "公共政策"],
    paragraphs: [
      {
        zh:
          "电子道路收费系统升级后，交通管理不再只是经过龙门架时扣费那么简单。定位式收费如果正式推行，系统就能更细致地了解车辆在不同路段、不同时间的使用情况。对城市来说，这可能帮助政府更准确地缓解交通拥堵；对驾驶者来说，也可能让收费更接近实际使用量。",
        en:
          "Location-based road charging can be framed as smarter transport management, not only a payment upgrade.",
      },
      {
        zh:
          "不过，科技越贴近日常生活，公众越会关心隐私。车辆位置属于敏感资料，如果收集、保存和使用方式不够透明，人们难免担心资料被误用。因此，推行新系统时，政府必须清楚说明哪些数据会被收集、保存多久、谁能读取，以及公众如何监督。",
        en:
          "A balanced answer should mention privacy, transparency, data retention and public trust.",
      },
      {
        zh:
          "我认为，智慧交通本身并不可怕，关键在于制度是否跟得上科技。若能以最少资料达到交通管理目的，并定期公开成效与安全审查，公众会更容易接受改变。科技应服务公共利益，而不是让人觉得生活处处被监视。",
        en:
          "Good conclusion: technology is useful when safeguards and public accountability are clear.",
      },
    ],
    vocab: [
      vocab("erp-dingwei", "定位收费", "ding wei shou fei", "location-based charging", "根据车辆位置或行驶距离计算费用。", "定位收费可能让道路收费更精细，但也引发隐私讨论。", "交通与科技题可用：定位收费体现了智慧城市的发展。"),
      vocab("erp-yongdu", "交通拥堵", "jiao tong yong du", "traffic congestion", "车辆过多导致道路行驶缓慢。", "合理收费能在高峰时段减少交通拥堵。", "民生题常用：交通拥堵会影响生活效率。"),
      vocab("erp-yinsi", "个人隐私", "ge ren yin si", "personal privacy", "个人不希望随意公开或被滥用的资料。", "科技政策必须保护个人隐私。", "科技利弊题必备表达。"),
      vocab("erp-touming", "数据透明", "shu ju tou ming", "data transparency", "清楚说明资料如何被收集、保存和使用。", "数据透明能提升公众信任。", "可用于讨论政府与公众沟通。"),
    ],
    phrases: [
      phrase("erp-shuangren", "俗语", "一把双刃剑", "yi ba shuang ren jian", "同一件事既有好处也有风险。", "定位收费是一把双刃剑，既能改善交通，也会带来隐私顾虑。"),
      phrase("erp-haoci", "好词好句", "科技应服务公共利益", "ke ji ying fu wu gong gong li yi", "强调科技发展要以社会整体福祉为目标。", "智慧交通政策必须让科技服务公共利益。"),
    ],
    oral: oralPack(
      "你认为定位式道路收费对新加坡来说是利大于弊，还是弊大于利？",
      "新加坡正在测试更精细的智慧交通收费方式。",
      "我认为利大于弊，但前提是政府必须保护数据安全并提高透明度。",
      "它能缓解交通拥堵，让道路使用更公平；可是位置数据也涉及个人隐私。",
      "政府可公开数据使用规则，并定期让独立机构审查系统安全。",
      [
        ["为什么交通政策需要科技？", "因为城市道路有限，科技能帮助政府更准确地了解高峰时段和拥堵路段。"],
        ["公众为什么会担心定位收费？", "因为车辆位置属于敏感资料，如果使用方式不清楚，人们会担心被追踪或资料外泄。"],
        ["学生可以从这个新闻学到什么？", "学生可以学习如何从利弊两面讨论科技政策，并提出制度保障。"],
      ],
    ),
  },
  {
    id: "el-nino-heat-resilience",
    topicId: "environment",
    topicLabel: "环境",
    title: "厄尔尼诺可能回归：炎热天气为什么考验城市韧性？",
    sourceName: "CNA",
    sourceTitle: "El Nino could return as early as end-2026: What does this mean for Singapore?",
    sourceUrl: "https://www.channelnewsasia.com/singapore/el-nino-could-return-2026-what-does-mean-singapore-6165386",
    sourceDate: "2026-06-02",
    sourceSnippet:
      "CNA报道厄尔尼诺现象可能在2026年底回归。本文原创改写为气候、烟霾、节水和城市韧性的口试素材。",
    readingTime: "6 min",
    tags: ["气候变化", "厄尔尼诺", "城市韧性", "烟霾"],
    paragraphs: [
      {
        zh:
          "厄尔尼诺听起来像遥远的气候名词，但它可能影响新加坡人的日常生活。天气更热、更干时，用电量可能上升，水资源压力也会增加。若周边地区发生林火，跨境烟霾还可能影响空气质量和户外活动。",
        en:
          "Connect El Nino to heat, water use, electricity demand and haze risk.",
      },
      {
        zh:
          "面对极端天气，城市韧性非常重要。政府需要提前做好应急准备，例如加强天气预警、提醒公众节水、照顾年长者和户外工作者。同时，学校也可以借新闻教育学生理解气候风险，而不是只把环保当成口号。",
        en:
          "Urban resilience includes warning systems, public habits and care for vulnerable groups.",
      },
      {
        zh:
          "我认为，气候变化最可怕的地方，是它常常以小变化的形式出现，直到影响累积起来才被看见。节约用电、减少浪费、关注天气预警，看似普通，却能让社会更有准备。防患于未然，比灾害发生后才补救更有效。",
        en:
          "Good closing idea: small habits and early preparation reduce climate risk.",
      },
    ],
    vocab: [
      vocab("heat-elnino", "厄尔尼诺", "e er ni nuo", "El Nino", "一种会影响全球天气的气候现象。", "厄尔尼诺可能导致天气更炎热、更干燥。", "环境题新词，可用于讨论极端天气。"),
      vocab("heat-renxing", "城市韧性", "cheng shi ren xing", "urban resilience", "城市面对冲击后维持运作并恢复的能力。", "城市韧性越强，社会越能应对极端天气。", "高分表达：气候变化考验城市韧性。"),
      vocab("heat-yanmai", "跨境烟霾", "kua jing yan mai", "transboundary haze", "从其他地区飘来的烟雾污染。", "干旱季节可能增加跨境烟霾风险。", "适合环保与区域合作题。"),
      vocab("heat-yingji", "应急准备", "ying ji zhun bei", "emergency preparedness", "在危机发生前做好计划和资源安排。", "应急准备能降低极端天气带来的伤害。", "可用于灾害、健康和社会题。"),
    ],
    phrases: [
      phrase("heat-weiyu", "成语", "未雨绸缪", "wei yu chou mou", "事情发生前先做好准备。", "面对厄尔尼诺，政府和公众都应未雨绸缪。"),
      phrase("heat-fanghuan", "成语", "防患于未然", "fang huan yu wei ran", "在问题发生前预防它。", "气候政策应防患于未然，而不是事后补救。"),
    ],
    oral: oralPack(
      "面对更炎热的天气，新加坡人最需要改变什么生活习惯？",
      "气候现象可能带来高温、干旱和烟霾风险。",
      "我认为最需要改变的是能源和用水习惯，同时要更重视弱势群体。",
      "个人习惯会影响资源压力，而年长者和户外工作者更容易受炎热天气影响。",
      "学校和社区可加强气候教育，让公众学会看预警、节水和减少浪费。",
      [
        ["为什么学生要关心厄尔尼诺？", "因为它会影响天气、健康和生活成本，并不是离我们很远的科学名词。"],
        ["个人行动真的有用吗？", "单个人力量有限，但当许多人一起节约资源，就能减轻社会压力。"],
        ["政府能做什么？", "政府可以加强预警系统、改善遮荫设施，并支持受高温影响较大的群体。"],
      ],
    ),
  },
  {
    id: "kit-chan-local-music",
    topicId: "culture",
    topicLabel: "文化",
    title: "从演唱会到文化通行证：为什么本地音乐也需要年轻观众？",
    sourceName: "CNA Lifestyle",
    sourceTitle: "Kit Chan to stage first solo concert in Singapore in 3 years this September",
    sourceUrl: "https://www.channelnewsasia.com/entertainment/kit-chan-singapore-concert-2026-6186681",
    sourceDate: "2026-06-16",
    sourceSnippet:
      "CNA Lifestyle报道陈洁仪将在新加坡举行个人演唱会。本文原创改写为本地音乐、文化消费和身份认同的练习。",
    readingTime: "6 min",
    tags: ["本地音乐", "文化消费", "身份认同", "年轻观众"],
    paragraphs: [
      {
        zh:
          "一场本地歌手的演唱会，不只是娱乐活动，也是一种文化记忆。许多歌曲陪伴不同年代的人成长，歌词里可能有城市、家庭、语言和情感的影子。当年轻观众愿意走进剧场或演唱会，他们接触的不只是旋律，也是在认识本地创作的生命力。",
        en:
          "Frame a local concert as cultural memory and not merely entertainment.",
      },
      {
        zh:
          "不过，本地文化要吸引年轻人并不容易。网络平台让他们能随时接触全球音乐，选择变多后，本地作品更需要被看见。文化通行证、学校活动和社交媒体推广，都可以降低门槛，让年轻人愿意尝试。",
        en:
          "Good balanced point: global entertainment creates competition, so access and promotion matter.",
      },
      {
        zh:
          "我认为，支持本地音乐并不是要求每个人只听本地歌，而是让本地创作者有继续创作的空间。当观众愿意购票、分享和讨论，本地文化才不会流于形式。文化不是远方的风景，而是我们生活里可以继续发光的声音。",
        en:
          "Conclusion idea: supporting local arts keeps culture alive in ordinary life.",
      },
    ],
    vocab: [
      vocab("music-bendi", "本地音乐", "ben di yin yue", "local music", "由本地歌手或创作者创作、演出的音乐。", "本地音乐能反映新加坡人的生活经验。", "文化题常用：支持本地音乐有助于培养身份认同。"),
      vocab("music-xiaofei", "文化消费", "wen hua xiao fei", "cultural consumption", "花时间或金钱参与艺术、演出、阅读等文化活动。", "文化消费能支持创作者，也能丰富精神生活。", "可用于讨论文化通行证。"),
      vocab("music-gongming", "共鸣", "gong ming", "resonance", "因为有相似经历或情感而产生理解。", "本地歌曲容易让观众产生共鸣。", "口试可用：故事越贴近生活，越能引起共鸣。"),
      vocab("music-menkan", "降低门槛", "jiang di men kan", "lower the barrier", "让更多人更容易参与。", "补贴和宣传能降低年轻人接触艺术的门槛。", "文化、教育和科技题都常用。"),
    ],
    phrases: [
      phrase("music-yuyin", "成语", "余音绕梁", "yu yin rao liang", "形容音乐优美，令人回味。", "优秀的本地音乐能让人余音绕梁，也让人记住城市的故事。"),
      phrase("music-haoci", "好词好句", "文化不是远方的风景", "wen hua bu shi yuan fang de feng jing", "强调文化就在日常生活中。", "学校应让学生明白，文化不是远方的风景，而是身边的共同记忆。"),
    ],
    oral: oralPack(
      "年轻人为什么应该多接触本地音乐和本地演出？",
      "本地演出和音乐能展现新加坡人的情感与城市记忆。",
      "我认为年轻人应该多接触，但推广方式必须贴近他们的生活。",
      "这样能支持创作者、增强身份认同，也能让文化传承更自然。",
      "学校可结合演出观赏、歌词讨论和创作活动，让文化走进生活。",
      [
        ["为什么年轻人可能不熟悉本地音乐？", "因为他们接触全球内容很方便，本地作品如果缺少宣传，就容易被忽略。"],
        ["文化通行证有帮助吗？", "有帮助，因为它降低了尝试的门槛，但还需要学校和家庭持续引导。"],
        ["本地文化一定要传统吗？", "不一定。本地文化也可以是流行音乐、电影、文学和年轻人的创作。"],
      ],
    ),
  },
  {
    id: "child-myopia-learning-habits",
    topicId: "education",
    topicLabel: "教育",
    title: "近视不是换眼镜这么简单：学生怎样保护长期学习力？",
    sourceName: "CNA Commentary",
    sourceTitle: "Commentary: If your child's myopia keeps getting worse, here's what you should know",
    sourceUrl: "https://www.channelnewsasia.com/commentary/child-myopia-eye-health-singapore-6161566",
    sourceDate: "2026-06-15",
    sourceSnippet:
      "CNA评论讨论儿童近视和眼睛健康。本文原创改写为学生学习习惯、屏幕使用和家庭教育素材。",
    readingTime: "6 min",
    tags: ["学习习惯", "近视", "屏幕时间", "家庭教育"],
    paragraphs: [
      {
        zh:
          "对学生来说，近视常常被看成一件小事：度数加深了，就换一副眼镜。可是，视力管理其实和学习习惯密切相关。长时间近距离用眼、缺少户外活动、过度使用电子屏幕，都可能让眼睛长期处于紧张状态。",
        en:
          "Myopia can be linked to study habits, screen time and outdoor activity.",
      },
      {
        zh:
          "学校和家长不应只在成绩上给孩子压力，也要帮助他们建立健康的学习节奏。适当休息、保持阅读距离、增加户外运动，不会浪费学习时间，反而能让学生更有精神、更能专注。身体是学习的本钱，这句话在眼睛健康上尤其明显。",
        en:
          "Health routines can support learning rather than compete with academic goals.",
      },
      {
        zh:
          "我认为，保护视力需要防微杜渐。等问题严重后才后悔，往往已经付出更高代价。学生可以从每天的小习惯开始，例如每读一段时间就望远、减少无目的刷手机，并主动告诉家长或老师眼睛不舒服的情况。",
        en:
          "Good suggestion: use small daily habits before health problems worsen.",
      },
    ],
    vocab: [
      vocab("myopia-jinshi", "近视", "jin shi", "myopia", "看近处清楚，看远处模糊的视力问题。", "近视加深会影响学生看白板和日常生活。", "健康与教育题都可用。"),
      vocab("myopia-shili", "视力管理", "shi li guan li", "vision management", "通过检查和生活习惯保护眼睛健康。", "视力管理需要学生、家长和学校共同配合。", "可用于提出具体建议。"),
      vocab("myopia-huwai", "户外活动", "hu wai huo dong", "outdoor activity", "在室外进行的运动或休闲活动。", "增加户外活动有助于学生放松眼睛。", "教育题可用：学习不应只发生在书桌前。"),
      vocab("myopia-pingmu", "屏幕时间", "ping mu shi jian", "screen time", "使用手机、电脑和平板的时间。", "控制屏幕时间能保护视力，也能提高专注力。", "适合讨论数码生活。"),
    ],
    phrases: [
      phrase("myopia-fangwei", "成语", "防微杜渐", "fang wei du jian", "在问题刚出现时就预防它恶化。", "保护视力要防微杜渐，不能等度数加深才重视。"),
      phrase("myopia-buqian", "俗语", "身体是学习的本钱", "shen ti shi xue xi de ben qian", "健康是学习和发展的基础。", "学生要明白，身体是学习的本钱，不能为了成绩忽视健康。"),
    ],
    oral: oralPack(
      "学校应不应该限制学生在校使用电子屏幕的时间？",
      "儿童近视和长时间近距离用眼、屏幕使用及生活习惯有关。",
      "我认为学校应该适度限制，同时教学生负责任地使用科技。",
      "屏幕能帮助学习，但过度使用会影响视力和专注力。",
      "学校可安排户外活动、定时休息，并教育学生保持正确阅读距离。",
      [
        ["为什么保护视力也是教育问题？", "因为视力会影响学习效率，而学习习惯往往在学校和家庭中形成。"],
        ["完全禁止电子产品可行吗？", "不太可行。更好的做法是教学生有目的地使用，并安排休息。"],
        ["家长能做什么？", "家长可以控制无目的屏幕时间，鼓励户外活动，也要定期带孩子检查视力。"],
      ],
    ),
  },
  {
    id: "image-abuse-digital-respect",
    topicId: "society",
    topicLabel: "社会",
    title: "不是八卦，是伤害：网络时代怎样保护受害者？",
    sourceName: "CNA",
    sourceTitle: "New support service for victims of image-based sexual abuse",
    sourceUrl: "https://www.channelnewsasia.com/singapore/image-based-sexual-abuse-victims-help-support-service-sg-her-empower-6185621",
    sourceDate: "2026-06-17",
    sourceSnippet:
      "CNA报道新加坡推出影像性伤害受害者支援服务。本文原创改写为数码公民意识、同理心和网络责任素材。",
    readingTime: "6 min",
    tags: ["网络责任", "受害者支援", "同理心", "数码公民"],
    paragraphs: [
      {
        zh:
          "在网络时代，一张未经同意传播的照片或视频，可能给受害者带来长期伤害。旁观者如果把事件当成八卦继续转发，就会造成二次伤害。真正有责任感的网民，应该明白不点击、不保存、不传播，也是一种保护。",
        en:
          "The key social point is that forwarding harmful images can worsen the victim's trauma.",
      },
      {
        zh:
          "社会提供支援服务很重要，因为受害者往往会感到羞耻、害怕或孤立。他们需要可靠的求助渠道，也需要身边的人相信他们、陪伴他们，而不是责怪他们。面对网络伤害，法律、心理支援和公众教育缺一不可。",
        en:
          "Support should combine reporting channels, emotional care, law and public education.",
      },
      {
        zh:
          "我认为，学校必须把数码公民教育讲得更具体。学生不只要知道网络安全密码，也要学习尊重他人界限、拒绝转发伤害性内容，并在朋友遇到问题时鼓励他们求助。网络空间越方便，越需要同理心和自律。",
        en:
          "Good suggestion: digital citizenship must include respect, consent and bystander responsibility.",
      },
    ],
    vocab: [
      vocab("abuse-yingxiang", "影像性伤害", "ying xiang xing shang hai", "image-based sexual abuse", "未经同意制作、分享或威胁分享私密影像造成的伤害。", "影像性伤害会严重影响受害者的安全感。", "社会与网络安全题可谨慎使用。"),
      vocab("abuse-ercishanghai", "二次伤害", "er ci shang hai", "secondary harm", "受害者在事件后因责怪、传播或冷漠再次受到伤害。", "继续转发照片会造成二次伤害。", "可用于讨论同理心和媒体素养。"),
      vocab("abuse-jiexian", "尊重界限", "zun zhong jie xian", "respect boundaries", "尊重他人的隐私、意愿和安全感。", "数码公民教育应教学生尊重界限。", "适合校园、网络和社会题。"),
      vocab("abuse-qiuzhu", "求助渠道", "qiu zhu qu dao", "help-seeking channel", "遇到困难时可以获得帮助的途径。", "清楚的求助渠道能让受害者更快获得支持。", "提出建议时很好用。"),
    ],
    phrases: [
      phrase("abuse-xueshang", "成语", "雪上加霜", "xue shang jia shuang", "让原本困难的情况变得更糟。", "旁观者转发伤害性内容，只会让受害者雪上加霜。"),
      phrase("abuse-haoci", "好词好句", "不转发也是一种保护", "bu zhuan fa ye shi yi zhong bao hu", "强调旁观者可以通过停止传播来减少伤害。", "面对网络伤害，学生要记住不转发也是一种保护。"),
    ],
    oral: oralPack(
      "学校应如何教育学生面对网络上的伤害性内容？",
      "网络传播速度快，未经同意的影像可能严重伤害受害者。",
      "我认为学校应加强数码公民教育，并教学生成为负责任的旁观者。",
      "学生需要明白转发不是小事，沉默围观也可能让伤害扩大。",
      "学校可通过真实案例讨论、求助渠道介绍和同理心训练来预防问题。",
      [
        ["为什么有些人会继续转发伤害性内容？", "他们可能把事件当成八卦，缺少同理心，也没有意识到自己在扩大伤害。"],
        ["受害者最需要什么？", "他们需要安全的求助渠道、法律保护和身边人的相信与支持。"],
        ["旁观者可以做什么？", "旁观者应停止转发、保存证据，并鼓励受害者向可信任的大人或机构求助。"],
      ],
    ),
  },
  {
    id: "pmos-health-literacy",
    topicId: "health",
    topicLabel: "健康",
    title: "PCOS改名PMOS：健康知识为什么需要不断更新？",
    sourceName: "CNA Lifestyle",
    sourceTitle: "PCOS now has a new name: PMOS",
    sourceUrl: "https://www.channelnewsasia.com/lifestyle/women/pcos-new-name-pmos-polycystic-ovary-metabolic-syndrome-6178061",
    sourceDate: "2026-06-15",
    sourceSnippet:
      "CNA Lifestyle报道PCOS的新名称PMOS。本文原创改写为健康素养、医学名词和公众理解的练习素材。",
    readingTime: "6 min",
    tags: ["健康素养", "医学知识", "女性健康", "去污名化"],
    paragraphs: [
      {
        zh:
          "医学名词改变，看似只是名称更新，其实也会改变公众理解疾病的方式。PCOS被重新命名为PMOS，是为了更准确地强调代谢和激素等复杂因素，而不是让人只把问题理解成单一器官的毛病。",
        en:
          "A name change can shift public understanding of a health condition.",
      },
      {
        zh:
          "健康知识不断更新，提醒我们不能只依赖旧印象或网络传言。公众需要健康素养，懂得分辨可靠资料，也要愿意向专业人士咨询。错误的标签可能带来污名化，让患者觉得难以开口求助。",
        en:
          "Health literacy includes checking reliable sources and reducing stigma.",
      },
      {
        zh:
          "我认为，谈论健康问题时，社会应多一点尊重和科学精神。名称改变不是小题大做，而是让诊断、治疗和沟通更准确。学生学习这类新闻，也能明白健康教育不是背常识，而是培养判断力。",
        en:
          "Good conclusion: health education should build judgement, not only memorise facts.",
      },
    ],
    vocab: [
      vocab("pmos-daixie", "代谢", "dai xie", "metabolism", "身体把食物转化为能量并维持运作的过程。", "代谢问题可能影响体重、激素和长期健康。", "健康题常用医学词。"),
      vocab("pmos-jisu", "激素", "ji su", "hormone", "身体分泌、调节生理功能的物质。", "激素失衡可能影响身体多个系统。", "用于解释健康问题的复杂性。"),
      vocab("pmos-suyang", "健康素养", "jian kang su yang", "health literacy", "理解、判断和使用健康资讯的能力。", "提高健康素养能帮助公众避免误信偏方。", "健康题高分表达。"),
      vocab("pmos-wuming", "污名化", "wu ming hua", "stigmatisation", "用负面标签看待某个群体或疾病。", "健康教育应减少对患者的污名化。", "社会与健康题都可用。"),
    ],
    phrases: [
      phrase("pmos-duizheng", "成语", "对症下药", "dui zheng xia yao", "针对具体问题采取合适方法。", "医学命名更准确，才能帮助医生和患者对症下药。"),
      phrase("pmos-haoci", "好词好句", "名称改变，观念也要更新", "ming cheng gai bian, guan nian ye yao geng xin", "提醒公众用新的理解看待健康问题。", "面对医学新知，我们要做到名称改变，观念也要更新。"),
    ],
    oral: oralPack(
      "为什么公众需要提高健康素养？",
      "医学知识不断更新，疾病名称和治疗观念也可能改变。",
      "我认为健康素养很重要，因为它能帮助人们分辨资讯、及时求助并减少误解。",
      "如果公众只相信旧印象或网络传言，可能延误治疗，也可能造成污名化。",
      "学校可教学生查证健康资讯，并鼓励他们遇到问题时咨询专业人士。",
      [
        ["健康资讯为什么容易被误解？", "因为网络资讯很多，有些说法夸张或不完整，公众如果缺少判断力就容易相信。"],
        ["疾病名称真的重要吗？", "重要。名称会影响公众如何理解疾病，也会影响患者是否愿意求助。"],
        ["学生能怎样提高健康素养？", "学生可以学习查证来源，不随便相信偏方，并把严重症状告诉家长或医生。"],
      ],
    ),
  },
  {
    id: "retrenchment-lifelong-learning",
    topicId: "livelihood",
    topicLabel: "民生",
    title: "裁员数据上升：终身学习能不能给职场更多安全感？",
    sourceName: "CNA",
    sourceTitle: "Retrenchments climb in Q1, with degree holders and older workers most affected",
    sourceUrl:
      "https://www.channelnewsasia.com/singapore/retrenchments-unemployment-resignation-degree-holders-older-workers-q1-2026-mom-labour-market-report-6176721",
    sourceDate: "2026-06-15",
    sourceSnippet:
      "CNA报道2026年第一季裁员人数上升。本文原创改写为职场转型、终身学习和民生安全感素材。",
    readingTime: "7 min",
    tags: ["裁员", "终身学习", "职场转型", "民生"],
    paragraphs: [
      {
        zh:
          "裁员数字上升，会让许多家庭感到不安。对年长员工和拥有学位的员工来说，失去工作不只是收入问题，也关系到自信、家庭责任和未来规划。经济环境变化时，过去稳定的工作也可能突然面对挑战。",
        en:
          "Retrenchment affects income, confidence and family planning, not only labour statistics.",
      },
      {
        zh:
          "终身学习常被视为解决办法，但它不能只是一句口号。员工需要时间、资金和清楚的转业路径，企业也要愿意培训员工，而不是一遇到困难就放弃他们。政府的就业支援、技能培训和职业咨询，能帮助受影响者更快重新站起来。",
        en:
          "Lifelong learning works only when workers have time, funding and realistic pathways.",
      },
      {
        zh:
          "我认为，职场安全感不可能完全来自一份工作，而应来自持续学习和社会支援。居安思危不是制造焦虑，而是提醒我们在顺利时也要准备下一步。学生现在培养适应能力，将来面对变化时才不会手足无措。",
        en:
          "Good oral conclusion: security comes from adaptability plus social support.",
      },
    ],
    vocab: [
      vocab("job-caiyuan", "裁员", "cai yuan", "retrenchment", "公司因经济或业务原因减少员工。", "裁员会影响家庭收入和个人信心。", "民生与经济题常用。"),
      vocab("job-zhuanxing", "职场转型", "zhi chang zhuan xing", "workplace transition", "工作内容、技能需求或行业结构发生改变。", "科技发展加快了职场转型。", "可用于未来工作题。"),
      vocab("job-zhongshen", "终身学习", "zhong shen xue xi", "lifelong learning", "离开学校后仍持续学习新知识和技能。", "终身学习能帮助员工适应变化。", "教育、科技、就业题通用。"),
      vocab("job-zaipeixun", "再培训", "zai pei xun", "reskilling", "学习新技能以转向新的岗位或行业。", "受裁员影响的员工可能需要再培训。", "提出政策建议时可用。"),
    ],
    phrases: [
      phrase("job-juansi", "成语", "居安思危", "ju an si wei", "在安稳时也想到可能的危机。", "职场人士应居安思危，持续提升技能。"),
      phrase("job-haoci", "好词好句", "饭碗安全感不能只靠一份合约", "fan wan an quan gan bu neng zhi kao yi fen he yue", "强调就业安全来自能力和社会支援。", "面对职场转型，饭碗安全感不能只靠一份合约。"),
    ],
    oral: oralPack(
      "面对裁员风险，个人和社会应该如何应对？",
      "经济环境变化可能导致裁员，年长员工和家庭负担较重者会受到较大影响。",
      "我认为个人要终身学习，社会也要提供实际支援，不能把责任全推给个人。",
      "持续提升技能能增加适应力，但培训、就业咨询和企业责任同样重要。",
      "政府可加强再培训津贴，企业可为员工规划转型路径，学校则要培养学生的适应能力。",
      [
        ["终身学习为什么重要？", "因为行业变化很快，过去学到的技能未必能应付未来工作。"],
        ["裁员只影响个人吗？", "不是。它会影响家庭收入、心理健康和社会信心。"],
        ["学生现在能准备什么？", "学生可以培养沟通、数码能力和解决问题的能力，也要保持学习新事物的习惯。"],
      ],
    ),
  },
];

const SAFE_ID = /^[a-z0-9-]{3,80}$/i;
let stateReady = false;
const state = loadState();
let centralLeadState = {
  status: "idle",
  leads: [],
  error: "",
  checkedAt: null,
};
let profileLeadSyncState = loadProfileLeadSyncState();
stateReady = true;
let timerId = null;
let deferredInstallPrompt = null;
let pendingSelectionText = "";
let selectionToolbarPointerActive = false;
let selectionInteractionLockUntil = 0;
let signupPromptOpen = false;
let continueAfterSignup = false;
let pendingSaveIdAfterSignup = "";
let pendingManualSelectionItem = null;
let profileDraft = {
  displayName: "",
  email: "",
};
let oralRecorder = null;
let oralRecordingStream = null;
let oralRecordingChunks = [];
let oralRecordingUrl = "";
let oralRecordingStatus = "idle";
let oralRecordingSeconds = 0;
let oralRecordingTimerId = null;
let pinyinEngine = null;
let pinyinEnginePromise = null;
let pinyinEngineFailed = false;
const pinyinCache = new Map();

function createSelectionToolbar() {
  const toolbar = document.createElement("div");
  toolbar.className = "selection-toolbar";
  toolbar.hidden = true;
  toolbar.innerHTML = `
    <p class="selection-title" data-selection-title>选中文本</p>
    <p class="selection-term" data-selection-term></p>
    <div class="selection-definition" data-selection-definition hidden></div>
    <div class="selection-actions">
      <button class="primary-button compact" type="button" data-translate-selected>Translate / 翻译</button>
      <button class="secondary-button compact" type="button" data-save-selected>存入词句本</button>
      <button class="secondary-button compact" type="button" data-cancel-selection>取消</button>
    </div>
  `;
  document.body.appendChild(toolbar);
  return toolbar;
}

const selectionToolbar = createSelectionToolbar();
selectionToolbar.addEventListener("mousedown", (event) => event.preventDefault());
selectionToolbar.addEventListener("pointerdown", () => {
  selectionToolbarPointerActive = true;
});
selectionToolbar.addEventListener("pointerup", () => {
  window.setTimeout(() => {
    selectionToolbarPointerActive = false;
  }, 0);
});
selectionToolbar.addEventListener("pointercancel", () => {
  selectionToolbarPointerActive = false;
});
const selectionTermNode = selectionToolbar.querySelector("[data-selection-term]");
const selectionTitleNode = selectionToolbar.querySelector("[data-selection-title]");
const selectionDefinitionNode = selectionToolbar.querySelector("[data-selection-definition]");
const selectionSaveButton = selectionToolbar.querySelector("[data-save-selected]");

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

function oralAgreementPrompt(prompt) {
  const text = sanitizeText(prompt, 180);
  if (!text) return "这篇文章的观点值得我们重视。你同意吗？";

  const statement = promptToStatement(text);
  return `${statement}。你同意吗？`;
}

function promptToStatement(prompt) {
  let statement = String(prompt || "")
    .replace(/[？?！!。.;。；;,\s]+$/g, "")
    .trim();

  statement = statement
    .replace(/^你认为/, "")
    .replace(/^你觉得/, "")
    .replace(/^请谈谈你是否认为/, "")
    .trim();

  statement = statement
    .replace(/(.+)[，,]最大的(困难|挑战)是什么$/g, "$1会面对很大的$2")
    .replace(/(.+)最需要改变什么生活习惯$/g, "$1需要改变生活习惯")
    .replace(/为什么/g, "")
    .replace(/应该如何应对$/g, "应该积极应对")
    .replace(/应如何/g, "应该")
    .replace(/应该如何/g, "应该")
    .replace(/如何/g, "应该");

  const replacements = [
    [/应不应该/g, "应该"],
    [/该不该/g, "应该"],
    [/能不能/g, "能"],
    [/可不可以/g, "可以"],
    [/会不会/g, "会"],
    [/要不要/g, "要"],
    [/有没有必要/g, "有必要"],
    [/是否应该/g, "应该"],
    [/是否需要/g, "需要"],
    [/是否能够/g, "能够"],
    [/是否能/g, "能"],
    [/是不是/g, "是"],
    [/有没有/g, "有"],
    [/是利大于弊，还是弊大于利$/g, "是利大于弊"],
    [/利大于弊，还是弊大于利$/g, "利大于弊"],
  ];

  for (const [pattern, replacement] of replacements) {
    statement = statement.replace(pattern, replacement);
  }

  statement = statement
    .replace(/吗$/g, "")
    .replace(/呢$/g, "")
    .replace(/[，,]还是[^，。！？?]+$/g, "")
    .replace(/,/g, "，")
    .replace(/;/g, "；")
    .replace(/:/g, "：")
    .trim();

  return statement || "这篇文章的观点值得我们重视";
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sanitizeText(value, maxLength = 200) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/\u0000|\u007f/g, "")
    .trim()
    .slice(0, maxLength);
}

function sanitizeEmail(value) {
  const email = sanitizeText(value, 254).toLowerCase();
  return EMAIL_PATTERN.test(email) ? email : "";
}

function sanitizeActionId(raw) {
  const id = String(raw || "").trim();
  return SAFE_ID.test(id) ? id : "";
}

function clampInt(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  const safe = Math.floor(Math.max(min, Math.min(max, number)));
  return Number.isFinite(safe) ? safe : fallback;
}

function sanitizeDateString(value) {
  const formatted = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(formatted) ? formatted : "";
}

function isHttpEndpoint(url) {
  return typeof url === "string" && /^https?:\/\//i.test(url.trim());
}

function sanitizeTimestamp(value) {
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    if (Number.isFinite(parsed)) return sanitizeTimestamp(parsed);
  }

  const time = Number(value);
  if (!Number.isFinite(time)) return Date.now();
  if (time < 0) return 0;
  if (time > Date.now() + 365 * 24 * 60 * 60 * 1000) return Date.now();
  return time;
}

function getAnonymousVisitStats() {
  const fallback = { total: 0, uniqueDays: 0, lastVisitDate: "", lastVisitAt: null };

  try {
    const raw = localStorage.getItem(ANON_VISITOR_STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw);
    if (!isRecord(parsed)) return fallback;

    const uniqueDays = Number(parsed.uniqueDays);
    const total = Number(parsed.total);

    return {
      total: Number.isFinite(total) && total > 0 ? Math.floor(total) : 0,
      uniqueDays: Number.isFinite(uniqueDays) && uniqueDays >= 0 ? Math.floor(uniqueDays) : 0,
      lastVisitDate: sanitizeDateString(parsed.lastVisitDate),
      lastVisitAt: sanitizeTimestamp(parsed.lastVisitAt),
    };
  } catch {
    return fallback;
  }
}

function trackAnonymousVisit() {
  try {
    const today = singaporeDateKey();
    const stats = getAnonymousVisitStats();
    const isNewDay = stats.lastVisitDate !== today;

    const nextStats = {
      total: stats.total + 1,
      uniqueDays: stats.uniqueDays + (isNewDay ? 1 : 0),
      lastVisitDate: today,
      lastVisitAt: Date.now(),
    };

    localStorage.setItem(ANON_VISITOR_STORAGE_KEY, JSON.stringify(nextStats));

    if (ANONYMOUS_VISITOR_ENDPOINT && isHttpEndpoint(ANONYMOUS_VISITOR_ENDPOINT)) {
      sendAnonymousVisit({
        event: "app_visit",
        path: window.location.pathname,
        time: new Date().toISOString(),
        visitDate: today,
      }).catch(() => {});
    }
  } catch {
    // Privacy-safe no-op if storage or network is blocked.
  }
}

async function sendAnonymousVisit(payload) {
  if (!isHttpEndpoint(ANONYMOUS_VISITOR_ENDPOINT)) return;

  const response = await fetch(ANONYMOUS_VISITOR_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`anonymous visitor endpoint responded ${response.status}`);
  }
}

function parseCompletedDates(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map(sanitizeDateString).filter(Boolean).slice(-60);
}

function parsePipeline(raw) {
  const fallback = {
    status: "fallback",
    message: "Prototype article library ready",
    checkedAt: null,
    dailyDate: "",
    dailySourceTitle: "",
  };
  if (!isRecord(raw)) return fallback;

  return {
    status: raw.status === "live" ? "live" : "fallback",
    message: sanitizeText(raw.message || fallback.message, 160),
    checkedAt: raw.checkedAt === null ? null : sanitizeTimestamp(raw.checkedAt),
    dailyDate: sanitizeDateString(raw.dailyDate),
    dailySourceTitle: sanitizeText(raw.dailySourceTitle, 180),
  };
}

function parseHeadlines(raw) {
  if (!Array.isArray(raw)) return [];
  return mergeHeadlines(raw.map(normalizeHeadlineRecord).filter(Boolean));
}

function parseDailyHeadline(raw) {
  return normalizeHeadlineRecord(raw);
}

function parseRefreshCadence(value) {
  return ARTICLE_REFRESH_CADENCES.includes(value) ? value : DEFAULT_REFRESH_CADENCE;
}

function emptyProfile() {
  return {
    displayName: "",
    email: "",
    wantsUpdates: false,
    refreshCadence: DEFAULT_REFRESH_CADENCE,
    createdAt: null,
  };
}

function parseProfile(raw) {
  const fallback = emptyProfile();
  if (!isRecord(raw)) return fallback;

  const email = sanitizeEmail(raw.email);
  return {
    displayName: sanitizeText(raw.displayName, 80),
    email,
    wantsUpdates: raw.wantsUpdates === true,
    refreshCadence: parseRefreshCadence(raw.refreshCadence),
    createdAt: email ? sanitizeTimestamp(raw.createdAt) : null,
  };
}

function normalizeLeadRecord(raw) {
  const email = sanitizeEmail(raw?.email);
  if (!email) return null;
  const wantsUpdates =
    raw.wantsUpdates === true ||
    raw.wantsUpdates === "true" ||
    raw.wantsUpdates === "TRUE" ||
    raw.wantsUpdates === 1 ||
    raw.wantsUpdates === "1";

  return {
    displayName: sanitizeText(raw.displayName || raw.name, 80),
    email,
    wantsUpdates,
    refreshCadence: parseRefreshCadence(raw.refreshCadence),
    source: sanitizeText(raw.source || "chinese-tutor-app", 80),
    page: sanitizeText(raw.page, 220),
    createdAt: sanitizeTimestamp(raw.createdAt || raw.timestamp || raw.savedAt),
  };
}

function parseLeadRecords(raw) {
  if (!Array.isArray(raw)) return [];

  const map = new Map();
  for (const entry of raw) {
    const lead = normalizeLeadRecord(entry);
    if (!lead) continue;

    const existing = map.get(lead.email);
    if (!existing || lead.createdAt >= existing.createdAt) {
      map.set(lead.email, lead);
    }
  }

  return [...map.values()]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, LOCAL_LEAD_HISTORY_LIMIT);
}

function formatLeadTime(value) {
  try {
    return new Intl.DateTimeFormat("zh-SG", {
      timeZone: "Asia/Singapore",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value || Date.now()));
  } catch {
    return "";
  }
}

function upsertLeadToLog(lead) {
  const safeLead = normalizeLeadRecord(lead);
  if (!safeLead) return;

  const existing = state.leads || [];
  const next = [safeLead, ...existing.filter((item) => item.email !== safeLead.email)];
  state.leads = next.slice(0, LOCAL_LEAD_HISTORY_LIMIT);
}

function currentProfileLeadRecord() {
  if (!hasProfile()) return null;
  return normalizeLeadRecord({
    displayName: state.profile.displayName,
    email: state.profile.email,
    wantsUpdates: state.profile.wantsUpdates,
    refreshCadence: state.profile.refreshCadence,
    source: "current-profile",
    page: window.location.href,
    createdAt: state.profile.createdAt || Date.now(),
  });
}

function localLeadRecords() {
  return parseLeadRecords([...(state.leads || []), currentProfileLeadRecord()].filter(Boolean));
}

function ownerLeadEndpoint() {
  return isHttpEndpoint(OWNER_LEAD_ENDPOINT) ? OWNER_LEAD_ENDPOINT : PROFILE_LEAD_ENDPOINT;
}

function ownerLeadEndpointLabel() {
  const endpoint = ownerLeadEndpoint();
  if (!isHttpEndpoint(endpoint)) return "not connected";

  try {
    const url = new URL(endpoint);
    const deploymentId = url.pathname.split("/").filter(Boolean)[2] || "";
    return deploymentId ? `${url.hostname} / ${deploymentId.slice(0, 10)}...${deploymentId.slice(-6)}` : url.hostname;
  } catch {
    return "connected endpoint";
  }
}

function ownerCentralCollectionEnabled() {
  return isHttpEndpoint(ownerLeadEndpoint());
}

function ownerLeadToken() {
  try {
    return localStorage.getItem(OWNER_LEAD_TOKEN_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function setOwnerLeadToken(token) {
  const safeToken = sanitizeText(token, 160);
  try {
    if (safeToken) {
      localStorage.setItem(OWNER_LEAD_TOKEN_STORAGE_KEY, safeToken);
    } else {
      localStorage.removeItem(OWNER_LEAD_TOKEN_STORAGE_KEY);
    }
  } catch {
    // Ignore private-mode storage failures.
  }
  return safeToken;
}

function ownerKnownLeadRecords() {
  return parseLeadRecords([...(centralLeadState.leads || []), ...localLeadRecords()]);
}

function centralLeadStatusLabel() {
  if (!ownerCentralCollectionEnabled()) return "collector not connected";
  if (centralLeadState.status === "loading") return "loading central list";
  if (centralLeadState.status === "loaded") return `${centralLeadState.leads.length} central emails loaded`;
  if (centralLeadState.status === "error") return "central load failed";
  return ownerLeadToken() ? "ready to load central list" : "admin token needed";
}

async function refreshOwnerAppFiles() {
  setOwnerLeadToken("");
  try {
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key.startsWith("chinese-tutor-")).map((key) => caches.delete(key)));
    }
    if (navigator.serviceWorker) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }
  } catch {
    // A normal reload still helps when cache APIs are unavailable.
  }
  window.location.reload();
}

function fetchCentralLeadsJsonp(endpoint, token) {
  return new Promise((resolve, reject) => {
    const callbackName = `__chineseTutorLeadCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    let script = null;
    let timeoutId = null;

    function cleanup() {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (script?.parentNode) script.parentNode.removeChild(script);
      try {
        delete window[callbackName];
      } catch {
        window[callbackName] = undefined;
      }
    }

    try {
      const url = new URL(endpoint);
      url.searchParams.set("action", "list");
      url.searchParams.set("token", token);
      url.searchParams.set("callback", callbackName);

      window[callbackName] = (payload) => {
        cleanup();
        resolve(payload);
      };

      script = document.createElement("script");
      script.src = url.toString();
      script.async = true;
      script.onerror = () => {
        cleanup();
        reject(new Error("Unable to load central email list"));
      };

      timeoutId = window.setTimeout(() => {
        cleanup();
        reject(new Error("Central email list timed out"));
      }, 12000);

      document.body.appendChild(script);
    } catch (error) {
      cleanup();
      reject(error);
    }
  });
}

async function loadCentralLeadRecords({ token } = {}) {
  const endpoint = ownerLeadEndpoint();
  if (!isHttpEndpoint(endpoint)) {
    showToast("还没接上中央邮箱收集器");
    return;
  }

  const safeToken = token ? setOwnerLeadToken(token) : ownerLeadToken();
  if (!safeToken) {
    showToast("请输入 owner admin token 才能读取总名单");
    render();
    return;
  }

  centralLeadState = {
    ...centralLeadState,
    status: "loading",
    error: "",
  };
  render();

  try {
    const payload = await fetchCentralLeadsJsonp(endpoint, safeToken);
    if (!payload || payload.ok === false) {
      throw new Error(payload?.error || "Central email list rejected the request");
    }

    const rawLeads = Array.isArray(payload.leads)
      ? payload.leads
      : Array.isArray(payload.records)
        ? payload.records
        : [];
    const leads = parseLeadRecords(rawLeads);
    centralLeadState = {
      status: "loaded",
      leads,
      error: "",
      checkedAt: Date.now(),
    };
    render();
    showToast(`已载入 ${leads.length} 个中央邮箱`);
  } catch (error) {
    centralLeadState = {
      ...centralLeadState,
      status: "error",
      error: sanitizeText(error?.message || "中央名单读取失败", 180),
      checkedAt: Date.now(),
    };
    render();
    showToast("中央名单读取失败，请检查 endpoint 和 token");
  }
}

function activateOwnerToolsFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("owner") === "1" || window.location.hash === "#owner") {
      localStorage.setItem(OWNER_TOOLS_STORAGE_KEY, "1");
    }
  } catch {
    // Ignore private-mode storage failures.
  }
}

function ownerToolsEnabled() {
  try {
    return localStorage.getItem(OWNER_TOOLS_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function hideOwnerTools() {
  try {
    localStorage.removeItem(OWNER_TOOLS_STORAGE_KEY);
  } catch {
    // Ignore private-mode storage failures.
  }
  render();
  showToast("电邮名单已隐藏");
}

function csvField(value) {
  const text = String(value ?? "").replace(/[\r\n]+/g, " ");
  return `"${text.replace(/"/g, '""')}"`;
}

function exportLeadCsv() {
  const leads = ownerToolsEnabled() ? ownerKnownLeadRecords() : localLeadRecords();
  if (!leads.length) {
    showToast("当前还没有邮箱可导出");
    return;
  }

  const header = ["name", "email", "wants_updates", "refresh_cadence", "source", "page", "created_at"];
  const rows = leads.map((lead) => [
    csvField(lead.displayName),
    csvField(lead.email),
    csvField(lead.wantsUpdates ? "true" : "false"),
    csvField(lead.refreshCadence),
    csvField(lead.source),
    csvField(lead.page),
    csvField(new Date(lead.createdAt).toISOString()),
  ]);
  const csv = "\ufeff" + header.join(",") + "\n" + rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  const filename = `chinese-tutor-leads-${new Date().toISOString().slice(0, 10)}.csv`;

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast("邮箱列表已导出");
}

function leadEmailList({ subscribedOnly = false } = {}) {
  const leads = ownerToolsEnabled() ? ownerKnownLeadRecords() : localLeadRecords();
  const filtered = subscribedOnly ? leads.filter((lead) => lead.wantsUpdates) : leads;
  return [...new Set(filtered.map((lead) => lead.email).filter(Boolean))];
}

function weeklyVocabItems() {
  const saved = savedItems();
  if (saved.length) return saved.slice(0, 12);
  return allLearnableItems().slice(0, 8);
}

function weeklyEmailSubject() {
  return `高级华文词汇复习 ${singaporeDateKey()}`;
}

function weeklyEmailBody() {
  const items = weeklyVocabItems();
  const lines = [
    "本周高级华文词汇复习",
    "",
    "请用这些词句各造一个句子，并尝试把其中两个用进口试回答。",
    "",
    ...items.map((item, index) => `${index + 1}. ${item.term} (${item.pinyin || "pinyin"})：${item.meaning || item.english || ""}`),
    "",
    "复习建议：先看中文解释，再遮住答案回忆意思，最后用PEEL结构说一段话。",
  ];
  return lines.join("\n");
}

function weeklyEmailRecipients() {
  const subscribed = leadEmailList({ subscribedOnly: true });
  return subscribed.length ? subscribed : leadEmailList();
}

function weeklyEmailDraftUrl() {
  const recipients = weeklyEmailRecipients();
  if (!recipients.length) return "";

  const params = new URLSearchParams({
    bcc: recipients.join(","),
    subject: weeklyEmailSubject(),
    body: weeklyEmailBody(),
  });
  return `mailto:?${params.toString()}`;
}

function weeklyEmailClipboardText() {
  const recipients = weeklyEmailRecipients();
  if (!recipients.length) return "";

  return [
    `BCC: ${recipients.join(", ")}`,
    `Subject: ${weeklyEmailSubject()}`,
    "",
    weeklyEmailBody(),
  ].join("\n");
}

async function copyLeadEmails() {
  const emails = leadEmailList();
  if (!emails.length) {
    showToast("当前还没有邮箱可复制");
    return;
  }

  try {
    await navigator.clipboard.writeText(emails.join(", "));
    showToast("邮箱已复制");
  } catch {
    showToast(emails.join(", "));
  }
}

async function copyWeeklyEmailDraft({ quiet = false } = {}) {
  const draft = weeklyEmailClipboardText();
  if (!draft) {
    showToast("当前还没有邮箱可发送测试邮件");
    return false;
  }

  try {
    await navigator.clipboard.writeText(draft);
    if (!quiet) showToast("测试邮件内容已复制");
    return true;
  } catch {
    showToast("无法复制；请使用下方邮件内容手动复制");
    return false;
  }
}

async function openWeeklyEmailDraft() {
  const draftUrl = weeklyEmailDraftUrl();
  if (!draftUrl) {
    showToast("当前还没有邮箱可发送测试邮件");
    return;
  }

  await copyWeeklyEmailDraft({ quiet: true });
  window.location.href = draftUrl;
  window.setTimeout(() => {
    showToast("已尝试打开邮件；若没反应，内容已复制");
  }, 300);
}

function parseSavedState(raw) {
  if (!isRecord(raw)) return {};

  const safe = {};
  for (const [rawId, entry] of Object.entries(raw)) {
    const id = sanitizeActionId(rawId);
    if (!id) continue;

    const builtIn = itemById(id);
    if (builtIn) {
      safe[id] = { item: { ...builtIn }, savedAt: sanitizeTimestamp(entry?.savedAt) };
      continue;
    }

    const item = isRecord(entry) ? entry.item : null;
    if (!isRecord(item)) continue;

    const term = sanitizeManualTerm(item.term);
    if (!term) continue;

    const rawArticleId = sanitizeActionId(item.articleId || "");
    safe[id] = {
      item: {
        id,
        term,
        pinyin: sanitizeText(item.pinyin, 160),
        english: sanitizeText(item.english || "自定义词", 120) || "自定义词",
        meaning: sanitizeText(item.meaning || "请补充释义并复习。", 420),
        example: sanitizeText(item.example || "可在复习时回想该词在语境中的用法。", 420),
        examUse: sanitizeText(item.examUse, 420),
        type: item.type || "manual",
        articleId:
          rawArticleId && (rawArticleId === DAILY_ARTICLE_ID || articles.some((article) => article.id === rawArticleId))
            ? rawArticleId
            : "",
        articleTitle: sanitizeText(item.articleTitle, 120),
      },
      savedAt: sanitizeTimestamp(entry?.savedAt),
    };
  }

  return safe;
}

function parseReviewState(raw, savedEntries) {
  if (!isRecord(raw)) return {};
  const safe = {};

  for (const [rawId, entry] of Object.entries(raw)) {
    const id = sanitizeActionId(rawId);
    if (!id || !isRecord(entry) || !savedEntries[id]) continue;

    safe[id] = {
      interval: clampInt(entry.interval, 1, 30, 1),
      dueAt: sanitizeTimestamp(entry.dueAt),
      seen: clampInt(entry.seen, 0, 5000, 0),
      mastered: entry.mastered === true,
    };
  }
  return safe;
}

function loadState() {
  const fallback = {
    tab: "today",
    articleId: DAILY_ARTICLE_ID,
    topicFilter: "all",
    pinyin: false,
    english: false,
    saved: {},
    reviews: {},
    completedDates: [],
    notes: "",
    leads: [],
    timerLeft: 120,
    profile: emptyProfile(),
    headlines: [],
    dailyHeadline: null,
    pipeline: {
      status: "fallback",
      message: "Prototype article library ready",
      checkedAt: null,
      dailyDate: "",
      dailySourceTitle: "",
    },
  };

  const raw = safeParseState();
  if (!isRecord(raw)) return fallback;

  const safeSaved = parseSavedState(raw.saved);
  const topicFilter = topics.some((topic) => topic.id === raw.topicFilter) ? raw.topicFilter : fallback.topicFilter;
  const articleId =
    topicFilter === "all"
      ? DAILY_ARTICLE_ID
      : raw.articleId === DAILY_ARTICLE_ID || (raw.articleId && raw.articleId === articles[0].id)
        ? DAILY_ARTICLE_ID
        : articles.some((article) => article.id === raw.articleId)
          ? raw.articleId
          : fallback.articleId;

  return {
    ...fallback,
    tab: ["today", "review", "saved", "oral", "profile"].includes(raw.tab) ? raw.tab : fallback.tab,
    articleId,
    topicFilter,
    pinyin: typeof raw.pinyin === "boolean" ? raw.pinyin : fallback.pinyin,
    english: typeof raw.english === "boolean" ? raw.english : fallback.english,
    saved: safeSaved,
    reviews: parseReviewState(raw.reviews, safeSaved),
    completedDates: parseCompletedDates(raw.completedDates),
    notes: sanitizeText(raw.notes, 2000),
    leads: parseLeadRecords(raw.leads),
    timerLeft: clampInt(raw.timerLeft, 0, 600, fallback.timerLeft),
    profile: parseProfile(raw.profile),
    headlines: parseHeadlines(raw.headlines),
    dailyHeadline: parseDailyHeadline(raw.dailyHeadline),
    pipeline: parsePipeline(raw.pipeline),
  };
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function safeParseState() {
  try {
    const text = localStorage.getItem(STORAGE_KEY);
    if (!text) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function loadProfileLeadSyncState() {
  try {
    const raw = JSON.parse(localStorage.getItem(LEAD_SYNC_STATUS_STORAGE_KEY) || "{}");
    return {
      status: ["idle", "syncing", "synced", "fallback", "error"].includes(raw.status) ? raw.status : "idle",
      email: sanitizeEmail(raw.email),
      message: sanitizeText(raw.message, 200),
      checkedAt: sanitizeTimestamp(raw.checkedAt),
    };
  } catch {
    return {
      status: "idle",
      email: "",
      message: "",
      checkedAt: null,
    };
  }
}

function setProfileLeadSyncState(next) {
  profileLeadSyncState = {
    ...profileLeadSyncState,
    ...next,
    message: sanitizeText(next.message, 200),
    checkedAt: next.checkedAt || Date.now(),
  };

  try {
    localStorage.setItem(LEAD_SYNC_STATUS_STORAGE_KEY, JSON.stringify(profileLeadSyncState));
  } catch {
    // Ignore private-mode storage failures.
  }
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
  if (state.articleId === DAILY_ARTICLE_ID) {
    return dailyRecentArticle() || articles[0];
  }
  return articles.find((article) => article.id === state.articleId) || articles[0];
}

function hasProfile() {
  return Boolean(state.profile?.email);
}

function isProfileRequiredForReading() {
  return false;
}

function profileDisplayName() {
  if (!hasProfile()) return "";
  return state.profile.displayName || state.profile.email.split("@")[0];
}

function seedProfileDraft() {
  profileDraft = {
    displayName: state.profile?.displayName || "",
    email: state.profile?.email || "",
  };
}

function syncProfileDraftFromForm(form) {
  if (!form) return;
  profileDraft = {
    displayName: form.querySelector("[data-profile-name]")?.value || "",
    email: form.querySelector("[data-profile-email]")?.value || "",
  };
}

function profileFormValue(profile, key, modal) {
  if (!modal) return profile[key] || "";
  return profileDraft[key] || profile[key] || "";
}

function isEditableElement(element) {
  return Boolean(
    element &&
      (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT" || element.isContentEditable),
  );
}

function openSignupPrompt(shouldContinue = false, pendingSaveId = "") {
  seedProfileDraft();
  signupPromptOpen = true;
  continueAfterSignup = shouldContinue;
  pendingSaveIdAfterSignup = pendingSaveId;
  render();
  window.setTimeout(() => document.querySelector(".signup-modal [data-profile-email]")?.focus(), 0);
}

function closeSignupPrompt() {
  signupPromptOpen = false;
  continueAfterSignup = false;
  pendingSaveIdAfterSignup = "";
  pendingManualSelectionItem = null;
  seedProfileDraft();
  render();
}

function filteredArticles() {
  const daily = stateReady ? dailyRecentArticle() : null;
  if (state.topicFilter === "all") return daily ? [daily, ...articles] : articles;
  return articles.filter((article) => article.topicId === state.topicFilter);
}

function setArticle(id) {
  if (id === DAILY_ARTICLE_ID) {
    state.articleId = DAILY_ARTICLE_ID;
    state.timerLeft = 120;
    persist();
    render();
    return;
  }
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

async function saveProfileFromForm(form) {
  syncProfileDraftFromForm(form);
  const email = sanitizeEmail(form?.querySelector("[data-profile-email]")?.value);
  const displayName = sanitizeText(form?.querySelector("[data-profile-name]")?.value, 80);
  const wantsUpdates = Boolean(form?.querySelector("[data-profile-updates]")?.checked);

  if (!email) {
    showToast("请输入有效的电子邮件");
    return;
  }

  state.profile = {
    ...emptyProfile(),
    ...state.profile,
    displayName,
    email,
    wantsUpdates,
    refreshCadence: parseRefreshCadence(state.profile?.refreshCadence),
    createdAt: state.profile?.createdAt || Date.now(),
  };
  upsertLeadToLog({
    displayName,
    email,
    wantsUpdates,
    refreshCadence: parseRefreshCadence(state.profile?.refreshCadence),
    source: "chinese-tutor-profile",
    page: window.location.href,
    createdAt: Date.now(),
  });

  persist();
  const shouldContinue = continueAfterSignup;
  const pendingSaveId = pendingSaveIdAfterSignup;
  const pendingManualItem = pendingManualSelectionItem;
  signupPromptOpen = false;
  continueAfterSignup = false;
  pendingSaveIdAfterSignup = "";
  pendingManualSelectionItem = null;
  seedProfileDraft();

  if (PROFILE_LEAD_ENDPOINT && profileEmailCaptureEnabled()) {
    setProfileLeadSyncState({
      status: "syncing",
      email,
      message: "Sending profile to central list",
    });
    render();

    try {
      const result = await sendProfileLead({
        name: displayName,
        email,
        wantsUpdates,
        refreshCadence: parseRefreshCadence(state.profile?.refreshCadence),
        createdAt: new Date(state.profile?.createdAt || Date.now()).toISOString(),
      });
      setProfileLeadSyncState({
        status: result?.fallback ? "fallback" : "synced",
        email,
        message: result?.fallback ? "Sent with mobile fallback" : "Saved to central list",
      });
    } catch (error) {
      setProfileLeadSyncState({
        status: "error",
        email,
        message: errorMessage(error),
      });
      showToast("账户已保存；中央同步失败");
    }
  } else {
    setProfileLeadSyncState({
      status: "idle",
      email,
      message: "Central collector not connected",
    });
  }

  if (pendingSaveId) {
    toggleSave(pendingSaveId);
    showToast("账户已创建，词句已加入词句本");
    return;
  }

  if (pendingManualItem) {
    state.saved[pendingManualItem.id] = { item: pendingManualItem, savedAt: Date.now() };
    reviewFor(pendingManualItem.id);
    persist();
    render();
    showToast("账户已创建，词句已加入词句本");
    return;
  }

  if (shouldContinue) {
    nextArticle();
    return;
  }

  render();
  showToast(
    profileLeadSyncState.status === "synced" || profileLeadSyncState.status === "fallback"
      ? "免费账户已保存，并已同步中央名单"
      : "免费账户已保存",
  );
}

function profileLeadSyncLabel() {
  if (!profileEmailCaptureEnabled()) return "Central list not connected";
  if (profileLeadSyncState.status === "syncing") return "Syncing to central list...";
  if (profileLeadSyncState.status === "synced") return `Synced to central list: ${profileLeadSyncState.email}`;
  if (profileLeadSyncState.status === "fallback") return `Sent with mobile fallback: ${profileLeadSyncState.email}`;
  if (profileLeadSyncState.status === "error") return `Central sync failed: ${profileLeadSyncState.message}`;
  return "Central list ready";
}

function profileLeadSyncClass() {
  if (profileLeadSyncState.status === "error") return "warn";
  if (profileLeadSyncState.status === "syncing") return "warn";
  return "";
}

function sendProfileLeadByForm(endpoint, payload) {
  return new Promise((resolve, reject) => {
    let iframe = null;
    let form = null;
    let timeoutId = null;
    const frameName = `chineseTutorLeadFrame_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    function cleanup() {
      if (timeoutId) window.clearTimeout(timeoutId);
      window.setTimeout(() => {
        if (form?.parentNode) form.parentNode.removeChild(form);
        if (iframe?.parentNode) iframe.parentNode.removeChild(iframe);
      }, 1000);
    }

    try {
      iframe = document.createElement("iframe");
      iframe.name = frameName;
      iframe.hidden = true;

      form = document.createElement("form");
      form.action = endpoint;
      form.method = "GET";
      form.target = frameName;
      form.hidden = true;

      const values = {
        action: "signup",
        source: "chinese-tutor",
        page: window.location.href,
        userAgent: window.navigator?.userAgent || "",
        ...payload,
      };

      Object.entries(values).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value ?? "");
        form.appendChild(input);
      });

      iframe.addEventListener("load", () => {
        cleanup();
        resolve({ ok: true, fallback: true });
      });

      timeoutId = window.setTimeout(() => {
        cleanup();
        reject(new Error("Mobile fallback timed out"));
      }, 12000);

      document.body.append(iframe, form);
      form.submit();
    } catch (error) {
      cleanup();
      reject(error);
    }
  });
}

async function syncProfileLead(payload) {
  try {
    return await sendProfileLeadJsonp(PROFILE_LEAD_ENDPOINT, payload);
  } catch (error) {
    console.warn("JSONP signup failed, trying mobile fallback", error);
    return sendProfileLeadByForm(PROFILE_LEAD_ENDPOINT, payload);
  }
}

function errorMessage(error) {
  return String(error && error.message ? error.message : error);
}

function profileEmailCaptureEnabled() {
  return isHttpEndpoint(PROFILE_LEAD_ENDPOINT);
}

function profileLeadEndpointSummary() {
  if (!profileEmailCaptureEnabled()) return "Not connected";
  try {
    return new URL(PROFILE_LEAD_ENDPOINT).hostname;
  } catch {
    return "Connected endpoint";
  }
}

function profileLeadPostMode() {
  const mode = String(PROFILE_LEAD_POST_MODE || "auto").toLowerCase();
  if (mode === "json" || mode === "no-cors" || mode === "jsonp") return mode;
  try {
    const host = new URL(PROFILE_LEAD_ENDPOINT).hostname.toLowerCase();
    if (host.includes("script.google.com") || host.includes("script.googleusercontent.com")) {
      return "jsonp";
    }
  } catch {
    // Invalid endpoints are handled by profileEmailCaptureEnabled().
  }
  return "json";
}

function sendProfileLeadJsonp(endpoint, payload) {
  return new Promise((resolve, reject) => {
    const callbackName = `__chineseTutorSignupCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    let script = null;
    let timeoutId = null;

    function cleanup() {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (script?.parentNode) script.parentNode.removeChild(script);
      try {
        delete window[callbackName];
      } catch {
        window[callbackName] = undefined;
      }
    }

    try {
      const url = new URL(endpoint);
      url.searchParams.set("action", "signup");
      url.searchParams.set("callback", callbackName);
      url.searchParams.set("userAgent", window.navigator?.userAgent || "");

      for (const [key, value] of Object.entries(payload)) {
        url.searchParams.set(key, String(value ?? ""));
      }

      window[callbackName] = (response) => {
        cleanup();
        if (!response || response.ok === false) {
          reject(new Error(response?.error || "Signup collector rejected the profile"));
          return;
        }
        resolve(response);
      };

      script = document.createElement("script");
      script.src = url.toString();
      script.async = true;
      script.onerror = () => {
        cleanup();
        reject(new Error("Unable to reach signup collector"));
      };

      timeoutId = window.setTimeout(() => {
        cleanup();
        reject(new Error("Signup collector timed out"));
      }, 12000);

      document.body.appendChild(script);
    } catch (error) {
      cleanup();
      reject(error);
    }
  });
}

async function sendProfileLead(payload) {
  try {
    if (!profileEmailCaptureEnabled()) return;

    const body = JSON.stringify({
      source: "chinese-tutor",
      page: window.location.href,
      ...payload,
    });

    const mode = profileLeadPostMode();
    if (mode === "jsonp") {
      return await syncProfileLead({
        source: "chinese-tutor",
        page: window.location.href,
        ...payload,
      });
    }

    if (mode === "no-cors") {
      await fetch(PROFILE_LEAD_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body,
        keepalive: true,
      });
      return;
    }

    const response = await fetch(PROFILE_LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!response.ok) {
      throw new Error(`lead endpoint responded ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to send lead", error);
    throw error;
  }
}

function deleteProfile() {
  state.profile = emptyProfile();
  persist();
  render();
  showToast("已删除本机账户资料");
}

function setRefreshCadence(cadence) {
  state.profile = {
    ...emptyProfile(),
    ...state.profile,
    refreshCadence: parseRefreshCadence(cadence),
  };
  persist();
  render();
  showToast(state.profile.refreshCadence === "daily" ? "已设为每日更新" : "已设为每周更新");
}

function setTopicFilter(topicId) {
  if (!topics.some((topic) => topic.id === topicId)) return;
  state.topicFilter = topicId;
  if (topicId === "all" && dailyRecentArticle()) {
    state.articleId = DAILY_ARTICLE_ID;
    persist();
    render();
    return;
  }
  const list = filteredArticles();
  if (!list.some((article) => article.id === state.articleId)) {
    state.articleId = list[0]?.id || articles[0].id;
  }
  persist();
  render();
}

function allLearnableItems() {
  const libraryArticles = [...articles];
  const daily = stateReady ? dailyRecentArticle() : null;
  if (daily) {
    libraryArticles.unshift(daily);
  }

  return libraryArticles.flatMap((article) => [
    ...article.vocab.map((item) => ({ ...item, articleId: article.id, articleTitle: article.title })),
    ...article.phrases.map((item) => ({ ...item, articleId: article.id, articleTitle: article.title })),
  ]);
}

function itemById(id) {
  return allLearnableItems().find((item) => item.id === id);
}

function itemByIdOrSaved(id) {
  return itemById(id) || state.saved[id]?.item || null;
}

function itemByTerm(term) {
  const normalized = normalizeTermForLookup(term);
  return allLearnableItems().find((item) => normalizeTermForLookup(item.term) === normalized);
}

function normalizeTermForLookup(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/\s+/g, "")
    .replace(/[\u200B\uFEFF]/g, "")
    .toLowerCase();
}

function findSavedItemByTerm(term) {
  const normalized = normalizeTermForLookup(term);
  return Object.entries(state.saved).find(
    ([, entry]) => normalizeTermForLookup(entry.item?.term || "") === normalized,
  );
}

function hasSavedTerm(term) {
  return Boolean(findSavedItemByTerm(term));
}

function makeManualWordId(term) {
  const key = normalizeTermForLookup(term);
  let hash = 2166136261;
  for (const char of key) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `manual-${(hash >>> 0).toString(36)}-${Date.now().toString(36).slice(-6)}`;
}

function sanitizeManualTerm(raw) {
  const cleaned = String(raw || "")
    .normalize("NFKC")
    .replace(/[\u200B\uFEFF]/g, "")
    .replace(/\s+/g, "")
    .trim();
  if (!cleaned) return "";
  if (cleaned.length > 24) return "";
  const safe = cleaned.replace(/^[^a-zA-Z0-9\u4e00-\u9fff]+|[^a-zA-Z0-9\u4e00-\u9fff]+$/g, "");
  if (!safe) return "";
  if (!/^[a-zA-Z0-9\u4e00-\u9fff]+$/u.test(safe)) return "";
  return safe;
}

function textWithoutRuby(node) {
  if (!node) return "";
  const clone = node.cloneNode(true);
  if (typeof clone.querySelectorAll === "function") {
    clone.querySelectorAll("rt").forEach((element) => element.remove());
  }
  return clone.textContent || "";
}

function stripRubyPinyinFromSelectionText(raw) {
  const text = String(raw || "").normalize("NFKC");
  if (!/[\u4e00-\u9fff]/u.test(text)) return text;
  return text.replace(/[^\u4e00-\u9fff0-9]/gu, "");
}

function selectedTextFromRange(selection, range) {
  let text = "";
  try {
    text = textWithoutRuby(range.cloneContents());
  } catch {
    text = "";
  }
  return sanitizeManualTerm(stripRubyPinyinFromSelectionText(text || selection?.toString() || ""));
}

function termFromInlineElement(element) {
  if (!element) return "";
  return sanitizeManualTerm(stripRubyPinyinFromSelectionText(element.dataset.term || textWithoutRuby(element)));
}

function selectedTermLookup(term) {
  const item = itemByTerm(term);
  if (item) {
    return {
      item,
      saved: Boolean(state.saved[item.id]),
      savedId: item.id,
      source: "library",
    };
  }

  const savedEntry = findSavedItemByTerm(term);
  if (!savedEntry) return null;

  return {
    item: savedEntry[1].item,
    saved: true,
    savedId: savedEntry[0],
    source: "saved",
  };
}

function selectionPinyinForTerm(term, item = null) {
  const provided = item?.pinyin || "";
  const generated = pinyinTokensForText(term, provided);
  return generated.length ? generated.join(" ") : provided;
}

function selectionTypeLabel(item) {
  if (!item) return "自选词句";
  if (item.label) return item.label;
  const map = {
    vocab: "词汇",
    manual: "自选词",
    chengyu: "成语",
    suyu: "俗语",
    haoci: "好词好句",
    phrase: "短语",
  };
  return map[item.type] || "词句";
}

function renderSelectionDefinition(term) {
  const lookup = selectedTermLookup(term);
  const item = lookup?.item || null;
  const pinyin = selectionPinyinForTerm(term, item);
  const english = item?.english ? ` · ${escapeHtml(item.english)}` : "";

  selectionTitleNode.textContent = item ? "词句释义" : "本地小词典";
  selectionSaveButton.textContent = lookup?.saved ? "已在词句本" : "存入词句本";
  selectionSaveButton.disabled = Boolean(lookup?.saved);

  if (item) {
    selectionDefinitionNode.innerHTML = `
      <div class="selection-meta">${escapeHtml(selectionTypeLabel(item))}${pinyin ? ` · ${escapeHtml(pinyin)}` : ""}${english}</div>
      <p class="selection-meaning">${escapeHtml(item.meaning || "请在复习时补充释义。")}</p>
      ${item.example ? `<p class="selection-example">例句：${escapeHtml(item.example)}</p>` : ""}
      ${item.examUse ? `<p class="selection-example">口试用法：${escapeHtml(item.examUse)}</p>` : ""}
    `;
  } else {
    selectionDefinitionNode.innerHTML = `
      <div class="selection-meta">自选词句${pinyin ? ` · ${escapeHtml(pinyin)}` : " · 拼音加载中"}</div>
      <p class="selection-meaning">这个词句暂时不在内置词库里。你可以先确认读音，再存入词句本，之后复习时补充更准确的释义和例句。</p>
      <p class="selection-example">原文选中：${escapeHtml(term)}</p>
    `;
  }

  selectionDefinitionNode.hidden = false;
}

function translatePendingSelection() {
  const term = sanitizeManualTerm(pendingSelectionText);
  if (!term) {
    hideSelectionToolbar();
    return;
  }

  renderSelectionDefinition(term);

  if (/[\u4e00-\u9fff]/u.test(term) && !pinyinEngine && !pinyinEngineFailed) {
    ensurePinyinEngine().then(() => {
      if (pendingSelectionText === term && !selectionDefinitionNode.hidden) {
        renderSelectionDefinition(term);
      }
    });
  }
}

function makeManualSelectionItem(term) {
  const article = currentArticle();
  const pinyin = selectionPinyinForTerm(term);
  const id = makeManualWordId(term);

  return {
    id,
    term,
    pinyin,
    english: "自定义词",
    meaning: "这是你从文章中选出的词句，暂未收录在内置词库。",
    example: `原文中出现：“${term}”。`,
    examUse: "复习时可补充英文意思、中文释义和自己的例句。",
    type: "manual",
    articleId: article.id,
    articleTitle: article.title,
  };
}

function savePendingSelectionToWordBank() {
  const term = sanitizeManualTerm(pendingSelectionText);
  if (!term) {
    hideSelectionToolbar();
    return;
  }

  const lookup = selectedTermLookup(term);
  if (lookup?.saved) {
    showToast(`${term} 已在词汇本`);
    hideSelectionToolbar();
    return;
  }

  if (lookup?.item) {
    hideSelectionToolbar({ clearSelection: false });
    toggleSave(lookup.item.id);
    return;
  }

  if (hasSavedTerm(term)) {
    showToast(`${term} 已在词汇本`);
    hideSelectionToolbar();
    return;
  }

  const item = makeManualSelectionItem(term);

  if (!hasProfile()) {
    pendingManualSelectionItem = item;
    hideSelectionToolbar({ clearSelection: false });
    openSignupPrompt(false);
    return;
  }

  state.saved[item.id] = {
    item,
    savedAt: Date.now(),
  };
  reviewFor(item.id);
  persist();
  showToast(`已加入词汇：${term}`);
  hideSelectionToolbar();
  render();
}

function hideSelectionToolbar({ clearSelection = true } = {}) {
  pendingSelectionText = "";
  selectionToolbarPointerActive = false;
  if (clearSelection) {
    window.getSelection()?.removeAllRanges();
  }
  selectionDefinitionNode.hidden = true;
  selectionDefinitionNode.innerHTML = "";
  selectionSaveButton.disabled = false;
  selectionToolbar.hidden = true;
}

function showSelectionToolbar(term, anchor) {
  pendingSelectionText = term;
  selectionTermNode.textContent = term;
  selectionTitleNode.textContent = selectedTermLookup(term) ? "可查询词句" : "选中文本";
  selectionDefinitionNode.hidden = true;
  selectionDefinitionNode.innerHTML = "";
  selectionSaveButton.disabled = false;
  selectionSaveButton.textContent = selectedTermLookup(term)?.saved ? "已在词句本" : "存入词句本";
  const rect = typeof anchor?.getBoundingClientRect === "function" ? anchor.getBoundingClientRect() : anchor;
  if (!rect) return;
  const left = Math.max(10, Math.min(window.innerWidth - 300, rect.left + rect.width / 2 - 100));
  const top = Math.max(80, rect.top - 72);
  const clampedTop = Math.min(top, window.innerHeight - 120);
  selectionToolbar.style.left = `${left}px`;
  selectionToolbar.style.top = `${clampedTop}px`;
  selectionToolbar.hidden = false;
}

function evaluateSelectionForManual() {
  const passage = document.querySelector(".passage");
  const active = document.activeElement;
  if (Date.now() < selectionInteractionLockUntil && !selectionToolbar.hidden) {
    return;
  }

  if (selectionToolbarPointerActive || (active && selectionToolbar.contains(active))) {
    return;
  }

  if (isEditableElement(active)) {
    hideSelectionToolbar({ clearSelection: false });
    return;
  }

  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || !passage) {
    hideSelectionToolbar();
    return;
  }

  const range = selection.getRangeAt(0);
  const fromNode = range.startContainer.nodeType === Node.TEXT_NODE ? range.startContainer.parentElement : range.startContainer;
  const toNode = range.endContainer.nodeType === Node.TEXT_NODE ? range.endContainer.parentElement : range.endContainer;
  if (!passage.contains(fromNode) || !passage.contains(toNode)) {
    hideSelectionToolbar();
    return;
  }

  const term = selectedTextFromRange(selection, range);
  if (!term) {
    hideSelectionToolbar();
    return;
  }

  showSelectionToolbar(term, range);
}

function showTappedTermDefinition(event) {
  const passage = document.querySelector(".passage");
  const termNode = event.target.closest?.(".inline-term");
  if (!passage || !termNode || !passage.contains(termNode)) return false;

  const selection = window.getSelection();
  if (selection && !selection.isCollapsed) return false;

  const term = termFromInlineElement(termNode);
  if (!term) return false;

  selectionInteractionLockUntil = Date.now() + 450;
  showSelectionToolbar(term, termNode.getBoundingClientRect());
  renderSelectionDefinition(term);
  return true;
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

function ensurePinyinEngine() {
  if (pinyinEngine || pinyinEngineFailed) return pinyinEnginePromise || Promise.resolve(pinyinEngine);

  pinyinEnginePromise = import(PINYIN_ENGINE_URL)
    .then((module) => {
      pinyinEngine = module.pinyin;
      pinyinCache.clear();
      if (state.pinyin) render();
      return pinyinEngine;
    })
    .catch(() => {
      pinyinEngineFailed = true;
      showToast("完整拼音暂时加载失败，先显示本地拼音");
      return null;
    });

  return pinyinEnginePromise;
}

function pinyinTokensForText(text, providedPinyin = "") {
  const safeText = String(text || "");
  if (!safeText) return [];

  if (pinyinEngine) {
    const cached = pinyinCache.get(safeText);
    if (cached) return cached;

    let tokens = [];
    try {
      const converted = pinyinEngine(safeText, {
        type: "array",
        toneType: "symbol",
        nonZh: "removed",
        separator: " ",
        toneSandhi: true,
      });
      tokens = Array.isArray(converted) ? converted.map(normalizePinyinToken).filter(Boolean) : [];
    } catch {
      tokens = [];
    }

    if (tokens.length) {
      if (pinyinCache.size >= PINYIN_CACHE_LIMIT) {
        pinyinCache.delete(pinyinCache.keys().next().value);
      }
      pinyinCache.set(safeText, tokens);
      return tokens;
    }
  }

  return extractPinyinTokens(providedPinyin);
}

function highlightTerms(text, article = currentArticle(), paragraphPinyin = "") {
  const items = [...article.vocab, ...article.phrases]
    .sort((a, b) => b.term.length - a.term.length);
  const pinyinTokens = state.pinyin ? pinyinTokensForText(text, paragraphPinyin) : [];
  let pinyinIndex = 0;

  let output = "";
  let index = 0;

  while (index < text.length) {
    const item = items.find((candidate) => text.startsWith(candidate.term, index));
    if (item) {
      const consumed = countHanCharacters(item.term);
      const generatedItemPinyin = state.pinyin ? pinyinTokensForText(item.term, item.pinyin) : [];
      const itemPinyin =
        generatedItemPinyin.length
          ? generatedItemPinyin.join(" ")
          : item.pinyin || (state.pinyin && consumed > 0
          ? pinyinTokens.slice(pinyinIndex, pinyinIndex + consumed).join(" ")
          : "");

      if (state.pinyin) {
        pinyinIndex = Math.min(pinyinIndex + consumed, pinyinTokens.length);
      }

      output += state.pinyin
        ? `<span class="inline-term pinyin-term" data-term="${escapeHtml(item.term)}">${renderRubyTerm(item.term, itemPinyin)}</span>`
        : `<mark class="inline-term" data-term="${escapeHtml(item.term)}">${escapeHtml(item.term)}</mark>`;
      index += item.term.length;
      continue;
    }

    const char = text[index];
    if (state.pinyin && isHanCharacter(char)) {
      output += `<span class="inline-term pinyin-term" data-term="${escapeHtml(char)}">${renderRubyTerm(char, pinyinTokens[pinyinIndex] || "")}</span>`;
      pinyinIndex += 1;
    } else {
      output += escapeHtml(char);
    }
    index += 1;
  }

  return output;
}

function extractPinyinTokens(raw = "") {
  if (Array.isArray(raw)) return raw.map(normalizePinyinToken).filter(Boolean);
  if (typeof raw !== "string") return [];

  return raw
    .normalize("NFC")
    .replace(/[\r\n\t]+/g, " ")
    .split(/\s+/)
    .map(normalizePinyinToken)
    .filter(Boolean);
}

function normalizePinyinToken(token) {
  return String(token || "")
    .normalize("NFC")
    .replace(/[^\p{Letter}\u0300-\u036f'-]+/gu, "")
    .trim();
}

function countHanCharacters(value) {
  let count = 0;
  for (const char of String(value || "")) {
    if (isHanCharacter(char)) {
      count += 1;
    }
  }
  return count;
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

function sanitizeSafeUrl(url) {
  const raw = String(url || "").trim();
  try {
    const parsed = new URL(raw);
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.toString() : "javascript:void(0)";
  } catch {
    return "javascript:void(0)";
  }
}

function headlineCategoryLabel(topicId) {
  return headlineCategories.find((category) => category.id === topicId)?.label || "Wild card / 随机话题";
}

function classifyHeadline(title) {
  const normalized = String(title || "").toLowerCase();
  let bestMatch = "society";
  let bestScore = 0;

  for (const category of headlineCategories) {
    const score = category.keywords.reduce((count, keyword) => {
      return normalized.includes(keyword.toLowerCase()) ? count + 1 : count;
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = category.id;
    }
  }

  return bestMatch;
}

function headlineTimestamp(value) {
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function dateKeyFromTimestamp(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp).toISOString().slice(0, 10);
}

function isRecentHeadlineDate(value) {
  const timestamp = headlineTimestamp(value);
  if (!timestamp) return false;

  const now = Date.now();
  const min = now - RECENT_HEADLINE_WINDOW_DAYS * DAY;
  return timestamp >= min && timestamp <= now + DAY;
}

function hashText(value) {
  let hash = 2166136261;
  for (const char of String(value || "")) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash;
}

function normalizeHeadlineRecord(raw) {
  if (!isRecord(raw)) return null;

  const sourceTitle = sanitizeText(raw.sourceTitle || raw.title, 180);
  const sourceUrl = sanitizeSafeUrl(raw.sourceUrl || raw.url);
  const sourceDate = sanitizeDateString(raw.sourceDate) || dateKeyFromTimestamp(headlineTimestamp(raw.publishedAt));
  if (!sourceTitle || sourceUrl === "javascript:void(0)" || !sourceDate) return null;

  const topicId = headlineCategories.some((category) => category.id === raw.topicId)
    ? raw.topicId
    : classifyHeadline(sourceTitle);

  return {
    id: sanitizeActionId(raw.id) || `headline-${Math.abs(hashText(`${sourceTitle}|${sourceUrl}`)).toString(36)}`,
    topicId,
    topicLabel: raw.topicLabel ? sanitizeText(raw.topicLabel, 80) : headlineCategoryLabel(topicId),
    sourceName: sanitizeText(raw.sourceName || "News", 80),
    sourceTitle,
    sourceUrl,
    sourceDate,
    sourceSnippet: sanitizeText(raw.sourceSnippet || raw.section || "Recent headline", 180),
    section: sanitizeText(raw.section || "", 80),
  };
}

function normalizedHeadlineUrl(url) {
  const raw = String(url || "").trim();
  if (!raw || raw === "javascript:void(0)") return "";

  try {
    const parsed = new URL(raw);
    parsed.hash = "";
    for (const key of [...parsed.searchParams.keys()]) {
      if (/^utm_/i.test(key) || ["ref", "fbclid", "gclid"].includes(key.toLowerCase())) {
        parsed.searchParams.delete(key);
      }
    }
    return `${parsed.origin}${parsed.pathname}${parsed.search}`.toLowerCase();
  } catch {
    return raw.split(/[?#]/)[0].toLowerCase();
  }
}

function normalizedHeadlineTitle(title) {
  return String(title || "")
    .normalize("NFKC")
    .replace(/\s+/g, "")
    .toLowerCase();
}

function headlineDedupeKeys(headline) {
  return [
    normalizedHeadlineUrl(headline.sourceUrl) && `url:${normalizedHeadlineUrl(headline.sourceUrl)}`,
    normalizedHeadlineTitle(headline.sourceTitle) && `title:${normalizedHeadlineTitle(headline.sourceTitle)}`,
  ].filter(Boolean);
}

function sortHeadlinesByDate(headlines) {
  return [...headlines].sort((a, b) => {
    const dateDiff = headlineTimestamp(b.sourceDate) - headlineTimestamp(a.sourceDate);
    if (dateDiff) return dateDiff;
    return a.sourceTitle.localeCompare(b.sourceTitle);
  });
}

function mergeHeadlines(headlines) {
  const seen = new Set();
  const unique = [];

  for (const headline of sortHeadlinesByDate(headlines.filter(Boolean))) {
    const keys = headlineDedupeKeys(headline);
    if (keys.some((key) => seen.has(key))) continue;
    keys.forEach((key) => seen.add(key));
    unique.push(headline);
  }

  return unique;
}

function builtInRecentHeadlines() {
  const articleHeadlines = articles
    .filter((article) => isRecentHeadlineDate(article.sourceDate))
    .map((article) =>
      normalizeHeadlineRecord({
        id: `seed-${article.id}`,
        topicId: article.topicId,
        topicLabel: headlineCategoryLabel(article.topicId),
        sourceName: article.sourceName,
        sourceTitle: article.sourceTitle,
        sourceUrl: article.sourceUrl,
        sourceDate: article.sourceDate,
        sourceSnippet: article.sourceSnippet,
        section: "Built-in practice source",
      }),
    )
    .filter(Boolean);

  const curatedChinese = CURATED_CHINESE_RECENT_HEADLINES.map((headline) =>
    normalizeHeadlineRecord({
      ...headline,
      topicLabel: headlineCategoryLabel(headline.topicId),
      section: "Chinese source seed",
    }),
  ).filter(Boolean);

  return mergeHeadlines([...curatedChinese, ...articleHeadlines]);
}

function isChineseNewsSource(headline) {
  const source = String(headline?.sourceName || "");
  return CHINESE_SOURCE_NAMES.some((name) => source.includes(name));
}

function balanceHeadlineSources(headlines, limit = RECENT_HEADLINE_LIMIT) {
  const recent = mergeHeadlines(headlines).filter((headline) => isRecentHeadlineDate(headline.sourceDate));
  const chinese = recent.filter(isChineseNewsSource);
  const other = recent.filter((headline) => !isChineseNewsSource(headline));
  const targetChinese = Math.min(chinese.length, Math.ceil(Math.min(limit, recent.length) / 2));
  const selected = [];
  let chineseIndex = 0;
  let otherIndex = 0;
  let selectedChinese = 0;

  while (selected.length < limit && selected.length < recent.length) {
    const shouldUseChinese =
      chineseIndex < chinese.length &&
      (selectedChinese < targetChinese || otherIndex >= other.length || selected.length % 2 === 0);

    if (shouldUseChinese) {
      selected.push(chinese[chineseIndex]);
      chineseIndex += 1;
      selectedChinese += 1;
      continue;
    }

    if (otherIndex < other.length) {
      selected.push(other[otherIndex]);
      otherIndex += 1;
      continue;
    }

    if (chineseIndex < chinese.length) {
      selected.push(chinese[chineseIndex]);
      chineseIndex += 1;
      selectedChinese += 1;
    } else {
      break;
    }
  }

  return selected;
}

function extractXmlText(node, tagNames) {
  for (const tagName of tagNames) {
    const match = node.getElementsByTagName(tagName)[0];
    const text = sanitizeText(match?.textContent, 220);
    if (text) return text;
  }
  return "";
}

function extractXmlLink(node) {
  const linkNode = node.getElementsByTagName("link")[0];
  const href = linkNode?.getAttribute("href");
  return sanitizeText(href || linkNode?.textContent, 300);
}

function parseFeedXml(xml, feed) {
  const document = new DOMParser().parseFromString(xml, "application/xml");
  if (document.querySelector("parsererror")) return [];

  const items = [...document.getElementsByTagName("item"), ...document.getElementsByTagName("entry")];
  return items
    .map((item) => {
      const sourceTitle = extractXmlText(item, ["title"]);
      const sourceUrl = extractXmlLink(item);
      const publishedAt = extractXmlText(item, ["pubDate", "published", "updated", "dc:date"]);
      const sourceSnippet = extractXmlText(item, ["description", "summary"]);
      return normalizeHeadlineRecord({
        sourceName: feed.sourceName,
        sourceTitle,
        sourceUrl,
        sourceDate: dateKeyFromTimestamp(headlineTimestamp(publishedAt)),
        publishedAt,
        sourceSnippet,
        section: feed.section,
      });
    })
    .filter((headline) => headline && isRecentHeadlineDate(headline.sourceDate));
}

async function fetchFeedHeadlines(feed) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(feed.url, { signal: controller.signal });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseFeedXml(xml, feed);
  } catch {
    return [];
  } finally {
    window.clearTimeout(timeout);
  }
}

async function loadRecentHeadlines() {
  const results = await Promise.allSettled(HEADLINE_FEEDS.map(fetchFeedHeadlines));
  const fetched = results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
  return balanceHeadlineSources([...fetched, ...builtInRecentHeadlines()]);
}

function recentHeadlinePool() {
  const live = parseHeadlines(state.headlines).filter((headline) => isRecentHeadlineDate(headline.sourceDate));
  return live.length ? balanceHeadlineSources(live) : balanceHeadlineSources(builtInRecentHeadlines());
}

function pickHeadlineForDate(headlines, dateKey = singaporeDateKey()) {
  const pool = balanceHeadlineSources(headlines).filter((headline) => isRecentHeadlineDate(headline.sourceDate));
  if (!pool.length) return null;

  const seed = Math.abs(hashText(dateKey));
  return pool[seed % pool.length];
}

function headlineOfTheDay() {
  const today = singaporeDateKey();
  const savedDaily = parseDailyHeadline(state.dailyHeadline);
  if (savedDaily && state.pipeline.dailyDate === today && isRecentHeadlineDate(savedDaily.sourceDate)) {
    return savedDaily;
  }

  return pickHeadlineForDate(recentHeadlinePool(), today);
}

function shouldScanDailyNews() {
  const today = singaporeDateKey();
  if (state.pipeline.dailyDate !== today) return true;
  if (!state.headlines.length) return true;
  const checkedAt = sanitizeTimestamp(state.pipeline.checkedAt);
  return !checkedAt || Date.now() - checkedAt > 6 * 60 * 60 * 1000;
}

function headlineGroups() {
  const groups = new Map(
    headlineCategories.map((category) => [
      category.id,
      {
        ...category,
        items: [],
      },
    ]),
  );

  for (const headline of recentHeadlinePool()) {
    const group = groups.get(headline.topicId) || groups.get("society");
    group.items.push(headline);
  }

  return [...groups.values()].filter((group) => group.items.length);
}

function topicLabelZh(topicId) {
  return topics.find((topic) => topic.id === topicId)?.label || "社会";
}

function headlineTopicNoun(topicId) {
  const map = {
    technology: "数码生活",
    environment: "环境与食物安全",
    education: "教育与成长",
    health: "公共健康",
    livelihood: "民生经济",
    culture: "文化生活",
    society: "社会责任",
  };
  return map[topicId] || "社会课题";
}

function headlineChineseTitle(headline) {
  const map = {
    technology: "数码时代的新课题：便利、风险与责任",
    environment: "从近期新闻看可持续生活的取舍",
    education: "学习不只在课堂：社会变化给学生的提醒",
    health: "健康不是个人小事：公共意识为什么重要",
    livelihood: "民生压力下，我们该如何取得平衡？",
    culture: "文化生活如何影响我们的身份认同？",
    society: "社会事件背后的公民责任",
  };
  return map[headline.topicId] || "近期新闻带来的思考";
}

function headlineChineseSummary(headline) {
  const topic = headlineTopicNoun(headline.topicId);
  return `这则${headline.sourceName}近期新闻围绕“${topic}”展开。练习时不需要背原文，而要学会用中文概括现象、分析影响，并联系新加坡社会提出自己的看法。`;
}

function headlineChineseReading(headline) {
  const topic = headlineTopicNoun(headline.topicId);
  const title = headlineChineseTitle(headline);
  const sourceMode = isChineseNewsSource(headline) ? "中文源文" : "英文源文";
  return [
    `源文标题是“${headline.sourceTitle}”。这则${sourceMode}可以归入“${title}”。把它改成口试材料时，重点不是复制新闻细节，而是抓住“${topic}”这个核心课题，说明它为什么会影响普通人的生活。`,
    `从学生的角度来看，这类新闻可以训练我们把事实转化成观点。我们可以先概括发生了什么，再分析不同群体可能受到的影响，最后联系学校、家庭或社区提出可行建议。这样回答会比只说“我觉得重要”更有层次。`,
    `因此，阅读这则新闻时，可以记住三个方向：第一，现象背后有什么社会原因；第二，它带来哪些利弊或风险；第三，个人、学校和政府可以怎样配合。用这样的方式读新闻，才能把近期头条变成高级华文口试素材。`,
  ];
}

function dailyRecentArticle() {
  const headline = headlineOfTheDay();
  if (!headline) return null;

  const hash = Math.abs(hashText(`${headline.sourceTitle}|${headline.sourceDate}`)).toString(36).slice(0, 8);
  const topic = headlineTopicNoun(headline.topicId);
  const topicLabel = topicLabelZh(headline.topicId);
  const title = headlineChineseTitle(headline);
  const baseId = `daily-${hash}`;
  const summary = headlineChineseSummary(headline);

  return {
    id: DAILY_ARTICLE_ID,
    topicId: headline.topicId,
    topicLabel,
    title,
    sourceName: headline.sourceName,
    sourceTitle: headline.sourceTitle,
    sourceUrl: headline.sourceUrl,
    sourceDate: headline.sourceDate,
    sourceSnippet: `${summary} 源文标题：${headline.sourceTitle}`,
    readingTime: "6 min",
    tags: ["近期新闻", topic, "口试素材", "原创中文练习"],
    paragraphs: [
      {
        zh:
          `近七天的新闻不断提醒我们，${topic}并不是离学生很远的话题。新闻表面上讲的是一个具体事件，` +
          "但背后往往牵涉个人选择、社会制度和公共利益。准备高级华文口试时，我们不能只复述新闻标题，而要抓住现象，说明它为什么值得关注。",
        py: "",
        en: "Use the news as a topic anchor, then explain why the issue matters.",
      },
      {
        zh:
          "从学生的角度来看，这类新闻能训练我们的信息素养。面对新消息，我们需要分辨事实和观点，比较不同群体的立场，也要思考短期便利和长期后果之间的取舍。这样一来，阅读新闻就不只是知道发生了什么，更是学习如何有条理地表达看法。",
        py: "",
        en: "The paragraph turns a news item into exam-ready reasoning.",
      },
      {
        zh:
          `我认为，面对${topic}相关课题，社会不能只依靠单一做法。政府可以制定清楚规则，学校可以引导学生讨论真实案例，个人也要培养风险意识和责任感。` +
          "只有多方配合，我们才能在变化中保持判断力，也能把新闻素材转化成有深度的中文表达。",
        py: "",
        en: "Good conclusion: multi-party effort and judgement.",
      },
    ],
    vocab: [
      vocab(`${baseId}-xianxiang`, "现象", "xian xiang", "phenomenon", "表面上看到的情况或趋势。", "我们要先概括新闻中的现象，再分析它的影响。", "口试开头可用：这个现象反映了社会正在面对新的挑战。"),
      vocab(`${baseId}-qushe`, "取舍", "qu she", "trade-off", "在不同利益之间做选择。", "科技带来便利，但也涉及隐私与安全的取舍。", "议论文常用：任何政策都难免有取舍。"),
      vocab(`${baseId}-gonggongliyi`, "公共利益", "gong gong li yi", "public interest", "对社会大众有益的整体利益。", "个人自由有时需要和公共利益取得平衡。", "社会责任题可用：公共利益不能被忽视。"),
      vocab(`${baseId}-xinxiyang`, "信息素养", "xin xi su yang", "information literacy", "判断、理解和使用信息的能力。", "学生需要提高信息素养，才不会轻易被误导。", "数码时代、假新闻、数据安全题通用。"),
      vocab(`${baseId}-fengxian`, "风险意识", "feng xian yi shi", "risk awareness", "能预先想到可能出现的问题。", "培养风险意识有助于我们做出更负责任的决定。", "可用于建议段：学校应通过真实案例培养学生的风险意识。"),
    ],
    phrases: [
      phrase(`${baseId}-chengyu`, "成语", "未雨绸缪", "wei yu chou mou", "事情发生前先做好准备。", "面对快速变化的社会，我们必须未雨绸缪。"),
      phrase(`${baseId}-suyu`, "俗语", "凡事有利也有弊", "fan shi you li ye you bi", "任何事情通常同时有好处和坏处。", "讨论新闻时要看到利弊，不能只从一个角度判断。"),
      phrase(`${baseId}-haoci`, "好词好句", "把新闻转化为思考，把思考转化为表达", "ba xin wen zhuan hua wei si kao", "强调阅读新闻后要形成自己的观点。", "高级华文学习不只是看新闻，而是把新闻转化为思考，把思考转化为表达。"),
    ],
    oral: oralPack(
      `你认为学生关注${topic}类新闻有必要吗？`,
      `近期新闻显示，${topic}与社会生活密切相关，也会影响年轻人的判断。`,
      "我认为有必要，因为新闻能帮助学生理解社会，也能训练表达和思辨能力。",
      "学生通过新闻可以学习分析利弊、分辨事实与观点，并积累口试和作文素材。",
      "学校可每周安排新闻讨论，让学生用PEEL结构表达观点，并联系自己的生活经验。",
      [
        ["为什么不能只背新闻内容？", "因为口试考查的是观点和表达，不是背诵新闻。学生必须解释新闻背后的意义。"],
        ["学生怎样判断新闻是否可靠？", "可以比较不同来源，留意数据和专家说法，也要分清事实与个人意见。"],
        ["新闻阅读对写作有什么帮助？", "它能提供真实例子和高级词汇，让作文论点更具体。"],
      ],
    ),
  };
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

function renderManualVocabSection(article) {
  const manualItems = savedItems()
    .filter((item) => item.type === "manual" && item.articleId === article.id)
    .slice(0, 6);

  return `
    <section class="panel">
      <div class="section-heading">
        <h2>自选词汇</h2>
        <span class="small">高亮词句后点 Translate</span>
      </div>
      ${
        manualItems.length
          ? `<div class="grid two">${manualItems.map(renderVocabCard).join("")}</div>`
          : `<p class="small">用鼠标高亮词句，或在手机上长按选择文字，就会出现翻译和收藏按钮。</p>`
      }
    </section>
  `;
}

function render() {
  hideSelectionToolbar();
  document.querySelectorAll("[data-nav]").forEach((button) => {
    button.classList.toggle("active", button.dataset.nav === state.tab);
  });

  if (isProfileRequiredForReading() && !signupPromptOpen) {
    seedProfileDraft();
    signupPromptOpen = true;
    continueAfterSignup = false;
  }

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
  view.innerHTML = `${renderers[state.tab]()}${renderSignupModal()}`;
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

    <section class="panel compact-status-panel">
      <div class="metric-row">
        <span class="status-pill ${state.pipeline.status === "live" ? "" : "warn"}">${escapeHtml(state.pipeline.message)}</span>
        ${
          state.pipeline.dailyDate
            ? `<span class="chip soft">Daily scan: ${escapeHtml(state.pipeline.dailyDate)}</span>`
            : ""
        }
      </div>
      ${
        state.pipeline.dailySourceTitle
          ? `<p class="small">Today's scanned source: ${escapeHtml(state.pipeline.dailySourceTitle)}</p>`
          : `<p class="small">The app scans approved news feeds once per Singapore day when it opens, then pins one headline as today's practice article.</p>`
      }
    </section>

    <section class="lesson-hero">
      <div class="hero-copy">
      <div class="source-row">
        <span class="chip">${escapeHtml(article.topicLabel)}</span>
        <span class="chip amber">${escapeHtml(article.readingTime)}</span>
          <a class="source-link" href="${sanitizeSafeUrl(article.sourceUrl)}" target="_blank" rel="noreferrer">
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
              <p>${highlightTerms(paragraph.zh, article, paragraph.py)}</p>
              ${state.english ? `<p class="english-hint">${escapeHtml(paragraph.en)}</p>` : ""}
            `,
          )
          .join("")}
      </div>
    </section>

    ${renderHeadlineExposure()}

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

    ${renderManualVocabSection(article)}

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

function renderHeadlineExposure() {
  const groups = headlineGroups()
    .map((group) => ({
      ...group,
      items: group.items.slice(0, 5),
    }))
    .filter((group) => group.items.length);

  if (!groups.length) return "";

  return `
    <section class="panel headline-panel">
      <details class="recent-headlines">
        <summary>更多近期题材（过去${RECENT_HEADLINE_WINDOW_DAYS}天）</summary>
        <p class="small">这些不是新闻简报，而是额外中文阅读素材：每条都附上源文标题、原创中文摘要和原文链接。</p>
        <div class="headline-groups">
          ${groups
            .map(
              (group) => `
                <section class="headline-group">
                  <div class="headline-group-title">
                    <h3>${escapeHtml(topicLabelZh(group.id))}</h3>
                    <span class="small">${group.items.length}</span>
                  </div>
                  <div class="headline-list">
                    ${group.items.map(renderCompactHeadline).join("")}
                  </div>
                </section>
              `,
            )
            .join("")}
        </div>
      </details>
    </section>
  `;
}

function renderFeaturedHeadline(headline) {
  const sourceMeta = `${headline.sourceDate} · ${headline.sourceName} · ${headline.section || "recent headline"}`;
  return `
    <article class="headline-feature">
      <div>
        <span class="chip warm">${escapeHtml(headline.topicLabel)}</span>
        <h3>${escapeHtml(headline.sourceTitle)}</h3>
        <p class="small">${escapeHtml(sourceMeta)}</p>
      </div>
      <a class="text-link" href="${sanitizeSafeUrl(headline.sourceUrl)}" target="_blank" rel="noreferrer">Open source</a>
    </article>
  `;
}

function renderCompactHeadline(headline) {
  const reading = headlineChineseReading(headline);
  const practiceAngle = headlineChineseTitle(headline);
  return `
    <article class="headline-link">
      <div>
        <span>${escapeHtml(headline.sourceTitle)}</span>
        <p>${escapeHtml(headlineChineseSummary(headline))}</p>
        <small>练习角度：${escapeHtml(practiceAngle)}</small>
        <small>${escapeHtml(headline.sourceDate)} · ${escapeHtml(headline.sourceName)}</small>
        <details class="headline-reading">
          <summary>展开中文练习稿</summary>
          ${reading.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        </details>
      </div>
      <a class="text-link" href="${sanitizeSafeUrl(headline.sourceUrl)}" target="_blank" rel="noreferrer">打开源文</a>
    </article>
  `;
}

function renderSourceCard(article) {
  const sourceUrl = sanitizeSafeUrl(article.sourceUrl);
  return `
    <article class="source-card">
      <div>
        <span class="chip">${escapeHtml(article.sourceName)}</span>
        <h3>${escapeHtml(article.sourceTitle)}</h3>
        <p class="small">${escapeHtml(article.sourceDate)} · ${escapeHtml(article.topicLabel)}</p>
      </div>
      <a class="text-link" href="${sourceUrl}" target="_blank" rel="noreferrer">打开源文</a>
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
      <button class="secondary-button compact" type="button" data-open-article="${escapeHtml(article.id)}">
        ${active ? "正在读" : "阅读"}
      </button>
    </article>
  `;
}

function renderVocabCard(item) {
  const saved = Boolean(state.saved[item.id]);
  const pinyin = item.pinyin ? escapeHtml(item.pinyin) : "未填写";
  const english = item.english ? escapeHtml(item.english) : "自定义词";
  const meaning = item.meaning ? escapeHtml(item.meaning) : "请补充释义并反复复习。";
  const example = item.example ? escapeHtml(item.example) : "可用原文语境造句并记忆。";
  const examUse = item.examUse ? escapeHtml(item.examUse) : "";

  return `
    <article class="vocab-card">
      <div class="vocab-top">
        <div>
          <div class="term">${escapeHtml(item.term)}</div>
          <div class="term-meta tone">${pinyin} · ${english}</div>
        </div>
        <button class="mini-action ${saved ? "saved" : ""}" type="button" data-save="${escapeHtml(item.id)}" aria-label="Save ${escapeHtml(item.term)}">
          <svg><use href="#${saved ? "icon-check" : "icon-plus"}"></use></svg>
        </button>
      </div>
      <p class="example">${meaning}</p>
      <p class="example">${example}</p>
      ${examUse ? `<div class="exam-use">${examUse}</div>` : ""}
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
        <button class="mini-action ${saved ? "saved" : ""}" type="button" data-save="${escapeHtml(item.id)}" aria-label="Save ${escapeHtml(item.term)}">
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
        <button class="secondary-button" type="button" data-grade="${escapeHtml(item.id)}" data-result="again">再来</button>
        <button class="primary-button" type="button" data-grade="${escapeHtml(item.id)}" data-result="good">记得</button>
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
        <button class="mini-action" type="button" data-remove="${escapeHtml(item.id)}" aria-label="Remove ${escapeHtml(item.term)}">
          <svg><use href="#icon-trash"></use></svg>
        </button>
      </div>
      <p class="small">${escapeHtml(item.articleTitle || "阅读库词句")}</p>
      <p class="example">${escapeHtml(item.meaning)}</p>
      <p class="example">${escapeHtml(item.example)}</p>
      <div class="action-row">
        <button class="secondary-button" type="button" data-grade="${escapeHtml(item.id)}" data-result="good">安排复习</button>
        <button class="secondary-button" type="button" data-master="${escapeHtml(item.id)}">
          ${review.mastered ? "已掌握" : "标为掌握"}
        </button>
      </div>
    </article>
  `;
}

function excerptSentence(text, maxLength = 96) {
  const cleaned = sanitizeText(text, maxLength * 2).replace(/\s+/g, "");
  if (!cleaned) return "";
  const sentence = cleaned.split(/[。！？!?]/).find(Boolean) || cleaned;
  return sentence.length > maxLength ? `${sentence.slice(0, maxLength)}…` : sentence;
}

function buildPeelAnswer(article) {
  const prompt = oralAgreementPrompt(article.oral?.prompt);
  const outline = article.oral?.outline || [];
  const stance = outline.find(([label]) => label === "立场")?.[1] || `我同意这个观点，因为它和${article.topicLabel}息息相关。`;
  const reason = outline.find(([label]) => label === "理由")?.[1] || "这个课题会影响个人选择和社会发展。";
  const suggestion = outline.find(([label]) => label === "建议")?.[1] || "我们应该从个人、学校和社会三个层面采取行动。";
  const evidenceOne = excerptSentence(article.paragraphs?.[0]?.zh || article.sourceSnippet);
  const evidenceTwo = excerptSentence(article.paragraphs?.[1]?.zh || article.sourceSnippet);
  const evidenceThree = excerptSentence(article.paragraphs?.[2]?.zh || suggestion);

  return {
    prompt,
    stance,
    paragraphs: [
      {
        point: `首先，${reason}`,
        evidence: `材料提到，${evidenceOne}`,
        explanation:
          "这说明我们不能只看表面现象，而要分析它对学生、家庭或社会造成的实际影响。把材料内容和现实生活联系起来，论点才会更有说服力。",
        link: `因此，这一点支持我的立场：${stance}`,
      },
      {
        point: `其次，这个课题也涉及${article.topicLabel}中的取舍与责任。`,
        evidence: `材料也指出，${evidenceTwo}`,
        explanation:
          "这提醒我们，任何社会课题往往都有利弊。如果只强调好处或坏处，回答会显得片面；更好的做法是说明不同群体会受到什么影响。",
        link: `所以，回答“${prompt}”时，我会强调必须兼顾个人需要和社会责任。`,
      },
      {
        point: "最后，解决问题不能只靠口号，还需要具体做法。",
        evidence: evidenceThree ? `材料可延伸出这一点：${evidenceThree}` : `我的建议是：${suggestion}`,
        explanation:
          "政府、学校、家庭和个人都可以承担一部分责任。这样回答不但能提出看法，也能展示解决问题的能力，符合口头报告对思考深度的要求。",
        link: `总的来说，${stance}，因为这能让社会在面对变化时更有准备。`,
      },
    ],
  };
}

function renderPeelAnswer(article) {
  const answer = buildPeelAnswer(article);
  return `
    <section class="panel">
      <details class="answer-dropdown">
        <summary>Recommended oral answer / 推荐口头答案</summary>
        <div class="peel-answer">
          <p class="example"><strong>立场：</strong>${escapeHtml(answer.stance)}</p>
          ${answer.paragraphs
            .map(
              (paragraph, index) => `
                <article class="peel-card">
                  <h3>PEEL ${index + 1}</h3>
                  <p><strong>Point 论点：</strong>${escapeHtml(paragraph.point)}</p>
                  <p><strong>Evidence 论据：</strong>${escapeHtml(paragraph.evidence)}</p>
                  <p><strong>Explanation 说明：</strong>${escapeHtml(paragraph.explanation)}</p>
                  <p><strong>Link 点题：</strong>${escapeHtml(paragraph.link)}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </details>
    </section>
  `;
}

function renderOralRecorderControls() {
  const isRecording = oralRecordingStatus === "recording";
  return `
    <div class="recorder-row">
      <span class="status-pill ${isRecording ? "warn" : ""}">${isRecording ? `Recording ${formatTimer(oralRecordingSeconds)}` : "Recorder ready"}</span>
      <button class="secondary-button" type="button" data-recorder="start" ${isRecording ? "disabled" : ""}>Record</button>
      <button class="secondary-button" type="button" data-recorder="stop" ${isRecording ? "" : "disabled"}>Stop</button>
      ${oralRecordingUrl ? `<button class="secondary-button" type="button" data-recorder="clear">Clear</button>` : ""}
    </div>
    ${
      oralRecordingUrl
        ? `<audio class="recording-player" controls src="${escapeHtml(oralRecordingUrl)}"></audio>`
        : ""
    }
  `;
}

function renderOral() {
  const article = currentArticle();
  const prompt = oralAgreementPrompt(article.oral?.prompt);
  return `
    <section class="card">
      <span class="chip coral">${escapeHtml(article.topicLabel)} · 口头报告 · 2 min</span>
      <h2>${escapeHtml(prompt)}</h2>
      <div class="timer-row">
        <span class="timer">${formatTimer(state.timerLeft)}</span>
        <button class="primary-button" type="button" data-timer="start">开始</button>
        <button class="secondary-button" type="button" data-timer="reset">重置</button>
      </div>
      ${renderOralRecorderControls()}
    </section>

    ${renderPeelAnswer(article)}

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

function renderProfileForm({ modal = false } = {}) {
  const profile = state.profile || emptyProfile();
  const displayName = profileFormValue(profile, "displayName", modal);
  const email = profileFormValue(profile, "email", modal);
  const buttonLabel = hasProfile() ? "Save account / 保存账户" : "Create free account / 创建免费账户";

  return `
    <form class="profile-form" data-profile-form autocomplete="on" novalidate>
      <div class="signup-steps">
        <p><strong>1.</strong> Enter name and email / 输入名字和邮箱</p>
        <p><strong>2.</strong> Save words to your word bank / 把词句存进词句本</p>
        <p><strong>3.</strong> Get weekly vocab email if selected / 选择后每周接收词汇复习</p>
      </div>
      <label class="profile-field">
        <span>Name / 名字</span>
        <input class="profile-input" type="text" name="name" data-profile-name autocomplete="name" maxlength="80" placeholder="Optional / 可选" value="${escapeHtml(displayName)}" />
      </label>
      <label class="profile-field">
        <span>Email address / 电子邮件</span>
        <input class="profile-input" type="email" name="email" data-profile-email autocomplete="email" inputmode="email" maxlength="254" placeholder="you@example.com" value="${escapeHtml(email)}" />
      </label>
      <label class="checkbox-row">
        <input type="checkbox" data-profile-updates ${profile.wantsUpdates ? "checked" : ""} />
        <span>Email me the vocabulary I learned each week. / 每周把我学过的词汇电邮给我。</span>
      </label>
      <p class="privacy-note">By default, the word bank stays in this browser. / 默认词句本保存在本机浏览器。</p>
      <p class="privacy-note">
        Central email list: <span class="status-pill ${profileLeadSyncClass()}">${escapeHtml(profileLeadSyncLabel())}</span>
      </p>
      <div class="action-row">
        <button class="primary-button" type="submit" data-create-profile>${buttonLabel}</button>
        ${modal ? `<button class="secondary-button" type="button" data-close-signup>稍后 Later</button>` : ""}
      </div>
    </form>
  `;
}

function renderSignupModal() {
  if (!signupPromptOpen) return "";
  return `
    <div class="modal-backdrop" data-signup-modal>
      <section class="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signupTitle">
        <span class="chip warm">Word bank profile</span>
        <h2 id="signupTitle">Create a profile to save this word / 创建档案保存词句</h2>
        <p class="small">Your word bank can be saved here, and you can choose to receive a weekly email of vocabulary you learned. / 词句本会保存在这里，也可以选择每周电邮复习词汇。</p>
        ${renderProfileForm({ modal: true })}
      </section>
    </div>
  `;
}

function renderRefreshCadenceControls() {
  const cadence = parseRefreshCadence(state.profile?.refreshCadence);
  return `
    <div class="toolbar compact-toolbar" aria-label="Article refresh cadence">
      <button class="toggle-button ${cadence === "daily" ? "active" : ""}" type="button" data-refresh-cadence="daily">
        Daily
      </button>
      <button class="toggle-button ${cadence === "weekly" ? "active" : ""}" type="button" data-refresh-cadence="weekly">
        Weekly
      </button>
    </div>
  `;
}

function renderLeadDirectory() {
  const leads = ownerToolsEnabled() ? ownerKnownLeadRecords() : localLeadRecords();
  if (!leads.length) {
    return `
      <div class="owner-empty-state">
        <strong>No emails loaded yet.</strong>
        <p class="small">Owner mode can only read profiles saved in this browser until a central signup collector is connected and loaded.</p>
        <p class="small">目前 owner mode 只能看到本机缓存；接上中央收集器并输入 owner token 后，才会载入所有访客的总名单。</p>
      </div>
    `;
  }

  return `
    <div class="lead-list">
      ${leads
        .map(
          (lead) => `
            <div class="lead-item">
              <strong>${escapeHtml(lead.displayName || lead.email.split("@")[0])}</strong>
              <span>${escapeHtml(lead.email)}</span>
              <span class="small">
                订阅更新：${lead.wantsUpdates ? "是" : "否"} ｜ 更新频率：${lead.refreshCadence} ｜ 来源：${escapeHtml(
            lead.source,
          )} ｜ ${formatLeadTime(lead.createdAt)}
              </span>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderOwnerLeadBackendPanel() {
  const connected = ownerCentralCollectionEnabled();
  const hasToken = Boolean(ownerLeadToken());
  return `
    <div class="owner-backend-note ${connected ? "connected" : "needed"}">
      <div class="owner-backend-heading">
        <strong>${connected ? "All-device signup collection is connected." : "All-device signup collection is not connected yet."}</strong>
        <span class="status-pill ${connected && hasToken ? "" : "warn"}">${escapeHtml(centralLeadStatusLabel())}</span>
      </div>
      <p class="small">
        ${
          connected
            ? "New profile signups will also be posted to the configured external collector. Use the owner token below to load the private master list into this page."
            : "This app is hosted as a static GitHub Pages site, so it cannot see emails saved on other people's devices by itself. To collect every live-link signup, connect an outside collector, then deploy its URL in profile-lead-config.js."
        }
      </p>
      <p class="small">Collector: <code>${escapeHtml(ownerLeadEndpointLabel())}</code></p>
      ${
        connected
          ? `
            <form class="owner-token-form" data-owner-token-form>
              <label>
                <span>Owner admin token</span>
                <input type="password" inputmode="text" autocomplete="off" data-owner-lead-token placeholder="${hasToken ? "Token saved - leave blank to reuse" : "Paste private token"}" />
              </label>
              <div class="action-row">
                <button class="secondary-button compact" type="submit">Load central list</button>
                <button class="secondary-button compact" type="button" data-clear-owner-token ${hasToken ? "" : "disabled"}>Clear token</button>
                <button class="secondary-button compact" type="button" data-refresh-owner-app>Refresh app files</button>
              </div>
            </form>
            ${
              centralLeadState.error
                ? `<p class="small error-text">${escapeHtml(centralLeadState.error)}${
                    centralLeadState.error.includes("OWNER_TOKEN is not set")
                      ? " — this usually means this tab is using an old Apps Script deployment. Click Refresh app files, then paste the new owner token again."
                      : ""
                  }</p>`
                : centralLeadState.checkedAt
                  ? `<p class="small">Last central check: ${formatLeadTime(centralLeadState.checkedAt)}</p>`
                  : ""
            }
          `
          : `
            <div class="owner-backend-steps">
              <p><strong>To see all accounts:</strong> set up the Google Apps Script backend in <code>email-signup-backend/google-apps-script.js</code>.</p>
              <p><strong>Then:</strong> paste the deployed script URL into <code>profile-lead-config.js</code> and push the app again.</p>
              <p><strong>To send weekly emails:</strong> use the central list here, or add a Gmail/Apps Script weekly trigger at ${WEEKLY_MAILER_SEND_LABEL}.</p>
              <p><strong>Privacy note:</strong> the owner link is a convenience switch, not real login security. The private master list needs an owner token.</p>
            </div>
          `
      }
    </div>
  `;
}

function renderEmailSignupPanel() {
  const leads = ownerKnownLeadRecords();
  const localLeads = localLeadRecords();
  const centralLeads = centralLeadState.leads || [];
  const subscribed = leadEmailList({ subscribedOnly: true });
  const draftUrl = weeklyEmailDraftUrl();
  const connected = ownerCentralCollectionEnabled();

  return `
    <section class="panel email-signup-panel">
      <div class="panel-heading-row">
        <h2>电邮名单</h2>
        <span class="status-pill ${connected ? "" : "warn"}">${connected ? "Owner only · collector on" : "Owner only · local cache"}</span>
      </div>
      <div class="stats-grid mini">
        <div class="stat"><strong>${leads.length}</strong><span>emails available here</span></div>
        <div class="stat"><strong>${centralLeads.length}</strong><span>central loaded</span></div>
        <div class="stat"><strong>${localLeads.length}</strong><span>local cache</span></div>
        <div class="stat"><strong>${subscribed.length}</strong><span>weekly opt-ins</span></div>
      </div>
      <p class="small">This panel shows the local cache saved on this browser. It cannot show every public signup until a central collector is connected and deployed.</p>
      <p class="small">这里显示的是本机缓存。若要看到网站上所有人的注册邮箱，需要先接上一个中央表单或数据库。</p>
      ${renderOwnerLeadBackendPanel()}
      <div class="action-row">
        <button class="secondary-button compact" type="button" data-export-leads>导出CSV</button>
        <button class="secondary-button compact" type="button" data-copy-lead-emails>复制邮箱</button>
        <button class="secondary-button compact" type="button" data-hide-owner-tools>隐藏名单</button>
        ${
          draftUrl
            ? `
              <button class="secondary-button compact" type="button" data-open-weekly-draft>打开测试邮件草稿</button>
              <button class="secondary-button compact" type="button" data-copy-weekly-draft>复制测试邮件内容</button>
            `
            : `<button class="secondary-button compact" type="button" disabled>暂无测试邮件</button>`
        }
      </div>
      ${
        draftUrl
          ? `
            <details class="email-draft-preview">
              <summary>查看测试邮件内容</summary>
              <textarea class="notes-input email-draft-textarea" readonly>${escapeHtml(weeklyEmailClipboardText())}</textarea>
            </details>
          `
          : ""
      }
      ${renderLeadDirectory()}
    </section>
  `;
}

function renderTopicInventory() {
  return topics
    .filter((topic) => topic.id !== "all")
    .map((topic) => {
      const count = articles.filter((article) => article.topicId === topic.id).length;
      return `<span class="chip soft">${escapeHtml(topic.label)} ${count}</span>`;
    })
    .join("");
}

function renderProfile() {
  const pipeline = state.pipeline;
  const visitStats = getAnonymousVisitStats();
  return `
    <section class="stats-grid">
      <div class="stat"><strong>${currentStreak()}</strong><span>day streak</span></div>
      <div class="stat"><strong>${state.completedDates.length}</strong><span>lessons done</span></div>
      <div class="stat"><strong>${savedItems().length}</strong><span>saved words</span></div>
      <div class="stat"><strong>${visitStats.total}</strong><span>anonymous visits (local)</span></div>
    </section>

    <section class="panel">
      <h2>免费账户</h2>
      ${
        hasProfile()
          ? `
            <div class="profile-summary">
              <div class="metric-row">
                <span class="chip warm">${escapeHtml(profileDisplayName())}</span>
                <span class="chip soft">${escapeHtml(state.profile.email)}</span>
              </div>
              ${renderProfileForm()}
              <button class="danger-button" type="button" data-delete-profile>删除本机账户资料</button>
            </div>
          `
          : renderProfileForm()
      }
    </section>

    ${ownerToolsEnabled() ? renderEmailSignupPanel() : ""}

    <section class="panel">
      <h2>新闻更新节奏</h2>
      ${renderRefreshCadenceControls()}
      <p class="small">应用会在每天第一次打开时扫描批准新闻源，选出一个近期标题，生成当天的原创中文练习稿。若RSS暂时不可用，就使用内置近期新闻链接作为备用。</p>
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
      <div class="chip-row inventory-row">
        ${renderTopicInventory()}
      </div>
    </section>

    <section class="panel">
      <h2>内容管线</h2>
      <div class="metric-row">
        <span class="status-pill ${pipeline.status === "live" ? "" : "warn"}">${escapeHtml(pipeline.message)}</span>
        ${
          pipeline.dailyDate
            ? `<span class="chip soft">${escapeHtml(pipeline.dailyDate)}</span>`
            : ""
        }
      </div>
      ${
        pipeline.dailySourceTitle
          ? `<p class="small">今日新增：${escapeHtml(pipeline.dailySourceTitle)}</p>`
          : `<p class="small">每日扫描会在应用打开时运行，并把当天选中的新闻标题固定为今日练习。</p>`
      }
      <div class="grid">
        ${allowedSources
          .map(
            (source) => `
              <article class="review-card">
                <strong>${escapeHtml(source.name)}</strong>
                <a href="${sanitizeSafeUrl(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.url)}</a>
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
  const safeId = sanitizeActionId(id);
  if (!safeId) return;
  const item = itemByIdOrSaved(safeId);
  if (!item) return;

  if (!hasProfile() && !state.saved[safeId]) {
    openSignupPrompt(false, safeId);
    return;
  }

  if (state.saved[safeId]) {
    delete state.saved[safeId];
    delete state.reviews[safeId];
    showToast("已从词句本移除");
  } else {
    state.saved[safeId] = { item, savedAt: Date.now() };
    reviewFor(safeId);
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

function stopOralRecordingTimer() {
  window.clearInterval(oralRecordingTimerId);
  oralRecordingTimerId = null;
}

function stopOralRecordingStream() {
  if (!oralRecordingStream) return;
  oralRecordingStream.getTracks().forEach((track) => track.stop());
  oralRecordingStream = null;
}

async function startOralRecording() {
  if (oralRecordingStatus === "recording") return;
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
    showToast("This browser cannot record audio.");
    return;
  }

  try {
    if (oralRecordingUrl) {
      URL.revokeObjectURL(oralRecordingUrl);
      oralRecordingUrl = "";
    }

    oralRecordingStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    oralRecordingChunks = [];
    oralRecorder = new MediaRecorder(oralRecordingStream);
    oralRecordingStatus = "recording";
    oralRecordingSeconds = 0;

    oralRecorder.addEventListener("dataavailable", (event) => {
      if (event.data?.size) oralRecordingChunks.push(event.data);
    });

    oralRecorder.addEventListener("stop", () => {
      stopOralRecordingTimer();
      stopOralRecordingStream();
      oralRecordingStatus = "idle";
      if (oralRecordingChunks.length) {
        const blob = new Blob(oralRecordingChunks, { type: oralRecorder.mimeType || "audio/webm" });
        oralRecordingUrl = URL.createObjectURL(blob);
      }
      oralRecorder = null;
      if (state.tab === "oral") render();
      showToast("Recording ready for playback");
    });

    oralRecorder.start();
    oralRecordingTimerId = window.setInterval(() => {
      oralRecordingSeconds += 1;
      if (state.tab === "oral") render();
    }, 1000);
    render();
  } catch {
    oralRecordingStatus = "idle";
    stopOralRecordingTimer();
    stopOralRecordingStream();
    oralRecorder = null;
    showToast("Microphone permission was not granted.");
  }
}

function stopOralRecording() {
  if (oralRecorder && oralRecordingStatus === "recording") {
    oralRecorder.stop();
  }
}

function clearOralRecording() {
  if (oralRecordingStatus === "recording") stopOralRecording();
  if (oralRecordingUrl) {
    URL.revokeObjectURL(oralRecordingUrl);
  }
  oralRecordingUrl = "";
  oralRecordingChunks = [];
  oralRecordingSeconds = 0;
  render();
}

async function checkPipelineHealth() {
  if (!shouldScanDailyNews()) return;

  try {
    const headlines = await loadRecentHeadlines();
    state.headlines = headlines;
    if (!headlines.length) throw new Error("No recent headlines available");

    const liveCount = headlines.filter((headline) => headline.section !== "Built-in practice source").length;
    const dailyHeadline = pickHeadlineForDate(headlines);
    state.dailyHeadline = dailyHeadline;
    state.pipeline = {
      status: liveCount ? "live" : "fallback",
      message: liveCount
        ? `Daily scan found ${headlines.length} recent headlines`
        : `Daily scan used ${headlines.length} built-in headline links`,
      checkedAt: Date.now(),
      dailyDate: singaporeDateKey(),
      dailySourceTitle: dailyHeadline?.sourceTitle || "",
    };
  } catch {
    state.headlines = builtInRecentHeadlines();
    const dailyHeadline = pickHeadlineForDate(state.headlines);
    state.dailyHeadline = dailyHeadline;
    state.pipeline = {
      status: "fallback",
      message: state.headlines.length
        ? `Daily scan used ${state.headlines.length} built-in headline links`
        : "Using built-in article library",
      checkedAt: Date.now(),
      dailyDate: singaporeDateKey(),
      dailySourceTitle: dailyHeadline?.sourceTitle || "",
    };
  } finally {
    persist();
    if (state.tab === "profile" || state.tab === "today") render();
  }
}

document.addEventListener("click", async (event) => {
  const target = event.target.closest("button");
  if (!target) {
    if (showTappedTermDefinition(event)) {
      event.preventDefault();
    }
    return;
  }

  if (target.dataset.cancelSelection) {
    hideSelectionToolbar();
    return;
  }

  if (target.dataset.translateSelected) {
    translatePendingSelection();
    return;
  }

  if (target.dataset.saveSelected || target.dataset.addSelected) {
    savePendingSelectionToWordBank();
    return;
  }

  if (target.hasAttribute("data-close-signup")) {
    if (isProfileRequiredForReading() && !hasProfile()) return;
    closeSignupPrompt();
    return;
  }

  if (target.hasAttribute("data-create-profile")) {
    event.preventDefault();
    saveProfileFromForm(target.closest("[data-profile-form]"));
    return;
  }

  if (target.hasAttribute("data-export-leads")) {
    exportLeadCsv();
    return;
  }

  if (target.hasAttribute("data-copy-lead-emails")) {
    await copyLeadEmails();
    return;
  }

  if (target.hasAttribute("data-copy-weekly-draft")) {
    await copyWeeklyEmailDraft();
    return;
  }

  if (target.hasAttribute("data-open-weekly-draft")) {
    await openWeeklyEmailDraft();
    return;
  }

  if (target.hasAttribute("data-hide-owner-tools")) {
    hideOwnerTools();
    return;
  }

  if (target.hasAttribute("data-clear-owner-token")) {
    setOwnerLeadToken("");
    centralLeadState = {
      status: "idle",
      leads: [],
      error: "",
      checkedAt: null,
    };
    render();
    showToast("owner token 已清除");
    return;
  }

  if (target.hasAttribute("data-refresh-owner-app")) {
    await refreshOwnerAppFiles();
    return;
  }

  if (target.hasAttribute("data-delete-profile")) {
    deleteProfile();
    return;
  }

  if (target.dataset.refreshCadence) {
    setRefreshCadence(target.dataset.refreshCadence);
    return;
  }

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
    const toggleKey = target.dataset.toggle;
    state[toggleKey] = !state[toggleKey];
    persist();
    render();
    if (toggleKey === "pinyin" && state.pinyin) {
      showToast(pinyinEngine ? "完整拼音已开启" : "正在加载完整拼音");
      ensurePinyinEngine();
    }
    return;
  }

  if (target.dataset.save) {
    const id = sanitizeActionId(target.dataset.save);
    if (id) toggleSave(id);
    return;
  }

  if (target.hasAttribute("data-complete")) {
    completeToday();
    render();
    showToast("今日练习已完成");
    return;
  }

  if (target.dataset.grade) {
    const id = sanitizeActionId(target.dataset.grade);
    if (id) gradeReview(id, target.dataset.result);
    return;
  }

  if (target.dataset.remove) {
    const id = sanitizeActionId(target.dataset.remove);
    if (!id) return;
    delete state.saved[id];
    delete state.reviews[id];
    persist();
    render();
    showToast("已移除");
    return;
  }

  if (target.dataset.master) {
    const id = sanitizeActionId(target.dataset.master);
    if (!id) return;
    const review = reviewFor(id);
    review.mastered = !review.mastered;
    persist();
    render();
    return;
  }

  if (target.dataset.reveal) {
    const id = sanitizeActionId(target.dataset.reveal);
    const item = id ? itemByIdOrSaved(id) : null;
    showToast(item ? item.term : "答案未找到");
    return;
  }

  if (target.dataset.checkDictation) {
    const id = sanitizeActionId(target.dataset.checkDictation);
    if (!id) return;
    const input = document.querySelector(`[data-dictation-input="${id}"]`);
    const item = itemByIdOrSaved(id);
    const correct = item && input?.value.trim() === item.term;
    showToast(correct ? "正确" : `再想想：${item?.term || ""}`);
    return;
  }

  if (target.dataset.sample) {
    const sample = document.getElementById(`sample-${String(target.dataset.sample || "").replace(/\D/g, "")}`);
    if (sample) sample.hidden = !sample.hidden;
    return;
  }

  if (target.dataset.recorder === "start") {
    await startOralRecording();
    return;
  }

  if (target.dataset.recorder === "stop") {
    stopOralRecording();
    return;
  }

  if (target.dataset.recorder === "clear") {
    clearOralRecording();
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

document.addEventListener("submit", (event) => {
  const tokenForm = event.target.closest("[data-owner-token-form]");
  if (tokenForm) {
    event.preventDefault();
    const token = tokenForm.querySelector("[data-owner-lead-token]")?.value || "";
    loadCentralLeadRecords({ token });
    return;
  }

  const form = event.target.closest("[data-profile-form]");
  if (!form) return;

  event.preventDefault();
  saveProfileFromForm(form);
});

document.addEventListener("selectionchange", () => {
  evaluateSelectionForManual();
});
document.addEventListener("mouseup", (event) => {
  if (event.target.closest("[data-profile-form]")) return;
  window.setTimeout(() => evaluateSelectionForManual(), 10);
});
document.addEventListener("touchend", (event) => {
  if (event.target.closest("[data-profile-form]")) return;
  window.setTimeout(() => evaluateSelectionForManual(), 10);
});
window.addEventListener("scroll", hideSelectionToolbar, true);

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-profile-name], [data-profile-email]")) {
    syncProfileDraftFromForm(event.target.closest("[data-profile-form]"));
    return;
  }

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

activateOwnerToolsFromUrl();
trackAnonymousVisit();
render();
if (state.pinyin) ensurePinyinEngine();
checkPipelineHealth();
