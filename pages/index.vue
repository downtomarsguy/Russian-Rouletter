<template>
    <div class="min-h-screen bg-[#0b132b] text-[#5C6E84] flex flex-col">
        <div class="flex-grow flex flex-col items-center justify-center">
            <div
                :class="{
                    glow: !isAnswerChecked && !isCorrectAnswer,
                    'incorrect-glow': isAnswerChecked && !isCorrectAnswer,
                    'correct-glow': isAnswerChecked && isCorrectAnswer,
                    'shake-animation': isShaking,
                }"
                class="text-white text-6xl"
            >
                {{ randomLetter }}
            </div>
        </div>

        <div class="glowing-line"></div>

        <div class="h-[50vh] flex items-center justify-center w-full">
            <input
                type="text"
                v-model="pressedKey"
                @focus="onFocus"
                @blur="onBlur"
                @input="onInput"
                class="text-4xl answer-glow text-center bg-transparent w-full h-full px-6 py-4"
                placeholder="Enter English Translation"
            />
        </div>
    </div>
</template>

<script>
import russianHashMap from "@/assets/interfaces/russianHashMap.json";

export default {
    data() {
        return {
            randomLetter: this.randomizeLetter(),
            pressedKey: "",
            isAnswerChecked: false,
            isCorrectAnswer: false,
            isShaking: false,
            inputFocused: false,
        };
    },
    methods: {
        randomizeLetter() {
            const letters = Object.keys(russianHashMap);
            const randomIndex = Math.floor(Math.random() * letters.length);
            return letters[randomIndex];
        },
        handleKeyPress(event) {
            if (this.inputFocused) return;

            const key = event.key;

            if (/^[a-zA-Zа-яА-Я']$/.test(key)) {
                if (this.pressedKey.length < 4) {
                    this.pressedKey += key;
                }
            } else if (key === "Backspace") {
                this.pressedKey = this.pressedKey.slice(0, -1);
            } else if (key === "Enter") {
                this.checkAnswer();
            }
        },
        onInput(event) {
            const inputValue = event.target.value;

            const validInput = inputValue.replace(/[^a-zA-Zа-яА-Я']+/g, "");

            if (validInput.length <= 4) {
                if (validInput !== this.pressedKey) {
                    this.pressedKey = validInput;
                }
            } else {
                this.pressedKey = validInput.slice(0, 4);
            }
        },
        checkAnswer() {
            const correctAnswer = russianHashMap[this.randomLetter];
            this.isAnswerChecked = true;

            if (this.pressedKey === correctAnswer) {
                this.isCorrectAnswer = true;
                this.pressedKey = "";
                this.isShaking = false;

                setTimeout(() => {
                    this.randomLetter = this.randomizeLetter();
                    this.isAnswerChecked = false;
                    this.isCorrectAnswer = false;
                }, 2000);
            } else {
                this.isCorrectAnswer = false;
                this.isShaking = true;

                setTimeout(() => {
                    this.isShaking = false;
                    this.isAnswerChecked = false;
                }, 2000);
            }
        },
        onFocus() {
            this.inputFocused = true;
        },
        onBlur() {
            this.inputFocused = false;
        },
    },
    mounted() {
        this.randomLetter = this.randomizeLetter();
        window.addEventListener("keydown", this.handleKeyPress);
    },
    beforeDestroy() {
        window.removeEventListener("keydown", this.handleKeyPress);
    },
};
</script>

<style>
body {
    background-color: #0b132b;
    height: 100%;
    margin: 0;
}

.glowing-line {
    width: 100%;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
}

.glow {
    color: white;
    text-shadow:
        0 0 5px rgba(255, 255, 255, 0.8),
        0 0 10px rgba(255, 255, 255, 0.6),
        0 0 15px rgba(255, 255, 255, 0.4);
}

.answer-glow {
    color: #5c6e84;
    text-shadow:
        0 0 5px rgba(92, 110, 132, 0.8),
        0 0 10px rgba(92, 110, 132, 0.6),
        0 0 15px rgba(92, 110, 132, 0.4);
}

.incorrect-glow {
    color: rgba(255, 99, 71, 0.8);
    text-shadow:
        0 0 5px rgba(255, 99, 71, 0.8),
        0 0 10px rgba(255, 99, 71, 0.6),
        0 0 15px rgba(255, 99, 71, 0.4);
}

.correct-glow {
    color: rgba(80, 200, 120, 0.8);
    text-shadow:
        0 0 5px rgba(80, 200, 120, 0.8),
        0 0 10px rgba(80, 200, 120, 0.6),
        0 0 15px rgba(80, 200, 120, 0.4);
}

.shake-animation {
    animation: shake 0.5s 2;
}

@keyframes shake {
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-10px);
    }
    50% {
        transform: translateX(10px);
    }
    75% {
        transform: translateX(-10px);
    }
    100% {
        transform: translateX(0);
    }
}

input[type="text"] {
    font-size: 2rem;
    color: #5c6e84;
    background: transparent;
    text-align: center;
    border: none;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    outline: none;
    caret-color: transparent;
}

input[type="text"]:focus {
    border-color: transparent;
    box-shadow: none;
}
</style>
