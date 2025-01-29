import { uploadImage } from '@/app/functions/upload-image';
import { isRight, unwrapEither } from '@/shared/either';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const uploadImageRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/uploads',
    {
      schema: {
        summary: 'Upload an image',
        consumes: ['multipart/form-data'],
        tags: ['uploads'],

        response: {
          201: z
            .object({
              url: z.string().describe('URL of the uploaded image'),
            })
            .describe('File uploaded successfully'),
          400: z.object({
            message: z.string().describe('File is required'),
          }),
        },
      },
    },
    async (request, reply) => {
      const uploadedFile = await request.file({
        limits: {
          fileSize: 1024 * 1024 * 2, // 2MB
        },
      });

      if (!uploadedFile) {
        return reply.status(400).send({
          message: 'File is required',
        });
      }

      const result = await uploadImage({
        fileName: uploadedFile.filename,
        contentType: uploadedFile.mimetype,
        contentStream: uploadedFile.file,
      });

      if (uploadedFile.file.truncated) {
        return reply.status(400).send({
          message: 'File size limits reached',
        });
      }

      if (isRight(result)) {
        const { url } = unwrapEither(result);

        return reply.status(201).send({ url });
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case 'InvalidFileFormatError':
          return reply.status(400).send({
            message: error.message,
          });
      }
    }
  );
};
