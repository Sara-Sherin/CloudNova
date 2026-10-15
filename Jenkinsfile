
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
            echo 'CloudNova pipeline completed successfully!'
        }
        failure {
            echo 'CloudNova pipeline failed. Check the console output.'
        }
    }
}
