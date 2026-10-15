```groovy
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'sara567/cloudnova:1.0'
        LOCAL_IMAGE  = 'cloudnova:1.0'
        CONTAINER_NAME = 'cloudnova-deployed'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out CloudNova source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                bat 'npm ci'
            }
        }

        stage('Run Jest Tests') {
            steps {
                echo 'Running application tests...'
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building the CloudNova Docker image...'
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
                        if "%DOCKERHUB_USER%"=="" (
                            echo ERROR: Docker Hub username is empty.
                            exit /b 1
                        )
                        if "%DOCKERHUB_TOKEN%"=="" (
                            echo ERROR: Docker Hub token is empty.
                            exit /b 1
                        )
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
                        echo Logging in to Docker Hub...

                        docker logout
                        if errorlevel 1 exit /b 1

                        echo %DOCKERHUB_TOKEN% | docker login ^
                            --username "%DOCKERHUB_USER%" ^
                            --password-stdin

                        if errorlevel 1 (
                            echo Docker Hub login failed.
                            exit /b 1
                        )

                        echo Pushing CloudNova image...
                        docker push