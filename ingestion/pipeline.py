from os.path import join, dirname
import pandas as pd
import numpy as np
from pymongo import MongoClient
import re

"""

Use this file to read in the project nurse data, perform text pre-processing
and store data in mongo. The fields we're interested in storing are:

  'How many years of experience do you have?' -> experience,
  'What's your highest level of education?' -> education,
  'What is your hourly rate ($/hr)?' -> salary,
  'Department' -> department,
  'What (City, State) are you located in?' -> location,
  'What is the Nurse - Patient Ratio?' -> patientNurseRatio

Check server/models/Record.js for an example of the schema.

"""

def main():
    """Read from a non-standardized list of nurses information and collect hourly salary and
    nurse to patient ratio in a mongodb database. Then, use that information to calculate
    a best guess for average salary given that the data had to be cleaned to some degree."""
    client = MongoClient('mongodb://localhost:27017/')
    db = client['clipboardinterview']
    df = pd.read_csv(join(dirname(__file__), '../data/projectnurse.csv'))
    # drop collection before inserting anything
    db.nurses.delete_many({})
    # access the salaries and ratios, combine them into tuples to group nurses
    salaries = df['What is your hourly rate ($/hr)?']
    ratio = df['What is the Nurse - Patient Ratio?']
    zipped = list(zip(salaries, ratio))
    # track how much of the dataset is filtered out, try and minimize
    lost = 0
    for nurse in zipped:
        salary = nurse[0]
        if re.search('[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?', salary):
            salary = float(re.search('[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?', salary).group(0).replace(',',''))
            # reject weekly/bi weekly salaries because of overlap, reject salaries below minimum wage as typos
            # convert yearly range salaries into hourly, assuming an average of 36 hour work week with paid leave
            if 10 < salary and salary < 130:
                salary = salary
            elif (40000 < salary):
                salary = salary / (36 * 52)
            else:
                lost += 1
                continue
            ratio = str(nurse[1])
            # reject all non-numeric values, and also make the best attempt to capture 1:n and n:1 ratios. as a
            # last effort, also capture general numbers, and hope that the person's random typing produced
            # a number first that represents their patient to nurse ratio (such as "6 to 7 to 1")
            search_colon = re.search('1:\d+', ratio)
            search_reverse_colon = re.search('\d+:1', ratio)
            search_numeric = re.search('\d+', ratio)
            if search_colon:
                ratio = int(search_colon.group(0)[-2:].replace(':', '0'))
            elif search_reverse_colon:
                ratio = int(search_reverse_colon.group(0).split(':')[0])
            elif search_numeric:
                if 0 < int(search_numeric.group(0)) < 20:
                    ratio = int(search_numeric.group(0))
                else:
                    lost += 1
                    continue
            else:
                lost += 1
                continue
            db.nurses.insert_one({
                'salary': salary,
                'patientNurseRatio': ratio
            })
        else:
            lost += 1
    print(f"number of nurses not entered into db: {lost}")
    pipe = [{'$group': {'_id': None, 'total': {'$sum': '$salary'}}}]
    for count in db.nurses.aggregate(pipeline = pipe):
        total_salary = count['total']
    number_of_nurses = db.nurses.count()
    print('average hourly salary: ', round(total_salary / number_of_nurses, 2))

if __name__ == "__main__":
    main()

