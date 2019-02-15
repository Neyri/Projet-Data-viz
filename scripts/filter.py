import json
import datetime

file = 'data\Historique des positions.json'

with open(file) as f:
    data = json.load(f)

data = data['locations']

data_to_keep = []
for d in data:
    if 'activity' in d.keys():
        # print(d)
        timestamp = int(d['timestampMs'])
        date = datetime.datetime.fromtimestamp(timestamp / 1e3)
        if date.year >= 2018:
            data_to_keep.append(d)

with open('data\data.json', 'w') as outfile:
    json.dump(data_to_keep, outfile)
