#!/opt/render/project/src/.venv/bin/python

import pandas as pd


try:
    DATASET_PATH = "./Datasets/air-quality-india.csv"

    # print("Hello from Python!")

    df = pd.read_csv(DATASET_PATH)

    df_elem_sum = df.to_numpy().sum()

    print("Sum of all the elements(numeric) in the CSV file is: ", df_elem_sum)
except Exception as ex:
    print(ex)
