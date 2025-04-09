<template>
    <div
        class="h-screen bg-[#0b132b] text-[#5C6E84] flex flex-col items-center justify-center"
    >
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
        <div class="mt-16 text-4xl">{{ pressedKey }}</div>
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
        };
    },
    methods: {
        randomizeLetter() {
            const letters = Object.keys(russianHashMap);
            const randomIndex = Math.floor(Math.random() * letters.length);
            return letters[randomIndex];
        },
        handleKeyPress(event) {
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

<style scoped>
.glow {
    color: white;
    text-shadow:
        0 0 5px rgba(255, 255, 255, 0.8),
        0 0 10px rgba(255, 255, 255, 0.6),
        0 0 15px rgba(255, 255, 255, 0.4);
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
</style>
