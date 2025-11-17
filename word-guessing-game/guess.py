import random

# Word banks for different difficulty levels
easy_words = ['cat', 'dog', 'sun', 'moon', 'star', 'tree', 'fish', 'bird']
medium_words = ['pineapple', 'skibidi', 'love', 'ohio', 'tricks', 'guitar', 'coffee', 'banana']
hard_words = ['encyclopedia', 'rhinoceros', 'kaleidoscope', 'Mediterranean', 'extraordinary', 'philosophical']

# Main game loop to allow playing again
play_again = True

while play_again:
  # Let player choose difficulty
  print('\n' + '='*50)
  print('Welcome to the Word Guessing Game!')
  print('='*50)
  print('\nChoose your difficulty level:')
  print('1. Easy (short words, 12 attempts)')
  print('2. Medium (medium words, 10 attempts)')
  print('3. Hard (long words, 8 attempts)')

  difficulty = input('\nEnter 1, 2, or 3: ')

  # Set word bank and attempts based on difficulty
  if difficulty == '1':
      word_bank = easy_words
      attempts = 12
      print('\nYou chose Easy mode!')
  elif difficulty == '3':
      word_bank = hard_words
      attempts = 8
      print('\nYou chose Hard mode!')
  else:
      word_bank = medium_words
      attempts = 10
      print('\nYou chose Medium mode!')

  word = random.choice(word_bank)
  guessedWord = ['_'] * len(word)
  guessed_letters = []

  #we need to create a while loop so that the player can have multiple guesses

  while attempts > 0:
    print('\nCurrent word: ' + ' '.join(guessedWord))
    if guessed_letters:
      print('Guessed letters: ' + ', '.join(guessed_letters))
    print('Attempts remaining: ' + str(attempts))

    guess = input('\nGuess a letter: ').lower()

    # Check if already guessed
    if guess in guessed_letters:
      print('You already guessed that letter!')
      continue

    guessed_letters.append(guess)

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
      break
      
  if attempts == 0 and '_' in guessedWord:
    print('\nYou\'ve run out of attempts! The word was: ' + word)
  
  # Ask if player wants to play again
  print('\n' + '='*50)
  response = input('Would you like to play again? (yes/no): ').lower()
  if response not in ['yes', 'y']:
    play_again = False
    print('\nThanks for playing! Goodbye!')