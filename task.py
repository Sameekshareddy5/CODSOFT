def chatbot_response(user_input):
    user_input = user_input.lower()  
    if "hello" in user_input or "hi" in user_input:
        return "Hello! How can I assist you today?"
    
    elif "how are you" in user_input:
        return "I'm just a chatbot, but I'm doing great! How about you?"
    
    elif "what is your name" in user_input:
        return "I'm your helpful chatbot!"
    
    elif "bye" in user_input or "goodbye" in user_input:
        return "Goodbye! Have a great day!"
    
    elif "help" in user_input:
        return "Sure! I can help you with your queries. What do you need assistance with?"
    
    elif "services" in user_input:
        return "I can assist with providing information, answering questions, and more. How can I help you today?"
    
    else:
        return "I'm sorry, I don't understand that. Can you rephrase your question?"

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        print("Chatbot: Goodbye!")
        break
    response = chatbot_response(user_input)
    print(f"Chatbot: {response}")
