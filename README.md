# Qazaq Project

Welcome to the Qazaq Project! This platform provides cutting-edge solutions for agricultural optimization by analyzing telemetry data and offering crop recommendations tailored to specific farming conditions. Our goal is to empower farmers with actionable insights that improve productivity and sustainability.

## Features

- **Telemetry Data Analysis**: Processes sensor data from farming devices to understand soil quality, climate, and other critical parameters.
- **AI-Powered Recommendations**: Suggests the best crops based on real-time data and predictive modeling.
- **Device Management**: Allows administrators to manage unassigned devices and track their assignments to users.
- **Secure API Integration**: Provides a dedicated API for seamless integration with AI services, ensuring secure and accurate communication.
- **Crop Report Generation**: Automatically generates detailed reports with the top 3 recommended crops and their probabilities, helping farmers make informed decisions.


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/samiribrh/qazaq.git
   cd qazaq
   ```

2. Install the dependencies:
   ```bash
   poetry install
   ```
   
3. Set up the environment variables.


4. Run the application:
   ```bash
   docker-compose up --build
   ```

## Usage

Once the application is running, access the API documentation at:

```
http://localhost:8000/docs
```

This interactive documentation provides a detailed overview of all endpoints, including request and response examples.

## CI/CD Pipeline

This project includes a fully automated CI/CD pipeline powered by GitHub Actions. The pipeline ensures code quality, runs tests, and deploys the application. Key features include:

- **Dependency Management**: Uses Poetry to manage and lock dependencies.
- **Deployment**: Builds and deploys the application to the specified environment.

To contribute effectively, ensure all tests pass locally and your code adheres to the style guide before opening a pull request.

## Contribution Guidelines

We appreciate contributions from the community! To contribute:

1. Fork the repository to your GitHub account.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
    ```
   
3. Make your changes and commit them with a descriptive message:
    ```bash
    git add .
    git commit -m "Add feature: your-feature-name"
    ```
   
4. Push your changes to the new branch:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request on the main repository.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

For further questions or support, feel free to reach out at `samiribrahimov2277@gmail.com`. Thank you for contributing to the Qazaq Project!
