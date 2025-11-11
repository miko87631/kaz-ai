
import React, { useState } from 'react';
import SafeButton from '../ui/SafeButton';
import { generateStartupPlan } from '../../services/geminiService';
import { Lightbulb, Loader } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const StartupPlannerPage: React.FC = () => {
    const { language, strings } = useAppContext();
    const [idea, setIdea] = useState('');
    const [plan, setPlan] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGeneratePlan = async () => {
        if (!idea.trim()) {
            setError(strings.ideaRequiredError[language]);
            return;
        }
        setIsLoading(true);
        setError('');
        setPlan('');

        try {
            const response = await generateStartupPlan(idea);
            setPlan(response.text);
        } catch (err) {
            setError(strings.planGenerationError[language]);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{strings.plannerTitle[language]}</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">{strings.plannerDescription[language]}</p>
            </div>

            <div className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-md">
                <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder={strings.plannerPlaceholder[language]}
                    className="w-full h-28 p-3 bg-gray-200 dark:bg-gray-800 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-brand-orange focus:border-transparent transition resize-none"
                    disabled={isLoading}
                />
                <div className="mt-4">
                    <SafeButton
                        onPressedAsync={handleGeneratePlan}
                        className="w-full bg-brand-orange text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center text-lg disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader className="animate-spin mr-3" size={20} />
                                {strings.generatingPlan[language]}
                            </>
                        ) : (
                            <>
                                <Lightbulb className="mr-3" size={20} />
                                {strings.generatePlan[language]}
                            </>
                        )}
                    </SafeButton>
                </div>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>

            {plan && (
                 <div className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-md">
                    <h3 className="text-2xl font-bold mb-4">{strings.yourBusinessPlan[language]}</h3>
                     <div 
                        className="prose prose-orange dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: plan.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                     />
                 </div>
            )}
        </div>
    );
};

export default StartupPlannerPage;