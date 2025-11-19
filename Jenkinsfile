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
        }
    }
}