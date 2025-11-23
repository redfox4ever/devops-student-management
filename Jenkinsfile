pipeline {
    agent any

    tools {
        maven "M2_HOME"
    }

    stages {
        stage('GIT') {
            steps {
                git branch: 'main',
                url: 'https://github.com/redfox4ever/devops-student-management.git',
                credentialsId: 'jenkins-example-github-pat'

            }
        }
        stage('TEST'){
        steps {
                 sh "mvn test"
               }
        }
        stage('PACKAGE'){
            steps {
               sh "mvn package"
            }
        stage('DOCKER-BUILD'){
            steps {
               sh "docker build -t student-management:latest ."

            }

        stage('DOCKER-BUILD') {
            steps {
                sh "docker compose build"
            }
        }

        stage('DOCKER-PUSH') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push redfox4ever/student-management-app:latest"
                }
            }
        }

        stage('DOCKER-UP') {
            steps {
                sh "docker compose up -d"
            }
        }
    }
}