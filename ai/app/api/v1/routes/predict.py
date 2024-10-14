from fastapi import APIRouter, HTTPException


from ai.app.api.v1.schemas.telemetry import TelemetryCreate
from ai.services.predict import predict

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

        prediction_result = predict(input_data)

        return {"device_id": telemetry.device_id, "prediction": prediction_result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
