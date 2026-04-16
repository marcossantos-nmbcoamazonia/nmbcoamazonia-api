import { Injectable, Logger } from '@nestjs/common'
import { MongoClient, Db } from 'mongodb'

interface CacheDoc {
  _id: string
  analysis: string
  timestamp: string
  date: string
}

@Injectable()
export class AnalysisService {
  private readonly logger = new Logger(AnalysisService.name)
  private db: Db | null = null

  private async getDb(): Promise<Db> {
    if (this.db) return this.db
    const client = new MongoClient(process.env.DB_MONBO ?? '')
    await client.connect()
    this.db = client.db('analysis_cache')
    return this.db
  }

  async get(dataKey: string, date?: string): Promise<CacheDoc | null> {
    try {
      const db = await this.getDb()
      const targetDate = date ?? new Date().toISOString().split('T')[0]
      const id = `${targetDate}:${dataKey}`
      const doc = await db.collection<CacheDoc>('analyses').findOne({ _id: id as any })
      if (!doc) return null
      this.logger.log(`Cache HIT: ${id}`)
      return doc
    } catch (err) {
      this.logger.error('Erro ao buscar cache:', err)
      return null
    }
  }

  async set(dataKey: string, analysis: string): Promise<void> {
    try {
      const db = await this.getDb()
      const today = new Date().toISOString().split('T')[0]
      const id = `${today}:${dataKey}`
      const timestamp = new Date().toISOString()

      await db.collection('analyses').updateOne(
        { _id: id as any },
        { $set: { analysis, timestamp, date: today } },
        { upsert: true }
      )
      this.logger.log(`Cache SAVED: ${id}`)
    } catch (err) {
      this.logger.error('Erro ao salvar cache:', err)
    }
  }
}
