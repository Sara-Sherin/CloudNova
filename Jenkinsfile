
pipeline {
    agent any

    environment {
        EC2_HOST = '3.110.209.94'
        REMOTE_DIR = '/home/ubuntu/cloudnova'
        REMOTE_IMAGE = 'cloudnova:1.0'
        REMOTE_CONTAINER = 'cloudnova'
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
                bat 'docker build -t cloudnova:1.0 .'
            }
        }

        stage('Deploy to AWS EC2 via SSH') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'cloudnova-ec2',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    powershell '''
                        $ErrorActionPreference = "Stop"

                        $remoteCommand = "set -e; cd /home/ubuntu/cloudnova; git pull --ff-only origin main; docker build -t cloudnova:1.0 .; docker rm -f cloudnova >/dev/null 2>&1 || true; docker run -d --name cloudnova --restart unless-stopped -p 3000:3000 cloudnova:1.0; sleep 2; curl -fsS http://localhost:3000/health"

                        & ssh -i $env:SSH_KEY `
                            -o StrictHostKeyChecking=accept-new `
                            "$($env:SSH_USER)@$($env:EC2_HOST)" `
                            $remoteCommand

                        if ($LASTEXITCODE -ne 0) {
                            throw "AWS EC2 deployment failed."
                        }
                    '''
                }
            }
        }

        stage('Verify AWS Deployment') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'cloudnova-ec2',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    powershell '''
                        $ErrorActionPreference = "Stop"

                        & ssh -i $env:SSH_KEY `
                            -o StrictHostKeyChecking=accept-new `
                            "$($env:SSH_USER)@$($env:EC2_HOST)" `
                            "curl -fsS http://localhost:3000/health"

                        if ($LASTEXITCODE -ne 0) {
                            throw "AWS health check failed."
                        }
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'CloudNova successfully deployed to AWS EC2 via SSH.'
        }
        failure {
            echo 'CloudNova pipeline failed. Check Console Output.'
        }
        always {
            echo 'CloudNova CI/CD pipeline finished.'
        }
    }
}
