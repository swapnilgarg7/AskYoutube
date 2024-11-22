"use client";

import { useState } from "react";
import { fetchTranscript } from "@/app/utils/transcript";
import { analyzeContent, askQuestion } from "@/app/utils/openai";

export default function HomePage() {
    const [urls, setUrls] = useState("");
    const [knowledgeBase, setKnowledgeBase] = useState("");
    const [analysisResponse, setAnalysisResponse] = useState("");
    const [question, setQuestion] = useState("");
    const [questionResponse, setQuestionResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState('input');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const urlArray = urls.split("\n").filter(url => url.trim() !== "");
            let transcripts = "";
            for (let url of urlArray) {
                transcripts += await fetchTranscript(url) + "\n";
            }
            const aiResponse = await analyzeContent(transcripts);
            setKnowledgeBase(aiResponse);
            setAnalysisResponse(aiResponse);
            setStage('analysis');
        } catch (error) {
            console.error(error);
            setAnalysisResponse("Error processing your request.");
        }
        setLoading(false);
    };

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await askQuestion(knowledgeBase, question);
            setQuestionResponse(response);
            setStage('query');
        } catch (error) {
            console.error(error);
            setQuestionResponse("Error processing your question.");
        }
        setLoading(false);
    };

    const resetAnalysis = () => {
        setUrls("");
        setKnowledgeBase("");
        setAnalysisResponse("");
        setQuestion("");
        setQuestionResponse("");
        setStage('input');
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white">
            <div className="bg-dark border border-dark-secondary rounded-2xl shadow-2xl max-w-2xl w-full p-8 space-y-6">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent mb-6">
                    AskYoutube
                </h1>
                
                {stage === 'input' && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <textarea
                                value={urls}
                                onChange={(e) => setUrls(e.target.value)}
                                className="w-full p-4 bg-dark-secondary border border-dark-secondary rounded-xl text-white 
                                focus:outline-none focus:ring-2 focus:ring-primary-start 
                                transition duration-300 placeholder-gray-500"
                                placeholder="Paste YouTube URLs (one per line)"
                                rows={5}
                                required
                            ></textarea>
                            <div className="absolute top-2 right-2 text-xs text-gray-400 opacity-70">
                                {urls.split('\n').filter(url => url.trim() !== '').length} URLs
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary-start to-primary-end 
                            text-white py-4 rounded-xl 
                            hover:from-primary-start/80 hover:to-primary-end/80 
                            transition duration-300 ease-in-out 
                            transform hover:scale-[1.02] 
                            disabled:opacity-50"
                        >
                            {loading ? "Analyzing Videos..." : "Analyze Videos"}
                        </button>
                    </form>
                )}

                {stage === 'analysis' && (
                    <div className="space-y-4">
                        <form onSubmit={handleQuestionSubmit} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className="w-full p-4 bg-dark-secondary border border-dark-secondary 
                                    rounded-xl text-white 
                                    focus:outline-none focus:ring-2 focus:ring-secondary-start 
                                    transition duration-300 placeholder-gray-500"
                                    placeholder="Ask a question about the videos"
                                    required
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-grow bg-gradient-to-r from-secondary-start to-secondary-end 
                                    text-white py-4 rounded-xl 
                                    hover:from-secondary-start/80 hover:to-secondary-end/80 
                                    transition duration-300 ease-in-out 
                                    transform hover:scale-[1.02] 
                                    disabled:opacity-50"
                                >
                                    {loading ? "Generating Answer..." : "Ask Question"}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetAnalysis}
                                    className="bg-dark-secondary text-dark-secondary 
                                    py-4 px-6 rounded-xl 
                                    hover:bg-dark-tertiary 
                                    transition duration-300 ease-in-out"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {stage === 'query' && (
                    <div className="space-y-4">
                        <div className="bg-dark-secondary p-6 rounded-xl border border-dark-secondary">
                            <h2 className="text-xl font-semibold bg-gradient-to-r from-secondary-start to-secondary-end bg-clip-text text-transparent mb-3">
                                AI Response
                            </h2>
                            <p className="text-dark-secondary">{questionResponse}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setStage('analysis')}
                                className="flex-grow bg-gradient-to-r from-primary-start to-primary-end 
                                text-white py-4 rounded-xl 
                                hover:from-primary-start/80 hover:to-primary-end/80 
                                transition duration-300 ease-in-out 
                                transform hover:scale-[1.02]"
                            >
                                Ask Another Question
                            </button>
                            <button
                                onClick={resetAnalysis}
                                className="bg-dark-secondary text-dark-secondary 
                                py-4 px-6 rounded-xl 
                                hover:bg-dark-tertiary 
                                transition duration-300 ease-in-out"
                            >
                                New Analysis
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}