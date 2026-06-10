pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-node-app"
        DOCKER_USER = "hritikraj8804"   // your dockerhub username
        TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Hritikraj8804/my-node-devops-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat """
                docker build -t %DOCKER_USER%/%IMAGE_NAME%:%TAG% .
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-cred',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    bat """
                    docker login -u %USER% -p %PASS%

                    docker push %DOCKER_USER%/%IMAGE_NAME%:%TAG%

                    docker tag %DOCKER_USER%/%IMAGE_NAME%:%TAG% %DOCKER_USER%/%IMAGE_NAME%:latest
                    docker push %DOCKER_USER%/%IMAGE_NAME%:latest
                    """
                }
            }
        }
    }
}
