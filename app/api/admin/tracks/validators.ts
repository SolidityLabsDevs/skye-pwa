import { z } from 'zod';

export const postTrackSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional().nullable(),
  audioCoverImageId: z.string().optional().nullable(),
  audioFileId: z.string().optional().nullable(),
});

export const patchTrackSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(100),
  description: z.string().optional().nullable(),
  audioCoverImageId: z.string().optional().nullable(),
  audioFileId: z.string().optional().nullable(),
});

export type TPostTrackSchema = z.infer<typeof postTrackSchema>;
export type TPatchTrackSchema = z.infer<typeof patchTrackSchema>;
