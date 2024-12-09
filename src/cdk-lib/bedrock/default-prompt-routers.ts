import { Arn, ArnFormat, Aws } from 'aws-cdk-lib';
import { BedrockFoundationModel, IInvokable } from './models';
import { IGrantable, Grant } from 'aws-cdk-lib/aws-iam';
import { CrossRegionInferenceProfile, REGION_TO_GEO_AREA } from './inference-profiles/cross-region-inference-profile';

export interface IPromptRouter {
  /**
   * The ARN of the prompt router.
   */
  readonly promptRouterArn: string;
  /**
   * The Id of the prompt router.
   */
  readonly promptRouterId: string;
  /**
   * The foundation models / profiles this router will route to.
   */
  readonly routingEndpoints: IInvokable[];
}

export interface PromptRouterProps {
  /**
   * Prompt Router Id
   */
  readonly promptRouterId: string;
  /**
   * The foundation models / profiles this router will route to.
   */
  readonly routingEndpoints: IInvokable[];
}

export class PromptRouter implements IInvokable, IPromptRouter {
  public static readonly ANTHROPIC_CLAUDE_V1 = new PromptRouter({
    promptRouterId: 'anthropic.claude:1',
    routingEndpoints: [
      CrossRegionInferenceProfile.fromConfig({
        model: BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0,
        geoRegion: REGION_TO_GEO_AREA[Aws.REGION],
      }),
      CrossRegionInferenceProfile.fromConfig({
        model: BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        geoRegion: REGION_TO_GEO_AREA[Aws.REGION],
      }),
    ],
  });

  public static readonly META_LLAMA_3_1 = new PromptRouter({
    promptRouterId: 'meta.llama:1',
    routingEndpoints: [
      CrossRegionInferenceProfile.fromConfig({
        model: BedrockFoundationModel.META_LLAMA_3_1_8B_INSTRUCT_V1,
        geoRegion: REGION_TO_GEO_AREA[Aws.REGION],
      }),
      CrossRegionInferenceProfile.fromConfig({
        model: BedrockFoundationModel.META_LLAMA_3_1_70B_INSTRUCT_V1,
        geoRegion: REGION_TO_GEO_AREA[Aws.REGION],
      }),
    ],
  });

  public readonly promptRouterArn: string;
  public readonly promptRouterId: string;
  public readonly invokableArn: string;
  public readonly routingEndpoints: IInvokable[];

  constructor(props: PromptRouterProps) {
    this.promptRouterId = props.promptRouterId;
    this.promptRouterArn = Arn.format({
      partition: Aws.PARTITION,
      service: 'bedrock',
      region: Aws.REGION,
      account: Aws.ACCOUNT_ID,
      resource: 'default-prompt-router',
      resourceName: this.promptRouterId,
      arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
    });
    // needed to implement IInvokable
    this.invokableArn = this.promptRouterArn;
    this.routingEndpoints = props.routingEndpoints;
  }

  grantInvoke(grantee: IGrantable): Grant {
    // Grant invoke on every model of the router
    this.routingEndpoints.forEach(model => {
      model.grantInvoke(grantee);
    });
    // Grant invoke to the prompt router
    return Grant.addToPrincipal({
      grantee,
      actions: ['bedrock:InvokeModel'],
      resourceArns: [this.promptRouterArn],
    });
  }
}
