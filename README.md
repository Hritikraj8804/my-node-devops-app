# 🚀 My Node DevOps App

A lightweight Node.js + Express web application designed as a demonstration project for modern DevOps practices, including containerization, CI/CD pipelines, container orchestration, and GitOps.

---

## 📂 Project Structure

```text
my-node-devops-app/
├── .github/
│   └── workflows/
│       └── main.yaml         # GitHub Actions CI/CD pipeline configuration
├── public/
│   ├── index.html            # App home page front-end
│   └── style.css             # Responsive custom stylesheets
├── .dockerignore             # Specifies files/directories ignored by Docker builds
├── .gitignore                # Specifies untracked files to ignore in Git
├── Dockerfile                # Docker container specification
├── docker-compose.yml        # Docker Compose configuration for local/staging deployments
├── index.js                  # Main Express server script
├── Jenkinsfile               # Jenkins declarative pipeline configuration
├── k8s-deployment.yaml       # Kubernetes deployment and service manifests
├── package.json              # Project dependencies and startup scripts
└── README.md                 # Project documentation (this file)
```

---

## 🛠️ Features

- **Express Backend:** Powered by Node.js and Express.
- **Environment Management:** Managed environment variables using `dotenv`.
- **Responsive Frontend:** Simple, clean responsive interface in `/public`.
- **Docker Ready:** Multistage-like minimal container using `node:18-alpine`.
- **Multiple CI/CD Options:** Includes configuration files for **GitHub Actions** and **Jenkins CI/CD** automation pipelines.
- **Kubernetes Ready:** Ready-to-deploy deployment and service specifications for Kubernetes clusters.

---

## 🚀 Getting Started

### Prerequisites

To run this application locally, you will need:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (installed with Node.js)
- *Optional:* [Docker](https://www.docker.com/) / [Docker Compose](https://docs.docker.com/compose/)

### Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hritikraj8804/my-node-devops-app.git
   cd my-node-devops-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   ```

4. **Start the application:**
   ```bash
   npm start
   ```
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🐳 Containerization with Docker

This project is fully dockerized to ensure consistent runs across different environments.

### Dockerfile Details
The `Dockerfile` builds a production-ready image using `node:18-alpine` as its base.

### Building & Running with Docker

1. **Build the image:**
   ```bash
   docker build -t DOCKER_USERNAME/my-node-app:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 3000:3000 --name my-node-app DOCKER_USERNAME/my-node-app:latest
   ```

### Running with Docker Compose
To start the application locally using Docker Compose:
```bash
docker compose up -d
```
This runs the application in detached mode and maps port `3000` of the container to port `3000` on the host machine.

---

## 🔄 CI/CD Pipelines

### 1. GitHub Actions Workflow
The pipeline defined in [main.yaml](file:///.github/workflows/main.yaml) triggers on every push to the `main` branch.

- **Build & Push Job:** Checks out the code, sets up Node.js v18, installs dependencies, builds the Docker image, and pushes it to Docker Hub using the secrets `DOCKER_USERNAME` and `DOCKER_PASSWORD`.
- **Deployment Job:** Triggers post-build and connects to the target EC2 host using SSH keys (`EC2_HOST`, `EC2_USER`, `SSH_PRIVATE_KEY`). It navigates to the app directory, pulls the latest Docker image, and brings up the updated containers via `docker compose`.

### 2. Jenkins Pipeline
A declarative Jenkins pipeline is provided in the [Jenkinsfile](file:///Jenkinsfile).

- **Clone Code:** Pulls code from the main repository branch.
- **Build Docker Image:** Builds the Docker image labeled with the Jenkins build number (`%DOCKER_USER%/%IMAGE_NAME%:%TAG%`).
- **Push Docker Image:** Authenticates to Docker Hub using credential ID `docker-hub-cred` and pushes both the build-tagged image and the `latest` tag.



## ☸️ Kubernetes Deployment

Deploy the app to your Kubernetes cluster (e.g., Minikube, EKS, GKE) using the manifest in [k8s-deployment.yaml](file:///k8s-deployment.yaml).

### Manifest Components
1. **Deployment (`my-node-app-deployment`):**
   - Configured with `1` replica.
   - Resource requests: `64Mi` memory / `100m` CPU.
   - Resource limits: `128Mi` memory / `200m` CPU.
2. **Service (`my-node-app-service`):**
   - Type: `LoadBalancer`
   - Maps external Port `80` to target container Port `3000`.

### Deploying to Kubernetes

Apply the manifest using `kubectl`:
```bash
kubectl apply -f k8s-deployment.yaml
```

To verify the deployment:
```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

