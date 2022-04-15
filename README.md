# remix-shows

This is a tv show guide web application built with [Remix](https://remix.run/) and [TMDb API](https://developers.themoviedb.org/3/getting-started/introduction).

**Live demo is [here](https://remix-shows.netlify.app/).**

## ✅ Features

- List popular shows
- Filter by genre
- Sorting options
- Search
- View rating, images, videos etc. of shows, seasons and episodes
- List similar shows

## 💻 Tech Stack

- Language: [TypeScript](https://www.typescriptlang.org/)
- Framework: [Remix](https://remix.run/)
- API: [TMDb API](https://developers.themoviedb.org/3/getting-started/introduction)
- UI Library: [Chakra UI](https://chakra-ui.com/)
- Styling: [Emotion](https://emotion.sh/docs/introduction)
- Linting: [ESLint](https://eslint.org/)
- Code Formatting: [Prettier](https://prettier.io/)
- Deployment: [Netlify](https://www.netlify.com/)

## ⌨️ Development

To start development, we should get our API key from [here](https://developers.themoviedb.org/3/getting-started/introduction) first.  
After that, we create a `.env` file and set our environment variables:

```
API_KEY=your_api_key_here
```

Install our packages:

```
npm install
```

And when the installation is completed, we can run the app by:

```
npm run dev
```

and it will start at `http://localhost:3000`.
