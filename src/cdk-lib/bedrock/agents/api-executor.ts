import * as bedrock from "aws-cdk-lib/aws-bedrock";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

/******************************************************************************
 *                         Action Group Executor
 *****************************************************************************/
/**
 * Defines how fulfillment of the action group is handled after the necessary
 * information has been elicited from the user.
 * Valid executors are:
 * - Lambda function
 * - Return Control
 * @see https://docs.aws.amazon.com/bedrock/latest/userguide/action-handle.html
 */
export class ActionGroupExecutor {
  /**
   * Defines an action group with a Lambda function containing the business logic.
   * @param lambdaFunction - Lambda function to be called by the action group.
   * @see https://docs.aws.amazon.com/bedrock/latest/userguide/agents-lambda.html
   */
  public static lambdaFunction(lambdaFunction: IFunction): ActionGroupExecutor {
    return new ActionGroupExecutor(lambdaFunction, undefined);
  }
  /**
   * Returns the action group invocation results directly in the InvokeAgent response.
   * The information and parameters can be sent to your own systems to yield results.
   * @see https://docs.aws.amazon.com/bedrock/latest/userguide/agents-returncontrol.html
   */
  public static returnControl(): ActionGroupExecutor {
    return new ActionGroupExecutor(undefined, "RETURN_CONTROL");
  }

  public readonly lambdaFunction?: IFunction;
  public readonly customControl?: string;

  private constructor(lambdaFunction?: IFunction, customControl?: string) {
    this.lambdaFunction = lambdaFunction;
    this.customControl = customControl;
  }

  public bind(_scope: Construct): bedrock.CfnAgent.ActionGroupExecutorProperty {
    return {
      customControl: this.customControl,
      lambda: this.lambdaFunction?.functionArn,
    };
  }
}
