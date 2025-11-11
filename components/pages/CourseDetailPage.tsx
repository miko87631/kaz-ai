
import React from 'react';
import { Course } from '../../types';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import SafeButton from '../ui/SafeButton';
import { useAppContext } from '../../contexts/AppContext';

interface CourseDetailPageProps {
    course: Course;
    onBack: () => void;
    enrolledCourses: string[];
    courseProgress: Record<string, number>;
    xp: number;
    updateEnrolledCourses: (newEnrolled: string[]) => void;
    updateCourseProgress: (newProgress: Record<string, number>) => void;
    updateXp: (newXp: number) => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ 
    course, 
    onBack,
    enrolledCourses,
    courseProgress,
    xp,
    updateEnrolledCourses,
    updateCourseProgress,
    updateXp
}) => {
    const { language, strings } = useAppContext();
    const isEnrolled = enrolledCourses.includes(course.id);
    const completedLessons = courseProgress[course.id] || 0;
    const progressPercentage = course.lessons.length > 0 ? (completedLessons / course.lessons.length) * 100 : 0;

    const handleEnrollToggle = async () => {
        if (isEnrolled) {
            const newEnrolled = enrolledCourses.filter(id => id !== course.id);
            updateEnrolledCourses(newEnrolled);
        } else {
            updateEnrolledCourses([...enrolledCourses, course.id]);
        }
    };
    
    const handleCompleteLesson = async () => {
        if (isEnrolled && completedLessons < course.lessons.length) {
            const newProgress = completedLessons + 1;
            updateCourseProgress({
                ...courseProgress,
                [course.id]: newProgress
            });
            updateXp(xp + 10);
        }
    };
    
    const nextLessonIndex = completedLessons;

    const progressText = language === 'kk' 
        ? `${course.lessons.length} ${strings.of[language]} ${completedLessons} ${strings.lessonsCompleted[language]}`
        : `${completedLessons} ${strings.of[language]} ${course.lessons.length} ${strings.lessonsCompleted[language]}`;


    return (
        <div className="p-4 space-y-6">
            <button onClick={onBack} className="flex items-center text-brand-orange font-semibold hover:underline mb-4">
                <ArrowLeft size={20} className="mr-2"/>
                {strings.backToCourses[language]}
            </button>

            <div className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-md">
                <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{course.fullDescription}</p>

                <h3 className="text-xl font-bold mb-3">{strings.lessons[language]}</h3>
                <ul className="space-y-3 mb-6">
                    {course.lessons.map((lesson, index) => (
                        <li key={lesson.id} className="flex items-center p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
                             {index < completedLessons ? (
                                <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0" />
                            ) : (
                                <Circle size={20} className="text-gray-400 mr-3 flex-shrink-0" />
                            )}
                            <span className={index < completedLessons ? 'line-through text-gray-500' : ''}>{lesson.title}</span>
                        </li>
                    ))}
                </ul>

                <h3 className="text-xl font-bold mb-2">{strings.yourProgress[language]}</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2 relative">
                    <div className="bg-brand-orange h-4 rounded-full flex items-center justify-center" style={{ width: `${progressPercentage}%` }}>
                       <span className="text-white text-xs font-bold absolute left-1/2 -translate-x-1/2">{Math.round(progressPercentage)}%</span>
                    </div>
                </div>
                <p className="text-sm text-center text-gray-500 mb-6">{progressText}</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    <SafeButton
                        onPressedAsync={handleEnrollToggle}
                        className={`w-full font-bold py-3 px-6 rounded-xl transition-colors text-center ${isEnrolled ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                    >
                        {isEnrolled ? strings.unenroll[language] : strings.enroll[language]}
                    </SafeButton>

                    <SafeButton
                        onPressedAsync={handleCompleteLesson}
                        disabled={!isEnrolled || completedLessons >= course.lessons.length}
                        className="w-full bg-brand-orange text-white font-bold py-3 px-6 rounded-xl transition hover:bg-orange-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-center"
                    >
                        {(isEnrolled && completedLessons < course.lessons.length) ? `${strings.completeLesson[language]} "${course.lessons[nextLessonIndex].title}"` : strings.courseCompleted[language]}
                    </SafeButton>
                </div>

            </div>
        </div>
    );
};

export default CourseDetailPage;