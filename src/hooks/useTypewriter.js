import { useState, useEffect } from "react";

export function useTypewriter(words, options = {}) {
  const { typingSpeed = 90, deletingSpeed = 50, pauseTime = 1800 } = options;

  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timeoutId;

    if (!isDeleting && text === currentWord) {
      timeoutId = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => prev + 1);
    } else {
      const nextText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      timeoutId = setTimeout(
        () => setText(nextText),
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}
