import { Injectable, Logger } from '@nestjs/common';

export interface LogEntry {
  entityType: string;
  entityId: number;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  changes?: any;
  oldData?: any;
  userId: string;
  timestamp?: Date;
}

@Injectable()
export class CampanhaLogService {
  private readonly logger = new Logger(CampanhaLogService.name);
  private logs: (LogEntry & { id: number; timestamp: Date })[] = [];
  private nextLogId = 1;

  async logOperation(entry: LogEntry): Promise<void> {
    try {
      const logEntry = {
        ...entry,
        id: this.nextLogId++,
        timestamp: new Date(),
      };

      this.logs.push(logEntry);
      
      this.logger.log(
        `Log registrado - ${entry.operation} em ${entry.entityType} ID ${entry.entityId} por ${entry.userId}`
      );
    } catch (error) {
      this.logger.error(`Erro ao registrar log: ${error.message}`);
      // Não lança erro para não interromper a operação principal
    }
  }

  async getLogsByEntity(entityType: string, entityId: number): Promise<any[]> {
    try {
      const entityLogs = this.logs
        .filter(log => log.entityType === entityType && log.entityId === entityId)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

      this.logger.log(`Encontrados ${entityLogs.length} logs para ${entityType} ID ${entityId}`);
      return entityLogs;
    } catch (error) {
      this.logger.error(`Erro ao buscar logs: ${error.message}`);
      throw error;
    }
  }

  async getAllLogs(): Promise<any[]> {
    try {
      const allLogs = this.logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      this.logger.log(`Total de logs no sistema: ${allLogs.length}`);
      return allLogs;
    } catch (error) {
      this.logger.error(`Erro ao buscar todos os logs: ${error.message}`);
      throw error;
    }
  }

  async getLogsByUser(userId: string): Promise<any[]> {
    try {
      const userLogs = this.logs
        .filter(log => log.userId === userId)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

      this.logger.log(`Encontrados ${userLogs.length} logs para usuário ${userId}`);
      return userLogs;
    } catch (error) {
      this.logger.error(`Erro ao buscar logs por usuário: ${error.message}`);
      throw error;
    }
  }

  async getLogsByDateRange(startDate: Date, endDate: Date): Promise<any[]> {
    try {
      const rangeLogs = this.logs
        .filter(log => log.timestamp >= startDate && log.timestamp <= endDate)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

      this.logger.log(`Encontrados ${rangeLogs.length} logs no período especificado`);
      return rangeLogs;
    } catch (error) {
      this.logger.error(`Erro ao buscar logs por data: ${error.message}`);
      throw error;
    }
  }
}