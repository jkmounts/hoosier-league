<template>
  <div id="news-feed">
    <h2>Headlines</h2>
    <div class="image-box" :style="imageBoxCSS">
      <p>{{ news[currentHeadline - 1].headline }}</p>
    </div>
    <div class="circles">
      <div :class="currentHeadline === 1 ? 'circle selected' : 'circle'"></div>
      <div :class="currentHeadline === 2 ? 'circle selected' : 'circle'"></div>
      <div :class="currentHeadline === 3 ? 'circle selected' : 'circle'"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NewsFeed',
    data() {
      return {
        news: [
          {image: 'http://www.placekitten.com/500/500',
          headline: 'Test1'},
          {image: 'http://www.placekitten.com/300/500',
          headline: 'Test2'},
          {image: 'http://www.placekitten.com/800/500',
          headline: 'Test3'},
        ],
        currentHeadline: 1,
      };
    },
    computed: {
      imageBoxCSS() {
        return { background: `center / cover no-repeat url(${ this.news[this.currentHeadline - 1].image })`, }
      }
    },
    created () {
      this.updateHeadline();
    },
    methods: {
      updateHeadline() {
        setInterval(() => {
          if (this.currentHeadline < this.news.length) {
            this.currentHeadline++;
          } else {
            this.currentHeadline = 1;
          }
        }, 5000);
      }
    },
  }
</script>

<style lang="css" scoped>
#news-feed {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.image-box {
  background: var(--dark);
  aspect-ratio: 1 / 1 ;
  width: 75%;
  border-radius: 10px;
  overflow: hidden;
  background: center / cover no-repeat url(http://www.placekitten.com/500/500);
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  box-shadow: 0px 0px 5px black;
}
.image-box p {
  background-color: rgba(255,255,255, 0.75);
  width: 100%;
  font-size: 1.25rem;
}
.circle {
  width: 10px;
  height: 10px;
  margin: 2px;
  background: var(--dark);
  opacity: 0.5;
  border-radius: 100%;
}
.circles {
  display: flex;
  flex-flow: row nowrap;
  padding: 5px;
}
.circle.selected{
  opacity: 1;
}

</style>