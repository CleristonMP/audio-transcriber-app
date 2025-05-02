import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Desabilitar o bodyParser padrão do Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

const allowedMimeTypes = ['audio/webm', 'audio/wav'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const uploadDir = path.join(process.cwd(), 'uploads');
    createUploadDir(uploadDir);

    const form = new IncomingForm({
      uploadDir: uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10 MB
    });

    form.on('fileBegin', (_name, file) => {
      if (!file.mimetype || !allowedMimeTypes.includes(file.mimetype)) {
        throw new Error('Tipo de arquivo não suportado');
      }
      file.newFilename = `${Date.now()}-${file.originalFilename?.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Erro ao processar o formulário:', err);
        res.status(500).json({ error: 'Erro ao processar o upload' });
        return;
      }

      const file = files.file as any;

      if (!file) {
        res.status(400).json({ error: 'Nenhum arquivo enviado' });
        return;
      }

      res.status(200).json({ 
        message: 'Upload bem-sucedido',
        filename: file[0].newFilename 
      });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}

function createUploadDir(uploadDir: string) {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
}