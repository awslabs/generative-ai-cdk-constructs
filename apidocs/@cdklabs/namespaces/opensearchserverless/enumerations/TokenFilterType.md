[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [opensearchserverless](../README.md) / TokenFilterType

# Enumeration: TokenFilterType

TokenFilterType defines the available token filters for text analysis.
Token filters process tokens after they have been created by the tokenizer.
They can modify, add, or remove tokens based on specific rules.

## Enumeration Members

### CJK\_WIDTH

> **CJK\_WIDTH**: `"cjk_width"`

Normalizes CJK width differences by converting all characters to their fullwidth or halfwidth variants

***

### ICU\_FOLDING

> **ICU\_FOLDING**: `"icu_folding"`

Applies Unicode folding rules for better text matching

***

### JA\_STOP

> **JA\_STOP**: `"ja_stop"`

Removes Japanese stop words from text

***

### KUROMOJI\_BASEFORM

> **KUROMOJI\_BASEFORM**: `"kuromoji_baseform"`

Converts inflected Japanese words to their base form

***

### KUROMOJI\_PART\_OF\_SPEECH

> **KUROMOJI\_PART\_OF\_SPEECH**: `"kuromoji_part_of_speech"`

Tags words with their parts of speech in Japanese text analysis

***

### KUROMOJI\_STEMMER

> **KUROMOJI\_STEMMER**: `"kuromoji_stemmer"`

Reduces Japanese words to their stem form

***

### LOWERCASE

> **LOWERCASE**: `"lowercase"`

Converts all characters to lowercase

***

### NORI\_NUMBER

> **NORI\_NUMBER**: `"nori_number"`

Normalizes Korean numbers to regular Arabic numbers

***

### NORI\_PART\_OF\_SPEECH

> **NORI\_PART\_OF\_SPEECH**: `"nori_part_of_speech"`

Tags words with their parts of speech in Korean text analysis

***

### NORI\_READINGFORM

> **NORI\_READINGFORM**: `"nori_readingform"`

Converts Korean text to its reading form
