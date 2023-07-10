# Track Tracker
A simple, customizable widget that displays your currently playing Spotify song. Your unique page can be embedded on your blog, Notion, stream, etc.

Visit [tracktracker.vercel.app](https://tracktracker.vercel.app) to get started!

## Usage
1. Read the [privacy policy](https://tracktracker.vercel.app/privacy).
2. [Log in](https://tracktracker.vercel.app/login) with your Spotify account.
3. Customize your widget and click "FINISH" to save, or "use default" if you would like to proceed with the standard set up.
4. Your page will be available at `https://tracktracker.vercel.app/username` which you can embed anywhere that allows embeds.

I suggest embedding with the following snippet:

```html
<iframe
  src="YOUR-URL-HERE" 
  width="720" 
  height="240" 
  frameborder="0" 
  allowtransparency="true">
</iframe>
```

Here is an example of how I use my widget in my personal Notion workspace:

![Example of Track Tracker in a Notion workspace](/example.png)

## Running Locally
You may want to run this locally if you would like to handle your own rate limits — this app has to comply with Spotify's API rate limits, which means I will have to increase the refresh time as more people use it so widgets will take longer to update. If you want faster updates, you can set this up and essentially host your own version independent of Track Tracker.

You will need a [Spotify Developer](https://developer.spotify.com/) account as well as a [MongoDB](https://www.mongodb.com/) database. Make sure you configure your keys with an `env` file. If you would not like to use MongoDB, you can just edit the code and configure necessary variables yourself.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and proceed as normal. Your page will be available at `http://localhost:3000/username` which you can embed wherever you like.

## Roadmap
1. Improve resizing CSS for people who want really really tiny widgets.
2. Write out a simple guide for running locally without MongoDB, targeted towards non-coders.

## License
This project is distributed under the MIT license. View the [full license](/LICENSE) for more information.

Track Tracker is in no way affiliated with Spotify, who do not endorse or sponsor this project in any way.