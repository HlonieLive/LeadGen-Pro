SELECT
    l.SubscriberKey,
    l.EmailAddress,
    l.JoinDate,
    l.Company,
    c.LinkName as LastClickedLink,
    c.EventDate as ClickDate
FROM
    [Website_Leads] l
JOIN
    [_Click] c ON l.SubscriberKey = c.SubscriberKey
WHERE
    l.Status = 'New'
    AND c.IsUnique = 1
    AND c.EventDate > DATEADD(day, -7, GETDATE())
/* 
   Target Data Extension: Engaged_Leads
   Action: Overwrite
*/
