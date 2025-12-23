# LeadGen Pro: Educational Guide & Tool Overview

This guide explains the technologies used in the LeadGen Pro project, how they fit together, and provides simple examples.

---

## 1. Frontend: React
**What it is:** A JavaScript library for building user interfaces. It lets you build "components" (like LEGO blocks) that manage their own state.
**Role in Project:** Captures user data (Name, Email, Company) via a web form.

**Example:**
```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

---

## 2. Salesforce Marketing Cloud (SFMC)
**What it is:** A digital marketing platform for B2C/B2B engagement (Email, Mobile, Social).
**Role in Project:** Receives the lead from the website, sends a "Welcome" email sequence, and tracks if they open/click.

**Key Tools:**
- **Journey Builder:** Visual tool to map customer paths (e.g., Send Email -> Wait 2 Days -> Check Engagement).
- **Data Extensions (DE):** Like SQL tables, they store your data (e.g., `Website_Leads` DE).
- **Automation Studio:** Runs background jobs like SQL queries or CSV imports.

**Example (SQL in Automation Studio):**
*Find all subscribers who joined yesterday.*
```sql
SELECT SubscriberKey, Email
FROM Website_Leads
WHERE DateJoined >= DATEADD(day, -1, GETDATE())
```

---

## 3. Salesforce CRM (Sales Cloud)
**What it is:** The core database for managing Sales, Service, and Marketing relationships.
**Role in Project:** Stores the "qualified" leads. Sales reps log in here to view leads and call them.

**Key Concepts:**
- **Objects:** Database tables (e.g., Lead, Contact, Account).
- **Fields:** Columns (e.g., Lead.Email, Lead.Company).

---

## 4. Flow Builder (Salesforce Automation)
**What it is:** A "No-Code" tool inside Salesforce CRM to automate logic. It looks like a flowchart.
**Role in Project:** When a Lead is created, Flow automatically checks if the email is valid and assigns a "Lead Score".

**Example Logic:**
1. **Start:** Record-Triggered (Lead Created).
2. **Decision:** Is `LeadSource` == "Website"?
3. **Action:** Update Status to "New - Web".

---

## 5. Apex (Backend Logic)
**What it is:** Salesforce's proprietary programming language (similar to Java). Used for complex logic that Flow can't handle.
**Role in Project:** Deduplicates leads (checks if they already exist) and calls external APIs (like Clearbit) to get more info about the company.

**Example:**
```java
trigger LeadTrigger on Lead (before insert) {
    for (Lead l : Trigger.new) {
        l.Description = 'Processed by Apex';
    }
}
```

---

## 6. Integration (APIs)
**What it is:** How different systems talk to each other.
**Role in Project:**
1. **React -> MC:** The website sends a `POST` request to Marketing Cloud's API to add the subscriber.
2. **MC -> CRM:** Marketing Cloud Connect (or API) pushes the "Hot Lead" into Sales Cloud.

**Example (JSON Payload):**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "company": "Acme Corp"
}
```
