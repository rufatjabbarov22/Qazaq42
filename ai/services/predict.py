from typing import Optional, List
from uuid import UUID

import joblib
import numpy as np

from app.core.config import settings  # type: ignore
from .logging import logger


project_path = settings.PROJECT_PATH
model_path = project_path + "/ml_models/crop_prediction_model.joblib"
label_encoder_path = project_path + "/ml_models/label_encoder.joblib"
clf = joblib.load(model_path)
label_encoder = joblib.load(label_encoder_path)


def predict_crop(request_id: UUID, input_data: List[float]) -> Optional[List[tuple]]:
    try:
        logger.info(
            "Received prediction request with input data: %s",
            input_data,
            extra={"id": request_id}

        )
        data = np.array(input_data).reshape(1, -1)
        probabilities = clf.predict_proba(data)[0]

        top_3_indices = np.argsort(probabilities)[-3:][::-1]
        top_3_crops = [(label_encoder.inverse_transform([i])[0], probabilities[i] * 100) for i in top_3_indices]

        logger.info(
            "Prediction successful, top 3 crops: %s",
            top_3_crops,
            extra={"id": request_id}
        )
        return top_3_crops
    except Exception as e:
        logger.error(
            "Prediction failed with error: %s",
            e,
            extra={"id": request_id}
        )
        return None
