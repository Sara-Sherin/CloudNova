
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Sara-Sherin/CloudNova.git'
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
                bat 'docker build -t cloudnova:1.0 .'
                bat 'docker tag cloudnova:1.0 sara567/cloudnova:1.0'
            }
        }

        stage('Check Docker Hub Credential Binding') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    bat '''
                        @echo off
                        if "%DOCKERHUB_USER%"=="" (
                            echo ERROR: Username is empty
                            exit /b 1
                        )
                        if "%DOCKERHUB_TOKEN%"=="" (
                            echo ERROR: Token is empty
                            exit /b 1
                        )
                        echo Username variable is populated.
                        echo Token variable is populated.
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    bat '''
                        @echo off
                        echo Logging in to Docker Hub...
                        echo %DOCKERHUB_TOKEN% | docker login -u %DOCKERHUB_USER% --password-stdin
                        if errorlevel 1 exit /b 1
                        docker push sara567/cloudnova:1.0
                        if errorlevel 1 exit /b 1
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy Container') {
            steps {
                bat 'docker rm -f cloudnova-deployed 2>NUL || exit /b 0'
                bat 'docker run -d --name cloudnova-deployed -p 3002:3000 cloudnova:1.0'
            }
        }
    }

    post {
        success {
            echo 'CloudNova CI/CD pipeline completed successfully!'
        }
        failure {
            echo 'CloudNova pipeline failed. Check the Console Output.'
        }
    }
}
