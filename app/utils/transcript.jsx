"use server"

export const fetchTranscript = async (url) => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/transcript?url=${url}`);
        const data = await response.json();
        return data.transcript;
    } catch (error) {
        console.error(error);
        throw error;
    }
};