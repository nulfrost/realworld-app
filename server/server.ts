import app from 'index';
import { secrets } from 'config';

app.listen(secrets.port, () =>
  console.info('Started server on: http://localhost:4000')
);
