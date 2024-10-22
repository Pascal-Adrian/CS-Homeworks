import re
import json

def load_text(filename: str) -> str:
    with open(filename, "r") as file:
        return file.read()


def generate_frequency_dict() -> dict:
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return {letter: 0 for letter in letters}


def count_frequency(text: str) -> dict:
    text = re.sub(r"[^a-zA-Z]", "", text).upper()
    frequency = generate_frequency_dict()
    for letter in text:
        frequency[letter] += 1

    for letter in frequency:
        frequency[letter] = round(frequency[letter] / len(text), 5)
    return frequency


def replace_in_text(text: str, letter: str, replacement: str) -> str:
    text = text.replace(letter.upper(), replacement.lower())

    return text


def save_frequency(frequency: dict, filename: str):
    with open(filename, "w") as file:
        json.dump(frequency, file)


def load_frequency(filename: str) -> dict:
    with open(filename, "r") as file:
        return json.load(file)