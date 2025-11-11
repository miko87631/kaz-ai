
import React, { useState, useEffect, useCallback } from 'react';
import { getCourses } from '../../data/i18n-courses';
import { Course } from '../../types';
import CourseDetailPage from './CourseDetailPage';
import { useAppContext } from '../../contexts/AppContext';

interface CourseCardProps {
    course: Course;
    onSelect: (course: Course) => void;
    progress: number;
    isEnrolled: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect, progress, isEnrolled }) => {
    const { language, strings } = useAppContext();
    const progressPercentage = isEnrolled && course.lessons.length > 0 ? (progress / course.lessons.length) * 100 : 0;
    
    return (
        <div className="bg-light-card dark:bg-dark-card p-5 rounded-2xl shadow-md transition-transform hover:scale-105 duration-300 flex flex-col">
            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 h-12 flex-grow">{course.description}</p>
            {isEnrolled && (
                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                    <div className="bg-brand-orange h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            )}
            <div className="flex justify-between items-center mt-auto">
                 <span className={`text-sm font-semibold ${isEnrolled ? 'text-green-500' : 'text-gray-500'}`}>
                    {isEnrolled ? strings.enrolled[language] : strings.notEnrolled[language]}
                </span>
                <button
                    onClick={() => onSelect(course)}
                    className="bg-brand-orange text-white font-semibold py-2 px-4 rounded-xl transition hover:bg-orange-600"
                >
                    {strings.details[language]}
                </button>
            </div>
        </div>
    );
};


const CoursesPage: React.FC = () => {
    const { language, strings } = useAppContext();
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
    const [courseProgress, setCourseProgress] = useState<Record<string, number>>({});
    const [xp, setXp] = useState<number>(0);

    useEffect(() => {
        setCourses(getCourses(language));
    }, [language]);
    
    // Load data from localStorage on mount
    useEffect(() => {
        try {
            const storedEnrolled = localStorage.getItem('enrolled_courses');
            if (storedEnrolled) setEnrolledCourses(JSON.parse(storedEnrolled));

            const storedProgress = localStorage.getItem('course_progress');
            if (storedProgress) setCourseProgress(JSON.parse(storedProgress));

            const storedXp = localStorage.getItem('xp');
            if (storedXp) setXp(parseInt(storedXp, 10));
        } catch (error) {
            console.error("Failed to parse from localStorage", error);
        }
    }, []);
    
    const updateEnrolledCourses = useCallback((newEnrolled: string[]) => {
        setEnrolledCourses(newEnrolled);
        localStorage.setItem('enrolled_courses', JSON.stringify(newEnrolled));
    }, []);
    
    const updateCourseProgress = useCallback((newProgress: Record<string, number>) => {
        setCourseProgress(newProgress);
        localStorage.setItem('course_progress', JSON.stringify(newProgress));
    }, []);

    const updateXp = useCallback((newXp: number) => {
        setXp(newXp);
        localStorage.setItem('xp', newXp.toString());
    }, []);


    const handleSelectCourse = (course: Course) => {
        setSelectedCourse(course);
    };

    const handleBackToList = () => {
        setSelectedCourse(null);
    };
    
    if (selectedCourse) {
        // Find the latest version of the selected course by ID, in case the language changed
        const currentCourseData = courses.find(c => c.id === selectedCourse.id) || selectedCourse;
        return <CourseDetailPage 
            course={currentCourseData} 
            onBack={handleBackToList}
            enrolledCourses={enrolledCourses}
            courseProgress={courseProgress}
            xp={xp}
            updateEnrolledCourses={updateEnrolledCourses}
            updateCourseProgress={updateCourseProgress}
            updateXp={updateXp}
        />
    }

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">{strings.coursesTitle[language]}</h2>
                <p className="font-semibold text-brand-orange text-lg">{strings.xp[language]}: {xp}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onSelect={handleSelectCourse}
                        isEnrolled={enrolledCourses.includes(course.id)}
                        progress={courseProgress[course.id] || 0}
                    />
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;