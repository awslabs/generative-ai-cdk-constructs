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
//import * as deepdiff from 'deep-diff';
//import * as deepmerge from 'deepmerge';
//import * as log from 'npmlog';

function isObject(val: object) {
  return val != null && typeof val === 'object'
          && Object.prototype.toString.call(val) === '[object Object]';
}

function isPlainObject(o: object) {
  if (Array.isArray(o) === true) {
    return true;
  }

  if (isObject(o) === false) {
    return false;
  }

  // If has modified constructor
  const ctor = o.constructor;
  if (typeof ctor !== 'function') {
    return false;
  }

  // If has modified prototype
  const prot = ctor.prototype;
  if (isObject(prot) === false) {
    return false;
  }

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

/**
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 *
 * Creates the props to be used to instantiate a CDK L2 construct within a Solutions Construct
 *
 * @param defaultProps The default props to be used by the construct
 * @param clientProps Optional properties passed in from the client in the props object
 * @param constructProps Optional properties required by the construct for the construct to work (override any other values)
 * @returns The properties to use - all values prioritized:
 *  1) constructProps value
 *  2) clientProps value
 *  3) defaultProps value
 */
// export function consolidateProps(defaultProps: object, clientProps?: object, constructProps?: object, concatArray: boolean = false): any {
//   let result: object = defaultProps;

//   if (clientProps) {
//     result = overrideProps(result, clientProps, concatArray);
//   }

//   if (constructProps) {
//     result = overrideProps(result, constructProps, concatArray);
//   }

//   return result;
// }

/**
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 */
// function overrideProps(DefaultProps: object, userProps: object, concatArray: boolean = false): any {
//   // Notify the user via console output if defaults are overridden
//   const overrideWarningsEnabled = (process.env.overrideWarningsEnabled !== 'false');
//   if (overrideWarningsEnabled) {
//     flagOverriddenDefaults(DefaultProps, userProps);
//   }
//   // Override the sensible defaults with user provided props
//   if (concatArray) {
//     return deepmerge(DefaultProps, userProps, {
//       arrayMerge: (destinationArray, sourceArray) => destinationArray.concat(sourceArray),
//       isMergeableObject: isPlainObject,
//     });
//   } else {
//     return deepmerge(DefaultProps, userProps, {
//       arrayMerge: (_destinationArray, sourceArray) => sourceArray, // underscore allows arg to be ignored
//       isMergeableObject: isPlainObject,
//     });
//   }
// }

/** The prefilter function returns true for any filtered path/key that should be excluded from the diff check.
 * Any Construct Props using cdk.Duration type is not properly handled by
 * 'deep-diff' library, whenever it encounters a Duration object, it throws the exception
 * 'Argument to Intrinsic must be a plain value object', so such props are excluded from the diff check.
 */
function _prefilter(_path: any[], _key: string): boolean {
  const prefilters = ['maxRecordAge', 'expiration', 'transitionAfter', 'destination', 'timeout', 'period'];

  if (prefilters.indexOf(_key) >= 0) {
    return true;
  }
  return false;
}

/**
 * Performs a diff check of the userProps against the defaultProps to detect overridden properties.
 * @param {object} defaultProps the prescriptive defaults for the pattern.
 * @param {object} userProps the properties provided by the user, to be compared against the defaultProps.
 * @return {Array} an array containing the overridden values.
 */
// function findOverrides(defaultProps: object, userProps: object) {
//   const diff = deepdiff.diff(defaultProps, userProps, _prefilter);
//   // Filter the results
//   return (diff !== undefined) ? diff?.filter((e:any) => (
//     e.kind === 'E' && // only return overrides
//       !e.path?.includes('node') && // stop traversing once the object graph hits the node
//       !e.path?.includes('bind') // stop traversing once the object graph hits internal functions
//   )) : [];
// }

/**
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 *
 * Emits a warning to the console when a prescriptive default value is overridden by the user.
 * @param {object} defaultProps the prescriptive defaults for the pattern.
 * @param {object} userProps the properties provided by the user, to be compared against the defaultProps.
 */
// export function flagOverriddenDefaults(defaultProps: object, userProps: object) {
//   // Compare the properties and return any overrides
//   const overrides = findOverrides(defaultProps, userProps);
//   // Emit a warning for each override
//   for (let i = 0; i < ((overrides !== undefined) ? overrides.length : 0); i++) {
//     const e = Object.assign(overrides[i]);
//     // Determine appropriate logging granularity
//     const valuesAreReadable = (
//       checkReadability(e.lhs) &&
//         checkReadability(e.rhs)
//     );
//       // Format the path for readability
//     const path = formatOverridePath(e.path);
//     // Output
//     const details = (valuesAreReadable) ? ` Default value: '${e.lhs}'. You provided: '${e.rhs}'.` : '';
//     printWarning(`An override has been provided for the property: ${path}.` + details);
//   }
// }
/**
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 */
function printWarning(message: string) {
  // Style the log output
  //log.prefixStyle.bold = true;
  //log.prefixStyle.fg = 'red';
  //log.enableColor();
  console.log('AWS_SOLUTIONS_CONSTRUCTS_WARNING: ', message);
}

/**
 * Converts the path object from the deep-diff module to a user-readable, bracket notation format.
 * @param {string | string[]} path either a string value or an array of strings.
 * @return {string} the formatted override path.
 */
function formatOverridePath(path: string | string[]) {
  return (path !== undefined && path.length > 1) ? path.toString()
    .replace(/,/g, '][')
    .replace(/\]/, '')
    .replace(/$/, ']') : path;
}
/**
 * Check the readability of an input value and, in the context of the override warning service, return true if it
 * meets the established criteria. This function is used to determine whether more-detailed log output can be given.
 * @param {any} value input to be evaluated against the given criteria.
 * @return {boolean} true if the value meets the given criteria.
 * @return {boolean} false if the value does not meet the given criteria.
 */
function checkReadability(value: any) {
  return (
    typeof(value) === 'string' && // strings only
      !value.includes('${Token[') && // no circular refs
      value !== '' // no empty strings
  );
}
