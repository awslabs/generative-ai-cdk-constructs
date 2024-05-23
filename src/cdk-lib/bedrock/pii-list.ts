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
export enum General {
  ADDRESS = 'ADDRESS',
  AGE = 'AGE',
  DRIVER_ID = 'DRIVER_ID',
  EMAIL = 'EMAIL',
  LICENSE_PLATE = 'LICENSE_PLATE',
  NAME = 'NAME',
  PASSWORD = 'PASSWORD',
  PHONE = 'PHONE',
  USERNAME = 'USERNAME',
  VEHICLE_IDENTIFICATION_NUMBER='VEHICLE_IDENTIFICATION_NUMBER'

}

export enum Finance{
  CREDIT_DEBIT_CARD_CVV = 'CREDIT_DEBIT_CARD_CVV',
  CREDIT_DEBIT_CARD_EXPIRY = 'CREDIT_DEBIT_CARD_EXPIRY',
  CREDIT_DEBIT_CARD_NUMBER = 'CREDIT_DEBIT_CARD_NUMBER',
  PIN = 'PIN',
  SWIFT_CODE = 'SWIFT_CODE',
  INTERNATIONAL_BANK_ACCOUNT_NUMBER = 'INTERNATIONAL_BANK_ACCOUNT_NUMBER',

}

export enum InformationTechnology{
  URL = 'URL',
  IP_ADDRESS = 'IP_ADDRESS',
  MAC_ADDRESS = 'MAC_ADDRESS',
  AWS_ACCESS_KEY = 'AWS_ACCESS_KEY',
  AWS_SECRET_KEY = 'AWS_SECRET_KEY',
}

export enum USASpecific{
  US_BANK_ACCOUNT_NUMBER = 'US_BANK_ACCOUNT_NUMBER',
  US_BANK_ROUTING_NUMBER ='US_BANK_ROUTING_NUMBER',
  US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER ='US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER',
  US_PASSPORT_NUMBER='US_PASSPORT_NUMBER',
  US_SOCIAL_SECURITY_NUMBER='US_SOCIAL_SECURITY_NUMBER'
}

export enum CanadaSpecific{
  CA_HEALTH_NUMBER = 'CA_HEALTH_NUMBER',
  CA_SOCIAL_INSURANCE_NUMBER = 'CA_SOCIAL_INSURANCE_NUMBER',
}

export enum UKSpecific{
  UK_NATIONAL_HEALTH_SERVICE_NUMBER = 'UK_NATIONAL_HEALTH_SERVICE_NUMBER',
  UK_NATIONAL_INSURANCE_NUMBER = 'UK_NATIONAL_INSURANCE_NUMBER',
  UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER = 'UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER',
}

export enum PiiEntitiesConfigAction{
  BLOCK ='BLOCK',
  MASK= 'MASK'
}

export interface SensitiveInformationPolicyConfigProps{
  readonly type : General | InformationTechnology | Finance | USASpecific | CanadaSpecific | UKSpecific;
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
      case General.ADDRESS:
      case General.AGE:
      case General.DRIVER_ID:
      case General.EMAIL:
      case General.LICENSE_PLATE:
      case General.NAME:
      case General.PASSWORD:
      case General.PHONE:
      case General.USERNAME:
      case General.VEHICLE_IDENTIFICATION_NUMBER:
      case InformationTechnology.URL:
      case InformationTechnology.IP_ADDRESS:
      case InformationTechnology.MAC_ADDRESS:
      case InformationTechnology.AWS_ACCESS_KEY:
      case InformationTechnology.AWS_SECRET_KEY:
      case Finance.CREDIT_DEBIT_CARD_CVV:
      case Finance.CREDIT_DEBIT_CARD_EXPIRY:
      case Finance.CREDIT_DEBIT_CARD_NUMBER:
      case Finance.PIN:
      case Finance.SWIFT_CODE:
      case Finance.INTERNATIONAL_BANK_ACCOUNT_NUMBER:
      case USASpecific.US_BANK_ACCOUNT_NUMBER:
      case USASpecific.US_BANK_ROUTING_NUMBER:
      case USASpecific.US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER:
      case USASpecific.US_PASSPORT_NUMBER:
      case USASpecific.US_SOCIAL_SECURITY_NUMBER:
      case CanadaSpecific.CA_HEALTH_NUMBER:
      case CanadaSpecific.CA_SOCIAL_INSURANCE_NUMBER:
      case UKSpecific.UK_NATIONAL_HEALTH_SERVICE_NUMBER:
      case UKSpecific.UK_NATIONAL_INSURANCE_NUMBER:
      case UKSpecific.UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER:
        return {
          type: props.type,
          action: props.action ?? 'BLOCK',
        };
      default:
        throw new Error('No valid PersonalIdentifiableInformation value');
    }


  }


}
