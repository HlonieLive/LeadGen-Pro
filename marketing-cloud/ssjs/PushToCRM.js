<script runat="server">
    Platform.Load("Core", "1");

    try {
        var leadsDE = DataExtension.Init("Engaged_Leads");
        var data = leadsDE.Rows.Retrieve(); // Retrieve all rows from the target DE
        
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var email = data[i].EmailAddress;
                var company = data[i].Company;
                
                // Prepare Payload for Salesforce CRM REST API
                var payload = {
                    "Email": email,
                    "Company": company,
                    "LastName": "Visitor", // Placeholder if name not captured
                    "LeadSource": "Marketing Cloud - Website"
                };
                
                // In a real scenario, you would authenticate first to get a token.
                var auth = "Bearer 00Dxxxxx..."; 
                var url = "https://your-instance.salesforce.com/services/data/v60.0/sobjects/Lead/";
                
                var headerNames = ["Authorization"];
                var headerValues = [auth];
                
                // Execute POST
                var resp = HTTP.Post(url, "application/json", Stringify(payload), headerNames, headerValues);
                
                // Log result (optional)
                // Write("Response: " + resp.Content);
            }
        }
    } catch(e) {
        Write("Error: " + Stringify(e));
    }
</script>
