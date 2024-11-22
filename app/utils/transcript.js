"use server"

import { YoutubeTranscript } from 'youtube-transcript';

export const fetchTranscript = async (url) => {
    let videoId;
    console.log(url);

    if (url.includes("youtu.be")) {
        videoId = url.split("/").pop().split("?")[0];
    } else if (url.includes("youtube.com")) {
        const params = new URLSearchParams(new URL(url).search);
        videoId = params.get("v");
    } else {
        throw new Error("Invalid YouTube URL");
    }

    if (!videoId) throw new Error("Video ID could not be extracted");
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    console.log(transcript);
    return transcript.map((entry) => entry.text).join(" ");
};
