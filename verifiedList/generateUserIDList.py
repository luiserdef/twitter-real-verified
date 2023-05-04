# legacy-verified.csv provided by Travisbrown:  https://gist.github.com/travisbrown/b50d6745298cccd6b1f4697e4ec22103

# Output files is used inside "./src"
# This code convert legacy-verified.csv to two new files with the following structure
# var verifiedUsersID= [
#     {
#         key:"12",
#         usersId:["12","12320","12594872"]
#     },{
#         key:"13",
#         usersId:["13","13029","13041","13124","13194"]
#     }
# ]

# Output files: verifiedUsersID1.js and verifiedUsersID2.js

import csv
import json

with open('legacy-verified.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)
    data = list(reader)

# Create a dictionary to store users by key
users_dict = {}
for row in data:
    key = row[0][:2]  # Take the first two numbers of the first column (id)
    user_id = row[0]
    if key in users_dict:
        users_dict[key]['users'].append(user_id)
    else:
        users_dict[key] = {'key': key, 'users': [user_id]}

# Convert the dictionary to a list of objects
users_list = list(users_dict.values())

# Split the list in half
half_len = len(users_list) // 2
first_half = users_list[:half_len]
second_half = users_list[half_len:]

# Convert each half to JSON and save as separate files
output1 = json.dumps(first_half, separators=(',', ':'))
with open('verifiedUsersID1.js', 'w') as outfile1:
    outfile1.write('var verifiedUsers_ID_1 = ')
    outfile1.write(output1)

output2 = json.dumps(second_half, separators=(',', ':'))
with open('verifiedUsersID2.js', 'w') as outfile2:
    outfile2.write('var verifiedUsers_ID_2 = ')
    outfile2.write(output2)