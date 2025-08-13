import random  # Import the random module to select a random fortune

# Function to get a random fortune from a list
def get_fortune():
    fortunes = [
        "You will have a great day!",  # Positive fortune
        "Something unexpected will happen soon.",  # Mysterious fortune
        "You will achieve your goals.",  # Motivational fortune
        "Happiness is coming your way.",  # Happy fortune
        "You will make a new friend."  # Social fortune
    ]
    return random.choice(fortunes)  # Pick and return a random fortune

print("🥠 Welcome to the Fortune Cookie!")  # Welcome message

# Main loop: keeps giving fortunes until the user says no
while True:
    input("Press Enter to crack your cookie...")  # Wait for user to press Enter
    fortune = get_fortune()  # Get a random fortune
    print("\n✨ Your fortune:", fortune)  # Show the fortune
    
    again = input("\nWant another? (y/n): ").strip().lower()  # Ask if user wants another
    if again != "y":  # If not 'y', exit the loop
        print("Good luck! 🍀")  # Goodbye message
        break  # End the program
