Hi, this is the repo for the Tournament of Lights. The Tournament of lights is a [Next.js](https://nextjs.org/) app that lets users sign in on their phones, select a user name and two games they want to play and then compete in the tournament.

To start, first go to [server repo](https://github.com/jonahminihan/tourney-of-lights-server) and clone that. Run `npm i`, then `node index.js` to start it up!

With the server started you can run `npm run dev` to start the tournemant server. The app will start on 3000! Currently, the IP address is hardcoded, so you'll need to go edit it in the app to have the app display and use the correct IP. Once you do that the intro sequence should play (hit replay if you missed it), and you should see this image:

![alt text](/repo-images/Intro.png?raw=true)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
