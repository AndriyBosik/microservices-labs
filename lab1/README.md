# Running guide
First of all, you need to start your cluster. Type `minikube start`.

Next you need to configure your minikube's Docker daemon. Type `eval $(minikube docker-env)`.

Next step is to build docker images for server and for client. Run following commands in your terminal:
- `docker build -t spring/server:1.0.0 server/.`
- `docker build -t node/client:1.0.0 client/.`

Now you have to apply service/client configurations defined in kubectl/service and kubectl/client folders. Run following commands in your terminal:
- `kubectl apply -f kubectl/server`
- `kubectl apply -f kubectl/client`

To make you services available from outside Kubernetes cluster, you need to configure Ingress. First of all you have to enable Ingress in your minikube: `minikube addons enable ingress`

In the end you need to apply your Ingress configuration: `kubectl apply -f ./ingress.yaml`

Run `xdg-open $(minikube ip)` to run app in your default browser. You can see ReactJS page.
