<script></script>
<template>
  <div class="center-spinner">
    <div class="spinner"></div>
  </div>
</template>
<style scoped>
.spinner {
  --size: 30px;
  --first-block-clr: #005bba;
  --second-block-clr: #fed500;
  --clr: #111;
  width: 100px;
  height: 100px;
  position: relative;
}

.spinner::after,
.spinner::before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  width: var(--size);
  height: var(--size);
  top: 50%;
  animation: up 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
  left: 50%;
  background: var(--first-block-clr);
}

.spinner::after {
  background: var(--second-block-clr);
  top: calc(50% - var(--size));
  left: calc(50% - var(--size));
  animation: down 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes down {
  0%,
  100% {
    transform: none;
  }

  25% {
    transform: translateX(100%);
  }

  50% {
    transform: translateX(100%) translateY(100%);
  }

  75% {
    transform: translateY(100%);
  }
}

@keyframes up {
  0%,
  100% {
    transform: none;
  }

  25% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(-100%) translateY(-100%);
  }

  75% {
    transform: translateY(-100%);
  }
}

.center-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
}
</style>


<!-- <script></script>
<template>
  <div class="center-spinner">
    <svg class="pl" width="240" height="240" viewBox="0 0 240 240">
      <circle
        class="pl__ring pl__ring--a"
        cx="120"
        cy="120"
        r="105"
        fill="none"
        stroke="#000"
        stroke-width="20"
        stroke-dasharray="0 660"
        stroke-dashoffset="-330"
        stroke-linecap="round"
      ></circle>
      <circle
        class="pl__ring pl__ring--b"
        cx="120"
        cy="120"
        r="35"
        fill="none"
        stroke="#000"
        stroke-width="20"
        stroke-dasharray="0 220"
        stroke-dashoffset="-110"
        stroke-linecap="round"
      ></circle>
      <circle
        class="pl__ring pl__ring--c"
        cx="85"
        cy="120"
        r="70"
        fill="none"
        stroke="#000"
        stroke-width="20"
        stroke-dasharray="0 440"
        stroke-linecap="round"
      ></circle>
      <circle
        class="pl__ring pl__ring--d"
        cx="155"
        cy="120"
        r="70"
        fill="none"
        stroke="#000"
        stroke-width="20"
        stroke-dasharray="0 440"
        stroke-linecap="round"
      ></circle>
    </svg>
  </div>
</template>
<style scoped>
.pl {
  width: 6em;
  height: 6em;
}

.pl__ring {
  animation: ringA 2s linear infinite;
}

.pl__ring--a {
  stroke: #f42f25;
}

.pl__ring--b {
  animation-name: ringB;
  stroke: #f49725;
}

.pl__ring--c {
  animation-name: ringC;
  stroke: #255ff4;
}

.pl__ring--d {
  animation-name: ringD;
  stroke: #f42582;
}

/* Animations */
@keyframes ringA {
  from,
  4% {
    stroke-dasharray: 0 660;
    stroke-width: 20;
    stroke-dashoffset: -330;
  }

  12% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -335;
  }

  32% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -595;
  }

  40%,
  54% {
    stroke-dasharray: 0 660;
    stroke-width: 20;
    stroke-dashoffset: -660;
  }

  62% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -665;
  }

  82% {
    stroke-dasharray: 60 600;
    stroke-width: 30;
    stroke-dashoffset: -925;
  }

  90%,
  to {
    stroke-dasharray: 0 660;
    stroke-width: 20;
    stroke-dashoffset: -990;
  }
}

@keyframes ringB {
  from,
  12% {
    stroke-dasharray: 0 220;
    stroke-width: 20;
    stroke-dashoffset: -110;
  }

  20% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -115;
  }

  40% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -195;
  }

  48%,
  62% {
    stroke-dasharray: 0 220;
    stroke-width: 20;
    stroke-dashoffset: -220;
  }

  70% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -225;
  }

  90% {
    stroke-dasharray: 20 200;
    stroke-width: 30;
    stroke-dashoffset: -305;
  }

  98%,
  to {
    stroke-dasharray: 0 220;
    stroke-width: 20;
    stroke-dashoffset: -330;
  }
}

@keyframes ringC {
  from {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: 0;
  }

  8% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -5;
  }

  28% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -175;
  }

  36%,
  58% {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -220;
  }

  66% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -225;
  }

  86% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -395;
  }

  94%,
  to {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -440;
  }
}

@keyframes ringD {
  from,
  8% {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: 0;
  }

  16% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -5;
  }

  36% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -175;
  }

  44%,
  50% {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -220;
  }

  58% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -225;
  }

  78% {
    stroke-dasharray: 40 400;
    stroke-width: 30;
    stroke-dashoffset: -395;
  }

  86%,
  to {
    stroke-dasharray: 0 440;
    stroke-width: 20;
    stroke-dashoffset: -440;
  }
}

.center-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 100%;
}
</style> -->
