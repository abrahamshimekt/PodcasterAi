## Getting Started
set up the environment variables
```bash
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CONVEX_URL=
# clerk variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
# 
NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'
HUGGING_FACE_ACCESS_TOKEN=
```
Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Overview
### AI-Powered Podcast Assistant(PodcasterAi)
PodcasterAi leverages cutting-edge generative AI technologies to revolutionize podcast creation, making it faster, smarter, and more engaging for creators:

- AI-Driven Podcast Audio Creation: Generate high-quality podcast audio using advanced Hugging Face Text-to-Speech (TTS) models. Choose from various model types to perfectly suit your podcast’s tone and style.
- Custom Podcast Thumbnails: Create visually stunning and unique podcast thumbnails effortlessly using Pollinations’ state-of-the-art Text-to-Image API.
- Seamless User Management: Powered by Clerk, enjoy secure and intuitive user authentication and profile management.
Effortless Storage & Access: Utilize Convex as a backend-as-a-service platform to store audio files, thumbnail images, and user profile images, ensuring reliable and scalable data management.
- Boosted Productivity for Podcasters: By harnessing generative AI, we save creators time and energy, enabling them to focus on producing content that stands out.
Elevate Podcast Quality: Transform traditional podcasts with AI-enhanced tools, helping podcasters explore creative possibilities and deliver higher-quality content to their audiences.


