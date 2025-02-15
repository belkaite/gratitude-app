import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.insertInto('tip').values([
    {
      content: `
        You have been writing this journal for quite a bit now.
        Do you notice a difference? Maybe you feel this might be working,
        but chances are that it is also pretty exhausting. Some days you
        might be too tired or bored. Maybe you are asking yourself if it's
        really worth it - how much of an effect can writing a list have after all?

        In 2015, a study looked at students that sought university-based psychotherapy.
        They were randomly assigned to three groups: some got psychotherapy sessions, others
        therapy and expressive writing—meaning writing down whatever comes to mind.
        A third group got psychotherapy and wrote a Gratitude Journal like this one.

        After three months, the Gratitude group reported significantly better mental health
        than the other two groups, which both had about the same results.

        There are several more studies like this. This means Gratitude journals have real, measurable
        benefits for people working on serious issues. Even if you don't have tough things to
        work through—you can only benefit.

        Source: Wong Y J, Owen J, et al: Does Gratitude Writing Improve the Mental Health of Psychotherapy Clients? (2018).
      `,
      level_id: 1,
      order: 1,
    },
    {
      content: `
        Maybe this Gratitude thing has already become part of your life, and you would like to
        tell others about it. Or you realize you always write about your friends and family and
        would like to tell them, but it feels weird and a little embarrassing.

        There was actually a study about that. In 2018, researchers asked a group of 100 people to write
        Gratitude letters to someone they were thankful for, like a friend or a teacher. They were then
        asked to rate how surprised, happy, and awkward they thought the recipient would feel.
        Additionally, the researchers asked each participant how writing the letter made them feel.

        When the addressees received the letters and filled out a questionnaire, the note writers
        had greatly overestimated how awkward recipients would feel and how insincere the notes would seem.
        They also underestimated the positive effects. Many recipients reported feeling ecstatic,
        rating their happiness at 4 out of 5, while the senders typically guessed a 3.

        So if you feel like writing someone a letter—do it! Chances are, you will be surprised by
        the positive impact.

        Source: Kumar A, Epley N: Undervaluing Gratitude: Expressers Misunderstand the Consequences of Showing Appreciation (2018).
      `,
      level_id: 1,
      order: 2,
    },
    {
      content: `
        Gratitude can literally change your mind. 
        Researchers asked people to imagine that they were survivors of a catastrophe who were given food
        and shelter by strangers. By studying the brains of participants, scientists discovered which
        regions are associated with Gratitude. But it wasn't clear yet how exactly altruism triggered
        the feeling of Gratitude.

        A study from 2018 explored the pathways of Gratitude in the brain. Through a game where participants
        paid different amounts of money to prevent harm to their game partners, researchers found that
        acting selflessly activates brain areas responsible for reward. Over time, these regions
        seem to feed social information to the cingulate cortex—a region responsible for ethics and
        decision-making—and cause feelings of Gratitude.

        You may only be writing a list, but your brain is taking this seriously.

        Source: Yu H, Goa X, et al: Decomposing Gratitude: Representation and Integration of Cognitive
        Antecedents of Gratitude in the Brain (2018).
      `,
      level_id: 2,
      order: 1,
    },
    {
      content: `
        Why are you writing this Gratitude journal? Most likely because you hope it will be good for you.
        With things like this, it can be easy to become impatient very fast. Soon, we ask ourselves:
        I've been so good—where are the results already?

        But doing Gratitude exercises can actually help with patience. In 2016, a study with 105 participants
        tracked their daily happiness and Gratitude over three weeks. The study included a test designed to check
        how well participants dealt with delayed rewards, asking questions like:
        Would you rather have five dollars now or ten dollars in a week?

        The study found that people who experienced higher levels of Gratitude also had much higher patience
        than their fellow participants. Researchers suspect this is because Gratitude helps us focus on
        the positive things that are already present, rather than what we want in the future.

        Source: Dickens L, DeSteno D: The Grateful are Patient: Heightened Daily Gratitude is Associated with Attenuated Temporal
        Discounting (2016).
      `,
      level_id: 2,
      order: 2,
    },
    {
      content: `
        You're reading this, so you took the time to do this Gratitude thing. Congrats—good for you!
        If you're feeling instantly guilty because this is the first time in a while you've written in your journal—don't.
        Science actually says writing in a Gratitude journal once a week can be better for you than writing daily.

        Humans are simple creatures: when we realize that something makes us feel good, we want more of it.
        This is why it's hard to stop after one piece of chocolate—it tastes great, and the sugar tells
        your brain this makes me happy, I want more of it.

        But eating a whole chocolate bar every day makes you get used to the sensation quickly.
        Soon, chocolate won't give you the same boost of happiness anymore.
        Some research suggests Gratitude might work the same way: you could get used to the positive feeling.
        So it's okay if you don’t write in your journal every day—this way, you ensure that the good feeling
        stays something special.

        Source: Armenta C, Boa K J, et al: Is Lasting Change Possible? Lessons from the Hedonic Adaptation Prevention Model (2014).
      `,
      level_id: 2,
      order: 3,
    },
    {
      content: `
        Has Gratitude become a ritual for you, or are you still struggling to fit it in?
        Many people find it easier to do something regularly if they always do it at the same time.
        Try writing in your journal right before bed—it might even help you sleep.

        A study from 2009 asked participants to write down three things they were grateful for
        every night for 21 days. Compared to a control group, participants who wrote Gratitude
        journals reported sleeping longer and feeling more refreshed upon waking.

        Researchers believe this is because Gratitude creates positive thoughts before sleep,
        making people aware of their social support system and happy memories from the day.
        On top of that, it may reduce negative thoughts and worries which have been linked
        to poor sleep quality.

        Source: Emmons R, McCullough M: The Effects of Gratitude on Subjective Well-being in Daily Life (2009).
      `,
      level_id: 3,
      order: 1,
    },
  ]).execute()
}

export async function down(db: Kysely<any>) {
  await db.deleteFrom('tip').execute()
}
