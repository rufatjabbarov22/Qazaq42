from fastapi import HTTPException, status


class DeviceAlreadyAssigned(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Device is already assigned"
        )


class DeviceAlreadyExists(HTTPException):
    def __init__(self, serial_id: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Device with Serial ID {serial_id} already exists"
        )


class DeviceCreationFailed(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Device creation failed due to an unexpected error"
        )


class DeviceNotFound(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Device not found"
        )


class InvalidSerialIDOrPin(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Serial ID or PIN"
        )
