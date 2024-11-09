import random

from app.core.config import PREFIX_TYPE_MAP


def generate_serial_id(prefix: str) -> str:
    if prefix not in PREFIX_TYPE_MAP:
        raise ValueError(f"Invalid serial_id prefix '{prefix}'. Cannot determine device type.")
    return f"{prefix}{str(random.randint(100000, 999999))}"


def generate_pin() -> str:
    return str(random.randint(100000, 999999))
