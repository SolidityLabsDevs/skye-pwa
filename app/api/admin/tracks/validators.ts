import { z } from 'zod';

export const postTrackSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional().nullable(),
  audioCoverImageId: z.string().optional().nullable(),
  audioFileId: z.string().optional().nullable(),

  about_your_script: z.string().optional().nullable(),
  how_it_works: z.string().optional().nullable(),
  what_you_will_feel: z.string().optional().nullable(),
  how_to_listen_for_maximum_effect: z.string().optional().nullable(),

  show_for_answers_question_1: z.array(z.string()),
  show_for_answers_question_2: z.array(z.string()),
  show_for_answers_question_3: z.array(z.string()),
  show_for_answers_question_4: z.array(z.string()),
  show_for_answers_question_5: z.array(z.string()),
  show_for_answers_question_6: z.array(z.string()),
  show_for_answers_question_7: z.array(z.string()),
  show_for_answers_question_8: z.array(z.string()),
  show_for_answers_question_9: z.array(z.string()),
});

export const patchTrackSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(100),
  description: z.string().optional().nullable(),
  audioCoverImageId: z.string().optional().nullable(),
  audioFileId: z.string().optional().nullable(),

  about_your_script: z.string().optional().nullable(),
  how_it_works: z.string().optional().nullable(),
  what_you_will_feel: z.string().optional().nullable(),
  how_to_listen_for_maximum_effect: z.string().optional().nullable(),
});

export type TPostTrackSchema = z.infer<typeof postTrackSchema>;
export type TPatchTrackSchema = z.infer<typeof patchTrackSchema>;
