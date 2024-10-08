letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def caesar_encrypt(text: str, shift: int):
    encrypted_text = ""
    text = text.upper().replace(" ", "")
    for char in text:
        if char in letters:
            encrypted_text += letters[(letters.index(char) + shift) % 26]
        else:
            raise ValueError("Invalid character in text")

    return encrypted_text

def caesar_decrypt(text: str, shift: int):
    decrypted_text = ""
    text = text.upper().replace(" ", "")
    for char in text:
        if char in letters:
            decrypted_text += letters[(letters.index(char) - shift) % 26]
        else:
            raise ValueError("Invalid character in text")

    return decrypted_text

def main():
    type = input("Enter type (encrypt/decrypt): ")

    if type not in ["encrypt", "decrypt"]:
        print("Invalid type")
        return

    text = input("Enter text: ")

    if text == "":
        print("Text cannot be empty")
        return

    text = text.upper().replace(" ", "")

    print("Text: ", text)

    for char in text:
        if char not in letters and char != " ":
            print("Invalid character in text")
            return

    shift = int(input("Enter shift: "))

    if shift < 0 or shift > 25:
        print("Shift must be between 0 and 25")
        return

    if type == "decrypt":
        decrypted_text = caesar_decrypt(text, shift)
        print("Decrypted text: ", decrypted_text)
    else:
        encrypted_text = caesar_encrypt(text, shift)
        print("Encrypted text: ", encrypted_text)


if __name__ == "__main__":
    main()




