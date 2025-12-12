import pandas as pd
import pickle

# Read dataset
data = pd.read_csv('p5/data.csv')

# Slicing Data
slice1 = data.iloc[0:399,:]
slice2 = data.iloc[400:800,:]
slice3 = data.iloc[801:1200,:]
slice4 = data.iloc[1201:,:]

def mapper(data):
    mapped = []
    for index, row in data.iterrows():
        mapped.append((row['quality'], row['volatile acidity']))
    return mapped

map1 = mapper(slice1)
map2 = mapper(slice2)
map3 = mapper(slice3)
map4 = mapper(slice4)

shuffled = {
    3.0: [],
    4.0: [],
    5.0: [],
    6.0: [],
    7.0: [],
    8.0: [],
}

# Shuffle data by quality
for mapped_data in [map1, map2, map3, map4]:
    for item in mapped_data:
        shuffled[item[0]].append(item[1])

# Saving shuffled data
with open('shuffled.pkl', 'wb') as file:
    pickle.dump(shuffled, file)

print("Data has been mapped. Now, run reducer.py to reduce the contents in shuffled.pkl file.")


""" prac 8
# Loads data
dataset = spark.read.format("libsvm").load("data/mllib/sample_kmeans_data.txt")

# Train a k-means model
kmeans = KMeans().setK(2).setSeed(1)
model = kmeans.fit(dataset)

# Evaluate clustering by computing Within Set Sum of Squared Errors
wssse = model.computeCost(dataset)
print("Within Set Sum of Squared Errors = " + str(wssse))

# Show the result
centers = model.clusterCenters()
print("Cluster Centers:")
for center in centers:
    print(center)
# spark-submit kmeans_example.py # spark-submit kmeans_example.py 
"""


"""
# =====================================================
# PRACTICAL 3 – Data Visualization Using Python
# =====================================================

# Import libraries
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset (example: crime.csv or any CSV with numeric columns)
# Replace with your file name
data = pd.read_csv("crime.csv")

# Display first 5 rows
print(data.head())

# -----------------------------------------------------
# 1. SCATTER PLOT
# -----------------------------------------------------
plt.figure(figsize=(8, 5))
sns.scatterplot(x=data["Murder"], y=data["Assault"], color="blue")
plt.title("Scatter Plot: Murder vs Assault")
plt.xlabel("Murder")
plt.ylabel("Assault")
plt.grid(True)
plt.show()

# -----------------------------------------------------
# 2. LINE PLOT
# -----------------------------------------------------
# If dataset has a 'Year' column
plt.figure(figsize=(8, 5))
plt.plot(data["Year"], data["Robbery"], marker='o')
plt.title("Line Plot: Robbery over Years")
plt.xlabel("Year")
plt.ylabel("Robbery")
plt.grid(True)
plt.show()

# -----------------------------------------------------
# 3. HISTOGRAM
# -----------------------------------------------------
plt.figure(figsize=(8, 5))
plt.hist(data["Robbery"].dropna(), bins=10, edgecolor='black')
plt.title("Histogram: Robbery Distribution")
plt.xlabel("Robbery Cases")
plt.ylabel("Frequency")
plt.show()

# -----------------------------------------------------
# 4. BAR PLOT
# -----------------------------------------------------
plt.figure(figsize=(10, 6))
sns.barplot(x="Year", y="Robbery", data=data)
plt.title("Bar Plot: Robbery By Year")
plt.xlabel("Year")
plt.ylabel("Robbery")
plt.xticks(rotation=45)
plt.show()

# -----------------------------------------------------
# 5. SCATTER PLOT (Population vs Car Theft)
# -----------------------------------------------------
plt.figure(figsize=(8, 5))
plt.scatter(data["Population"], data["CarTheft"], color='red')
plt.title("Population vs Car Theft")
plt.xlabel("Population")
plt.ylabel("Car Theft")
plt.grid(True)
plt.show()

# -----------------------------------------------------
# 6. SAVE ANY PLOT (Example)
# -----------------------------------------------------
plt.figure(figsize=(8,5))
sns.scatterplot(x=data["Murder"], y=data["Assault"])
plt.title("Saved Plot Example")
plt.savefig("murder_assault_plot.png", dpi=150, bbox_inches='tight')

print("Visualization completed successfully!")

"""