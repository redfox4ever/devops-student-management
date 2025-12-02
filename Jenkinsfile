pipeline {
    agent any

    tools {
        maven "M2_HOME"
    }

    environment {
        SONARQUBE_SCANNER = 'SonarQubeScanner' // Nom du scanner défini dans Jenkins
        SONARQUBE_SERVER = 'SonarQubeServer'   // Nom du serveur SonarQube défini dans Jenkins
    }

    stages {
        stage('GIT') {
            steps {
                git branch: 'main',
                url: 'https://github.com/redfox4ever/devops-student-management.git',
                credentialsId: 'jenkins-example-github-pat'
            }
        }

        stage('MVN CLEAN'){
            steps {
                 sh "mvn clean"
            }
        }

        stage('MVN COMPILE'){
            steps {
                 sh "mvn compile"
            }
        }

        stage('TEST'){
            steps {
                 sh "mvn test"
                 sh "mvn jacoco:report"
            }
        }

        stage('PACKAGE'){
            steps {
               sh "mvn package"
            }
        }

        stage('QUALITY CHECK') {
            steps {
                withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_AUTH_TOKEN')]) {
                    sh "mvn sonar:sonar -Dsonar.projectKey=student-management -Dsonar.host.url=http://localhost:9000 -Dsonar.login=$SONAR_AUTH_TOKEN -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml"
                }

            }
        }

        stage('DOCKER-BUILD') {
            steps {
                sh "docker build -t student-management-app ."
                sh "docker tag student-management-app:latest redfox4ever/student-management-app:latest"
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
    }
}
