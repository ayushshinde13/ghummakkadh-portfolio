# Ghumakkadh Admin Integration Plan

This document outlines the phased integration plan for connecting the Ghumakkadh Admin Frontend (`ghummakkadh-portfolio/src/app/admin`) with the existing Ghumakkadh Node.js Backend (`Ghumkkad_backend`). The plan maps out how to replace the current frontend mock data with real API calls based on the provided backend endpoints.

## User Review Required

> [!IMPORTANT]
> Please review this integration plan. If the phases look correct, click **Proceed** so I can start executing Phase 1. 

## Open Questions

> [!WARNING]
> 1. **Authentication State**: Should we use standard React Context for the auth state, or do you have a preference (e.g., Redux, Zustand, NextAuth.js)?
> 2. **Data Fetching**: Do you prefer using `fetch` with `useEffect`, or a data fetching library like React Query / SWR for better caching and loading states?
> 3. **Socket Connections**: For the SOS alerts, the backend mentions emitting `SOS_ALERT_TRIGGERED`. Are we using `socket.io-client` on the frontend for this?

---

## Proposed Phases

### Phase 1: Base Setup & Authentication Integration 🟢 (Completed)

**Goal:** Establish the foundation for API communication and secure the admin routes using real backend authentication.
- **Tasks:**
  - [x] Create an `api.ts` utility (using `fetch` or `axios`) configured with the base URL (`http://localhost:8000/api`).
  - [x] Configure token handling (JWT Bearer or Cookies) via interceptors.
  - [x] Integrate the login page with `/api/auth/verify-otp` or standard login.
  - [x] Implement a session provider to protect all routes under `/admin/(protected)`.

### Phase 2: Driver Approvals & Verification Integration 🟢 (Completed)

**Goal:** Connect the `approvals` section to allow admins to review and verify drivers.
- **Backend Endpoints:**
  - `GET /api/admin/approve/drivers`
  - `GET /api/admin/approve/drivers/:driverId`
  - `PUT /api/admin/approve/documents/:documentId/review`
  - `PUT /api/admin/approve/drivers/:driverId/verify`
- **Tasks:**
  - [x] Map the Driver Approvals data table to fetch the real paginated list.
  - [x] Connect the Driver details view to fetch the full onboarding dossier (documents, licenses).
  - [x] Implement the "Approve/Reject Document" and "Verify Driver" mutations with loading states.

### Phase 3: Payouts Management Integration 🟢 (Completed)

**Goal:** Connect the `payouts` section to allow admins to process or reject driver earnings withdrawals.
- **Backend Endpoints:**
  - `GET /api/admin/payouts`
- **Tasks:**
  - [x] Map the Payouts data table to fetch real withdrawal requests.
  - [x] Implement forms/modals to input UTR (Reference Number) for processing payouts.
  - [x] Implement rejection flow with reason inputs.

### Phase 4: Support & Complaints Management Integration 🟢 (Completed)

**Goal:** Connect the `support-tickets` and `complaints` interfaces to real backend data.
- **Backend Endpoints:**
  - `GET /api/admin/complaints` and `GET /api/admin/support/tickets`
  - `PUT .../assign`, `PUT .../priority`, `PUT .../resolve`
  - `POST .../messages`
- **Tasks:**
  - [x] Connect tables to fetch open/in-progress tickets and complaints.
  - [x] Connect the ticket detail views to show the full message thread.
  - [x] Implement functionality to assign tickets to admins, reply with messages, change priority, and resolve the tickets.

### Phase 5: Real-time SOS & Safety Desk Integration 🟢 (Completed)

**Goal:** Integrate the `sos` and `safety-monitoring` dashboard with real-time incident data.
- **Backend Endpoints:**
  - `GET /api/admin/sos/alerts`
  - `PUT /api/admin/sos/alerts/:id/acknowledge`
  - `PUT /api/admin/sos/alerts/:id/resolve`
- **Tasks:**
  - [x] Fetch active and historical SOS alerts.
  - [x] Connect `socket.io-client` to listen for the `SOS_ALERT_TRIGGERED` and `SOS_ALERT_ACKNOWLEDGED` WebSocket events and show toast notifications/alarms in the admin UI.
  - [x] Implement the "Acknowledge" and "Resolve" functionalities.

### Phase 6: General Dashboards (Trips, Parcels, Feedback) 🟢 (Completed)

**Goal:** Connect the remaining informational views (Trips, Parcels, Feedback).
- **Tasks:**
  - [x] Wire up the `trips` page to fetch historical trip data.
  - [x] Wire up the `parcels` page to fetch delivery data.
  - [x] Wire up the `feedback` page to view user ratings and platform suggestions.

---

## Verification Plan

### Automated / Manual Verification
- After each phase, I will start the frontend and backend servers to manually verify that data is fetching successfully from the backend.
- I will mock or seed necessary backend database entries (e.g., fake drivers, payouts, SOS events) to verify that the UI renders the data correctly.
- Ensure loading spinners show correctly during network requests and errors display toasts.
