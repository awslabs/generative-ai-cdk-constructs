/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

import { aws_bedrock as bedrock } from 'aws-cdk-lib';
import { Construct } from 'constructs';


// Enum for Personally Identifiable Information (PersonalIdentifiableInformation) types
export enum PersonalIdentifiableInformation {
  ADDRESS = 'ADDRESS',
  AGE = 'AGE',
  AWS_ACCESS_KEY = 'AWS_ACCESS_KEY',
  AWS_SECRET_KEY = 'AWS_SECRET_KEY',
  CA_HEALTH_NUMBER = 'CA_HEALTH_NUMBER',
  CA_SOCIAL_INSURANCE_NUMBER = 'CA_SOCIAL_INSURANCE_NUMBER',
  CREDIT_DEBIT_CARD_CVV = 'CREDIT_DEBIT_CARD_CVV',
  CREDIT_DEBIT_CARD_EXPIRY = 'CREDIT_DEBIT_CARD_EXPIRY',
  CREDIT_DEBIT_CARD_NUMBER = 'CREDIT_DEBIT_CARD_NUMBER',
  DRIVER_ID = 'DRIVER_ID',
  EMAIL = 'EMAIL',
  INTERNATIONAL_BANK_ACCOUNT_NUMBER = 'INTERNATIONAL_BANK_ACCOUNT_NUMBER',
  LICENSE_PLATE = 'LICENSE_PLATE',
  IP_ADDRESS = 'IP_ADDRESS',
  MAC_ADDRESS = 'MAC_ADDRESS',
  NAME = 'NAME',
  PASSWORD = 'PASSWORD',
  PHONE = 'PHONE',
  PIN = 'PIN',
  SWIFT_CODE = 'SWIFT_CODE',
  UK_NATIONAL_HEALTH_SERVICE_NUMBER = 'UK_NATIONAL_HEALTH_SERVICE_NUMBER',
  UK_NATIONAL_INSURANCE_NUMBER = 'UK_NATIONAL_INSURANCE_NUMBER',
  UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER = 'UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER',
  URL = 'URL',
  USERNAME = 'USERNAME',
  US_BANK_ACCOUNT_NUMBER = 'US_BANK_ACCOUNT_NUMBER',
}


export enum PiiEntitiesConfigAction{
  BLOCK ='BLOCK',
  ANONYMIZE= 'MASK'
}

export interface SensitiveInformationPolicyConfigProps{
  readonly type : PersonalIdentifiableInformation;
  readonly action : PiiEntitiesConfigAction;
}


export class SensitiveInformationPolicyConfig extends Construct {

  readonly piiConfigList: bedrock.CfnGuardrail.PiiEntityConfigProperty[] = [];

  constructor(scope: Construct, id: string, props: SensitiveInformationPolicyConfigProps[]) {
    super(scope, id);
    this.piiConfigList = this.getPIIFilterList(props);
  }

  private getPIIFilterList(props: SensitiveInformationPolicyConfigProps[]): bedrock.CfnGuardrail.PiiEntityConfigProperty [] {
    const piiList: bedrock.CfnGuardrail.PiiEntityConfigProperty[] = [];
    if (props) {
      for (const pii of props) {
        piiList.push(this.getPIITypeString(pii));
      }
      return piiList;
    } else {
      throw new Error('No PII Configurations provided');
    }


  }


  private getPIITypeString(props: SensitiveInformationPolicyConfigProps): bedrock.CfnGuardrail.PiiEntityConfigProperty {
    switch (props.type) {
      case PersonalIdentifiableInformation.ADDRESS:
        return {
          type: 'ADDRESS',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.AGE:
        return {
          type: 'AGE',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.AWS_ACCESS_KEY:
        return {
          type: 'AWS_ACCESS_KEY',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.AWS_SECRET_KEY:
        return {
          type: 'AWS_SECRET_KEY',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.CA_HEALTH_NUMBER:
        return {
          type: 'CA_HEALTH_NUMBER',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.CA_SOCIAL_INSURANCE_NUMBER:
        return {
          type: 'CA_SOCIAL_INSURANCE_NUMBER',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.CREDIT_DEBIT_CARD_CVV:
        return {
          type: 'CREDIT_DEBIT_CARD_CVV',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.CREDIT_DEBIT_CARD_EXPIRY:
        return {
          type: 'CREDIT_DEBIT_CARD_EXPIRY',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.CREDIT_DEBIT_CARD_NUMBER:
        return {
          type: 'CREDIT_DEBIT_CARD_NUMBER',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.DRIVER_ID:
        return {
          type: 'DRIVER_ID',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.EMAIL:
        return {
          type: 'EMAIL',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.INTERNATIONAL_BANK_ACCOUNT_NUMBER:
        return {
          type: 'INTERNATIONAL_BANK_ACCOUNT_NUMBER',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.LICENSE_PLATE:
        return {
          type: 'LICENSE_PLATE',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.IP_ADDRESS:
        return {
          type: 'IP_ADDRESS',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.MAC_ADDRESS:
        return {
          type: 'MAC_ADDRESS',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.NAME:
        return {
          type: 'NAME',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.PASSWORD:
        return {
          type: 'PASSWORD',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.PHONE:
        return {
          type: 'PHONE',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.PIN:
        return {
          type: 'PIN',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.SWIFT_CODE:
        return {
          type: 'SWIFT_CODE',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.UK_NATIONAL_HEALTH_SERVICE_NUMBER:
        return {
          type: 'UK_NATIONAL_HEALTH_SERVICE_NUMBER',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.UK_NATIONAL_INSURANCE_NUMBER:
        return {
          type: 'UK_NATIONAL_INSURANCE_NUMBER',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER:
        return {
          type: 'UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.URL:
        return {
          type: 'URL',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.USERNAME:
        return {
          type: 'USERNAME',
          action: props.action ?? 'BLOCK',
        };
      case PersonalIdentifiableInformation.US_BANK_ACCOUNT_NUMBER:
        return {
          type: 'US_BANK_ACCOUNT_NUMBER',
          action: props.action ?? 'BLOCK',
        };
      default:
        throw new Error('No valid PersonalIdentifiableInformation value');
    }


  }



}
