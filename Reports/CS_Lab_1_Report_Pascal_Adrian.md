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

