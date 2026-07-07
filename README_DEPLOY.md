# Festrips Chatbot MVP Deployment

## Render Web Service

1. Push this project to a GitHub repository.
2. In Render, create a new Web Service from the repository.
3. Use these settings:
   - Build Command: leave empty
   - Start Command: `npm start`
   - Runtime: Node
4. Add environment variables:
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_BASE_URL=https://openrouter.ai/api/v1`
   - `OPENROUTER_MODEL=openai/gpt-oss-20b:free`
   - `OPENROUTER_SITE_URL=https://YOUR_RENDER_DOMAIN`
   - `OPENROUTER_APP_TITLE=Festrips AI Chatbot MVP`
5. After deployment, open:
   - `/ai/` for the AI chatbot
   - `/button/` for the button FAQ chatbot

Do not commit `.env`.
