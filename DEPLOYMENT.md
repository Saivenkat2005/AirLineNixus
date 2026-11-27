# AIRLINE NEXUS — PRODUCTION DEPLOYMENT GUIDE

## 1. Local / Staging Docker Deployment

### Step 1: Initialize Environment
Ensure `.env` exists in the repository root (see `.env.example`).

### Step 2: Build and Launch Containers
```bash
docker compose up --build -d
```

### Step 3: Verify Container Health
```bash
docker compose ps
```

---

## 2. Kubernetes & Istio Service Mesh Deployment

### Step 1: Apply Helm Chart
```bash
helm install airline-nexus ./k8s/helm/airline-nexus -n airline-nexus --create-namespace
```

### Step 2: Apply Istio VirtualServices & DestinationRules
```bash
kubectl apply -f ./k8s/istio-service-mesh.yaml -n airline-nexus
```

### Step 3: Canary Release Traffic Splitting
The VirtualService configuration supports canary deployments:
```yaml
route:
  - destination:
      host: booking-service
      subset: v1
    weight: 90
  - destination:
      host: booking-service
      subset: v2
    weight: 10
```
