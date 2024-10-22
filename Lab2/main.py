from Lab2.utils import load_text, count_frequency, save_frequency, load_frequency

if __name__ == '__main__':
    original_text = load_text("text.txt")
    frequency = count_frequency(original_text)
    print(frequency)
    save_frequency(frequency, "frequency.json")
    english_frequency = load_frequency("english_frequency.json")





