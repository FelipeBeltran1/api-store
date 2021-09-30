import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // constructor(
  //   @Inject('PG') private clientPg: Client,
  //   @Inject('TASKS') private tasks: any[],
  //   @Inject(config.KEY) private configService: ConfigType<typeof config>,
  // ) {}
  getHello(): string {
    // console.log(this.tasks);
    // const apiKey = this.configService.apiKey;
    // const dbName = this.configService.database;
    return `Hello World!`;
  }

  // getTasks() {
  //   return new Promise((resolve, reject) => {
  //     this.clientPg.query('SELECT * FROM tasks', (err, res) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(res.rows);
  //     });
  //   });
  // }
}
