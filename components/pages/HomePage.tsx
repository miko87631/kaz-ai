

import React, { useState, useEffect } from 'react';
import { Page, Course, NewsItem, Goal, Persona } from '../../types';
import SafeButton from '../ui/SafeButton';
// FIX: Import missing Award and Newspaper icons.
import { 
    User, GraduationCap, ChevronRight, Lightbulb, Bot, MessageSquare, 
    BarChart, Settings, Share2, Edit, Bell, CheckCircle, Clock, Loader, Award, Newspaper
} from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { getCourses } from '../../data/i18n-courses';

// --- MOCK DATA ---
const mockUser = { username: 'Alex', level: 5, xp: 450, totalXpForLevel: 1000 };

const mockNews: NewsItem[] = [
    { id: 1, icon: Award, text: 'New funding opportunities for AI startups announced.'},
    { id: 2, icon: Newspaper, text: 'Our community reached 10,000 members!'},
    { id: 3, icon: Lightbulb, text: 'Weekly idea challenge: AI for sustainability.'},
];

const mockQuote = {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay"
};

const mockNotifications = [
    { id: 1, text: 'Your startup plan for "AI Cafe" is ready!' },
    { id: 2, text: 'Alina commented on your idea.' },
    { id: 3, text: 'New lesson available in "AI Fundamentals".' }
];

// --- SUB-COMPONENTS ---
const Card: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => (
    <div className={`bg-light-card dark:bg-dark-card p-4 sm:p-5 rounded-2xl shadow-md ${className}`}>
        {children}
    </div>
);

const CardTitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <h2 className="text-xl font-bold mb-4">{children}</h2>
);

// --- MAIN COMPONENT ---
const HomePage: React.FC<{ setActivePage: (page: Page) => void }> = ({ setActivePage }) => {
    const { language, strings } = useAppContext();
    const [user] = useState(mockUser);
    const [courses, setCourses] = useState<Course[]>([]);
    const [goal, setGoal] = useState<Goal>({ text: 'Complete 2 lessons in AI Fundamentals', deadline: 'End of Week' });
    const [selectedPersona, setSelectedPersona] = useState<Persona>('Mentor');
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3);
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [editableGoal, setEditableGoal] = useState(goal.text);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const localizedCourses = getCourses(language);
        
        // Load course progress from localStorage to sync with CoursesPage
        try {
            const storedProgress = localStorage.getItem('course_progress');
            if (storedProgress) {
                const progress = JSON.parse(storedProgress);
                const coursesWithProgress = localizedCourses.map(c => ({
                    ...c,
                    progress: progress[c.id] || 0
                }));
                setCourses(coursesWithProgress);
            } else {
                setCourses(localizedCourses);
            }
        } catch (error) {
            console.error("Failed to parse course progress from localStorage", error);
            setCourses(localizedCourses);
        }

        // Animate fade-in
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, [language]);

    const handleAction = async (action: () => void) => {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 1000));
        action();
    };

    const QuickActionButton: React.FC<{icon: React.ElementType, labelKey: keyof typeof strings, page: Page}> = ({icon: Icon, labelKey, page}) => (
        <button onClick={() => setActivePage(page)} className="flex flex-col items-center justify-center space-y-2 p-3 bg-gray-200 dark:bg-gray-800 rounded-xl hover:bg-brand-orange hover:text-white transition-all duration-300 transform hover:-translate-y-1">
            <Icon size={24} />
            <span className="text-xs font-semibold text-center">{strings[labelKey][language]}</span>
        </button>
    );

    if (!isLoaded) {
        return <div className="flex items-center justify-center h-full"><Loader className="animate-spin text-brand-orange" size={48} /></div>
    }

    return (
        <div className={`space-y-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* --- Modals --- */}
            {showNotifications && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center" onClick={() => setShowNotifications(false)}>
                    <div className="bg-light-card dark:bg-dark-card rounded-2xl shadow-xl p-6 w-full max-w-sm m-4" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-4">{strings.notifications[language]}</h3>
                        <ul className="space-y-3">
                            {mockNotifications.map(n => <li key={n.id} className="border-b border-gray-200 dark:border-gray-700 pb-2 text-sm">{n.text}</li>)}
                        </ul>
                    </div>
                </div>
            )}
            {showGoalModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center" onClick={() => setShowGoalModal(false)}>
                    <div className="bg-light-card dark:bg-dark-card rounded-2xl shadow-xl p-6 w-full max-w-sm m-4" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-4">{strings.updateGoal[language]}</h3>
                        <textarea value={editableGoal} onChange={e => setEditableGoal(e.target.value)} className="w-full h-24 p-2 bg-gray-200 dark:bg-gray-800 rounded-lg"/>
                        <SafeButton onPressedAsync={async () => {
                            await new Promise(r => setTimeout(r, 500));
                            setGoal(g => ({...g, text: editableGoal}));
                            setShowGoalModal(false);
                        }} className="w-full mt-4 bg-brand-orange text-white font-bold py-2 rounded-lg">{strings.save[language]}</SafeButton>
                    </div>
                </div>
            )}
            
            {/* --- Dashboard Widgets --- */}
            <div className="flex justify-between items-center">
                <div />
                <button onClick={() => { setShowNotifications(true); setNotificationCount(0); }} className="relative p-2">
                    <Bell size={24} />
                    {notificationCount > 0 && <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">{notificationCount}</span>}
                </button>
            </div>

            <Card>
                <div className="flex items-center space-x-4">
                    <img src={`https://i.pravatar.cc/150?u=${user.username}`} alt="avatar" className="w-16 h-16 rounded-full" />
                    <div>
                        <h1 className="text-2xl font-bold">{strings.welcome[language]}, {user.username}!</h1>
                        <p className="text-gray-500 dark:text-gray-400">{strings.level[language]} {user.level} - {user.xp} XP</p>
                    </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-4">
                    <div className="bg-brand-orange h-2.5 rounded-full" style={{ width: `${(user.xp / user.totalXpForLevel) * 100}%` }}></div>
                </div>
                <SafeButton onPressedAsync={async () => handleAction(() => setActivePage('courses'))} className="w-full mt-4 bg-brand-orange/20 text-brand-orange font-bold py-3 rounded-xl hover:bg-brand-orange/30 transition">
                    {strings.continueLearning[language]}
                </SafeButton>
            </Card>

            <Card>
                <CardTitle>{strings.aiRecommendation[language]}</CardTitle>
                <p className="text-gray-600 dark:text-gray-400 mb-4">"Consider exploring how large language models can be fine-tuned for specific industries. This is a rapidly growing area with high demand."</p>
                <div className="flex space-x-2 text-xs">
                    <button onClick={() => setActivePage('mentor')} className="flex-1 bg-gray-200 dark:bg-gray-700 py-2 px-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">{strings.askMore[language]}</button>
                    <button onClick={() => alert('Sources: AI Trend Report 2024')} className="flex-1 bg-gray-200 dark:bg-gray-700 py-2 px-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">{strings.showSources[language]}</button>
                </div>
            </Card>

            <div>
                <CardTitle>{strings.yourCourses[language]}</CardTitle>
                <div className="flex space-x-4 overflow-x-auto -m-4 p-4 scrollbar-hide">
                    {courses.map(course => (
                        <div key={course.id} className="flex-shrink-0 w-64 bg-light-card dark:bg-dark-card p-4 rounded-2xl shadow-md">
                            <h3 className="font-bold">{course.title}</h3>
                            <p className="text-xs text-brand-orange font-semibold mb-2">{course.level}</p>
                             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 my-2">
                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${((course.progress || 0) / course.lessons.length) * 100}%` }}></div>
                            </div>
                            <button onClick={() => setActivePage('courses')} className="w-full mt-2 text-sm text-center font-bold text-brand-orange">{strings.details[language]}</button>
                        </div>
                    ))}
                </div>
            </div>

            <Card>
                <CardTitle>{strings.quickActions[language]}</CardTitle>
                <div className="grid grid-cols-3 gap-3">
                    <QuickActionButton icon={Bot} labelKey="askAI" page="mentor" />
                    <QuickActionButton icon={GraduationCap} labelKey="navCourses" page="courses" />
                    <QuickActionButton icon={Lightbulb} labelKey="ideaGenerator" page="planner" />
                    <QuickActionButton icon={MessageSquare} labelKey="navCommunity" page="community" />
                    <QuickActionButton icon={BarChart} labelKey="myProgress" page="courses" />
                    <QuickActionButton icon={Settings} labelKey="settings" page="home" />
                </div>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-6">
                 <Card>
                    <CardTitle>{strings.newsAndEvents[language]}</CardTitle>
                    <ul className="space-y-3">
                        {mockNews.map(item => (
                            <li key={item.id} className="flex items-center space-x-3 text-sm">
                                <item.icon className="text-brand-orange" size={20} />
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card>
                    <CardTitle>{strings.currentGoal[language]}</CardTitle>
                    <div className="flex items-center space-x-3 p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
                        <CheckCircle className="text-green-500" size={24}/>
                        <div>
                            <p className="font-semibold">{goal.text}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center"><Clock size={12} className="mr-1"/> {strings.deadline[language]}: {goal.deadline}</p>
                        </div>
                    </div>
                     <button onClick={() => { setEditableGoal(goal.text); setShowGoalModal(true);}} className="w-full mt-3 flex items-center justify-center text-sm font-semibold text-brand-orange"><Edit size={14} className="mr-2"/>{strings.updateGoal[language]}</button>
                </Card>
            </div>
            
            <Card>
                <CardTitle>{strings.quoteOfTheDay[language]}</CardTitle>
                <blockquote className="text-center italic">
                    <p>"{mockQuote.text}"</p>
                    <cite className="block text-right not-italic mt-2 text-gray-500">- {mockQuote.author}</cite>
                </blockquote>
                <button onClick={() => alert('Share functionality not implemented.')} className="w-full mt-4 flex items-center justify-center text-sm font-semibold text-brand-orange"><Share2 size={14} className="mr-2"/>{strings.share[language]}</button>
            </Card>

            <div>
                <CardTitle>{strings.choosePersona[language]}</CardTitle>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(['Scientist', 'Mentor', 'Motivator', 'Jester'] as Persona[]).map(p => (
                        <button key={p} onClick={() => setSelectedPersona(p)} className={`p-3 rounded-xl text-center transition ${selectedPersona === p ? 'bg-brand-orange text-white shadow-lg' : 'bg-light-card dark:bg-dark-card'}`}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default HomePage;