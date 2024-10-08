letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def two_key_caesar_encrypt(text: str, shift: int, permutation: str):
    new_letters = permutation.upper() + letters
    new_letters = "".join(dict.fromkeys(new_letters))
    print(new_letters)

    encrypted_text = ""
    text = text.upper().replace(" ", "")

    for char in text:
        if char in new_letters:
            encrypted_text += new_letters[(new_letters.index(char) + shift) % 26]
        else:
            raise ValueError("Invalid character in text")

    return encrypted_text


def two_key_caesar_decrypt(text: str, shift: int, permutation: str):
    new_letters = permutation.upper() + letters
    new_letters = "".join(dict.fromkeys(new_letters))

    decrypted_text = ""
    text = text.upper().replace(" ", "")

    for char in text:
        if char in new_letters:
            decrypted_text += new_letters[(new_letters.index(char) - shift) % 26]
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

    permutation = input("Enter permutation: ")

    permutation = permutation.upper().replace(" ", "")

    if permutation == "" and len(permutation) < 7:
        print("Permutation cannot be empty")
        return

    for char in permutation:
        if char not in letters:
            print("Invalid character in permutation", char)
            return

    if type == "decrypt":
        decrypted_text = two_key_caesar_decrypt(text, shift, permutation)
        print("Decrypted text: ", decrypted_text)
    else:
        encrypted_text = two_key_caesar_encrypt(text, shift, permutation)
        print("Encrypted text: ", encrypted_text)


if __name__ == "__main__":
    main()