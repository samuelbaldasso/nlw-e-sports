import express, { json, query } from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors({
}));

import { PrismaClient } from '@prisma/client';
import { convertToMin } from "./utils/convert-to-minutes";
import { convertToHours } from "./utils/convert-to-hours";

const prisma = new PrismaClient({
  log: ['query']
});

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return res.json(games);
})

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;
  const ad = await prisma.ad.create({
    data: {
      id: body.id,
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourstart: convertToMin(body.hourstart),
      hourEnd: convertToMin(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })
  return res.status(201).json(ad)
})

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourstart: true,
      hourEnd: true,
    },
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      gameId,
    }
  })
  return res.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourstart: convertToHours(ad.hourstart),
      hourEnd: convertToHours(ad.hourEnd),
    }
  }));
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    where: {
      id: adId,
    }
  })

  return res.json({
    discord: ad.discord
  });
});

app.listen(3001);
