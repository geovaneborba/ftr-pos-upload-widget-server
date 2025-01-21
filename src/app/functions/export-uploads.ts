import { PassThrough, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { db, pg } from '@/infra/db';
import { schema } from '@/infra/db/schemas';
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage';
import { type Either, makeRight } from '@/shared/either';
import { stringify } from 'csv-stringify';
import { ilike } from 'drizzle-orm';
import { z } from 'zod';

const exportUploadsInput = z.object({
  searchQuery: z.string().optional(),
});

type ExportUploadsInput = z.infer<typeof exportUploadsInput>;

type ExportUploadsOutput = {
  reportUrl: string;
};

export async function exportUploads(
  input: ExportUploadsInput
): Promise<Either<never, ExportUploadsOutput>> {
  const { searchQuery } = exportUploadsInput.parse(input);

  const { sql, params } = db
    .select()
    .from(schema.uploads)
    .where(
      searchQuery ? ilike(schema.uploads.name, `%${searchQuery}%`) : undefined
    )
    .toSQL();

  const cursor = pg.unsafe(sql, params as string[]).cursor(2);

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      {
        key: 'id',
        header: 'ID',
      },
      {
        key: 'name',
        header: 'Name',
      },
      {
        key: 'remote_url',
        header: 'URL',
      },
      {
        key: 'created_at',
        header: 'Uploaded At',
      },
    ],
  });

  const fileName = `${new Date().toISOString()}-uploads.csv`;
  const uploadToStorageStream = new PassThrough();

  const convertCSVToPipeline = pipeline(
    cursor, // cursor é um stream que retorna os dados do banco de dados
    new Transform({
      objectMode: true, // permite processar objetos e não apenas buffers
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk); // repassando os pedaços de dados para o próximo stream nesse caso um registro do banco de dados
        }
        callback();
      },
    }),
    csv, // transformando o registro do banco de dados em csv
    uploadToStorageStream // stream que vai receber os dados processados e convertidos em csv
  );

  const uploadToStorage = uploadFileToStorage({
    folder: 'downloads',
    fileName,
    contentType: 'text/csv',
    contentStream: uploadToStorageStream,
  });

  const [{ url }] = await Promise.all([uploadToStorage, convertCSVToPipeline]);

  return makeRight({
    reportUrl: url,
  });
}
