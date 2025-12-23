trigger LeadTrigger on Lead (before insert, before update) {
    if (Trigger.isBefore) {
        if (Trigger.isInsert) {
            LeadHandler.onBeforeInsert(Trigger.new);
        }
        // Add update logic here if needed
    }
}
