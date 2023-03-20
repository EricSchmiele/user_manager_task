## Description

[Payever Task](https://docs.google.com/document/d/1cCe0isSg_iWil_2lajnJf4fJeU4bsDN2h9K2UpT_Btg/edit#).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# initiate
$ npm init
$ npm install
$ npm run build
# initiate db
$ npx prisma generate
# initiate rabbit_mq
$ sudo docker compose up

# development: watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Commentary

The avatar image files are saved in ./avatars/ for the unit-tests and in ./dist/avatars for the real application.

I assumed that the DELETE route should both remove the avatar file saved in the system and the user instance in the DB

The email functionality is commented because of the need for a password.

The rabbit_mq functionality is commented because I was having issues of connection between the rabbitmq server and the api. I'm sure it's simple to solve, but after 3 hours without being able to change the outcome, I figure I would need personal help (talking to another dev with a fresh mind over the problem).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Eric F Schmiele](https://github.com/EricSchmiele)

## License

Nest is [MIT licensed](LICENSE).
