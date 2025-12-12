import pickle

# Load shuffled data
with open('shuffled.pkl', 'rb') as file:
    shuffled = pickle.load(file)

def reduce(shuffled_dict):
    reduced = {}
    for quality, acidity_values in shuffled_dict.items():
        if len(acidity_values) > 0:
            reduced[quality] = sum(acidity_values) / len(acidity_values)
        else:
            reduced[quality] = 0  # Handle division by zero case
    return reduced

# Get the reduced data
final = reduce(shuffled)

# Output results
print("Average volatile acidity in different classes of wine: ")
for quality, avg_acidity in final.items():
    print(f"{quality}: {avg_acidity}")
