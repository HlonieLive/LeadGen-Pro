public with sharing class LeadHandler {
    
    // Method called by Trigger before Insert
    public static void onBeforeInsert(List<Lead> newLeads) {
        enrichLeads(newLeads);
        preventDuplicates(newLeads);
    }

    // Mock Enrichment Logic (simulates calling Clearbit API)
    private static void enrichLeads(List<Lead> leads) {
        for (Lead l : leads) {
            if (String.isBlank(l.Company)) {
                l.Company = 'Unknown - Enriched by Apex'; // Fallback
            }
            // In real world: Callout cannot be done in Trigger directly (needs @future or Queueable),
            // so we set a flag or just do simple field updates here.
            
            l.LeadSource = 'Website - ' + Date.today().format();
        }
    }

    // Check for duplicates based on Email
    private static void preventDuplicates(List<Lead> leads) {
        Set<String> emails = new Set<String>();
        for (Lead l : leads) {
            if (l.Email != null) {
                emails.add(l.Email);
            }
        }

        if (!emails.isEmpty()) {
            // Find existing leads
            List<Lead> existingLeads = [SELECT Id, Email FROM Lead WHERE Email IN :emails];
            Map<String, Lead> emailMap = new Map<String, Lead>();
            for (Lead l : existingLeads) {
                emailMap.put(l.Email, l);
            }

            // Flag duplicates
            for (Lead l : leads) {
                if (emailMap.containsKey(l.Email)) {
                    l.addError('A Lead with this email already exists: ' + l.Email);
                }
            }
        }
    }
}
