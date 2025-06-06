import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'
import { questionRepository } from '@server/repositories/questionRepository'
import { TRPCError } from '@trpc/server'
import { tipRepository } from '@server/repositories/tipRepository'
import { userTipRepository } from '@server/repositories/userTipRepository'
import { noteSchema } from '../../entities/note'
import { noteRepository } from '../../repositories/noteRepository'
import { handleLevelUp, getTip } from './utils/handleLevelUp'

export default authenticatedProcedure
  .use(
    provideRepos({
      userRepository,
      questionRepository,
      noteRepository,
      tipRepository,
      userTipRepository,
    })
  )
  .input(noteSchema.pick({ answer1: true, answer2: true }))
  .mutation(async ({ input, ctx: { repos, authUser } }) => {
    const { answer1, answer2 } = input

    const user = await repos.userRepository.findById(authUser.id)
    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      })
    }

    const questions = await repos.questionRepository.findByLevel(user.level)
    if (questions.length !== 2) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Questions not found for this level',
      })
    }

    const newNote = await repos.noteRepository.create({
      answer1,
      answer2,
      userId: authUser.id,
      levelId: user.level,
      question1: questions[0].content,
      question2: questions[1].content,
    })

    const notesCount = await repos.noteRepository.countNotesByUser(authUser.id)

    await handleLevelUp(user.level, authUser.id, notesCount, repos)

    const tip = await getTip(repos, notesCount, authUser.id)

    return {
      message: 'Note has been submitted successfully',
      note: newNote,
      ...(tip ? { tip } : {}),
    }
  })
