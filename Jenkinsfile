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
                        credentialsId: 'cloudnova-dockerhub-21',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    powershell '''
                        if ($env:DOCKERHUB_USER -ne "sara567") {
                            throw "Docker Hub username does not match."
                        }

                        if ([string]::IsNullOrWhiteSpace($env:DOCKERHUB_TOKEN)) {
                            throw "Docker Hub token is missing."
                        }

                        if ($env:DOCKERHUB_TOKEN -ne $env:DOCKERHUB_TOKEN.Trim()) {
                            throw "Docker Hub token has leading or trailing whitespace."
                        }

                        Write-Output "Docker Hub credential checks passed."
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'cloudnova-dockerhub-21',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    powershell '''
                        $ErrorActionPreference = "Stop"

                        $env:DOCKERHUB_TOKEN |
                            docker login --username $env:DOCKERHUB_USER --password-stdin

                        if ($LASTEXITCODE -ne 0) {
                            throw "Docker Hub login failed."
                        }

                        docker push $env:DOCKER_IMAGE

                        if ($LASTEXITCODE -ne 0) {
                            throw "Docker Hub image push failed."
                        }

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
                    curl.exe -f http://localhost:3002/health
                    if errorlevel 1 exit /b 1
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
