import {consolidateProps, overrideProps} from "../../../../lib/common/helpers/kendra-helper";
import {LambdaInvoke} from "aws-cdk-lib/aws-stepfunctions-tasks";
import {getStepFnLambdaInvoke} from "../../../../src/common/helpers/kendra-utils";
import {Stack} from "aws-cdk-lib/core";
import {Function, Code, Runtime} from "aws-cdk-lib/aws-lambda";

describe('Kendra Utilities', () => {
  describe('getStepFnLambdaInvoke', () => {
    const stack = new Stack();
    const lambdaFunction = new Function(stack, 'TestFunction', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: Code.fromInline('exports.handler = () => {}'),
    });

    it('should create a LambdaInvoke Step Functions task', () => {
      const lambdaInvokeTask = getStepFnLambdaInvoke(stack, 'TestLambdaInvoke', lambdaFunction, '$.Payload');
      expect(lambdaInvokeTask).toBeInstanceOf(LambdaInvoke);
      // expect(lambdaInvokeTask.props.lambdaFunction).toBe(lambdaFunction);
      // expect(lambdaInvokeTask.props.outputPath).toEqual('$.Payload');
    });
  });

  describe('overrideProps', () => {
    const defaultProps = { key1: 'default1', key2: 'default2' };

    it('should override default props with user props', () => {
      const userProps = { key2: 'user2' };
      const result = overrideProps(defaultProps, userProps);
      expect(result).toEqual({ key1: 'default1', key2: 'user2' });
    });

    it('should concatenate arrays when concatArray is true', () => {
      const defaultArrayProps = { arr: [1, 2] };
      const userArrayProps = { arr: [3, 4] };
      const result = overrideProps(defaultArrayProps, userArrayProps, true);
      expect(result).toEqual({ arr: [1, 2, 3, 4] });
    });
  });

  describe('consolidateProps', () => {
    const defaultProps = { key1: 'default1', key2: 'default2' };

    it('should override default props with client props', () => {
      const clientProps = { key2: 'client2' };
      const result = consolidateProps(defaultProps, clientProps);
      expect(result).toEqual({ key1: 'default1', key2: 'client2' });
    });

    it('should override default and client props with construct props', () => {
      const clientProps = { key2: 'client2' };
      const constructProps = { key2: 'construct2' };
      const result = consolidateProps(defaultProps, clientProps, constructProps);
      expect(result).toEqual({ key1: 'default1', key2: 'construct2' });
    });

    it('should concatenate arrays when concatArray is true', () => {
      const defaultArrayProps = { arr: [1, 2] };
      const clientArrayProps = { arr: [3, 4] };
      const result = consolidateProps(defaultArrayProps, clientArrayProps, undefined, true);
      expect(result).toEqual({ arr: [1, 2, 3, 4] });
    });
  });
});
