

pipeline {

	 environment {
	    imagename = "duraiz/greentube"
	    registryCredential = 'dockerhub'
	    email_to = 'example.com'

	  }
  	 agent any
     stages {
	    stage('Code Checkout') {

	    steps {
	        checkout([
	            $class: 'GitSCM', 
	            branches: [[name: '*/main']], 
	            userRemoteConfigs: [[url: 'https://github.com/duraiz/greentube.git',credentialsId:'git']]
	        ])
	    }
		}
    	stage('Building image') {

		steps{
			script {
			dockerImage = docker.build imagename+ ':$GIT_BRANCH'+'-$BUILD_NUMBER'
			}
		}
		}
    	stage('Run Unit Test') {
		steps{
			script {
			dockerImage.inside(){sh 'node_modules/.bin/mocha --exit'}
		}

		}
		}
		stage('Push Image') {
		when { branch "main"}
		steps{
			script {
			docker.withRegistry( '', registryCredential ) {
			dockerImage.push()
			}
		}
		}
		}
       }

   post {
    always {
       mail to: "${email_to}",
          subject: "Status of pipeline: ${currentBuild.fullDisplayName}",
          body: "${env.BUILD_URL} has result ${currentBuild.result}"
    }
  }
}


