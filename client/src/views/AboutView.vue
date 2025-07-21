<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import Card from '@/components/Card.vue'
import FeatureBox from '@/components/FeatureBox.vue'
</script>

<template>
  <MainLayout page-title="Reminder for you, ">
    <template #navigation>
      <Sidebar></Sidebar>
    </template>
    <template #page-content>
      <div class="about-view">
        <Card title="About Grati" max-width="50rem" height="65rem">
          <div class="about-view__about-text">
            Grati is your digital gratitude sidekick. It helps you slow down, look around, and
            remember the good stuff — even on weird days.<br />
            <br />

            Journaling your gratitude isn't just wholesome — it’s science-backed. Research shows it
            can boost mood, improve sleep, and even make you more optimistic. Yes, writing “I love
            my morning coffee” does count.
          </div>
          <hr class="about-view__line-break" />
          <div class="about-view__title">How it works</div>
          <div class="about-view__box-layout">
            <FeatureBox
              title="🪜 Start at Level 1"
              text="Just signed up? Awesome. You begin at Level 1 with simple prompts like:
“What made you smile today?”"
            >
            </FeatureBox>
            <FeatureBox
              title="🙋🏼‍♀️ Answer 2 questions"
              text="Each time you journal, you’ll answer 2 guided questions. It only takes a few minutes."
            >
            </FeatureBox>
            <FeatureBox
              title="🆙 Level up after every 15 notes"
              text="Submit 15 gratitude notes to unlock the next level.There are 3 levels in total — questions get deeper and more thoughtful as you grow."
            >
            </FeatureBox>
            <FeatureBox
              title="🔑 Unlock tips every 5 entries"
              text="Every 5 notes, you will get a science-based tip on how gratitude rewires your brain and boosts your life.(You can re-read all unlocked tips anytime!)"
            >
            </FeatureBox>
            <FeatureBox
              title="🧸 Bonus: AI reflections"
              text="After you submit a note, Grati's friendly AI bot reflects back your entry with a short response — like a cozy pat on the back."
            >
            </FeatureBox>
          </div>
          <div class="about-view__title">Gratitude doesn’t have to be cheesy</div>
          <div class="about-view__about-text">
            Grati makes it feel real, doable, and even kind of fun. And hey — if gratitude is a
            muscle, you’re already flexing it.
          </div>
        </Card>
      </div>
    </template>
  </MainLayout>
</template>

<style scoped>
.about-view {
  display: flex;
  justify-content: center;
  margin: 4rem;
}

.about-view__about-text {
  color: #94949b;
  font-size: 1rem;
  font-weight: 400;
  text-align: justify;
}

.about-view__line-break {
  border: none;
  border-top: 5px solid #eaeaec;
  border-radius: 3px;
  margin: 2rem 0;
}

.about-view__title {
  color: #55555b;
  font-weight: 600;
  font-size: 1.25rem;
  padding-top: 3rem;
  padding-bottom: 1rem;
}

.about-view__box-layout {
  display: flex;
  flex-direction: row;
  gap: 20px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}
</style>
