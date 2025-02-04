# Документация по Музыкальному приложению

## Установка и запуск

- Склонируем репозиторий с помощью:

```
git clone <ssh_of_the_repo>
```

- Установим все зависимости:

```
pnpm i
```

- Добавии файл .env, внутри пропишем следующее, заменяя значения на нужные в зависимости от вашего случая:

```
PORT=8000

DB_HOST='your_host'
DB_PORT=3306
DB_USER='your_user_name'
DB_PASSWORD='your_password'
DB_DATABASE='your_database'
```

- Запустим сервер:

```
pnpm run dev
```

## Эндпоинты:

### /artists

- `GET` - получает список всех исполнителей. Обычного GET запроса будет достаточно, ничего не нужно прописывать в теле или хэдере.
- `POST` - создает нового артиста.
  Пример запроса:

```
{
  "name": "NAKISO",
  "info": "japanese vocaloid producer",
  "image": "file"
}
```

Из всех этих полей, только поле для имени `name` является обязательным.

При этом вместо `"file"` подставляем файл типа `Express.Multer.File`, это можно сделать на клиенте с помощью типа `File` который отправляется внутри `FormDataю`.

Пример ответа:

```
{
  "name": "NAKISO",
  "info": "japanese vocaloid producer",
  "image": "generated_unique_name_of_your_image",
  "id": 4
}
```

Где вместо `"generated unique name of your image"` будет автоматически сгенерированная уникальная строка от вашей картинки, которую можно увидеть если зайти на `server_url/uploads/unique_image_string`.

### /artists/:id/publish

- `POST` - создает публикует артиста.

вместо id подставляется id артиста

### /artists/published

- `GET` - получает список опубликованных артистов.

### /albums

- `GET` - получает список всех альбомов. Обычного GET запроса будет достаточно, ничего не нужно прописывать в теле или хэдере. Можно передать `query parameters`:

  - `artist` - принимает ID исполнителя, и возвращает все альбомы от этого исполнителя. Пример:

  ```
  http://localhost:8000/albums?artist=1
  ```

  Тогда вам вернутся все альбомы от исполнителя с ID равным 1.

- `POST` - создает новый альбом.
  Пример запроса:

```
{
  "title": "Shinee 4th MINI album",
  "artistId": "3",
  "releaseYear": "2012",
  "image": "file",
}
```

Из всех этих полей, поля `title`, `releaseYear`, `artistId` является обязательным.

Пример ответа:

```
{
  "title": "Shinee 4th MINI album",
  "artistId": "3",
  "releaseYear": "2012",
  "image": "generated_unique_name_of_your_image",
  "id": 5
}
```

При этом принцип работы с картинкой такой же как и у POST запроса `/artists`.

### /albums/:id/publish

- `POST` - создает публикует альбома.

вместо id подставляется id альбома

### /albums/published

- `GET` - получает список опубликованных альбомов.

### /albums/:id

- `GET` - получает информацию о конкретном альбоме, включая информацию о его исполнителе, в зависимости от переданного `ID` в URL. Обычного GET запроса будет достаточно, ничего не нужно прописывать в теле или хэдере.

### /tracks

- `GET` - получает список всех трэков. Обычного GET запроса будет достаточно, ничего не нужно прописывать в теле или хэдере. Можно передать `query parameters`:

  - `album` - принимает ID альбома, и возвращает все трэки из этого альбома. Пример:

  ```
  http://localhost:8000/tracks?album=2
  ```

  Тогда вам вернутся все трэки из альбома с ID равным 2.

  - `artist` - принимает ID исполнителя, и возвращает все альбомы от этого исполнителя. Пример:

  ```
    http://localhost:8000/albums?artist=1
  ```

  Тогда вам вернутся все трэки от исполнителя с ID равным 1.

- `POST` - создает новый трэк.
  Пример запроса:

```
{
  "title": "Sorrows",
  "duration": "3:23",
  "albumId": "2"
}
```

Все указанные поля являются обязательными

Пример ответа:

```
{
  "title": "Sorrows",
  "duration": "3:23",
  "albumId": "2",
  "id": 7
}
```

### /tracks/:id/publish

- `POST` - публикует трэк.

вместо id подставляется id трэка

### /tracks/published

- `GET` - получает список опубликованных трэков.

### /users

- `POST` - создает/регистрирует нового юзера, возвращает новый токен для юзера.
  Пример запроса:

```
{
  "username": "TAEMIN",
  "password": "qwertYYYY"
}
```

Все указанные поля являются обязательными

Пример ответа:

```
{
  "id": 5,
  "username": "TAEMIN",
  "token": "34c48d75-1125-486f-9320-f1fbb555d928"
}
```

### /users/sessions

- `POST` - логирует(login, sign in) юзера, если данные верные - возвращает новый токен для юзера.
  Пример запроса:

```
{
  "username": "TAEMIN",
  "password": "qwertYYYY"
}
```

Все указанные поля являются обязательными

Пример ответа:

```
{
  "id": 5,
  "token": "319f3ef7-93f5-4b9e-a6b8-c9339a8875a7"
}
```

### /users/logout

- `DELETE` - используется что бы выйти из аккаунта(logout) юзера. Генерирует юзеру (который берется из токена в `headers`) новый токен.
  Пример запроса:

Хэдер запроса:

```
Authorization: "your_token"
```

В хэдере в `"authorization"` должен быть указан токен который является строкой (string), который можно получить при регистрации или вхождении в аккаунт.
При этом тело запроса пустое.
Ничего не возвращает.

### /track_history

- `POST` - создает новую трэк историю, которая содержит в себе записи о том какой юзер прослушал какой трек в какое время.
  Пример запроса:

Хэдер запроса:

```
{
  "authorization": "319f3ef7-93f5-4b9e-a6b8-c9339a8875a7"
}
```

В хэдере в `"authorization"` должен быть указан токен, который можно получить при регистрации или вхождении в аккаунт.

Тело запроса:

```
{
  "trackId": "1"
}
```

Все указанные поля являются обязательными

Пример ответа:

```
{
  "trackId": "1",
  "userId": 5,
  "datetime": "1/17/2025, 6:48:04 AM",
  "id": 6
}
```

В случае неправильного токена в хэдере, прийдет ошибка `403 Forbidden`.
Если trackId будет указан неверно, то есть если трэка с таким ID не существует, прийдет ошибка `400 Bad Request`.

## Фикстуры (seeding)

Есть возможность создать шаблонные данные на сервере. Например для проверки работы клиента.

Генерация данных, происходит по комманде `seed`:

```
pnpm run seed
```

Эта команда генерирует 2 новых поля для каждой из 5 сущностей (Artist, Album, Track, User, TrackHistory).
Seeding происходит в следующей последовательности:

- User
- Artist
- Album
- Track
- TrackHistory

### User

она заполняет User такими данными:

```
user.password = 'password';
user.username = faker.internet.username();
```

То есть password всегда будет 'password' (string), а username будет рандомным значением сгенерированным с помощью faker (тоже string).
Пример одного такого юзера:

```
password: 'password',
username: 'Ethan_Ankunding99'
```

### Artist

она заполняет Artist такими данными:

```
artist.name = faker.music.artist();
artist.info = faker.music.genre();
```

То есть name будет именем артиста сгенерированное с помощью faker (string), а info будет сгенерированным жанром (string).
Пример одного такого артиста:

```
name: 'Loud Luxury',
info: 'Hip Hop'
```

### Album

она заполняет Album такими данными:

```
album.title = faker.music.album();
album.releaseYear = faker.number.int({ min: 1000, max: 2025 }).toString();
album.artistId = meta;
```

То есть title будет названием альбома сгенерированное с помощью faker(string), а releaseYear будет сгенерированным числом между 1000 и 2025(string). meta это будет id первого найденного артиста в репозитории (при этом это не значит что id = 1), (string).
Пример одного такого альбома:

```
title: 'Ao Vivo No Ibirapuera',
releaseYear: '1297',
artistId: '43'
```

### Track

она заполняет Track такими данными:

```
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

То есть title будет названием трэка сгенерированное с помощью faker(string), duration будет сгенерированным числом которое далее будет отформатировано что бы выглядеть как минуты:секунды (string), albumId meta это будет id первого найденного альбома в репозитории (при этом это не значит что id = 1), (string), trackNumber будет числом которое увеличивается в зависимости от counter (number).
Пример одного такого трэка:

```
title: 'Lady Marmalade (Voulez-Vous Coucher Aver Moi Ce Soir?)',
duration: '11:17',
albumId: '19',
trackNumber: 1
```

### TrackHistory

она заполняет TrackHistory такими данными:

```

  trackHistory.trackId = meta.randomTrackId;
  trackHistory.userId = meta.randomUserId;
  trackHistory.datetime = faker.date.past().toLocaleString();
```

То есть datetime будет временем-датой TrackHistory сгенерированное с помощью faker(string), trackId и userId будут передаваться, они оба типа string и будут браться первые в репозитории (что не значит что у них будет id = 1)
Пример одного такого TrackHistory:

```
trackId: '21',
userId: '75',
datetime: '1/30/2025, 5:37:47 PM'
```
