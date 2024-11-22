"use server";

import { OpenAI } from "openai";

const openai = new OpenAI();

export const analyzeContent = async (transcripts) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-2024-11-20",
        messages: [
            { 
                role: "system", 
                content: "You are an expert in understanding and summarizing video content. Create a comprehensive knowledge base from the provided video transcripts that can be used to answer future questions." 
            },
            {
                role: "user",
                content: `Analyze and create a detailed summary of the following video transcripts: ${transcripts}`,
            },
        ]
    });

    return response.choices[0].message.content || "";
};

export const askQuestion = async (knowledgeBase, question) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-2024-11-20",
        messages: [
            { 
                role: "system", 
                content: "You are an expert assistant who answers questions based on a specific knowledge base. Only answer questions using the information provided. If the information is not in the knowledge base, say that you cannot find an answer." 
            },
            {
                role: "user",
                content: `Knowledge Base:\n${knowledgeBase}\n\nQuestion: ${question}`
            },
        ]
    });

    return response.choices[0].message.content || "I couldn't find an answer";
};