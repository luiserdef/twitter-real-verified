# legacy-verified.csv provided by Travisbrown:  https://gist.github.com/travisbrown/b50d6745298cccd6b1f4697e4ec22103

# The outputfile is used inside "./src" file
# This code convert legacy-verified.csv to a new file with the following struture
# var verifiedUsers= [
#     {
#         key:"a",
#         users:["aUser,auserB"]
#     },{
#         key:"J",
#         users:["Jmleer,JuserB"]
#     }
# ]
#...

import csv
import json

with open('legacy-verified.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)
    data = list(reader)

# Create a dictionary to store users by key
users_dict = {}
for row in data:
    key = row[1][0]  # Take the first letter of the second column
    user = row[1] 
    user = user.replace(' ', '')  # Remove any spaces in the username
    if key in users_dict:
        users_dict[key]['users'].append(user)
    else:
        users_dict[key] = {'key': key, 'users': [user]}

# Convert the dictionary to a list of objects and save as JSON
output = json.dumps(list(users_dict.values()), separators=(',', ':'))

with open('verifiedUsers.jsonx', 'w') as outfile:
    outfile.write('var verifiedUsers = ')
    outfile.write(output)