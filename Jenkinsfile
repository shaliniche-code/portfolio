pipeline {
   agent any

     environment {
        DOCKER_IMAGE = "shalinidocker12/nodejavascript"
        tag = "${BUILD_NUMBER}"
        } 

      stages {
        
        stage('clone github code') {
  
        steps {
              echo "cloning github link"
              git branch: 'main', 
              credentialsId: 'githubcreds', 
              url: 'https://github.com/shaliniche-code/portfolio.git'
               }
            }

         
         stage('build the image') {
             
             steps {
                echo "build the image using dockerfile"

                sh 'docker build -t $DOCKER_IMAGE:$tag .'
                }
               }
 
           
          stage('dockerhub login access') {
            
             steps {

             echo "login to dockerhub"

             withCredentials([usernamePassword(
             credentialsId: 'dockerhubcreds', 
             usernameVariable: 'DOCKER_USERNAME',
             passwordVariable: 'DOCKER_PASS')]){ 
             
             sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USERNAME --password-stdin '

             }
            }
     }

         
           stage('push the image to dokcerhub') {
              steps {
                 echo "push image to dockerhub"

                 sh '''
                    docker push $DOCKER_IMAGE:$tag
                    '''
                  }
                }

             
              stage('ssh into app server') {
                steps {
                   
                    echo "deploy to appserver"
                    sh """
ssh -o StrictHostKeyChecking=no ubuntu@13.233.223.229 '
docker pull $DOCKER_IMAGE:$tag
docker stop nodejs_app || true
docker rm nodejs_app || true
docker run -d --name nodejs_app -p 80:3000 $DOCKER_IMAGE:$tag
'
"""
 }
}
}
}              
