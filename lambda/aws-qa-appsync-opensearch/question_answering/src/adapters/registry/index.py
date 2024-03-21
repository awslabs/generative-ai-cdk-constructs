#
# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
# with the License. A copy of the License is located at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
# OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
# and limitations under the License.
#
import re

class AdapterRegistry:
    def __init__(self):
        # The registry is a dictionary where:
        # Keys are compiled regular expressions
        # Values are model IDs
        self.registry = {}

    def register(self, regex, model_id):
        # Compiles the regex and stores it in the registry
        self.registry[re.compile(regex)] = model_id

    def get_adapter(self, model):
        # Iterates over the registered regexes
        for regex, adapter in self.registry.items():
            # If a match is found, returns the associated model ID
            if regex.match(model):
                return adapter
        # If no match is found, returns None
        return None
