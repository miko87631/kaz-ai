import { Course, Language } from '../types';

const coursesData: Record<string, Omit<Course, 'title' | 'description' | 'fullDescription' | 'lessons'> & {
    lessons: { id: string, title: Record<Language, string> }[],
    title: Record<Language, string>,
    description: Record<Language, string>,
    fullDescription: Record<Language, string>
}> = {
    'ai-fundamentals': {
        id: 'ai-fundamentals',
        title: {
            ru: 'Основы ИИ',
            en: 'AI Fundamentals',
            kk: 'AI негіздері'
        },
        description: {
            ru: 'Изучите основы искусственного интеллекта и его применения.',
            en: 'Understand the basics of Artificial Intelligence and its applications.',
            kk: 'Жасанды интеллект негіздерін және оның қолданылуын түсініңіз.'
        },
        fullDescription: {
            ru: 'Этот курс представляет собой всеобъемлющее введение в область искусственного интеллекта. Вы узнаете об истории ИИ, ключевых концепциях, таких как машинное обучение, нейронные сети и обработка естественного языка. Опыт не требуется.',
            en: 'This course provides a comprehensive introduction to the field of Artificial Intelligence. You will learn about the history of AI, key concepts like machine learning, neural networks, and natural language processing. No prior experience required.',
            kk: 'Бұл курс жасанды интеллект саласына толық кіріспе болып табылады. Сіз AI тарихы, машиналық оқыту, нейрондық желілер және табиғи тілді өңдеу сияқты негізгі ұғымдар туралы білесіз. Алдын ала тәжірибе қажет емес.'
        },
        lessons: [
            { id: 'ai-l1', title: { ru: 'Введение в ИИ', en: 'Introduction to AI', kk: 'AI-ға кіріспе' } },
            { id: 'ai-l2', title: { ru: 'Что такое машинное обучение?', en: 'What is Machine Learning?', kk: 'Машиналық оқыту дегеніміз не?' } },
            { id: 'ai-l3', title: { ru: 'Объяснение нейронных сетей', en: 'Neural Networks Explained', kk: 'Нейрондық желілерді түсіндіру' } },
            { id: 'ai-l4', title: { ru: 'Будущее ИИ', en: 'The Future of AI', kk: 'AI болашағы' } },
        ],
    },
    'startup-101': {
        id: 'startup-101',
        title: {
            ru: 'Стартап 101: От идеи до запуска',
            en: 'Startup 101: From Idea to Launch',
            kk: 'Стартап 101: Идеядан іске қосуға дейін'
        },
        description: {
            ru: 'Изучите основные шаги для превращения вашей инновационной идеи в успешный стартап.',
            en: 'Learn the essential steps to turn your innovative idea into a successful startup.',
            kk: 'Инновациялық идеяңызды сәтті стартапқа айналдырудың негізгі қадамдарын үйреніңіз.'
        },
        fullDescription: {
            ru: 'Этот курс охватывает весь жизненный цикл стартапа, от проверки идеи и составления бизнес-плана до привлечения финансирования и запуска продукта. Вы будете учиться на примерах успешных компаний.',
            en: 'This course covers the entire startup lifecycle, from validating your idea and building a business plan to securing funding and launching your product. You will learn from case studies of successful companies.',
            kk: 'Бұл курс стартаптың бүкіл өмірлік циклін қамтиды: идеяны тексеруден және бизнес-жоспар құрудан бастап, қаржыландыруды тартуға және өнімді іске қосуға дейін. Сіз сәтті компаниялардың мысалдарынан үйренесіз.'
        },
        lessons: [
            { id: 'su-l1', title: { ru: 'Проверка вашей идеи', en: 'Validating Your Idea', kk: 'Идеяңызды тексеру' } },
            { id: 'su-l2', title: { ru: 'Составление бизнес-плана', en: 'Crafting a Business Plan', kk: 'Бизнес-жоспар құру' } },
            { id: 'su-l3', title: { ru: 'Создание MVP', en: 'Building an MVP', kk: 'MVP құру' } },
            { id: 'su-l4', title: { ru: 'Маркетинг и продажи', en: 'Marketing and Sales', kk: 'Маркетинг және сату' } },
            { id: 'su-l5', title: { ru: 'Питчинг инвесторам', en: 'Pitching to Investors', kk: 'Инвесторларға питчинг' } },
        ],
    },
    'advanced-gemini': {
        id: 'advanced-gemini',
        title: {
            ru: 'Продвинутый Gemini API',
            en: 'Advanced Gemini API',
            kk: 'Жетілдірілген Gemini API'
        },
        description: {
            ru: 'Освойте расширенные функции Gemini API для сложных приложений.',
            en: 'Master the advanced features of the Gemini API for complex applications.',
            kk: 'Күрделі қосымшалар үшін Gemini API-дің жетілдірілген мүмкіндіктерін меңгеріңіз.'
        },
        fullDescription: {
            ru: 'Погрузитесь в Gemini API. Этот курс рассматривает такие продвинутые темы, как вызов функций, мультимодальные вводы, потоковые ответы и тонкая настройка моделей для конкретных задач. Рекомендуется базовое понимание API ИИ.',
            en: 'Dive deep into the Gemini API. This course explores advanced topics like function calling, multimodal inputs, streaming responses, and fine-tuning models for specific tasks. A basic understanding of AI APIs is recommended.',
            kk: 'Gemini API-ге терең үңіліңіз. Бұл курс функцияларды шақыру, мультимодальды енгізулер, ағынды жауаптар және нақты тапсырмалар үшін модельдерді дәл баптау сияқты жетілдірілген тақырыптарды зерттейді. AI API-лерін негізгі деңгейде түсіну ұсынылады.'
        },
        lessons: [
            { id: 'ag-l1', title: { ru: 'Мультимодальные вводы (текст и изображение)', en: 'Multimodal Inputs (Text & Image)', kk: 'Мультимодальды енгізулер (мәтін және сурет)' } },
            { id: 'ag-l2', title: { ru: 'Вызов функций для использования инструментов', en: 'Function Calling for Tool Use', kk: 'Құралдарды пайдалану үшін функцияларды шақыру' } },
            { id: 'ag-l3', title: { ru: 'Стриминг для приложений реального времени', en: 'Streaming for Real-time Apps', kk: 'Нақты уақыттық қосымшалар үшін ағын' } },
            { id: 'ag-l4', title: { ru: 'Заземление с помощью Google Search', en: 'Grounding with Google Search', kk: 'Google Search арқылы негіздеу' } },
        ],
    },
};

export const getCourses = (lang: Language): Course[] => {
    return Object.values(coursesData).map(course => ({
        id: course.id,
        title: course.title[lang] || course.title.en,
        description: course.description[lang] || course.description.en,
        fullDescription: course.fullDescription[lang] || course.fullDescription.en,
        lessons: course.lessons.map(lesson => ({
            id: lesson.id,
            title: lesson.title[lang] || lesson.title.en
        }))
    }));
};
