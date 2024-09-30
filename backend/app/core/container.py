from wireup import container, initialize_container

from app import core, repositories, services
from config.settings import Settings


def wire():
    container.register(Settings)

    initialize_container(container, service_modules=[
        core,
        repositories,
        services,
    ])
