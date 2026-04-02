pipeline {
   agent any

     environment {
        DOCKER_IMAGE = "shalinidocker12/nodejs"
        tag = "v1"
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
                    docker tag $DOCKER_IMAGE:$tag shalinidocker12/nodejs_latest
                    docker push shalinidocker12/nodejs_latest
                    '''
                  }
                }

             
              stage('ssh into app server') {
                steps {
                    echo "deploy to appserver"
                    sh ''' 
                    ssh -o StrictHostChecking=no ubuntu@appserverip << 'EOF'
                    
                    echo "pull latest image"
                    docker pull shalinidocker12/nodejs_latest 

                    echo "stopping and removing old containers if any in the same"
                    docker stop node.js_app || true
                    docker rm node.js_app || true
                    docker run -d --name nodejs_app -p 80:3000 shalinidocker12/nodejs_latest
                    EOF
                    '''
}
}
}
}              
