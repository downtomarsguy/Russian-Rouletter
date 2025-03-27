import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const russianToEnglishMap: { [key: string]: string } = {
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "Yo",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "Kh",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Shch",
    Ъ: "'",
    Ы: "Y",
    Ь: "'",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "'",
    ы: "y",
    ь: "'",
    э: "e",
    ю: "yu",
    я: "ya",
  };

  const [randomLetter, setRandomLetter] = useState<string>("");
  const [enteredLetter, setEnteredLetter] = useState<string>("");
  const [englishTranslation, setEnglishTranslation] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const randomizeLetter = () => {
    const randomIndex = Math.floor(
      Math.random() * Object.keys(russianToEnglishMap).length,
    );
    const randomLetter = Object.keys(russianToEnglishMap)[randomIndex];
    setRandomLetter(randomLetter);
    setEnglishTranslation(russianToEnglishMap[randomLetter]);
  };

  const enterLetter = (e: string) => {
    setEnteredLetter((prevEnteredLetter) => prevEnteredLetter + e);
  };

  const removeLastLetter = () => {
    setEnteredLetter((prevEnteredLetter) =>
      prevEnteredLetter.slice(0, prevEnteredLetter.length - 1),
    );
  };

  const handleEnterKey = () => {
    const correctTranslation = russianToEnglishMap[randomLetter];

    if (enteredLetter === correctTranslation) {
      setFeedbackMessage("Correct! Well done!");
      randomizeLetter();
    } else {
      setFeedbackMessage(
        `Incorrect, try again. The correct translation was "${correctTranslation}"`,
      );
    }

    setEnteredLetter("");
  };

  useEffect(() => {
    randomizeLetter();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const validKeys = /^[a-zA-Z']$/;
      if (validKeys.test(e.key)) {
        enterLetter(e.key);
      } else if (e.key === "Backspace") {
        removeLastLetter();
      } else if (e.key === "Enter") {
        handleEnterKey();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enteredLetter, randomLetter]);

  return (
    <div className="App">
      <div>
        <span className="text-6xl m-5">{randomLetter}</span>
      </div>
      <div>
        <p>English Translation: {englishTranslation}</p>
      </div>
      <div>
        <span className="text-6xl m-5">{enteredLetter}</span>
      </div>
      <div>{feedbackMessage && <p>{feedbackMessage}</p>}</div>
    </div>
  );
}

export default App;
