<template>
  <!-- Layar Loading -->
  <div v-if="loading" class="loading-screen">
    <div class="spinner-wrapper">
      <div class="ring ring-outer"></div>
      <div class="ring ring-inner"></div>
      <div class="dot"></div>
    </div>
    <p class="loading-text">Loading...</p>
  </div>

  <!-- Konten 404 -->
  <div
    v-else
    class="flex min-h-screen flex-col items-center justify-center text-center px-6 bg-background"
  >
    <img
      src="/images/404.webp"
      alt="Illustrasi orang membawa papan bertuliskan 404"
      class="w-full max-w-md mb-8 select-none pointer-events-none"
      draggable="false"
    />

    <button
      type="button"
      @click="goHome"
      class="
        inline-flex items-center justify-center gap-2
        rounded-full px-8 py-3 text-[0.95rem] font-semibold tracking-wide
        text-text no-underline cursor-pointer

        bg-white/70 backdrop-blur-xl backdrop-saturate-[1.8]
        border border-border

        shadow-[0_1px_1px_rgba(255,255,255,0.7)_inset,0_8px_20px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)]

        transition-colors duration-200 ease-out
        hover:bg-primary hover:text-white hover:border-primary

        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-primary
      "
    >
      <svg
        class="h-4 w-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
          <path
            d="M9.15721519,18.7714023 L9.15721519,15.70467 C9.15719744,14.9246392 9.79311743,14.2908272 10.5810127,14.2855921 L13.4670886,14.2855921 C14.2587434,14.2855921 14.9005063,14.9209349 14.9005063,15.70467 L14.9005063,18.7809263 C14.9003226,19.4432001 15.4342557,19.984478 16.103038,20 L18.0270886,20 C19.9451246,20 21.5,18.4606794 21.5,16.5618312 L21.5,7.8378351 C21.4897577,7.09082692 21.1354747,6.38934919 20.5379747,5.93303245 L13.9577215,0.685301154 C12.8049347,-0.228433718 11.1662046,-0.228433718 10.0134177,0.685301154 L3.46202532,5.94255646 C2.8622586,6.39702249 2.50738669,7.09966612 2.5,7.84735911 L2.5,16.5618312 C2.5,18.4606794 4.05487539,20 5.97291139,20 L7.89696203,20 C8.58235439,20 9.13797468,19.4499381 9.13797468,18.7714023 L9.13797468,18.7714023"
            stroke="currentColor"
          />
        </g>
      </svg>

      <span>Back to Home</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    goHome() {
      this.loading = true

      setTimeout(() => {
        this.$router.push('/')
      }, 1600)
    },
  },
}
</script>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background: var(--color-background);
  z-index: 9999;
}

.spinner-wrapper {
  position: relative;
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid transparent;
}

.ring-outer {
  border-top-color: var(--color-primary);
  border-right-color: var(--color-primary-light);
  animation: spin 1.1s linear infinite;
}

.ring-inner {
  inset: 12px;
  border-top-color: var(--color-accent);
  border-left-color: var(--color-accent-soft);
  animation: spin-reverse 0.9s linear infinite;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-primary-dark);
}

.loading-text {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  font-family: var(--font-body);
  animation: var(--animate-fade-in);
}
</style>