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

        stage('DOCKER-PUSH'){
            steps {

        sh "docker tag student-management:latest redfox4ever/student-management:latest"
        sh "docker push redfox4ever/student-management:latest"
            }
        }
        stage('DOCKER-RUN'){
            steps {
        // Run the container, mapping port 8080
        sh "docker run -d -p 8089:8089 --name student-management student-management:latest"

            }
        }
    }
}