<template>
  <div class="main-bg py-[4rem]">
    <div class="main-page container mx-auto">
      <Header />
      <div class="main-content">
        <slot />
      </div>

      <!-- footer -->
      <div class="text-center py-4 text-white">
        <p>&copy; 2021 Free to play</p>
      </div>
    </div>
  </div>
</template>

<style>
.main-bg {
  background: #131617 !important;
}
.main-page {
  box-shadow: 0px 0px 20px 10px rgba(10, 10, 10, 0.75);
  -webkit-box-shadow: 0px 0px 20px 10px rgba(10, 10, 10, 0.75);
  -moz-box-shadow: 0px 0px 20px 10px rgba(10, 10, 10, 0.75);
}
.main-content {
  min-height: calc(100vh - 244px);
}
</style>
