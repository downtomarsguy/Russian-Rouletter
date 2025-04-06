<template>
    <div
        class="h-screen bg-[#0b132b] text-[#5C6E84] flex flex-col items-center justify-center"
    >
        <div class="text-white glow text-6xl">some russian letter</div>
        <div class="mt-16 text-4xl">answer</div>
    </div>
</template>

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
