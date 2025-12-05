pipeline {
    agent any

    stages {
        stage('Backend Tests') {
            steps {
                dir('server/recu') {
                    sh './mvnw test'
                }
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker build -t recu-server ./server'
                sh 'docker build -t recu-client ./client'
            }
        }

        stage('Deploy with Compose') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        always {
            sh 'docker-compose down || true'
        }
    }
}
