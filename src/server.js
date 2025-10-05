import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import { connectMongoDB } from './db/connectMongoDB.js';
// import { Note } from './models/note.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(notesRoutes);

// app.get('/notes', async (req, res) => {
//   const notes = await Note.find();
//   res.status(200).json({
//     message: 'Retrieved all notes',
//   });
// });

// app.get('/notes/:noteId', (req, res) => {
//   const { noteId } = req.params;
//   res.status(200).json({
//     message: `Retrieved note with ID: ${noteId}`,
//   });
// });

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
