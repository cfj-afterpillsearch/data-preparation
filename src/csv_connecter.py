import pandas as pd
import glob

csv_files = glob.glob('../data/20240514/*.csv')

for a in csv_files:
  print(a)

data_list = []

for file in csv_files:
  data_list.append(pd.read_csv(file))

df = pd.concat(data_list, axis=0, sort=True)

df.to_csv('../data/20240514/all.csv', index=False)