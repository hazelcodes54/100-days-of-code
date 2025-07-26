import random

word_bank = ['pineapple', 'skibidi', 'love', 'ohio', 'tricks']
word = random.choice(word_bank)

guessedWord = ['_'] * len(word)
attempts = 10

#we need to create a while loop so that the player can have multiple guesses

while attempts > 0:
  print('\nCurrent word: ' + ' '.join(guessedWord))

guess = input('Guess a letter: ').lower()

if guess in word:
  for i in range(len(word)):
    if word[i] == guess:
      guessedWord[i] = guess
    print('Great guess!')

  else:
    attempts -= 1
    print('Wrong guess! Attempts left: ' + str(attempts))

    #we need a condition that results in a loss for the player when they run out of attempts and reveal the correct word. 
  
  if '_' not in guessedWord:
    print('\nCongratulations!! You guessed the word: ' + word) 
    
if attempts == 0 and '_' in guessedWord:
  print('\nYou\'ve run out of attempts! The word was: ' + word)