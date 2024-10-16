from fastapi import APIRouter, HTTPException

from app.api.v1.schemas.telemetry import TelemetryCreate  # type: ignore
from services.predict import predict_crop  # type: ignore
from services.logging import logger  # type: ignore

router = APIRouter()


@router.post("/predict")
async def make_prediction(telemetry: TelemetryCreate):
    try:
        input_data = [
            telemetry.n,
            telemetry.p,
            telemetry.k,
            telemetry.temperature,
            telemetry.ph,
            telemetry.soil_humidity,
            telemetry.air_humidity,
            telemetry.light_intensity,
            telemetry.light_duration,
            telemetry.co2,
            telemetry.o2
        ]

        prediction_result = predict_crop(input_data)

        return {"device_id": telemetry.device_id, "prediction": prediction_result}

    except Exception as e:
        logger.error("Prediction failed: %s", str(e))
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
