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
  const [englishTranslation, setEnglishTranslation] = useState<string>("");

  const randomizeLetter = () => {
    const randomIndex = Math.floor(
      Math.random() * Object.keys(russianToEnglishMap).length,
    );
    const randomLetter = Object.keys(russianToEnglishMap)[randomIndex];
    setRandomLetter(randomLetter);
    setEnglishTranslation(russianToEnglishMap[randomLetter]);
  };

  useEffect(() => {
    randomizeLetter();
  }, []);

  return (
    <div className="App">
      <div>
        <span className="text-6xl m-5">{randomLetter}</span>
      </div>
      <div>
        <p>English Translation: {englishTranslation}</p>
      </div>
      <button
        onClick={randomizeLetter}
        className="mt-3 py-2 px-5 bg-[#9792e3] text-white text-base font-medium rounded-md border border-transparent cursor-pointer transition-colors duration-200 hover:border-[#61E786] focus:outline-[#61E786] focus-visible:outline-4 focus-visible:outline-[#61E786]"
      >
        Randomize Again
      </button>
    </div>
  );
}

export default App;
