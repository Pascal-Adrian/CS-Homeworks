# Laboratory Work No. 1 - Caesar's Cypher

---

## Pascal Adrian, FAF-221

---

### Objectives:

1. Understand and implement Caesar's Cypher algorithm.
2. Implement a program that encrypts and decrypts a text using Caesar's Cypher algorithm.
3. Understand and implement Caesar's Cypher algorithm with a permutation key.
4. Implement a program that encrypts and decrypts a text using Caesar's Cypher algorithm with a permutation key.q

---

### Task 1.1 - Basic Caesar's Cypher Algorithm:

#### Implementation description:

Given the fact that we were not allowed to use any encoding such as `ASCII` or `Unicode`, I have used a simple
string containing all the letters of the alphabet.

```python
alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
```

The algorithm is simple. For each letter in the input text, we add the corresponding letter from the alphabet string
by using the formula:

$$
    c = e_k(x)= x+k (mod{\ n})
$$

with the following code:

```python
encrypted_text += letters[(letters.index(char) + shift) % 26]
```

For decryption, we use the formula:

$$
    m = d_k(x)= x-k (mod{\ n})
$$

with the following code:

```python
decrypted_text += letters[(letters.index(char) - shift) % 26]
```

### Task 1.2 - Caesar's Cypher Algorithm with Permutation Key:

#### Implementation description:

Given the same conditions I also have used a simple string containing all the letters of the alphabet.

To ensure that the permutation key is stripped of duplicates and is of the same length as the alphabet, I have used the
following code:

```python
new_letters = permutation.upper() + letters
new_letters = "".join(dict.fromkeys(new_letters))
```

The ```dict.fromkeys()``` function is used to remove duplicates from the string and preserve the order of the characters, 
because the keys of a dictionary are unique and python dictionaries preserve the insertion order of the keys.

The algorithm is similar to the basic Caesar's Cypher algorithm, but the alphabet string now starts with the permutation
key. The encryption and decryption formulas are the same as in the basic Caesar's Cypher algorithm.

### Conclusion:
The Caesar's Cypher algorithm is one of the simplest encryption algorithms. It is easy to implement and understand, but
it is also easy to break using a brute force. The algorithm can be improved by
using a permutation key, but it is still not secure enough for modern applications, because it is vulnerable to
frequency analysis attacks. Caesar's Cypher is a good starting point for learning about encryption algorithms, but it
should not be used in practice.