import HomePage from "./components/homePage";
import './globals.css';

import { fetchTranscript } from "./utils/transcript";
import { analyzeContent, askQuestion } from "./utils/openai";

export default function Home() {

  return (
    <div>
    <HomePage fetchTranscript={fetchTranscript} analyzeContent={analyzeContent} askQuestion={askQuestion} />
    </div>
    )
}
