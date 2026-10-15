
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'sara567/cloudnova:1.0'
        LOCAL_IMAGE = 'cloudnova:1.0'
        CONTAINER_NAME = 'cloudnova-deployed'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Jest Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %LOCAL_IMAGE% .'
                bat 'docker tag %LOCAL_IMAGE% %DOCKER_IMAGE%'
            }
        }

        stage('Verify Docker Hub Credentials') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    bat '''
                        @echo off
                        if "%DOCKERHUB_USER%"=="" exit /b 1
                        if "%DOCKERHUB_TOKEN%"=="" exit /b 1
                        echo Docker Hub credentials are available.
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    bat '''
                        @echo off
                        docker logout
                        echo %DOCKERHUB_TOKEN% | docker login --username "%DOCKERHUB_USER%" --password-stdin
                        if errorlevel 1 exit /b 1
                        docker push %DOCKER_IMAGE%
                        if errorlevel 1 exit /b 1
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy Container') {
            steps {
                bat '''
                    @echo off
                    docker rm -f %CONTAINER_NAME% 2>NUL
                    docker run -d --name %CONTAINER_NAME% --restart unless-stopped -p 3002:3000 %DOCKER_IMAGE%
                    if errorlevel 1 exit /b 1
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                bat '''
                    @echo off
                    docker ps --filter "name=%CONTAINER_NAME%"
                    echo Website: http://localhost:3002
                    echo Health endpoint: http://localhost:3002/health
                '''
            }
        }
    }

    post {
        success {
            echo 'CloudNova pipeline completed successfully.'
        }
        failure {
            echo 'CloudNova pipeline failed. Check Console Output.'
        }
        always {
            echo 'CloudNova CI/CD pipeline finished.'
        }
    }
}
