pipeline {
    agent any
    environment {
        NETLIFY_SITE_ID = '4cc13e03-2ce0-41c7-a95e-537cfa01cd47'
        NETLIFY_AUTH_TOKEN = credentials('tempToken')
    }

    stages {

        stage('Build') {
            agent {
                docker {
                    image 'node:24.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    # list all files
                    ls -la
                    node --version
                    npm --version
                    npm install
                    npm run build
                    ls -la
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:24.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    test -f dist/index.html
                    npm test
                '''
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:24.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm install netlify-cli
                    node_modules/.bin/netlify --version
                    echo "Deploying to production. Site ID: $NETLIFY_SITE_ID"
                    node_modules/.bin/netlify status
                    # deploy to build folder
                    node_modules/.bin/netlify deploy --prod --dir=dist
                '''
            }
        }
    }
}