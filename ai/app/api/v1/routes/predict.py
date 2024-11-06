from fastapi import APIRouter, HTTPException, Request, status

from app.api.v1.schemas.telemetry import TelemetryCreate
from services.predict import predict_crop  # type: ignore
from services.logging import logger  # type: ignore

router = APIRouter()


@router.post("/")
async def make_prediction(request: Request, telemetry: TelemetryCreate):
    client_ip = request.client.host
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

        prediction_result = predict_crop(client_ip, input_data)

        return {"device_id": telemetry.device_id, "results": prediction_result}

    except Exception as e:
        logger.error("Prediction failed: %s", str(e))
        raise HTTPException(
            detail=f"Prediction failed: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
