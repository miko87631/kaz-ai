import React, { useState } from 'react';
import { Heart, MessageCircle, Plus } from 'lucide-react';
import { CommunityPost } from '../../types';
import { useAppContext } from '../../contexts/AppContext';

const initialPosts: CommunityPost[] = [
    { id: 1, author: 'Nikita', idea: 'An AI assistant for freelancers to manage projects and invoices.', likes: 42, comments: 5 },
    { id: 2, author: 'Alina', idea: 'A platform that uses AI to create personalized travel itineraries.', likes: 112, comments: 19 },
    { id: 3, author: 'Dmitry', idea: 'Sustainable packaging solutions using biodegradable materials discovered by AI.', likes: 78, comments: 12 },
];

const PostCard: React.FC<{ post: CommunityPost }> = ({ post }) => (
  <div className="bg-light-card dark:bg-dark-card p-5 rounded-2xl shadow-md transition-transform hover:scale-105 duration-300">
    <p className="font-bold text-brand-orange mb-2">{post.author}</p>
    <p className="text-gray-800 dark:text-gray-200 mb-4">{post.idea}</p>
    <div className="flex items-center text-gray-500 dark:text-gray-400">
      <button className="flex items-center mr-6 hover:text-brand-orange transition-colors">
        <Heart size={18} className="mr-2"/> {post.likes}
      </button>
      <button className="flex items-center hover:text-brand-orange transition-colors">
        <MessageCircle size={18} className="mr-2"/> {post.comments}
      </button>
    </div>
  </div>
);

const CommunityPage: React.FC = () => {
    const { language, strings } = useAppContext();
    const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
    const [newIdea, setNewIdea] = useState('');

    const handlePublish = () => {
        if (!newIdea.trim()) return;
        const newPost: CommunityPost = {
            id: Date.now(),
            author: strings.you[language],
            idea: newIdea.trim(),
            likes: 0,
            comments: 0,
        };
        setPosts([newPost, ...posts]);
        setNewIdea('');
    };
    
    return (
        <div className="p-4 space-y-6">
            <h2 className="text-3xl font-bold text-center">{strings.communityTitle[language]}</h2>
            
            <div className="bg-light-card dark:bg-dark-card p-4 rounded-2xl border border-brand-orange/50">
                <textarea
                    value={newIdea}
                    onChange={(e) => setNewIdea(e.target.value)}
                    placeholder={strings.shareIdeaPlaceholder[language]}
                    className="w-full p-2 bg-transparent rounded-lg focus:ring-0 focus:outline-none resize-none"
                />
                <button
                    onClick={handlePublish}
                    className="w-full mt-2 bg-brand-orange text-white font-semibold py-2 px-4 rounded-xl flex items-center justify-center transition hover:bg-orange-600"
                >
                    <Plus size={20} className="mr-2"/> {strings.publish[language]}
                </button>
            </div>
            
            <div className="space-y-4">
                {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
        </div>
    );
};

export default CommunityPage;