# Prisma -> SSL -> HostedTSDB in node:18 container (Debian) throws SegFault

This does not occur using the Windows binaries.

## Steps to reproduce

1. Sign up for a 30-day trial TimescaleDB hosted instance at https://docs.timescale.com/install/latest/installation-cloud/ (no credit card required)
2. Fill the missing fields in `.env` with the database credentials
3. Add the database port mapping to the exposed ports for web in `docker-compose.yml` (eg: 32341:32341 if tsdb cloud is running on port 32341)
4. Run `docker-compose build`
5. Run `docker-compose up web`
6. Go to http://localhost:3000/

When attempting to connect to the database using Prisma a segfault occurs and the process crashes.

## This issue does not occur when running a db container locally (i.e. without ssl)

To run this locally:

1. Rename .env to something else
2. Rename .local-db.env to .env
3. Rebuild with `docker-compose build`
4. Run both a tsdb and next container with `docker-compose up`
5. Go to http://localhost:3000/

Using both node-pg and Prisma work as expected.
