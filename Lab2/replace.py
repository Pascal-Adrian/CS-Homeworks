from Lab2.utils import load_text, replace_in_text

if __name__ == '__main__':
    text = load_text("text.txt").upper()
    decoded_text = replace_in_text(text, "V", "E")
    decoded_text = replace_in_text(decoded_text, "W", "T")
    decoded_text = replace_in_text(decoded_text, "Q", "H")
    decoded_text = replace_in_text(decoded_text, "T", "A")
    print(decoded_text)