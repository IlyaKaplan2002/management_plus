import { DataSource } from 'typeorm';
import { getDbConfig } from '@config/index';

const mainConnection: DataSource = new DataSource(getDbConfig());

export default class DatabaseService {
  public static connect = async () => {
    try {
      DatabaseService._connection = await mainConnection.initialize();
      console.log('Database connected');
    } catch (err) {
      console.log('Failed to connect database server ', err);
      throw err;
    }
  };

  private static _schema: string = getDbConfig().schema;

  public static get schema(): string {
    return DatabaseService._schema;
  }

  private static _isPostgres: boolean = process.env.APP_DB_TYPE === 'postgres';

  public static get isPostgres(): boolean {
    return DatabaseService._isPostgres;
  }

  private static _connection: DataSource;
  /**
   * Get database connection.
   *
   * @returns {Object} database connection.
   */
  public static get connection(): DataSource {
    return DatabaseService._connection;
  }
}
