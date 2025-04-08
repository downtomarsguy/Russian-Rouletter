<template>
    <div
        class="h-screen bg-[#0b132b] text-[#5C6E84] flex flex-col items-center justify-center"
    >
        <div class="text-white glow text-6xl">{{ randomLetter }}</div>
        <div class="mt-16 text-4xl">{{ pressedKey }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            randomLetter: this.randomizeLetter(),
            pressedKey: "",
        };
    },
    methods: {
        randomizeLetter() {
            const russianHashMap = {
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
            const letters = Object.keys(russianHashMap);
            const randomIndex = Math.floor(Math.random() * letters.length);
            return letters[randomIndex];
        },
        handleKeyPress(event) {
            const key = event.key;
            if (/^[a-zA-Zа-яА-Я']$/.test(key)) {
                this.pressedKey += key;
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
</style>
