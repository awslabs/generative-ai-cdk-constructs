[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / ContentFilterType

# Enumeration: ContentFilterType

The type of harmful category usable in a content filter.

## Enumeration Members

### HATE

> **HATE**: `"HATE"`

Describes input prompts and model responses that discriminate, criticize, insult,
denounce, or dehumanize a person or group on the basis of an identity (such as race,
ethnicity, gender, religion, sexual orientation, ability, and national origin).

***

### INSULTS

> **INSULTS**: `"INSULTS"`

Describes input prompts and model responses that includes demeaning, humiliating,
mocking, insulting, or belittling language. This type of language is also labeled
as bullying.

***

### MISCONDUCT

> **MISCONDUCT**: `"MISCONDUCT"`

Describes input prompts and model responses that seeks or provides information
about engaging in misconduct activity, or harming, defrauding, or taking advantage
of a person, group or institution.

***

### PROMPT\_ATTACK

> **PROMPT\_ATTACK**: `"PROMPT_ATTACK"`

Enable to detect and block user inputs attempting to override system instructions.
To avoid misclassifying system prompts as a prompt attack and ensure that the filters
are selectively applied to user inputs, use input tagging.

***

### SEXUAL

> **SEXUAL**: `"SEXUAL"`

Describes input prompts and model responses that indicates sexual interest, activity,
or arousal using direct or indirect references to body parts, physical traits, or sex.

***

### VIOLENCE

> **VIOLENCE**: `"VIOLENCE"`

Describes input prompts and model responses that includes glorification of or threats
to inflict physical pain, hurt, or injury toward a person, group or thing.
