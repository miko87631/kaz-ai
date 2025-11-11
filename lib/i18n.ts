import { Language } from '../types';

const strings: Record<string, Record<Language, string>> = {
    // App.tsx / Nav
    navHome: { ru: 'Главная', en: 'Home', kk: 'Басты бет' },
    navMentor: { ru: 'AI Ментор', en: 'AI Mentor', kk: 'AI Ментор' },
    navCourses: { ru: 'Курсы', en: 'Courses', kk: 'Курстар' },
    navPlanner: { ru: 'Планер', en: 'Planner', kk: 'Жоспарлаушы' },
    navCommunity: { ru: 'Сообщество', en: 'Community', kk: 'Қоғамдастық' },

    // HomePage.tsx
    welcome: { ru: 'Добро пожаловать', en: 'Welcome', kk: 'Қош келдіңіз' },
    level: { ru: 'Уровень', en: 'Level', kk: 'Деңгей' },
    continueLearning: { ru: 'Продолжить обучение', en: 'Continue Learning', kk: 'Оқуды жалғастыру' },
    aiRecommendation: { ru: 'Рекомендация от ИИ', en: 'AI Recommendation', kk: 'AI ұсынысы' },
    askMore: { ru: 'Спросить подробнее', en: 'Ask for details', kk: 'Толығырақ сұраңыз' },
    showSources: { ru: 'Показать источники', en: 'Show sources', kk: 'Дереккөздерді көрсету' },
    yourCourses: { ru: 'Твои курсы', en: 'Your Courses', kk: 'Сіздің курстарыңыз' },
    details: { ru: 'Подробнее', en: 'Details', kk: 'Толығырақ' },
    newsAndEvents: { ru: 'Новости и События', en: 'News & Events', kk: 'Жаңалықтар мен оқиғалар' },
    quickActions: { ru: 'Быстрые действия', en: 'Quick Actions', kk: 'Жылдам әрекеттер' },
    askAI: { ru: 'Спросить ИИ', en: 'Ask AI', kk: 'AI-дан сұрау' },
    ideaGenerator: { ru: 'Генератор идей', en: 'Idea Generator', kk: 'Идея генераторы' },
    myProgress: { ru: 'Мой прогресс', en: 'My Progress', kk: 'Менің үлгерімім' },
    settings: { ru: 'Настройки', en: 'Settings', kk: 'Баптаулар' },
    quoteOfTheDay: { ru: 'Цитата дня', en: 'Quote of the Day', kk: 'Күннің дәйексөзі' },
    share: { ru: 'Поделиться', en: 'Share', kk: 'Бөлісу' },
    currentGoal: { ru: 'Текущая цель', en: 'Current Goal', kk: 'Ағымдағы мақсат' },
    updateGoal: { ru: 'Обновить цель', en: 'Update Goal', kk: 'Мақсатты жаңарту' },
    deadline: { ru: 'Дедлайн', en: 'Deadline', kk: 'Мерзімі' },
    choosePersona: { ru: 'Выберите персону ИИ', en: 'Choose AI Persona', kk: 'AI тұлғасын таңдаңыз' },
    notifications: { ru: 'Уведомления', en: 'Notifications', kk: 'Хабарландырулар' },
    save: { ru: 'Сохранить', en: 'Save', kk: 'Сақтау' },

    // AiMentorPage.tsx
    mentorGreeting: { ru: 'Привет! Чем я могу вам помочь сегодня?', en: 'Hello! How can I help you today?', kk: 'Сәлем! Бүгін сізге қалай көмектесе аламын?' },
    mentorError: { ru: 'Извините, что-то пошло не так. Пожалуйста, попробуйте еще раз.', en: 'Sorry, something went wrong. Please try again.', kk: 'Кешіріңіз, қате пайда болды. Қайталап көріңіз.' },
    aiMode: { ru: 'Режим ИИ', en: 'AI Mode', kk: 'AI режимі' },
    modeFast: { ru: 'Быстрый', en: 'Fast', kk: 'Жылдам' },
    modeThinking: { ru: 'Думающий', en: 'Thinking', kk: 'Ойланушы' },
    placeholderComplex: { ru: 'Задайте сложный вопрос...', en: 'Ask a complex question...', kk: 'Күрделі сұрақ қойыңыз...' },
    placeholderSimple: { ru: 'Введите ваше сообщение...', en: 'Type your message...', kk: 'Хабарыңызды теріңіз...' },
    thinkingMessage: { ru: 'ИИ думает...', en: 'AI is thinking...', kk: 'AI ойлануда...' },

    // StartupPlannerPage.tsx
    plannerTitle: { ru: 'Планировщик стартапов', en: 'Startup Planner', kk: 'Стартап жоспарлаушы' },
    plannerDescription: { ru: 'Опишите свою идею, и наш ИИ сгенерирует для вас бизнес-план.', en: 'Describe your idea, and our AI will generate a business plan for you.', kk: 'Идеяңызды сипаттаңыз, сонда біздің AI сізге бизнес-жоспар жасайды.' },
    plannerPlaceholder: { ru: 'например, Личный финансовый помощник на базе ИИ для фрилансеров...', en: 'e.g., An AI-powered personal finance assistant for freelancers...', kk: 'мысалы, Фрилансерлерге арналған AI негізіндегі жеке қаржы көмекшісі...' },
    generatePlan: { ru: 'Сгенерировать план', en: 'Generate Plan', kk: 'Жоспар құру' },
    generatingPlan: { ru: 'ИИ думает...', en: 'AI is thinking...', kk: 'AI ойлануда...' },
    ideaRequiredError: { ru: 'Пожалуйста, введите идею для стартапа.', en: 'Please enter a startup idea.', kk: 'Стартап идеясын енгізіңіз.' },
    planGenerationError: { ru: 'Не удалось сгенерировать план. Пожалуйста, попробуйте еще раз.', en: 'Failed to generate plan. Please try again.', kk: 'Жоспар құру сәтсіз аяқталды. Қайталап көріңіз.' },
    yourBusinessPlan: { ru: 'Ваш бизнес-план', en: 'Your Business Plan', kk: 'Сіздің бизнес-жоспарыңыз' },

    // CommunityPage.tsx
    communityTitle: { ru: 'Центр сообщества', en: 'Community Hub', kk: 'Қоғамдастық орталығы' },
    shareIdeaPlaceholder: { ru: 'Поделитесь своей следующей большой идеей...', en: 'Share your next big idea...', kk: 'Келесі үлкен идеяңызбен бөлісіңіз...' },
    publish: { ru: 'Опубликовать', en: 'Publish', kk: 'Жариялау' },
    you: { ru: 'Вы', en: 'You', kk: 'Сіз' },

    // CoursesPage.tsx & CourseDetailPage.tsx
    coursesTitle: { ru: 'Курсы', en: 'Courses', kk: 'Курстар' },
    xp: { ru: 'Опыт', en: 'XP', kk: 'Тәжірибе' },
    enrolled: { ru: 'Записан', en: 'Enrolled', kk: 'Тіркелген' },
    notEnrolled: { ru: 'Не записан', en: 'Not Enrolled', kk: 'Тіркелмеген' },
    backToCourses: { ru: 'Назад к курсам', en: 'Back to Courses', kk: 'Курстарға оралу' },
    lessons: { ru: 'Уроки', en: 'Lessons', kk: 'Сабақтар' },
    yourProgress: { ru: 'Ваш прогресс', en: 'Your Progress', kk: 'Сіздің үлгеріміңіз' },
    of: { ru: 'из', en: 'of', kk: '/' },
    lessonsCompleted: { ru: 'уроков пройдено', en: 'lessons completed', kk: 'сабақ аяқталды' },
    unenroll: { ru: 'Отписаться', en: 'Unenroll', kk: 'Жазылымнан бас тарту' },
    enroll: { ru: 'Записаться на курс', en: 'Enroll in Course', kk: 'Курсқа жазылу' },
    completeLesson: { ru: 'Завершить:', en: 'Complete:', kk: 'Аяқтау:' },
    courseCompleted: { ru: 'Курс пройден!', en: 'Course Completed!', kk: 'Курс аяқталды!' },
};

export default strings;
