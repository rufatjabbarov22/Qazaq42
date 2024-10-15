import joblib
import numpy as np

model_path = '../ml_models/crop_prediction_model.joblib'
label_encoder_path = '../ml_models/label_encoder.joblib'
clf = joblib.load(model_path)
label_encoder = joblib.load(label_encoder_path)


def predict_crop(input_data):
    data = np.array(input_data).reshape(1, -1)
    prediction = clf.predict(data)
    predicted_crop = label_encoder.inverse_transform(prediction)
    return predicted_crop[0]
