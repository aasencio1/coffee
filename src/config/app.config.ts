export default () =>  ({
    environment: process.env.NODE_ENV || 'development',
    database:
    {
      host: process.env.DATABASE_HOST,
      port: parseInt (process.env.DATABASE_PORT,10) || 5432,
    },
  });
  /*
     Return the configuration objects
     Process.env WILL contain the full result key / variable pairs
     Two properties
     - environment
     - database
  */
