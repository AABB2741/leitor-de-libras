import * as Speech from "expo-speech";

export function speak(text: string, options?: Speech.SpeechOptions | undefined) {
    Speech.stop();
    Speech.speak(text, options);
}

export function stop() {
    Speech.stop();
}
