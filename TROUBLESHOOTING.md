# AIRLINE NEXUS — OPERATIONAL RUNBOOK & TROUBLESHOOTING GUIDE

## 1. Common Issues & Resolutions

### Issue 1: Docker Hub Image Pull TLS Timeout (AUD-001)
- **Symptom**: `net/http: TLS handshake timeout` during `docker compose build` or `pull`.
- **Fix**: Run the automated retry script:
  ```powershell
  .\retry_pull.ps1
  ```

### Issue 2: AI Service Returns "Offline Mode"
- **Symptom**: Copilot responses display fallback deterministic explanations.
- **Cause**: AI Service container offline or external LLM key unset.
- **Fix**: Check `docker logs nexus_ai_service` or verify `http://localhost:8000/health`. Core booking continues unimpeded.

### Issue 3: Rate Limit Exceeded (HTTP 429)
- **Symptom**: `{"error": "Too many search requests. Please throttle your queries.", "status": 429}`.
- **Fix**: Rate limiters reset automatically after a 1-minute window.
