[**@cdklabs/generative-ai-cdk-constructs**](../../../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../../../README.md) / [bedrock](../../../README.md) / [PIIType](../README.md) / Finance

# Enumeration: Finance

Types of PII in the domain of Finance.

## Enumeration Members

### CREDIT\_DEBIT\_CARD\_CVV

> **CREDIT\_DEBIT\_CARD\_CVV**: `"CREDIT_DEBIT_CARD_CVV"`

A three-digit card verification code (CVV) that is present on VISA, MasterCard,
and Discover credit and debit cards. For American Express credit or debit cards,
the CVV is a four-digit numeric code.

***

### CREDIT\_DEBIT\_CARD\_EXPIRY

> **CREDIT\_DEBIT\_CARD\_EXPIRY**: `"CREDIT_DEBIT_CARD_EXPIRY"`

The expiration date for a credit or debit card. This number is usually four digits
long and is often formatted as month/year or MM/YY. Guardrails recognizes expiration
dates such as 01/21, 01/2021, and Jan 2021.

***

### CREDIT\_DEBIT\_CARD\_NUMBER

> **CREDIT\_DEBIT\_CARD\_NUMBER**: `"CREDIT_DEBIT_CARD_NUMBER"`

The number for a credit or debit card. These numbers can vary from 13 to 16 digits
in length.

***

### INTERNATIONAL\_BANK\_ACCOUNT\_NUMBER

> **INTERNATIONAL\_BANK\_ACCOUNT\_NUMBER**: `"INTERNATIONAL_BANK_ACCOUNT_NUMBER"`

An International Bank Account Number (IBAN). It has specific formats in each country.

***

### PIN

> **PIN**: `"PIN"`

A four-digit personal identification number (PIN) with which you can access your
bank account.

***

### SWIFT\_CODE

> **SWIFT\_CODE**: `"SWIFT_CODE"`

A SWIFT code is a standard format of Bank Identifier Code (BIC) used to specify a
particular bank or branch. Banks use these codes for money transfers such as
international wire transfers. SWIFT codes consist of eight or 11 characters.
