import joblib
import numpy as np

model_path = '../ml_models/random_forest_model.joblib'
model = joblib.load(model_path)


def predict(input_data):
    """ Function to predict the output using the trained model. """
    input_array = np.array(input_data).reshape(1, -1)
    prediction = model.predict(input_array)
    return prediction[0]
