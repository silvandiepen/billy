<template>
  <div class="loader">
    <div class="loader__dot"></div>
    <div class="loader__dot"></div>
    <div class="loader__dot"></div>
  </div>
</template>


<style lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 100%;

  &___dot {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: var(--color-primary);
    animation: loader 1.5s infinite;
  }

  @keyframes loader {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-1rem);
    }
    100% {
      transform: translateY(0);
    }
  }
}
</style>
