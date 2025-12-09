import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { prisma } from '../infrastructure/prisma/client';
import { usersRouter } from '../interfaces/http/users/users.routes';
import { authRouter } from '../interfaces/http/auth/auth.routes';
import { fieldsRouter } from '../interfaces/http/fields/fields.routes';
import { matchTypesRouter } from '../interfaces/http/matchTypes/matchTypes.routes';
import { matchesRouter } from '../interfaces/http/matches/matches.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const now = await prisma.$queryRaw`SELECT NOW()`;
    res.json({ status: 'ok', dbTime: now });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'DB connection failed' });
  }
});

// rutas
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/fields', fieldsRouter);
app.use('/match-types', matchTypesRouter);
app.use('/matches', matchesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
