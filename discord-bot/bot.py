import discord  # Import the discord.py library to interact with Discord
import requests  # Import requests to make HTTP requests (for memes)
import json      # Import json to handle JSON data
import os        # Import os to access environment variables

# Function to get a random meme from the meme-api
def get_meme():
  response = requests.get('https://meme-api.com/gimme')  # Make a GET request to the meme API
  json_data = json.loads(response.text)  # Parse the JSON response
  return json_data['url']  # Return the meme image URL

# Function to get a random joke from JokeAPI
def get_joke():
  response = requests.get('https://v2.jokeapi.dev/joke/Any?safe-mode')  # Make a GET request to the joke API
  json_data = json.loads(response.text)  # Parse the JSON response
  
  # Check if it's a two-part joke (setup and delivery) or a single joke
  if json_data['type'] == 'twopart':
    return f"{json_data['setup']}\n\n{json_data['delivery']}"
  else:
    return json_data['joke']

# Function to get a random dog picture
def get_dog():
  response = requests.get('https://dog.ceo/api/breeds/image/random')  # Make a GET request to the dog API
  json_data = json.loads(response.text)  # Parse the JSON response
  return json_data['message']  # Return the dog image URL

# Function to get a random cat picture
def get_cat():
  response = requests.get('https://api.thecatapi.com/v1/images/search')  # Make a GET request to the cat API
  json_data = json.loads(response.text)  # Parse the JSON response
  return json_data[0]['url']  # Return the cat image URL

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
    # If the message starts with $joke, send a random joke
    if message.content.startswith('$joke'):
      await message.channel.send(get_joke())
    # If the message starts with $dog, send a random dog picture
    if message.content.startswith('$dog'):
      await message.channel.send(get_dog())
    # If the message starts with $cat, send a random cat picture
    if message.content.startswith('$cat'):
      await message.channel.send(get_cat())

# Set up the bot's permissions (intents)
intents = discord.Intents.default()  # Start with default permissions
intents.message_content = True       # Allow the bot to read message content

# Create an instance of your bot client with the specified intents
client = MyClient(intents=intents)

# Start the bot using your token (replace 'Your Token Here' with your actual token)
client.run(os.getenv('DISCORD_TOKEN'))  # Replace with your own token