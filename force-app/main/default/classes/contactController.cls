public with sharing class contactController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String searchKey) {
       List<Contact> searchList = new List<Contact>();
       String searchKeyWord= '%'+searchKey+'%';
       searchList = [SELECT FirstName, LastName, Email, MobilePhone, AccountId, CreatedDate, Account.Name
       FROM Contact
       WHERE FirstName LIKE: searchKeyWord
       OR LastName LIKE: searchKeyWord 
       OR Email LIKE: searchKeyWord];
       return searchList;
    }
}