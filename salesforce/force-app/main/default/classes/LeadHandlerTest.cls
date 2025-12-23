@isTest
private class LeadHandlerTest {
    
    @isTest
    static void testEnrichment() {
        Lead l = new Lead(
            LastName = 'Doe',
            Company = '',
            Email = 'test@example.com'
        );
        
        Test.startTest();
        insert l;
        Test.stopTest();
        
        Lead inserted = [SELECT Company, LeadSource FROM Lead WHERE Id = :l.Id];
        System.assertEquals('Unknown - Enriched by Apex', inserted.Company, 'Company should be enriched');
        System.assert(inserted.LeadSource.startsWith('Website'), 'Source should be Website');
    }

    @isTest
    static void testDeduplication() {
        // Create first lead
        Lead l1 = new Lead(LastName = 'Original', Company = 'Acme', Email = 'dup@example.com');
        insert l1;
        
        // Try to create second lead with same email
        Lead l2 = new Lead(LastName = 'Duplicate', Company = 'Acme', Email = 'dup@example.com');
        
        Test.startTest();
        try {
            insert l2;
            System.assert(false, 'Should have thrown exception');
        } catch (DmlException e) {
            System.assert(e.getMessage().contains('already exists'), 'Expected duplicate error: ' + e.getMessage());
        }
        Test.stopTest();
    }
}
