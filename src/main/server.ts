import { TypeORMHelper } from '../external/database/postgresql/orms/typeorm/helpers/typeorm-helper';
import env from './config/env';

TypeORMHelper.instance
  .connect()
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`)
    );
  })
  .catch(console.error);
