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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full space-y-6">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">AskYouTube</h1>
                
                {stage === 'input' && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={urls}
                            onChange={(e) => setUrls(e.target.value)}
                            className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter YouTube URLs (one per line)"
                            rows={5}
                            required
                        ></textarea>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            {loading ? "Analyzing Videos..." : "Analyze Videos"}
                        </button>
                    </form>
                )}

                {stage === 'analysis' && (
                    <div>
                        <form onSubmit={handleQuestionSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ask a question about the videos"
                                required
                            />
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-grow bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
                                >
                                    {loading ? "Getting Answer..." : "Ask Question"}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetAnalysis}
                                    className="bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {stage === 'query' && (
                    <div>
                        <div className="bg-green-50 p-4 rounded-lg mb-4">
                            <h2 className="text-lg font-semibold text-green-700 mb-2">AI Response:</h2>
                            <p className="text-gray-700">{questionResponse}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setStage('analysis')}
                                className="flex-grow bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                            >
                                Ask Another Question
                            </button>
                            <button
                                onClick={resetAnalysis}
                                className="bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out"
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