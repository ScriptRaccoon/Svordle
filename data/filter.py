keys = ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ü', 'ß')

input = open('german.txt', 'r', encoding='utf-8')
output = open('output.js', 'w', encoding='utf-8')
lines = input.readlines()
output.write("module.exports = [")
for line in lines:
    word = line.strip().lower()
    if (len(word) == 5):
        isValid = all(letter in keys for letter in word)
        if isValid:
            output.write('"' + word + '",')
output.write("];")
output.close()
