# Music App API Documentation

## Installation and Launch

- Clone the repository:

```bash
git clone <ssh_of_the_repo>
```

- Install the dependencies:

```bash
pnpm i
```

- Add a `.env` file with the following contents, replacing the placeholder values with the
  appropriate values for your setup:

```env
PORT=8000

DB_HOST='your_host'
DB_PORT=3306
DB_USER='your_user_name'
DB_PASSWORD='your_password'
DB_DATABASE='your_database'
```

- Start the server:

```bash
pnpm run dev
```

## Endpoints

### `/artists`

- `GET` — Retrieves a list of all artists. A standard GET request is sufficient; you do not need to
  include anything in the request body or headers.
- `POST` — Creates a new artist. Example request:

```json
{
	"name": "NAKISO",
	"info": "japanese vocaloid producer",
	"image": "file"
}
```

Of these fields, only `name` is required.

Replace `"file"` with a file of type `Express.Multer.File`. On the client side, this can be done
using the `File` type, which is sent inside `FormData`.

Example response:

```json
{
	"name": "NAKISO",
	"info": "japanese vocaloid producer",
	"image": "generated_unique_name_of_your_image",
	"id": 4
}
```

The value `"generated_unique_name_of_your_image"` is an automatically generated unique string for
your image. You can view the image by navigating to:

`server_url/uploads/unique_image_string`

### `/artists/:id/publish`

- `POST` — Publishes an artist.

Replace `id` with the artist's ID.

### `/artists/published`

- `GET` — Retrieves a list of published artists.

### `/albums`

- `GET` — Retrieves a list of all albums. A standard GET request is sufficient; you do not need to
  include anything in the request body or headers. You can also pass query parameters:
  - `artist` — Accepts an artist's ID and returns all albums by that artist. Example:

```text
http://localhost:8000/albums?artist=1
```

This returns all albums belonging to the artist whose ID is `1`.

- `POST` — Creates a new album. Example request:

```json
{
	"title": "Shinee 4th MINI album",
	"artistId": "3",
	"releaseYear": "2012",
	"image": "file"
}
```

The `title`, `releaseYear`, and `artistId` fields are required.

Example response:

```json
{
	"title": "Shinee 4th MINI album",
	"artistId": "3",
	"releaseYear": "2012",
	"image": "generated_unique_name_of_your_image",
	"id": 5
}
```

Images work in the same way as they do in the `POST /artists` request.

### `/albums/:id/publish`

- `POST` — Publishes an album.

Replace `id` with the album's ID.

### `/albums/published`

- `GET` — Retrieves a list of published albums.

### `/albums/:id`

- `GET` — Retrieves information about a specific album, including information about its artist. The
  album is selected using the `ID` passed in the URL. A standard GET request is sufficient; you do
  not need to include anything in the request body or headers.

### `/tracks`

- `GET` — Retrieves a list of all tracks. A standard GET request is sufficient; you do not need to
  include anything in the request body or headers. You can also pass query parameters:
  - `album` — Accepts an album's ID and returns all tracks from that album. Example:

```text
http://localhost:8000/tracks?album=2
```

This returns all tracks from the album whose ID is `2`.

- `artist` — Accepts an artist's ID and returns all tracks by that artist. Example:

```text
http://localhost:8000/albums?artist=1
```

This returns all tracks by the artist whose ID is `1`.

- `POST` — Creates a new track. Example request:

```json
{
	"title": "Sorrows",
	"duration": "3:23",
	"albumId": "2"
}
```

All the fields listed above are required.

Example response:

```json
{
	"title": "Sorrows",
	"duration": "3:23",
	"albumId": "2",
	"id": 7
}
```

### `/tracks/:id/publish`

- `POST` — Publishes a track.

Replace `id` with the track's ID.

### `/tracks/published`

- `GET` — Retrieves a list of published tracks.

### `/users`

- `POST` — Creates/registers a new user and returns a new token for that user. Example request:

```json
{
	"username": "TAEMIN",
	"password": "qwertYYYY"
}
```

All the fields listed above are required.

Example response:

```json
{
	"id": 5,
	"username": "TAEMIN",
	"token": "34c48d75-1125-486f-9320-f1fbb555d928"
}
```

### `/users/sessions`

- `POST` — Logs a user in (signs them in). If the credentials are correct, a new token is returned
  for that user. Example request:

```json
{
	"username": "TAEMIN",
	"password": "qwertYYYY"
}
```

All the fields listed above are required.

Example response:

```json
{
	"id": 5,
	"token": "319f3ef7-93f5-4b9e-a6b8-c9339a8875a7"
}
```

### `/users/logout`

- `DELETE` — Logs a user out. It generates a new token for the user identified by the token in the
  request headers. Example request header:

```http
Authorization: "your_token"
```

The `Authorization` header must contain the user's token as a string. This token is obtained when
the user registers or logs in. The request body must be empty. This endpoint does not return
anything.

### `/track_history`

- `POST` — Creates a new track-history record. It records which user listened to which track and
  when.

Request header:

```json
{
	"authorization": "319f3ef7-93f5-4b9e-a6b8-c9339a8875a7"
}
```

The `authorization` header must contain the token obtained when the user registers or logs in.

Request body:

```json
{
	"trackId": "1"
}
```

All the fields listed above are required.

Example response:

```json
{
	"trackId": "1",
	"userId": 5,
	"datetime": "1/17/2025, 6:48:04 AM",
	"id": 6
}
```

If the token in the header is invalid, the server returns a `403 Forbidden` error. If `trackId` is
invalid — that is, if no track with that ID exists — the server returns a `400 Bad Request` error.

## Fixtures (Seeding)

You can generate sample data on the server, for example, to test how the client works.

Run the following command to generate the data:

```bash
pnpm run seed
```

This command generates two new records for each of the five entities: `Artist`, `Album`, `Track`,
`User`, and `TrackHistory`.

Seeding takes place in the following order:

- User
- Artist
- Album
- Track
- TrackHistory

### User

The `User` entity is populated with the following data:

```js
user.password = 'password';
user.username = faker.internet.username();
```

This means that the password is always `'password'` (a string), while the username is a random
string generated using `faker`.

Example user:

```js
password: 'password',
username: 'Ethan_Ankunding99'
```

### Artist

The `Artist` entity is populated with the following data:

```js
artist.name = faker.music.artist();
artist.info = faker.music.genre();
```

The `name` is an artist name generated using `faker` (a string), and `info` is a generated music
genre (a string).

Example artist:

```js
name: 'Loud Luxury',
info: 'Hip Hop'
```

### Album

The `Album` entity is populated with the following data:

```js
album.title = faker.music.album();
album.releaseYear = faker.number.int({ min: 1000, max: 2025 }).toString();
album.artistId = meta;
```

The `title` is an album title generated using `faker` (a string). The `releaseYear` is a randomly
generated number between 1000 and 2025, converted to a string.

`meta` is the ID of the first artist found in the repository. This does not necessarily mean that
the ID is `1`. The value is a string.

Example album:

```js
title: 'Ao Vivo No Ibirapuera',
releaseYear: '1297',
artistId: '43'
```

### Track

The `Track` entity is populated with the following data:

```js
const durationMinutes = faker.number.int({ min: 1, max: 12 }).toString();
const durationSeconds = faker.number.int({ min: 1, max: 59 }).toString();
let duration;
if (durationSeconds.length < 2) {
	duration = `${durationMinutes}:0${durationSeconds}`;
} else {
	duration = `${durationMinutes}:${durationSeconds}`;
}

track.title = faker.music.songName();
track.duration = duration;
track.albumId = meta;
track.trackNumber = trackNumberCounter++;
```

The `title` is a track name generated using `faker` (a string). The `duration` is generated as a
number and then formatted as minutes:seconds (a string).

`meta` is the ID of the first album found in the repository. This does not necessarily mean that the
ID is `1`; the value is a string.

`trackNumber` is a number that increments according to the counter.

Example track:

```js
title: 'Lady Marmalade (Voulez-Vous Coucher Aver Moi Ce Soir?)',
duration: '11:17',
albumId: '19',
trackNumber: 1
```

### TrackHistory

The `TrackHistory` entity is populated with the following data:

```js
trackHistory.trackId = meta.randomTrackId;
trackHistory.userId = meta.randomUserId;
trackHistory.datetime = faker.date.past().toLocaleString();
```

The `datetime` value is a date and time generated using `faker` (a string). `trackId` and `userId`
are both strings and are taken from the first records found in the repository. This does not
necessarily mean that either ID is `1`.

Example track-history record:

```js
trackId: '21',
userId: '75',
datetime: '1/30/2025, 5:37:47 PM'
```
