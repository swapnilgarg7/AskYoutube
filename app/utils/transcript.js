"use server"

import { YoutubeTranscript } from 'youtube-transcript';

export const fetchTranscript = async (url) => {
    const videoId = url.split("v=")[1];
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    console.log(transcript);
    return transcript.map((entry) => entry.text).join(" ");
};
