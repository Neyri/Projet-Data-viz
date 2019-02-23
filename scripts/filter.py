import json
import datetime

to_delete = ['IN_VEHICLE', 'IN_FOUR_WHEELER_VEHICLE',
             'IN_TWO_WHEELER_VEHICLE']
to_merge = {
    'ON_FOOT': 'WALKING',
    'TILTING': 'STILL'
}

all_activities = ['IN_ROAD_VEHICLE', 'UNKNOWN', 'IN_RAIL_VEHICLE', 'WALKING', 'STILL', 'ON_BICYCLE', 'RUNNING']


file = '../data/Historique des positions.json'


with open(file) as f:
    data = json.load(f)

data = data['locations']

data_to_keep = []
for d in data:
    if 'activity' in d.keys():
        timestamp = int(d['timestampMs'])
        date = datetime.datetime.fromtimestamp(timestamp / 1e3)
        if date.year >= 2018:
            data_to_keep.append(d)
            # Filter the activities
            activity = d['activity'][0]['activity']
            activity_final = []
            existing_activities = []
            types = []
            sum = 0
            for act in activity:
                if act['type'] not in to_delete:
                    if act['type'] in to_merge.keys():
                        act['type'] = to_merge[act['type']]
                    if act['type'] not in types:
                        activity_final.append(act)
                        types.append(act['type'])
                        sum += act['confidence']
            for act in activity_final:
                act['confidence'] = act['confidence'] / sum * 100
                existing_activities.append(act['type'])
            missing_activities = list(set(all_activities) - set(existing_activities))
            for missing_activity in missing_activities:
                activity_final.append({'type': missing_activity, 'confidence': 0})
            d['activity'] = activity_final

with open('../data/data.json', 'w') as outfile:
    json.dump(data_to_keep, outfile)


# for d in data:
#     if 'activity' in d.keys():
#         activity = d['activity'][0]['activity']
#         for act in activity:
#             if act['type'] not in activities:
#                 activities.append(act['type'])
