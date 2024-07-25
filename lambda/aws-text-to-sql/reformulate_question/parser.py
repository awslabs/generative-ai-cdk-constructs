import re

def extract_reformulated_question(text):
    # Define the regular expression pattern
    pattern = r'<response>\s*(.*?)\s*</response>'
    
    # Search for the pattern in the text
    match = re.search(pattern, text, re.DOTALL)
    
    # If a match is found, return the extracted substring
    if match:
        return match.group(1)
    else:
        return None