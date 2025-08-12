import discord  # Import the discord.py library to interact with Discord
import requests  # Import requests to make HTTP requests (for memes)
import json      # Import json to handle JSON data
import os        # Import os to access environment variables

# Function to get a random meme from the meme-api
def get_meme():
  response = requests.get('https://meme-api.com/gimme')  # Make a GET request to the meme API
  json_data = json.loads(response.text)  # Parse the JSON response
  return json_data['url']  # Return the meme image URL

# Create a custom Discord client by subclassing discord.Client
class MyClient(discord.Client):
  # This function runs when the bot has connected to Discord
  async def on_ready(self):
    print('Logged on as {0}!'.format(self.user))

  # This function runs every time a message is sent in a channel the bot can see
  async def on_message(self, message):
    # Ignore messages sent by the bot itself
    if message.author == self.user:
      return
    # If the message starts with $meme, send a meme in the channel
    if message.content.startswith('$meme'):
      await message.channel.send(get_meme())

# Set up the bot's permissions (intents)
intents = discord.Intents.default()  # Start with default permissions
intents.message_content = True       # Allow the bot to read message content

# Create an instance of your bot client with the specified intents
client = MyClient(intents=intents)

# Start the bot using your token (replace 'Your Token Here' with your actual token)
client.run(os.getenv('DISCORD_TOKEN'))  # Replace with your own token